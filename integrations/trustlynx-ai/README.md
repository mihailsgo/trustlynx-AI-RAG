# Integration: the TrustLynx AI assistant

Everything needed to load this knowledge package into the TrustLynx AI assistant
(the Streamlit + Ollama + Chroma application) as a **public, customer-facing**
corpus.

| File | Goes where | What it is |
|---|---|---|
| `export-to-trustlynx-ai.mjs` | stays here | Converts this package into documents that satisfy the assistant's frontmatter schema |
| `export/padsign/` | → `knowledge/raw/padsign/` | Generated output: 59 chunk docs + 16 screenshot-caption docs + 16 images |
| `doc_qa_system_public.txt` | → `config/prompts/` | Public system prompt (the profile template lists this as TODO) |
| `doc_qa_no_answer_public.txt` | → `config/prompts/` | Public no-answer message |
| `eval-questions-padsign.yaml` | → append to `eval/questions.yaml` | 63 eval cases |

## Quick start on the GPU machine

```bash
# 1. Regenerate the export (only needed if the corpus changed)
node integrations/trustlynx-ai/export-to-trustlynx-ai.mjs

# 2. Copy it in (adjust paths to your checkout)
cp -r integrations/trustlynx-ai/export/padsign <assistant>/knowledge/raw/

# 3. Copy the prompts
cp integrations/trustlynx-ai/doc_qa_system_public.txt    <assistant>/config/prompts/
cp integrations/trustlynx-ai/doc_qa_no_answer_public.txt <assistant>/config/prompts/

# 4. Activate the public profile: copy config/profiles/public.yaml.example to
#    public.yaml and set prompts.system / prompts.no_answer to the two files
#    above (they are marked TODO in the template).

# 5. Ingest, then check
uv run python -m src.cli.ingest scan
uv run python -m src.cli.ingest stats
```

Step 2 puts the images at `knowledge/raw/padsign/images/`, which is exactly the
path the exported markdown references. If you place them anywhere else, re-run
the export with `--image-prefix <path-relative-to-app-root>`, because the
assistant's UI resolves screenshot paths against its own working directory, not
against the markdown file.

## What the export does, and why

The two schemas are close but not compatible. Three of the differences need
active handling rather than tolerating:

**1. `audience` — the one that fails dangerously.** This package tags chunks
`[end-user, prospect]`; the assistant's schema is an enum of `internal|public`.
Left alone, its frontmatter validation fails — and its converter *catches* that
failure and treats the whole YAML block as body text, which then defaults the
document to `audience: [internal]`. Since audience is enforced as a hard
retrieval boundary (a Chroma `where` clause, applied before retrieval rather
than after), a public corpus silently ingested as internal is the worst
available outcome. The export therefore emits frontmatter that satisfies their
schema **completely**, and moves our audience values into `tags` and `extra`.

**2. `doc_id` charset.** Theirs is `[a-z0-9_]{3,80}`; our slugs use hyphens.
Exported ids are `padsign_<snake_case_slug>` (and `padsign_fig_<slug>` for
captions), with filenames matching so their auto-derivation agrees.

**3. `questions` and `keywords` would be silently dropped.** Their schema has no
such fields, and their chunker embeds only the body plus a `Document: / Section:`
prefix — `tags` are metadata for filtering, never embedded. Since `questions` is
the strongest retrieval signal in this package, the export **injects them into
the body** as a "Questions this answers" section, followed by an italic
"Related terms" line carrying keywords that the questions do not already
contain. That keeps the tokens in the embedded text.

## How the guardrails are wired

The corpus carries two kinds of guardrail, and they need opposite treatment:

- **`disclaimer` is content.** The export appends it to the body as an
  `> **Important:** …` blockquote, so it lands in retrieved context. Rule I in
  `doc_qa_system_public.txt` requires the model to carry it into the answer.
- **`do_not_state` is an instruction, and is NOT injected.** A model handed
  "never claim X" inside its context may recite the prohibition back at the
  user. Those rules are generalised into the system prompt instead (rules E–H:
  legal-status, unpublished-facts, customer-reference, implementation-detail).
  The per-chunk lists are still exported into `extra.do_not_state` for audit —
  their indexer whitelists only `audience` and `tags` for Chroma, so `extra`
  reaches the processed file and stops there.

## Screenshots

