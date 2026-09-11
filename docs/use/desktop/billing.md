---
id: billing
title: Billing
sidebar_label: Billing
slug: /use/desktop/billing
description: Pick a storage plan, pay by card or credits, top up your balance, and manage renewals from the Billing page in the Hippius desktop app.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

**Billing** is the one place in the desktop app where you manage the money side of your account: the **storage plan** that decides how much Drive space you have, and the **credit balance** that can pay for it.

Open it from the account avatar in the top bar, choose <BgStyledIconWithText text="Settings" icon="Settings" />, then <BgStyledIconWithText text="Billing" icon="Billing" /> in the settings sidebar.

:::info A plan and credits are two different things
Your **plan** grants storage. **Credits** are a dollar balance on your account (1 credit = $1) that can pay for a plan and for other Hippius services such as virtual machines. Adding credits on its own does not give you more Drive space. Only a bigger plan does that.
:::

{/* SCREENSHOT NEEDED: billing-settings.png + billing-settings-dark.png
    Settings -> Billing, the whole page in one shot: Total Credits and
    TAO Deposit Address side by side on top, Subscription plans below.
    Capture in light and dark mode.
<Screenshot src="/img/desktop/billing-settings.png" alt="The Billing page in Settings" dark /> */}

Every prompt in the app that asks you to spend money lands here. The <BgStyledText>Upgrade</BgStyledText> and <BgStyledText>Top up</BgStyledText> buttons in the page header, the "not enough storage" dialog, and the banners on Drive all open this same page, so there is only ever one screen to learn.

## What is on the page

| Section                 | What it is for                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| **Total Credits**       | Your current credit balance, when it was last refreshed, and a button to add more.                       |
| **TAO Deposit Address** | Your Bittensor address for funding the account with TAO.                                                 |
| **Subscription plans**  | The storage plans you can be on, which one you are on now, and the buttons to subscribe, change or cancel. |

## Total Credits

The **Total Credits** card shows your balance. A new or unfunded account reads as `0 Credits`.

<Unordered>
  <li>Click the <strong>refresh</strong> icon to pull the balance again. The "Last updated" line tells you how recent the number is.</li>
  <li>Click <BgStyledText>Add Credits</BgStyledText> to top up. This opens the Hippius console in your browser, where you can pay with TAO or by card.</li>
</Unordered>

:::info Buying credits happens in the console
The desktop app does not sell credits directly. <BgStyledText>Add Credits</BgStyledText> hands you to the console's top-up flow, and your balance here updates the next time it refreshes. See [Console Billing](/use/console/billing) for that flow in full.
:::

## TAO Deposit Address

The **TAO Deposit Address** card shows your **SS58 Bittensor Chain** address. Send TAO to it from any Bittensor wallet or exchange and your credit balance grows at the rate of **$1 = 1 credit** once the transfer confirms on chain.

Click the **copy** button beside the address to copy the whole value. The address is shortened in the middle to fit the card, so copy it rather than typing what you see.

:::warning TAO transfers cannot be undone
Once a TAO transaction confirms on chain it is final. Check the destination address before you send. We cannot recover funds sent to the wrong address.
:::

## Storage plans

The **Subscription plans** section is the plan catalogue. Plans are loaded live from our servers, so the names, sizes and prices you see in the app are always the current ones. At the time of writing they are:

| Plan                | Storage | Price      |
| ------------------- | ------- | ---------- |
| **Free Drive Plan** | 10 GB   | Free       |
| **Starter**         | 500 GB  | $4 / month |
| **Plus**            | 2 TB    | $7 / month |
| **Max**             | 10 TB   | $22 / month |
| **Scale**           | 25 TB   | $50 / month |

