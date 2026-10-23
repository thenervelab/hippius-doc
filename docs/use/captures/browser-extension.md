---
id: browser-extension
title: Browser Extension
sidebar_label: Browser Extension
slug: /use/captures/browser-extension
description: Record your screen and take screenshots from your browser's toolbar with the Hippius extension for Chrome, Edge, Brave and Arc. Captures are encrypted in your browser, saved to your Hippius Captures drive, and come with a share link.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

The Hippius browser extension puts screenshots and screen recording one click away, on any website, without installing an app. It works the way the desktop app and the console do: a capture is encrypted in your browser, saved to your [Hippius Captures](/use/captures#where-your-captures-go) drive, and its share link is copied for you.

It's a good fit if you spend your day in the browser, or you're on a computer where you can't install the desktop app.

## Install it

The extension works in **Chrome**, **Edge**, **Brave** and **Arc**, on a computer. All four install it from the Chrome Web Store.

<Ordered>
  <li>Open <a href="https://chromewebstore.google.com/detail/ndpfdlfaechmhnffnmkbfgddhneehgld">Hippius on the Chrome Web Store</a> and click <BgStyledText>Add to Chrome</BgStyledText> (the button names your browser).</li>
  <li>In Edge, allow extensions from other stores when Edge asks.</li>
  <li>A <strong>Welcome to Hippius</strong> tab opens and walks you through the rest.</li>
</Ordered>

The welcome tab has four short steps, and each one ticks itself as soon as it's done. You can skip any of them and come back later from the help button in the popup (<BgStyledText>Getting started</BgStyledText>).

<Unordered>
  <li><strong>Pin Hippius to your toolbar.</strong> Click the puzzle piece at the top right of your browser, then the pin next to Hippius. Pinned, it stays one click away on every page.</li>
  <li><strong>Connect your Hippius account</strong>, so captures are saved to your Drive (see below).</li>
  <li><strong>Allow your camera and microphone.</strong> You allow them once, for Hippius, and choose for each recording whether to use them. Websites are never asked.</li>
  <li><strong>Take your first capture.</strong></li>
</Unordered>

<Screenshot src="/img/extension/welcome.png" alt="The Welcome to Hippius tab with its four setup steps" dark raw />

## Connect your account

Click the Hippius button in your toolbar, then <BgStyledText>Connect account</BgStyledText>. The console opens in a new tab. Sign in if you need to, press <BgStyledText>Connect</BgStyledText>, and you're done.

<Screenshot src="/img/extension/popup-signed-out.png" alt="The Hippius popup before connecting, with the Connect account button" dark raw />

What the extension gets is limited to what it needs: the key to your Hippius Captures drive and a session to upload with. Your password and your recovery phrase stay in the console, and the extension can't open your other drives. The connection lasts until you close your browser or disconnect.

Not connected yet and need a screenshot right now? <BgStyledText>Capture without saving</BgStyledText> takes it anyway. Those captures stay on your computer, unencrypted, until you connect. As soon as you do, they're encrypted and uploaded like any other capture.

## The popup

Clicking the Hippius button opens the popup. At the top are the three things you'll do most: <BgStyledText>Record</BgStyledText>, <BgStyledText>Screenshot</BgStyledText> and <BgStyledText>Upload</BgStyledText>. Underneath are your captures, and your account is at the bottom, with buttons to open Captures and your Drive in the console.

<Screenshot src="/img/extension/popup-captures.png" alt="The connected popup with Record, Screenshot and Upload, and a list of captures showing views, reactions and comments" dark raw />

The list shows everything in your Hippius Captures drive, newest first, whether you captured it here, in the desktop app or in the console:

<Unordered>
  <li><strong>Real file names</strong>, the same ones the console and the desktop app show, such as <code>Recording 2026-10-22 at 15.46.24.mp4</code>. When a name is too long for the row, the middle gives way and the time stays in view.</li>
  <li><strong>Grouped by day</strong> (Today, Yesterday, then the weekday or the date), with a picture of each capture, its size and how long ago it was taken.</li>
  <li><strong>Filters</strong> for All, Recordings and Screenshots, and a <strong>search</strong> by name. Searching by time works too, so "recording at 3:46" finds that recording.</li>
  <li><strong>Views, reactions and comments</strong> at the end of a row, for a capture with a share link. The views turn blue when there's something you haven't looked at in Insights yet.</li>
</Unordered>

Click a capture to open it in the console. Point at a row for <BgStyledText>Copy link</BgStyledText> (and <BgStyledText>Edit</BgStyledText> for a screenshot), and use the three dots for the rest:

<Unordered>
  <li><strong>View in Hippius</strong> opens it in the console.</li>
  <li><strong>View insights</strong> opens its link's Insights in the console: who watched, for how long, and their comments and reactions. It shows for any capture that has a live link, wherever the link was made.</li>
  <li><strong>Edit</strong> opens a screenshot in the console's editor.</li>
  <li><strong>Download</strong> saves a copy to your computer.</li>
  <li><strong>Delete from Drive</strong> deletes the file (see <a href="#deleting-a-capture-and-its-links">Deleting a capture</a>).</li>
</Unordered>

<Screenshot src="/img/extension/popup-row-menu.png" alt="A capture's menu in the popup, with View in Hippius, View insights, Copy link, Download and Delete from Drive" dark raw />

### Copying a link again

<BgStyledText>Copy link</BgStyledText> works for every capture. If the extension made the link, it copies the same link again for as long as it's on. A capture with no link gets a new one.

A link made somewhere else (in the console, the desktop app or another browser) can't be copied from here, because its key never left the place it was made. Rather than quietly adding a second link, the row tells you and offers to <BgStyledText>Make a new link</BgStyledText> (the old one keeps working) or to open Shared Links in the console, where you can copy the existing one. Files over 300 MB are linked from the console instead.

### Deleting a capture and its links

A share link keeps its own copy of the file, so it would keep working after the file is deleted. To avoid that, <BgStyledText>Delete from Drive</BgStyledText> first turns off the links this browser made for the capture, then deletes it. The confirmation says so.

If there are other live links for a file with the same name (made in the console, the desktop app or another browser), they're left on, because they might belong to a different file. The popup tells you how many are still on and offers <BgStyledText>Also turn off these links</BgStyledText>, which asks once more before turning off exactly those links.

## Record your screen

Click <BgStyledText>Record</BgStyledText> in the popup, or press <BgStyledText>Alt Shift R</BgStyledText> (<BgStyledText>Option Shift R</BgStyledText> on a Mac). The capture bar opens at the bottom of the page, the same bar as in the desktop app. Choose what to record:

<Unordered>
  <li><strong>This tab</strong>: the page you're on, and nothing else.</li>
  <li><strong>Area</strong>: part of your screen, including other windows and apps (Chrome and Edge).</li>
  <li><strong>Screen</strong>: an entire screen, one window or another tab, picked in your browser's sharing dialog.</li>
  <li><strong>Your camera alone</strong>: turn off the first row (This tab, Area or Screen) and only your camera is recorded.</li>
</Unordered>

<Screenshot src="/img/extension/capture-bar.png" alt="The capture bar on a web page, set to record this tab with the camera and microphone on, and the camera bubble in the corner" dark raw />

Under the mode are your **camera** and **microphone**, each with a switch and a menu to pick the device. The microphone shows a live level, so you can see it hears you. With the camera on, a round **camera bubble** appears: drag it where you want it and point at it to make it small, large or full size.

<BgStyledText>Options</BgStyledText> on the bar has the **countdown** before recording starts (none, 3 or 5 seconds) and what happens afterwards: whether to copy the link, and whether to open it in a new tab.

### Starting the recording

Press <BgStyledText>Record</BgStyledText> on the bar (or click the page, or press <BgStyledText>Return</BgStyledText>). Hippius opens a tab of its own next to yours with one button:

<Unordered>
  <li><BgStyledText>Start recording</BgStyledText> for this tab or your camera alone. Press it and you're back on your tab, where the countdown starts.</li>
  <li><BgStyledText>Choose what to share</BgStyledText> for a screen, a window or an area. Press it, pick what to share in your browser's dialog (turn on <strong>Also share tab audio</strong> to record a tab's sound), and click <BgStyledText>Share</BgStyledText>. You're taken straight back to your tab, where the countdown starts.</li>
