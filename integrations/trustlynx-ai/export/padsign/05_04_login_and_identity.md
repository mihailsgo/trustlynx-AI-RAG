---
doc_id: padsign_05_04_login_and_identity
source_path: padsign/05_04_login_and_identity.md
source_type: markdown
title: How login and identity work
language: en
audience:
  - public
product: padsign_2_0
department: sales
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:45f9c97e31221c77eaf20693df1eb9f273bb08f1993d5de6de51f67fe9a84ef0
tags:
  - padsign
  - components
  - prospect
summary: >-
  A standard identity service handles authentication using normal OpenID Connect. The pad signs in
  as the organisation, and that account determines which documents it can receive. Signers are never
  asked to authenticate.
extra:
  kb_chunk_id: 05-04-login-and-identity
  kb_audience:
    - prospect
  answer_style: direct
  confidence: verified
  do_not_state:
    - Realm names, client names, role names, or any credential.
    - That an arbitrary external identity provider is supported without confirming with TrustLynx.
  source_checksum: sha256:656be5e9fa9b4df75f5684d1202bc57a9c2ab6ad7825af311eee5d1e948c6016
---


# How login and identity work

## The shape of it

PadSign includes an identity service as part of the deployment. It speaks **OpenID
Connect**, the standard protocol behind most modern single sign-on, using the
authorization-code flow with PKCE — the current recommended pattern for applications
running in a browser.

Two kinds of participant authenticate against it:

- **The pad**, which signs in as the organisation and holds that session
- **Other systems**, which authenticate when sending documents in or collecting signed
  ones back

## The signer is not one of them

Worth being explicit, because it is the most common misunderstanding: the person signing a
document never authenticates. They have no account, no password, and never see a login
screen. The device is already signed in before they arrive.

That is what makes the product usable at a counter. Asking a visitor to create an account
in order to sign one consent form would defeat the purpose.

## How documents stay separated

Each pad's account is associated with an organisation. That association is what the system
uses to decide which documents belong to which device — a document sent for one
organisation will not appear on another organisation's pad.

Accounts can also carry elevated permissions, so a system integrating with PadSign can be
granted the access it needs without every account having it.

## Using your own identity provider

PadSign ships with its own identity service, which is what most deployments use. Because
the integration is standard OpenID Connect rather than something proprietary, connecting to
an existing corporate identity provider is a reasonable thing to ask about — but whether a
specific provider is supported, and what that involves, is a question for TrustLynx rather
than something to assume.

## A note for evaluators

Because the pad holds a long-lived organisational session, physical control of the device
matters. A pad is a signed-in terminal, and should be treated like one: kept where staff can
see it, and its session ended if the device is retired or leaves your premises. That is
ordinary operational hygiene rather than a PadSign-specific concern, but it is the security
consideration most worth raising early.

## Questions this answers

- How does authentication work?
- Does PadSign support single sign-on?
- What identity standard does it use?
- Can we use our own identity provider?
- How does it separate one company's documents from another's?
- Do signers need accounts?

*Related terms: login, sso, openid connect, oidc, single sign on, roles, multi tenant.*
