---
id: overview
title: Screenshots and Recording
sidebar_label: Overview
slug: /use/captures
description: Take a screenshot or record your screen with Hippius and get a link to paste straight away. Every capture is encrypted on your computer and saved to your own captures drive, and you can see who watched and read their replies.
pagination_prev: null
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import Screenshot from '@site/src/components/Screenshot';

Some things are quicker to show than to explain. Take a screenshot or record your screen with Hippius, and by the time you let go, the capture is saved and its link is on your clipboard. Paste it into a chat, an email or a ticket, and the person on the other end opens it in their browser, no account needed.

What sets Hippius apart is where your captures live. Most screen recorders upload your videos to their own servers, in a form they can read. Hippius encrypts every capture on your computer before it's uploaded, into a drive in your own account. The key that opens it travels inside the link, so the people you send it to can watch it, and we can't.

And a link can do more than play the video. You can see how many people opened it and, on a paid plan, how far into a recording they got. The people you sent it to can reply right under it, and their comments are encrypted with the same key as the capture.

## What happens when you capture

<Ordered>
  <li>You choose what to capture: your entire screen, one window, or an area you drag out.</li>
  <li>Hippius takes the screenshot, or records until you stop.</li>
  <li>The capture is encrypted on your computer and uploaded to your captures drive.</li>
  <li>A share link is made for it and copied to your clipboard. Anyone with that link can view the capture in their browser, without a Hippius account.</li>
</Ordered>

You don't name a file or start an upload. The desktop app asks once where to keep your captures, and after that every capture just goes there. A capture is still an ordinary file in your Drive, so you can rename it, move it or share it again later if you want to.

## Pick your app {#where-you-can-use-it}

You can capture in the desktop app or in the console. They save to the same drive, so you can start on one and pick up on the other.

<Unordered>
  <li>The <a href="/use/captures/screenshots#in-the-desktop-app">desktop app</a> on Mac, Windows and Linux is the smoothest. Press a shortcut from any app, drag, and you're done. If your connection drops, the capture waits on your computer until it can upload.</li>
  <li>The <a href="/use/captures/screenshots#in-the-console">console</a> works in any browser on a computer, with nothing to install, which makes it handy on a computer that isn't yours. In Safari and Firefox it can't record an area or add your camera to a window recording (<a href="/use/captures/recording#browser-differences">the details</a>).</li>
</Unordered>

Phones can't take captures, but everything you capture on a computer shows up in **Captures** when you open the console on your phone, and the links work on any device.

<details>
<summary>Every app and browser at a glance</summary>

