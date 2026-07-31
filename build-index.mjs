/**
 * Generates index.json from the frontmatter of every chunk and
 * image caption, and fails the build on any structural problem.
 *
 * Run from the package root:
 *   npm install && node build-index.mjs
 *
 * The manifest is generated rather than hand-maintained because sha256 and
 * token_estimate drift the moment anybody edits a file. Never edit index.json
 * directly.
 *
 * Checks enforced here (each one is a real failure mode, not a formality):
 *   - a chunk's `id` matches its filename
 *   - a chunk's `sensitivity` is exactly "public"
 *   - every image a chunk references exists, and has a caption sibling
 *   - every `related` id resolves to a real chunk
 *   - every caption's `used_by` names a real chunk
 *   - every image is referenced by at least one chunk (no orphans)
 *   - no forbidden string appears anywhere in the corpus
 *
 * js-yaml is declared in this package's own package.json.
 */

import { createRequire } from 'node:module';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KB = __dirname;
const CHUNKS = path.join(KB, 'chunks');
const IMAGES = path.join(KB, 'images');
const OUT = path.join(KB, 'index.json');

// js-yaml comes from this repo's own node_modules (see package.json);
// run `npm install` once before the first build.
const require = createRequire(import.meta.url);
const yaml = require('js-yaml');

// CORE_SCHEMA, explicitly, for two reasons. It admits only plain scalars and
// collections, so no schema-level type construction is possible regardless of
// js-yaml version. And it leaves `last_reviewed: 2026-07-31` as the string
// "2026-07-31" instead of coercing it to a Date, which would otherwise land in
// the manifest as a full ISO timestamp.
const YAML_OPTS = { schema: yaml.CORE_SCHEMA };

const KB_VERSION = '2026.07.2';
const SCHEMA_VERSION = '1.0';
// Fixed so re-running without content changes produces an identical manifest.
const GENERATED_AT = '2026-07-31T00:00:00Z';

const SECTIONS = [
    { id: 'product', order: 0, title: 'Product orientation', description: 'What PadSign is, what it is for, and the vocabulary around it.' },
    { id: 'positioning', order: 1, title: 'Positioning and options', description: 'How PadSign compares to other approaches, and what can be configured.' },
    { id: 'journey', order: 2, title: 'The signing journey', description: 'What a person signing on the pad does, step by step.' },
    { id: 'screens', order: 3, title: 'Screens and messages', description: 'What is on screen and what each message means.' },
    { id: 'signature-law', order: 4, title: 'The signature and the law', description: 'What the signature is technically and legally. Answers here are hedged and carry disclaimers.' },
    { id: 'components', order: 5, title: 'What it is made of', description: 'The parts of the system and what each does.' },
    { id: 'deployment', order: 6, title: 'Running and evaluating it', description: 'Hosting, prerequisites, installation, demo mode, resilience, updates.' },
    { id: 'delivery', order: 7, title: 'After signing', description: 'Where the signed document goes and what format it is in.' },
    { id: 'companions', order: 8, title: 'Companion app and integration', description: 'The Windows virtual printer, and connecting to other systems.' },
    { id: 'devices', order: 9, title: 'Devices and data', description: 'What hardware works, and where data sits.' },
    { id: 'troubleshooting', order: 10, title: 'Common problems', description: 'Symptoms a signer or staff member can hit, and what to do.' },
    { id: 'boundaries', order: 11, title: 'Limits and help', description: 'What PadSign does not do, and who to ask.' }
];

/**
 * Strings that must never appear in the corpus: real customer identities, real
 * hostnames, credentials, the clinic/tax-authority translation keys, internal
 * repo paths, and technology-stack names a public corpus must not disclose.
 * Checked case-insensitively against every chunk and caption.
 *
 * This file itself contains these strings by necessity — it is tooling, not
 * corpus, and must never be ingested into the RAG layer.
 */
