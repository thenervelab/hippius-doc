---
id: browser-extension
title: Browser Extension
sidebar_label: Browser Extension
slug: /use/captures/browser-extension
description: Record your screen and take screenshots from your browser's toolbar with the Hippius extension for Chrome and Edge. Captures are encrypted in your browser, saved to your Hippius Captures drive, and come with a share link ready to paste.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

The Hippius browser extension puts screenshots and screen recording one click away, on any website, without installing an app. It works the way the desktop app and the console do: a capture is encrypted in your browser, saved to your [Hippius Captures](/use/captures#where-your-captures-go) drive, and its share link is copied for you, ready to paste into a chat, an email or a ticket.

It's a good fit if you spend your day in the browser, or you're on a computer where you can't install the desktop app.

## Install it

The extension is made for **Chrome** and **Microsoft Edge** on a computer, version 116 or later. Both install it from the Chrome Web Store.

<Ordered>
  <li>Open <a href="https://chromewebstore.google.com/detail/hippius/ndpfdlfaechmhnffnmkbfgddhneehgld">Hippius on the Chrome Web Store</a> and click <BgStyledText>Add to Chrome</BgStyledText>. In Edge, allow extensions from other stores first when Edge asks.</li>
  <li>Confirm with <BgStyledText>Add extension</BgStyledText>.</li>
  <li>A <strong>Welcome to Hippius</strong> tab opens and walks you through the rest.</li>
</Ordered>

Other browsers built on Chrome that install from the Chrome Web Store, such as Brave and Arc, can add it too. We build and test it on Chrome and Edge, so if something behaves differently elsewhere, those two are the safe choice.

The welcome tab has four short steps: pin Hippius, connect your account, allow your camera and microphone, and take your first capture. Each one ticks itself as soon as it's done, and you can skip any of them. To see the tab again later, open the help button at the top of the popup and choose <BgStyledText>Getting started</BgStyledText>.

<Screenshot src="/img/extension/welcome.png" alt="The Welcome to Hippius tab with its four setup steps, three of them done" dark raw />

## Pin it to your toolbar

New extensions hide behind the puzzle piece at the top right of your browser. Pinned, Hippius sits in your toolbar on every page, which is where you'll start most captures and where you stop a recording.

<Ordered>
  <li>Click the puzzle piece (<strong>Extensions</strong>) at the top right of your browser.</li>
  <li>Click the pin next to <strong>Hippius</strong>.</li>
</Ordered>

Until you do, the popup shows a small reminder at the top. While you record, the Hippius button shows <strong>REC</strong> (or <strong>II</strong> while paused), so you can always see that a recording is running.

## Connect your Hippius account

Captures are saved to your Hippius Drive, so the extension needs to be connected to your account once.

<Ordered>
  <li>Click the Hippius button in your toolbar, then <BgStyledText>Connect account</BgStyledText>.</li>
  <li>The console opens in a new tab. Sign in if you need to.</li>
  <li>Press <BgStyledText>Connect</BgStyledText>. If the console asks for your password, enter it: the console needs it to hand over your Captures drive's key.</li>
  <li>The page says <strong>The extension is connected</strong>. You can close the tab.</li>
</Ordered>

<Screenshot src="/img/extension/popup-signed-out.png" alt="The Hippius popup before connecting, with Connect account and Capture without saving" dark raw />

The extension gets only what it needs: the key to your Hippius Captures drive, a key for the share links it makes (so you can see who viewed and commented on them), and a session to upload with. Your password and your recovery phrase stay in the console, and files you haven't shared by link stay out of its reach.

### Staying connected

The connection lives in your browser's memory, not on disk. It lasts until you close the browser, disconnect in the extension, or sign out of the console. After that, the popup says **Your session ended** and offers <BgStyledText>Connect account</BgStyledText> again, which takes a few seconds. Anything you capture in the meantime waits in your browser until you're back.

To use a different Hippius account, disconnect first, with the button next to your account at the bottom of the popup (or in Settings). The extension never switches accounts on its own.

### Capturing before you connect

Need a screenshot right now? <BgStyledText>Capture without saving</BgStyledText> on the signed-out popup takes it anyway. Those captures stay on your computer, unencrypted, until you connect. As soon as you do, they're encrypted and saved to your Drive like any other capture.

## Record your screen

Click <BgStyledText>Record</BgStyledText> in the popup, or press <BgStyledText>Alt Shift M</BgStyledText> (<BgStyledText>Option Shift M</BgStyledText> on a Mac). The capture bar opens at the bottom of the page, the same bar as in the desktop app. Choose what to record:

<Unordered>
  <li><strong>This tab</strong>: the page you're on, and nothing else.</li>
  <li><strong>Area</strong>: part of your screen, including other windows and apps.</li>
  <li><strong>Screen</strong>: an entire screen, one window or another tab, picked in your browser's sharing dialog.</li>
  <li><strong>Your camera alone</strong>: turn off the first row (This tab, Area or Screen) and only your camera is recorded.</li>
</Unordered>

<Screenshot src="/img/extension/capture-bar.png" alt="The capture bar on a web page, set to record this tab with the camera and microphone on, and the camera bubble in the corner" dark raw />

Under the mode are your **camera** and **microphone**, each with a switch and a menu to pick the device. The microphone shows a live level, so you can see it hears you. With the camera on, a round **camera bubble** appears: drag it where you want it, and point at it to make it small, large or full size.

<BgStyledText>Options</BgStyledText> on the bar has the **countdown** before recording starts (none, 3 or 5 seconds) and what happens afterwards: whether to copy the link, and whether to open it in a new tab.

### Start the recording

Press <BgStyledText>Record</BgStyledText> on the bar (or click the page, or press <BgStyledText>Return</BgStyledText>). Hippius opens a tab of its own next to yours, with one button:

<Unordered>
  <li><BgStyledText>Start recording</BgStyledText> for this tab or your camera alone. Press it and you're back on your tab, where the countdown starts.</li>
  <li><BgStyledText>Choose what to share</BgStyledText> for a screen, a window or an area. Press it, pick what to share in your browser's dialog (turn on <strong>Also share tab audio</strong> to record a tab's sound), and click <BgStyledText>Share</BgStyledText>. You're taken straight back to your tab, where the countdown starts.</li>