| Where | Screenshots | Screen recording |
|---|---|---|
| **Desktop app on macOS** | Yes | Yes |
| **Desktop app on Linux** | Yes | Yes |
| **Desktop app on Windows** | Yes | Yes |
| **Console in Chrome or Edge** on a computer | Yes | Yes |
| **Console in Safari or Firefox** on a computer | Yes | Yes, with a few differences (see [Record your screen](/use/captures/recording#browser-differences)) |
| **[Browser extension](/use/browser-extension)** in Chrome or Edge on a computer | Yes | Yes |
| **Phones** | No | No |

</details>

If you live in your browser, the Hippius extension for Chrome and Edge puts screenshots and recording a click away in your toolbar. Its own guide, [Browser Extension](/use/browser-extension), starts from installing it.

## Where your captures go

Every screenshot and recording lands in your captures drive. The desktop app's capture bar calls it **Hippius Captures**, and on your computer it's the `hippius-captures` folder unless you picked another. The desktop app and the console use the same drive, so a recording you made on your laptop is in the list when you open the console at work, and the other way round.

Captures are named after the moment you took them, so they sort naturally:

<Unordered>
  <li><code>Screenshot 2026-10-12 at 14.03.11.png</code></li>
  <li><code>Recording 2026-10-12 at 14.05.40.mp4</code> (some browsers save a <code>.webm</code> video instead)</li>
</Unordered>

Open **Captures** in the sidebar (under Drive in the console) to see your newest captures first, with the same search, filters and row menu as any drive, and a quick way into the [Insights](/use/captures/insights) of any capture that has a link. They're also ordinary files in your captures drive, next to your other drives.

<Screenshot src="/img/console/captures/captures-page.png" alt="The Captures page in the console, listing screenshots and recordings with 3 of 25 free recordings used" dark raw />

### Choose where captures are saved

In the desktop app, your first capture asks once where to keep your captures on your computer. Hippius suggests a `hippius-captures` folder in Documents, and you can pick any other folder instead, with any name you like. The capture you just took waits safely on your computer while you decide, and uploads as soon as the folder is ready.

<Screenshot src="/img/desktop/captures/captures-folder.png" alt="The desktop app asking where to keep captures, suggesting Documents › hippius-captures, with Choose another location and Create folder" dark raw />

Captures go straight into the folder you choose. If that's a big folder, like your home folder, Documents, Desktop, Downloads or the top of a drive, Hippius makes a `hippius-captures` folder inside it so it never uploads the whole thing, and the dialog shows you exactly where before you confirm.

You can also pick a folder inside a drive you already back up, your main drive for example. Captures are then saved in that drive instead of in a drive of their own. A folder inside a drive someone else shared with you can't be used.

To move it later, open [Settings, Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording) and click **Change** next to Capture folder. New captures go to the new place, and the ones you already took stay put.

On a Mac, macOS asks once before an app may use your Documents, Desktop or Downloads folder. Hippius tells you before it happens, so choose **Allow**.

In the console there's nothing to choose: your captures drive is made for you on your first capture, with the same `hippius-captures` name. If you rename the folder, or picked one with another name, Hippius still knows it's your captures drive, so it keeps showing up in Captures in both apps. If your captures live in a folder inside another drive, the desktop app's Captures page says where they are and opens that folder for you.

## Privacy and encryption

Captures get the same protection as the rest of your Drive. Your screenshot or recording is encrypted on your computer, in the app or in your browser, before any of it is sent, and Hippius only ever stores the encrypted file.

When you share it, the key that opens it sits at the end of the link, after the `#`. Browsers never send that part of an address to a server, so the key never reaches Hippius. That's also why the whole link matters: without the part after the `#`, the capture can't be opened.

| | Encrypted so Hippius can't read it? |
|---|---|
| Your screenshots and recordings | Yes |
| Comments on your share links, and the names people comment under | Yes, with the link's key, so only people who have the link can read them |
| Reactions on your share links | No. Hippius can see which emoji were chosen, because it has to count them |
| View counts and watch time | No. They're counted anonymously, with no account or IP address attached |
| A shared capture's file name and size | No. The automatic names only say when it was taken, so rename a capture first if its name would say too much |
| The preview picture chat apps show | No, while [chat previews](/use/captures/share-links#a-preview-when-you-paste-the-link-in-a-chat) are on |

Anyone who has the link can view the capture, so treat the link like the capture itself. If a link reaches someone it shouldn't, turn it off in Shared Links. See [Share links for captures](/use/captures/share-links). The details for comments and views are in [Insights, comments and reactions](/use/captures/insights#privacy).

## Where to go next

<Unordered>
  <li><a href="#where-you-can-use-it">Pick your app</a>: which one suits you.</li>
  <li><a href="/use/captures/screenshots">Take a screenshot</a> in the desktop app or the console.</li>
  <li><a href="/use/captures/recording">Record your screen</a>, with your microphone, your camera and your computer's sound.</li>
  <li><a href="/use/captures/share-links">Share links for captures</a>: who can open them, and how to turn one off.</li>
  <li><a href="/use/captures/insights">Insights, comments and reactions</a>: see who watched, and read what they said.</li>
  <li><a href="/use/captures/edit">Edit a screenshot</a> with arrows, text, blur and more.</li>
  <li><a href="/use/captures/plans">Free and paid plans</a>: what the Free plan includes.</li>
  <li><a href="/use/captures/troubleshooting">Troubleshooting &amp; FAQ</a> when something doesn't go to plan.</li>
</Unordered>