const FORBIDDEN = [
    // real customer identities
    'Amit', 'Adenta', 'Automaster', 'Autobrava',
    // real environments and accounts
    'padsign.trustlynx.com', 'eseal.trustlynx.com', 'DEMOCOMPANY',
    'mihailsgordijenko', 'mihailsgo', 'docker hub',
    // credentials and secret-bearing config keys
    'STAMP_API_KEY', 'STAMP_COMPANY_SECRET', 'REGISTER_PDF_API_KEY',
    'SESSION_SECRET', 'PDF_RENDER_SYNCFUSION_SECRET_KEY',
    'changeit',
    // one customer's form content (translation keys)
    'PS_ABOUT_CLINIC', 'PS_NO_VID_DECISION', 'PS_CHOOSE_ONE_VALUE',
    'PS_AGREEMENT_EMAIL', 'PS_AGREEMENT_PHONE', 'PS_CLEAR_INVOICE',
    'Ganību', 'Ganibu', '40103181871',
    // contaminated fixture files
    'template_EN.pdf', 'template_LV.pdf',
    // internal repo layout
    'C:\\Repos', 'C:/Repos',
    // technology stack a public corpus must not name. 'react'/'express' are
    // deliberately absent - they collide with ordinary English ("need to
    // react", "express consent"); '.jsx' catches component references instead.
    'keycloak', 'syncfusion', 'nginx', '.jsx', 'node.js'
];

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);

function parseFrontmatter(text, label) {
    if (!text.startsWith('---')) {
        fail(`${label}: no frontmatter block`);
        return { data: {}, body: text };
    }
    const end = text.indexOf('\n---', 3);
    if (end === -1) {
        fail(`${label}: unterminated frontmatter block`);
        return { data: {}, body: text };
    }
    const raw = text.slice(4, end);
    const body = text.slice(end + 4);
    try {
        return { data: yaml.load(raw, YAML_OPTS) || {}, body };
    } catch (err) {
        fail(`${label}: frontmatter is not valid YAML - ${err.message}`);
        return { data: {}, body };
    }
}

const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
// Deliberately rough. Enough for a retrieval layer to budget context, and not
// worth pulling in a tokenizer for.
const estimateTokens = (s) => Math.round(s.trim().length / 4);

function requireFields(data, fields, label) {
    for (const f of fields) {
        const v = data[f];
        if (v === undefined || v === null || (typeof v === 'string' && !v.trim())) {
            fail(`${label}: missing required field "${f}"`);
        }
    }
}

// ------------------------------------------------------------------ load chunks
const chunkFiles = fs.readdirSync(CHUNKS).filter((f) => f.endsWith('.md')).sort();
const chunks = [];
const chunkIds = new Set();

for (const file of chunkFiles) {
    const label = `chunks/${file}`;
    const full = fs.readFileSync(path.join(CHUNKS, file), 'utf8');
    const { data, body } = parseFrontmatter(full, label);
    const expectedId = file.replace(/\.md$/, '');

    requireFields(data, [
        'id', 'title', 'summary', 'section', 'audience', 'answer_style',
        'keywords', 'questions', 'confidence', 'sensitivity',
        'last_reviewed', 'kb_version'
    ], label);

    if (data.id !== expectedId) fail(`${label}: id "${data.id}" does not match filename`);
    // Provenance lives in provenance.json, never in the ingestible chunk file:
    // chunk frontmatter is carried into the retrieval layer by file-based loaders.
    if ('sources' in data) fail(`${label}: has a "sources" field - provenance belongs in provenance.json, not in an ingestible chunk`);
    if (data.sensitivity !== 'public') fail(`${label}: sensitivity is "${data.sensitivity}", must be "public"`);
    if (!SECTIONS.some((s) => s.id === data.section)) fail(`${label}: unknown section "${data.section}"`);
    if (data.kb_version !== KB_VERSION) warnings.push(`${label}: kb_version "${data.kb_version}" != ${KB_VERSION}`);
    if (!Array.isArray(data.questions) || data.questions.length < 3) {
        warnings.push(`${label}: fewer than 3 questions - weakens retrieval`);
    }

    chunkIds.add(data.id);
    chunks.push({ file, data, body, full });
}

// ------------------------------------------------------------------ load captions
const captionFiles = fs.readdirSync(IMAGES).filter((f) => f.endsWith('.md')).sort();
const pngFiles = fs.readdirSync(IMAGES).filter((f) => f.endsWith('.png')).sort();
const captions = new Map();

