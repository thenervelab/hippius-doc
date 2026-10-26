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

With **Screen**, your camera floats in a small window of its own above every tab and app, so you can see yourself while you switch windows. Because it's a separate window, it's only in the video when you share your **entire screen**. If you share one window or a tab, you'll still see the bubble, but the video won't have it. The bar reminds you of this when the camera is on.

To have your face in the video while you show just part of your screen:

<Unordered>
  <li>For a single tab, use <strong>This tab</strong>. The bubble is drawn in the page, so it's recorded.</li>
  <li>For a single window or app, use <strong>Area</strong> and draw the area around that window. Your camera is drawn into the video inside the area, wherever you place it. Anything that moves into that part of the screen is recorded too, so keep other windows clear of it.</li>
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

## While you record

A short countdown runs first. Click it, or press <BgStyledText>Enter</BgStyledText> (<BgStyledText>Return</BgStyledText> on a Mac), to start straight away. Then the recording controls appear, with the time and everything you need to mute, hide your camera, pause, start over or stop.

<Screenshot src="/img/extension/recording-controls.png" alt="The recording controls on the page, with the time, microphone, camera, pause, restart, stop and discard, next to the camera bubble" dark raw />

When the camera floats in its own window, move it by dragging and resize it from its edges. Hover over it to mute or hide the camera.

### Pause, start over or stop

Pause and resume as often as you like, with the controls or <BgStyledText>Alt Shift K</BgStyledText> (<BgStyledText>Option Shift K</BgStyledText> on a Mac). Paused time is left out of the video, so you can stop to think without editing anything out later.

Fluffed a line? Restart starts the take again, and Discard throws it away. Both ask first once you've recorded more than 5 seconds, so a misclick never costs you a take.

Stop saves the recording. Stop from the controls, by pressing <BgStyledText>Alt Shift M</BgStyledText> again, or from the Hippius button in your toolbar: click it, then <BgStyledText>Stop recording</BgStyledText>.

<Screenshot src="/img/extension/popup-recording.png" alt="The Hippius popup during a recording, with the time, Pause, Restart, Stop recording and Discard" dark raw />

:::tip Keeping the controls out of your video
**This tab** never shows the controls in the video. **Area** with the camera off shows nothing extra either; stop with <BgStyledText>Alt Shift M</BgStyledText> or the Hippius button. If you'd rather have the controls on screen, turn on **Float the recording controls** in the Hippius tab and keep them outside the area. **A whole screen** includes the small folded controls; share a single window instead if that matters.
:::

On the Free plan a recording stops on its own at 5 minutes, and the timer counts down the last minute. Paused time doesn't count. See [Plans and Limits](/use/browser-extension/plans).

## When you stop

A small card in the corner shows Hippius encrypting and saving the recording. When it's done, the link is on your clipboard and the recording opens in a new tab so you can watch it back (you can turn that off in [Settings](/use/browser-extension/captures#settings)). [When your link is ready](/use/browser-extension/sharing#when-your-link-is-ready) explains the card.

## If something goes wrong, your recording is safe

The recording is written to your computer as you record, a second at a time, so if your browser closes in the middle of one, what you recorded until then is kept. If it can't be saved straight away, for example because you're offline, it waits in your browser until it can. See [If a capture isn't saved yet](/use/browser-extension/captures#if-a-capture-isnt-saved-yet).

## Next

Your video's link is on your clipboard. [Share a Link and See Who Watched](/use/browser-extension/sharing) shows who can open it and how to see who watched.