The desktop app bills **monthly**. Annual billing is offered in the [Hippius console](https://console.hippius.com/dashboard/storage/drive/plans).

{/* SCREENSHOT NEEDED: billing-plans.png + billing-plans-dark.png
    The Subscription plans grid on its own, wide enough to show all five
    cards with one of them in the subscribed state (Cancel subscription on
    the active card, Upgrade / Downgrade on the others).
<Screenshot src="/img/desktop/billing-plans.png" alt="Storage plan cards" dark /> */}

### What a plan card shows

<Unordered>
  <li>The <strong>plan name</strong> and its <strong>monthly price</strong>, or "Free" for the free plan.</li>
  <li>How much <strong>storage on Hippius</strong> the plan includes.</li>
  <li>A <strong>Features</strong> list: automatic renewal, a shared team drive on Plus, Max and Scale, and the freedom to change or cancel at any time.</li>
  <li>One <strong>button</strong>, which changes with your situation: <BgStyledText>Subscribe</BgStyledText>, <BgStyledText>Upgrade</BgStyledText>, <BgStyledText>Downgrade</BgStyledText>, or <BgStyledText>Cancel subscription</BgStyledText> on the plan you are on.</li>
</Unordered>

The **Shared team drive** line is greyed out with a "Coming soon" note. Those plans do include it, we have just not switched the feature on yet.

While you hold a paid plan, the Free card reads **Default Plan**. That is the plan you fall back to if you cancel, not a second plan you are on.

### The free plan and how you signed in

If you signed in with **Google, GitHub or Apple**, your account includes the Free Drive Plan and you always have 10 GB to fall back on.

If you signed in with an **access key (a seed phrase)**, there is no included allowance. The free card is not shown to you at all, because it is not something you can take, and the app tells you so wherever a plan is offered:

<Unordered>
  <li>An empty Drive says "You do not have a storage plan yet" instead of "You are on the Free plan".</li>
  <li>A red banner on the Overview and Drive pages warns that your account has no storage, that nothing can be uploaded until you subscribe, and that files already uploaded are permanently deleted after <strong>30 days</strong> without a plan.</li>
  <li>Cancelling warns that you will be left without a storage plan, rather than promising a fallback that does not exist.</li>
</Unordered>

## Subscribing to a plan

<Ordered>
  <li>Find the plan you want and click <BgStyledText>Subscribe</BgStyledText>.</li>
  <li>A confirmation appears with the plan name and price, and a <strong>Pay with</strong> chooser. Pick <strong>Card</strong> or <strong>Credits</strong>.</li>
  <li>Click <BgStyledText>Make Payment</BgStyledText>.</li>
</Ordered>

{/* SCREENSHOT NEEDED: billing-subscribe.png + billing-subscribe-dark.png
    The subscribe confirmation with the "Pay with" chooser: the Card tile
    (Stripe mark + card brand marks) and the Credits tile (coin icon +
    balance chip) side by side, one of them selected.
<Screenshot src="/img/desktop/billing-subscribe.png" alt="Choosing how to pay for a plan" dark /> */}

### Paying by card

Card is selected by default, because it works whatever your balance is.

Choosing it opens **Stripe Checkout in your browser**. The app shows a "Finish your payment in the browser" card while you are away, which you can close at any time: the payment is not tied to that dialog. Once Stripe takes the payment, the credits are minted, the plan is bought with them, and your subscription appears in the app on its own.

Your card is kept at Stripe and funds future renewals.

### Paying from credits

Choosing **Credits** charges the plan straight to your Hippius balance at **1 credit = $1**. The tile shows what you have available.

If your balance will not cover the plan, the balance chip turns red, a <BgStyledText>Top up</BgStyledText> link appears beside it, and <BgStyledText>Make Payment</BgStyledText> stays disabled until you either top up or switch to Card. We deliberately leave the option selectable so you can see how far short you are and fix it from the same place.

### While it goes through

After you confirm, the app shows **Processing**, then waits for the chain to agree that your plan is live. That usually takes seconds. When it lands you get a confirmation screen naming your new plan, and <BgStyledText>Continue</BgStyledText> returns you to Billing.

If the chain is slow, the app stops waiting after a minute and tells you it will catch up shortly rather than spinning forever. Your payment is not lost, and the plan shows up once the network confirms it.

{/* SCREENSHOT NEEDED: billing-subscribed.png + billing-subscribed-dark.png
    The success screen: "You're subscribed to <Plan> Plan" with the
    storage and Access & Sync perks and the Continue button.
<Screenshot src="/img/desktop/billing-subscribed.png" alt="Plan subscribed confirmation" dark /> */}

## Changing plan

To move to a different size, click <BgStyledText>Upgrade</BgStyledText> or <BgStyledText>Downgrade</BgStyledText> on the plan you want and confirm.

A change is made against the subscription you already have, so there is no payment chooser: it settles from your credit balance on the existing plan's rail.

:::warning A downgrade has to fit
We refuse a downgrade if you are already storing more than the smaller plan holds. Remove enough files to get under the new limit first, then downgrade.
:::

## Cancelling

<Ordered>
  <li>On the plan you are on, click <BgStyledText>Cancel subscription</BgStyledText>.</li>
  <li>Read the confirmation. It tells you exactly what you drop to.</li>
  <li>Click <BgStyledText>Cancel subscription</BgStyledText> to go ahead, or <BgStyledText>Keep my plan</BgStyledText> to back out.</li>
</Ordered>

What happens next depends on your account:

<Unordered>
  <li><strong>Accounts with the free tier</strong> (signed in with Google, GitHub or Apple) go back to the Free Drive Plan and its 10 GB. If you are storing more than that, uploads pause until you are back under the limit. Nothing is deleted.</li>
  <li><strong>Access key accounts</strong> are left with no storage plan at all. Uploads stop, and files already stored are removed after 30 days without a plan.</li>
</Unordered>

Your credits are untouched either way, and you can subscribe again at any time.

{/* SCREENSHOT NEEDED: billing-cancel.png + billing-cancel-dark.png
    The Cancel subscription confirmation dialog showing the "back to the
    Free plan" wording, with the Cancel subscription / Keep my plan buttons.
<Screenshot src="/img/desktop/billing-cancel.png" alt="Cancel subscription confirmation" dark /> */}

## Plans bought somewhere else

If you bought your plan through the App Store, Google Play, or a Stripe billing portal, the desktop app cannot change it. The plan buttons are disabled and hovering one tells you where to manage it instead, for example "Managed in the App Store".

Cancel or change the plan wherever you bought it, and the desktop app picks up the new state.

## Your plan in the app header

You do not have to open Billing to see how you are doing. The header on Overview, Drive and other pages carries a plan card with two lines:

<Unordered>
  <li>The <strong>name of your plan</strong>, or "Active Plan" if we do not have a name for it, plus a short warning when something needs attention.</li>
  <li>A <strong>usage bar</strong> with how much of your storage you have used. It is blue normally, amber from 80% full, and red from 95%.</li>
</Unordered>

Beside it, one button appears only when there is something worth doing:

<Unordered>
  <li><BgStyledText>Upgrade</BgStyledText> when you have no plan, or your plan is 80% full or more. More space always means a bigger plan, so we never point you at credits here.</li>
  <li><BgStyledText>Top up</BgStyledText> when your plan renews from credits and your balance will not cover the next renewal. The note beside it says how many days you have.</li>
</Unordered>

A healthy plan with room to spare shows no button at all.

{/* SCREENSHOT NEEDED: billing-plan-chip.png + billing-plan-chip-dark.png
    The header plan card in the "Low credits" state: plan name, amber
    warning note, usage bar, and the Top up button beside it.
<Screenshot src="/img/desktop/billing-plan-chip.png" alt="The plan card in the page header" dark /> */}

## When something is wrong with your plan

Drive shows a banner for the states worth interrupting you over. A plan that is simply working says nothing.

| Banner                                   | What it means                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **You don't have a subscription plan**   | Your account has no storage at all. Nothing can be uploaded, and stored files are deleted after 30 days. Subscribe to clear it. |
| **Setting up your Drive plan**           | Your payment went through and the plan is being provisioned on chain. This normally takes two to three minutes.       |
| **Your Drive plan could not be renewed** | The renewal payment failed. Top up your credits, or fix the payment where the plan is managed.                        |
| **Your Drive plan has been cancelled**   | Your files are still here, but you need an active plan to upload again. This one can be dismissed.                    |

{/* SCREENSHOT NEEDED: billing-no-plan-banner.png + billing-no-plan-banner-dark.png
    The red "You don't have a subscription plan" banner above the Drive
    page content, with its "See storage plans" button.
<Screenshot src="/img/desktop/billing-no-plan-banner.png" alt="No storage plan banner" dark /> */}

## Running out of room or credits

Two different things can stop an upload, and the app says which:

**Not enough storage.** Uploading a file or folder, syncing a folder, or creating a share link can push you past what your plan holds. A dialog says so and offers <BgStyledText>View plans</BgStyledText>, which opens Billing. Credits cannot help here. The answer is a bigger plan, or freeing space.

:::note Sharing uses your storage
Creating a share link uploads a re-encrypted copy of the file, and that copy counts against your plan just like any other upload. See [Shared Links](/use/desktop/shared-links).
:::

**Out of credits.** If the sync engine is refused for want of credits, a banner appears at the top of the page saying what was needed, what you have, and how many files are paused, with a <BgStyledText>Top up</BgStyledText> button. You can dismiss it, and it comes back if it happens again.

## Where to next

<Unordered>
  <li><a href="/use/console/billing">Console Billing</a>: buying credits with TAO or a card, and your full transaction history.</li>
  <li><a href="/use/desktop/drive">Drive</a>: start uploading once you have a plan.</li>
  <li><a href="/use/desktop/shared-links">Shared Links</a>: sharing a file uses your plan's storage.</li>
  <li><a href="/use/desktop/settings">Settings</a>: the rest of what lives alongside Billing.</li>
</Unordered>
