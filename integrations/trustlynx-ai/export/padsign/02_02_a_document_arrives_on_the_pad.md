---
doc_id: padsign_02_02_a_document_arrives_on_the_pad
source_path: padsign/02_02_a_document_arrives_on_the_pad.md
source_type: markdown
title: The resting screen, and how a document arrives on the pad
language: en
audience:
  - public
product: padsign_2_0
department: support
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:e605388b60be92fc4200766830117ae3b61761e8cd36702de1bb2bfe3eeee960
tags:
  - padsign
  - journey
  - end-user
summary: >-
  Between visitors the pad shows a logo and nothing else. When staff or a connected system sends a
  document to that pad it appears by itself within a few seconds. Nobody has to fetch it.
extra:
  kb_chunk_id: 02-02-a-document-arrives-on-the-pad
  kb_audience:
    - end-user
  answer_style: direct
  confidence: verified
  do_not_state:
    - A guaranteed arrival time for a document.
    - That the signer can request or load a document themselves in a normal production setup.
---


# The resting screen, and how a document arrives on the pad

## The resting screen is normal

Between visitors the pad shows a logo in the middle of an otherwise empty screen.
That is the resting state, not a fault and not a loading screen. It means the
device is working and waiting for a document.

![The resting screen showing only a centred logo](knowledge/raw/padsign/images/screen-idle-waiting.png)

## How the document gets there

You do not fetch it. The pad checks for a waiting document every few seconds, so
when someone sends one it appears on its own — normally within a few seconds of
being sent.

The document can be sent in a few different ways depending on how the organisation
set things up:

- A member of staff sends it from the system they are working in
- A connected system sends it automatically as part of a process
- Someone prints it from a Windows application to a printer called "Padsign"

From the pad's point of view these are all the same: a document turns up and is
displayed.

## What you should not have to do

- **No refreshing.** The pad polls by itself.
- **No tapping anything to start.**
- **No logging in.** The device is already signed in, as the organisation, before
  you ever touch it. You are not asked for an account and you do not need one.

## If nothing appears

Give it a few seconds first — arrival is quick but not instant. If the screen still
shows only the logo after that, the most likely explanation is simply that the
document has not been sent yet, so ask the person at the desk to send it.

There is one thing worth knowing: a document that arrives and is never signed
clears itself off the pad after about ten minutes. If you stepped away and came
back to the resting screen, that is probably what happened, and the document just
needs sending again.

## Questions this answers

- Why is there just a logo on the screen?
- How does the document get to the tablet?
- Do I need to refresh or press anything?
- How long does it take for the document to appear?
- The screen is empty, is it broken?

*Related terms: waiting screen, idle screen, resting screen, blank screen, nothing on screen, document appears, how does it arrive.*
