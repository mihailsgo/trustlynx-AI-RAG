---
doc_id: padsign_03_03_on_screen_message_catalogue
source_path: padsign/03_03_on_screen_message_catalogue.md
source_type: markdown
title: What each on-screen message means
language: en
audience:
  - public
product: padsign_2_0
department: support
version: 2026.07.2
last_updated: '2026-07-31'
checksum: sha256:9b8a1989a5f88bbb258779157f1eae311f2745c4572eaa7303bf8e5a063627fe
tags:
  - padsign
  - screens
  - end-user
summary: >-
  A catalogue of the standard messages PadSign can show, what each one means in plain English, and
  what to do about it.
extra:
  kb_chunk_id: 03-03-on-screen-message-catalogue
  kb_audience:
    - end-user
  answer_style: direct
  confidence: verified
  do_not_state:
    - Any message text specific to one organisation's own document or form content.
    - That an error message indicates a partially signed or corrupted document.
---


# What each on-screen message means

These are the standard messages PadSign can show. Organisations can change the
wording, and the messages inside a particular document come from that
organisation's own template rather than from PadSign, so what you see may be
phrased slightly differently.

## While waiting or loading

| Message | Meaning |
|---|---|
| **Loading document...** / *Please wait while we prepare your PDF* | The document is being fetched and rendered. Normal, and short. |
| **A new visitor has been registered. Document generation is in progress.** | The system has been told about you and is producing your document. |
| **Signing process is in progress** | Your submission is being worked on. |

![A spinner card reading Loading document over a dimmed document](knowledge/raw/padsign/images/screen-document-loading.png)

## Before submission

| Message | Meaning | What to do |
|---|---|---|
| **Not all mandatory fields are filled in** | Something required is still blank. The message lists what. Nothing was submitted. | Fill in what it names, then tap Sign again. |
| *No signature entered* | The signature box was empty when you tapped Sign. | Draw your signature, then tap Sign. |

## During signing

| Message | Meaning | What to do |
|---|---|---|
| **Signing failed! Please try again.** | The process stopped before completing. The document is not signed. | Tap Close and try again. If it repeats, tell staff. |
| **Error in visual signature** | The step that places your drawn signature into the page did not complete. | Not signed. Tell staff. |
| **Error in stamping service response** | The cryptographic sealing step did not complete. Often followed by a code in brackets. | Not signed. Tell staff and mention the code. |

An error message here always means the document was **not** signed. It never means a
partial or damaged document was filed.

## On success

| Message | Meaning |
|---|---|
| **The document has been successfully signed.** | Done. Stored and sent onward. |
| **Page will refresh in 5...** | The pad is clearing itself for the next person. Nothing is lost. |
| **All steps finished successfully.** | Every step completed. |

## Connection problems

| Message | Meaning | What to do |
|---|---|---|
| **Application server is not available** / *The backend server is not running or not accessible.* | The pad cannot reach the system behind it. It retries automatically every 10 seconds, and there is a **Retry Now** button. | Tell staff. Not something a visitor can fix. |

## In demo mode only

These appear only on devices set up for evaluation, not in normal use.

| Message | Meaning |
|---|---|
| **Load DEMO PDF** | Button to pick a PDF from the device. |
| **Uploading DEMO PDF...** | The chosen file is being sent. |
| **DEMO PDF uploaded successfully.** | Uploaded, and the document will appear shortly. |
| **Failed to upload DEMO PDF.** | Upload did not work. Often a file-size limit; try a smaller PDF. |
| **Download signed PDF** | Button to save the finished signed file to the device. |
| **This PDF uses XFA forms, and filled fields may not be saved. Please use an AcroForm PDF.** | The chosen PDF uses an older form technology PadSign cannot reliably fill. Use a standard form PDF. |

## Questions this answers

- What does this message mean?
- What does "Not all mandatory fields are filled in" mean?
- What messages can appear on the pad and what do they mean?
- Is there a list of all the messages the screen can show?
- It says "Loading document", how long should that take?
- What does "Signing failed! Please try again." mean?

*Related terms: error message, what does this mean, visual signature error, stamping service, upload failed, xfa.*
