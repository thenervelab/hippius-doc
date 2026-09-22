---
id: camera-uploads
title: Camera Uploads
sidebar_label: Camera Uploads
slug: /use/mobile/camera-uploads
description: Back up the photos and videos on your phone to Hippius automatically, encrypted before they leave the device.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

Camera Uploads copies the photos and videos on your phone into your Hippius Drive, on its own, encrypted on the device before anything is sent.

Turn it on once and you can stop thinking about it. New photos are picked up as you take them. Until it is set up, Overview (and Drive) may show a short promo to get started.

<Screenshot src="/img/mobile/camera-uploads.png" alt="The Camera Uploads settings screen" dark raw />

## Turning it on

<Ordered>
  <li>Open <strong>Settings</strong> and tap <strong>Camera Uploads</strong> (or use the promo on Overview).</li>
  <li>Turn it on and give the app access to your photos when your phone asks.</li>
  <li>Choose which albums to include: everything, or just the ones you pick.</li>
  <li>Choose the <strong>Back up to</strong> folder in Drive. New installs default to a folder named <strong>Camera Uploads</strong>; you can pick another.</li>
  <li>Optionally include videos, and on iOS decide how HEIC and Live Photos are stored.</li>
</Ordered>

We start with what is already on your phone, so the first run takes a while if you have years of photos. After that it is only new ones, which is quick.

You need an active storage entitlement to enable Camera Uploads. Without one, the toggle will not stay on.

:::info
Grant **full** access to your photos rather than selecting individual ones. With limited access your phone only hands us the photos you picked, so nothing else is backed up, and Live Photos can lose their video and be stored as stills.
:::

## Keeping it running

Backing up happens in the background, and phones are strict about what they let run there.

On Android, battery optimisation can pause Camera Uploads whenever you are not using the app. If we detect that, we show you how to turn it off for Hippius (**Continuous camera uploads**) so uploads can keep going on their own.

Leaving the app open on a large first backup is the fastest way through it.

## Choosing when it uploads

<Unordered>
  <li><strong>Upload on Wi-Fi only</strong> (in Settings) pauses everything on mobile data and resumes when you are back on Wi-Fi.</li>
  <li><strong>Backup notifications</strong> (in Settings) tells you when a backup finishes, so you are not checking on it.</li>
</Unordered>

## What happens to the photos

They land in the Drive folder you chose, like anything else you upload. Browse them on your phone, in the console, or in the desktop app, and download them anywhere you are signed in.

Backing up does not remove anything from your phone. Deleting a photo from your camera roll afterwards leaves the copy in Hippius alone.
