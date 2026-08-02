---
doc_id: padsign_04_07_who_is_named_as_the_signer
source_path: padsign/04_07_who_is_named_as_the_signer.md
source_type: markdown
title: Why the signed PDF names a company instead of the person
language: en
audience:
  - public
product: padsign_2_0
department: shared
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:117c95a34fd2ce14ce79dcbd3a66c07ea93e731da76f6c6692ffc80aecdb5c11
tags:
  - padsign
  - signature-law
  - end-user
  - prospect
summary: >-
  The cryptographic seal uses a certificate issued to an organisation, so that is the name a PDF
  reader reports. The individual appears as the drawn mark on the page, and optionally as a printed
  name beside it.
extra:
  kb_chunk_id: 04-07-who-is-named-as-the-signer
  kb_audience:
    - end-user
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - That the seal identifies or authenticates the individual signer.
    - That PadSign checks the signer's identity against an identity document or official register.
  source_checksum: sha256:94f3a4a0903b4d5e346faa335d810e3923172945d25b161e435d7710e5c0bf11
---


# Why the signed PDF names a company instead of the person

A common surprise: you open a signed document, check the signature, and it says it was
signed by an organisation — not by the person who actually drew the signature. That is
how it is supposed to work.

## Two different kinds of naming

**The organisation is named by the seal.** An electronic seal is made with a certificate
issued to a **legal entity**, not to an individual. TrustLynx describes a seal as the
digital equivalent of a company stamp. So when a PDF reader inspects the cryptographic
signature and reports who signed, it reports the certificate holder: the company.

**The individual appears on the page.** The person is represented by the signature they
drew, placed into the document where anyone can see it. Some setups also print a name
and date next to it.

So both are present in the finished file — they just live in different places and are
established by different means.

## What the seal is actually asserting

This is the part worth being precise about. Legally, a seal is not used to take
responsibility for the content the way a personal signature is. Its job is to provide
verifiable evidence about the **origin** of the data: that this document was issued by
that specific legal entity, and that it has not been altered since. Anyone can check
that independently.

It is a statement about provenance, not about who agreed to what.

## Does that mean nobody can tell it was me?

The document records your drawn signature and whatever details you entered. What PadSign
does **not** do is verify who you are. It does not check an identity document and it does
not look you up in any official register. Under EU rules, that identity validation is
precisely what distinguishes the highest signature level, and PadSign does not perform
it.

In practice, the evidence that it was you rests on the fact that you were physically
present at the organisation's device when you signed — which is the situation PadSign is
designed for — plus the drawn mark itself.

## If the printed name is wrong

Some setups show **Signer: <name>** above the signature box before you sign, drawn from
the system that sent the document. If that name is not yours, **do not sign** — tell the
person at the desk. It means the wrong record was used to generate the document, and the
finished file would attribute it incorrectly.

If you have already signed and only then noticed the name is wrong, say so straight
away. The document will need to be reissued; the name cannot be corrected in a sealed
file without invalidating the seal.

## Questions this answers

- Why does the PDF say it was signed by a company and not by me?
- Where is my name in the signed document?
- Who is named as the signer?
- The signature says the wrong name, is that a problem?
- How does anyone know it was me who signed?

*Related terms: company name, my name is not there, signer name, legal entity, certificate holder.*

> **Important:** This describes how the mechanism attributes a document. It is not advice on whether that attribution satisfies a particular legal or evidential requirement.
