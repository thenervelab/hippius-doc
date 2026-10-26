---
id: overview
title: Screenshots and Screen Recording
sidebar_label: Overview
slug: /use/captures
description: Take a screenshot or record your screen in the Hippius desktop app or the console. Every capture is encrypted on your device, saved to your Hippius Captures drive, and comes with a share link ready to paste.
pagination_prev: null
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import Screenshot from '@site/src/components/Screenshot';

Sometimes a picture explains a problem faster than a paragraph, and a short video beats a meeting. Hippius lets you take a screenshot or record your screen, and by the time you have let go of the mouse, the capture is saved in your Drive and a link to it is on your clipboard, ready to paste into a chat, an email or a ticket.

Like everything else in your Drive, a capture is encrypted on your own device before it leaves it. Nobody at Hippius can look at it, and the people you send the link to can.

## What happens when you capture

<Ordered>
  <li>You choose what to capture: your entire screen, one window, or an area you drag out.</li>
  <li>Hippius takes the screenshot, or records until you stop.</li>
  <li>The capture is encrypted on your device and uploaded to your captures drive, a drive of its own that is just for captures.</li>
  <li>A share link is made for it and copied to your clipboard. Anyone with that link can view the capture in their browser, without a Hippius account.</li>
</Ordered>

There is no folder to pick, no file to name and no upload to start. You can still do all of that later if you want to, because a capture is an ordinary file in your Drive.

## Where you can use it

