---
id: 03-02-screen-signing-progress-and-outcome
title: The progress panel, and what success or failure looks like
summary: >
  After tapping Sign, a panel shows the remaining steps with a percentage. On
  success every step turns green and a countdown resets the pad. On failure the
  step that failed is marked and a Close button appears.
section: screens
audience: [end-user]
answer_style: direct
keywords:
  - progress
  - steps
  - percentage
  - preparing document
  - applying visual signature
  - digital stamp
  - finalizing
  - success
  - failed
  - page will refresh
  - countdown
questions:
  - What are the steps shown after I sign?
  - What does "applying visual signature" mean?
  - What does "applying digital stamp" mean?
  - Why is the page counting down to refresh?
  - What happens if a step goes red?
  - It says the signing workflow failed, what now?
images:
  - file: images/screen-progress-steps.png
    caption: images/screen-progress-steps.md
    alt: A progress panel showing four signing steps, with the digital stamp step in progress at 63 per cent.
    role: primary
  - file: images/screen-progress-success.png
    caption: images/screen-progress-success.md
    alt: The progress panel with all four steps complete and a message that the document was signed successfully.
    role: supporting
  - file: images/screen-progress-failed.png
    caption: images/screen-progress-failed.md
    alt: The progress panel with the digital stamp step marked failed and a Close button.
    role: supporting
related:
  - 10-04-signing-failed-message
  - 04-01-two-things-that-happen-when-you-sign
  - 02-05-drawing-and-submitting-your-signature
disclaimer: null
do_not_state:
  - That all four steps appear in every deployment — the stamp step only appears where sealing is enabled.
  - That a failed signing has partially signed the document.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# The progress panel, and what success or failure looks like

As soon as you tap **Sign**, a panel takes over the screen. It replaces the
signature area and shows what the system is doing.

## While it is working

A title reads "Signing workflow in progress", with the line "Please wait while each
step is completed." Below that is a progress bar with a percentage, and a row of
step markers.

![A progress panel showing four steps with the digital stamp step active at 63 per cent](../images/screen-progress-steps.png)

The steps, in order:

1. **Preparing document for signing** — saving what you typed into the document.
2. **Applying visual signature** — placing the signature you drew into the page.
3. **Applying digital stamp** — adding the cryptographic seal. This step only
   appears if your organisation uses sealing; otherwise there are three steps
   instead of four.
4. **Finalizing workflow** — storing the finished document and handing it onward.

Each marker shows its state: empty for not started, a pulsing dot for in progress, a
tick for done.

## On success

Every marker turns green with a tick, the bar reaches 100%, and the title changes to
say the document was signed successfully. The subtitle then counts down — "Page will
refresh in 5..." — and the pad resets itself to the resting screen.

![The progress panel with all four steps complete and a success message](../images/screen-progress-success.png)

The countdown is not a deadline for you. Your document is already signed, stored and
sent onward by the time you see this. The reset just clears the screen for the next
person, so nothing is lost when it happens.

## On failure

The title changes to "Signing workflow failed" and the subtitle names which step
went wrong, sometimes with a code in brackets. The failed step is marked with a
cross, and a **Close** button appears.

![The progress panel with the digital stamp step marked failed and a Close button](../images/screen-progress-failed.png)

The important thing to understand: **the document was not signed.** A failure is not
a half-signed document — the process stopped. Nothing incomplete has been filed
anywhere.

Tap **Close**, and tell the person at the desk what the message said. Signing again
is safe.
