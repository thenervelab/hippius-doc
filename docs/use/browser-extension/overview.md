---
id: overview
title: The Hippius Browser Extension
sidebar_label: Overview
slug: /use/browser-extension
description: What the Hippius extension for Chrome and Edge does, where your screenshots and recordings are kept, what makes it different from other screen recorders, and what you need to start.
---

import Unordered from '@site/src/components/Unordered';
import Screenshot from '@site/src/components/Screenshot';

The Hippius extension adds screenshots and screen recording to Chrome and Microsoft Edge. Click the Hippius button in your toolbar, or press a shortcut, and capture the page you're on, part of your screen, a whole screen or just your camera. A moment later the capture is saved and a link to it is on your clipboard, ready to paste into a chat, an email or a ticket.

If you've found the extension in the Chrome Web Store and have never used Hippius before, this section is written for you. It starts from the beginning and assumes nothing.

<Screenshot src="/img/extension/capture-bar.png" alt="The Hippius capture bar on a web page, set to record the tab with the camera and microphone on, and the camera bubble in the corner" dark raw />

## What it does

<Unordered>
  <li><strong>Screenshots</strong> of the visible page, an area you drag out, or any screen or window on your computer, other apps included.</li>
  <li><strong>Screen recordings</strong> of a tab, an area, a screen or a window, with your voice and your camera in a small round bubble if you want them. You can also record your camera on its own.</li>
  <li><strong>A share link for every capture</strong>, copied for you the moment it's saved. The person you send it to opens it in their browser. They don't need Hippius or an account.</li>
  <li><strong>Who watched</strong>: on a paid plan, you can see how many people opened a link and how much of a recording they watched, and read the comments they leave.</li>
</Unordered>

## Where your captures go

Hippius is a storage service. Your files live in **Hippius Drive**, your own private space on the Hippius network. The extension saves every capture there, in a drive of its own that holds only your screenshots and recordings, called your captures drive.

That means your captures are ordinary files in your own account. You can find them in the extension's popup, and you can also open, rename, download or delete them from the Hippius console at [console.hippius.com](https://console.hippius.com), or from the Hippius desktop and mobile apps if you use them later. Nothing is locked inside the extension.

## What makes it different

Most screen recorders upload your videos to their own servers, where the company can watch them. Hippius works another way:

<Unordered>
  <li><strong>Encrypted before it leaves your browser.</strong> A capture is locked with a key that belongs to your account before it's uploaded. Hippius stores the locked file and can't open it.</li>
  <li><strong>The link carries the key.</strong> The part of a share link that unlocks the capture comes after the <code>#</code>, and browsers never send that part to a server. Whoever you give the link to can watch; Hippius still can't.</li>
  <li><strong>Comments are private too.</strong> When people comment on your link, their comments are encrypted with the same link key, so only people who have the link can read them.</li>
  <li><strong>Decentralized storage.</strong> Your encrypted files aren't kept in one company's data centre. They're split into pieces and spread across many independent storage providers on the Hippius network, so no single machine holds your file and losing a few machines loses nothing.</li>
  <li><strong>No tracking.</strong> The extension talks only to Hippius, only to save and share your captures. There are no ads, analytics or trackers.</li>
</Unordered>

The details, including what is and isn't encrypted, are on [Privacy and Permissions](/use/browser-extension/privacy).

## Who it's for

The extension suits anyone who spends their day in a browser and wants to show rather than explain: a bug report with a recording of what went wrong, a quick walkthrough for a teammate, feedback on a design, an answer to a support question. It's also handy on a computer where you can't install apps, because it needs nothing beyond your browser.

## What you need

<Unordered>
  <li><strong>Chrome or Microsoft Edge</strong> on a computer, version 116 or later. Other browsers built on Chrome that install from the Chrome Web Store, such as Brave and Arc, can add it too, but we build and test it on Chrome and Edge.</li>
  <li><strong>A Hippius account</strong>, so your captures have somewhere to live. Making one is free and takes a minute, and the free plan covers unlimited screenshots and 25 recordings.</li>
</Unordered>

Ready? [Get started](/use/browser-extension/get-started) walks you through installing the extension, making your account and connecting the two.

:::tip Other ways to capture
The same screenshots and recordings are also built into the Hippius desktop app and the Hippius console, and all three save to the same captures drive. See [Screenshots &amp; Recording](/use/captures) if you'd like to compare them.
:::
