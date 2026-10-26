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

Some things need a voice: why a bug happens, how to fill in a form, what changed in a design. Record your screen, talk it through, and send a link. Add your camera if you'd like them to see your face. When you stop, the video is saved to your [captures drive](/use/captures#where-your-captures-go) and its link is copied.

You can record in the desktop app on Mac, Windows and Linux, and in the console in Chrome, Edge, Safari and Firefox on a computer. You can also record with the Hippius browser extension for Chrome and Edge (see [Pick your app](/use/captures#where-you-can-use-it)).

:::info Before you start on your computer
- On a Mac, recording needs macOS 13 or later, and recording your microphone needs macOS 15 or later. The first time, macOS asks you to allow Hippius to record your screen, and you relaunch Hippius once you have ([On a Mac](#on-a-mac)).
- On Windows, the controls stay out of your video just as on a Mac, but you can't mute or switch the microphone once a recording has started.
- On Linux, the recording controls show up in your video, because Linux doesn't let an app hide a window from a recording. Keep that in mind before you record anything you'd rather not show ([On Linux](#on-linux)).
- In the console, recording the entire screen also films the floating controls. Record a window instead to keep them out ([Keep the controls out of the video](#keep-the-controls-out-of-the-video)).
:::

## Get ready

In the desktop app, open the capture bar with **Record**. It's on the Hippius icon in your menu bar (the system tray on Windows and Linux), and at the top of Drive, of Captures and of any drive you open, always just before Screenshot. Or press <BgStyledText>Option Shift Command 2</BgStyledText> on a Mac, or <BgStyledText>Ctrl Alt Shift 2</BgStyledText> on Windows and Linux, from any app. You can change those keys in [Settings, Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording).

In the console, click <BgStyledText>Record</BgStyledText> at the top of the Drive or Captures page.

On the bar, choose what to record (entire screen, a window or an area). Turn your camera and microphone on or off, and pick which ones to use if you have more than one. The microphone shows a live level, so you can check you're being heard before you start. In the console the bar also shows a small round preview of your camera, so you can check how you look.

<Screenshot src="/img/desktop/captures/capture-bar.png" alt="The capture bar in the desktop app set to record the entire screen, with screen, camera and microphone switches and the free plan note" raw />

<BgStyledText>Options</BgStyledText> has a few more settings. The **Recording countdown** gives you 3 seconds (or 5, or none) to get ready after you press Record. **Record system audio** in the desktop app, or **Record tab or computer sound** in the console, adds what your computer plays, such as a video or a call. It's off to begin with, because with speakers your voice gets recorded twice; headphones avoid that. The desktop app can also **Show mouse clicks** where your computer supports it (on a Mac, macOS 15 or later). And **Show a preview in chats** makes the link show the recording's first frame when you paste it in a chat (see [chat previews](/use/captures/share-links#a-preview-when-you-paste-the-link-in-a-chat)).

<Screenshot src="/img/console/captures/capture-options.png" alt="The Options menu of the console's capture bar with the recording countdown, tab or computer sound, and Show a preview in chats" dark raw />

The bar remembers your choices for next time.

## Record

<Ordered>
  <li>Click <BgStyledText>Record</BgStyledText> (or press <BgStyledText>Enter</BgStyledText>).</li>
  <li>Choose what to record. In the desktop app you click the screen or window, or drag the area, just as for a <a href="/use/captures/screenshots">screenshot</a>. In the console, and in the desktop app on Linux with Wayland, a sharing dialog asks which screen or window to record. For an area, you then drag it out on the screen you picked.</li>
  <li>The countdown runs. <BgStyledText>Start now</BgStyledText> skips it and <BgStyledText>Cancel</BgStyledText> stops before anything is recorded.</li>
  <li>Record what you need to.</li>
</Ordered>

### While you record

A small set of controls stays on screen, with a timer that also counts down your last minute on the Free plan. Fluffed a line? Pause, gather your thoughts and resume (paused time is cut from the video), or Restart to start the take again. Stop saves it and makes the link, and Discard throws it away (Hippius checks with you before Restart or Discard). You can also mute your microphone, or hide your camera and change the bubble's size, without stopping. Hover over any button to see what it does.

<Screenshot src="/img/desktop/captures/recording-controls.png" alt="The desktop app's recording controls with the timer, microphone, camera, pause, restart, stop and discard buttons" raw />

Not every computer offers every control. In the desktop app, muting and switching the microphone during a recording work on a Mac, and switching the camera and resizing the bubble work on a Mac and Windows.

### Stop with the keyboard

You don't have to find the controls to finish.

<Unordered>
  <li>In the desktop app, press the recording shortcut again (<BgStyledText>Option Shift Command 2</BgStyledText> on a Mac, <BgStyledText>Ctrl Alt Shift 2</BgStyledText> on Windows and Linux), or the screenshot shortcut. Either one stops the recording from any app.</li>
  <li>In the console, press <BgStyledText>Option Shift X</BgStyledText> on a Mac, or <BgStyledText>Alt Shift X</BgStyledText> on Windows and Linux. It works while the console tab or its floating controls window is in front, not from other apps.</li>
</Unordered>

Hover over Stop and it shows the keys.

<Screenshot src="/img/console/captures/recording-controls.png" alt="The console's recording controls with the Stop and save tooltip showing Alt+Shift+X" dark raw />

### When you stop

The recording is saved and uploaded, and a card shows the progress until it says **Link ready**. The link is copied for you, and from the card you can copy it again, open it, show the recording in Captures, see its [Insights](/use/captures/insights), or manage the link. Recordings start playing straight away for the people you send them to. They don't have to download the whole video first.

## The camera bubble

With the camera on, your face appears in a round bubble on top of what you're recording. In the desktop app, the bubble floats above your other windows and is filmed wherever you put it, so drag it out of the way of what you're showing. On a Mac and Windows, hover over the bubble while you record to change its size, or pause and resume right there. Those controls never show up in the video.

In the console, in Chrome and Edge, it depends on what you record. With the entire screen, the bubble is a small floating window of its own, with the recording controls folded into it. With a window or an area, the camera is drawn into the bottom-left corner of the video, and the floating window shows you a small preview of it.

## Keep the controls out of the video

In the desktop app on a Mac and Windows, the recording controls are never filmed, whatever you record. On Linux they always are (see [On Linux](#on-linux)).

In the console, it depends on what you record. With a window or an area, the controls aren't in the video. An area recording without the camera doesn't open a floating window at all; you control it from the console tab, with the stop shortcut, or with your browser's own Stop sharing button. With the entire screen, the floating controls window is on your screen, so it shows in the recording. The capture bar reminds you of this. To keep the controls out, record a window instead, or use the desktop app.

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

The Hippius browser extension for Chrome and Edge doesn't have these limits. See [Pick your app](/use/captures#where-you-can-use-it).

## On a Mac

Screen recording needs macOS 13 or later, and recording your microphone needs macOS 15 or later. The first time, macOS asks you to allow Hippius to record your screen. Hippius explains what to do and opens the right page in System Settings. Turn Hippius on there, then relaunch Hippius: macOS only applies the change after a restart.

## On Windows

Recording works the same way as on a Mac, with the camera bubble and its sizes, camera switching and your computer's sound, and the controls stay out of the video. Muting or switching the microphone during a recording isn't available on Windows yet.

## On Linux

Hippius records on Linux too. The `.deb` installer brings everything recording needs, so there's nothing else to install.

Linux doesn't let an app hide a window from a recording, so the controls are kept small, without labels until you hover over them, and they will show in your video. The first time, Hippius reminds you. Muting or switching the microphone, switching the camera and resizing the bubble aren't available on Linux yet.

On Wayland (most recent GNOME and KDE desktops, including recent Ubuntu and Fedora), your desktop's own sharing dialog asks which screen or window to record, and the countdown starts once you've answered it. Keyboard shortcuts on Wayland are added in your desktop's own keyboard settings, and Settings shows you the exact command for each. They then work even when Hippius is closed: Hippius starts and opens the recording as soon as you're signed in.

<details>
<summary>Installing by hand</summary>

The `.deb` depends on GStreamer's base, good and bad plugin sets (`gstreamer1.0-plugins-base`, `gstreamer1.0-plugins-good` and `gstreamer1.0-plugins-bad`). If you use the `.rpm`, or install Hippius another way, make sure GStreamer's base, good and bad plugins are installed too.

</details>

## Free plan recordings

On the Free plan, a recording stops on its own at 5 minutes. In the last minute the timer shows how long you have left, and when it stops the recording is saved, uploaded and shared like any other, with an Upgrade button on the card if you need longer. The Free plan includes 25 recordings, and free recordings carry a small Hippius watermark in the bottom-right corner. Paid plans have none of these limits. See [Free and paid plans](/use/captures/plans).

## Where to go next

<Unordered>
  <li><a href="/use/captures/share-links">Share links for captures</a></li>
  <li><a href="/use/captures/plans">Free and paid plans</a></li>
  <li><a href="/use/browser-extension/recording">Record with the browser extension</a></li>
  <li><a href="/use/captures/troubleshooting">Troubleshooting &amp; FAQ</a></li>
</Unordered>
