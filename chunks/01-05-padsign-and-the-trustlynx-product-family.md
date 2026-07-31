---
id: 01-05-padsign-and-the-trustlynx-product-family
title: PadSign, SignBox, or something else? The TrustLynx product family
summary: >
  PadSign is for in-person signing on a touchscreen. SignBox collects signatures from
  remote, invited people. The API Platform and Connectors embed signing into your own
  systems, the Authentication Service handles digital identities, and the e-Sealing
  service seals documents. Which one fits depends on where your signer is.
section: positioning
audience: [prospect]
answer_style: direct
keywords:
  - signbox
  - padsign vs signbox
  - product family
  - which product
  - api platform
  - connectors
  - authentication service
  - e-sealing
  - comparison
  - remote signing
  - sharepoint
  - which one do we need
questions:
  - What is the difference between PadSign and SignBox?
  - Which TrustLynx product do we need?
  - Does TrustLynx have a remote signing product?
  - Can we sign documents inside SharePoint or our DMS?
  - What other products does TrustLynx offer?
  - Can we combine PadSign with other TrustLynx products?
images: []
related:
  - 01-01-in-person-signing-vs-remote-e-signature
  - 00-06-about-trustlynx
  - 01-04-identity-eid-and-who-signs
disclaimer: null
do_not_state:
  - Pricing figures for any product in the family.
  - That a specific combination of products is a supported configuration, without confirming with TrustLynx.
  - Feature claims about sibling products beyond what is summarised here from their public pages.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# PadSign, SignBox, or something else? The TrustLynx product family

TrustLynx sells several products around the same core — trust services deployed inside your
own infrastructure. The right one depends on a single question: **where is your signer?**

## The quick router

| Your situation | Product |
|---|---|
| The signer is standing in front of you — counter, reception, delivery door | **PadSign** |
| The signer is somewhere else and you invite them to sign | **SignBox** |
| You want signing built into your own application or portal | **API Platform** |
| You want signing inside a system you already use (DMS, ECM) | **Connectors** |
| You need users to authenticate with national eIDs or mobile IDs | **Authentication Service** |
| You need to seal documents with your organisation's e-seal | **e-Sealing** |

## The two that get compared: PadSign vs SignBox

**PadSign** puts a document from your systems onto a touchscreen so a person who is physically
present can fill it in and sign it with a finger or stylus. No account for the signer, no
email, no waiting — the transaction happens at the counter.

**SignBox** is TrustLynx's signature-*collection* application for everyone who is not standing
in front of you. Your staff initiate a signing process in an internal portal (or straight
from another system); the people who need to sign are invited by email into an external
portal, where they view the document and sign with their preferred tool. Its published
features include sequential and parallel signing order, roles, due-date reminders, guest
signers, automated validation and archiving.

The overlap is small on purpose. If your visitors sign at your premises, PadSign; if your
counterparties sign from theirs, SignBox. Plenty of organisations have both situations —
the products are siblings, not competitors.

## The rest of the family, briefly

**API Platform** — a set of services your own developers use to put authentication, document
creation, signing, sealing, validation and archiving into your portals and apps. Your
application is the interface; TrustLynx does the trust machinery behind it.

**Connectors** — pre-built add-ons that surface e-signing inside systems you already run.
TrustLynx publicly lists connectors for platforms including Microsoft SharePoint Online,
OpenText Content Suite and DocuWare, with document handling following each platform's own
versioning and permissions.

**Authentication Service** — an aggregation gateway for official digital identities: national
eID cards, mobile-ID tools, and similar instruments. This is the product that answers
identity-verification requirements; PadSign deliberately does not.

**e-Sealing** — applying an organisation's electronic seal to documents, manually or via API,
including help obtaining a qualified seal certificate.

## What they share

All of it deploys on **your controlled infrastructure** — cloud or on-premises, behind your
firewalls — with the published principle that documents are not shared with third parties;
where an external trust service provider must be involved, only a document hash is sent.
The pricing model is also shared: volume subscription by monthly transactions, with per-user
seat fees applying to Connectors and SignBox specifically.

Combining products is normal in the range's design — but treat any specific combination as a
solution-design conversation with TrustLynx rather than a given.