for (const file of captionFiles) {
    const label = `images/${file}`;
    const full = fs.readFileSync(path.join(IMAGES, file), 'utf8');
    const { data, body } = parseFrontmatter(full, label);
    const expectedId = file.replace(/\.md$/, '');

    requireFields(data, ['type', 'id', 'image', 'alt', 'used_by', 'sanitised', 'sensitivity', 'audience', 'keywords', 'questions'], label);

    if (data.id !== expectedId) fail(`${label}: id "${data.id}" does not match filename`);
    if (data.type !== 'image-caption') fail(`${label}: type must be "image-caption"`);
    if (data.sensitivity !== 'public') fail(`${label}: sensitivity is "${data.sensitivity}", must be "public"`);
    if (data.sanitised !== true) fail(`${label}: sanitised must be true`);
    if (!fs.existsSync(path.join(IMAGES, `${expectedId}.png`))) fail(`${label}: no matching ${expectedId}.png`);

    for (const id of data.used_by || []) {
        if (!chunkIds.has(id)) fail(`${label}: used_by references unknown chunk "${id}"`);
    }

    captions.set(expectedId, { file, data, body, full });
}

for (const png of pngFiles) {
    const id = png.replace(/\.png$/, '');
    if (!captions.has(id)) fail(`images/${png}: no caption sibling ${id}.md`);
}

// ------------------------------------------------- validate chunk cross-refs
const referencedImages = new Set();

for (const { file, data } of chunks) {
    const label = `chunks/${file}`;

    for (const id of data.related || []) {
        if (!chunkIds.has(id)) fail(`${label}: related references unknown chunk "${id}"`);
        if (id === data.id) fail(`${label}: related references itself`);
    }

    for (const img of data.images || []) {
        if (!img.file || !img.caption || !img.alt || !img.role) {
            fail(`${label}: image entry missing file/caption/alt/role`);
            continue;
        }
        const imgId = path.basename(img.file, '.png');
        if (!fs.existsSync(path.join(KB, img.file))) fail(`${label}: image not found - ${img.file}`);
        if (!fs.existsSync(path.join(KB, img.caption))) fail(`${label}: caption not found - ${img.caption}`);
        if (!captions.has(imgId)) {
            fail(`${label}: no caption registered for ${imgId}`);
        } else if (!(captions.get(imgId).data.used_by || []).includes(data.id)) {
            fail(`${label}: references ${imgId} but that caption's used_by omits "${data.id}"`);
        }
        if (!['primary', 'supporting'].includes(img.role)) {
            fail(`${label}: image role "${img.role}" must be primary or supporting`);
        }
        referencedImages.add(imgId);
    }
}

for (const id of captions.keys()) {
    if (!referencedImages.has(id)) fail(`images/${id}.png: orphan - no chunk references it`);
}

// -------------------------------------------------- duplicate question check
// Two chunks claiming the same verbatim question makes retrieval a coin-flip.
const questionOwner = new Map();
for (const { file, data } of chunks) {
    for (const q of data.questions || []) {
        const norm = q.trim().toLowerCase();
        if (questionOwner.has(norm)) {
            fail(`duplicate question "${q}" in chunks/${file} and chunks/${questionOwner.get(norm)}`);
        } else {
            questionOwner.set(norm, file);
        }
    }
}

// ------------------------------------------------------------- sanitisation scan
for (const { file, full } of [...chunks, ...captions.values()].map((c) => ({ file: c.file, full: c.full }))) {
    const lower = full.toLowerCase();
    for (const needle of FORBIDDEN) {
        if (lower.includes(needle.toLowerCase())) {
            fail(`SANITISATION: "${needle}" appears in ${file}`);
        }
    }
}