Their chunker already has the mechanism: it lifts inline
`![alt](path)` images out of chunk text, replaces each with a
`[Figure <id>: <alt>]` marker where `<id>` is the filename stem, and stores the
path in chunk metadata. Rule D of the system prompt makes the model emit
`[fig:<id>]`, and the UI renders that screenshot beside the answer block.

Our slugs become those ids directly — e.g.
`[Figure screen-signature-pad: The empty signature box with Clear and Sign
buttons underneath]`. Verified: the export produces **41 figure markers across
16 distinct screenshots**.

Caption files are exported as documents in their own right (under
`export/padsign/figures/`), because that is how they were designed — a question
about a specific on-screen element should be able to match the caption directly.
Each caption document embeds its own screenshot so the figure is referenceable
from it.

One cosmetic note: their `screenshots.py` has a `_FRIENDLY_LABELS` map
hardcoded for SignBox screens. Our filenames fall through to the automatic
label derivation, which yields readable results ("Screen signature pad"). Adding
our slugs to that map would give nicer labels, but nothing breaks without it.

## Verification already done

Run against the assistant's **own code**, not a reimplementation:

- **Frontmatter:** all **75/75** exported documents accepted by its real
  `FrontmatterSchema`, with its real `settings.yaml` product list active
  (`padsign_2_0` is already in it). Audience resolved to `public` for all 75;
  departments distributed `shared` 27 / `sales` 26 / `support` 22.
- **Figures:** its real `extract_images()` produces correct markers and paths
  for all 16 screenshots.
- **Sizing:** body token counts (its own `count_tokens`) range **122–550**
  against a configured `target_size` of 800, so documents should stay as single
  chunks — which preserves this package's self-contained-chunk design.
- **Eval file:** 63 entries, unique ids, no negative case wrongly asserting
  sources, and all 64 `expected_sources_contain` fragments matched against real
  exported doc_ids.

Not verified locally, and worth confirming on the GPU machine:

- The **full chunker** could not run here (`langchain_text_splitters` and
  `tiktoken` are not installed), so the single-chunk expectation is inferred
  from its configured target size and its own token counter, not observed.
  `ingest stats` after the first scan will confirm it — expect roughly 75
  chunks, not several hundred.
- Retrieval quality with real embeddings. This package's own
  `retrieval-smoke.mjs` is a **lexical** floor (37/39 top-1); the eval set here
  is the real test.

## Two findings worth passing upstream

Both are in the assistant, not in this package, and both affect any
pre-authored markdown — not just ours.

**1. Machine-derived frontmatter fields should not be overridable.** The
converter merges `auto < existing < user_metadata`, so a document that supplies
its own `checksum`, `source_path`, `ingested_at` or `loader_*` overrides the
values the pipeline computed. For `checksum` this has a visible effect: a file
cannot contain its own hash, so our export stores the hash of the *source* chunk
in this repo (a meaningful provenance value, but not the raw file's hash).
`_is_file_unchanged()` compares the processed checksum against the raw file's,
so **exported documents are re-processed on every `scan`** instead of being
skipped as unchanged. Idempotent and harmless, just not free. A one-line fix —
letting `auto` win for the machine-derived keys — would resolve it generally.

**2. Frontmatter validation failure is caught and downgraded.** In
`converter.convert()`, a `FrontmatterValidationError` from an existing block is
swallowed and the YAML is treated as body text. That converts an explicit,
fixable error into a silent misclassification, and because `audience` then
defaults to `internal`, the failure mode is a security-relevant one. Logging a
warning there — or failing the file outright — would make the class of problem
visible rather than latent.

**Also worth considering:** the eval schema has no `expected_answer_excludes`.
The claim boundaries in the public prompt are prohibitions ("never say PadSign
is eIDAS certified"), which cannot be asserted positively. The cases tagged
`claim_boundary` in the eval file are the ones that would benefit.

## Regenerating

```bash
node integrations/trustlynx-ai/export-to-trustlynx-ai.mjs [options]
```

| Option | Default | Purpose |
|---|---|---|
| `--out <dir>` | `integrations/trustlynx-ai/export/padsign` | Output directory |
| `--image-prefix <path>` | `knowledge/raw/padsign/images` | Image path written into markdown, relative to the assistant's working directory |
| `--product <name>` | `padsign_2_0` | Must exist in the assistant's `settings.yaml` products list |
| `--doc-prefix <name>` | `padsign` | doc_id and tag prefix |

The export is deterministic and wipes its output directory first, so it is safe
to re-run. Always re-run it after changing chunks, captions, or screenshots.
