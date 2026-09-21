---
id: shared-drives
title: Shared Drives
sidebar_label: Shared Drives
slug: /use/console/shared-drives
description: Drives other people have invited you into, how to open one, and how a shared drive differs from a drive you own.
draft: true
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

A shared drive is a drive somebody else owns and has invited you into. You read and write files in it the same way you would your own, but the drive belongs to them: they pay for the storage, and they decide who has access.

Shared drives live on their own page, at <BgStyledIconWithText text="Storage" icon="SidebarStorage" /> → **Shared Drives**. The entry only appears in the sidebar once you are actually in a drive, so if you have never been invited into one you will not see it.

<Screenshot src="/img/console/shared-drives/list.png" alt="The Shared Drives page" dark />

## The Shared Drives Page

The page lists every drive you have been invited into:

| Column | What it shows |
|---|---|
| **Drive** | The drive's name, and the account that shared it. |
| **Your access** | What you are allowed to do in the drive. |
| **Files** | How many files the drive holds. |
| **Size** | How much the drive holds in total. |
| **Joined** | When you accepted the invite. |

Two people can both name a drive "Design", so the owner's address is part of the drive's identity, not just a detail.

Files and Size are read from the owner's drive. If that cannot be read at the moment, those cells show a dash rather than a zero, because "0 files" would be a claim the drive is empty, which is a different thing from "we don't know yet".

## Opening a Shared Drive

Click any row to open it. You get the same file browser as your own Drive, with the same search, filters, previews, uploads and sharing.

Three things are different, and all three are about making it obvious whose files you are looking at:

<Unordered>
  <li>The page is titled with the drive's name, and says who shared it underneath.</li>
  <li>The breadcrumb starts at <strong>Shared Drives</strong> rather than Drive, so going up takes you back to the list.</li>
  <li>There is no Last Uploads strip. That shows your own recent activity across your own drives, which tells you nothing about this one.</li>
</Unordered>

<Screenshot src="/img/console/shared-drives/inside-drive.png" alt="Browsing inside a shared drive" dark />

## Accepting an Invite

An invite arrives as a link. Opening it shows you which drive you are being invited into, and a <BgStyledText>Join drive</BgStyledText> button.

The link carries a key in the part of the URL after the `#`. Your browser never sends that part to any server, and Hippius removes it from the address bar as soon as the page loads, so it cannot end up in your history or be sent on if you copy the URL afterwards.

:::warning Treat an invite link like a password
Anyone holding the full link can join the drive. Send it the way you would send a credential, and only to the person it is meant for.
:::

When you join, Hippius verifies the key on your own device, seals your access under your account, and takes you straight into the drive.

## Losing Access

The owner can remove you from a drive at any time. If that happens, the drive stops appearing on your Shared Drives page, and opening an old link to it tells you plainly that you no longer have access.

## What You Cannot Do

You are a member, not the owner:

<Unordered>
  <li>You cannot invite other people. Only the owner can.</li>
  <li>You cannot delete the drive.</li>
  <li>You are not billed for it. Everything in the drive is billed to the owner, including anything you upload.</li>
</Unordered>

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: your own encrypted files.</li>
  <li><a href="/use/console/shared-links">Shared Links</a>: sharing a single file or folder with someone who has no Hippius account.</li>
</Unordered>
