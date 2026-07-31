---
type: image-caption
id: screen-progress-failed
image: images/screen-progress-failed.png
alt: The progress panel with the digital stamp step marked failed and a Close button.
used_by:
  - 03-02-screen-signing-progress-and-outcome
  - 10-04-signing-failed-message
audience: [end-user]
keywords: [failed, error, signing workflow failed, stamping service, http 502, close button, red cross, not signed]
questions:
  - What does the failure screen look like?
  - What does the red cross on a signing step mean?
  - Why is there a Close button after signing failed?
sanitised: true
capture_note: Demo mode. The sealing step was deliberately made to fail to capture this state.
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

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