</Unordered>

<Screenshot src="/img/extension/start-tab.png" alt="Hippius's tab before a screen recording: four steps, a preview of the camera, and Choose what to share" dark raw />

That extra click is what lets your camera float above other windows: browsers only allow a floating window to be opened from a click in the extension's own page.

<Screenshot src="/img/extension/sharing-tab.png" alt="Hippius's tab while the browser's sharing dialog is open, saying Click Share to return to your original tab" dark raw />

Hippius's tab stays open, pinned, while you record. It holds the recording, so leave it open until you stop.

### Record an area

With **Area**, after you share your screen Hippius shows a picture of it so you can draw the area. Drag the area out, move it, and nudge it with the arrow keys. Press <BgStyledText>Return</BgStyledText> to record or <BgStyledText>Esc</BgStyledText> to cancel. Your last area is drawn again next time.

Everything inside the area is recorded, other windows and apps too, so you can switch apps and keep recording that part of the screen.

<Screenshot src="/img/extension/area-on-screen.png" alt="An area drawn on a picture of the screen, with the camera placed inside it" dark raw />

With the camera on, place it inside the area on that picture. It's drawn into the video exactly there, so it's always in the recording however your windows are arranged.

### Pause, resume and stop

A short countdown runs first (click it or press <BgStyledText>Return</BgStyledText> to start straight away). Then the recording controls appear: the time, mute and the microphone menu, the camera (hide it, resize it, or pick another), <BgStyledText>Pause</BgStyledText>, <BgStyledText>Restart</BgStyledText>, <BgStyledText>Stop</BgStyledText> and <BgStyledText>Discard</BgStyledText>.

<Screenshot src="/img/extension/recording-controls.png" alt="The recording controls on the page, with the time, microphone, camera, pause, restart, stop and discard, next to the camera bubble" dark raw />

<Unordered>
  <li><strong>Pause and resume</strong> as often as you like, with the controls or <BgStyledText>Alt Shift K</BgStyledText>. Paused time is left out of the video.</li>
  <li><strong>Restart and Discard</strong> ask first once you've recorded more than 5 seconds, so a misclick never costs you a take.</li>
  <li><strong>Stop</strong> saves the recording. You can stop from the controls, by pressing <BgStyledText>Alt Shift M</BgStyledText> again, or from the <strong>Hippius button</strong> in your toolbar: click it, then <BgStyledText>Stop recording</BgStyledText>.</li>
