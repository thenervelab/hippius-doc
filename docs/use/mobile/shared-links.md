---
id: shared-links
title: Sharing Files
sidebar_label: Sharing Files
slug: /use/mobile/shared-links
description: Create a public or password-protected link to a Hippius file or folder, choose how long it lasts, and revoke it when you are done.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

A shared link lets you send a **file or a folder** to someone who does not have a Hippius account. They open the link in a browser and download what you shared. Nothing else in your Drive is reachable from it.

Folder links show a live listing of that folder. Changes you make later in Drive can appear for the recipient until the link expires or you revoke it.

## Sharing a file or folder

<Ordered>
  <li>Press and hold the item, or open its ··· menu, and choose <strong>Share via Link</strong>.</li>
  <li>Choose how long the link should last: <strong>24 hours</strong>, <strong>7 days</strong> (the default), <strong>30 days</strong>, or <strong>Never</strong>.</li>
  <li>Optionally turn on a <strong>password</strong>. We can generate one for you; anyone opening the link will need it.</li>
  <li>Confirm. We prepare the link, which takes a moment because the content is re-encrypted for sharing.</li>
  <li>Copy the link, or send it straight from your phone's share sheet.</li>
</Ordered>

<Screenshot src="/img/mobile/share-link.png" alt="Share link options: expiry and optional password" dark raw />

:::warning
Anyone with the link (and the password, if you set one) can open what you shared. Treat the link like the file itself and only send it to people you mean to.
:::

## Seeing and revoking your links

Open **Shared Links** from Drive (overflow menu, or the link badge on an item) to see every link that is still active. Each one shows the item, its size, and when it expires.

Tap **Revoke** to switch a link off immediately. Anyone holding it stops being able to open it, and your copy in Drive is untouched.

:::info
A link can only be copied again on the phone that created it (that is where the share key is kept). If you made it somewhere else, that copy is not available here, but you can still see the link and revoke it.
:::
