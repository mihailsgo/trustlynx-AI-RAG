---
id: 10-04-signing-failed-message
title: It says signing failed — what does that mean?
summary: >
  The document was not signed. A failure stops the process rather than producing a
  half-signed document, so nothing incomplete has been filed. Tap Close, tell staff what
  the message said, and signing again is safe.
section: troubleshooting
audience: [end-user]
answer_style: direct
keywords:
  - signing failed
  - error
  - failed
  - visual signature error
  - stamping service
  - http error
  - try again
  - did it sign
  - partially signed
questions:
  - It says the signing workflow failed, what does that mean?
  - Was my document signed if I got an error?
  - What does "Error in stamping service response" mean?
  - What does "Error in visual signature" mean?
  - Is it safe to try signing again?
  - Could the document be half-signed?
images:
  - file: images/screen-progress-failed.png
    caption: images/screen-progress-failed.md
    alt: The progress panel with the digital stamp step marked failed and a Close button.
    role: primary
related:
  - 03-02-screen-signing-progress-and-outcome
  - 03-03-on-screen-message-catalogue
  - 06-05-volume-concurrency-and-resilience
disclaimer: null
do_not_state:
  - That the document may have been partially signed or partially filed.
  - That the signer should investigate or resolve the underlying fault.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# It says signing failed — what does that mean?

## The document was not signed

Start here, because it is the thing people worry about: **a failure means nothing was signed.**

Each stage of signing produces a new version of the document rather than altering the previous
one. If a stage fails, the process stops and the earlier version is left intact. There is no
state where a document ends up half-signed, partly filed, or damaged.

So you have not accidentally agreed to anything, and there is no corrupted document sitting in
somebody's system.

## What you see

The progress panel turns red. The title changes to say the signing workflow failed, the step that
went wrong is marked with a cross, and a **Close** button appears.

![The progress panel with a failed step and a Close button](../images/screen-progress-failed.png)

The subtitle names which stage failed, sometimes with a code in brackets.

## What the messages mean

**"Signing failed! Please try again."** — the process stopped. The most general form of the
message.

**"Error in visual signature"** — the stage that places your drawn signature into the page did not
complete.

**"Error in stamping service response"** — the cryptographic sealing stage did not complete. This
often means a service the system depends on was temporarily unreachable.

A code in brackets is a technical detail for whoever supports the system. It is worth repeating to
staff because it tells them where to look.

## What to do

**1. Tap Close.**

**2. Tell the person at the desk**, and mention what the message said including any code.

**3. Try again if they ask you to.** Re-signing is safe — there is no risk of creating two signed
copies, because the first attempt produced no signed document at all.

## Why it might have happened

Usually something temporary: a service the system depends on was briefly unavailable, or a network
hiccup. These often clear on their own, which is why trying again frequently works.

If it fails repeatedly with the same message, something needs attention on the system side. That
is not something you can resolve from the pad — staff will need to escalate it.

## A note for staff

The failure is reported back automatically, so a system waiting on this document is told the
attempt failed rather than being left indefinitely expecting a signature. If failures are
recurring, the message and any code are the useful details to pass on.
