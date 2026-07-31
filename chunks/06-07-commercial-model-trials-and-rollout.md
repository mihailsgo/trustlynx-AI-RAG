---
id: 06-07-commercial-model-trials-and-rollout
title: What does PadSign cost, and how do trials and rollout work?
summary: >
  Pricing is a volume subscription calculated from monthly transaction counts; specific
  figures are not published and come from a quote. Evaluation happens through demo mode
  on your own deployment. Rolling out to many locations is mostly a device-counting
  exercise because nothing is installed on the tablets.
section: deployment
audience: [prospect]
answer_style: direct
keywords:
  - price
  - pricing
  - cost
  - how much
  - licence
  - license
  - subscription
  - fee
  - budget
  - quote
  - trial
  - pilot
  - poc
  - proof of concept
  - free
  - rollout
  - many branches
  - training
questions:
  - How much does PadSign cost?
  - What is the pricing model?
  - Is there a per-user or per-document price?
  - Can we run a trial or pilot first?
  - How do we roll PadSign out to many branches?
  - Is training provided for our staff?
  - What does it cost to run the infrastructure?
images: []
related:
  - 06-01-hosting-and-deployment-model
  - 06-04-demo-mode
  - 11-03-questions-this-knowledge-base-cannot-answer
disclaimer: null
do_not_state:
  - Any specific price, fee, discount, or cost figure for PadSign - none is published.
  - Pricing figures from other TrustLynx products (such as the standalone e-Sealing service tiers), which do not apply to PadSign.
  - That a free trial, pilot programme, or training package formally exists, beyond what is described here.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# What does PadSign cost, and how do trials and rollout work?

## The pricing model — published

TrustLynx prices on a **volume subscription based on the value it brings to your business,
calculated from the number of transactions per month**. In plain terms: you pay by how much
you sign, not by how many devices or staff you have.

Two published qualifications:

- If you also use TrustLynx **connectors or SignBox**, a monthly **per-user-seat fee** applies
  to those products on top.
- Deployment is on your own infrastructure, so the software subscription is one part of the
  cost — the other is running the host, which is your machine on your cloud or premises.

## The figures — not published

No public price list exists for PadSign. Any specific number has to come from TrustLynx: the
website's quote form asks how many documents per month you would sign, which tells you what
drives the calculation. Do not treat pricing published for other TrustLynx products (the
standalone e-Sealing service has visible tiers) as PadSign pricing — different product.

For your own budgeting, the infrastructure side is modest: the suggested resource level is
around 4 CPUs and 6-8 GB RAM on a host you likely already know how to cost.

## Trying it before committing

Evaluation is built into the product rather than offered as a separate trial platform:
**demo mode**. Deployed on your own infrastructure with demo mode enabled, you can load any
PDF from the device, run the entire real signing flow — form filling, drawn signature, the
optional seal — and download the result to inspect. It is the actual product, not a sandbox
imitation.

Whether TrustLynx offers evaluation licences, pilot terms, or a hosted demonstration is a
commercial question for them — ask, rather than assuming.

## Rolling out to many locations

Scale is friendlier than it first sounds, for one structural reason: **nothing is installed on
the signing devices**. A pad is a tablet pointed at a web address. So a 200-branch rollout is
not a 200-site software deployment — it is one central deployment plus devices.

What does scale with locations:

- **Devices** — any modern tablet works; no special hardware to procure.
- **Desktops**, if you use the Windows companion app for sending documents by printing — that
  is an ordinary Windows application rollout.
- **Volume** — more signing means more monthly transactions, which is exactly the axis the
  subscription is priced on, so growth is at least predictable.

## Training

The signer-side needs none by design — the flow is read, type, draw, tap. For staff and
administrators, public documentation exists (including a user manual on the TrustLynx
developer portal), but whether formal training or onboarding services are included in an
engagement is not published — put it on the list for the commercial conversation.