</Unordered>

That extra click is what lets your camera float above other windows: your browser only allows a floating window to be opened from a click in Hippius's own page.

<Screenshot src="/img/extension/sharing-tab.png" alt="Hippius's tab under the browser's sharing dialog, saying Click Share to return to your original tab" raw />

Hippius's tab stays open, pinned, while you record. It holds the recording, so leave it open until you stop.

### Recording an area

With **Area**, after you share your screen Hippius shows a picture of it so you can draw the area. Drag the area out, move it, and nudge it with the arrow keys. Press <BgStyledText>Return</BgStyledText> to record or <BgStyledText>Esc</BgStyledText> to cancel. Your last area is drawn again next time.

Everything inside the area is recorded, other windows and apps too, so you can switch apps and keep recording that part of the screen.

<Screenshot src="/img/extension/area-on-screen.png" alt="An area drawn on a picture of the screen, with the camera placed inside it" dark raw />

With the camera on, place it inside the area on that picture. It's drawn into the video exactly there, so it's always in the recording however your windows are arranged.

### While you record

A short countdown runs first (click it or press <BgStyledText>Return</BgStyledText> to start straight away). Then the recording controls appear: the time, mute and the microphone menu, the camera (hide it, resize it, or pick another), <BgStyledText>Pause</BgStyledText>, <BgStyledText>Restart</BgStyledText>, <BgStyledText>Stop</BgStyledText> and <BgStyledText>Discard</BgStyledText>. Once you've recorded more than 5 seconds, Restart and Discard ask first, so a misclick never costs you a take. Paused time is left out of the video.

