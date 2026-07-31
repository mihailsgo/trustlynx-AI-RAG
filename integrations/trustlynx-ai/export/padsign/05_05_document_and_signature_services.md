---
doc_id: padsign_05_05_document_and_signature_services
source_path: padsign/05_05_document_and_signature_services.md
source_type: markdown
title: The document and signature services
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:ca35dd09f4778113e98695b5ef9081f7d8e39640a18c8717e49ddfdb93f41a9e
tags:
  - padsign
  - components
  - prospect
summary: >-
  These services store document versions, fill in form values, and apply the visual signature. Each
  signing step creates a new version rather than overwriting, so the original and every intermediate
  state remain available.
extra:
  kb_chunk_id: 05-05-document-and-signature-services
  kb_audience:
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - Any data-retention period, since that depends on deployment configuration.
    - Service names, ports, container image names, or database details.
    - That the included storage is intended as a long-term records archive.
---


# The document and signature services

These are the parts that do the actual work on the file.

## What they do

**Store the document and its versions.** When a document enters PadSign it is registered
and given an identifier. The portal fetches it from here to display, and the finished
signed file is stored back here.

**Fill in the form values.** What the signer typed on screen is written into the PDF's form
fields, producing a completed document.

**Apply the visual signature.** The drawn signature image is placed into the page at the
position, page and scale the deployment specifies.

**Orchestrate sealing.** Where sealing is used, these services arrange it — including
talking to timestamp and revocation services when the configured signature level needs
them.

## Every step makes a new version

This is the useful property. Filling in the fields does not overwrite the blank document;
applying the signature does not overwrite the filled-in one. Each stage produces a new
version alongside the previous ones.

Two consequences:

- **There is a trail.** You can see the document as it was before signing, after
  completion, and after signing.
- **A failure does not corrupt anything.** If a step fails, the previous version is intact.
  This is why a failed signing leaves no half-signed document — the incomplete attempt is
  simply a version that never became the final one.

## Storage

The services keep documents through an archive component, with a filesystem-backed fallback
included so documents can be held on disk.

An important caveat for planning: **the included storage is part of the signing pipeline,
not a records-management archive.** How a default deployment is configured to store things,
and for how long, varies — a demonstration setup and a production setup are not the same in
this respect. If long-term retention of signed documents matters to you, treat it as a
requirement to specify with TrustLynx rather than assuming the built-in behaviour matches
your policy. In most deployments the authoritative long-term copy is the one delivered
onward to your own systems.

## Where your copy comes from

The signed PDF you actually keep is produced from here and then handed onward by the
delivery configuration — written into a folder your systems watch, returned to the computer
that sent the document, or announced to another system. That delivered file is a normal PDF
and needs nothing from PadSign to open or verify.

## Questions this answers

- Where is the document stored during signing?
- Does PadSign keep the original document?
- What applies the signature to the page?
- Is there a version history?
- Is there an audit trail?

*Related terms: document service, archive, signature service, versions, versioning, storage.*
