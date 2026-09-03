---
id: unlock-password
title: Unlock Password
sidebar_label: Unlock Password
slug: /use/console/unlock-password
description: Set up your unlock password directly in the console, and restore access with your recovery seed if you forget it.
draft: true
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

Your unlock password protects the key that encrypts your files. The console asks for it the first time you upload, preview or download a file in a session, then keeps the key in memory until you close the tab.

You can now set it up in the console itself. You no longer need to install the desktop app first.

## Setting It Up

The console offers this the first time you do something that needs your encryption key.

<Ordered>
  <li>The console checks whether your account already uses an encryption seed.</li>
  <li>If it does not, you are shown a new 12 word recovery seed. Write it down before continuing.</li>
  <li>Choose an unlock password.</li>
  <li>The console encrypts your seed with that password and saves it.</li>
</Ordered>

<Screenshot src="/img/console/unlock-password/setup.png" alt="Setting up an unlock password" dark />

:::danger Your recovery seed is shown once
Those 12 words are the only way back into your files if you forget your unlock password. Write them down somewhere offline. We do not keep a copy, and neither the password nor the seed can be recovered for you.
:::

### If your account already has files

An account that already holds encrypted files or shared drives already has a seed, and creating a second one would strand everything encrypted under the first.

So if the console finds existing data, it does not create a seed. It asks for your original recovery seed instead, and verifies it by actually decrypting one of your files before saving anything. If the seed you enter does not open your files, nothing is changed.

## If You Forget Your Password

Choose <BgStyledText>Restore access</BgStyledText> and enter your 12 word recovery seed. The console verifies it against your existing files and then lets you set a new unlock password.

<Screenshot src="/img/console/unlock-password/restore.png" alt="Restoring access with a recovery seed" dark />

Three outcomes are possible, and they are deliberately kept distinct:

| What you see | What it means |
|---|---|
| Access restored | The seed opened your files. Set a new password and carry on. |
| This seed does not decrypt your files | The seed is wrong. Your existing backup was not touched. |
| We couldn't verify this seed | Something went wrong reading your files, so we could not check either way. Try again. This is not a statement that your seed is wrong. |

That third case matters: a network problem is never reported as a wrong seed, because "your seed is wrong" is a frightening thing to tell someone who has typed the right one.

## If You Have Lost Both

If you have forgotten your unlock password **and** lost your recovery seed, your encrypted files cannot be recovered. Not by you, and not by us. There is no reset, because there is nothing on our side to reset: we never hold the key.

This is the trade for files nobody but you can read. Keep the seed somewhere you will still have it in a year.

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: where the password is used.</li>
  <li><a href="/learn/encryption">How encryption works</a>: what the password actually protects.</li>
</Unordered>
