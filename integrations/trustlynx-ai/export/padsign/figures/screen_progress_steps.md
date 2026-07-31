---
doc_id: padsign_fig_screen_progress_steps
source_path: padsign/figures/screen_progress_steps.md
source_type: markdown
title: >-
  Screen: A progress panel showing four signing steps, with the digital stamp step in progress at 63
  per cent
language: en
audience:
  - public
product: padsign_2_0
department: shared
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:5c5e7fe06def2f50b1f36a70b9605afa90c9b62f624bf8e1015375470fc739de
tags:
  - padsign
  - screenshot
  - end-user
  - prospect
summary: >-
  A progress panel showing four signing steps, with the digital stamp step in progress at 63 per
  cent.
extra:
  kb_image_id: screen-progress-steps
  used_by:
    - 00-04-capabilities-at-a-glance
    - 03-02-screen-signing-progress-and-outcome
    - 04-01-two-things-that-happen-when-you-sign
  capture_note: Demo mode. Captured mid-flow with the sealing step deliberately held open.
---

# Screen: A progress panel showing four signing steps, with the digital stamp step in progress at 63 per cent

![A progress panel showing four signing steps, with the digital stamp step in progress at 63 per cent.](knowledge/raw/padsign/images/screen-progress-steps.png)


The progress panel that appears after tapping **Sign**, captured while signing is still under
way. It replaces the signature area and covers the document.

At the top, the heading **Signing workflow in progress** and below it *Please wait while each
step is completed.*

Underneath sits a progress bar, partly filled and shading from blue to green, with **63%** shown
in a pill to its right. Below the bar, four steps are laid out left to right, each with a circular
marker above its label:

1. **Preparing document for signing** — green circle with a tick, done
2. **Applying visual signature** — green circle with a tick, done
3. **Applying digital stamp** — blue filled circle, currently running
4. **Finalizing workflow** — empty grey circle, not started

The three marker styles are the whole vocabulary of this panel: empty means not started, filled
blue means running, ticked green means finished.

Four steps appear here because this deployment applies a cryptographic seal. Where sealing is
switched off there are three, without "Applying digital stamp". Nothing is required from the
person waiting.

## Questions this answers

- What are the four steps shown after I tap Sign?
- What does the percentage on the progress panel mean?
- What do the circles above the step names mean?

*Related terms: in progress, preparing document, visual signature, digital stamp, finalizing, waiting.*
