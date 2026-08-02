---
doc_id: padsign_04_01_two_things_that_happen_when_you_sign
source_path: padsign/04_01_two_things_that_happen_when_you_sign.md
source_type: markdown
title: Two different things happen when you sign
language: en
audience:
  - public
product: padsign_2_0
department: shared
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:b954f9b4bbc14c4123bdc603529089316970c6848c552b5a6ae8343565c27b13
tags:
  - padsign
  - signature-law
  - end-user
  - prospect
summary: >-
  Your drawn mark is placed into the page as a picture. Separately, a cryptographic seal can be
  applied to the whole file. They are different mechanisms with different weight, and the seal is
  the part that makes the file tamper-evident.
extra:
  kb_chunk_id: 04-01-two-things-that-happen-when-you-sign
  kb_audience:
    - end-user
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - That the drawn image is itself an advanced or qualified electronic signature.
    - That the seal identifies the individual person who signed.
    - That sealing happens in every deployment.
  source_checksum: sha256:728ffaddf97e1568d0c12d87cdfef4f9d1b9ab4ff80ede0eaf7a635c4354b0c9
---


# Two different things happen when you sign

This is the single most useful thing to understand about a PadSign document,
because the two parts are easy to confuse and they do not do the same job.

## 1. The visual signature — what people see

The mark you draw with your finger or stylus is placed **into the page** of the PDF,
like an image pasted onto the paper. Anyone who opens the file later sees your
signature sitting there in the document.

That is its purpose: it makes the document look and read like a signed document. On
its own, it is a picture of a signature. A picture can be copied, so by itself it is
not what proves the document is genuine.

## 2. The cryptographic seal — what proves the file

Separately, a seal can be applied to the **whole file**. TrustLynx describes an
electronic seal as the digital equivalent of a company stamp: it provides evidence of
the document's origin and integrity, assuring recipients that a specific legal entity
issued the document and that it has not been tampered with since.

Two consequences worth being clear about:

- **It covers the entire document.** Any later change to the file — a word, a number,
  a page — is detectable. This is what "tamper-evident" means in practice.
- **It is issued to an organisation, not to you.** A seal uses a certificate belonging
  to a legal entity. So when a PDF reader shows who signed, it typically names the
  organisation, not the individual.

## How you see both happen

The progress panel shows them as separate steps: "Applying visual signature", then
"Applying digital stamp".

![A progress panel showing the visual signature step complete and the digital stamp step active](images/screen-progress-steps.png)

## The seal is optional

Not every deployment uses it. TrustLynx describes the e-seal function as optional,
for organisations with a compliance need for proof of authenticity and origin. Where
it is switched off, the progress panel shows three steps instead of four and the
document carries the visual signature only.

If it matters to you whether a particular document is sealed, ask the organisation
that produced it — it is their configuration choice, not a property of PadSign.

## Questions this answers

- What is the difference between the visual signature and the digital stamp?
- Is my drawn signature the legally binding part?
- What does the seal actually do?
- Why are there two signing steps?
- How do I know the document has not been altered?

*Related terms: e-seal, two steps, what is the seal, tamper evident, integrity, is the drawing enough.*

> **Important:** This explains how the mechanisms work, not what legal effect they have in your situation. Legal standing depends on the certificate and timestamp authority the operating organisation chose, and on the jurisdiction. Confirm with TrustLynx and your own legal advisers before relying on it.