// ------------------------------------------------------------------ build manifest
const manifestChunks = chunks.map(({ file, data, body, full }) => ({
    id: data.id,
    path: `chunks/${file}`,
    title: data.title,
    summary: (data.summary || '').trim(),
    section: data.section,
    audience: data.audience,
    answer_style: data.answer_style,
    keywords: data.keywords,
    questions: data.questions,
    images: (data.images || []).map((i) => path.basename(i.file, '.png')),
    related: data.related || [],
    // Guardrails travel in the manifest so a manifest-only loader can honour
    // them: disclaimer is appended verbatim to any answer built on the chunk,
    // do_not_state lists claims the agent must not make from it.
    disclaimer: data.disclaimer ? String(data.disclaimer).trim() : null,
    do_not_state: data.do_not_state || [],
    has_disclaimer: Boolean(data.disclaimer),
    confidence: data.confidence,
    token_estimate: estimateTokens(body),
    last_reviewed: data.last_reviewed,
    sha256: sha256(full)
}));

const manifestImages = [...captions.entries()].map(([id, { file, data, full }]) => ({
    id,
    file: `images/${id}.png`,
    caption_path: `images/${file}`,
    alt: data.alt,
    // Retrieval fields: captions are their own retrieval units, so the
    // manifest carries what a retriever ranks and filters on.
    audience: data.audience,
    keywords: data.keywords,
    questions: data.questions,
    used_by: data.used_by,
    sanitised: data.sanitised === true,
    capture_note: (data.capture_note || '').trim(),
    sha256: sha256(fs.readFileSync(path.join(IMAGES, `${id}.png`)))
}));

const manifest = {
    schema_version: SCHEMA_VERSION,
    package: {
        name: 'padsign-public-kb',
        version: KB_VERSION,
        language: 'en',
        sensitivity: 'public',
        generated_at: GENERATED_AT,
        chunk_count: manifestChunks.length,
        image_count: manifestImages.length
    },
    defaults: {
        chunk_root: 'chunks/',
        image_root: 'images/',
        // Set this to wherever the package is hosted before emitting image
        // URLs to users. null on purpose: a loader must fail loudly or fall
        // back to caption text, never emit a broken example URL.
        base_url: null
    },
    retrieval: {
        embed_fields: ['title', 'summary', 'questions', 'keywords', 'body'],
        filter_fields: ['audience', 'section', 'confidence'],
        image_captions_are_retrievable: true,
        max_chunk_tokens: 900,
        notes: [
            'questions holds verbatim user phrasings and is the strongest retrieval signal here.',
            'Append a chunk\'s disclaimer verbatim to any answer built on it (carried in this manifest).',
            'do_not_state lists claims the agent must not make from that chunk (carried in this manifest).',
            'Image captions are retrieval units too: rank them on alt + keywords + questions, filter on audience.',
            'All names, addresses and identities visible in screenshots are fictional examples, not real environments.',
            'CLAUDE.md, MAINTAINERS.md, provenance.json and the .mjs tooling are not part of the corpus - never index them.'
        ]
    },
    sections: SECTIONS,
    chunks: manifestChunks,
    images: manifestImages
};

// ------------------------------------------------------------------------ report
if (warnings.length) {
    console.log(`\n${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`  ! ${w}`);
}

if (errors.length) {
    console.error(`\n${errors.length} error(s):`);
    for (const e of errors) console.error(`  x ${e}`);
    console.error('\nindex.json NOT written.');
    process.exit(1);
}

fs.writeFileSync(OUT, `${JSON.stringify(manifest, null, 2)}\n`);

const overTokenBudget = manifestChunks.filter((c) => c.token_estimate > manifest.retrieval.max_chunk_tokens);

console.log(`\nwrote ${path.basename(OUT)}`);
console.log(`  ${manifestChunks.length} chunks across ${SECTIONS.length} sections`);
console.log(`  ${manifestImages.length} images, each with a caption`);
console.log(`  ${manifestChunks.filter((c) => c.has_disclaimer).length} chunks carry a disclaimer`);
console.log(`  audience: ${manifestChunks.filter((c) => c.audience.includes('end-user')).length} end-user, ${manifestChunks.filter((c) => c.audience.includes('prospect')).length} prospect`);
if (overTokenBudget.length) {
    console.log(`  note: ${overTokenBudget.length} chunk(s) exceed max_chunk_tokens (${manifest.retrieval.max_chunk_tokens}) and may be split by your loader:`);
    for (const c of overTokenBudget) console.log(`    - ${c.id} (~${c.token_estimate})`);
}
console.log('  all checks passed');
