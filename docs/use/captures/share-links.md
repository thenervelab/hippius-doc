---
id: share-links
title: Share Links for Captures
sidebar_label: Share Links
slug: /use/captures/share-links
description: Every Hippius screenshot and recording gets a public share link that never expires by default. Learn who can open it, how to turn it off, and why deleting a capture does not end its link.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

The point of a capture is usually to show it to someone, so Hippius makes the link for you. As soon as a screenshot or recording is saved, its share link is created and copied to your clipboard. Paste it anywhere.

## What a capture link is like

<Unordered>
  <li><strong>Anyone with the link can view.</strong> The people you send it to don't need a Hippius account. They open the link in a browser and see the screenshot or play the video right on the page, with a button to download it.</li>
  <li><strong>It never expires by default.</strong> The link keeps working until you turn it off. The card after a capture says so: <em>Anyone with the link can view. Never expires.</em></li>
  <li><strong>It is end to end encrypted.</strong> The key that opens the capture is in the link itself, after the <code>#</code>, and never reaches Hippius. See <a href="/use/captures#privacy-and-encryption">Privacy and encryption</a>.</li>
  <li><strong>The page shows nothing about you.</strong> No email address or account address appears on it, only the file.</li>
</Unordered>

Sharing is unlimited on every plan, including Free.

A capture link is an ordinary [share link](/use/console/shared-links), so it shows up in **Shared Links** next to the links you made by hand, and you manage it there the same way. The only difference is how it starts: a link you make yourself asks you for an expiry first, and a capture link starts out public with no expiry, so it's ready the moment you need it.

## Turn a link off

When you no longer want people to open a capture, turn its link off:

<Ordered>
  <li>Open <strong>Shared Links</strong>. After a capture, <strong>Manage link</strong> on its card takes you straight to it. In the desktop app it's in the card's More menu.</li>
  <li>Open the link's menu and choose <BgStyledText>Revoke</BgStyledText>, then confirm.</li>
</Ordered>

The link stops working at once for everyone who has it, and its encrypted copy is deleted. You can revoke a link from any device, in the console or the desktop app, whichever one made it.

## Deleting a capture doesn't end its link

This one surprises people, so it's worth spelling out. A share link is **its own encrypted copy** of the file, made when the link was created. Deleting the capture from your Drive removes your copy, but the link's copy stays, and the link keeps working.

The delete confirmation reminds you of this. If you want a capture gone for everyone, revoke its link in Shared Links as well as deleting the file. The order doesn't matter.

The same goes for edits. If you [edit a screenshot](/use/captures/edit) and replace the original, a link made before the edit keeps showing the old picture.

## A link with an expiry or a password

If you'd rather a capture link ended on its own, or needed a password, make one the usual way:

<Ordered>
  <li>Find the capture in <strong>Captures</strong>, open its row menu and choose <BgStyledText>Share via link</BgStyledText>.</li>
  <li>Choose when the link should expire, and tick <strong>Require a password</strong> if you want one.</li>
  <li>Send that link, and revoke the automatic one in Shared Links.</li>
</Ordered>

In the desktop app you can stop links being made automatically. Turn off **Copy a share link after capture** in the capture bar's <BgStyledText>Options</BgStyledText>, or in [Settings, under Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording). Your captures are then only saved to your drive, and you share the ones you choose, when you choose. In the console every capture gets its link.

## Storage

Like every share link, a capture link keeps its own encrypted copy of the file on Hippius, and that copy counts toward your storage while the link is active. Revoking the link frees it. See [Storage usage](/use/console/shared-links#storage-usage) for the details.

## Where to go next

<Unordered>
  <li><a href="/use/console/shared-links">Shared Links in the console</a> and <a href="/use/desktop/shared-links">in the desktop app</a>: everything about managing links.</li>
  <li><a href="/use/captures/edit">Edit a screenshot</a> before you share it.</li>
  <li><a href="/use/captures/troubleshooting">Troubleshooting &amp; FAQ</a>, including custom domains for links.</li>
</Unordered>