</Unordered>

<Screenshot src="/img/extension/popup-recording.png" alt="The Hippius popup during a recording, with the time, Pause, Restart, Stop recording and Discard" dark raw />

In Chrome and Edge, your camera floats in a small window above every tab and app while you record a screen, a window or an area, so it stays with you when you switch windows. Move it by dragging and resize it from its edges. Pointing at it shows buttons to mute and to hide the camera.

:::tip Keeping the controls out of your video
A tab recording never films the controls. An area recording with the camera off floats nothing, so the video has only the area: stop from the Hippius button or the shortcut. Turn on **Float the recording controls** in Hippius's tab if you want them anyway, and keep them outside the area. When you record an entire screen, the small folded controls are part of the picture. To keep them out, share a window or a tab instead, or record with the desktop app.
:::

## Take a screenshot

Click the arrow on <BgStyledText>Screenshot</BgStyledText> in the popup and pick what to capture:

<Unordered>
  <li><strong>Visible page</strong>: everything you can see in the tab. Shortcut: <BgStyledText>Alt Shift S</BgStyledText>.</li>
  <li><strong>Select area</strong>: drag out part of the page. With the shortcut, <BgStyledText>Alt Shift D</BgStyledText>, it's one step: drag, let go, and it's taken. <BgStyledText>Esc</BgStyledText> cancels.</li>
  <li><strong>Screen or window</strong>: any screen or window, other apps included. Hippius opens its own tab with your browser's sharing dialog; click <BgStyledText>Share</BgStyledText> and you're back on your tab with the screenshot taken.</li>
</Unordered>

<Screenshot src="/img/extension/popup-screenshot-menu.png" alt="The Screenshot menu in the popup: Visible page, Select area, and Screen or window, with their shortcuts" dark raw />

The capture bar has the same three choices and a **timer** (none, 5 or 10 seconds), so you can open a menu or hover over something before the picture is taken. Screenshots are unlimited on every plan.

## Your share link

When you stop a recording or take a screenshot, a small card opens in the corner of your screen. It encrypts the capture, saves it to your Hippius Captures drive, and copies its share link to your clipboard. Paste it wherever you need it.

<Screenshot src="/img/extension/capture-card.png" alt="The capture card after a screenshot: Uploaded, Public link copied, with Copy link, Open and Edit" dark raw />

The card has <BgStyledText>Copy link</BgStyledText> and <BgStyledText>Open</BgStyledText>, plus <BgStyledText>Edit</BgStyledText> for a screenshot, which opens it in the console's [editor](/use/captures/edit). Its menu has Download and Discard. After a recording, the link also opens in a new tab so you can check it; you can change that, for recordings and for screenshots, in Settings. Once everything is saved, the card closes by itself after a few seconds, and pointing at it holds it open.

What to know about capture links:

<Unordered>
  <li><strong>They're public.</strong> Anyone with the link can view the capture in their browser, without a Hippius account. Treat the link like the capture itself.</li>
  <li><strong>They don't expire</strong> until you turn them off, in the console under [Shared Links](/use/console/shared-links).</li>
  <li><strong>On a paid plan, they come with insights, comments and reactions</strong>, all switched on, so you can see who watched and read what they said. On the Free plan these start switched off.</li>
</Unordered>

See [Share links for captures](/use/captures/share-links) for how capture links work, and how to make one with an expiry or a password instead.

## Your captures in the popup

Clicking the Hippius button opens the popup. At the top are the three things you'll do most: <BgStyledText>Record</BgStyledText>, <BgStyledText>Screenshot</BgStyledText> and <BgStyledText>Upload</BgStyledText> (which sends files from your computer to your Captures drive the same way, encrypted, with a link copied). Underneath are your captures, and your account is at the bottom, with buttons to open Captures and your Drive in the console.

<Screenshot src="/img/extension/popup-captures.png" alt="The connected popup with Record, Screenshot and Upload, and a list of captures showing views, reactions and comments" dark raw />

The list shows everything in your Hippius Captures drive, newest first, whether you captured it here, in the desktop app or in the console. Captures have their real file names, such as <code>Recording 2026-10-22 at 15.46.24.mp4</code>, grouped by day. Filter by recordings or screenshots, or search by name; searching by time works too, so "recording at 3:46" finds that recording.

