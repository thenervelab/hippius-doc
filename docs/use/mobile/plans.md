---
id: plans
title: Plans and Storage
sidebar_label: Plans and Storage
slug: /use/mobile/plans
description: What your Drive plan gives you, what the mobile app shows about it, and how to subscribe to, change or cancel a plan in the Hippius Console.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

Your Drive plan sets how much encrypted storage your account has. One plan covers your whole account, on every device. Files you upload by hand, photos backed up by Camera Uploads, and anything you add from the console or the desktop app all count toward it.

The app shows which plan you are on and how much of it you have used. To subscribe to a plan, change it or cancel it, use the [Hippius Console](https://console.hippius.com) in a web browser. The app picks up the change by itself.

## Which plan you start with

That depends on how you sign in:

| How you sign in | What you get |
| --- | --- |
| Email, Google, GitHub or Apple | The **Free Drive Plan**: 10 GB of encrypted storage, with no payment details needed. You can upload, back up your photos and share links straight away. |
| Access key (your 12-word recovery phrase) | No free storage. Subscribe to a plan in the console before your first upload. |

When you need more space, paid plans go up to many terabytes and are billed monthly. Plans and prices change from time to time, so the console always has the current list. [Drive plans](/use/console/billing#drive-plans) in the console guide explains how paying works, including topping up your balance by card or with TAO.

## What the app shows {#what-the-app-shows}

Two cards on **Overview** sum up your plan and your storage. Tap either one for more detail.

<Screenshot src="/img/mobile/plan-card.png" alt="The Storage and Plan cards on the Overview screen" dark raw phone />

### Your plan {#your-plan-in-the-app}

The **Plan** card shows your plan's name, for example **Free** or **Plus**, and how much storage it gives you, such as **≈ 2 TB Storage**.

Tap it to open the **Account** screen. You can also get there from the **Account** card in Settings. Its **Current Plan** card shows your plan's full name, for example **Free Drive Plan**, and its storage. Underneath, the app notes that managing subscriptions isn't available in the Hippius mobile app.

<Screenshot src="/img/mobile/plans/account.png" alt="The Account screen with the Current Plan card" dark raw phone />

### Your storage {#your-storage-in-the-app}

The **Storage** card is on Overview, and again at the top of Settings. It shows:

<Unordered>
  <li>How full your Drive is, as a percentage.</li>
  <li>How much you have used out of your plan's total, for example <strong>38.33MB / 2TB</strong>.</li>
  <li>A bar that turns <strong>amber</strong> when you have used 80% of your storage and <strong>red</strong> at 95%.</li>
</Unordered>

While the numbers load, the card reads **Calculating storage..**. If they can't be read, for example while you are offline, it reads **Usage unavailable** rather than guessing.

Tap the card to open the **Storage** screen, which shows what is using your space:

<Unordered>
  <li>A ring chart with how much you have used out of your plan's total.</li>
  <li>How much space goes to <strong>Videos</strong>, <strong>Images</strong>, <strong>Files</strong> and <strong>Others</strong>, as a share and a size. Tap a row to highlight it in the chart.</li>
  <li><strong>Upload sources</strong>: how many of your files were added from the <strong>Desktop</strong> app, the <strong>Console</strong> and <strong>Mobile</strong>. <strong>Other</strong> covers files uploaded before Hippius started tracking where uploads come from.</li>
  <li>A <strong>Notice</strong> once you pass 80% of your storage, and a stronger one at 95% that says exactly how much space is left.</li>
</Unordered>

It is the quickest way to see whether photos or videos are filling your Drive.

<Screenshot src="/img/mobile/plans/storage.png" alt="The Storage screen with the storage breakdown" dark raw phone />

## Subscribing to a plan {#subscribing-to-a-plan}

You subscribe in the console, in your phone's browser or on a computer. It is the same account either way.

<Ordered>
  <li>Open <a href="https://console.hippius.com">console.hippius.com</a> in a web browser.</li>
  <li>Sign in <strong>the same way you sign in to the app</strong>: the same Google, GitHub or Apple account, or the same access key. A different one opens a different Hippius account, and the plan would not reach the app. See <a href="/use/console/getting-started#signing-in">Signing In</a> in the console guide.</li>
  <li>Open <strong>Billing</strong> from the sidebar. On the <strong>Drive</strong> card, click <BgStyledText>Upgrade</BgStyledText>. It reads <BgStyledText>Subscribe</BgStyledText> if your account has no plan yet. This opens the <strong>Storage Plans</strong> page.</li>
  <li>Pick the plan you want and click <BgStyledText>Subscribe</BgStyledText> on its card.</li>
  <li>Choose how to pay: <strong>Card</strong>, through Stripe, or <strong>Account balance</strong>, if you have already topped up your balance.</li>
  <li>Click <BgStyledText>Make Payment</BgStyledText> and finish paying. After a card payment the console shows the plan activating, which usually takes under a minute.</li>
  <li>Go back to the Hippius app. It checks your plan again whenever it comes back to the screen, so the <strong>Plan</strong> and <strong>Storage</strong> cards update within a few seconds.</li>
</Ordered>

<Screenshot src="/img/console/billing/drive-plans.png" alt="The Storage Plans page in the Hippius Console" dark raw />

Your files stay where they are, and nothing is uploaded again. The new plan only changes how much you can store: the **Plan** card shows its name, and the **Storage** card measures your usage against the new total.

## Changing or cancelling your plan {#changing-or-cancelling-your-plan}

Both happen on the console's **Storage Plans** page. Open **Billing**. While you are on a paid plan, the button on the Drive card reads <BgStyledText>Manage plan</BgStyledText>.

<Unordered>
  <li><strong>Moving to a bigger or smaller plan.</strong> Click <BgStyledText>Upgrade</BgStyledText> or <BgStyledText>Downgrade</BgStyledText> on the plan you want and confirm. The change is paid from your account balance and takes effect straight away. You can't move to a plan smaller than what you already store, so free up space first.</li>
  <li><strong>Cancelling.</strong> Click <BgStyledText>Cancel subscription</BgStyledText> on your current plan, then <BgStyledText>Cancel plan</BgStyledText> to confirm. Accounts that sign in with email, Google, GitHub or Apple go back to the Free Drive Plan. Access key accounts are left with no storage.</li>
</Unordered>

The app picks up either change the next time you open it.

:::danger Access key accounts without a plan lose their files after 30 days
Only access key accounts can end up with no plan, because every other account falls back to the Free Drive Plan. Without a plan, the account can't upload anything new, and after 30 days the files already in its Drive are **permanently deleted**. Subscribing to any plan stops the clock.
:::

## When your storage is full {#when-your-storage-is-full}

The app warns you before you run out. The **Storage** bar turns amber at 80% and red at 95%, and the Storage screen shows how much space is left.

When your Drive is full, new uploads and Camera Uploads stop. To carry on, either:

<Unordered>
  <li><strong>Free up space.</strong> Delete files you no longer need. See <a href="/use/mobile/drive#deleting">Deleting</a>.</li>
  <li><strong>Get more space.</strong> Move to a bigger plan in the console. See <a href="#changing-or-cancelling-your-plan">Changing or cancelling your plan</a>.</li>
</Unordered>

Then retry anything that failed from **Your Uploads**. See [Following the backup](/use/mobile/camera-uploads#following-the-backup).

## Where to next

<Unordered>
  <li><a href="/use/console/billing">Billing</a> (console guide): plans, prices, topping up and transaction history.</li>
  <li><a href="/use/mobile/camera-uploads">Camera Uploads</a>: back up your photos automatically.</li>
  <li><a href="/use/mobile/settings">Settings</a>: your account, storage breakdown and preferences.</li>
</Unordered>
