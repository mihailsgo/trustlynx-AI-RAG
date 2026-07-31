---
id: 01-03-branding-and-what-can-be-configured
title: Can PadSign be branded and configured for us?
summary: >
  Yes. The logo, page title, all interface wording, the signature area size, the
  signature position on the page, whether the seal step runs, and where signed
  documents are delivered are all configuration rather than custom development.
section: positioning
audience: [prospect]
answer_style: direct
keywords:
  - branding
  - customise
  - customize
  - our logo
  - white label
  - configuration
  - configurable
  - can we change
  - look and feel
questions:
  - Can we put our own logo on it?
  - Can PadSign be branded for our organisation?
  - What can be configured without custom development?
  - Can we change where the signature appears on the page?
  - Can we turn the digital seal off?
  - Is PadSign customisable?
images: []
related:
  - 01-02-languages-and-localisation
  - 06-06-updates-and-changing-settings-later
  - 07-02-delivery-options-folder-and-webhook
disclaimer: null
do_not_state:
  - Specific configuration file names, setting names, or values.
  - That any change not listed here is possible without confirming with TrustLynx.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# Can PadSign be branded and configured for us?

Yes, and most of it is configuration rather than custom development — settings
that are applied when the system is deployed and can be changed afterwards.

## Appearance

- **Your logo** replaces the default one, on both the resting screen and the
  in-document header.
- **Logo size** is adjustable separately for the large resting-screen version and
  the small in-document version.
- **The browser page title.**
- **All interface wording**, in both shipped languages.
- **Dark mode** follows the device's own appearance setting automatically; no
  configuration needed.

## The signature area

- **Size of the signature box** the signer draws in.
- **Where the signature is placed in the document** — position on the page, which
  page, and scale.
- **Whether the signer's name is displayed** above the signature area so they can
  confirm the document is theirs before signing.
- **Button text size**, for larger touch targets.

## Behaviour

- **Whether the cryptographic seal step runs at all.** Some deployments apply a
  visual signature only.
- **Where signed documents go** — into a folder your systems watch, back to the
  computer that sent the document, and/or announced to another system. The folder
  and filename pattern are both configurable.
- **How long a document waits on the pad** before it clears itself if nobody signs
  it.
- **Whether demo mode is available**, for evaluation.
- **Whether a signed-in user's details are shown** on screen.

## What is not a configuration change

The document itself. PadSign displays and signs the PDF your systems produce — the
layout, the wording and the fields in it come from your own templates, not from
PadSign settings.

Changing the *shape* of the signing flow — the sequence of steps, or adding a
second signer — is not a setting. If you need something structurally different
from the standard flow, that is a conversation with TrustLynx rather than a
configuration file.

## Changing your mind later

These are not one-shot decisions made at installation. Feature toggles, the
hostname, and certificate renewal are all supported post-go-live changes.
