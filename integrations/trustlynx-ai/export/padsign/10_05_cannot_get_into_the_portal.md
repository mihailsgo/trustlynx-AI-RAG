---
doc_id: padsign_10_05_cannot_get_into_the_portal
source_path: padsign/10_05_cannot_get_into_the_portal.md
source_type: markdown
title: '"Application server is not available" and other access problems'
language: en
audience:
  - public
product: padsign_2_0
department: support
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:b731b90087d8aaef15d1932b4d60279340de5313ab1c35d1319407aa1bc900e2
tags:
  - padsign
  - troubleshooting
  - end-user
summary: >-
  A full-screen message meaning the pad cannot reach the system behind it. It retries every ten
  seconds by itself and has a Retry Now button. Not something a signer can fix, and no signed
  document is at risk.
extra:
  kb_chunk_id: 10-05-cannot-get-into-the-portal
  kb_audience:
    - end-user
  answer_style: direct
  confidence: verified
  do_not_state:
    - Any instruction to change network, server, or device configuration.
    - That a signer should attempt to log in.
  source_checksum: sha256:06bc4fdd51dd1cd8bacf51e40ea854f585fd7381f4a5753a7a1814ae85522484
---


# "Application server is not available" and other access problems

## What the message looks like

The whole screen is replaced by:

> **Application server is not available**
> The backend server is not running or not accessible.
> The application will automatically retry the connection every 10 seconds.

with a **Retry Now** button.

![A full-screen message reading Application server is not available with a Retry Now button](images/screen-server-offline.png)

## What it means

The pad cannot reach the system behind it. Either that system is not running, or something between
the device and it — network, wireless, proxy — is in the way.

The important thing is that the pad tells you clearly rather than appearing frozen or silently
failing. If you see this, you know exactly where you stand.

## What to do

**If you are the person signing:** tell the member of staff. This is not something you can fix
from the device, and there is nothing wrong with anything you did.

**If you are staff:** the pad retries every ten seconds on its own and recovers automatically when
the system comes back, so often the answer is to wait a moment. **Retry Now** just forces an
immediate attempt instead of waiting for the next cycle. If it persists, whoever runs the
deployment needs to look at it.

Worth checking quickly: does another pad show the same message? If all of them do, it is the system
or the network. If only one does, it is that device's connection.

## Is anything lost?

**No signed document is at risk.** Anything already signed and delivered is finished and stored —
it does not depend on the pad staying connected.

A document that was sitting **unsigned** on the pad will need sending again once the connection is
back. And if someone was part-way through filling in a form, that entry is lost and they will need
to start it again.

## If it shows a login screen instead

A pad should never present a login screen to a visitor. The device is signed in as the organisation
and stays that way.

If a login screen appears, the device's session has ended or been lost. Sessions do expire from
time to time — the device renews its own session silently in normal operation, but if renewal
fails (after a long period offline, for instance), the pad falls back to the login screen. A
visitor should not try to log in — they have no account and are not supposed to. Tell staff, who
can sign the device back in; it takes moments and nothing signed is affected.

## Related but different

Do not confuse this with the pad simply showing a **logo**. A logo means everything is working and
no document has been sent yet. This message means the connection itself is broken. The two need
completely different responses.

## Questions this answers

- It says "Application server is not available", what do I do?
- The pad cannot connect, how do I fix it?
- What does the Retry Now button do?
- Why is the tablet showing a login screen?
- Why did the pad suddenly ask to log in again?
- Is my signed document lost if the server is down?

*Related terms: server not available, offline, backend, access problem.*
