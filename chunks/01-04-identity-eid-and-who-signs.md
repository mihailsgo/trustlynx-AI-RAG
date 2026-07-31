---
id: 01-04-identity-eid-and-who-signs
title: Does PadSign verify identity or work with Smart-ID and national eIDs?
summary: >
  No. PadSign does not verify the signer's identity - not against Smart-ID, national eID
  cards, or any register. The evidence of who signed rests on physical presence and the
  drawn mark. National eID tools belong to a different product category, and TrustLynx
  offers a separate Authentication Service for that.
section: positioning
audience: [prospect]
answer_style: direct
keywords:
  - smart-id
  - mobile-id
  - eid
  - national id
  - eparaksts
  - identity verification
  - id card
  - authentication
  - kyc
  - verify who signs
  - digital identity
  - eu wallet
questions:
  - Does PadSign support Smart-ID or Mobile-ID?
  - Can PadSign verify the signer's identity?
  - Does the signer log in with their national eID?
  - How do we know who really signed on the pad?
  - Can we combine PadSign with identity verification?
  - Does PadSign support the EU Digital Identity Wallet?
images: []
related:
  - 04-07-who-is-named-as-the-signer
  - 04-03-eidas-levels-simple-advanced-qualified
  - 01-05-padsign-and-the-trustlynx-product-family
disclaimer: >
  Whether presence-based evidence of identity satisfies a given legal or regulatory
  requirement depends on the requirement - confirm with TrustLynx and your own advisers.
do_not_state:
  - That PadSign integrates with Smart-ID, Mobile-ID, national eID cards, or the EU Digital Identity Wallet.
  - That combining PadSign with the TrustLynx Authentication Service is a supported product configuration, without confirming with TrustLynx.
  - That PadSign performs KYC or any identity check against a register.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# Does PadSign verify identity or work with Smart-ID and national eIDs?

Short answer: **no** — and understanding why is useful, because it clarifies what kind of
product PadSign is.

## What PadSign does about identity

Nothing, by design. The person signing never logs in, is not asked for an ID document, and is
not checked against any register. What the system records is the signature they drew, whatever
they typed, and — in some setups — a name supplied by the sending system so the signer can
confirm the document is meant for them.

The evidence of *who signed* rests on the situation PadSign is built for: **the signer is
physically present** at the organisation's own device, usually in front of a member of staff.
That presence, plus the drawn mark, is the identity story — the same one paper had.

## Why Smart-ID keeps coming up, and what it actually is

Tools like **Smart-ID**, **Mobile-ID**, national **eID cards** and the coming **EU Digital
Identity Wallet** are qualified digital-identity instruments. When one of them is used, the
user's identity is verified against official registries — which is precisely what enables the
highest legal signature level under eIDAS.

They are the answer to a different question: *remote* signing, where nobody can see the signer
and identity must be established electronically. PadSign answers the in-person question, where
the person is standing in front of you. Mentioning Smart-ID in explanations of signature
levels does not mean PadSign uses it — it does not.

## If you need both

Real organisations often do: in-person signing at the counter, and strong electronic identity
elsewhere in the business. Within the TrustLynx range those are separate products — PadSign
for the counter, and a dedicated **Authentication Service** that acts as a gateway to national
eID cards, mobile IDs and similar instruments for your portals and e-channels.

Whether and how the two can be combined in one process is a solution-design question for
TrustLynx, not something to assume from this knowledge base.

## The honest evaluation question

If your requirement is "we must be able to prove, to a legal standard, exactly who signed" —
raise it explicitly. Presence-based evidence is enough for a great many counter and delivery
processes (it is what paper offered), but if a regulator or counterparty demands
registry-verified identity, that points at qualified identity tools, and the conversation
with TrustLynx should start there.
