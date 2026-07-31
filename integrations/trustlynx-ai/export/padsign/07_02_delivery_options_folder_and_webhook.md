---
doc_id: padsign_07_02_delivery_options_folder_and_webhook
source_path: padsign/07_02_delivery_options_folder_and_webhook.md
source_type: markdown
title: Where do signed documents get delivered?
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:0d67907c0af315fc6d05bbbfb69c1b9f3b7e163a9d419722207f036217a02cb2
tags:
  - padsign
  - delivery
  - prospect
summary: >-
  Two configurable destinations, usable together: written into a folder your systems watch, with a
  folder and filename pattern you choose; and/or a notification posted to your system when signing
  completes, with automatic retries.
extra:
  kb_chunk_id: 07-02-delivery-options-folder-and-webhook
  kb_audience:
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - Configuration field names, JSON payload shapes, endpoint paths, or authentication schemes.
    - Real folder paths or customer names from example configurations.
---


# Where do signed documents get delivered?

PadSign does not just sign a document and leave it somewhere for you to find. Delivery is
configured, and there are two mechanisms. They are not exclusive — a deployment can use both.

## Option 1: written into a folder

The signed PDF is saved into a folder on a filesystem your own systems can read. This is the
simplest possible integration: your existing process watches a folder, and signed documents
appear in it.

**The folder structure and filename are patterns you define.** Rather than a flat dump of
files with opaque names, the path can be built from values known about the document —
organisation, the account that sent it, the date, a document or reference number. So signed
documents can arrive already organised into a folder layout that matches how you work, with
filenames your systems can recognise.

This matters more than it sounds. A predictable filename containing your own reference number
is often the difference between an integration that needs no code and one that does.

Where a deployment serves several companies or departments, delivery can be scoped so each
one's documents land separately.

## Option 2: a notification to your system

When signing completes, PadSign posts a notification to an address you provide. Your system
learns that a specific document has been signed and can then act — fetch it, update a record,
close a task, trigger the next step in a process.

**Failures are retried.** If your endpoint is temporarily unavailable, PadSign does not give
up on the first attempt. It retries, so a brief outage on your side does not lose the
notification.

If it ultimately cannot be delivered, the failure is recorded in the logs. Worth being clear
about the implication: **there is no alerting on permanent notification failure.** Nobody gets
emailed. If your process depends on these notifications arriving, monitor for their absence on
your side rather than assuming you would be told.

## Errors are reported too

The notification mechanism is not only for successes. If a signing attempt fails, that can
also be reported, so your system is not left with a document permanently stuck in a "sent for
signature" state waiting for something that will never come.

## Choosing

- **Folder delivery** suits document management, archiving, and any process already built
  around a watched location.
- **Notification** suits workflow systems that need to react at the moment of signing.
- **Both together** is common: the file lands where it is kept, and the notification tells
  the workflow it has happened.

There is also a third pattern, for documents sent from a Windows desktop, where the signed
file comes back to the machine that produced it.

## Questions this answers

- Where do signed documents go?
- Can signed documents be saved to a folder?
- Does PadSign notify our system when a document is signed?
- Can we control the filename of signed documents?
- What happens if our system is down when a document is signed?
- Can documents be organised per department?

*Related terms: delivery, routing, where do documents go, file share, webhook, notification, callback, integration, retries.*
