# PadSign public knowledge package

A self-contained retrieval corpus about **PadSign**, TrustLynx's e-signing
solution for touchscreen devices. Built to be loaded into a local RAG stack so an
AI support agent can answer public questions about the product.

Everything in the corpus is public-safe: no credentials, no customer identities,
no internal hostnames or paths, no technology-stack detail, no security-posture
detail. Every name, email address and identity visible in the screenshots is a
fictional example, not a real environment.

## Who the content is written for

| Audience tag | Reader |
|---|---|
| `end-user` | someone signing a document on a pad or tablet |
| `prospect` | someone evaluating PadSign |

There is no API reference, configuration reference, or deployment runbook here.
That is intentional — this corpus answers "what is it, what does it do for me,
what am I looking at, and what do I do when something goes wrong", not "how do I
operate it".

## Contents

```
index.json       machine-readable manifest — a manifest-only loader needs nothing else
chunks/          one self-contained answer per file, with YAML frontmatter
images/          screenshots, each with a paired .md caption
CLAUDE.md        orientation for an AI agent working in this repo — NOT corpus
MAINTAINERS.md   editing guide — NOT corpus
provenance.json  chunk id -> source material (internal audit trail) — NOT corpus
*.mjs            build and verification tooling — NOT corpus
```

**The corpus is exactly: `index.json`, `chunks/*.md`, `images/*` (both the PNGs
and their caption `.md` files). Ingest nothing else.**

Each chunk answers one question without needing any other chunk retrieved
alongside it. Cross-references live in frontmatter (`related`), never as "see
elsewhere" in the prose.

Each screenshot has a caption file with the same slug. Captions are indexed as
their own retrieval units — with their own `keywords` and `questions` — so a
question about a specific on-screen element can match the caption directly. Every
caption is written to stand alone, so an answer is still complete on a surface
that cannot render images.

## Ingesting it

`index.json` describes the whole package and carries everything an agent needs,
including the guardrails. The fields worth honouring:

- `retrieval.embed_fields` — what to embed per chunk. `questions` matters most:
  it holds verbatim user phrasings and is the strongest retrieval signal in the
  package.
- `retrieval.filter_fields` — `audience`, `section`, `confidence` for chunks.
  Image captions carry `audience` only — do not drop them for lacking `section`.
- `chunks[].disclaimer` — verbatim text to append to any answer built on that
  chunk. Carried in the manifest so manifest-only loaders can comply.
- `chunks[].do_not_state` — claims the agent must not make from that chunk.
  Also carried in the manifest.
- `images[]` — each image's `alt`, `keywords`, `questions`, `used_by` and caption
  path. Rank captions like chunks; join image to explanation via `used_by`.
- `defaults.base_url` — `null` until the package is hosted somewhere. A loader
  must either set it or fall back to the caption text; never emit a made-up URL.

Files-based ingest works too: point the loader at `chunks/` and `images/*.md`
and exclude everything listed as NOT corpus above. Chunk frontmatter is standard
YAML and safe to carry through as metadata — it contains no internal paths.

### Fields the agent must respect

- **`disclaimer`** — when present, append it verbatim to any answer built on that
  chunk. Used on every chunk that touches legal validity.
- **`do_not_state`** — claims the agent must not make from that chunk. These are
  not stylistic preferences; they mark the specific places where an
  over-confident answer would be wrong or would misrepresent what the product
  guarantees.
- **`answer_style`** — `hedged-legal` chunks must be answered cautiously and with
  their disclaimer; `escalate` chunks exist to route the user to a human.

## A note on legal questions

Section 04 covers electronic signature levels, eIDAS, and what a PadSign
signature is. Those chunks are written to explain accurately and then stop short
of claiming a legal outcome, because the outcome genuinely depends on which
certificate and timestamp authority the operating organisation chose — not on the
software. They carry disclaimers for that reason. Do not "helpfully" firm up that
language.

## Questions with no published answer

Some topics (exact prices, SLA, certifications, browser versions, retention
periods, mid-signature power loss) deliberately have **no** factual chunk.
Instead, one refusal chunk — `11-03-questions-this-knowledge-base-cannot-answer`
— owns those phrasings and tells the agent to say the fact is not public and
route to TrustLynx. That is the intended answer; do not fill the gap from general
knowledge.

## Regenerating

The screenshots are produced by a test harness that lives in the PadSign client
repository (this package's sibling); the manifest is generated here:

```bash
npm install
node build-index.mjs
```

The manifest build also validates the package and refuses to write on any
structural problem — a chunk marked non-public, a missing image or caption, a
dangling cross-reference, an orphan image, a duplicate question claimed by two
chunks, a stray `sources` field in an ingestible file, or a forbidden string
anywhere in the corpus.

To check that questions still find the right chunks:

```bash
node retrieval-smoke.mjs
```

See `MAINTAINERS.md` before editing anything.