<Screenshot src="/img/extension/recording-controls.png" alt="The recording controls on the page, with the time, microphone, camera, pause, restart, stop and discard, next to the camera bubble" dark raw />

In Chrome and Edge, your camera floats in a small window above every tab and app, so it stays with you when you switch windows. Move it by dragging and resize it from its edges. Pointing at it shows buttons to mute and to hide the camera.

You can always stop and save from the **Hippius button** in your toolbar: click it, then <BgStyledText>Stop recording</BgStyledText>. Or press <BgStyledText>Alt Shift R</BgStyledText> again. <BgStyledText>Alt Shift P</BgStyledText> pauses and resumes.

:::tip Keeping the controls out of your video
A tab recording never films the controls. An area recording with the camera off floats nothing, so the video has only the area; turn on **Float the recording controls** in Hippius's tab if you want them anyway, and keep them outside the area. When you record an entire screen, the small folded controls are part of the picture. To keep them out, share a window or a tab instead, or record with the desktop app.
:::

### Free plan limits

On the Free plan, recordings stop at **5 minutes** (the timer counts down the last minute), you can keep **25 recordings**, and captures carry a small Hippius mark. Paused time doesn't count toward the 5 minutes. Once you've used all 25, <BgStyledText>Record</BgStyledText> tells you before anything is recorded, so you never lose a take. Delete an older recording to free a slot, or upgrade. The details are on [Free and Paid Plans](/use/captures/plans).

<Screenshot src="/img/extension/free-plan-limit.png" alt="The message shown when all 25 free recordings are used, with Not now and Upgrade" dark raw />

## Take a screenshot

Click the arrow on <BgStyledText>Screenshot</BgStyledText> in the popup and pick what to capture:

