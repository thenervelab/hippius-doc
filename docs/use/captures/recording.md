---
id: recording
title: Record Your Screen
sidebar_label: Record Your Screen
slug: /use/captures/recording
description: Record your entire screen, a window or an area in the Hippius desktop app or the console, with your microphone, your camera and your computer's sound, stop with a keyboard shortcut, then share it with a link that is copied for you.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

A screen recording shows what's happening while you talk someone through it: a bug, a walkthrough, a quick "here's how". Record your **entire screen**, **one window** or an **area**, with your voice and, if you like, a round bubble of your camera. When you stop, the video is saved to your [captures drive](/use/captures#where-your-captures-go) and its link is copied.

Screen recording works in the desktop app on macOS, Windows and Linux, and in the console in Chrome, Edge, Safari and Firefox on a computer. It's also available as the Hippius browser extension (see [Where you can use it](/use/captures#where-you-can-use-it)).

## Get ready

Open the capture bar with **Record**. In the desktop app, Record comes first wherever it sits next to Screenshot:

<Unordered>
  <li><strong>The menu bar</strong> (the notification area on Windows): click the Hippius icon, then the <BgStyledText>Record</BgStyledText> tile.</li>
  <li><strong>Drive, Captures and every drive</strong>: the <BgStyledText>Record</BgStyledText> button in the header opens a short menu, to record an area, a window or the entire screen straight away, or to open the capture bar.</li>
  <li><strong>The keyboard</strong>: <BgStyledText>⌥ ⇧ ⌘ 2</BgStyledText> on a Mac, or <BgStyledText>Ctrl Alt Shift 2</BgStyledText> on Windows and Linux, from any app. You can change it in <a href="/use/desktop/settings#screenshots--recording">Settings</a>.</li>
</Unordered>

In the console, click <BgStyledText>Record</BgStyledText> at the top of the Drive or Captures page.

On the bar, choose what to record (entire screen, a window or an area), whether to include your **camera** and your **microphone**, and which ones. The microphone shows a live level, so you can check you're being heard before you start. In the console the bar also shows a small round preview of your camera, so you can check how you look.

<Screenshot src="/img/desktop/captures/capture-bar.png" alt="The capture bar in the desktop app set to record the entire screen, with screen, camera and microphone switches and the free plan note" raw />

Under <BgStyledText>Options</BgStyledText> you'll find a few more:

<Unordered>
  <li><strong>Recording countdown</strong>: none, 3 seconds (the default) or 5 seconds, so you have a moment to get ready after pressing Record.</li>
  <li><strong>Record system audio</strong> (desktop) or <strong>Record tab or computer sound</strong> (console): adds what your computer plays, such as a video or a call. It is off by default because with speakers your voice gets recorded twice. Headphones avoid that.</li>
  <li><strong>Show mouse clicks</strong>, in the desktop app where your computer supports it (on a Mac, macOS 15 or later).</li>
  <li><strong>Show a preview in chats</strong>, so the link shows the recording's first frame when you paste it in a chat. See <a href="/use/captures/share-links#a-preview-when-you-paste-the-link-in-a-chat">chat previews</a>.</li>
</Unordered>

<Screenshot src="/img/console/captures/capture-options.png" alt="The Options menu of the console's capture bar with the recording countdown, tab or computer sound, and Show a preview in chats" dark raw />

The bar remembers your choices for next time.

## Record

<Ordered>
  <li>Press <BgStyledText>Record</BgStyledText> (or <BgStyledText>Enter</BgStyledText>).</li>
  <li>Choose what to record. In the desktop app you click the screen or window, or drag the area, just as for a <a href="/use/captures/screenshots">screenshot</a>. In the console, and in the desktop app on Linux with Wayland, a sharing dialog asks which screen or window to record; for an area, you then drag it out on the screen you picked.</li>
  <li>The countdown runs. <BgStyledText>Start now</BgStyledText> skips it and <BgStyledText>Cancel</BgStyledText> stops before anything is recorded.</li>
  <li>Record what you need to.</li>
</Ordered>

### While you record

A small set of controls stays on screen. Point at a button and it tells you what it does.

<Unordered>
  <li>The <strong>timer</strong>, which also shows the time left in your last minute on the Free plan.</li>
  <li><strong>Mute</strong> the microphone. The recording carries on, silent, until you unmute. You can also switch to another microphone.</li>
  <li><strong>Hide</strong> or show the camera, switch cameras, and change the bubble's size: small, large or full size.</li>
  <li><strong>Pause</strong> and resume. Paused time is left out of the video.</li>
  <li><strong>Restart</strong> to throw this take away and start again. Hippius asks first.</li>
  <li><strong>Stop</strong> to save the recording and make its link.</li>
  <li><strong>Discard</strong> to throw it away with nothing saved. Hippius asks first.</li>
</Unordered>

<Screenshot src="/img/desktop/captures/recording-controls.png" alt="The desktop app's recording controls with the timer, microphone, camera, pause, restart, stop and discard buttons" raw />

