---
id: share-from-finder
title: Share from Finder (macOS)
sidebar_label: Share from Finder
slug: /use/desktop/share-from-finder
description: On macOS, share any file or folder straight from Finder. Right click and choose Share with Hippius to create a public or password-protected link.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

On macOS you don't even need to open Hippius to share something. Just right click any file or folder in Finder and choose **Share with Hippius**, and we'll bring the app forward and set up the share for you. It's also the only place you can create a **password-protected** link, and it works on any file on your Mac, not only the ones in your synced folders.

:::info macOS only
Finder sharing uses a macOS Finder extension, so for now it's a macOS-only feature. On Windows and Linux, share from the [Drive view](/use/desktop/shared-links#creating-a-share) instead.
:::

<Screenshot src="/img/desktop/share-from-finder-menu.png" alt="Finder Share with Hippius menu" dark />

## Share a file or folder

<Ordered>
  <li>In Finder, right click any file or folder in your home folder.</li>
  <li>Choose <BgStyledText>Share with Hippius</BgStyledText>. If the app isn't running or you're signed out, you'll see <BgStyledText>Open Hippius to share</BgStyledText> instead. Open Hippius, sign in, and try again.</li>
  <li>We bring the app forward and ask who should be able to open the link. Pick <strong>Anyone with the link</strong> for a public link, or <strong>Password protected</strong> for a private one.</li>
  <li>Click <BgStyledText>Create share link</BgStyledText>. We encrypt and upload the item, then show you the link (and the password, if it's protected) and copy the link to your clipboard for you.</li>
</Ordered>

Here's what the two access options mean:

<Unordered>
  <li><strong>Anyone with the link</strong> is a public link. Anyone you send it to can open and download the file until it expires.</li>
  <li><strong>Password protected</strong> is a private link. We generate a password for you, and the link won't open without it.</li>
</Unordered>

<Screenshot src="/img/desktop/share-from-finder-chooser.png" alt="Share access chooser: public or password protected" dark />

Sharing from Finder works on **any file or folder in your home folder**. It doesn't have to live in one of your synced folders, which is what makes it different from sharing inside the Drive view.

:::info Sharing a folder
When you share a folder, we pack everything inside it into a single `.zip` file and share that, so whoever you send it to downloads one tidy archive.
:::

## Password-protected links

For a password-protected link, we show you a generated **password** right next to the link. Copy it with the copy button and **send it to the recipient separately**, ideally through a different channel than the link itself. They'll need to type this password in to open the file.

:::warning Copy the password when you create the link
We show the password **once**, right after you create the share. We don't keep it anywhere we can read, so it won't show up again on the Shared Links page later. Copy it before you close the dialog. If you lose it, no problem: just revoke the share and create a new one.
:::

## Manage your Finder shares

Your Finder shares show up on the **Shared Links** page right alongside the ones you create from the Drive view, so you can copy the link, revoke it, and keep track of it the same way. Head over to [Shared Links](/use/desktop/shared-links) to manage them and view your history, or see [What recipients see](/use/desktop/shared-links#what-recipients-see) for how the link opens in someone's browser.
