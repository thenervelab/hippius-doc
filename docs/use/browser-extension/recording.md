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

Most of the time, choose **This tab**. It records only the page you're on, so notifications, other windows and the recording controls never end up in the video, and your camera bubble is recorded right where you put it on the page.

The other choices are for when you need more than one tab:

<Unordered>
  <li><strong>Area</strong> records a part of your screen that you draw, other windows and apps included. Your camera is always in the video, inside the area.</li>
  <li><strong>Screen</strong> records a whole screen, one window or another tab, which you pick in your browser's sharing dialog.</li>
</Unordered>

For a quick video message, record just your camera: turn off the mode row (This tab, Area or Screen) and keep the camera on.

### Your camera with Screen

With **Screen**, your camera and the recording controls float together in one small window above every tab and app. You can see yourself while you switch windows, and stop, pause or mute right under your camera. What ends up in the video depends on what you pick in your browser's sharing dialog:

<Unordered>
  <li><strong>A window or a tab</strong>: your camera is drawn into the video in the bottom-left corner, at the size you pick in the camera menu. The floating window is there only for you and is never in the video.</li>
  <li><strong>Your entire screen</strong>: the video shows your camera wherever the floating window is, even as you move it, and never the window's controls or title bar. If you hide your camera, that spot shows a soft blur instead. With more than one display, your browser asks once to let Hippius see where they are, so the camera lands in the right place.</li>
  <li><strong>Your entire screen with the camera off</strong>: the controls start folded to a small red dot, the time and Stop, and those are in the video. Share a window or a tab, or use the <a href="/use/captures/recording">desktop app</a>, to keep them out.</li>
</Unordered>

### Your microphone and camera

Turn your microphone and camera on or off, and pick which ones to use if you have more than one. The microphone shows a live level, so you can see it hears you before you start. With the camera on, a round camera bubble appears on the page. Drag it anywhere, and hover over it to make it small, large or full size.

