---
id: 08-02-virtual-printer-user-journey
title: Using the virtual printer at your desk, step by step
summary: >
  Open the document, print it to the "Padsign" printer, the customer signs on the pad, and
  the signed PDF appears back in a folder on your computer. Four steps, no new application
  to learn.
section: companions
audience: [end-user]
answer_style: step-by-step
keywords:
  - how to send a document
  - print to padsign
  - print for signature
  - send to tablet
  - my workflow
  - desk
  - staff instructions
questions:
  - How do I send a document to the tablet for signing?
  - How do I use the Padsign printer?
  - What do I do at my desk to get something signed?
  - Where does the signed document end up?
  - Do I need to open a special program?
  - I printed to Padsign and nothing appeared on the pad - why?
  - What do the status indicators in the Padsign app mean?
images: []
related:
  - 08-01-virtual-printer-overview
  - 07-03-getting-the-signed-pdf-back-to-the-sending-computer
  - 10-01-nothing-appears-on-the-pad
disclaimer: null
do_not_state:
  - A specific local folder path, since that is configured per installation.
  - Installation or configuration instructions, which are for whoever set the machine up.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# Using the virtual printer at your desk, step by step

If your computer has the PadSign companion app installed, sending a document for signature
works like printing. There is no new application to open and no new interface to learn.

## What you do

**1. Open the document** in whatever program you normally use — your line-of-business
application, Word, a PDF viewer, a browser. It does not matter which.

**2. Print it, and choose the printer called "Padsign".** Everything else about printing is
the same as usual. Nothing comes out on paper.

**3. The document appears on the pad.** Within a few seconds it is on the tablet, ready for the
customer.

**4. The customer signs.** They read it, fill in anything it asks for, draw their signature and
tap Sign.

**5. The signed PDF comes back to your computer**, into a folder on your machine, automatically.

## Things worth knowing

**Check the pad before you send.** If a previous document is still sitting on the pad unsigned,
deal with that first rather than sending a second one on top of it.

**A document waits about ten minutes.** If nobody signs it in that time it clears itself off the
pad. That is not an error — it stops somebody's paperwork sitting on a screen indefinitely. If
it happens, just print it again.

**Your PC does not have to stay on.** The signed document waits until your machine collects it,
so it is still there if you shut down, go offline, or leave for the weekend.

**The companion app needs to be running** for the signed file to come back. If signed
documents have stopped arriving, that is the first thing to check.

**The app shows you where things stand.** Its window carries a row of status indicators —
whether the configuration is in place, whether the listener that watches for print jobs is
running, whether the printer is installed, and the state of the last returned document. When
something is not working, that row is the fastest way to see which part. There is also a
built-in help guide behind the **?** button.

**Documents signed while your PC was off are caught up automatically** the next time the app
starts — nothing is lost to a reboot or a day off.

**"Save And Test" is safe to use.** When the connection is first set up, that button sends a
real test document to verify everything works, then removes it automatically — no stray test
paperwork ends up anywhere.

## If something does not work

| What you see | Likely cause |
|---|---|
| Nothing appears on the pad, no error anywhere | **The print job was not a PDF.** Only PDF print jobs are uploaded; anything else is quietly skipped, with a note in the app's log. Some applications print in other formats — try printing to PDF first, or from a different application |
| Nothing appears on the pad | The pad may already have a document on it, or the connection needs checking |
| The document arrived but cleared itself | Nobody signed it within about ten minutes — print it again |
| The signed file never came back | The companion app may not be running, or your deployment may deliver documents somewhere else instead |
| The customer reported an error while signing | The document was not signed. Print it again and ask what the message said |

The silent non-PDF case is worth knowing about because it looks exactly like a broken
connection: you printed, nothing happened, no error appeared. The status area described
below tells the two situations apart.

If a document was not signed, nothing partial gets filed anywhere — a failed signing produces
no document at all, so re-sending is always safe.
