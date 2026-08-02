---
doc_id: padsign_06_06_updates_and_changing_settings_later
source_path: padsign/06_06_updates_and_changing_settings_later.md
source_type: markdown
title: Can settings be changed after go-live, and how do updates work?
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:3cc0f316ebf8ca13742f07dbfe3506f43b4c400b93c3fe16dc45f92ef67671ed
tags:
  - padsign
  - deployment
  - prospect
summary: >-
  Yes. Changing the hostname, renewing the certificate, turning features on or off and switching
  sealing modes are all supported post-go-live operations. Updates mean new container versions;
  configuration lives in files that survive version changes.
extra:
  kb_chunk_id: 06-06-updates-and-changing-settings-later
  kb_audience:
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - Script names, command lines, version numbers, or container image names.
    - A downtime figure or maintenance window duration, since none is published.
    - Any support or maintenance commitment.
  source_checksum: sha256:54f6f5b2083687081ecad6c405681e0fbfc5953fcfc618bdde8b590a17cb9f32
---


# Can settings be changed after go-live, and how do updates work?

## Changing settings later

Yes, and these are documented operations with tooling behind them rather than
reverse-engineering exercises:

- **Renew the TLS certificate.** Necessary regularly, since certificates expire. There is a
  dedicated process for it.
- **Change the hostname.** If the address devices reach PadSign at needs to change, this is
  supported — it touches several parts of the configuration, which is exactly why it is
  scripted rather than done by hand.
- **Turn features on or off.** The same toggles offered during installation can be changed
  afterwards.
- **Switch sealing modes**, between the TrustLynx cloud service and a container inside your
  own network.
- **Adjust branding, wording and behaviour settings** — logo, interface text, signature
  placement, timeouts, delivery destinations.

The same browser-based wizard used for installation also provides a settings area for these
post-installation changes.

## How updates work

PadSign is delivered as containers. An update means new container versions plus a run of the
upgrade process, which handles the sequencing.

**Your configuration survives.** Settings are held in files mounted into the containers
rather than baked into the images. A new version picks up your existing configuration — this
is the specific reason it is done that way. It also means a configuration change does not
require a new build.

## Two practical notes

**Configuration changes may need a restart to take effect.** Some settings are read when a
service starts, so editing a file is not always enough on its own. The tooling handles this;
it matters if someone changes a file by hand and wonders why nothing happened.

**Browsers cache the interface configuration.** After a change to branding or wording, a
device may need a hard refresh before it shows the new version. If a setting looks like it did
not apply, that is the first thing to check.

## Downtime

No figure is published. Structurally, an upgrade replaces running containers, so there is a
gap while services restart — pads will show their "server is not available" message during it
and recover automatically afterwards, which is the graceful behaviour you would want. Ask
TrustLynx what to expect for your deployment and plan a window outside counter hours.

## Backups

One thing worth raising with whoever runs the host: the identity service keeps its data in a
persistent volume, and that volume should be part of your backup routine. Losing it means
recreating the accounts and configuration the pads authenticate against.

## Questions this answers

- Can we change settings after installation?
- How do updates work?
- What happens when the certificate expires?
- Can we change the hostname later?
- Do updates lose our configuration?
- Is there downtime for an upgrade?

*Related terms: new version, certificate renewal, change hostname, after go live, maintenance.*
