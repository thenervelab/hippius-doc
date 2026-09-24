---
id: shared-links
title: Sharing Files
sidebar_label: Sharing Files
slug: /use/mobile/shared-links
description: Create a public or password-protected link to a Hippius file or folder, choose how long it lasts, and revoke it when you are done.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

A shared link lets you send a **file or a folder** to someone who does not have a Hippius account. They open the link in a browser and download what you shared. Nothing else in your Drive is reachable from it.

<Unordered>
  <li><strong>A file link</strong> shares that one file. The app makes a separately encrypted copy of it for the link, so your own copy and your key are never exposed.</li>
  <li><strong>A folder link</strong> shows a live listing of that folder. Anyone with it can browse and download everything in the folder, and it always shows what is in there now, including files you add later, until the link expires or you revoke it.</li>
</Unordered>

## Sharing a file or folder

<Ordered>
  <li>Press and hold the item and choose <strong>Share via Link</strong>. When a file is open full screen, you can also tap the <strong>share</strong> button at the bottom.</li>
  <li>Under <strong>Link expires</strong>, choose how long the link should last: <strong>24 hours</strong>, <strong>7 days</strong> (the default), <strong>30 days</strong>, or <strong>Never</strong>. A link that never expires stays reachable until you revoke it.</li>
  <li>Optionally turn on <strong>Require a password</strong>. The app fills in a strong password for you, which you can change. It needs at least 8 characters. Tap <strong>Copy password</strong> and keep it somewhere, because it is not stored anywhere and can't be shown again once the sheet closes.</li>
  <li>Tap <BgStyledText>Create link</BgStyledText>. For a file, the app shows its progress while it encrypts and uploads the copy, which can take a moment for a large file. A folder link is ready straight away.</li>
  <li>Tap <BgStyledText>Copy link</BgStyledText>, or <BgStyledText>Share</BgStyledText> to send it straight from your phone's share sheet.</li>
</Ordered>

<Screenshot src="/img/mobile/share-link.png" alt="Share link options: expiry and optional password" dark raw phone />

The finished sheet reminds you who can open the link and when it expires. If you set a password, it is shown once more under **Password, shown once**. Send it to the recipient separately from the link, for example in a different app.

:::warning
Anyone with the link (and the password, if you set one) can open what you shared. Treat the link like the file itself and only send it to people you mean to.
:::

Items you have shared from this phone show a small **link** badge. Tap the badge, or choose **Share via Link** again, to get back to the same link and copy it again, instead of making a new one.

## Seeing and revoking your links

Open **Shared Links** with the **link** icon next to **All** on the Drive screen, or from the **…** menu inside any folder. It lists every **file** link that is still active, with the file's size and when the link expires.

<Unordered>
  <li>Tap the <strong>copy</strong> button to copy a link again.</li>
  <li>Tap the <strong>trash</strong> button, then <BgStyledText>Revoke</BgStyledText>, to switch a link off immediately. Anyone holding it stops being able to open it. Your file in Drive is untouched.</li>
</Unordered>

Links that have expired or been revoked move to **History** at the bottom of the screen. **Clear all** empties it. That only clears the list on this phone.

<Screenshot src="/img/mobile/shared-links.png" alt="The Shared Links screen" dark raw phone />

### Folder links {#folder-links}

Folder links are not listed on the Shared Links screen. To see, copy or revoke a folder link, press and hold the folder, or tap its link badge, to open its **Share link** sheet, then tap <BgStyledText>Revoke link</BgStyledText>.

:::info Links made on another device
A link can only be copied again on the phone that created it, because that is where its key is kept. Logging out removes those keys from the phone as well. A link made somewhere else, or before you logged out, still shows up here, and you can still revoke it, but its copy button is greyed out.
:::

## Where to next

<Unordered>
  <li><a href="/use/mobile/drive">Your Files</a>: browse, upload and organise.</li>
  <li><a href="/use/console/shared-links#what-recipients-see">What recipients see</a> (console guide): what opening a link looks like on the other end.</li>
</Unordered>
