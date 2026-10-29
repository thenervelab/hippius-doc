---
id: plans
title: Plans and Limits
sidebar_label: Plans and Limits
slug: /use/browser-extension/plans
description: What the Hippius extension includes on the Free plan (unlimited screenshots, 25 recordings of up to 5 minutes, a small watermark), what paid plans add, and why an account with no plan can't save captures.
---

import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

The extension itself is free. What you can capture depends on your Hippius Drive plan, because that's where your captures are stored. The same rules apply in the extension, the console and the desktop app. The popup's account line shows your plan, for example **Connected · Free plan**, and so does the Account part of Settings.

## Free plan

Every account that signs in with Google, GitHub or Apple starts on the Free plan, with 10 GB of storage and no card needed. For captures, it includes:

<Unordered>
  <li>Unlimited screenshots and unlimited share links.</li>
  <li>25 recordings in total. The popup shows how many you've used, says "1 left" at 24, and turns amber with a lock on Record once all 25 are used.</li>
  <li>Recordings of up to 5 minutes. The timer counts down the last minute, then saves and shares the recording for you. Paused time doesn't count.</li>
  <li>A small Hippius watermark in the corner of each screenshot and recording. It's drawn into the picture before the capture is encrypted, so it stays when you share or download it.</li>
  <li>Share links without insights, comments or reactions. Those are part of the paid plans, and links you make after upgrading have them switched on.</li>
</Unordered>

<Screenshot src="/img/extension/popup-free-plan.png" alt="The popup on the Free plan: 3 of 25 recordings used, with See plans" dark raw />

### When you've used all 25 recordings

Every recording in your captures drive counts toward the 25, wherever you made it and whatever it's called. Screenshots never count. Once you've used all 25, Record tells you before anything is recorded, so you never lose a take. Delete an older recording to get a recording back straight away, or upgrade.

<Screenshot src="/img/extension/free-plan-limit.png" alt="The message shown when all 25 free recordings are used, with Not now and Upgrade" dark raw />

## Paid plans

A paid Drive plan lifts the recording limits: record as many videos as you like, as long as you like, with no watermark. Links you make get insights, comments and reactions, switched on from the start, so you can see who watched (see [See who watched](/use/browser-extension/sharing#see-who-watched)). The only limit is your plan's storage.

Plans are bought in the console. See [Drive plans](/use/console/billing#drive-plans) for how to choose or change one, and [hippius.com/pricing](https://hippius.com/pricing) for prices.

## No plan

Accounts that sign in with Google, GitHub or Apple get the Free plan. An account that comes with no free storage, such as one that signs in with a 12-word access key, has nowhere to save captures until it picks a plan.

The popup says **No storage plan yet** with a <BgStyledText>Choose a plan</BgStyledText> button, and Record, Screenshot and Upload show a lock. Hippius tells you before a capture is taken rather than after, so you never record something that can't be saved.

<Screenshot src="/img/extension/popup-no-plan.png" alt="The popup for an access-key account with no plan, saying there's nowhere to save captures, with See plans" dark raw />

## Storage

A capture is a file, so it counts toward your storage like any other: 10 GB on the Free plan, or your paid plan's size. If your Drive fills up, new captures wait in your browser under **Not saved yet** until you make room or upgrade ([what to do](/use/browser-extension/captures#if-a-capture-isnt-saved-yet)). [Free and Paid Plans](/use/captures/plans) has the full rules, shared by every Hippius app that captures.

## Next

Wondering what happens to your captures once they're saved? [Privacy and Permissions](/use/browser-extension/privacy) explains what's encrypted and what isn't.
