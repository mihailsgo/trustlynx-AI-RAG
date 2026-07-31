# Maintaining the PadSign public knowledge package

**This file is not part of the corpus. Do not index it.** It exists for whoever
edits the package. It records where the content came from, what may never go in,
and how to regenerate the parts that are generated.

---

## What this package is

A retrieval corpus for a public-facing AI support agent. Two audiences:

- **end-user** — a person signing a document on a pad or tablet
- **prospect** — someone evaluating PadSign

It is deliberately **not** for customer IT staff or integrators. There is no API
reference, no configuration-key reference, no port list, no deployment scripting,
no log-grep troubleshooting. That material exists, it is good, and it stays in
the engineering repositories where it belongs.

## Layout

```
├── index.json       generated — see "Regenerating" below
├── README.md        how to ingest the package
├── CLAUDE.md        orientation for an AI agent landing in this repo — not indexed
├── MAINTAINERS.md   this file, not indexed
├── provenance.json  chunk id -> sources each claim was verified against — not indexed
├── build-index.mjs  manifest generator + package validator
├── retrieval-smoke.mjs  lexical retrieval regression test
├── chunks/          one self-contained answer per file
├── images/          <slug>.png plus a paired <slug>.md caption
└── integrations/    per-application adapters — not indexed, see below
```

**Integrations carry generated output that can drift.** Each folder under
`integrations/` converts this corpus into one target application's document
format, and its `export/` directory is **committed** so a deployment machine
needs no toolchain. That means the export is a copy of the corpus in another
shape: **after changing any chunk, caption or screenshot, re-run each
integration's export script and commit the result.** Its README says how.
Nothing enforces this automatically — the export is deterministic, so a stale
one shows up as an unexpected diff the next time somebody regenerates.

**Two-repo layout.** This package lives in its own repository. The screenshot
harness that produces `images/*.png` lives in the PadSign client repository and
writes its output here — the two are expected to sit as sibling folders. All
editing of chunks and captions happens here.

**Provenance is a separate file on purpose.** Chunk frontmatter is carried into
the retrieval layer by file-based loaders, so nothing internal may live in it.
`provenance.json` records which sources each chunk's claims were verified
against; it stays in this (private) repo and is never ingested. The build fails
if any chunk still carries a `sources` field.

## Source of truth per section

| Section | Primary sources |
|---|---|
| 00 product, 01 positioning | trustlynx.com public product pages (see below) |
| 02 journey, 03 screens | `client/src/components/` in the psapp repo — SignaturePad.jsx, PdfRenderComponent.jsx, HeaderComponent.jsx, PollingComponent.jsx, App.jsx |
| 04 signature and law | trustlynx.com/about-e-signature, plus `documentation/04-01-concepts-and-glossary.md` in the deployment repo |
| 05 components | `docs/PSAPP_ARCHITECTURE_2026.md`, `documentation/07-architecture.md`, `documentation/08-01-how-this-solution-works.md` |
| 06 running it | `documentation/09-prerequisites.md`, `documentation/36-*` (wizard), trustlynx.com Delivery & Pricing |
| 07 after signing | `docs/document-routing-spec.md`, `documentation/30-05`, `documentation/30-06` |
| 08 companion | `CLAUDE.md` Virtual Printer section, `README.md` §7 |
| 10 problems | the client component sources, plus `documentation/30-02` |

**The website is the preferred source for anything customer-facing.** It is
published, marketing-approved wording. Where the engineering docs and the website
describe the same thing, follow the website's framing and let the repos supply
the mechanical detail.

Pages captured 2026-07-31:

- `https://trustlynx.com/product/padsign` — tagline, description, two use cases,
  five key benefits, "ideal for" list, four-step how-it-works, the Amber Beverage
  Group testimonial, Delivery & Pricing, public contact details
- `https://trustlynx.com/about-e-signature` — the eIDAS type breakdown, the
  advanced-signature court-acceptance caveat, the e-seal origin-not-liability
  distinction, output formats
- `https://trustlynx.com/esealing-service` — the plain-language e-seal definition
  and the industry list

> The e-Sealing Service price tiers on that third page belong to a **different
> product**. PadSign has no published price figures. Never present one as the
> other.

