/**
 * Exports this knowledge package into the document format the TrustLynx AI
 * assistant's ingest pipeline expects, ready to drop into its `knowledge/raw/`.
 *
 * Run from the package root:
 *   node integrations/trustlynx-ai/export-to-trustlynx-ai.mjs
 *   node integrations/trustlynx-ai/export-to-trustlynx-ai.mjs --out ../trustlynx-AI/knowledge/raw/padsign
 *
 * WHY AN ADAPTER IS NEEDED
 * ------------------------
 * The two schemas are close but not compatible, and three of the differences
 * fail loudly or silently rather than degrading gracefully:
 *
 *   1. `audience` is an enum of internal|public there, but end-user|prospect
 *      here. Left as-is, frontmatter validation fails — and the consuming
 *      converter CATCHES that failure and treats the whole YAML block as body
 *      text, which then defaults the document to `audience: [internal]`. On a
 *      deployment that enforces audience as a retrieval boundary, a public
 *      corpus silently ingested as internal is the worst possible outcome. So
 *      the export must emit frontmatter that satisfies their schema COMPLETELY,
 *      not partially.
 *   2. `doc_id` must match [a-z0-9_]; our slugs use hyphens.
 *   3. `questions` and `keywords` are not fields in their schema, and their
 *      chunker embeds only the body plus a title/section prefix. Dropped, we
 *      lose the strongest retrieval signal in the package — so `questions` are
 *      injected into the body as a real section, and distinctive keywords as a
 *      trailing "Related terms" line.
 *
 * Guardrails are handled by splitting them:
 *   - `disclaimer` is injected into the body as an "Important:" blockquote, so
 *     the model sees it in retrieved context and can carry it into the answer.
 *   - `do_not_state` is NOT injected. It is an instruction, not content: a model
 *     told "never claim X" inside its context may recite the prohibition back at
 *     the user. Those rules belong in the system prompt — see the drafted
 *     doc_qa_system_public.txt alongside this script.
 *
 * Known consequence, documented deliberately (see README): `checksum` is
 * emitted as the hash of the SOURCE chunk in this repo, not of the exported
 * file, because a file cannot contain its own hash. Their `scan` compares the
 * processed checksum against the raw file's, so exported docs are re-processed
 * on every scan instead of being skipped as unchanged. Harmless and idempotent,
 * just not free.
 */

import { createRequire } from 'node:module';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const yaml = require('js-yaml');
const YAML_OPTS = { schema: yaml.CORE_SCHEMA };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KB = path.resolve(__dirname, '..', '..');
const CHUNKS = path.join(KB, 'chunks');
const IMAGES = path.join(KB, 'images');

// ---------------------------------------------------------------- CLI options
const argv = process.argv.slice(2);
const opt = (name, fallback) => {
    const i = argv.indexOf(`--${name}`);
    return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
};

const OUT_DIR = path.resolve(opt('out', path.join(__dirname, 'export', 'padsign')));
/**
 * Where the images will live relative to the CONSUMING app's working directory.
 * Their UI resolves image paths with os.path.isfile() against the process CWD
 * (the app root), so this must be an app-root-relative path, not a path
 * relative to the markdown file.
 */
const IMAGE_PREFIX = opt('image-prefix', 'knowledge/raw/padsign/images');
const PRODUCT = opt('product', 'padsign_2_0');
const DOC_PREFIX = opt('doc-prefix', 'padsign');

// ------------------------------------------------------------------- helpers
const snake = (s) => s.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '').toLowerCase();
const sha256 = (buf) => `sha256:${crypto.createHash('sha256').update(buf).digest('hex')}`;

function parseFrontmatter(text, label) {
    if (!text.startsWith('---')) throw new Error(`${label}: no frontmatter`);
    const end = text.indexOf('\n---', 3);
    if (end === -1) throw new Error(`${label}: unterminated frontmatter`);
    return {
        data: yaml.load(text.slice(4, end), YAML_OPTS) || {},
        body: text.slice(end + 4).replace(/^\r?\n/, '')
    };
}

/**
 * Map our two-value audience onto their single department enum, so that
 * department stays a useful filter rather than a constant. Change these three
 * values if your organisation splits ownership differently.
 */
function departmentFor(audience = []) {
    const endUser = audience.includes('end-user');
    const prospect = audience.includes('prospect');
    if (endUser && prospect) return 'shared';
    if (prospect) return 'sales';
    return 'support';
}

/** Rewrite `../images/x.png` to a path the consuming app can resolve. */
function rewriteImagePaths(body) {
    return body.replace(
        /!\[([^\]]*)\]\(\s*\.\.\/images\/([^)\s]+)\s*\)/g,
        (_m, alt, file) => `![${alt}](${IMAGE_PREFIX}/${file})`
    );
}

/**
 * Append the retrieval material their pipeline would otherwise discard.
 * `questions` become a real section (natural language, genuinely useful to a
 * reader); distinctive keywords follow as one italic line so their tokens stay
 * in the embedded text without reading like metadata dumped on the page.
 */
function appendRetrievalAids(body, fm) {
    const questions = fm.questions || [];
    const keywords = fm.keywords || [];
    if (!questions.length && !keywords.length) return body;

    const parts = [body.trimEnd(), '', '## Questions this answers', ''];
    for (const q of questions) parts.push(`- ${q}`);

    // Only keywords whose wording is not already present in the questions —
    // duplicating them adds embedding noise without adding recall.
    const asked = questions.join(' ').toLowerCase();
    const extra = keywords.filter((k) => !asked.includes(String(k).toLowerCase()));
    if (extra.length) {
        parts.push('', `*Related terms: ${extra.join(', ')}.*`);
    }
    return `${parts.join('\n')}\n`;
}

