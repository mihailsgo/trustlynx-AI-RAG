---
id: 05-06-sealing-in-the-cloud-or-on-your-own-servers
title: Sealing in the cloud, or entirely inside your own network
summary: >
  The cryptographic seal can be applied by a TrustLynx cloud service or by a container
  running inside your own network. The second option means the document never leaves
  your environment. Switching between them is configuration, not redevelopment.
section: components
audience: [prospect]
answer_style: direct
keywords:
  - cloud
  - on premise
  - on premises
  - local sealing
  - does the document leave
  - data residency
  - sovereignty
  - hsm
  - own certificate
  - air gapped
questions:
  - Does our document leave our network to be sealed?
  - Can sealing happen entirely on our own servers?
  - What is the difference between cloud and local sealing?
  - Can we use our own signing certificate?
  - Is there a data residency option?
  - Can we switch sealing modes later?
images: []
related:
  - 09-02-where-your-data-goes
  - 04-01-two-things-that-happen-when-you-sign
  - 06-06-updates-and-changing-settings-later
disclaimer: null
do_not_state:
  - Any URL, credential, endpoint, or configuration field name for either sealing mode.
  - That the TrustLynx cloud sealing service uses a qualified certificate, which must be confirmed with TrustLynx.
  - That the demonstration seal certificate is suitable for production use.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
---

# Sealing in the cloud, or entirely inside your own network

If your deployment applies a cryptographic seal, there are two ways to do it. The choice
matters mainly for one question: does the document leave your network?

## Cloud sealing

The document is sent to a TrustLynx e-sealing service, which applies the seal and returns
it. This is the default and the simpler option — there is no certificate or key material to
manage on your side, and TrustLynx can help obtain a certificate if you do not have one.

It requires outbound network access from your environment to that service.

## Local sealing

An additional container runs **inside your own network** and applies the seal there. The
document never leaves your environment at any point in the signing flow.

This exists for organisations where documents leaving the network is not acceptable —
whether for regulatory reasons, internal policy, or because the environment has no outbound
access at all. The certificate and key material stay under your control.

The trade-off is that you become responsible for the certificate: obtaining it, installing
it, keeping track of its expiry, and renewing it.

If you already own a signing certificate, or your security policy requires key material to
live in specific hardware such as an HSM, raise that with TrustLynx at the start — using your
own certificate is the normal production path for local sealing, and where exactly the key
may live is a solution-design question rather than something to assume.

## Choosing between them

| | Cloud sealing | Local sealing |
|---|---|---|
| Document leaves your network | Yes, to the sealing service | No |
| Certificate managed by | TrustLynx | You |
| Outbound access needed | Yes | Not for sealing itself |
| Operational overhead | Lower | Higher |

Note that even with local sealing, higher signature levels still require reaching an
external timestamp authority and revocation checking at signing time. Local sealing removes
the document round-trip, not every external dependency.

## Switching later is a configuration change

Both modes are built into the product. Moving between them means changing configuration and
restarting a service — not redeveloping anything or moving to a different edition. It is a
reasonable thing to start one way and change later, for example evaluating with cloud
sealing and moving to local sealing for production.

The local sealing container is not started at all unless the deployment asks for it, so
choosing cloud sealing does not leave unused parts running.

## An important caveat about demonstrations

A demonstration or evaluation setup of local sealing ships with a **self-signed
certificate**. It proves the mechanism works end to end and produces a document you can
inspect, but it carries no legal weight and would be recognised by no PDF reader's trust
list. Replacing it with a real certificate from a trust service provider is a required step
before any production use.

Whether the cloud sealing service uses a qualified certificate is a question to put to
TrustLynx directly — it determines what legal level is available to you and is not something
to assume either way.