| Where | Screenshots | Screen recording |
|---|---|---|
| **Desktop app on macOS** | Yes | Yes |
| **Desktop app on Linux** | Yes | Yes |
| **Desktop app on Windows** | Yes | Yes |
| **Console in Chrome or Edge** on a computer | Yes | Yes |
| **Console in Safari or Firefox** on a computer | Yes | Yes, with a few differences (see [Record your screen](/use/captures/recording#browser-differences)) |
| **Phones** | No | No |

On a phone you can't take captures with Hippius, but everything you capture on a computer shows up in **Captures** when you open the console on your phone, and its link works on any device.

If you have the choice, the desktop app gives you the most: system-wide keyboard shortcuts, a one-step area screenshot, Screenshot and Record in the menu bar, and captures that wait safely on your computer if they can't be uploaded straight away. The console needs nothing installed, which makes it handy on a computer that isn't yours.

## Where your captures go

Every screenshot and recording lands in your **Hippius Captures** drive. The desktop app and the console use the same drive, so a recording you made on your laptop is in the list when you open the console at work, and the other way round.

Captures are named after the moment you took them, so they sort naturally:

<Unordered>
  <li><code>Screenshot 2026-10-12 at 14.03.11.png</code></li>
  <li><code>Recording 2026-10-12 at 14.05.40.mp4</code> (some browsers save a <code>.webm</code> video instead)</li>
</Unordered>

You'll find them in two places:

<Unordered>
  <li><strong>Captures</strong>, in the sidebar of the desktop app and of the console (under Drive). It lists your newest captures first, with the same search, filters and row menu as any drive, and an Insights button for captures that have a link.</li>
  <li><strong>The captures drive</strong> itself, next to your other drives. It's called <code>hippius-captures</code> unless you chose a folder with another name.</li>
</Unordered>

<Screenshot src="/img/console/captures/captures-page.png" alt="The Captures page in the console, listing screenshots and recordings with 3 of 25 free recordings used" dark raw />

### Choose where captures are saved

In the desktop app, your first capture asks once where to keep your captures on your computer. Hippius suggests a folder called `hippius-captures` in your Documents folder, and you can choose any other folder instead, with any name you like. The capture you just took is kept safe on your computer while you decide, and uploads as soon as the folder is ready.

<Screenshot src="/img/desktop/captures/captures-folder.png" alt="The desktop app asking where to keep captures, suggesting Documents › hippius-captures, with Choose another location and Create folder" dark raw />

A few things to know about the folder you pick:

<Unordered>
  <li><strong>It's used as it is.</strong> Captures go straight into the folder you choose; Hippius doesn't make another folder inside it.</li>
  <li><strong>Big folders get a folder of their own.</strong> If you pick your home folder, Documents, Desktop, Downloads or the top of a drive, Hippius makes a <code>hippius-captures</code> folder inside it, so it never uploads that whole folder. The dialog shows you the exact folder before you confirm.</li>
  <li><strong>It can be inside one of your drives.</strong> Pick a folder inside a drive you already back up, your main drive for example, and captures are saved there, in that drive, instead of in a drive of their own. A folder inside a drive someone else shared with you can't be used.</li>
  <li><strong>You can change it later.</strong> Go to <a href="/use/desktop/settings#screenshots--recording">Settings, Screenshots &amp; Recording</a> and press <strong>Change</strong> next to Capture folder. New captures go to the new folder, and the ones you already took stay where they are.</li>
</Unordered>

On a Mac, macOS asks once before an app may use your Documents, Desktop or Downloads folder. Hippius tells you before it happens: choose **Allow**.

In the console, the captures drive is created for you on your first capture, with the same `hippius-captures` name. The console and the desktop app recognise your captures drive by its identity, not by its name, so a folder you picked or renamed still shows up in Captures. If your captures live in a folder inside another drive, the desktop app's Captures page says where they are and opens that folder for you.

A capture is a file like any other, so you can rename it, move it, download it, share it again or delete it whenever you like.

## Privacy and encryption

Captures get the same protection as the rest of your Drive:

<Unordered>
  <li><strong>Encrypted before upload.</strong> Your screenshot or recording is encrypted on your computer, in the app or in your browser, before any of it is sent. Hippius only ever stores the encrypted file.</li>
  <li><strong>The link carries its own key.</strong> A share link ends with a key after the <code>#</code> sign. Browsers never send that part of an address to a server, so the key that opens your capture never reaches Hippius. That is also why the full link matters: without the part after the <code>#</code>, the capture can't be opened.</li>
  <li><strong>The watermark is part of the file.</strong> On the Free plan, the small Hippius mark is drawn into the picture on your device before it is encrypted. It is not something the server adds or could remove.</li>
  <li><strong>What the server can see.</strong> For a shared file, the server knows how big it is and what it is called. It never sees what is in it, unless you leave <a href="/use/captures/share-links#a-preview-when-you-paste-the-link-in-a-chat">chat previews</a> on: the small preview picture that chat apps show is not encrypted.</li>
  <li><strong>Comments are encrypted too.</strong> If people comment on your link, their comments and names are end-to-end encrypted with the link's key. Reactions and view counts are not encrypted. See <a href="/use/captures/insights#privacy">Insights, comments and reactions</a>.</li>
</Unordered>

Because the file name of a shared capture is visible to the server, give a capture a neutral name before you share it again if the name itself would say too much. The automatic names only say when it was taken.

Anyone who has the link can view the capture, so treat the link like the capture itself. If a link reaches someone it shouldn't, turn it off in Shared Links. See [Share links for captures](/use/captures/share-links).

## Where to go next

<Unordered>
  <li><a href="/use/captures/screenshots">Take a screenshot</a> in the desktop app or the console.</li>
  <li><a href="/use/captures/recording">Record your screen</a>, with your microphone, your camera and your computer's sound.</li>
  <li><a href="/use/captures/share-links">Share links for captures</a>: who can open them, and how to turn one off.</li>
  <li><a href="/use/captures/insights">Insights, comments and reactions</a>: see who watched, and read what they said.</li>
  <li><a href="/use/captures/edit">Edit a screenshot</a> with arrows, text, blur and more.</li>
  <li><a href="/use/captures/plans">Free and paid plans</a>: what the Free plan includes.</li>
  <li><a href="/use/captures/troubleshooting">Troubleshooting &amp; FAQ</a> when something doesn't go to plan.</li>
</Unordered>