<Unordered>
  <li><strong>Visible page</strong>: everything you can see in the tab. Shortcut: <BgStyledText>Alt Shift S</BgStyledText>.</li>
  <li><strong>Select area</strong>: drag out part of the page. With the shortcut, <BgStyledText>Alt Shift A</BgStyledText>, it's one step: drag, let go, and it's taken. <BgStyledText>Esc</BgStyledText> cancels.</li>
  <li><strong>Screen or window</strong>: any screen or window, other apps included. Hippius opens its own tab with your browser's sharing dialog; click <BgStyledText>Share</BgStyledText> and you're back on your tab with the screenshot taken.</li>
</Unordered>

<Screenshot src="/img/extension/popup-screenshot-menu.png" alt="The Screenshot menu in the popup: Visible page, Select area, and Screen or window" dark raw />

The capture bar has the same three choices and a **timer** (none, 5 or 10 seconds), so you can open a menu or hover over something before the picture is taken. Screenshots are unlimited on every plan.

## After a capture

When you stop a recording or take a screenshot, a small card opens in the corner of your screen. It encrypts the capture, uploads it to your Hippius Captures drive, and copies its share link, which shows on the card with <BgStyledText>Copy link</BgStyledText> and <BgStyledText>Open</BgStyledText>. A screenshot also has <BgStyledText>Edit</BgStyledText>, which opens it in the console's editor, and the menu has Download and Discard.

<Screenshot src="/img/extension/capture-card.png" alt="The capture card after a screenshot: Uploaded, Public link copied, with Copy link, Open and Edit" dark raw />

After a recording, the link also opens in a new tab so you can check it. You can turn that off, or turn it on for screenshots too, in Settings. Once everything is saved, the card closes by itself after a few seconds. Pointing at it holds it open.

Anyone with the link can view the capture in their browser, without an account, and the link never expires. On a paid plan, the link also comes with insights, comments and reactions, all switched on, so you can see who watched and read what they said. Manage your links in the console under [Shared Links](/use/console/shared-links), and see [Share links](/use/captures/share-links) for how capture links work.

## Upload files

<BgStyledText>Upload</BgStyledText> in the popup sends files from your computer to your Hippius Captures drive the same way captures go: encrypted in your browser first, with a share link copied when it's done.

## If a capture can't be saved

Nothing is lost when a capture can't be uploaded straight away. It stays in your browser, encrypted, and sits at the top of the popup's list under **Not saved yet**, with the reason and what to do:

<Unordered>
  <li><BgStyledText>Retry</BgStyledText> when you were offline or the Drive didn't answer. If the file already reached your Drive and only the link is missing, Retry just makes the link.</li>
  <li><BgStyledText>Connect</BgStyledText> when your session has ended.</li>
  <li><BgStyledText>Upgrade</BgStyledText> when your Drive is full.</li>
</Unordered>

A recording is written to your computer as you record, a second at a time, so even if your browser closes in the middle of one, what you recorded until then is kept.

## Keyboard shortcuts

| Keys (Windows and Linux) | On a Mac | What it does |
|---|---|---|
| <BgStyledText>Alt Shift R</BgStyledText> | <BgStyledText>Option Shift R</BgStyledText> | Start recording with your last setup; press again to stop |
| <BgStyledText>Alt Shift P</BgStyledText> | <BgStyledText>Option Shift P</BgStyledText> | Pause or resume |
| <BgStyledText>Alt Shift S</BgStyledText> | <BgStyledText>Option Shift S</BgStyledText> | Screenshot of the visible page |
| <BgStyledText>Alt Shift A</BgStyledText> | <BgStyledText>Option Shift A</BgStyledText> | Screenshot of an area |

The keyboard button at the top of the popup shows the keys each one has right now.

<Screenshot src="/img/extension/popup-shortcuts.png" alt="The Keyboard shortcuts panel in the popup, with Set buttons next to two shortcuts that have no keys" dark raw />

Your browser hands an extension its shortcuts only when it's installed, and only keys that no other extension already uses. So one of them may arrive with no keys. Wherever the shortcuts are listed, a shortcut without keys has a <BgStyledText>Set</BgStyledText> button that opens your browser's shortcuts page. You can change any of them there too: <code>chrome://extensions/shortcuts</code> in Chrome, Brave and Arc, or <code>edge://extensions/shortcuts</code> in Edge. <BgStyledText>Change shortcuts</BgStyledText> in the popup takes you there.

