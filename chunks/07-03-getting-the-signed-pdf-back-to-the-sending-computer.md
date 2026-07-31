---
id: 07-03-getting-the-signed-pdf-back-to-the-sending-computer
title: Getting the signed PDF back to the computer that sent it
summary: >
  A document sent from a Windows desktop can have the signed version returned to that
  same desktop automatically. It waits until collected, so a PC that is switched off or
  offline loses nothing.
section: delivery
audience: [end-user, prospect]
answer_style: direct
keywords:
  - back to my computer
  - return
  - signed copy
  - desktop
  - receive back
  - collect
  - offline pc
  - virtual printer
  - where did it go
questions:
  - Does the signed document come back to my computer?
  - What if my PC was switched off when the document was signed?
  - How do I get the signed file after the customer signs?
  - Where does the signed PDF appear on my computer?
  - Can the signed document be returned automatically?
images: []
related:
  - 08-02-virtual-printer-user-journey
  - 07-02-delivery-options-folder-and-webhook
  - 10-06-where-is-my-signed-pdf
disclaimer: null
do_not_state:
  - Endpoint names, configuration paths, or local file paths on any customer machine.
  - A retention or expiry period for buffered documents.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# Getting the signed PDF back to the computer that sent it

If a document was sent to the pad from a Windows desktop, the signed version can come back to
that same desktop automatically. This closes the loop for the most common desk workflow: you
send a document for signature, the customer signs at the counter, and the signed file appears
back on your machine.

## How it works from your side

You do nothing. The companion application on your PC checks whether any signed documents are
waiting for it, downloads them, and confirms receipt. The signed file lands in a folder on
your machine.

## The part that matters: it waits for you

A signed document stays available until your computer actually collects it. There is no
time limit and nothing deletes it in the meantime.

That is a deliberate design decision, and it is the one worth knowing about. It means:

- **Your PC can be switched off** when the customer signs. The document is there when you
  next start up.
- **Your PC can be offline or asleep.** Same result.
- **You can be away for a long weekend.** The document is still waiting.

A signed document is only removed once your computer has confirmed it has it. Nothing is
dropped because a desktop was not listening at the right moment.

## One consequence for whoever runs the system

Because documents wait indefinitely rather than expiring, the space they occupy is not
reclaimed on its own. If a desktop is decommissioned, or somebody's PC never comes back
online, its documents stay buffered. Whoever administers the deployment should keep an eye on
that — it is manual housekeeping rather than something the system prunes for you.

## If the signed file has not appeared

Check the obvious things first: is the companion application actually running on the machine,
and is the machine online? The collection only happens while it is running.

If the file still has not arrived, it may be that the deployment is configured to deliver
documents somewhere else instead — into a shared folder, or straight into another system.
Delivery destinations are configurable, and returning files to the sending desktop is one
option among several rather than always switched on. Ask whoever set up your deployment
which applies.