A capture with a share link shows its **views, reactions and comments** at the end of its row. The views turn blue when there's something new you haven't looked at yet.

Click a capture to open it in the console. Point at a row for <BgStyledText>Copy link</BgStyledText>, and use the three dots for the rest:

<Unordered>
  <li><strong>View in Hippius</strong> opens it in the console.</li>
  <li><strong>View insights</strong> opens its link's Insights in the console: who watched, for how long, and their comments and reactions. It shows for any capture with a live link, wherever the link was made. When the extension has the link's key, it hands it to the console with the page, so the comments open without another unlock. On the Free plan, Insights tells you what upgrading adds.</li>
  <li><strong>Edit</strong> opens a screenshot in the console's editor.</li>
  <li><strong>Download</strong> saves a copy to your computer.</li>
  <li><strong>Delete from Drive</strong> deletes the file (see below).</li>
</Unordered>

<Screenshot src="/img/extension/popup-row-menu.png" alt="A capture's menu in the popup, with View in Hippius, View insights, Copy link, Download and Delete from Drive" dark raw />

### Copy a link again

<BgStyledText>Copy link</BgStyledText> works for every capture. If this browser made the link, it copies the same link again for as long as it's on. A capture with no link gets a new one.

A link made somewhere else (in the console, the desktop app or another browser) can't be copied from here, because its key stays where it was made. Rather than quietly adding a second link, the row tells you and offers <BgStyledText>Create a new link</BgStyledText> (the old one keeps working) or <BgStyledText>Open Shared Links</BgStyledText> in the console, where you can copy the existing one. Files over 300 MB are linked and downloaded from the console instead.

### Delete a capture and its links

A share link keeps its own copy of the file, so on its own it would keep working after the file is deleted. To avoid that, <BgStyledText>Delete from Drive</BgStyledText> first turns off the links this browser made for the capture, then deletes it. The confirmation says so.

Other live links for a file with the same name (made in the console, the desktop app or another browser) are left on, because they might belong to a different file. The popup tells you how many are still on and offers <BgStyledText>Also turn off these links</BgStyledText>, which asks once more before turning off exactly those links.

## Plans: Free, paid and no plan

The extension follows the same plan rules as the desktop app and the console. Below the buttons, the popup shows which plan you're on when it matters.

