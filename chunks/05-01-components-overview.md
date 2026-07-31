---
id: 05-01-components-overview
title: What PadSign is made of
summary: >
  Five parts: an entry point that handles secure access, the portal the signer uses,
  an application server that coordinates the signing steps, a login service, and
  document and signature services. An optional sixth applies seals inside your own
  network.
section: components
audience: [prospect]
answer_style: direct
keywords:
  - architecture
  - components
  - what is it made of
  - parts
  - services
  - containers
  - how is it built
  - technical overview
  - moving parts
questions:
  - What are the components of PadSign?
  - How is PadSign built?
  - What does the architecture look like?
  - How many services are there?
  - What are the moving parts?
images: []
related:
  - 05-03-the-application-server
  - 05-06-sealing-in-the-cloud-or-on-your-own-servers
  - 06-01-hosting-and-deployment-model
disclaimer: null
do_not_state:
  - Port numbers, container image names, hostnames, or internal service addresses.
  - Which routes are authenticated or unauthenticated.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# What PadSign is made of

PadSign is a set of cooperating services, delivered as containers and run on your own
infrastructure. At the level that matters for evaluation, there are five parts plus one
optional extra.

## 1. The entry point

A reverse proxy is the single front door. Everything from a device arrives here over
HTTPS, and it routes each request to the right service behind it. It is also where the
TLS certificate for your hostname lives.

Only this needs to be reachable by your devices. The services behind it are internal.

## 2. The portal

The web application the signer actually uses. It renders the PDF, captures the drawn
signature, shows the progress steps, and reports the outcome. It runs in the device's
browser — this is why there is nothing to install on a tablet.

## 3. The application server

The coordinator. It knows which document is currently on which pad, drives the signing
steps in order, and triggers delivery of the finished document. It also holds the
short-lived state that connects a device to the document waiting for it.

## 4. The login service

A standard identity service handles authentication. The pad's session is tied to an
account and an organisation, which is how the system knows which documents belong to
which device and company.

## 5. Document and signature services

These do the document work: storing versions of the document, filling in form field
values, and applying the visual signature to the page. Each signing step produces a new
version rather than overwriting, so there is a trail of what happened.

A fallback store is also included so documents can be kept on the filesystem.

## 6. The sealing service (optional)

The cryptographic seal can be applied either by a TrustLynx cloud service or by an
additional container running inside your own network. The second option exists for
organisations that need documents never to leave their environment.

This one is genuinely optional — it is not started unless the deployment asks for it.

## How they fit together

A device talks only to the entry point. The portal is delivered to the browser from
there. When the signer taps Sign, the application server drives the sequence: fill in the
fields, apply the visual signature, apply the seal if configured, then store and deliver.
Each step is a call to one of the services behind the proxy.

## What is not in the list

There is no database to install or administer for the signing flow itself. The state
tracking which document is on which pad is deliberately short-lived and held in memory —
it is a queue for work in progress, not a records system. Your finished documents live
wherever your delivery configuration puts them.
