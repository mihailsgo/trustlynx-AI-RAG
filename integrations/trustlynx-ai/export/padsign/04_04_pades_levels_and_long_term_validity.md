---
doc_id: padsign_04_04_pades_levels_and_long_term_validity
source_path: padsign/04_04_pades_levels_and_long_term_validity.md
source_type: markdown
title: PAdES levels and long-term validity
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:e5d12ddd588f8b5f11ecf75efd2c36be3a39fe2d2f7d2299e7d838a39f4c053a
tags:
  - padsign
  - signature-law
  - prospect
summary: >-
  PAdES is the standard family for signatures inside PDFs. The levels add a timestamp, then
  revocation evidence, then archival timestamps. Higher levels need external authorities to be
  reachable at signing time, which is a real operational dependency.
extra:
  kb_chunk_id: 04-04-pades-levels-and-long-term-validity
  kb_audience:
    - prospect
  answer_style: hedged-legal
  confidence: verified
  do_not_state:
    - That PadSign is configured at any particular PAdES level by default.
    - The names or addresses of specific timestamp or revocation services in use.
  source_checksum: sha256:406a4951ff57bbb1753334d2b700e580a791954295c2d35d2e8950ec0e2c9d00
---


# PAdES levels and long-term validity

**PAdES** is the ETSI family of standards for signatures embedded in PDF files. It is
why a signed document from PadSign is just a PDF — openable and verifiable in ordinary
readers, with no special software needed at the other end.

Within PAdES there are levels, each adding evidence on top of the last.

## The levels

**B (baseline)** — the signature itself. Proves the document has not changed since
signing and identifies the certificate used. The signing time is taken from the
signer's own environment, so it is not independently trustworthy.

**T (timestamp)** — adds a timestamp from an independent **timestamp authority**. Now
*when* it was signed is evidenced by a third party rather than by whoever's clock was
handy. This is usually the first level worth having in production.

**LT (long-term)** — adds the evidence needed to prove the certificate was valid at the
moment of signing, by embedding revocation information. Without this, a verifier years
later cannot easily establish that the certificate had not been withdrawn at the time.

**LTA (long-term with archival)** — adds further archival timestamps that can be
extended over time, so the signature keeps verifying as cryptographic algorithms age.
This is the level for documents that must stand up for decades.

## The operational cost of the higher levels

This is the part that matters for planning, and it is easy to miss.

Levels T, LT and LTA require **external services to be reachable at the moment of
signing** — a timestamp authority, and for LT and LTA also revocation checking. That
has consequences:

- Your PadSign environment needs outbound access to those services.
- If they are unreachable, signing at that level cannot complete.
- The authority you choose matters. For a signature to be treated as qualified, the
  timestamp authority generally has to be a qualified one, recognised on the EU trust
  lists. Anything else produces an advanced signature rather than a qualified one.

Level B has no such dependency, which is why demonstration setups use it — a
self-signed demo certificate can sign without any authority being involved. It is also
why a demo signature has no legal weight.

## Output formats

TrustLynx output is either **PDF** — the widely used option, and what PadSign produces
— or **ASiC-E**, the EU common container format. Many EU countries have their own
national format for qualified-signed documents; these two cover the common ground.

## Will it still verify in ten years?

That is exactly the question the LT and LTA levels exist to answer. A B-level signature
becomes progressively harder to validate as certificates expire and algorithms weaken.
An LTA signature is designed to be maintainable. If long-retention documents are part
of your use case, raise it early — it drives which authorities you need and what
outbound access your environment requires.

## Questions this answers

- What is PAdES?
- What is the difference between PAdES B, T, LT and LTA?
- Do we need a timestamp authority?
- What does long-term validity mean?
- Will the signature still verify in ten years?
- What file format is the output?

*Related terms: b-bes, tsa, ocsp, revocation, long term, archive, asic-e.*

> **Important:** This is general information, not legal advice. Which level you need, and whether a chosen authority is recognised for your purposes, are questions for your own advisers and for TrustLynx.