The first time, your browser asks you to allow them for Hippius ([why you only allow them once](/use/browser-extension/get-started#allow-your-camera-and-microphone)).

### Options

<BgStyledText>Options</BgStyledText> on the bar sets the countdown before recording starts (none, 3 or 5 seconds) and what happens when you stop: whether to copy the link, and whether to open it in a new tab so you can check it.

Some pages can't show the capture bar, such as your browser's own settings pages. There, the popup lets you set up a recording right inside it instead.

<Screenshot src="/img/extension/popup-record-setup.png" alt="Recording set up from the popup: This tab or Screen or window, microphone, camera bubble, and Start recording" dark raw />

## Start recording

Click <BgStyledText>Record</BgStyledText> on the bar, or press <BgStyledText>Enter</BgStyledText> (<BgStyledText>Return</BgStyledText> on a Mac). For This tab, you can also just click the page.

Hippius opens the Hippius tab next to yours, with a single button to click. Why the extra tab and the extra click? Browsers only let an extension open a floating window, like your camera bubble over other apps, from a click on the extension's own page, and this is that click.

<Unordered>
  <li><BgStyledText>Start recording</BgStyledText> for this tab or your camera alone. Click it and you're back on your tab, where the countdown starts.</li>
  <li><BgStyledText>Choose what to share</BgStyledText> for a screen, a window or an area. Click it, pick what to share in your browser's dialog, and click <BgStyledText>Share</BgStyledText>. To record the sound of a tab, such as a video playing in it, turn on <strong>Also share tab audio</strong> in that dialog. You're taken straight back to your tab, where the countdown starts.</li>
</Unordered>

<Screenshot src="/img/extension/start-tab.png" alt="The Hippius tab before a screen recording: four steps, a preview of the camera, and Choose what to share" dark raw />

<Screenshot src="/img/extension/sharing-tab.png" alt="The Hippius tab while the browser's sharing dialog is open, saying Click Share to return to your original tab" dark raw />

:::note
Keep the Hippius tab open until you stop. It holds the recording, which is why it stays pinned while you record.
:::

### Record an area

With **Area**, after you share your screen Hippius shows a picture of it so you can draw the area. Drag the area out, move it, and nudge it with the arrow keys. Press <BgStyledText>Enter</BgStyledText> (<BgStyledText>Return</BgStyledText> on a Mac) to record, or <BgStyledText>Esc</BgStyledText> to cancel. Your last area is drawn again next time.

Everything inside the area is recorded, other windows and apps too, so you can switch apps and keep recording that part of the screen.

<Screenshot src="/img/extension/area-on-screen.png" alt="An area drawn on a picture of the screen, with the camera placed inside it" dark raw />

With the camera on, place it inside the area on that picture. It's drawn into the video exactly there, so it's always in the recording however your windows are arranged.

The recording controls float in a small window of their own, with a little live picture of your camera beside them when it's on. They're in the video whenever they sit inside the area, so keep them outside it. The countdown tells you when they're inside.

## While you record

A short countdown runs first. Click it, or press <BgStyledText>Enter</BgStyledText> (<BgStyledText>Return</BgStyledText> on a Mac), to start straight away. Then the recording controls appear, with the time and everything you need to mute, hide your camera, pause, start over or stop.

<Screenshot src="/img/extension/recording-controls.png" alt="The recording controls on the page, with the time, microphone, camera, pause, restart, stop and discard, next to the camera bubble" dark raw />

When your camera floats in its own window, move it by dragging and resize it from its edges. The camera menu in the controls changes its size, or switches to another camera, without stopping.

### Pause, start over or stop

Pause and resume as often as you like, with the controls or <BgStyledText>Alt Shift K</BgStyledText> (<BgStyledText>Option Shift K</BgStyledText> on a Mac). Paused time is left out of the video, so you can stop to think without editing anything out later.

Fluffed a line? Restart starts the take again, and Discard throws it away. Both ask first once you've recorded more than 5 seconds, so a misclick never costs you a take.

Stop saves the recording. Stop from the controls, by pressing <BgStyledText>Alt Shift M</BgStyledText> again, or from the Hippius button in your toolbar: click it, then <BgStyledText>Stop recording</BgStyledText>.

<Screenshot src="/img/extension/popup-recording.png" alt="The Hippius popup during a recording, with the time, Pause, Restart, Stop recording and Discard" dark raw />

:::tip Keeping the controls out of your video
**This tab**, and a window or tab shared with **Screen**, never show the controls in the video. **A whole screen** with the camera on shows only your camera where the controls float; with the camera off it includes the small folded controls. With **Area**, the controls float and are in the video whenever they sit inside the area, so keep them outside it. To keep every control off your screen, turn off **Float the recording controls** in the Hippius tab before you start, and stop with <BgStyledText>Alt Shift M</BgStyledText> or the Hippius button. Hippius remembers your choice.
:::

On the Free plan a recording stops on its own at 5 minutes, and the timer counts down the last minute. Paused time doesn't count. See [Plans and Limits](/use/browser-extension/plans).

## When you stop

A small card in the corner shows Hippius encrypting and saving the recording. When it's done, the link is on your clipboard. A new tab opens the moment you press Stop, shows the recording being saved, and turns into the recording's page as soon as the link is ready, so you can watch it back (you can turn that off in [Settings](/use/browser-extension/captures#settings)). If the link can't be made, the tab says why, with <BgStyledText>Retry</BgStyledText>. [When your link is ready](/use/browser-extension/sharing#when-your-link-is-ready) explains the card.

## If something goes wrong, your recording is safe

The recording is written to your computer as you record, a second at a time, so if your browser closes in the middle of one, what you recorded until then is kept. If it can't be saved straight away, for example because you're offline, it waits in your browser until it can. See [If a capture isn't saved yet](/use/browser-extension/captures#if-a-capture-isnt-saved-yet).

## Next

Your video's link is on your clipboard. [Share a Link and See Who Watched](/use/browser-extension/sharing) shows who can open it and how to see who watched.
