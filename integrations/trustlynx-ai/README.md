# Integration: the TrustLynx AI assistant

Everything needed to load this knowledge package into the **TrustLynx AI
assistant** as a **public, customer-facing** corpus.

**Target application:** `github.com/mihailsgo/trustlynx-AI` — a local-first
Streamlit + Ollama + Chroma RAG assistant. Layered UI → capabilities → RAG →
core, with a documented ingest pipeline (`knowledge/raw/` → `knowledge/processed/`
→ Chroma), audience-filtered retrieval, and its own eval harness. Referred to
below as `<assistant>`; substitute your checkout path.

**Its prerequisites are its own** — see its README. In short: Windows 11, an
RTX-class GPU with at least 24 GB VRAM, Ollama on `localhost:11434` with
`gpt-oss:20b` and `qwen3-embedding:8b` pulled, and Python 3.12 via `uv`. None of
that is needed to *read* or *regenerate* this integration; only to ingest and
run.

**If you are an agent picking this up cold:** everything you need is in this
file. Read it start to finish, then follow *Quick start*. Do not modify the
assistant's own code to make the corpus fit — the adapter exists so that is
unnecessary. The two findings at the end are suggestions for its maintainers,
not prerequisites.

| File | Goes where | What it is |
|---|---|---|
| `export-to-trustlynx-ai.mjs` | stays here | Converts this package into documents that satisfy the assistant's frontmatter schema |
| `export/padsign/` | → `knowledge/raw/padsign/` | Generated output: 59 chunk docs + 16 screenshot-caption docs + 16 images |
| `doc_qa_system_public.txt` | → `config/prompts/` | Public system prompt (the profile template lists this as TODO) |
| `doc_qa_no_answer_public.txt` | → `config/prompts/` | Public no-answer message |
| `public.yaml` | → `config/profiles/` | Corrected public profile — **do not use the app's own `public.yaml.example`**, see finding 3 |
| `eval-questions-padsign.yaml` | → append to `eval/questions.yaml`, or keep as its own file and pass `--questions` | 63 eval cases, 13 of them annotated with `expects_screenshot` / `expected_figures` / `wrong_figures` |

## Quick start on the GPU machine

```bash
# 1. Regenerate the export (only needed if the corpus changed)
node integrations/trustlynx-ai/export-to-trustlynx-ai.mjs

# 2. Copy it in (adjust paths to your checkout)
cp -r integrations/trustlynx-ai/export/padsign <assistant>/knowledge/raw/

# 3. Copy the prompts and the corrected public profile
cp integrations/trustlynx-ai/doc_qa_system_public.txt    <assistant>/config/prompts/
cp integrations/trustlynx-ai/doc_qa_no_answer_public.txt <assistant>/config/prompts/
cp integrations/trustlynx-ai/public.yaml                 <assistant>/config/profiles/

# 4. Activate the public profile (either form works)
#    Windows:  set TRUSTLYNX_PROFILE=public
#    or edit config/settings.yaml:  active_profile: public

# 5. Ingest, then check
uv run python -m src.cli.ingest scan
uv run python -m src.cli.ingest stats
```

Use the `public.yaml` shipped here, **not** the app's `public.yaml.example` — the
template's prompt keys do not match its own config model and are silently
discarded, which would leave a public deployment running the internal prompt.
Finding 3 below has the detail.

### Testing before switching profiles

You do not have to activate the public profile to try the corpus. The default
local user is created with `audience=['internal', 'public']`, so documents
tagged `public` are already visible under the existing internal profile — ingest
and ask away. Switching to the public profile is what swaps in the
customer-facing prompt and narrows retrieval to public-only.

Step 2 puts the images at `knowledge/raw/padsign/images/`, which is where the
exported markdown expects them — as `images/<file>.png` for the chunk documents
and `../images/<file>.png` for the captions under `figures/`.

Those refs are **relative to the markdown file that contains them**, not to the
assistant's working directory. It resolves each one in `src/rag/citations.py`
`_resolve_image_paths()` as `raw_dir / dirname(source_path) / ref`. If you move
the images, re-run the export with `--image-prefix <path-relative-to-the-doc>`;
an app-root path silently produces a doubled path, `os.path.isfile()` fails, and
**every screenshot is dropped** while the eval still reports
"Screenshot recall: 0/0 (100%)" because no case is annotated. An earlier version
of this adapter defaulted to the app-root form and shipped exactly that bug.

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

## Confirmed on the GPU machine (2026-07-31)

The two items previously listed as unverified were both checked against a real
ingest and a real eval:

- **Chunking:** 75 documents → **85 chunks**, 0 failures. The single-chunk design
  mostly holds; nine documents split into 2–3 (the message catalogue is the
  widest at 3).
- **Retrieval with real embeddings**, public profile, `--product padsign_2_0`.
  Measured over four runs of the same configuration, because at
  `temperature: 0.2` a single run is not a result. Single runs landed at 69% /
  74% / 80% positives with screenshot recall 62% / 62% / 92%. Under
  `--repeat 3` — where a question must pass **every** iteration and a screenshot
  counts on a **majority** — the suite gives **37/54 positives (69%), 5/9
  negatives, screenshot recall 10/13 (77%), figure precision 6/6** (never showed
  a figure listed in `wrong_figures`), latency mean 4.4 s / p95 6.5 s.

  That places it **at or just under** the app's v1.0 bar (≥70% positives, ≥80%
  screenshot recall), not comfortably above it. An earlier version of this
  section quoted the single best run, 80% / 92%; treat that as the optimistic
  tail, not the expected value.

  Screenshot recall is the volatile number because that app derives screenshots
  from the **cited** sources, so recall follows whichever source the model cited
  that run. Consistently weak: `ps008` and `ps023`, both 1/3.

