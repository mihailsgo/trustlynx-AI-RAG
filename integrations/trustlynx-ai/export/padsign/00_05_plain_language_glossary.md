---
doc_id: padsign_00_05_plain_language_glossary
source_path: padsign/00_05_plain_language_glossary.md
source_type: markdown
title: PadSign glossary in plain language
language: en
audience:
  - public
product: padsign_2_0
department: shared
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:b141e8180976a620448ccfbde5aa82b27e14edbd474fb0f1ffd03bd60f4d3880
tags:
  - padsign
  - product
  - end-user
  - prospect
summary: >-
  Short plain-English definitions of the terms that come up around PadSign: pad, portal, visual
  signature, e-seal, timestamp, PAdES, eIDAS, qualified and advanced, TSP and TSA.
extra:
  kb_chunk_id: 00-05-plain-language-glossary
  kb_audience:
    - end-user
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - That any definition here constitutes legal advice or a legal opinion.
  source_checksum: sha256:911a9ea247879ea184c0c623a00f62a1a6f0ff9f4b1c5546e9f992db0bdd8443
---


# PadSign glossary in plain language

**Pad** — the touchscreen device the signer uses. A tablet, a phone, or a PC with
a touchscreen. There is no special hardware and nothing to install on it.

**Portal** — the web page the pad opens. This is the PadSign application the
signer actually interacts with.

**Visual signature** — the picture of your handwritten signature, placed into the
page of the PDF. It is what a person sees when they open the document. On its own
it is an image; it is not the cryptographic part.

**Digital stamp / e-seal** — the cryptographic part. An electronic seal is, in
plain terms, the digital equivalent of a company stamp: it shows which
organisation the document came from and makes any later change to the file
detectable. Importantly, a seal is issued to an **organisation**, not to a person.

**Certificate** — the digital credential used to create a seal or signature. Its
contents determine whose name appears when a PDF reader inspects the signature.

**Timestamp** — a trusted record of *when* something was signed, obtained from an
independent service so the date does not rest on the signer's own clock.

**TSA (Timestamp Authority)** — the independent service that issues those
timestamps.

**TSP (Trust Service Provider)** — an organisation that issues certificates and
related trust services. A *qualified* TSP is one formally recognised under EU
rules.

**PAdES** — the family of standards for signatures inside PDF files. It is the
reason a PadSign-signed PDF opens and validates in ordinary PDF readers rather
than needing special software.

**eIDAS** — the EU regulation that defines electronic signatures and seals and
sets out their legal standing. It is where the terms "advanced" and "qualified"
come from.

**Advanced electronic signature** — a signature that can be linked to a specific
person and document, but which does not carry the highest legal weight.

**Qualified electronic signature (QES)** — the highest level under eIDAS, created
with a qualified certificate from a qualified trust service provider. Only this
level is treated as legally equivalent to a handwritten signature.

**ASiC-E** — a common EU container format for signed documents, used as an
alternative to plain PDF output.

**Revocation checking (OCSP)** — a check that the certificate used was still valid
at the moment of signing, rather than withdrawn.

**Demo mode** — an evaluation setting that lets you load any PDF from the device
and sign it, without connecting PadSign to your other systems first.

## Questions this answers

- What do these terms mean?
- What is a visual signature?
- What is an e-seal?
- What does PAdES mean?
- What is a timestamp authority?
- What is a trust service provider?
- What is the pad in PadSign?

*Related terms: glossary, definitions, terminology, what does that mean, jargon, eidas, tsp, qualified.*
