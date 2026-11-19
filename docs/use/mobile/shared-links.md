---
id: shared-links
title: Sharing Files
sidebar_label: Sharing Files
slug: /use/mobile/shared-links
description: Create a public or password-protected link to a Hippius file or folder, choose how long it lasts, make it view only, see who opened it, and revoke it when you are done.
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
  <li>Under <strong>Secure link</strong>, choose when it <strong>Expires</strong>: <strong>24 hours</strong>, <strong>7 days</strong> (the default), <strong>30 days</strong>, or <strong>Never</strong>. A link that never expires stays reachable until you revoke it. You can change this later.</li>
  <li>Optionally turn on <strong>Require a password</strong>. The app fills in a strong password for you, which you can change. It needs at least 8 characters. Tap <strong>Copy password</strong> and keep it somewhere, because it is not stored anywhere and can't be shown again once the sheet closes.</li>
  <li>For a file, you can also turn on <strong>Email me when it's opened</strong> to get an email the first time someone opens one of your links.</li>
  <li>Tap <BgStyledText>Create link</BgStyledText>. For a file, the app shows its progress while it encrypts and uploads the copy, which can take a moment for a large file. A folder link is ready straight away.</li>
  <li>Tap <BgStyledText>Copy link</BgStyledText>, or <BgStyledText>Share</BgStyledText> to send it straight from your phone's share sheet.</li>
</Ordered>

<Screenshot src="/img/mobile/share-link.png" alt="Share link options: expiry and optional password" dark raw phone />

The finished sheet reminds you who can open the link and when it expires. If you set a password, it is shown once more under **Password, shown once**. Send it to the recipient separately from the link, for example in a different app.

:::warning
Anyone with the link (and the password, if you set one) can open what you shared. Treat the link like the file itself and only send it to people you mean to.
:::

Items you have shared from this phone show a small **link** badge. Tap the badge, or choose **Share via Link** again, to get back to the same link and copy it again, instead of making a new one.

## Managing your links {#seeing-and-revoking-your-links}

Open **Shared Links** with the **link** icon next to **All** on the Drive screen, from the **…** menu inside any folder, or by tapping an item's link badge. It lists your file and folder links that are still active, wherever you made them: on this phone, in the console or in the desktop app. Tap the **copy** button on a row to copy that link again. If it reads **Link not on this device**, this phone can't rebuild that link, so copy it where you made it.

Tap a link to open its details. From there you can:

<Unordered>
  <li><strong>Copy or share it</strong> with <BgStyledText>Copy link</BgStyledText> or <BgStyledText>Share</BgStyledText>.</li>
  <li><strong>Change when it expires.</strong> Under <strong>Secure link</strong>, tap <strong>24 hours</strong>, <strong>7 days</strong>, <strong>30 days</strong> or <strong>Never</strong>. The new time counts from now, and the link itself stays the same, so there's nothing to send again.</li>
  <li><strong>Make it view only.</strong> On a paid plan, file links have an <strong>Allow download</strong> switch. Turn it off and people can still open the file in their browser but can't download it, and a shared PDF gets a faint watermark on every page. This discourages copying but can't prevent it. See <a href="/use/console/shared-links#make-a-link-view-only">Make a link view only</a>.</li>
  <li><strong>See who opened it</strong> with <BgStyledText>View insights</BgStyledText>. See <a href="#insights">Insights</a> below.</li>
  <li><strong>Remove its chat preview</strong>, if it has one. The link keeps working.</li>
  <li><strong>Revoke it</strong> with <BgStyledText>Revoke link</BgStyledText>. Anyone holding it can't open it from then on. This can't be undone, and your file in Drive is untouched.</li>
</Unordered>

An older folder link that carries its drive's key says so in its details, with <BgStyledText>Replace link</BgStyledText> to swap it for a safer one.

Links that have expired or been revoked move to **History** at the bottom of the screen. **Clear all** empties it. That only clears the list on this phone.

<Screenshot src="/img/mobile/shared-links.png" alt="The Shared Links screen" dark raw phone />

## Insights {#insights}

On a paid plan, you can see what happened to a link: how many times it was opened and by how many people, what they said in comments and how they reacted, and for a video, where people stopped watching. For a folder link, you see which files were opened. Open it with <BgStyledText>View insights</BgStyledText> in the link's details, or from a file's press-and-hold menu.

The **Link settings** button at the top has the link's **Insights**, **Comments** and **Reactions** switches. How views are counted, who can comment and the privacy details are in [Insights, comments and reactions](/use/captures/insights).

## Where to next

<Unordered>
  <li><a href="/use/mobile/drive">Your Files</a>: browse, upload and organise.</li>
  <li><a href="/use/console/shared-links#what-recipients-see">What recipients see</a> (console guide): what opening a link looks like on the other end.</li>
</Unordered>
