---
id: captures
title: Your Captures
sidebar_label: Your Captures
slug: /use/browser-extension/captures
description: Find your screenshots and recordings in the Hippius extension's popup and in your Hippius Drive, delete a capture and its links, save a capture that couldn't upload, and change what happens after each capture.
---

import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

Everything you capture is kept in your Hippius Drive, and the extension's popup is the quickest way back to it. This page covers where your captures live, how to tidy them up, and what happens when one can't be saved straight away.

## The popup

Click the Hippius button in your toolbar to open the popup. At the top are the three things you'll do most: <BgStyledText>Record</BgStyledText>, <BgStyledText>Screenshot</BgStyledText> and <BgStyledText>Upload</BgStyledText>. Upload sends files from your computer to your captures drive the same way as a capture, encrypted and with a link copied, which is handy for a file you already have. Underneath is the list of your captures, and your account is at the bottom, with buttons to open Captures and your Drive in the console.

<Screenshot src="/img/extension/popup-captures.png" alt="The connected popup with Record, Screenshot and Upload, and a list of captures showing views, reactions and comments" dark raw />

The list shows everything in your captures drive, newest first and grouped by day, whether you captured it here, in the Hippius desktop app or in the console. Captures have their real file names, named after the moment you took them, such as <code>Recording 2026-10-22 at 15.46.24.mp4</code>. Filter by recordings or screenshots, or search by name. Searching by time works too, so "recording at 3:46" finds that recording.

Click a capture to open it in the console. Point at a row for <BgStyledText>Copy link</BgStyledText>, and use the three dots for everything else:

<Unordered>
  <li><strong>View in Hippius</strong> opens it in the console.</li>
  <li><strong>View insights</strong> shows who watched it and what they said (see <a href="/use/browser-extension/sharing#see-who-watched">See who watched</a>).</li>
  <li><strong>Edit</strong> opens a screenshot in the console's <a href="/use/captures/edit">editor</a>.</li>
  <li><strong>Download</strong> saves a copy to your computer.</li>
  <li><strong>Delete from Drive</strong> deletes the file, as explained below.</li>
</Unordered>

## Where your captures live

Your captures are files in your **captures drive**, a drive in your Hippius Drive that holds only screenshots and recordings. The extension, the Hippius console and the Hippius desktop app all save to the same one, so a recording you made in your browser at work shows up on your laptop at home, and the other way round.

To see them outside the extension, sign in at [console.hippius.com](https://console.hippius.com) and open **Captures** in the sidebar, under Drive. You can also open the captures drive itself, next to your other drives. A capture is an ordinary file there, so you can rename, move, download or share it like any other. [Where your captures go](/use/captures#where-your-captures-go) has more.

## Delete a capture

A share link keeps its own encrypted copy of the file, so on its own it would keep working after the file is deleted. To avoid that, <BgStyledText>Delete from Drive</BgStyledText> first turns off the links this browser made for the capture, then deletes it. The confirmation says so.

Other live links for a file with the same name, made in the console, the desktop app or another browser, are left on, because they might belong to a different file. The popup tells you how many are still on and offers to turn them off too, asking once more before it turns off exactly those links.

On the Free plan, deleting a recording also frees one of your 25 recording slots straight away.

## Not saved yet

Nothing is lost when a capture can't be saved straight away, for example because you're offline. It stays in your browser, encrypted, and sits at the top of the popup's list under **Not saved yet**, with the reason and what to do:

<Unordered>
  <li><BgStyledText>Retry</BgStyledText> when you were offline or the Drive didn't answer. Hippius also tries again by itself when your connection comes back and whenever you open the popup. If the file already reached your Drive and only the link is missing, Retry just makes the link.</li>
  <li><BgStyledText>Connect</BgStyledText> when your session has ended. Once you've connected again, the capture saves.</li>
  <li><BgStyledText>Upgrade</BgStyledText> when your Drive is full, or when your account has no plan. Once you've made room or picked a plan, Retry saves it.</li>
</Unordered>

<Screenshot src="/img/extension/popup-not-saved.png" alt="The popup with a screenshot under Not saved yet, with the reason and a Retry button" dark raw />

A waiting capture opens again only while the account that took it is connected, so it never ends up in someone else's Drive.

## Settings

The gear at the top of the popup opens Settings. They're the same settings as <BgStyledText>Options</BgStyledText> on the capture bar, and they're kept in this browser:

<Unordered>
  <li><strong>After capture</strong>: whether to copy a share link, whether to open the link after recordings (on unless you turn it off), and whether to open it after screenshots (off unless you turn it on).</li>
  <li><strong>Screenshots</strong>: the timer.</li>
  <li><strong>Recordings</strong>: the countdown, and whether to use the microphone and the camera.</li>
  <li><strong>Keyboard shortcuts</strong>, with <BgStyledText>Set</BgStyledText> for any that have no keys.</li>
  <li><strong>Account</strong>, with <BgStyledText>Disconnect</BgStyledText>.</li>
</Unordered>

<Screenshot src="/img/extension/popup-settings.png" alt="The extension's Settings: after capture, screenshots, recordings and keyboard shortcuts" dark raw />
