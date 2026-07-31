---
doc_id: padsign_07_04_the_final_document_format
source_path: padsign/07_04_the_final_document_format.md
source_type: markdown
title: What does the finished signed document look like?
language: en
audience:
  - public
product: padsign_2_0
department: shared
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:bb1ce4708cb8f70f3ea76b7e9802a11cc8641a08e60e38a78ca7a8bb7c832d81
tags:
  - padsign
  - delivery
  - end-user
  - prospect
summary: >-
  An ordinary PDF. It opens in any reader, shows the drawn signature on the page, and where sealing
  is used the reader's signature panel reports who sealed it and whether the file has been altered.
  ASiC-E is also available as an output format.
extra:
  kb_chunk_id: 07-04-the-final-document-format
  kb_audience:
    - end-user
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - That every deployment produces the same signature level or the same output format.
    - That a PDF reader's verdict establishes legal validity.
---


# What does the finished signed document look like?

**An ordinary PDF.** That is the short answer, and it is the most important practical fact
about the output.

## No special software needed

The signed file is a standard PDF. Anyone can open it — in Adobe Acrobat Reader, in a browser,
in whatever their organisation uses. Nothing from TrustLynx is needed to read it, and nobody
you send it to has to install anything.

This is a consequence of using the PAdES standards, which define how signatures live inside
PDF files rather than in a wrapper around them.

## What you see in it

**The drawn signature is on the page.** The mark the signer made appears in the document where
it belongs, and it is visible in any reader — even one that ignores digital signatures
entirely. In some setups a name and date are printed alongside it.

**The completed form values are in the page**, exactly as entered.

**The seal shows up in the reader's signature panel**, where sealing is used. A reader that
understands signatures will report who sealed the document and tell you whether the file has
been altered since. A reader that does not simply shows a normal PDF.

## Longevity

Because it is a plain PDF, readability is not at risk — PDF is about as safe a long-term
document format as exists, and no proprietary component is involved.

Whether the *signature* still verifies decades later is a separate question and depends on the
signature level the deployment uses. The higher levels exist specifically to keep verifying as
certificates expire and cryptographic algorithms age. If you need documents to stand up over
a long retention period, that is worth specifying rather than assuming.

## ASiC-E as an alternative

TrustLynx output is either PDF — the widely used option, and what PadSign produces — or
**ASiC-E**, the EU common container format. Many EU countries have their own national format
for documents signed with a qualified signature; these two cover the common ground.

If a counterparty or authority requires a particular container format, raise it early, because
it affects configuration rather than being something to convert afterwards.

## What it is not

Not an image, not a scan, and not a proprietary format. The document is machine-readable, its
text is selectable and searchable, and the values entered on the pad are real field data
rather than a picture of typing.

## Questions this answers

- What format is the signed document?
- Do I need special software to open it?
- Is the output a normal PDF?
- What is ASiC-E?
- Can I open the signed document in years to come?
- Will the signature be visible in the document?

*Related terms: output format, file format, what does the file look like, can i open it, proprietary.*
