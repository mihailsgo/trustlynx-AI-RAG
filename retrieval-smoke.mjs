/**
 * Lexical retrieval smoke test against the knowledge package.
 *
 * NOT an embedding-based test. It scores each chunk by term overlap against
 * title/summary/keywords/questions/body, which is a rough proxy for whether the
 * intended chunk is findable at all for a given question. A real RAG stack with
 * embeddings will do better on paraphrases; if a question fails HERE it will
 * probably also be weak there, so this is useful as a floor.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KB = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(KB, 'index.json'), 'utf8'));

const STOP = new Set(('a an the is are was were do does did what how why when where who which of to in on '
    + 'for with and or my me i it this that if can could should will would there here not no yes at by from '
    + 'as be been being have has had you your we our they their but so than then out up about into after '
    + 'before over under again more most some any all just').split(' '));

const tok = (s) => (s || '').toLowerCase().match(/[a-z0-9]+/g)?.filter((w) => w.length > 1 && !STOP.has(w)) || [];

// Build a per-chunk term-frequency map, weighting the retrieval-relevant fields.
const docs = manifest.chunks.map((c) => {
    const body = fs.readFileSync(path.join(KB, c.path), 'utf8');
    const fields = [
        [c.title, 5],
        [c.summary, 3],
        [(c.keywords || []).join(' '), 5],
        [(c.questions || []).join(' '), 6],
        [body, 1]
    ];
    const tf = new Map();
    for (const [text, weight] of fields) {
        for (const w of tok(text)) tf.set(w, (tf.get(w) || 0) + weight);
    }
    return { id: c.id, tf, len: [...tf.values()].reduce((a, b) => a + b, 0) };
});

// idf
const df = new Map();
for (const d of docs) for (const w of d.tf.keys()) df.set(w, (df.get(w) || 0) + 1);
const N = docs.length;
const idf = (w) => Math.log(1 + (N - (df.get(w) || 0) + 0.5) / ((df.get(w) || 0) + 0.5));

function search(query, k = 3) {
    const qs = tok(query);
    return docs
        .map((d) => {
            let score = 0;
            for (const w of qs) {
                const f = d.tf.get(w) || 0;
                if (!f) continue;
                // BM25-ish saturation
                score += idf(w) * ((f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (d.len / 400))));
            }
            return { id: d.id, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, k);
}

// question -> chunk id that SHOULD win (or be in the top 3)
const CASES = [
    ['How do I sign?', '02-05-drawing-and-submitting-your-signature'],
    ['Where do I draw my signature?', '02-05-drawing-and-submitting-your-signature'],
    ['the document disappeared', '10-02-the-document-disappeared-before-i-signed'],
    ['is this legally binding?', '04-02-what-your-signature-legally-is'],
    ['Is PadSign eIDAS compliant?', '04-05-what-padsign-can-and-cannot-claim'],
    ['what do I need to run it?', '06-02-prerequisites-at-evaluation-level'],
    ['where does my signed PDF go?', '10-06-where-is-my-signed-pdf'],
    ['what is PadSign?', '00-01-what-is-padsign'],
    ['why should we buy this, what is the business value?', '00-02-problem-and-business-value'],
    ['the Sign button is greyed out', '10-03-the-sign-button-will-not-submit'],
    ['nothing appears on the tablet', '10-01-nothing-appears-on-the-pad'],
    ['Application server is not available', '10-05-cannot-get-into-the-portal'],
    ['can we use our own logo?', '01-03-branding-and-what-can-be-configured'],
    ['does our document leave our network?', '05-06-sealing-in-the-cloud-or-on-your-own-servers'],
    ['what devices does it work on?', '09-01-devices-and-input'],
    ['what happens if many people sign at once?', '06-05-volume-concurrency-and-resilience'],
    ['how do I verify the signature in Adobe?', '04-06-checking-a-signed-pdf-yourself'],
    ['why does the PDF say a company signed it and not me?', '04-07-who-is-named-as-the-signer'],
    ['what is demo mode?', '06-04-demo-mode'],
    ['can it integrate with our CRM?', '08-03-connecting-padsign-to-another-system'],
    ['how do I send a document by printing?', '08-02-virtual-printer-user-journey'],
    ['who do I contact for help?', '11-02-getting-help'],
    ['what languages does it support?', '01-02-languages-and-localisation'],
    ['what are the limitations?', '11-01-known-limits-and-what-padsign-does-not-do'],
    // v2 cases - each of these previously retrieved a confident WRONG chunk
    ['How much does PadSign cost per month?', '06-07-commercial-model-trials-and-rollout'],
    ['what is the licence price?', '06-07-commercial-model-trials-and-rollout'],
    ['can I use a screen reader, I am partially sighted', '09-03-accessibility-and-signing-difficulty'],
    ['I am left-handed and the layout is awkward', '09-03-accessibility-and-signing-difficulty'],
    ['I have a tremor and cannot sign steadily', '09-03-accessibility-and-signing-difficulty'],
    ['does PadSign support Smart-ID?', '01-04-identity-eid-and-who-signs'],
    ['I made a mistake in the form after signing', '02-06-changing-your-mind-and-mistakes'],
    ['do I have to sign, can I refuse?', '02-06-changing-your-mind-and-mistakes'],
    ['can two people sign the same contract?', '11-01-known-limits-and-what-padsign-does-not-do'],
    ['what happens if the wifi drops mid signature?', '11-03-questions-this-knowledge-base-cannot-answer'],
    ['do you have ISO 27001 or SOC 2?', '11-03-questions-this-knowledge-base-cannot-answer'],
    ['is TrustLynx a real company, where are they based?', '00-06-about-trustlynx'],
    ['what is the difference between PadSign and SignBox?', '01-05-padsign-and-the-trustlynx-product-family'],
    ['who else uses PadSign, any references?', '00-03-who-it-is-for-and-typical-use-cases'],
    ['I printed to Padsign and nothing appeared on the pad', '08-02-virtual-printer-user-journey']
];

let top1 = 0;
let top3 = 0;
const failures = [];

for (const [q, expected] of CASES) {
    const hits = search(q);
    const rank = hits.findIndex((h) => h.id === expected);
    if (rank === 0) top1 += 1;
    if (rank >= 0) top3 += 1;
    else failures.push({ q, expected, got: hits.map((h) => h.id) });
}

console.log(`cases: ${CASES.length}`);
console.log(`top-1 correct: ${top1}/${CASES.length}`);
console.log(`top-3 correct: ${top3}/${CASES.length}`);

if (failures.length) {
    console.log('\nnot in top 3:');
    for (const f of failures) {
        console.log(`  Q: ${f.q}`);
        console.log(`     expected: ${f.expected}`);
        console.log(`     got:      ${f.got.join(', ')}`);
    }
}

// Every disclaimer chunk must be reachable by an obvious legal question.
console.log('\ndisclaimer reachability:');
for (const q of ['is it legal', 'qualified signature', 'is my data private', 'GDPR', 'court']) {
    const hits = search(q, 2);
    const withDisc = hits.filter((h) => manifest.chunks.find((c) => c.id === h.id)?.has_disclaimer);
    console.log(`  "${q}" -> ${hits.map((h) => h.id).join(', ')}  [${withDisc.length}/2 carry a disclaimer]`);
}
