---
id: 06-04-demo-mode
title: What is demo mode?
summary: >
  An evaluation setting that lets you pick any PDF from the device, sign it, and
  download the result — without connecting PadSign to your other systems first. It adds
  buttons that must not be present in production.
section: deployment
audience: [end-user, prospect]
answer_style: direct
keywords:
  - demo mode
  - demo
  - trial
  - pilot
  - poc
  - proof of concept
  - evaluate
  - load demo pdf
  - download signed pdf
  - test
  - try it
  - proof of concept
questions:
  - What is demo mode?
  - How can we try PadSign without integrating it?
  - Is there a free trial or pilot version to test?
  - What does the "Load DEMO PDF" button do?
  - How do I download the signed PDF?
  - Can we use demo mode in production?
  - Why does the tablet have upload buttons?
  - What is the maximum PDF size in demo mode?
images:
  - file: images/screen-demo-controls.png
    caption: images/screen-demo-controls.md
    alt: The demo control cluster with a Load DEMO PDF button and the signed-in account shown beneath it.
    role: primary
  - file: images/screen-download-signed.png
    caption: images/screen-download-signed.md
    alt: The demo controls after signing, showing both Load DEMO PDF and Download signed PDF buttons.
    role: supporting
related:
  - 06-03-installation-at-a-glance
  - 02-01-signing-journey-overview
  - 03-03-on-screen-message-catalogue
disclaimer: null
do_not_state:
  - The configuration setting name or value that enables demo mode.
  - That demo mode is appropriate for production use.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# What is demo mode?

Demo mode exists to answer "can we see this working?" without first building an
integration.

Normally a document reaches the pad because one of your systems sent it. That means seeing
PadSign work requires connecting it to something. Demo mode removes that requirement: you
pick a PDF from the device itself, and the full signing flow runs on it.

## What it adds

**A "Load DEMO PDF" button.** Opens a file picker so you can choose any PDF on the device.
It uploads, and the document appears on the pad exactly as if a system had sent it.

![The demo controls with a Load DEMO PDF button and the signed-in account below it](../images/screen-demo-controls.png)

**A "Download signed PDF" button**, which appears after signing so you can save the finished
file and inspect it — including opening it in a PDF reader to look at the signature.

![The demo controls after signing, showing both buttons](../images/screen-download-signed.png)

**The signed-in account on display**, so you can see which account and organisation the pad
is using.

**No automatic reset.** In normal use the pad clears itself a few seconds after signing. In
demo mode the document stays so you can download it and look at what was produced.

## What it does not change

The signing itself is real. The form fields are filled in properly, the visual signature is
placed into the page, the seal is applied if the deployment is configured for it, and the
output is a genuine signed PDF. Demo mode changes how a document *arrives* and what you can
do with it afterwards, not how signing works.

That is what makes it useful for evaluation — what you see is what you would get.

## Limits worth knowing

- There is a **maximum upload size, 10 MB by default**, so a very large PDF may be refused —
  try a smaller one. This limit is specific to demo-mode uploads and says nothing about
  production documents.
- **Older XFA-style form PDFs are not reliably supported.** If you upload one you get a
  warning saying filled fields may not be saved, and to use a standard form PDF instead. Most
  PDFs with fillable fields are the standard kind.

## It must be off in production

Demo mode is an evaluation feature and the documentation is explicit that production
deployments must have it disabled. The reason is straightforward: it lets whoever is holding
the device upload arbitrary documents and download signed files. That is exactly what you
want while assessing the product and exactly what you do not want on a tablet sitting on a
public counter.

It is one of the toggles chosen at installation and can be turned off afterwards. If you see
these buttons on a pad that is supposed to be live, flag it.
