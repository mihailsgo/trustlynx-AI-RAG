---
id: 04-06-checking-a-signed-pdf-yourself
title: How to check a signed PDF yourself
summary: >
  Open the PDF in a normal reader and look at its signature panel. There are three
  outcomes — valid, valid but not trusted, and invalid — and the middle one is the
  most commonly misread.
section: signature-law
audience: [end-user, prospect]
answer_style: step-by-step
keywords:
  - verify
  - check signature
  - adobe reader
  - signature panel
  - validate
  - not trusted
  - invalid
  - warning
  - yellow triangle
  - is it genuine
questions:
  - How do I check a signed PDF is genuine?
  - How do I verify the signature?
  - Why does Adobe say the signature is not trusted?
  - What does "validity unknown" mean?
  - How do I know the document has not been changed?
  - Where do I see who signed it?
images: []
related:
  - 04-07-who-is-named-as-the-signer
  - 04-01-two-things-that-happen-when-you-sign
  - 07-04-the-final-document-format
disclaimer: >
  A reader's verdict reflects that reader's own trust settings, not a legal
  determination. For questions about legal standing, consult TrustLynx and your own
  advisers.
do_not_state:
  - That a "valid" verdict in a PDF reader establishes legal validity.
  - Instructions for importing certificates into a trust store, which is operator work.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# How to check a signed PDF yourself

You do not need any TrustLynx software to check a PadSign document. The output is an
ordinary PDF, and ordinary readers can inspect it.

## What to do

1. **Open the PDF** in a mainstream reader that supports signatures — Adobe Acrobat
   Reader is the usual choice.
2. **Look for the signature notification** across the top of the document, or open the
   reader's signature panel.
3. **Read what it says** about the signature, and expand it to see who signed and when.

You should also see the drawn signature itself, sitting in the page where it was
placed. That part is visible in any reader, even one that ignores signatures entirely.

## The three outcomes

### Signature is valid

The reader recognises the certificate's issuer, the document has not been altered since
signing, and everything checks out. This is what you want.

### Signature is valid, but the signer is not trusted

Usually shown as a warning rather than an error — a yellow triangle, or wording like
"validity unknown" or "the signer's identity is unknown".

**This is the one people misread.** It does not mean the document was tampered with. It
means two separate things were checked and only one passed:

- **Integrity: passed.** The document has not changed since it was signed.
- **Trust: not established.** Your reader does not recognise the issuer of the
  certificate as one it trusts.

That happens routinely with a certificate issued by an authority your reader does not
carry in its trust list, and it always happens with a demonstration or self-signed
certificate. The document is intact; your software just has no basis to vouch for who
sealed it.

### Signature is invalid

The document has been modified since signing, or the signature is broken. Take this
seriously — the file you are looking at is not the file that was signed.

## What "valid" does and does not tell you

A green tick tells you the file is intact and the certificate chains to something your
reader trusts. It does **not** tell you the signature meets a particular legal standard.
That depends on whether the certificate came from a qualified trust service provider,
whether an independent timestamp was included, and the rules that apply in your
jurisdiction. A reader's verdict reflects that reader's trust settings, nothing more.

## A note on the name you will see

The signature panel usually names an **organisation**, not the person who drew the
signature. That is expected rather than a mistake: the cryptographic seal is made with a
certificate issued to a legal entity, so the entity is what the reader reports. The
individual who signed appears as the drawn mark in the page, and in some setups as a
name printed beside it.
