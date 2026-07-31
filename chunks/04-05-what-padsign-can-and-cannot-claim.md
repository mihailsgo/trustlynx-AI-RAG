---
id: 04-05-what-padsign-can-and-cannot-claim
title: What PadSign can and cannot claim about signature validity
summary: >
  PadSign produces a standards-based PDF signature. Whether that signature counts as
  advanced or qualified depends entirely on the certificate and timestamp authority
  the operating organisation chose. The software alone does not determine the legal
  level.
section: signature-law
audience: [prospect]
answer_style: hedged-legal
keywords:
  - compliance
  - claims
  - eidas compliant
  - certified
  - guarantee
  - can you prove
  - marketing claim
  - what is guaranteed
questions:
  - Is PadSign eIDAS compliant?
  - Can you guarantee our signatures are qualified?
  - What compliance claims can we make about PadSign?
  - Is PadSign certified?
  - What exactly does PadSign guarantee?
images: []
related:
  - 04-02-what-your-signature-legally-is
  - 04-03-eidas-levels-simple-advanced-qualified
  - 11-01-known-limits-and-what-padsign-does-not-do
disclaimer: >
  This is general information, not legal advice. Whether a given signature meets a
  given legal requirement depends on the certificate, the timestamp authority and the
  jurisdiction involved. Confirm with TrustLynx and your own legal advisers before
  relying on it or repeating it in your own materials.
do_not_state:
  - That PadSign is "eIDAS compliant" or "eIDAS certified" as a product property.
  - That PadSign produces qualified electronic signatures or qualified seals.
  - That any specific certificate authority or timestamp authority is in use.
  - Any assessment of validity in a named jurisdiction or before a named court.
  - That TrustLynx holds any particular compliance certification.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# What PadSign can and cannot claim about signature validity

Worth being precise about, because loose wording here creates problems later.

## True in every deployment

- PadSign produces a **standards-based PDF signature** using the PAdES family of ETSI
  standards.
- The output is an ordinary PDF that mainstream readers can open and inspect.
- The signature covers the **whole document**, so any later alteration is detectable.
- The drawn signature is visible on the page, as a person would expect.
- TrustLynx supports both qualified and advanced electronic seal types, and
  certificates issued by other institutions.
- Deployment is on the customer's own infrastructure, behind their own firewalls.

## Depends on how the organisation configured it

- **Which legal level the signature reaches.** Determined by the certificate and its
  issuer, not by the software.
- **Whether a seal is applied at all.** Sealing is an optional function.
- **Whether an independent timestamp is included**, and whether that authority is a
  qualified one.
- **Whether certificate revocation is checked** at signing time.
- **Whether the deployment is production-grade or a demonstration.** Demo setups ship
  with a self-signed certificate that carries no legal weight whatsoever.

## Never claim

- That PadSign "is eIDAS compliant" or "is eIDAS certified". eIDAS compliance is not a
  property a signing application possesses. The regulation describes signatures and the
  authorities behind them.
- That PadSign "produces qualified electronic signatures". It can participate in
  producing one, given a qualified certificate from a qualified trust service provider.
  Without that, it does not.
- That a PadSign signature "is legally binding" as a feature. The sentence is empty
  without saying at which level and in which context.
- That the signature identifies the individual signer to a legal standard. PadSign does
  not verify identity against any official register, and TrustLynx is explicit that
  identity validation against state registries is what distinguishes a qualified
  signature.
- Any specific compliance certification for TrustLynx or the product.

## The one-sentence version

PadSign gives you a correct, standards-based mechanism; the legal weight of what comes
out of it is decided by the certificates and authorities you choose to put behind it.

## For anyone writing marketing or tender responses

Describe the mechanism accurately and attribute the legal level to the configuration.
"PadSign produces PAdES signatures and supports qualified and advanced electronic
seals; the level achieved depends on the certificate and timestamp authority selected"
is defensible. "PadSign is eIDAS compliant" is not.
