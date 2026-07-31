---
doc_id: padsign_06_03_installation_at_a_glance
source_path: padsign/06_03_installation_at_a_glance.md
source_type: markdown
title: What does installing PadSign involve?
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:1c9f7ca09129ec6f40bda487ea70787069d086b04d3f1e97c5e8940cc0c01b00
tags:
  - padsign
  - deployment
  - prospect
summary: >-
  A guided process, either scripted or through a browser wizard: name the host and organisation,
  upload the TLS certificate, choose which optional features to enable, review, deploy, verify.
extra:
  kb_chunk_id: 06-03-installation-at-a-glance
  kb_audience:
    - prospect
  answer_style: step-by-step
  confidence: verified
  do_not_state:
    - An installation duration, since none is published.
    - Script names, command lines, file paths, credentials, or default usernames.
    - Details of how the wizard authenticates or what privileges it holds.
---


# What does installing PadSign involve?

Installation is a guided process rather than a manual assembly job. There are two ways to
run it: a scripted install, or an optional browser-based wizard that performs the same steps
with a user interface over the top.

## The steps

**1. Welcome.** Confirms what is about to happen.

**2. Host and organisation.** The hostname devices will reach PadSign at, and the name of the
organisation using it. This drives configuration throughout the rest of the install.

**3. TLS certificate.** Provide the certificate and private key for that hostname. They are
validated here — format, whether the key matches the certificate, expiry, whether the name
matches, and whether the chain is complete. Getting this checked up front is deliberate,
because certificate problems otherwise surface later as confusing login failures.

**4. Feature toggles.** Choose which optional capabilities to enable. Everything is off by
default and you turn on only what this deployment needs. The three options are:

- **Document routing** — automatically save signed documents to disk when signing completes
- **Demo mode** — evaluation-only interface features, not for production use
- **Local e-sealing** — run the sealing service inside your own network instead of calling
  the TrustLynx cloud service

**5. Review.** A summary of every choice before anything is applied, so mistakes are caught
before deployment rather than after.

**6. Deploy.** The containers are started and configured.

**7. Verify.** Checks that the deployment is actually working, rather than leaving you to
find out later.

**8. Dashboard.** Ongoing status and post-installation settings.

## What makes it straightforward or not

The parts that go smoothly are the ones the tooling handles: container startup,
configuration wiring, identity setup.

The parts that need preparation are the ones that depend on you: having a hostname that
resolves, and having a correctly formed certificate and an unencrypted private key. These are
the common first-attempt failures, and they are why validation happens at step 3.

## Reversibility

The optional features are toggles, not one-way decisions. Switching sealing modes, changing
the hostname, renewing the certificate and turning features on or off are all supported
after go-live through the same tooling.

## How long it takes

No duration is published, and it would depend on your environment more than on the software.
The honest framing is that the guided part is short and the preparation — DNS, certificate,
firewall rules, deciding on features — is what determines the timeline. Ask TrustLynx for a
realistic estimate for your situation.

## Questions this answers

- What does installing PadSign involve?
- How long does installation take?
- Is there an installer?
- Do we need to write scripts to deploy it?
- What decisions do we make during installation?
- Which features are optional?

*Related terms: setup, how long to install, wizard, deployment process, getting started, bootstrap, feature toggles.*
