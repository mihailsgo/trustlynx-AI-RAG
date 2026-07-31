---
type: image-caption
id: screen-download-signed
image: images/screen-download-signed.png
alt: The demo controls after signing, showing both Load DEMO PDF and Download signed PDF buttons.
used_by:
  - 06-04-demo-mode
audience: [end-user, prospect]
keywords: [download signed pdf, save signed document, after signing, demo mode, two buttons, get the file]
questions:
  - Where is the Download signed PDF button?
  - How do I save the signed file in demo mode?
sanitised: true
capture_note: Demo mode with a signed demo document present, placeholder account. Cropped to the control cluster.
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

The demo control cluster after a document has been signed. Two outlined buttons now sit side by
side: **Load DEMO PDF** on the left, as before, and **Download signed PDF** on the right.

The second button appears only once a demo document has been signed successfully. Tapping it saves
the finished signed PDF to the device, so it can be opened in a PDF reader and inspected — including
looking at the signature panel to see what was actually produced.

Below the buttons, the rounded box again shows the account and organisation the device is signed in
as, here the placeholder `anna.berzina@example.com` and `Example Corp`.

This download button is a demo-mode feature and does not exist in production. In normal use the pad
clears itself a few seconds after signing and the signed document is delivered automatically to
wherever the deployment sends it, rather than being saved onto the tablet.
