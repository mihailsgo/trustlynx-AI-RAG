---
doc_id: padsign_06_05_volume_concurrency_and_resilience
source_path: padsign/06_05_volume_concurrency_and_resilience.md
source_type: markdown
title: How does PadSign cope with volume and with things going wrong?
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:4205eda3dfe417c2f48496c88b1d8957d325d69edd2b46ac7ed2c9aaf712bac2
tags:
  - padsign
  - deployment
  - prospect
summary: >-
  Simultaneous documents are queued rather than dropped, overload produces a clear refusal instead
  of corruption, duplicate submissions are blocked, and an unreachable sealing service can be
  configured to let the flow continue rather than blocking the counter.
extra:
  kb_chunk_id: 06-05-volume-concurrency-and-resilience
  kb_audience:
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - Specific throughput numbers, concurrency limits, or timeout values.
    - Any SLA or availability guarantee.
  source_checksum: sha256:75d16eab03dcf2cddd868ddf90f9126bc4305ee6898eeafc213f411ee16dc728
---


# How does PadSign cope with volume and with things going wrong?

## Several documents at once

Multiple pads signing at the same time is a normal, expected situation — a reception desk
with three tablets, or a fleet of delivery drivers.

Incoming documents are **queued** rather than dropped. If more arrive than can be processed
immediately they wait their turn. If the queue itself fills up, the sending system gets a
clear refusal it can act on, rather than a document silently vanishing.

That is the important property: the failure mode is "this was not accepted, try again", never
"this was accepted and then lost".

## Duplicate and repeat submissions

Two protections:

- **On the device**, the Sign button stops responding once tapped, so an impatient double-tap
  cannot submit twice.
- **On the server**, work on a given document is locked while in progress, and repeat
  submissions of the same document are recognised and rejected rather than producing two
  differently-signed versions of the same file.

## When a dependency is unreachable

If one of the services PadSign relies on starts failing, it stops calling that service for a
cooldown period instead of retrying continuously. This stops one struggling component from
degrading everything else, and it recovers automatically once the service returns.

**The sealing step specifically** can be configured to fail soft: if the sealing service is
unavailable, the signing flow completes without a seal rather than blocking the person
standing at the counter. Whether that is the right trade-off depends entirely on your
situation — for some organisations an unsealed document is unacceptable and the flow should
stop. It is a configuration decision worth making deliberately rather than discovering.

## When the application server is down

The pad detects it and shows a clear full-screen message rather than appearing broken or
hanging. It retries automatically every ten seconds and recovers on its own when the server
returns. Staff see an explicit "server is not available" state, not a mystery.

Documents that were sitting unsigned on pads need sending again after a restart. Anything
already signed and delivered is unaffected.

## Can a document end up corrupted or half-signed?

No. Each signing step produces a **new version** of the document rather than modifying the
previous one. If a step fails, the earlier version is intact and the incomplete attempt
simply never becomes the final document.

This is why a failure message on the pad means "not signed" rather than "partially signed".
There is no state where a document has been half-signed and filed.

## Sizing

No throughput figures are published, and any real answer depends on your document sizes,
whether sealing is enabled, and which signature level you use — a level requiring external
timestamping is bound by that external service, not by PadSign. Bring your expected volumes
to TrustLynx and size it against those.

## Questions this answers

- What happens if many documents are signed at the same time?
- How does PadSign scale?
- What happens if the server goes down mid-signing?
- Can the same document be signed twice by accident?
- What if the sealing service is unavailable?
- Is there a risk of corrupted documents?

*Related terms: concurrency, volume, many at once, load, resilience, what if it fails, queue, duplicate, double signing, outage.*
