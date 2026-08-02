---
doc_id: padsign_01_02_languages_and_localisation
source_path: padsign/01_02_languages_and_localisation.md
source_type: markdown
title: What languages does PadSign support?
language: en
audience:
  - public
product: padsign_2_0
department: shared
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:f6311c1e30a8941dd701342773187bef60610871235a0f5a143a4a0d1ef7a703
tags:
  - padsign
  - positioning
  - end-user
  - prospect
summary: >-
  PadSign ships with Latvian and English interface text, and the language is chosen per document
  rather than per device. All interface wording lives in a replaceable text file, so it can be
  adjusted or extended.
extra:
  kb_chunk_id: 01-02-languages-and-localisation
  kb_audience:
    - end-user
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - That any language other than Latvian and English is supported out of the box.
    - Whether adding a new language is included in a licence or is chargeable work.
  source_checksum: sha256:9670ec99593b0e887cdf4638ab0f37058d8b82d898b8b1545c7eb6e46752ed6f
---


# What languages does PadSign support?

Two languages ship with the product: **Latvian** and **English**. Both are
complete — every piece of interface text exists in both.

## The language is chosen per document, not per device

This is the part that surprises people. The language is not a setting on the
tablet. It travels with the document.

When a document is sent to the pad, the sending system can say which language the
interface should use for that document. So the same tablet can show an English
interface to one visitor and a Latvian interface to the next, with no one touching
a setting in between.

If the sending system does not specify a language, the pad falls back to a default
chosen when the system was set up.

## What the language affects

The interface wording the signer sees: the buttons, the progress steps, status
messages, and any validation messages.

It does **not** translate the document itself. The PDF is whatever your system
generated — if you need the document in two languages, your templates provide
that, not PadSign.

## Adjusting the wording

All interface text lives in a single configuration file rather than being built
into the software, so wording can be changed without a new release. That means
labels can be adapted to your own vocabulary — useful if your organisation calls
people "clients" rather than "visitors", for example.

The same mechanism is how an additional language would be added: the text is data,
not code. Whether adding one is something you can do yourself or something to
arrange with TrustLynx is worth asking them directly.

## Questions this answers

- What languages does PadSign support?
- Is PadSign available in English?
- Can PadSign show Latvian?
- Can we add another language?
- Can we change the wording on the buttons?
- How is the language chosen?

*Related terms: localisation, localization, translation, multilingual, change language, interface language.*
