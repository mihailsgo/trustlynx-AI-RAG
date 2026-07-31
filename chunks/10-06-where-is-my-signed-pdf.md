---
id: 10-06-where-is-my-signed-pdf
title: Where is my signed PDF?
summary: >
  It goes wherever the deployment is configured to send it — a folder systems watch, back to
  the computer that sent it, or announced to another system. Signers do not get an automatic
  copy; that is the organisation's process.
section: troubleshooting
audience: [end-user, prospect]
answer_style: direct
keywords:
  - where is my signed pdf
  - find signed document
  - copy of document
  - did not receive
  - download
  - where did it go
  - missing file
  - my copy
questions:
  - Where is my signed PDF?
  - How do I get a copy of what I signed?
  - The signed document has not arrived, where is it?
  - Will I be emailed the signed document?
  - Where does the signed file get saved?
  - Can I have my copy printed?
  - Can I take a photo of the screen before it resets?
images: []
related:
  - 07-02-delivery-options-folder-and-webhook
  - 07-03-getting-the-signed-pdf-back-to-the-sending-computer
  - 07-01-what-happens-to-the-document-after-signing
disclaimer: null
do_not_state:
  - That signers automatically receive a copy of what they signed.
  - Specific folder paths, which are configured per deployment.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# Where is my signed PDF?

The answer depends on how the organisation set PadSign up, because delivery is configurable.
There are three normal destinations, and a deployment can use more than one.

## The three destinations

**1. A folder their systems watch.** The signed PDF is written into a location on a filesystem,
organised into folders and named according to a pattern the organisation chose. Their existing
process picks it up from there.

**2. Back to the computer that sent it.** If the document was sent from a Windows desktop using the
companion app, the signed version returns to that same machine automatically. It waits until the
machine collects it, so a PC that was switched off still gets it later.

**3. Announced to another system.** PadSign notifies a system that the document has been signed, and
that system fetches or records it as part of its own process.

## If you are the person who signed

You do not automatically get a copy. PadSign's job is to produce the signed document and put it
into the organisation's systems; whether they then send you one is their process, not a product
feature.

**Ask before you leave the counter.** It is far easier for them to arrange at that moment than
afterwards. They can usually email or print one.

If you are chasing a copy later, contact the organisation you signed with — not TrustLynx. Only the
organisation has your document.

## If you are staff and the file has not appeared

Work through these:

**Did signing actually complete?** A success message on the pad means the document was signed and
delivered. A failure message means nothing was signed, so there is no file to find. That is the
first thing to establish.

**Is the companion app running**, if you expected the file back on your own PC? Collection only
happens while it is running, and the document waits until it is.

**Is your machine online?** Same point — the document is not lost, just not collected yet.

**Are you looking in the right place?** Delivery destination is configuration. If your deployment
writes documents to a shared folder rather than returning them to desktops, no amount of waiting
will make one appear on your PC. Whoever set the deployment up knows which applies.

**Has the notification to another system failed?** If your process depends on PadSign notifying a
system, note that failed notifications are retried but a permanent failure is only recorded in the
logs — nobody is alerted. If a document is genuinely signed but your system does not know, that is
worth having someone check.

## The reassuring part

A signed document is not lost because a screen reset, a PC was off, or a network dropped. It is
stored once signing completes, and the pathways that deliver it either retry or wait. If signing
reported success, the document exists.
