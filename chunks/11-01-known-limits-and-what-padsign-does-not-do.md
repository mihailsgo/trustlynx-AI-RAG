---
id: 11-01-known-limits-and-what-padsign-does-not-do
title: Limits, and what PadSign does not do
summary: >
  Browser-based with no native tablet app, built for a signer who is physically present, one
  signer per session in the standard flow, and not an identity-verification service, document
  management system or remote signing portal.
section: boundaries
audience: [end-user, prospect]
answer_style: direct
keywords:
  - limits
  - limitations
  - cannot
  - does not
  - not supported
  - multiple signers
  - offline
  - remote
  - identity verification
  - restrictions
questions:
  - What are PadSign's limitations?
  - What can PadSign not do?
  - Can two people sign the same document?
  - Can both parties countersign one contract on the pad?
  - Can I sign several documents one after another?
  - Does PadSign work offline?
  - Can PadSign verify someone's identity?
  - Is there a native tablet app?
images: []
related:
  - 01-01-in-person-signing-vs-remote-e-signature
  - 04-05-what-padsign-can-and-cannot-claim
  - 11-02-getting-help
  - 11-03-questions-this-knowledge-base-cannot-answer
disclaimer: null
do_not_state:
  - That multi-signer support definitively does not exist — it is not documented, which is not the same as impossible.
  - Maximum file sizes for the production flow, or supported browser versions.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# Limits, and what PadSign does not do

Worth knowing before you build a plan around it.

## Structural limits

**It needs a network connection.** The portal is served from your PadSign environment and talks to
it continuously. It is not an offline application. If connectivity at a delivery point is
unreliable, that is a real constraint to test rather than assume around.

**The signer must be physically present.** PadSign is built for face-to-face signing on your
device. It is not a way to send a document to someone to sign elsewhere.

**One signer per session, in the documented flow.** A document goes to a pad, one person signs it,
it completes. Nothing in the documentation describes collecting two signatures on the same document
in one flow. If you need countersigning, raise it with TrustLynx explicitly rather than assuming it
works — absence from the documentation is not the same as impossibility, but it is not something to
plan around unconfirmed.

Several documents **in a row** is a different matter and entirely normal: each document is its own
session, so a visitor with three forms simply signs them one after another as they arrive on the
pad. It is one signer per document, not one document per visit.

**Pad state does not survive a restart.** The tracking of which document is on which pad is
deliberately short-lived. If the system restarts, unsigned documents on pads need sending again.
Signed documents are unaffected.

**A document waits about ten minutes.** An unsigned document clears itself off the pad. Long
documents that genuinely need careful reading may need this adjusted.

## What PadSign is not

**Not an identity-verification service.** It does not check identity documents and does not look
anyone up in an official register. Under EU rules, identity validation against state registries is
exactly what distinguishes the highest signature level, and PadSign does not perform it. The
evidence that a particular person signed rests on their having been present at your device.

**Not a document management system.** It signs documents and hands them onward. The storage it
includes is part of the signing pipeline, not a records archive. Your authoritative long-term copy
is the one delivered to your own systems.

**Not a remote or email signing portal.** No links sent to signers, no signing at home.

**Not a document generator.** The document comes from your systems and your templates. PadSign
displays, fills and signs it.

**Not a legal guarantee.** The signature level PadSign produces depends on the certificate and
timestamp authority chosen. The software provides the mechanism; the legal weight comes from what
you put behind it.

**Not dedicated hardware.** No special signature pads to buy. Equally, there is no native tablet
app — the pad runs in a browser, which is a strength for deployment but does mean a browser and a
connection are required.

## Things this knowledge base cannot tell you

Some questions genuinely have no published answer, and guessing at them is worse than saying so.
Ask TrustLynx directly about: pricing figures, service levels and support hours, compliance
certifications and whether a data-processing agreement is available, supported browser and operating
system versions, minimum screen size, accessibility conformance for the signing interface, data
retention periods, whether documents sent for cloud sealing are retained, whether multiple signers
are possible, maximum document size in production, and what happens if the network drops
mid-signature.
