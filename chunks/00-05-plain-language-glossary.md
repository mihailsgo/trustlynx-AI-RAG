---
id: 00-05-plain-language-glossary
title: PadSign glossary in plain language
summary: >
  Short plain-English definitions of the terms that come up around PadSign: pad,
  portal, visual signature, e-seal, timestamp, PAdES, eIDAS, qualified and
  advanced, TSP and TSA.
section: product
audience: [end-user, prospect]
answer_style: direct
keywords:
  - glossary
  - definitions
  - terminology
  - what does that mean
  - jargon
  - visual signature
  - e-seal
  - eidas
  - pades
  - timestamp
  - tsp
  - qualified
questions:
  - What do these terms mean?
  - What is a visual signature?
  - What is an e-seal?
  - What does PAdES mean?
  - What is a timestamp authority?
  - What is a trust service provider?
  - What is the pad in PadSign?
images: []
related:
  - 04-01-two-things-that-happen-when-you-sign
  - 04-03-eidas-levels-simple-advanced-qualified
  - 04-04-pades-levels-and-long-term-validity
disclaimer: null
do_not_state:
  - That any definition here constitutes legal advice or a legal opinion.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
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