Getting there took the two export fixes described above. Worth knowing about the
run in between: with the image paths broken the same suite reported 72% positives
and "Screenshot recall: 0/0 (100%)" and declared *Meets the v1.0 success bar* —
a false pass, because no eval case was annotated and a screenshot-less answer
therefore could not fail. Annotating 13 cases is what made the regression visible.

Known remaining gaps, all in answer quality rather than in the corpus:

- `ps114` (WiFi drops mid-signature) invents a recovery procedure — "staff can
  tap Retry Now", "data entered is lost" — which chunk `11-03` explicitly says
  must not be promised, and some of those claims carry no citation. `11-03` does
  not retrieve for interruption phrasings.
- `ps116` (retention) answers correctly but grounds in `05-05` instead of `11-03`.
- `ps112` / `ps115` are behaviourally correct and fail only on the literal bigram
  `not published` — the model writes "not *publicly* published". That is the
  missing `expected_answer_contains_any` field, not a wrong answer.
- Adding this corpus to an index that also holds the internal SignBox corpus costs
  the **internal** suite screenshot recall (87% → 78% at `top_k=4`) because the
  two corpora compete for the four slots. `--product` isolation restores it. Plan
  for a separate deployment rather than a shared index.

## Two findings worth passing upstream

Both are in the assistant, not in this package, and both affect any
pre-authored markdown — not just ours.

**1. Machine-derived frontmatter fields should not be overridable.** The
converter merges `auto < existing < user_metadata`, so a document that supplies
its own `checksum`, `source_path`, `ingested_at` or `loader_*` overrides the
values the pipeline computed.

For `checksum` this is not cosmetic, and an earlier version of this README got it
wrong by calling it "idempotent and harmless". `Indexer.index()` opens with
`is_already_indexed(doc_id, frontmatter.checksum)` and returns immediately when
that value matches what is already in Chroma. So a supplied checksum that does
not track the file's own content means **a changed document is never re-indexed**
— it is reported as `status=indexed, chunks_added=0`, printed under *Indexed*
rather than *Failed*, and the stale chunks stay. `scan --force` does not rescue
it: force only deletes the processed twin to bypass `_is_file_unchanged()`, and
never reaches this check.

This adapter now hashes the exported frontmatter plus body, so the value moves
whenever the export moves; the source-chunk hash lives on as
`extra.source_checksum`. Omitting the field is **not** a workaround — see
finding 2, which is what happens when you try.

Letting `auto` win for the machine-derived keys would fix the class properly. The
zero-chunk reporting is a second, separable bug: CLAUDE.md §9 says a document
producing no chunks must be surfaced as `failed`, and this path violates it.

**2. Frontmatter validation failure is caught and downgraded.** In
`converter.convert()`, a `FrontmatterValidationError` from an existing block is
swallowed and the YAML is treated as body text. That converts an explicit,
fixable error into a silent misclassification, and because `audience` then
defaults to `internal`, the failure mode is a security-relevant one. Logging a
warning there — or failing the file outright — would make the class of problem
visible rather than latent.

**3. Profile prompt selection is silently ignored.** Both `config/profiles/`
YAMLs write:

```yaml
prompts:
  system: doc_qa_system_public
  no_answer: doc_qa_no_answer_public
```

but `PromptsConfig` declares `doc_qa_system`, `doc_qa_no_answer`,
`citation_format`, `warmup`. Pydantic's default `extra='ignore'` drops the two
unknown keys, so the defaults survive. Verified by validating the template's
exact keys against the real model: `doc_qa_system` comes back as
`doc_qa_system`, not `doc_qa_system_public`.

`internal.yaml` has the same mismatch but specifies the default values, so it is
invisible there. For the public profile the consequence is severe: the
deployment reports `profile_name: public`, correctly narrows `audience_filter`
to public — and still uses the internal system prompt, meaning a customer-facing
assistant runs with employee-facing wording and none of the claim boundaries.

Fix is one word per line, in both profile files:

```yaml
prompts:
  doc_qa_system: doc_qa_system_public
  doc_qa_no_answer: doc_qa_no_answer_public
```

The `public.yaml` shipped in this folder already has it. Setting
`model_config = ConfigDict(extra='forbid')` on the config models would have
turned this into a startup error instead of a silent downgrade, and is worth
considering for every model in `config.py`.

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
| `--image-prefix <path>` | `images` | Image path written into markdown, relative to the DOCUMENT that references it (captions under `figures/` automatically get one `../` more) |
| `--product <name>` | `padsign_2_0` | Must exist in the assistant's `settings.yaml` products list |
| `--doc-prefix <name>` | `padsign` | doc_id and tag prefix |

The export is deterministic and wipes its output directory first, so it is safe
to re-run. Always re-run it after changing chunks, captions, or screenshots.
