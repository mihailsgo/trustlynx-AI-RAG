---
doc_id: padsign_06_02_prerequisites_at_evaluation_level
source_path: padsign/06_02_prerequisites_at_evaluation_level.md
source_type: markdown
title: What do we need in place to run PadSign?
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:f0d49946484e718bb976a8ee733805c80f5fe60edbcb2a068af2842ccffb9c2e
tags:
  - padsign
  - deployment
  - prospect
summary: >-
  A host with a container runtime, roughly 4 CPUs and 6-8 GB RAM, a hostname you control, a TLS
  certificate for it, disk space that grows with your document volume, and outbound access to
  whichever external services your signature level needs. Plus a touchscreen device with a browser.
extra:
  kb_chunk_id: 06-02-prerequisites-at-evaluation-level
  kb_audience:
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - Specific port numbers or which services listen on them.
    - >-
      Anything about the default exposure of individual services, firewalling specifics, or how the
      entry point could be bypassed.
    - Specific external service addresses or hostnames.
    - A disk-space figure, since none is published and it depends on volume and retention.
---


# What do we need in place to run PadSign?

An evaluation-level checklist. Your IT team will want more detail than this, and TrustLynx
provides it, but this is enough to know whether PadSign fits your environment.

## A host to run it on

- A server or virtual machine with a **container runtime** and container orchestration —
  Docker Engine and Compose, or Docker Desktop on a workstation for testing.
- **Around 4 CPUs and 6-8 GB RAM** is the suggested resource level.
- **Disk space.** No fixed figure is published, because it depends on your document volume
  and how long you keep things. Two things grow: the container images themselves, and stored
  documents. If you use the option that holds signed documents until a desktop collects
  them, that space is not reclaimed automatically, so it needs monitoring.
- Linux is the usual production target. Windows and macOS work for evaluation via Docker
  Desktop.

## A name and a certificate

- **A hostname you control.** In production that means a DNS record pointing at the host.
  For local testing, a hosts-file entry is enough.
- **A TLS certificate and private key for that hostname**, in PEM format. Two details that
  cause most first-attempt failures: the certificate must be the **full chain** (your
  certificate followed by any intermediates), and the private key must be **unencrypted**,
  because the web server cannot start if it has to prompt for a passphrase. A certificate
  from a normal public authority works directly. Self-signed is fine for testing only.

Certificate validation is part of the guided installation, so these problems get caught
before deployment rather than after.

## Network

- **Inbound:** your devices need to reach the host over HTTPS. Only that public entry point
  should be reachable from the network; standard server-hardening practice applies to the
  host itself, as it would for any application you operate.
- **Outbound:** required to fetch the container images. Beyond that it depends on your
  choices — cloud sealing needs access to the TrustLynx sealing service, and higher signature
  levels need access to a timestamp authority and revocation checking at the moment of
  signing. A deployment using local sealing at the baseline signature level needs the least.

## Devices for signing

Any tablet, phone or touchscreen PC with a modern browser. **Nothing is installed on them** —
they open a web address. A stylus is optional; a finger works.

## If you are integrating with your own systems

- A way for your system to send documents in, and to be told when they have been signed.
- For the Windows companion app that adds a "Padsign" printer, Windows desktops to install it
  on.

## What you do not need

- No database to install or administer for the signing flow.
- No native app deployed to tablets.
- No dedicated signature-pad hardware.
- No accounts for the people signing.

## Questions this answers

- What are the prerequisites for PadSign?
- What do we need to provide?
- What are the system requirements?
- How much RAM and CPU does it need?
- Do we need our own domain name?
- Do we need an SSL certificate?
- What network access does it need?

*Related terms: hardware, disk, dns, hostname, firewall.*
