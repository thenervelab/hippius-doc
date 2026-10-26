---
id: plans
title: Plans and Limits
sidebar_label: Plans and Limits
slug: /use/browser-extension/plans
description: What the Hippius extension includes on the Free plan (unlimited screenshots, 25 recordings of up to 5 minutes, a small watermark), what paid plans add, and why an account with no plan can't save captures.
---

import Unordered from '@site/src/components/Unordered';
import Screenshot from '@site/src/components/Screenshot';

The extension itself is free. What you can capture depends on your Hippius Drive plan, because that's where your captures are stored. The same rules apply in the extension, the console and the desktop app, and the popup shows which plan you're on when it matters.

## Free plan

Every account that signs in with Google, GitHub or Apple starts on the Free plan, with 10 GB of storage and no card needed. For captures, it includes:

<Unordered>
  <li><strong>Unlimited screenshots</strong> and unlimited share links.</li>
  <li><strong>25 recordings</strong> in total. The popup shows how many you've used.</li>
  <li><strong>Recordings of up to 5 minutes.</strong> In the last minute the timer counts down, and when it reaches zero the recording is saved and shared as if you'd stopped it yourself. Paused time doesn't count.</li>
  <li><strong>A small Hippius mark</strong> in the corner of each capture. It's drawn into the picture before the capture is encrypted, so it stays when you share or download it.</li>
  <li>Share links that start with insights, comments and reactions switched off.</li>
</Unordered>

<Screenshot src="/img/extension/popup-free-plan.png" alt="The popup on the Free plan: 3 of 25 recordings used, with See plans" dark raw />

### When you've used all 25 recordings

Every recording in your captures drive counts toward the 25, wherever you made it and whatever it's called. Screenshots never count. Once you've used all 25, <strong>Record</strong> tells you before anything is recorded, so you never lose a take. Delete an older recording to free a slot, or upgrade.

<Screenshot src="/img/extension/free-plan-limit.png" alt="The message shown when all 25 free recordings are used, with Not now and Upgrade" dark raw />

## Paid plans

A paid Drive plan lifts the recording limits: record as many videos as you like, as long as you like, with no Hippius mark. Links you make get insights, comments and reactions, switched on from the start, so you can see who watched (see [Share and See Who Watched](/use/browser-extension/sharing#see-who-watched)). The only limit is your plan's storage.

Plans are bought in the console. See [Drive plans](/use/console/billing#drive-plans) for how to choose or change one, and [hippius.com/pricing](https://hippius.com/pricing) for prices.

## No plan

Accounts that sign in with a 12-word access key don't come with free storage, so until they pick a plan there's nowhere to save captures. The popup says **No plan** with a link to the plans, and Record doesn't start. If you take a screenshot or upload a file anyway, it's kept in your browser with Upgrade and Retry, and once you've chosen a plan, Retry saves it.

<Screenshot src="/img/extension/popup-no-plan.png" alt="The popup for an access-key account with no plan, saying there's nowhere to save captures, with See plans" dark raw />

## Storage

A capture is a file, so it counts toward your storage like any other: 10 GB on the Free plan, or your paid plan's size. If your Drive fills up, new captures wait in your browser under **Not saved yet** until you make room or upgrade. [Free and Paid Plans](/use/captures/plans) has the full rules, shared by every Hippius app that captures.