<Unordered>
  <li><strong>Free plan</strong>: captures carry a small Hippius mark, recordings stop at <strong>5 minutes</strong> (the timer counts down the last minute, and paused time doesn't count), and you can keep <strong>25 recordings</strong>. The popup shows how many you've used. Screenshots never count.</li>
  <li><strong>Paid plans</strong> lift those limits, and your links get insights, comments and reactions.</li>
  <li><strong>No plan</strong>: accounts that sign in with an access key don't include free storage, so there's nowhere to save captures. The popup says <strong>No plan</strong> with a link to the plans, and Record doesn't start. A screenshot or upload is kept in your browser with Upgrade and Retry, and once you pick a plan, Retry saves it.</li>
</Unordered>

<Screenshot src="/img/extension/popup-free-plan.png" alt="The popup on the Free plan: 3 of 25 recordings used, with See plans" dark raw />

Every recording in your Hippius Captures drive counts toward the 25, wherever you made it, whatever the drive is called. Once you've used all 25, <BgStyledText>Record</BgStyledText> tells you before anything is recorded, so you never lose a take. Delete an older recording to free a slot, or upgrade.

<Screenshot src="/img/extension/free-plan-limit.png" alt="The message shown when all 25 free recordings are used, with Not now and Upgrade" dark raw />

<Screenshot src="/img/extension/popup-no-plan.png" alt="The popup for an access-key account with no plan, saying there's nowhere to save captures, with See plans" dark raw />

The details are on [Free and Paid Plans](/use/captures/plans).

## If a capture can't be saved

Nothing is lost when a capture can't be saved straight away, for example because you're offline. It stays in your browser, encrypted, and sits at the top of the popup's list under **Not saved yet**, with the reason and what to do:

<Unordered>
  <li><BgStyledText>Retry</BgStyledText> when you were offline or the Drive didn't answer. Hippius also tries again by itself when your connection comes back and whenever you open the popup. If the file already reached your Drive and only the link is missing, Retry just makes the link.</li>
  <li><BgStyledText>Connect</BgStyledText> when your session has ended.</li>
  <li><BgStyledText>Upgrade</BgStyledText> when your Drive is full, or when your account has no plan.</li>
</Unordered>

<Screenshot src="/img/extension/popup-not-saved.png" alt="The popup with a screenshot under Not saved yet, with the reason and a Retry button" dark raw />

A recording is written to your computer as you record, a second at a time, so even if your browser closes in the middle of one, what you recorded until then is kept.

## Keyboard shortcuts

The shortcuts are the same on every computer. On a Mac, use Option instead of Alt.

| Shortcut | On a Mac | What it does |
|---|---|---|
| <BgStyledText>Alt Shift M</BgStyledText> | <BgStyledText>Option Shift M</BgStyledText> | Start recording with your last setup; press again to stop. The first time, it opens the capture bar. |
| <BgStyledText>Alt Shift K</BgStyledText> | <BgStyledText>Option Shift K</BgStyledText> | Pause or resume the recording |
| <BgStyledText>Alt Shift S</BgStyledText> | <BgStyledText>Option Shift S</BgStyledText> | Screenshot of the visible page |
| <BgStyledText>Alt Shift D</BgStyledText> | <BgStyledText>Option Shift D</BgStyledText> | Screenshot of an area you drag out |

The keyboard button at the top of the popup shows the keys each one has right now.

<Screenshot src="/img/extension/popup-shortcuts.png" alt="The Keyboard shortcuts panel in the popup, listing all four shortcuts and Change shortcuts" dark raw />

:::note Used an earlier version?
Earlier versions used Alt Shift R, P and A. Chrome keeps those keys for itself on Windows and Linux, so they never reached Hippius there. When the extension updates, it moves to the keys above, unless you had set your own, which stay as they are.
:::

### Change a shortcut

Your browser decides which keys an extension gets. It hands them out when the extension is installed, and skips any key that another extension already uses, so a shortcut can arrive with no keys. Wherever the shortcuts are listed in Hippius, one without keys has a <BgStyledText>Set</BgStyledText> button.

To change any of them:

<Ordered>
  <li>Open <BgStyledText>Change shortcuts</BgStyledText> from the keyboard panel in the popup, or type <code>chrome://extensions/shortcuts</code> into the address bar (<code>edge://extensions/shortcuts</code> in Edge).</li>
  <li>Find <strong>Hippius</strong> and click the pencil next to the shortcut.</li>
  <li>Press the keys you want. They need Ctrl or Alt (Command or Option on a Mac).</li>
</Ordered>

<Screenshot src="/img/extension/chrome-shortcuts.png" alt="The browser's Keyboard shortcuts page with Hippius's four shortcuts and their keys" dark raw />

The same page lets you add a key to **Activate the extension**, which opens the Hippius popup, and choose whether a shortcut works only in the browser or everywhere on your computer.

## Settings

The gear at the top of the popup opens Settings. They're the same settings as <BgStyledText>Options</BgStyledText> on the capture bar, and they're kept in this browser:

<Unordered>
  <li><strong>After capture</strong>: copy a share link, open the link after recordings (on unless you turn it off), and open the link after screenshots (off unless you turn it on).</li>
  <li><strong>Screenshots</strong>: the timer.</li>
  <li><strong>Recordings</strong>: the countdown, and whether to use the microphone and the camera.</li>
  <li><strong>Keyboard shortcuts</strong>, with Set for any that have no keys.</li>
  <li><strong>Account</strong>, with <BgStyledText>Disconnect</BgStyledText>.</li>
</Unordered>

<Screenshot src="/img/extension/popup-settings.png" alt="The extension's Settings: after capture, screenshots, recordings and keyboard shortcuts" dark raw />

Some pages can't show the capture bar, such as your browser's own pages. There, the popup lets you set up a recording right inside it instead.

<Screenshot src="/img/extension/popup-record-setup.png" alt="Recording set up from the popup: This tab or Screen or window, microphone, camera bubble, and Start recording" dark raw />

## Privacy and permissions

Captures from the extension get the same protection as the rest of your Drive:

<Unordered>
  <li><strong>Encrypted in your browser.</strong> A capture is encrypted with your Captures drive's key before it's stored or uploaded, so it never sits on your computer, or with Hippius, in the clear. The one exception is a capture taken before you connect, which waits on your computer unencrypted until you do.</li>
  <li><strong>The link carries its own key.</strong> The key that opens a shared capture sits after the <code>#</code> in its link. Browsers never send that part to a server, so it never reaches Hippius.</li>
  <li><strong>Your camera stays yours.</strong> The camera and microphone are opened only by Hippius's own pages. The websites you record never get access to them, and the camera picture doesn't leave your computer except as part of your recording.</li>
  <li><strong>What the server can see.</strong> A capture's file name, size and type, never what's in it.</li>
  <li><strong>No tracking.</strong> The extension talks only to Hippius, and only to save and share your captures. It has no analytics, ads or trackers.</li>
</Unordered>

When you install it, your browser lists what the extension may do. Here's why it asks:

<Unordered>
  <li><strong>The tab you're on</strong>, only when you click the Hippius button or press a shortcut, to show the capture bar and take a screenshot of that page. It doesn't read other sites or run on pages by itself.</li>
  <li><strong>Recording a tab and your screen</strong>, to record what you choose. A screen or window is always picked by you, in your browser's own sharing dialog.</li>
  <li><strong>Storage</strong>, to remember your settings, to keep a recording safe while it records and until it's saved, and to hold your connection while the browser is open.</li>
  <li><strong>Downloads</strong>, to save a copy when you press Download.</li>
  <li><strong>Hippius's servers</strong>, <code>api.hippius.com</code> and the Drive at <code>arion.hippius.com</code> (and its EU address, <code>eu-central-1-arion.hippius.com</code>), where your captures are saved and shared.</li>
</Unordered>

Your camera and microphone aren't in that list: you allow them once, for Hippius, on its own page, and choose for each recording whether to use them.

## Troubleshooting

**Chrome turned Hippius off after an update.** When an update needs a new permission, your browser keeps the extension off until you approve it. Open the puzzle piece menu or <code>chrome://extensions</code>, find Hippius, and accept the new permission to turn it back on. For example, switching on insights, comments and reactions for your links needs one more Hippius Drive address, <code>eu-central-1-arion.hippius.com</code>.

**The Hippius button shows a "!".** A shortcut couldn't run. Point at the button to see why, or open the popup, which says it too. The usual reasons are a page no extension may capture (your browser's own pages and the extension store), or the Free plan's 25 recordings being used up.

