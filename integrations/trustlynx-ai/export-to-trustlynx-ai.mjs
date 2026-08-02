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
 * `checksum` must be a hash of the EXPORTED document, not of the source chunk
 * in this repo. Their `Indexer.index()` calls
 * `is_already_indexed(doc_id, frontmatter.checksum)` and skips the document
 * outright when that value already matches what is in Chroma. A source-chunk
 * hash does not change when only the EXPORT changes, so any export-only fix
 * (an image-prefix correction, a body reformat) was silently never indexed —
 * reported as `status=indexed, chunks_added=0`, stale chunks left in place, and
 * `scan --force` did not help because force only deletes the processed twin.
 *
 * Omitting the field entirely does not work either: their `converter.convert()`
 * runs the existing block through `parse_frontmatter()`, which validates it and
 * requires `checksum`; the resulting error is swallowed and the whole YAML block
 * is demoted to body text, so the document then fails on the missing `product`
 * and `department` instead.
 *
 * So we hash the exported frontmatter (minus this field) plus the exported body.
 * That changes whenever anything we emit changes, which is exactly what their
 * freshness check needs. The source-chunk hash is kept as
 * `extra.source_checksum` for provenance.
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
 * Where the images live RELATIVE TO THE MARKDOWN FILE that references them.
 *
 * The consuming app resolves each ref in `src/rag/citations.py`
 * `_resolve_image_paths()` as `raw_dir / dirname(source_path) / ref`, then
 * `.resolve()`s the result — so refs are document-relative, NOT app-root
 * relative. Passing an app-root path such as `knowledge/raw/padsign/images`
 * yields a doubled path (`knowledge/raw/padsign/knowledge/raw/padsign/...`),
 * `os.path.isfile()` fails, and every screenshot is silently dropped: the app
 * shows no figures at all and its eval reports "Screenshot recall: 0/0 (100%)".
 */
const IMAGE_PREFIX = opt('image-prefix', 'images');
const PRODUCT = opt('product', 'padsign_2_0');
const DOC_PREFIX = opt('doc-prefix', 'padsign');

// ------------------------------------------------------------------- helpers
const snake = (s) => s.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '').toLowerCase();
const sha256 = (buf) => `sha256:${crypto.createHash('sha256').update(buf).digest('hex')}`;
/**
 * Stands in for `checksum` while the document is being assembled, so the field
 * keeps its position in the block and the hash covers a stable shape. Must match
 * their `sha256:<64hex>` pattern, since it is what gets hashed over.
 */
const CHECKSUM_PLACEHOLDER = `sha256:${'0'.repeat(64)}`;

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

/**
 * IMAGE_PREFIX adjusted for a document sitting `depth` directories below the
 * export root. Caption documents are emitted under `figures/`, so they need one
 * `../` more than the top-level chunk documents to reach the same `images/`.
 * An absolute prefix is passed through untouched.
 */
function prefixAtDepth(depth) {
    if (depth === 0 || path.posix.isAbsolute(IMAGE_PREFIX)) return IMAGE_PREFIX;
    return path.posix.normalize(`${'../'.repeat(depth)}${IMAGE_PREFIX}`);
}

/** Rewrite `../images/x.png` to a path the consuming app can resolve. */
function rewriteImagePaths(body, depth = 0) {
    const prefix = prefixAtDepth(depth);
    return body.replace(
        /!\[([^\]]*)\]\(\s*\.\.\/images\/([^)\s]+)\s*\)/g,
        (_m, alt, file) => `![${alt}](${prefix}/${file})`
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
        // Filled in by emit(), which hashes everything else we write. Keeping the
        // key here fixes its position in the serialized block.
        checksum: CHECKSUM_PLACEHOLDER,
        tags,
        summary: summary ? String(summary).trim().replace(/\s*\n\s*/g, ' ').slice(0, 500) : undefined,
        extra: { ...extra, source_checksum: checksum }
    };
}

function emit(outName, fmObj, body) {
    const clean = Object.fromEntries(Object.entries(fmObj).filter(([, v]) => v !== undefined));
    // Hash everything we are about to write, with the placeholder still in place,
    // so the value changes whenever the exported document changes. See the note at
    // the top of this file for why a source-chunk hash is not usable here.
    const forHashing = { ...clean, checksum: CHECKSUM_PLACEHOLDER };
    clean.checksum = sha256(
        yaml.dump(forHashing, { lineWidth: 100, noRefs: true, sortKeys: false }) + body
    );
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
    // Caption documents are emitted under `figures/`, one level below the chunk
    // documents, so their image refs need the depth-1 prefix.
    const imgPrefix = prefixAtDepth(1);
    const heading = `# ${title}\n\n![${img.alt}](${imgPrefix}/${path.basename(img.file)})\n\n`;

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
console.log(`  image paths written as: ${prefixAtDepth(0)}/<file>.png (chunks)`);
console.log(`                          ${prefixAtDepth(1)}/<file>.png (captions)`);
console.log('\nCopy the export into the assistant\'s knowledge/raw/ and run its ingest scan.');
