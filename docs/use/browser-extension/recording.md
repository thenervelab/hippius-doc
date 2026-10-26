---
id: recording
title: Record Your Screen with the Extension
sidebar_label: Record Your Screen
slug: /use/browser-extension/recording
description: Record a tab, an area, a screen or a window, or just your camera, with the Hippius extension for Chrome and Edge. Add your microphone and a camera bubble, pause and resume, and get a share link when you stop.
---

import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

A short recording often says more than a long message: walk a teammate through a page, show a bug as it happens, or explain a design while you point at it. The extension records what you choose, with your voice and your face if you want them, and gives you a link to the video as soon as you stop.

## Open the capture bar

Click <BgStyledText>Record</BgStyledText> in the popup, or press <BgStyledText>Alt Shift M</BgStyledText> (<BgStyledText>Option Shift M</BgStyledText> on a Mac). The capture bar opens at the bottom of the page. It remembers your choices, so next time the shortcut starts recording straight away with the same setup.

<Screenshot src="/img/extension/capture-bar.png" alt="The capture bar on a web page, set to record this tab with the camera and microphone on, and the camera bubble in the corner" dark raw />

## Choose what to record

<Unordered>
  <li><strong>This tab</strong>: the page you're on, and nothing else. Notifications and other windows never end up in the video, and the recording controls are never filmed. It's the best choice when everything you want to show is in one tab.</li>
  <li><strong>Area</strong>: a part of your screen that you draw, including other windows and apps.</li>
  <li><strong>Screen</strong>: a whole screen, one window or another tab, which you pick in your browser's sharing dialog.</li>
  <li><strong>Your camera alone</strong>: turn off the first row (This tab, Area or Screen) and only your camera is recorded, handy for a quick video message.</li>
</Unordered>

### Your microphone and camera

Under the mode are your **camera** and **microphone**, each with a switch and a menu to pick the device. The microphone shows a live level, so you can check it hears you before you start. With the camera on, a round **camera bubble** appears on the page: drag it where you want it, and point at it to make it small, large or full size.

The first time, your browser asks you to allow the camera and microphone for Hippius. You allow them once, on Hippius's own page, and the websites you record never get access to them.

### Options

<BgStyledText>Options</BgStyledText> on the bar sets the **countdown** before recording starts (none, 3 or 5 seconds) and what happens when you stop: whether to copy the link, and whether to open it in a new tab so you can check it.

Some pages can't show the capture bar, such as your browser's own settings pages. There, the popup lets you set up a recording right inside it instead.

<Screenshot src="/img/extension/popup-record-setup.png" alt="Recording set up from the popup: This tab or Screen or window, microphone, camera bubble, and Start recording" dark raw />

## Start recording

Press <BgStyledText>Record</BgStyledText> on the bar (or click the page, or press <BgStyledText>Return</BgStyledText>). Hippius opens a tab of its own next to yours, with one button:

<Unordered>
  <li><BgStyledText>Start recording</BgStyledText> for this tab or your camera alone. Press it and you're back on your tab, where the countdown starts.</li>
  <li><BgStyledText>Choose what to share</BgStyledText> for a screen, a window or an area. Press it, pick what to share in your browser's dialog, and click <BgStyledText>Share</BgStyledText>. To record the sound of a tab, such as a video playing in it, turn on <strong>Also share tab audio</strong> in that dialog. You're taken straight back to your tab, where the countdown starts.</li>
</Unordered>

<Screenshot src="/img/extension/start-tab.png" alt="Hippius's tab before a screen recording: four steps, a preview of the camera, and Choose what to share" dark raw />

Why the extra tab and the extra click? Browsers only let an extension open a floating window from a click on the extension's own page. That click is what lets your camera float above other windows while you record.

<Screenshot src="/img/extension/sharing-tab.png" alt="Hippius's tab while the browser's sharing dialog is open, saying Click Share to return to your original tab" dark raw />

Hippius's tab stays open, pinned, while you record, because it holds the recording. Leave it open until you stop.

### Record an area

With **Area**, after you share your screen Hippius shows a picture of it so you can draw the area. Drag the area out, move it, and nudge it with the arrow keys. Press <BgStyledText>Return</BgStyledText> to record or <BgStyledText>Esc</BgStyledText> to cancel. Your last area is drawn again next time.

Everything inside the area is recorded, other windows and apps too, so you can switch apps and keep recording that part of the screen.

<Screenshot src="/img/extension/area-on-screen.png" alt="An area drawn on a picture of the screen, with the camera placed inside it" dark raw />

With the camera on, place it inside the area on that picture. It's drawn into the video exactly there, so it's always in the recording however your windows are arranged.

## While you record

A short countdown runs first (click it or press <BgStyledText>Return</BgStyledText> to start straight away). Then the recording controls appear: the time, mute and the microphone menu, the camera (hide it, resize it, or pick another), <BgStyledText>Pause</BgStyledText>, <BgStyledText>Restart</BgStyledText>, <BgStyledText>Stop</BgStyledText> and <BgStyledText>Discard</BgStyledText>.

<Screenshot src="/img/extension/recording-controls.png" alt="The recording controls on the page, with the time, microphone, camera, pause, restart, stop and discard, next to the camera bubble" dark raw />

When you record a screen, a window or an area in Chrome or Edge, your camera floats in a small window above every tab and app, so it stays with you when you switch windows. Move it by dragging and resize it from its edges. Pointing at it shows buttons to mute and to hide the camera.

### Pause, resume and stop

<Unordered>
  <li><strong>Pause and resume</strong> as often as you like, with the controls or <BgStyledText>Alt Shift K</BgStyledText> (<BgStyledText>Option Shift K</BgStyledText> on a Mac). Paused time is left out of the video, so you can stop to think without editing anything out later.</li>
  <li><strong>Restart and Discard</strong> ask first once you've recorded more than 5 seconds, so a misclick never costs you a take.</li>
  <li><strong>Stop</strong> saves the recording. You can stop from the controls, by pressing <BgStyledText>Alt Shift M</BgStyledText> again, or from the <strong>Hippius button</strong> in your toolbar: click it, then <BgStyledText>Stop recording</BgStyledText>.</li>
</Unordered>

<Screenshot src="/img/extension/popup-recording.png" alt="The Hippius popup during a recording, with the time, Pause, Restart, Stop recording and Discard" dark raw />

:::tip Keeping the controls out of your video
A tab recording never films the controls. An area recording with the camera off floats nothing, so the video has only the area: stop from the Hippius button or the shortcut. Turn on **Float the recording controls** in Hippius's tab if you want them anyway, and keep them outside the area. When you record an entire screen, the small folded controls are part of the picture. To keep them out, share a window or a tab instead.
:::

On the Free plan a recording stops on its own at 5 minutes, and the timer counts down the last minute. Paused time doesn't count. See [Plans and Limits](/use/browser-extension/plans).

## When you stop

A small card opens in the corner of your screen. It encrypts the recording, saves it to your captures drive, and copies its share link. The link also opens in a new tab so you can watch it back (you can turn that off in Settings). [Share and See Who Watched](/use/browser-extension/sharing) explains the card and the link.

Your recording is safe even if something goes wrong. It's written to your computer as you record, a second at a time, so if your browser closes in the middle of one, what you recorded until then is kept. If it can't be saved straight away, for example because you're offline, it waits in your browser until it can (see [Not saved yet](/use/browser-extension/captures#not-saved-yet)).
