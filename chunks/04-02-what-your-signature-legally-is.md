---
id: 04-02-what-your-signature-legally-is
title: Is a PadSign signature legally binding?
summary: >
  It depends on the certificate and timestamp authority the operating organisation
  chose, not on PadSign itself. The software produces a standards-based PDF
  signature; the legal level that signature reaches is a configuration and
  procurement decision.
section: signature-law
audience: [end-user, prospect]
answer_style: hedged-legal
keywords:
  - legally binding
  - legal
  - valid
  - court
  - enforceable
  - is it legal
  - does it count
  - qualified
  - advanced
  - eidas
questions:
  - Is a PadSign signature legally binding?
  - Does this signature count legally?
  - Will this hold up in court?
  - Is this a qualified electronic signature?
  - Is signing on a tablet as good as signing on paper?
  - Does an electronic signature from PadSign have legal force?
images: []
related:
  - 04-03-eidas-levels-simple-advanced-qualified
  - 04-05-what-padsign-can-and-cannot-claim
  - 04-01-two-things-that-happen-when-you-sign
disclaimer: >
  This is general information, not legal advice. Whether a given signature meets a
  given legal requirement depends on the certificate, the timestamp authority and
  the jurisdiction involved. Confirm with TrustLynx and your own legal advisers
  before relying on it.
do_not_state:
  - That PadSign is "eIDAS compliant" or "eIDAS certified" as a property of the product.
  - That PadSign produces qualified electronic signatures or qualified seals.
  - That any particular certificate authority or timestamp authority is in use.
  - Any assessment of validity in a named jurisdiction or before a named court.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# Is a PadSign signature legally binding?

The honest answer is that it depends on choices the operating organisation made, not
on PadSign. Here is what is true regardless, and what varies.

## True in every deployment

PadSign produces a **standards-based PDF signature**. The file is an ordinary PDF
that any mainstream reader can open and inspect. The signature covers the whole
document, so any later change to the file is detectable. Your drawn mark is visible
on the page.

## What varies, and decides the legal level

Under EU rules there are three levels of electronic signature, and which one a
signature reaches depends on **the certificate used and who issued it**. That is
procurement and configuration, not software behaviour.

So the same PadSign installation can produce a signature at a lower or a higher legal
level depending on:

- whose certificate is used, and whether the issuer is a **qualified** trust service
  provider
- whether an independent **timestamp authority** is involved
- whether revocation of the certificate is checked at signing time

A demonstration or evaluation setup typically ships with a self-signed certificate,
which is fine for testing and carries no legal weight at all. A production setup uses
a real certificate the organisation obtained.

## The part that is often misunderstood

Your **drawn mark** is not the cryptographic credential. It is a picture placed into
the page. The legal question is about the **seal** applied to the file, and a seal is
issued to an organisation rather than to you as an individual.

TrustLynx is explicit that only a **qualified** electronic signature, where the
signer's identity has been validated against state registries, has the same legal
power as a handwritten signature. PadSign does not verify your identity against any
official register.

## What to do with this

- **If you are signing something:** the document is a real record and the
  organisation is relying on it. If you need to know its exact legal standing before
  signing, ask them — it is their configuration.
- **If you are evaluating PadSign:** the product gives you the mechanism. Reaching a
  specific legal level is something to specify, and then confirm with TrustLynx and
  your own legal advisers, as part of choosing certificates and authorities.

Nobody should tell you PadSign is "legally binding" as a product feature. That
sentence does not mean anything on its own.