Additional pages captured 2026-07-31 (feed the v2 chunks 00-06, 01-04, 01-05, 06-07):

- `https://trustlynx.com/about-us` — mission, "embedded trust" positioning,
  origin story, values. The customer-logos section has no names in text; never
  invent any.
- `https://trustlynx.com/product/signbox`, `/product/api-platform`,
  `/product/connectors`, `/product/authentication-service`,
  `/Digital-Trust-Layer` — the product-family positioning
- `https://trustlynx.com/blog/post/eidas-2.0...` — eIDAS 2.0 explainer
- `https://developer.trustlynx.com` — public developer portal; hosts an official
  PadSign User Manual, which `11-02` now points to

> The Authentication Service page carries a second published testimonial (a
> beverage-retail company, for that product). It is NOT a PadSign testimonial —
> never attribute it to PadSign.

> Company registry data, funding databases and executives' names were reviewed
> and deliberately NOT used — third-party, unverified, and in one case carrying
> an unexplained registry notice. `00-06` states only what TrustLynx publishes
> about itself. Do not "enrich" it.

---

## Never publish

### Secrets
`STAMP_API_KEY`, `STAMP_COMPANY_ID`, `STAMP_COMPANY_SECRET`, the Keycloak
`padsign-backend` client secret, `REGISTER_PDF_API_KEY`, `SESSION_SECRET`, the
Syncfusion commercial licence key, any keystore password, and the three
`changeit` demo credentials. Several of these sit in tracked config files in both
repositories — treat every value there as radioactive, not as an example.

### Real customer identities
`Amit`, `Amit-Autobrava`, `Adenta`, `Automaster`, and any real person's name or
email. Note the example paths in `docs/document-routing-spec.md` contain a
customer name. Substitute `Example Corp`.

The one exception is the Amber Beverage Group testimonial, which the customer
published on the TrustLynx website under their own name and title. It is quoted
because it is already public, and it is attributed exactly as published.

### Real hostnames and internal URLs
`padsign.trustlynx.com`, the `eseal.trustlynx.com/.../DEMOCOMPANY` gateway URL,
Docker Hub account names, GitLab/GitHub installer links, internal repo URLs.
Write `your-padsign-address` instead. Public marketing URLs on trustlynx.com are
fine.

### Security posture
Which routes are unauthenticated by default; that published container ports
bypass the reverse proxy if unfirewalled; the deployment wizard's Docker-socket
mount and its token-in-logs access model; default admin usernames; the digidoc4j
`TEST` mode; any known unfixed gap. All of it is legitimate operator
documentation and all of it is an attacker's shopping list.

### One customer's form content
These translation keys are a dental clinic's patient-consent form and Latvian
State Revenue Service (VID) consent wording. They are currently unreferenced by
any code path, which makes them easy to mistake for generic strings. They are
not:

`PS_PATIENT`, `PS_ABOUT_CLINIC`, `PS_AGREEMENT_EMAIL`, `PS_AGREEMENT_PHONE`,
`PS_NO_PHONE_NUMBER`, `PS_BAD_PHONE_FORMAT`, `PS_NO_EMAIL`, `PS_BAD_EMAIL_FORMAT`,
`PS_NO_VID_DECISION`, `PS_CHOOSE_ONE_VALUE`, `PS_CLEAR_INVOICE`, `PS_SIGN_INVOICE`

Chunk `03-03` lists only the generic keys and must stay that way.

### Topics with no verified answer
Omitted by decision, not oversight. No chunk asserts or denies any of these:

pricing figures, licensing terms, SLA, support hours, compliance certifications
(ISO 27001, SOC 2, GDPR DPA availability), supported browser or OS versions,
minimum screen size, WCAG conformance level, data-retention periods, whether
TrustLynx retains copies of signed documents, whether stylus biometric data
(pressure, velocity, timing) is captured, multi-signer support, production PDF
size limits, and behaviour if the network drops mid-signature.

The published **pricing model** — volume subscription calculated from monthly
transaction count — is public and is stated. Specific figures are not.

These topics are covered by one deliberate refusal chunk,
`11-03-questions-this-knowledge-base-cannot-answer`, which carries heavy
keywords so it wins retrieval for them and tells the agent the fact is not
public. When one of these facts becomes published, move it into a real chunk and
delete its phrasings from 11-03.

