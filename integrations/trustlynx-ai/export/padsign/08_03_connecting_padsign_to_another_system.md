---
doc_id: padsign_08_03_connecting_padsign_to_another_system
source_path: padsign/08_03_connecting_padsign_to_another_system.md
source_type: markdown
title: Can PadSign connect to our existing systems?
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:e452899c9001c772c66f2d6487257367f42d0b26ff549db7a4b87e8b704a6ddd
tags:
  - padsign
  - companions
  - prospect
summary: >-
  Yes. Another system can send documents in and be told when they are signed. TrustLynx names CRM,
  medical and healthcare information management, service management and document management systems,
  and also offers connectors and an API platform.
extra:
  kb_chunk_id: 08-03-connecting-padsign-to-another-system
  kb_audience:
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - Endpoint paths, request or response shapes, authentication schemes, or API keys.
    - That any specific named product has a ready-made connector, without confirming with TrustLynx.
  source_checksum: sha256:a217aef20e5712bb4ddf902a670a0d7d101dd42e50a2e7dd811119a3df33039e
---


# Can PadSign connect to our existing systems?

Yes — and this is the intended way to run it in production. The virtual printer is the
no-integration shortcut; a real integration is what makes PadSign part of a process rather than
an extra step in one.

## The shape of an integration

**Your system sends the document.** It authenticates, sends the PDF along with who it is for,
and PadSign puts it on the right pad.

**Your system is told when it has been signed.** Either by being notified directly, or by the
signed file appearing in a folder it watches, or both.

**Failures are reported too**, so a document does not sit in your system marked "awaiting
signature" forever when the signing attempt actually failed.

That is the whole contract. Send a document, learn the outcome.

## What TrustLynx describes

PadSign integrated with your CRM, medical and healthcare information management system, service
management system or others will generate acceptance documents based on **your company's
templates**, securely expose them to customers to fill out and sign electronically on a
touchscreen device, then e-seal the signed documents and archive them to your servers, with the
reference and status communicated to the engaged systems and persons.

Two things worth pulling out of that:

- **Your templates, not theirs.** The documents are your own forms and wording. PadSign
  displays and signs them; it does not impose a format.
- **The loop closes.** Reference and status go back to the systems and people involved, rather
  than the document disappearing into a signing tool.

## Connectors and the API platform

TrustLynx offers connectors and an API platform alongside PadSign as separate products in the
same range. If you are looking at integrating several systems, or want something pre-built
rather than developed, that is worth asking about — and note their pricing mentions a per-user
seat fee for connectors and SignBox, so it is a commercial decision as well as a technical one.

## Choosing your route

| Situation | Sensible route |
|---|---|
| The document-producing app can be extended | Direct integration |
| The app cannot be modified, or you want results this week | The Windows virtual printer |
| Several systems, or you would rather not build it | Ask about connectors and the API platform |
| Your process just needs the signed file somewhere | Folder delivery, possibly with no code at all |

Starting with the printer and moving to an integration later is a legitimate path — the pad
experience for the person signing is identical either way.

## Getting the detail

The integration interface is documented, and TrustLynx has a developer portal. Endpoint-level
detail is deliberately not part of this knowledge base; ask TrustLynx for the integration guide.

## Questions this answers

- Can PadSign integrate with our CRM?
- Does PadSign have an API?
- Can our system send documents to PadSign automatically?
- How does PadSign fit into our existing process?
- Can it use our own document templates?
- What integration options are there?

*Related terms: dms, connectors, erp, our systems, can it connect, automate.*