## Settings

The gear at the top of the popup opens Settings. They're the same settings as <BgStyledText>Options</BgStyledText> on the capture bar, kept in this browser:

<Unordered>
  <li><strong>After capture</strong>: copy a share link, open the link after recordings (on unless you turn it off), and open the link after screenshots (off unless you turn it on).</li>
  <li><strong>Screenshots</strong>: the timer.</li>
  <li><strong>Recordings</strong>: the countdown, and whether to use the microphone and the camera.</li>
  <li><strong>Keyboard shortcuts</strong>, with Set for any that have no keys.</li>
  <li><strong>Account</strong>, with <BgStyledText>Disconnect</BgStyledText>.</li>
</Unordered>

<Screenshot src="/img/extension/popup-settings.png" alt="The extension's Settings: after capture, screenshots, recordings and keyboard shortcuts" dark raw />

When a page can't show the capture bar, the popup lets you set up a recording right there instead.

<Screenshot src="/img/extension/popup-record-setup.png" alt="Recording set up from the popup: This tab or Screen or window, microphone, camera bubble, and Start recording" dark raw />

## Privacy

Captures from the extension get the same protection as the rest of your Drive:

<Unordered>
  <li><strong>Encrypted in your browser.</strong> A capture is encrypted with your Captures drive's key before it's stored or uploaded, so it never sits on your computer, or on Hippius, in the clear. The one exception is a capture taken before you connect, which waits on your computer unencrypted until you do.</li>
  <li><strong>The link carries its own key.</strong> The key that opens a shared capture sits after the <code>#</code> in its link. Browsers never send that part to a server, so it never reaches Hippius.</li>
  <li><strong>Your camera stays yours.</strong> The camera and microphone are opened only by Hippius's own pages. The websites you record never get access to them, and the camera picture doesn't leave your computer except as part of your recording.</li>
  <li><strong>What the server can see.</strong> A capture's file name, size and type, never what's in it.</li>
</Unordered>

## Troubleshooting

**The Hippius button shows a "!".** A shortcut couldn't run. Point at the button to see why, or open the popup, which says it too. The usual reasons are a page no extension may capture (your browser's own pages and the extension store), or the Free plan's 25 recordings being used up.

**A shortcut does nothing.** It may have no keys: open the keyboard panel in the popup and use <BgStyledText>Set</BgStyledText>. See [Keyboard shortcuts](#keyboard-shortcuts).

**The camera or microphone shows Allow again.** Your browser no longer lets Hippius use them, for example because they were allowed only once, or taken back in the browser's settings. Click <BgStyledText>Allow</BgStyledText> and allow them for Hippius again.

**The sharing dialog lists no screens or windows (Mac).** macOS needs to allow your browser to record the screen. Open **System Settings**, then **Privacy & Security**, then **Screen & System Audio Recording** (**Screen Recording** on older versions of macOS), turn your browser on, and restart it. Hippius's tab points you there when this happens.

**My camera disappeared from a tab recording.** A tab recording films the camera bubble drawn in that tab. If the tab goes to another website, your browser stops Hippius from drawing there until you click Hippius on the new page. Open the popup and use <BgStyledText>Put my camera back</BgStyledText>.

**Record says it couldn't count your recordings.** On the Free plan, Hippius checks how many recordings you have before starting. When it can't (you're offline, or the Drive didn't answer), it doesn't start. Check your connection and press <BgStyledText>Retry</BgStyledText>.

**Your session ended.** The popup says so and offers <BgStyledText>Connect account</BgStyledText>. To switch to another Hippius account, disconnect first, in Settings: the extension never switches accounts on its own.

**Something else isn't working.** Open the help button at the top of the popup and choose <BgStyledText>Copy diagnostics</BgStyledText>. It copies a short report of what Hippius did recently, with no account details, links or keys, which you can paste when you contact support.