---

## Images

Every `images/<slug>.png` has a sibling `images/<slug>.md` caption. The caption
is indexed as its own retrieval unit, carries the image path in frontmatter, and
lists its parent chunks in `used_by`. It is written so that reading the caption
alone conveys the screenshot — a chat surface that cannot render images still
produces a complete answer.

### Regenerating the signer-facing screenshots

```bash
cd <padsign-client-repo>/client && npm run docs:shots
```

Output goes straight into this package's `images/` folder (the harness expects the two repositories to be siblings). The run is hermetic: no Docker,
no Keycloak, no ps-server, no DMSS services, and no outbound network. It mutates
no files on disk — branding, config and identity are all injected by Playwright
route interception, so there is nothing to restore if a run is killed.

Publication safety rests on three substitutions, all enforced in the harness:

1. **Logo** — the TrustLynx logo is served over `/portal/logo.png`. The logo
   baked into the client build is a specific customer's clinic logo and is never
   read.
2. **Document** — `client/tests/docs/fixtures/docs-sample_EN.pdf`, a generated
   neutral "Service Agreement". Regenerate with `npm run docs:sample-pdf`.
   **`client/public/template_EN.pdf` must never appear in a published image** —
   its page text carries a real clinic's name, street address, company
   registration number, phone number and its data protection officer's personal
   email address. `config/templates/template_EN.pdf` is byte-identical. The PDFs
   in `Examples/` are real customer work orders and those in `storage/out/` are
   real signed documents.
3. **Identity** — `anna.berzina@example.com` / `Example Corp`, from
   `client/tests/docs/fixtures/keycloak-stub-docs.js`.

Two things silently ruin a screenshot and the harness asserts against both: a
centred toast overlay, and a Syncfusion trial-licence banner.

Screenshots are host-dependent for fonts — the app requests Inter, which is not
bundled, so Windows falls back to Segoe UI and Linux to DejaVu. The committed set
was captured on Windows. Regenerating elsewhere will produce visually different
text.

### Deployment wizard screenshots — none included, deliberately

The deployment repo's wizard walkthrough images were reviewed twice and are all
excluded. Most display a default administrator username or enumerate internal
configuration; even the apparently harmless Feature Toggles step reads as
installer documentation rather than public product information, and its
inclusion in v1 leaked a sanitisation note into the manifest. The installation
story is told in prose in `06-03-installation-at-a-glance`. Do not add wizard
images back.

---

## Regenerating index.json

```bash
npm install   # first time only
node build-index.mjs
```

Reads the frontmatter of every chunk and caption and writes `index.json`. Never
hand-edit the manifest — `sha256` and `token_estimate` would drift immediately.

The script also fails the build on: a chunk whose `sensitivity` is not `public`,
an image with no caption sibling, a caption whose `used_by` names a chunk that
does not exist, a chunk referencing an image that does not exist, and any orphan
image. Those checks are the point of it.

## Checking retrieval still works

```bash
node retrieval-smoke.mjs
```

Scores 39 realistic questions against the corpus with a BM25-ish lexical match and
reports whether the intended chunk ranks first. Current baseline: **37/39 top-1,
39/39 top-3**. Fifteen of the cases exist because they once retrieved a
confidently wrong chunk (pricing questions used to return the ROI testimonial;
left-handed-signer questions returned the signature-area description) — keep
those cases even if they look redundant.

It is a floor, not a simulation — a real embedding-based retriever handles
paraphrases far better. But a question that cannot be found lexically is usually
one whose chunk is missing the words people actually use, and that is worth fixing
in `keywords` or `questions`. The check earned its keep once already: "is my data
private" originally retrieved installation chunks because the data chunk listed
"privacy" but not "private".

Run it after adding or retitling chunks. If a case regresses, the fix is almost
always a missing phrasing in `questions`, not a rewrite of the body.

## Frontmatter fields that are not for the reader

`sources` records provenance so a maintainer can re-verify a claim. It stays out
of `index.json` and the agent must never quote it to a user.

`do_not_state` lists claims the agent must not make from that chunk. It travels
with the chunk text on purpose — a guardrail is useless if it lives somewhere the
model never reads.
