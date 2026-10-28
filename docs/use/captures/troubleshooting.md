---
id: troubleshooting
title: Troubleshooting & FAQ
sidebar_label: Troubleshooting & FAQ
slug: /use/captures/troubleshooting
description: What to do when a Hippius screenshot or recording can't be uploaded, a link isn't copied, or Record won't start, plus answers to common questions about captures, links, custom domains and phones.
pagination_next: null
---

import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

Most capture problems come down to one of three things: the capture couldn't reach your Drive, your browser or computer said no to something, or you've hit a Free plan limit. Find your symptom below. Hippius tries hard not to lose anything along the way, so nothing is lost while you sort it out.

## Troubleshooting

### A capture couldn't be uploaded

If your storage is full, your Drive is locked, or your connection drops, the capture isn't thrown away. The card after the capture says what went wrong (for example **Your storage is full** or **Your Drive couldn't be reached**) and offers a way forward: <BgStyledText>Retry</BgStyledText>, <BgStyledText>Upgrade</BgStyledText> when you're out of space, or <BgStyledText>Unlock</BgStyledText> when your Drive needs your password.

In the desktop app, the capture is kept on your computer. The card comes back with Retry the next time you capture, and also when you open Hippius again, even after a restart.

In the console, a capture that can't upload waits in your browser, encrypted with your Drive's keys, and survives closing the tab or reloading. You'll find it at the top of the **Captures** page with <BgStyledText>Retry</BgStyledText> and <BgStyledText>Discard</BgStyledText>, and the console reminds you about it when you come back. It only lives in that browser on that computer, so retry from there.

The browser can't keep it in a private window, if your Drive was locked when you captured, or if the recording is too large for the room the browser has. In those cases the card says so: keep the tab open until it says **Link ready**.

If you're out of space, free some up by deleting files you no longer need, or move to a bigger plan, then press Retry.

### The capture was saved but has no link

The card says **Saved, no link yet** and offers <BgStyledText>Create link</BgStyledText>. The capture is safely in your Drive; only the link step didn't finish. Press it to try again, or share the file later from Captures.

### The link wasn't copied

Sometimes the system or the browser doesn't let Hippius use the clipboard, for example when you've clicked into another app while the upload finished. Press <BgStyledText>Copy link</BgStyledText> on the card. If that doesn't work either, open the link with <BgStyledText>Open</BgStyledText> and copy it from the address bar, or copy it from Shared Links.

### The console opened no new tab

The console opens each new link in a tab of its own. If your browser blocks pop-ups, the card says so. Allow pop-ups for Hippius, or use <BgStyledText>Open</BgStyledText> on the card.

### Capture says "Checking your plan..." or "We couldn't check your plan"

Before each capture, Hippius checks your plan, because it decides the watermark, the 5-minute limit and the 25 free recordings. While it checks, the capture bar says **Checking your plan...** and waits. If the check fails, usually because you're offline, nothing is captured: check your connection and press <BgStyledText>Retry</BgStyledText>.

<Screenshot src="/img/console/captures/plan-check.png" alt="The capture bar saying We couldn't check your plan, with a Retry button" dark raw />

### Capture says my account doesn't include free storage

Accounts that sign in with an access key don't come with the free 10 GB, so there's nowhere to keep captures until you choose a plan. Press **See plans** to pick one.

### Record doesn't start

On the Free plan, if you've used your 25 recordings, Hippius tells you as soon as you press Record. Delete an older recording to free a slot, or upgrade. See [Free and paid plans](/use/captures/plans).

### There's no Screenshot or Record button in the console

The buttons are on the **Drive** and **Captures** pages, on a computer. They're hidden on phones and when the browser window is very narrow. Make the window wider, or use the desktop app.

### Record an area is greyed out

Recording an area in the console needs Chrome or Edge. In Safari and Firefox, record the window or the entire screen instead. Screenshots of an area work in every browser.

### My camera isn't in the recording

In the console, Safari and Firefox only record the camera with **Entire screen**, and Firefox doesn't offer the camera at all. Use Chrome or Edge, or the desktop app, to have your camera in window and area recordings. Also check that your browser or computer is allowed to use the camera.

### My keyboard shortcut doesn't work

In the desktop app, check the keys in [Settings, Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording). If another app already uses them, click **Change** and pick new ones, or click **Reset** to put the original keys back. Hippius won't take keys your system uses for its own screenshots.

On Linux with Wayland, apps can't listen for keys on their own, so the shortcut only works once you've added it in your desktop's keyboard settings. Settings shows you the command to paste.

In the console, the stop shortcut (<BgStyledText>Option Shift X</BgStyledText> on a Mac, <BgStyledText>Alt Shift X</BgStyledText> elsewhere) only works while the console tab or its floating controls window is in front.

### The recording controls showed up in my video

