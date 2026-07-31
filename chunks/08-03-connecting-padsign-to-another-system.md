---
id: 08-03-connecting-padsign-to-another-system
title: Can PadSign connect to our existing systems?
summary: >
  Yes. Another system can send documents in and be told when they are signed. TrustLynx
  names CRM, medical and healthcare information management, service management and
  document management systems, and also offers connectors and an API platform.
section: companions
audience: [prospect]
answer_style: direct
keywords:
  - integration
  - api
  - crm
  - dms
  - connectors
  - erp
  - our systems
  - can it connect
  - automate
  - templates
questions:
  - Can PadSign integrate with our CRM?
  - Does PadSign have an API?
  - Can our system send documents to PadSign automatically?
  - How does PadSign fit into our existing process?
  - Can it use our own document templates?
  - What integration options are there?
images: []
related:
  - 08-01-virtual-printer-overview
  - 07-02-delivery-options-folder-and-webhook
  - 00-03-who-it-is-for-and-typical-use-cases
disclaimer: null
do_not_state:
  - Endpoint paths, request or response shapes, authentication schemes, or API keys.
  - That any specific named product has a ready-made connector, without confirming with TrustLynx.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
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
