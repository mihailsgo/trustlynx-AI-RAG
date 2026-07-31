---
id: 05-03-the-application-server
title: The application server — what coordinates signing
summary: >
  The application server tracks which document is on which pad, runs the signing
  steps in order, and triggers delivery. Its tracking state is short-lived and held
  in memory by design — it is a work queue, not a records system.
section: components
audience: [prospect]
answer_style: direct
keywords:
  - application server
  - backend
  - coordinator
  - state
  - in memory
  - database
  - no database
  - queue
  - which document
questions:
  - What does the application server do?
  - Is there a database?
  - Where is the state kept?
  - What happens if the server restarts?
  - How does it know which document belongs to which tablet?
images: []
related:
  - 05-01-components-overview
  - 06-05-volume-concurrency-and-resilience
  - 07-01-what-happens-to-the-document-after-signing
disclaimer: null
do_not_state:
  - API endpoint names, port numbers, or configuration field names.
  - That signed documents themselves are stored in memory — they are not.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# The application server — what coordinates signing

If the portal is what the signer sees, the application server is what actually gets the
work done.

## Its jobs

**Track what is where.** It holds the mapping between a pad and the document currently
waiting on it. When the portal polls, this is what answers.

**Run the signing sequence in order.** Save the field values, apply the visual signature,
apply the seal if configured, finalise. Each step has to succeed before the next begins,
and if one fails the sequence stops rather than continuing with a half-finished document.

**Trigger delivery.** Once the document is complete, it starts whatever handover the
deployment is configured for — writing to a folder, notifying another system, making the
file available back to the computer that sent it.

**Accept documents from outside.** When another system or the Windows companion app sends
a document in, this is what receives it.

**Guard against duplication and overload.** Repeat submissions of the same document are
blocked, and if many documents arrive at once they are queued rather than dropped.

## State is deliberately short-lived

The tracking information — which pad has which document — is held in memory and expires.
There is no database to install or administer for this.

That is a design decision, not an omission. The state answers a transient question
("what is on this pad right now?"), and it should not outlive its usefulness:

- A document that arrives and is never signed clears itself after about ten minutes, so a
  pad returns to its resting screen instead of holding somebody's paperwork on display.
- A longer idle timeout acts as a safety net.
- If the application server restarts, in-flight tracking is lost and the pads return to
  their resting screens.

## What this means in practice

**Your finished documents are not affected by any of this.** They are stored by the
document services and delivered to wherever your configuration sends them. The in-memory
state is scaffolding around work in progress; once a document is signed and delivered, it
no longer depends on it.

The one thing to know about a restart: a document that was sitting unsigned on a pad needs
sending again. Nothing that was already signed is at risk.

## Resilience

It fails predictably rather than silently. If a service it depends on becomes unreachable,
it stops calling that service for a cooldown period instead of hammering it, and if the
sealing service is unavailable it can be configured to let the flow continue rather than
blocking the person at the counter. Overload produces a clear refusal, not corruption.
