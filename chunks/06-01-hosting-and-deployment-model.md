---
id: 06-01-hosting-and-deployment-model
title: How is PadSign hosted? Where does it run?
summary: >
  PadSign runs on your own controlled infrastructure — cloud or on-premises — behind
  your firewalls, so you do not share data with a third party. It is delivered as
  containers you configure and run, not a SaaS sign-up.
section: deployment
audience: [prospect]
answer_style: direct
keywords:
  - hosting
  - saas
  - cloud
  - on premise
  - on premises
  - self hosted
  - deployment model
  - single tenant
  - who hosts it
  - containers
  - docker
questions:
  - Is PadSign a SaaS product?
  - Where does PadSign run?
  - Can we host PadSign ourselves?
  - Is it on-premises or cloud?
  - Do we sign up for an account somewhere?
  - Is it multi-tenant?
images: []
related:
  - 06-02-prerequisites-at-evaluation-level
  - 06-07-commercial-model-trials-and-rollout
  - 05-06-sealing-in-the-cloud-or-on-your-own-servers
  - 01-01-in-person-signing-vs-remote-e-signature
disclaimer: null
do_not_state:
  - Specific container image names, registry accounts, ports, or hostnames.
  - Pricing figures.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# How is PadSign hosted? Where does it run?

**On your infrastructure, not ours.** This is one of the clearer distinctions between
PadSign and a typical e-signature service.

## What TrustLynx states

All TrustLynx products are deployed on your company's controlled infrastructure — either
cloud or on-premises — but behind your firewalls, specifically so that you do not share data
with any third party.

Practically, that means you download the relevant container, fill in configuration
parameters and interface elements according to your requirements, and make sure the external
resources it needs (such as trust service providers) are reachable from your infrastructure.

## What this means

**There is no sign-up.** You do not create an account on a TrustLynx platform and start
uploading documents. You deploy the software.

**Cloud or on-premises is your choice.** "Cloud" here means your own cloud tenancy, not a
shared platform. Either way it sits behind your network boundary.

**One deployment per customer.** Each installation serves one organisation. There is no
shared multi-tenant platform where your documents sit alongside anyone else's. Within your
own deployment, documents can be scoped per company or department.

**Your documents stay in your environment**, with one thing to check: if you use cloud
sealing, documents are sent to the TrustLynx sealing service for that step. If that is
unacceptable, sealing can run inside your own network instead.

## How it is delivered

As containers, run with a standard container runtime. The installation is scripted and there
is an optional browser-based wizard that walks through it — hostname, certificate, which
features to enable, review, deploy, verify.

Upgrades are the same shape: new container versions and a run of the upgrade process.
Configuration is mounted in from files rather than baked into the images, so settings survive
version changes.

## What you take on

Being the host means owning the host: the machine, its patching, its backups, the TLS
certificate for your hostname, and firewalling the environment appropriately. For an
organisation that already runs containerised applications this is familiar work. For one that
does not, it is worth scoping honestly at evaluation time rather than after purchase.

## Commercial shape

Pricing follows the deployment model: a volume subscription driven by monthly transaction
counts, with no published figures. Cost questions have their own entry in this knowledge
base; the short version is always "ask TrustLynx for a quote".
