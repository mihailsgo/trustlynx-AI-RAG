# CLAUDE.md — trustlynx-AI-RAG

This repository is a **RAG-ready knowledge package about PadSign** (TrustLynx's
e-signing product for touchscreen devices), built to feed a public-facing AI
support agent. Everything in it is either corpus (ingest it) or tooling/meta
(never ingest it). This file is the map.

## What is what

| Path | What it is | Ingest into RAG? |
|---|---|---|
| `index.json` | Generated manifest: every chunk and image with retrieval fields, guardrails, and hashes. A manifest-driven loader needs nothing else. | **Yes** (drives ingestion) |
| `chunks/*.md` | 59 self-contained answers, one topic each, YAML frontmatter + body. Filenames are stable ids: `NN-NN-slug.md`, where `NN` encodes the section. | **Yes** |
| `images/*.png` | 16 sanitised UI screenshots produced by a test harness against a neutral sample document. | **Yes** (as binary assets) |
| `images/*.md` | One caption per PNG, same slug. A caption is a **retrieval unit in its own right** with its own keywords and questions. | **Yes** |
| `README.md` | Ingestion guide for whoever wires this into a RAG stack. | No |
| `CLAUDE.md` | This file. | No |
| `MAINTAINERS.md` | Editing rules: sources, sanitisation blocklist, regeneration. Contains the forbidden strings themselves — that is *why* it must never be ingested. | **Never** |
| `provenance.json` | chunk id → the source material each claim was verified against (internal paths and URLs). Audit trail only. | **Never** |
| `build-index.mjs` | Regenerates and validates `index.json`. Fails the build on any leak or broken link. | No |
| `retrieval-smoke.mjs` | 39-question retrieval regression test. | No |
| `package.json` | Declares the one dev dependency (`js-yaml`) the build script needs. | No |

## How pictures connect to their descriptions

This is deliberate and machine-readable in both directions — an agent should
never have an image without its explanation, or an explanation without its image:

1. **Same slug = a pair.** `images/screen-signature-pad.png` is described by
   `images/screen-signature-pad.md`. Every PNG has exactly one caption; the build
   fails on an unpaired file.
2. **Chunk → image.** A chunk's frontmatter `images:` list gives, per image:
   `file` (the PNG), `caption` (its .md), `alt` text, and `role`
   (`primary` = the one to show, `supporting` = optional extras). The chunk body
   also embeds the image inline (`![alt](../images/<slug>.png)`) at the exact
   paragraph where it is relevant.
3. **Image → chunks.** A caption's frontmatter `used_by:` lists every chunk that
   uses it, so from a retrieved caption you can fetch the fuller explanation.
4. **The join in `index.json`.** `images[]` carries `file`, `caption_path`,
   `alt`, `keywords`, `questions`, `audience`, and `used_by` — everything needed
   to rank a caption like a chunk and to resolve image↔chunk both ways without
   opening files.
5. **Captions stand alone.** Each caption's body describes the screen completely
   (what is visible, what each element does, what happens next), so on a surface
   that cannot render images the caption text *is* the answer.

Everything visible in the screenshots — names, email addresses, the company, the
document — is a **fictional example** (`Example Corp`, a generated sample
"Service Agreement", a synthetic signature stroke). No screenshot shows a real
environment or real person, and none may ever.

## Chunk anatomy (what an agent must honour)

```yaml
id / title / summary      # identity + embedded preview
section                   # one of 12 topical sections
audience                  # [end-user] and/or [prospect] - filter on this
answer_style              # direct | step-by-step | hedged-legal | escalate
keywords / questions      # retrieval hooks; questions are verbatim user phrasings
images                    # see pairing convention above
related                   # other chunk ids, advisory
disclaimer                # if set: APPEND VERBATIM to any answer using the chunk
do_not_state              # claims the agent MUST NOT make from this chunk
confidence / sensitivity  # sensitivity is always "public" - build-enforced
```

Three behavioural rules that matter more than the rest:

- **`disclaimer` is not optional.** Every legal-adjacent chunk carries one;
  append it verbatim. Also present in `index.json`, so manifest-only loaders
  have it.
- **`do_not_state` is a hard boundary**, not advice. It marks exactly where an
  overconfident answer becomes a false product claim.
- **`11-03-questions-this-knowledge-base-cannot-answer` is the refusal chunk.**
  Prices, SLAs, certifications, browser versions, retention, mid-signing power
  loss: the *correct* answer is "not published — ask TrustLynx", and that chunk
  owns those phrasings. Never fill these gaps from general knowledge.

## Hard sanitisation rules (one paragraph)

No credentials or secret names, no real customer identities (the published Amber
Beverage Group testimonial is the single sanctioned exception), no real
deployment hostnames or internal URLs or repo paths, no technology-stack names,
no port numbers, no security-posture detail (what is exposed by default, what
bypasses what), and none of one customer's clinic-form wording. The full
blocklist with rationale lives in `MAINTAINERS.md`; `build-index.mjs` enforces
it and refuses to write `index.json` on any hit.

## Working on this repo

```bash
npm install               # once
node build-index.mjs      # regenerate + validate index.json (never edit it by hand)
node retrieval-smoke.mjs  # 39 retrieval cases; baseline 37/39 top-1, 39/39 top-3
```

Screenshots are not edited here: they are produced by a Playwright harness in the
PadSign client repository (expected as a sibling folder), which writes into
`images/`. To change what a screenshot shows, change the harness, re-run it, and
update the paired caption.

When adding a chunk: filename = id, frontmatter complete, at least 3 `questions`,
add its sources to `provenance.json`, wire any images both ways (chunk `images[]`
+ caption `used_by`), then run the build and the smoke test. The build fails on:
non-public sensitivity, a `sources` field in a chunk, duplicate questions across
chunks, unpaired images, dangling references, orphan images, or any forbidden
string.