**A shortcut does nothing.** It may have no keys, or another extension may use them. Open the keyboard panel in the popup and use <BgStyledText>Set</BgStyledText>, or see [Change a shortcut](#change-a-shortcut).

**The camera or microphone shows Allow again.** Your browser no longer lets Hippius use them, for example because they were allowed only once, or taken back in the browser's settings. Click <BgStyledText>Allow</BgStyledText> and allow them for Hippius again.

**The sharing dialog lists no screens or windows (Mac).** macOS needs to allow your browser to record the screen. Open **System Settings**, then **Privacy & Security**, then **Screen & System Audio Recording** (**Screen Recording** on older versions of macOS), turn your browser on, and restart it.

**My camera disappeared from a tab recording.** A tab recording films the camera bubble drawn in that tab. If the tab goes to another website, your browser stops Hippius from drawing there until you click Hippius on the new page. On that tab, open the popup and use <BgStyledText>Put my camera back</BgStyledText>.

**Record says it couldn't count your recordings.** On the Free plan, Hippius checks how many recordings you have before starting. When it can't (you're offline, or the Drive didn't answer), it doesn't start. Check your connection and press <BgStyledText>Retry</BgStyledText>.

**The popup says No plan.** Your account signs in with an access key and has no Drive plan, so there's nowhere to save captures. Choose a plan with <BgStyledText>See plans</BgStyledText>; anything kept in the meantime saves with Retry. See [Capture says my account doesn't include free storage](/use/captures/troubleshooting#capture-says-my-account-doesnt-include-free-storage).

**Your session ended.** The popup says so and offers <BgStyledText>Connect account</BgStyledText>. To switch to another Hippius account, choose <BgStyledText>Use a different account</BgStyledText> or disconnect first.

**Something else isn't working.** Open the help button at the top of the popup and choose <BgStyledText>Copy diagnostics</BgStyledText>. It copies a short report of what Hippius did recently, with no account details, links or keys, which you can paste when you contact support.
