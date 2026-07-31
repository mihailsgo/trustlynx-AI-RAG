---
doc_id: padsign_fig_screen_progress_failed
source_path: padsign/figures/screen_progress_failed.md
source_type: markdown
title: 'Screen: The progress panel with the digital stamp step marked failed and a Close button'
language: en
audience:
  - public
product: padsign_2_0
department: support
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:eaf0e9939d63824c33c5ab6ad448d47ed82129eba992f7e9b589fe3a4f1e33a2
tags:
  - padsign
  - screenshot
  - end-user
summary: The progress panel with the digital stamp step marked failed and a Close button.
extra:
  kb_image_id: screen-progress-failed
  used_by:
    - 03-02-screen-signing-progress-and-outcome
    - 10-04-signing-failed-message
  capture_note: Demo mode. The sealing step was deliberately made to fail to capture this state.
---

# Screen: The progress panel with the digital stamp step marked failed and a Close button

![The progress panel with the digital stamp step marked failed and a Close button.](knowledge/raw/padsign/images/screen-progress-failed.png)


The failure panel, shown when a signing step does not complete.

The heading reads **Signing workflow failed**, and below it the specific reason — in this capture
*Error in stamping service response (HTTP 502)*. The code in brackets is a technical detail worth
repeating to staff, because it tells whoever supports the system where to look.

The progress bar is filled in red rather than green. Of the four steps below it, the first two —
Preparing document for signing and Applying visual signature — still show green ticks, because
they did complete. The third, **Applying digital stamp**, shows a red circle with a cross and a
red label. The fourth, Finalizing workflow, is an empty grey circle: it never ran.

A **Close** button sits centred at the bottom. It appears only on failure; the in-progress and
success panels have no button.

The green ticks can look as though the document was partly signed. It was not. Each step produces
a new version of the document rather than altering the previous one, so a step that fails simply
means the final signed version was never produced. Nothing incomplete has been filed anywhere,
and signing again is safe.

## Questions this answers

- What does the failure screen look like?
- What does the red cross on a signing step mean?
- Why is there a Close button after signing failed?

*Related terms: error, signing workflow failed, stamping service, http 502, not signed.*
