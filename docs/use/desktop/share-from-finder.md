---
id: share-from-finder
title: Share from Finder (macOS)
sidebar_label: Share from Finder
slug: /use/desktop/share-from-finder
description: On macOS, share any file or folder straight from Finder — right click and choose Share with Hippius to create a public or password-protected link.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

On macOS you can share a file or folder without opening Hippius first. Right click any item in Finder and choose **Share with Hippius** — the desktop app comes forward and creates the share for you. It's also the only way to create a **password-protected** link, and unlike the in-app Drive view it works on **any** file, not just synced ones.

:::info macOS only
Finder sharing relies on a macOS Finder extension, so it's available on macOS only. On Windows and Linux, create shares from the [Drive view](/use/desktop/shared-links#creating-a-share) instead.
:::

## Share a file or folder

<Ordered>
  <li>In Finder, right click any file or folder in your home folder.</li>
  <li>Choose <BgStyledText>Share with Hippius</BgStyledText>. If Hippius isn't running or you're signed out, the item reads <BgStyledText>Open Hippius to share</BgStyledText> instead — open the app and sign in, then try again.</li>
  <li>The app comes forward and asks who can open the link — pick <strong>Anyone with the link</strong> for a public link, or <strong>Password protected</strong> for a private one.</li>
  <li>Click <BgStyledText>Create share link</BgStyledText>. The app encrypts and uploads the item, then shows the link (and the password, for a protected link) and copies the link to your clipboard automatically.</li>
</Ordered>

The two access choices are:

<Unordered>
  <li><strong>Anyone with the link</strong> — a public link. Anyone you send it to can view and download the file until it expires.</li>
  <li><strong>Password protected</strong> — a private link. We generate a password, and the link can't be opened without it.</li>
</Unordered>

{/* TODO: screenshot of the Finder "Share with Hippius" menu + the public/password chooser */}

Unlike sharing from the Drive view, Finder sharing works on **any file or folder in your home folder** — it doesn't have to be in one of your synced folders.

:::info Sharing a folder
When you share a folder, Hippius packs its contents into a single `.zip` file and shares that. The recipient downloads one archive.
:::

## Password-protected links

For a password-protected link, the app shows a generated **password** next to the link. Copy it with the copy button and **send it to the recipient separately** — ideally over a different channel than the link itself. The recipient must enter this password to open the file.

:::warning Copy the password when you create the link
The password is shown **once**, right after the share is created. It isn't stored anywhere we can read it, so it won't reappear on the Shared Links page later. Copy it before you close the dialog. If you lose it, revoke the share and create a new one.
:::

## Manage your Finder shares

Finder shares appear on the **Shared Links** page just like shares created from the Drive view, so you can copy the link, revoke, and track them the same way. See [Shared Links](/use/desktop/shared-links) to copy, revoke, and view history, and [What recipients see](/use/desktop/shared-links#what-recipients-see) for how the link opens in a browser.
