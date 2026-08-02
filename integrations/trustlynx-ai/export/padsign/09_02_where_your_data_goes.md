---
doc_id: padsign_09_02_where_your_data_goes
source_path: padsign/09_02_where_your_data_goes.md
source_type: markdown
title: What data is involved, and where does it go?
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:a8f04d713a9bce9222ca03148b5d1d4f63b07bab6253940318b753b94f6e6e3d
tags:
  - padsign
  - devices
  - prospect
summary: >-
  The document, whatever the signer typed, the drawn signature image, and an account and
  organisation identifier. It all lives in the deployment's own environment. The one thing that may
  leave is the document itself, if cloud sealing is used.
extra:
  kb_chunk_id: 09-02-where-your-data-goes
  kb_audience:
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - Any retention period, or that PadSign deletes data after a given time.
    - >-
      That PadSign or TrustLynx is "GDPR compliant", or that a data-processing agreement is
      available.
    - Whether TrustLynx retains copies of documents sent for cloud sealing.
    - >-
      That biometric stroke data is or is not captured — only that the drawn shape is what is placed
      in the document.
  source_checksum: sha256:bfca8e4fe63dcf66fd621171a4aa038f09db0ddc5f071da19cf0a03a00d74bd0
---


# What data is involved, and where does it go?

## What exists

**The document.** The PDF, before and after signing, including whatever the signer typed into
its fields. If your form asks for a name, an address or a phone number, that is personal data
and it is in the document.

**The drawn signature.** An image of the mark the signer made, which is placed into the page.

**An account and organisation identifier.** Used to route the document to the right pad and to
scope delivery. This identifies the *device's* account, not the signer.

**Short-lived tracking state.** Which document is currently on which pad. It expires and is not
a records store.

**A signer name, in some setups.** Where the name label is used, it comes from the system that
sent the document.

## Where it lives

In your own environment. TrustLynx states that all its products are deployed on your company's
controlled infrastructure — cloud or on-premises — behind your firewalls, specifically so you do
not share data with any third party.

So the default position is that documents do not go anywhere you did not put them.

## The one exception to check

**If your deployment uses cloud sealing**, the document is sent to the TrustLynx e-sealing
service for that step and returned sealed. That is a genuine outbound transfer of the document
and should be part of any data-protection assessment.

If that is not acceptable, sealing can run in a container inside your own network instead, in
which case the document never leaves. That choice is available specifically for this reason.

Separately, higher signature levels contact a timestamp authority and revocation services. Those
exchanges are about the certificate and the signature, not the document content — the document
itself is not sent.

## Questions this cannot answer

Being direct about the limits here, because these come up in procurement and a confident wrong
answer is worse than none:

- **How long data is kept.** Retention depends on how the deployment is configured and on your
  own delivery destinations. There is no single product answer.
- **Whether TrustLynx retains a copy** of documents sent for cloud sealing. Ask them.
- **Whether a data-processing agreement is available**, and any compliance certifications. Ask
  them.
- **Whether stylus pressure, speed or timing is captured.** What is placed into the document is
  the shape that was drawn. Whether anything beyond that shape is recorded anywhere is not
  something to assert either way without confirmation.

These are reasonable things to put in writing to TrustLynx early. They are not architectural
mysteries — they are questions with owners, and the answers should come from those owners rather
than from a support agent's inference.

## One thing that is architecturally clear

There is no shared multi-tenant platform. Each deployment serves one organisation, so your
documents are not sitting in a system alongside other customers' documents. That removes a
whole class of concern that applies to hosted signing platforms.

## Questions this answers

- What data does PadSign hold?
- Is my data private?
- Is my information kept confidential?
- Does our data go to a third party?
- Is PadSign GDPR compliant?
- Does it store personal data?
- Does the document leave our network?
- Is biometric signature data captured?
- Will my signature image be reused for anything else?
- What are my rights over my data as a signer?
- How long is my data kept?

*Related terms: privacy, where does data go, what is stored, data protection, data residency, leaves our network, retention.*

> **Important:** This describes where data sits architecturally. It is not a data-protection assessment. Retention periods, lawful basis, and any data-processing agreement are matters for the operating organisation and for TrustLynx to confirm.
