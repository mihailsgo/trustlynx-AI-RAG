---
type: image-caption
id: screen-server-offline
image: images/screen-server-offline.png
alt: A full-screen message reading Application server is not available, with a Retry Now button.
used_by:
  - 10-05-cannot-get-into-the-portal
audience: [end-user]
keywords: [application server is not available, offline, cannot connect, retry now, backend, red message, down]
questions:
  - What does the connection error screen look like?
  - What does Application server is not available look like?
  - What is the Retry Now button?
sanitised: true
capture_note: Demo mode with the health check deliberately failing. No customer data.
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

The connection-failure screen. It replaces the entire interface — there is no logo, no document
and no signature box, which is how it differs at a glance from the ordinary resting screen.

Centred on an otherwise empty page, in red: **Application server is not available**, and beneath
it *The backend server is not running or not accessible.* Below that, in grey, *The application
will automatically retry the connection every 10 seconds.*

A blue **Retry Now** button sits underneath. It forces an immediate reconnection attempt rather
than waiting for the next automatic one; it is a convenience, not a fix.

The pad recovers by itself once the connection returns, so often the right response is simply to
wait a moment. This is not something a visitor can resolve, and it does not indicate anything they
did wrong — the correct action is to tell a member of staff.

No already-signed document is at risk. A document that was sitting unsigned on the pad will need
sending again once the connection is restored.