That depends on where you recorded. In the desktop app on a Mac and Windows they're never filmed, but on Linux they always are, because Linux doesn't let an app hide a window from a recording. In the console, recording the entire screen films the floating controls window; record a window or an area instead to keep them out. See [Keep the controls out of the video](/use/captures/recording#keep-the-controls-out-of-the-video).

### Nothing gets captured on a Mac

macOS needs your permission before any app can see the screen. If Hippius asks, follow its steps to allow it in System Settings, then relaunch Hippius. macOS only applies the change after a restart.

Screen recording also needs macOS 13 or later, and recording your microphone needs macOS 15 or later. On an older Mac, Record is shown greyed out with the reason.

### I can't find my captures folder

In the desktop app, open [Settings, Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording): **Capture folder** says where your captures are saved, and **Show in Finder** (**Show in folder** on Windows and Linux) opens it. Unless you chose another place, it's the `hippius-captures` folder in your Documents folder. If you picked a folder inside another drive, the Captures page tells you where it is and opens it.

If Hippius says the captures folder was moved or deleted, it asks you to choose it again rather than making a new one, so nothing already in your drive is removed.

### The link shows no picture in a chat

A chat preview needs **Show a preview in chats** to be on when the link is made, and a link with a password never gets one. Some chat apps also keep the first preview they saw for a link, so a link pasted before the preview was ready may stay plain in that chat. See [chat previews](/use/captures/share-links#a-preview-when-you-paste-the-link-in-a-chat).

### Insights ask me to unlock before showing comments

Comments are end-to-end encrypted with the link's key. The console only asks when it can't find that key anywhere in your browser: not in this tab, not in your Drive if it's unlocked, and not in another console tab you have open. Enter your [unlock password](/use/console/unlock-password) and the comments appear. If your Drive is unlocked in another console tab, leave that tab open and the comments open without asking. For a link with a password, comments can only be read on the link's own page. See [Insights, comments and reactions](/use/captures/insights#privacy).

### I don't see Insights in the desktop app

Insights, comments and reactions arrive in the desktop app in version 0.6.16. Until it reaches you, switch to the [beta channel](/use/desktop/beta-channel), or open the link's Insights in the console.

### There's no Record on Windows

Screen recording on Windows arrived in Hippius 0.6.9. If you don't see Record, update the app: it usually updates itself, or you can download the latest version from the [Hippius download page](https://hippius.com/desktop-app).

The Windows installer isn't code signed yet, so Windows may show a SmartScreen warning when you install it. Choose **More info**, then **Run anyway**.

## FAQ

**Can I use my own domain for capture links?**

Not yet. It's something we'd like to offer.

**Can I get a shorter link?**

Not yet. A Hippius link is long because it carries the key that decrypts your capture, after the `#`. That key is what keeps the capture private from everyone without the link, including Hippius.

**Can I take a screenshot or a recording on my phone?**

No. Captures are taken on a computer, in the desktop app or the console. Everything you capture there shows up in **Captures** when you open the console on your phone, and the links work on any device.

**Is there a browser extension?**

Yes, for Chrome and Edge. It takes screenshots and records your screen from your browser's toolbar, without the browser differences described in [Record your screen](/use/captures/recording#browser-differences). See [Pick your app](/use/captures#where-you-can-use-it).

**Can people comment on my captures?**

Yes, when comments are on for the link. Anyone with the link can read them, and posting needs a Hippius account. Comments are end-to-end encrypted. You can delete a comment or block its author from that link in Insights. See [Insights, comments and reactions](/use/captures/insights).

**Who can see my captures?**

Only you, until you share them. Every capture gets a link that anyone holding it can open, so share it with care, and turn it off in Shared Links when it's done its job. See [Share links for captures](/use/captures/share-links).

**Can I stop links being made automatically?**

In the desktop app, yes: turn off **Copy a share link after capture** in the capture bar's Options or in Settings. In the console every capture gets a link; turn off the ones you don't need in Shared Links.

**If I delete a capture, does its link stop working?**

No. A link is its own encrypted copy of the file, so it keeps working after the file is deleted. Turn the link off in Shared Links. See [Deleting a capture doesn't end its link](/use/captures/share-links#deleting-a-capture-doesnt-end-its-link).

**Do captures use my storage?**

Yes, like any other file. See [Free and paid plans](/use/captures/plans#storage).

**Can a script or an AI agent take captures?**

There is no capture API: screenshots and recordings are taken by a person in the desktop app or the console. A script can do the next best thing with the [Hippius Drive SDK](https://github.com/thenervelab/hippius-drive-sdk): upload a picture or a video it already has, and create a share link for it, for example with `hippius-drive share put`. Those files carry no watermark. Videos uploaded into your captures drive count toward the 25 free recordings like any other; uploads anywhere else don't.

## Still stuck?

Get in touch through [Help &amp; Support](/use/help-support). Tell us whether you were in the desktop app (and which version) or the console (and which browser), and what the card said.