/** Surface the disclaimer as quotable content the model can carry into answers. */
function appendDisclaimer(body, fm) {
    if (!fm.disclaimer) return body;
    const text = String(fm.disclaimer).trim().replace(/\s*\n\s*/g, ' ');
    return `${body.trimEnd()}\n\n> **Important:** ${text}\n`;
}

function buildFrontmatter({ docId, relPath, title, summary, audience, tags, checksum, version, lastUpdated, extra }) {
    // Field order mirrors their serialize_frontmatter() for readable diffs.
    return {
        doc_id: docId,
        source_path: relPath,
        source_type: 'markdown',
        title: String(title).slice(0, 200),
        language: 'en',
        audience: ['public'],          // their enum; our audience is kept in tags + extra
        product: PRODUCT,
        department: departmentFor(audience),
        version,
        last_updated: lastUpdated,
        checksum,
        tags,
        summary: summary ? String(summary).trim().replace(/\s*\n\s*/g, ' ').slice(0, 500) : undefined,
        extra
    };
}

function emit(outName, fmObj, body) {
    const clean = Object.fromEntries(Object.entries(fmObj).filter(([, v]) => v !== undefined));
    const yamlBlock = yaml.dump(clean, { lineWidth: 100, noRefs: true, sortKeys: false });
    const out = path.join(OUT_DIR, outName);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, `---\n${yamlBlock}---\n\n${body.trimEnd()}\n`, 'utf8');
    return out;
}

// ------------------------------------------------------------------ main
fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT_DIR, 'images'), { recursive: true });

const manifest = JSON.parse(fs.readFileSync(path.join(KB, 'index.json'), 'utf8'));
const VERSION = manifest.package.version;

let chunkCount = 0;
let captionCount = 0;

// ---- chunks ----------------------------------------------------------------
for (const entry of manifest.chunks) {
    const src = path.join(KB, entry.path);
    const raw = fs.readFileSync(src, 'utf8');
    const { data: fm, body } = parseFrontmatter(raw, entry.path);

    const docId = `${DOC_PREFIX}_${snake(fm.id)}`;
    if (docId.length > 80) throw new Error(`doc_id too long (${docId.length} > 80): ${docId}`);

    const fileName = `${snake(fm.id)}.md`;
    const relPath = `${DOC_PREFIX}/${fileName}`;

    let out = rewriteImagePaths(body);
    out = appendRetrievalAids(out, fm);
    out = appendDisclaimer(out, fm);

    emit(fileName, buildFrontmatter({
        docId,
        relPath,
        title: fm.title,
        summary: fm.summary,
        audience: fm.audience,
        tags: [DOC_PREFIX, fm.section, ...(fm.audience || [])],
        checksum: sha256(raw),
        version: VERSION,
        lastUpdated: fm.last_reviewed,
        extra: {
            kb_chunk_id: fm.id,
            kb_audience: fm.audience,
            answer_style: fm.answer_style,
            confidence: fm.confidence,
            // Retained for audit only. These are agent instructions, and are
            // enforced via the system prompt rather than the document body.
            do_not_state: fm.do_not_state || []
        }
    }), out);
    chunkCount += 1;
}

// ---- image captions --------------------------------------------------------
// Captions are retrieval units in their own right here, so they are exported as
// their own small documents. Each one embeds its own screenshot so the figure
// marker appears in the chunk and the consuming UI can display it.
for (const img of manifest.images) {
    const src = path.join(KB, img.caption_path);
    const raw = fs.readFileSync(src, 'utf8');
    const { data: fm, body } = parseFrontmatter(raw, img.caption_path);

    const docId = `${DOC_PREFIX}_fig_${snake(fm.id)}`;
    if (docId.length > 80) throw new Error(`doc_id too long: ${docId}`);

    const fileName = `figures/${snake(fm.id)}.md`;
    const relPath = `${DOC_PREFIX}/${fileName}`;

    const title = `Screen: ${img.alt.replace(/\.$/, '')}`;
    const heading = `# ${title}\n\n![${img.alt}](${IMAGE_PREFIX}/${path.basename(img.file)})\n\n`;

    let out = heading + body.trimEnd();
    out = appendRetrievalAids(out, fm);

    emit(fileName, buildFrontmatter({
        docId,
        relPath,
        title,
        summary: img.alt,
        audience: fm.audience,
        tags: [DOC_PREFIX, 'screenshot', ...(fm.audience || [])],
        checksum: sha256(raw),
        version: VERSION,
        lastUpdated: fm.last_reviewed,
        extra: {
            kb_image_id: fm.id,
            used_by: fm.used_by || [],
            capture_note: fm.capture_note || ''
        }
    }), out);
    captionCount += 1;
}

// ---- images ---------------------------------------------------------------
let imageCount = 0;
for (const file of fs.readdirSync(IMAGES).filter((f) => f.endsWith('.png'))) {
    fs.copyFileSync(path.join(IMAGES, file), path.join(OUT_DIR, 'images', file));
    imageCount += 1;
}

console.log(`exported to ${OUT_DIR}`);
console.log(`  ${chunkCount} chunk documents`);
console.log(`  ${captionCount} screenshot-caption documents`);
console.log(`  ${imageCount} images -> ${path.join(OUT_DIR, 'images')}`);
console.log(`  audience: public   product: ${PRODUCT}   version: ${VERSION}`);
console.log(`  image paths written as: ${IMAGE_PREFIX}/<file>.png`);
console.log('\nCopy the export into the assistant\'s knowledge/raw/ and run its ingest scan.');