Not every computer offers every control. In the desktop app, muting and switching the microphone work on a Mac; switching the camera and resizing the bubble work on a Mac and Windows. On Linux the controls are shown smaller and appear in the recording (see [On Linux](#on-linux)).

### Stop with the keyboard

You don't have to find the controls to finish:

<Unordered>
  <li><strong>Desktop app</strong>: press the recording shortcut again (<BgStyledText>⌥ ⇧ ⌘ 2</BgStyledText>, or <BgStyledText>Ctrl Alt Shift 2</BgStyledText>), or the screenshot shortcut. Both stop the recording from any app. Point at Stop and it shows the keys.</li>
  <li><strong>Console</strong>: press <BgStyledText>Option Shift X</BgStyledText> on a Mac, or <BgStyledText>Alt Shift X</BgStyledText> on Windows and Linux. It works while the console tab or its floating controls window is in front, not from other apps. Point at Stop and it shows the keys.</li>
</Unordered>

<Screenshot src="/img/console/captures/recording-controls.png" alt="The console's recording controls with the Stop and save tooltip showing Alt+Shift+X" dark raw />

### When you stop

The recording is saved and uploaded, and a card shows the progress until it says **Link ready**. The link is copied for you, and from the card you can copy it again, open it, show the recording in Captures, see its [Insights](/use/captures/insights), or manage the link. Recordings start playing straight away for the people you send them to; they don't have to download the whole video first.

## The camera bubble

With the camera on, your face appears in a round bubble on top of what you're recording.

<Unordered>
  <li>In the <strong>desktop app</strong>, the bubble floats above your other windows and is filmed wherever you put it. Drag it out of the way of what you're showing. On a Mac and Windows, point at the bubble while you record to change its size, or pause and resume right there. Those controls never show up in the video.</li>
  <li>In the <strong>console</strong> with <strong>entire screen</strong>, in Chrome and Edge, the bubble is a small floating window of its own, with the recording controls folded into it.</li>
  <li>In the <strong>console</strong> with a <strong>window</strong> or an <strong>area</strong>, in Chrome and Edge, the camera is drawn into the bottom-left corner of the video, and the floating window shows you a small preview of it.</li>
</Unordered>

## Keep the controls out of the video

In the desktop app on a Mac and Windows, the recording controls are never filmed, whatever you record.

In the console, it depends on what you record:

<Unordered>
  <li><strong>A window or an area</strong>: the controls are not in the video. An area recording without the camera doesn't open a floating window at all; you control it from the console tab, with the stop shortcut, or with your browser's own Stop sharing button.</li>
  <li><strong>Entire screen</strong>: the floating controls window is on your screen, so it shows in the recording. The capture bar reminds you of this. To keep them out, record a window instead, or use the desktop app.</li>
</Unordered>

## Browser differences {#browser-differences}

Recording in the console works in every major browser on a computer, but browsers don't all give websites the same tools. Here's what changes:

| | Chrome and Edge | Safari and Firefox |
|---|---|---|
| **Record entire screen or a window** | Yes | Yes |
| **Record an area** | Yes | No, but screenshots of an area work |
| **Camera with entire screen** | Yes, a round bubble | Safari: yes, in a small floating video window. Firefox: no camera |
| **Camera in window and area recordings** | Yes, drawn into the video | No, the camera is only recorded with entire screen |
| **Where the controls are** | In a small floating window above all your apps | In the console tab |

In Chrome and Edge, the floating controls window shows the website's name at the top. That's the browser's doing, and a website can't hide it.

The Hippius browser extension for Chrome and Edge removes these limits. See [Where you can use it](/use/captures#where-you-can-use-it).

## On a Mac

Screen recording needs macOS 13 or later, and recording your microphone needs macOS 15 or later. The first time, macOS asks you to allow Hippius to record your screen; Hippius explains what to do and opens the right page in System Settings. Turn Hippius on there, then relaunch Hippius: macOS only applies the change after a restart.

## On Windows

Recording works the same way as on a Mac, with the camera bubble and its sizes, camera switching and your computer's sound. Muting or switching the microphone during a recording isn't available on Windows yet. The Windows installer isn't code signed yet, so Windows may warn you when you install it: choose **More info**, then **Run anyway**.

## On Linux

Hippius records on Linux too. Installing the `.deb` brings the video plugins recording needs (GStreamer's base, good and bad plugins), so there's nothing else to install.

<Unordered>
  <li><strong>The controls are in the video.</strong> Linux doesn't let an app hide a window from a recording, so the controls stay small until you point at them, and show no labels. The first time, Hippius tells you they will be filmed.</li>
  <li><strong>On Wayland</strong> (most recent GNOME and KDE desktops), your desktop's own sharing dialog asks which screen or window to record, and the countdown starts once you've answered it.</li>
  <li><strong>Keyboard shortcuts on Wayland</strong> are added in your desktop's own keyboard settings: Settings shows the exact command for each. They then work even when Hippius is closed: Hippius starts and opens the recording as soon as you're signed in.</li>
</Unordered>

## Free plan recordings

On the Free plan, a recording stops on its own at **5 minutes**. In the last minute the timer shows how long you have left, and when it stops the recording is saved, uploaded and shared like any other, with an Upgrade button on the card if you need longer. The Free plan includes 25 recordings, and free recordings carry a small Hippius mark in the bottom-right corner. Paid plans have none of these limits. See [Free and paid plans](/use/captures/plans).

## Where to go next

<Unordered>
  <li><a href="/use/captures/share-links">Share links for captures</a></li>
  <li><a href="/use/captures/plans">Free and paid plans</a></li>
  <li><a href="/use/captures/troubleshooting">Troubleshooting &amp; FAQ</a></li>
</Unordered>
