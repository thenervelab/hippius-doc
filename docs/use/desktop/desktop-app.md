---
id: desktop-app
title: Hippius Desktop App
sidebar_label: Desktop App
slug: /use/desktop/desktop-app
---

import Ordered from '@site/src/components/Ordered';
import DownloadLinks from '@site/src/components/DownloadLinks';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';

## Introduction

Welcome to the Hippius Desktop App documentation!
This tool enables you to store, access, sync and manage files securely on a decentralized blockchain network using Arion decentralized storage. Whether you’re new to decentralized storage or an experienced user, this guide will walk you through installing, using, and customizing the app to suit your needs. Let’s get started.

## Benefits of using the Desktop App

<Ordered>
  <li>Fast access to files with real-time sync across devices.</li>
  <li>All files are encrypted on your device before syncing.</li>
  <li>Sync multiple folders simultaneously with independent controls.</li>
  <li>Detect and resolve file conflicts with full control.</li>
  <li>Easy to use with a clean, modern interface.</li>
</Ordered>

![Desktop App Files screen](/img/desktop/desktop-benefits.png)

## Installing the Desktop App

To install the desktop app, click on one of the suitable download link below. Once downloaded, follow the steps below.

<DownloadLinks/>

### Process

<Ordered>
<li> Download the installation file.</li>
<li>Open <BgStyledText>HippiusSetup.exe</BgStyledText> on Windows, <BgStyledText>Hippius.dmg</BgStyledText> on Mac, or <BgStyledText>Hippius.deb</BgStyledText> on Linux.</li>

<li> Follow the instructions on screen.</li>
<li>After installation is complete, find the <Icon /> icon to open the app.</li>
</Ordered>

### macOS: First Time Launch Security Prompt (Beta)

:::info Beta Notice
During the beta period, the Hippius Desktop App is not yet signed with an Apple Developer certificate. This means macOS Gatekeeper will flag the app the first time you open it. Once we obtain an Apple notarization license, this step will no longer be required.
:::

When you first open the app on macOS, you will see a prompt:

> **"Hippius" Not Opened**
>
> Apple could not verify "Hippius" is free of malware that may harm your Mac or compromise your privacy.
>
> \[Move to Trash\] \[Done\]

<div style={{marginTop: '1.5rem'}}>

![macOS Gatekeeper prompt](/img/desktop/macos-gatekeeper-prompt.png)

</div>

<div style={{marginTop: '1.5rem'}}>

**Do not click "Move to Trash".** Click <BgStyledText>Done</BgStyledText> to dismiss the prompt, then follow these steps:

</div>

<Ordered>
<li>Open <BgStyledText>System Settings</BgStyledText> (Apple menu → System Settings).</li>
<li>Navigate to <BgStyledText>Privacy & Security</BgStyledText>.</li>
<li>Scroll down to the **Security** section. You will see a message: <em>"Hippius" was blocked to protect your Mac.</em> Click <BgStyledText>Open Anyway</BgStyledText>.</li>
</Ordered>

![System Settings, Privacy and Security showing Open Anyway](/img/desktop/macos-privacy-security-allow.png)

A final confirmation dialog will appear:

> **Open "Hippius"?**
>
> Apple is not able to verify that it is free from malware that could harm your Mac or compromise your privacy. Don't open this unless you are certain it is from a trustworthy source.
>
> \[Move to Trash\] \[Open Anyway\] \[Done\]

<div style={{marginTop: '1.5rem'}}>

![macOS confirmation dialog to open Hippius](/img/desktop/macos-open-anyway-confirm.png)

</div>

<div style={{marginTop: '1.5rem'}}>

Click <BgStyledText>Open Anyway</BgStyledText>. You may need to enter your password or use Touch ID to confirm. The app will now launch normally. You only need to do this once.

</div>


## Set up Sync

Hippius continuously monitors your synced folders and automatically synchronizes changes with the Hippius network. You can sync **multiple folders** at the same time, each with its own status and controls.

On first launch, you will choose a sync folder and set an encryption password. After that, adding files to your synced folders is all you need to do. The rest happens automatically. See the [Using the App](using-the-app) guide for detailed setup instructions.


