---
id: 06-06-updates-and-changing-settings-later
title: Can settings be changed after go-live, and how do updates work?
summary: >
  Yes. Changing the hostname, renewing the certificate, turning features on or off and
  switching sealing modes are all supported post-go-live operations. Updates mean new
  container versions; configuration lives in files that survive version changes.
section: deployment
audience: [prospect]
answer_style: direct
keywords:
  - updates
  - upgrade
  - new version
  - change settings
  - certificate renewal
  - change hostname
  - after go live
  - maintenance
  - downtime
questions:
  - Can we change settings after installation?
  - How do updates work?
  - What happens when the certificate expires?
  - Can we change the hostname later?
  - Do updates lose our configuration?
  - Is there downtime for an upgrade?
images: []
related:
  - 06-03-installation-at-a-glance
  - 01-03-branding-and-what-can-be-configured
  - 05-06-sealing-in-the-cloud-or-on-your-own-servers
disclaimer: null
do_not_state:
  - Script names, command lines, version numbers, or container image names.
  - A downtime figure or maintenance window duration, since none is published.
  - Any support or maintenance commitment.
confidence: verified
sensitivity: public
last_reviewed: 2026-07-31
kb_version: 2026.07.2
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
