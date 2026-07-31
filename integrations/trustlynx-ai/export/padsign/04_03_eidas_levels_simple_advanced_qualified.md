---
doc_id: padsign_04_03_eidas_levels_simple_advanced_qualified
source_path: padsign/04_03_eidas_levels_simple_advanced_qualified.md
source_type: markdown
title: eIDAS signature levels — basic, advanced and qualified
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:cb05a265d9b5fa0ab31a1da6a00c83d46c460495ef32806b109616d1591ec305
tags:
  - padsign
  - signature-law
  - prospect
summary: >-
  eIDAS defines three levels. Basic proves little. Advanced links a signature to a person and
  document but is bound to parties who agreed to use it. Only qualified, built on a qualified
  certificate with identity validated against state registries, equals a handwritten signature.
extra:
  kb_chunk_id: 04-03-eidas-levels-simple-advanced-qualified
  kb_audience:
    - prospect
  answer_style: hedged-legal
  confidence: verified
  do_not_state:
    - That PadSign produces a signature at any particular eIDAS level.
    - That a level described here is achieved by installing the software.
---


# eIDAS signature levels — basic, advanced and qualified

eIDAS is the EU regulation covering electronic signatures and seals. It defines three
general levels, and they differ enormously in legal weight. As TrustLynx puts it, not
all e-signatures are created equal.

## Basic electronic signature

The everyday kind, often without anyone noticing. Ticking a box to accept terms and
conditions. Scanning a hand-signed document and emailing it.

These are genuinely electronic signatures, but there is no way to guarantee that a
particular person signed that particular document. Very little evidential value.

## Advanced electronic signature (AES)

Defined in eIDAS Article 26. An advanced signature **can be linked to a specific
person and a specific document**, which is a real step up. Typical examples are a
click recorded in an internal workflow system, a customer portal, or an online banking
platform where each user has a registered account and activity is tracked.

Most widely used e-signing providers offer advanced signatures.

The limitation is important and often glossed over. TrustLynx states it directly: this
level of signing is **bound to the parties who have agreed on using it**, and cannot
be accepted in courts, government authority institutions, or other institutions.

In other words, advanced is often perfectly adequate between two organisations that
have agreed to accept it, and inadequate if you need to rely on it in front of a third
party who has not.

## Qualified electronic signature (QES)

The highest legal power. Created by a qualified signature creation device, using a
**qualified certificate** issued by a **qualified Trust Service Provider**.

The decisive point: only a qualified electronic signature, where each signer's
identity has been validated against state registries, has the same legal power as a
handwritten signature.

Smart-ID in the Baltics and It'sMe in Benelux are examples of qualified signature
solutions, alongside national e-ID cards in many countries.

## Electronic seals sit alongside this

A seal is the same cryptography with a certificate issued to a **legal entity** rather
than a person. It comes in qualified and advanced forms too — TrustLynx supports both
"Qualified Electronic Seal" and "Advanced Electronic Seal supported by Qualified
Certificate", as well as certificates issued elsewhere.

But a seal answers a different question. Legally, seals are not used to take
responsibility for the content in the way a signature is. They provide verifiable
evidence of the **origin** of the data — that it was issued by a specific legal entity
— which anyone can check.

## Choosing a level

Higher is not automatically correct; it costs more and adds dependencies on external
authorities. The question is what you need to prove, to whom, and whether that party
has agreed in advance to accept your evidence. That is a legal question for your own
advisers, not a software setting.

## Questions this answers

- What are the eIDAS signature levels?
- What is the difference between advanced and qualified?
- What is a qualified electronic signature?
- What does eIDAS require?
- Which level do we need?
- Is an advanced signature enough?

*Related terms: basic, qes, aes, article 26, regulation, legal power, trust service provider.*

> **Important:** This is general information, not legal advice. Which level a given use case requires is a legal question for your own advisers, and reaching a level depends on the certificate and timestamp authority chosen. Confirm with TrustLynx before relying on it.
