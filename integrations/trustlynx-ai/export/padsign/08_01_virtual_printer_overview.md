---
doc_id: padsign_08_01_virtual_printer_overview
source_path: padsign/08_01_virtual_printer_overview.md
source_type: markdown
title: The Windows companion app — signing by "printing"
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:6215868b53138f949408e9448e1e84bc7de0fc057332f80003e074ff8ca4229a
tags:
  - padsign
  - companions
  - prospect
summary: >-
  A Windows application that installs a printer called "Padsign". Printing to it from any Windows
  program sends the document to a pad for signature. It works with software you cannot modify,
  without building an integration.
extra:
  kb_chunk_id: 08-01-virtual-printer-overview
  kb_audience:
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - A download location, installer name, version number, or supported Windows versions.
    - Configuration field names, API keys, or local file paths.
---


# The Windows companion app — signing by "printing"

There is a Windows companion application that installs a **virtual printer** named "Padsign"
on a desktop. Printing to it from any Windows program sends that document to a pad for
signature.

## Why this is clever

Normally, getting a document into a signing system means integrating with it — an API call, a
connector, development work on the application that produces the document.

Printing is the one thing essentially every Windows application already knows how to do. So
this approach works with:

- **Software you cannot modify.** Third-party applications with no API, or none you can reach.
- **Older systems** where changing the code is not realistic.
- **Anything at all**, really. Word, a browser, an accounting package, a line-of-business
  application from 1998.

Instead of asking "can we integrate with this?", the question becomes "can it print?".

## The trade-off

It is worth being straight about what you give up compared with a real integration.

Printing hands over a rendered document. It does not hand over the structured context an API
call could — a customer identifier, a reference number, which record this relates to. The
companion app and PadSign do extract some information from the document itself where it is
available, which covers common cases like recognising a document number, but this is inference
from the page rather than data passed deliberately.

So: printing is the fastest route to working, and a direct integration gives you cleaner
context. For a lot of situations the printing route is genuinely sufficient, and it can be a
sensible first phase even where an integration is the eventual goal.

## What comes with it

The companion app is two parts: something that watches for print jobs, and a small management
interface where the connection to your PadSign deployment is configured — which address to talk
to, and which account and organisation the documents belong to.

It also handles the return trip, collecting the signed document back onto the desktop that
sent it once the customer has signed.

## Getting it

Availability, supported Windows versions and where to download it are questions for TrustLynx.
Rolling it out across a set of desktops is ordinary Windows application deployment: installing
it needs administrator rights once, daily use does not, and upgrading in place keeps the
existing settings.

## Questions this answers

- What is the PadSign virtual printer?
- Can we use PadSign without integrating our software?
- How do we send a document from an application that has no API?
- Does PadSign work with legacy software?
- What is the Windows companion app?

*Related terms: windows app, print to sign, legacy system, no integration, any application, desktop.*
