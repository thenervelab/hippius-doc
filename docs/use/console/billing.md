---
id: billing
title: Billing
sidebar_label: Billing
slug: /use/console/billing
description: 6
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

The **Billing** page is where you manage your **credits**, the currency the Hippius platform uses for storage and S3 traffic. **1 credit = $1 USD.**

From here you can top up your balance with TAO, subscribe to a monthly plan (charged via Stripe), and review every credit transaction on your account.

Reach Billing from the sidebar at <BgStyledIconWithText text="Billing" icon="CreditCard" />.

<Screenshot src="/img/console/billing/overview.png" alt="Billing page" dark />

## Your Credit Balance

At the top of the page, a **credits chart** shows your available balance as a large number, with a line chart of your daily credit usage over time. Use the time range selector (**THIS WEEK / LAST 30 DAYS / LAST 60 DAYS / 1 YEAR / MAX**) to change the window. Hover over any point to see the exact usage that day.

The chart updates automatically whenever you top up, subscribe, or consume credits.

<Screenshot src="/img/console/billing/credits-chart.png" alt="Credits chart" dark />

## Topping Up with TAO

The **Deposit panel** sits to the right of the credits chart. Click <BgStyledText>+ Top up Credits</BgStyledText> to open the **Pay with $TAO** dialog. Credits are added at the rate of **$1 = 1 credit**, using the current $TAO price shown in the panel.

The dialog has two modes — choose the one that matches how you hold your TAO:

### Bittensor Wallet

Use this if your TAO is in a browser wallet extension connected to the console.

<Ordered>
  <li>Select the <BgStyledText>Bittensor Wallet</BgStyledText> tab.</li>
  <li>Choose the wallet you want to pay from in the <strong>Wallet</strong> dropdown.</li>
  <li>Enter the dollar amount you want to add. The dialog shows the current $TAO price, the equivalent amount in TAO, and the credits you'll receive.</li>
  <li>Click <BgStyledText>Add Credits</BgStyledText>. Your wallet extension prompts you to sign the transaction.</li>
  <li>Credits are added automatically once the transfer confirms on chain.</li>
</Ordered>

<Screenshot src="/img/console/billing/tao-wallet.png" alt="Pay with TAO — Bittensor Wallet tab" dark />

### Manually

Use this if your TAO is on an exchange or in a wallet that isn't connected to the console.

<Ordered>
  <li>Select the <BgStyledText>Manually</BgStyledText> tab.</li>
  <li>Copy the <strong>SS58 Bittensor Chain</strong> deposit address shown in the dialog.</li>
  <li>Send TAO to that address from any Bittensor wallet or exchange.</li>
  <li>Your credit balance updates automatically at the rate of $1 = 1 credit once the transfer confirms on chain.</li>
</Ordered>

<Screenshot src="/img/console/billing/tao-manual.png" alt="Pay with TAO — Manually tab" dark />

:::warning TAO transfers are irreversible
Once a TAO transaction confirms on the blockchain, it cannot be reversed. Verify the destination address before sending. We cannot recover funds sent to the wrong address.
:::

### Top up Shortcut

The <BgStyledText>+ Top up Credits</BgStyledText> button also appears in your dashboard header and in the upload Insufficient Credits dialog. All of them open the same Pay with $TAO flow.

## Subscription Plans

Below the deposit panel, the **Subscription Plans** section lets you pay by card (via Stripe) on a monthly basis. Each plan gives you a fixed credit allocation every month. This is the only way to pay with a card on Hippius — there is no one-off card top-up.

### The Four Tiers

| Tier             | Best for                                   |
| ---------------- | ------------------------------------------ |
| **Personal**     | Hobby projects and light personal storage. |
| **Professional** | Active personal use with moderate storage. |
| **Business**     | Teams and apps with regular activity.      |
| **Enterprise**   | High volume workloads.                     |

Each plan card shows the monthly credit allocation, the effective storage that buys at current rates, and the dollar equivalent. Scroll through the carousel with the arrow buttons to compare plans. Your active plan is highlighted with a check mark and a styled border.

<Screenshot src="/img/console/billing/plans.png" alt="Subscription plans carousel" dark />

### Subscribing

<Ordered>
  <li>Find the plan you want and click <BgStyledText>Subscribe</BgStyledText>.</li>
  <li>You'll be taken to a Stripe subscription checkout.</li>
  <li>Enter your card details (or use Apple Pay / Google Pay) and confirm.</li>
  <li>Stripe processes the first month's payment immediately and you're returned to Hippius. The plan credits are deposited right away.</li>
</Ordered>

<Screenshot src="/img/console/billing/subscribe.png" alt="Stripe subscription checkout" dark />

### Switching Plans

To move to a different plan, find the new plan card and click <BgStyledText>Subscribe</BgStyledText>. Stripe handles the upgrade or downgrade and prorates the change automatically.

### Cancelling

<Ordered>
  <li>Find your active plan card and click <BgStyledText>Cancel Subscription</BgStyledText>.</li>
  <li>A confirmation dialog summarises what you'll lose: monthly credits and any plan perks.</li>
  <li>Click <BgStyledText>Cancel Subscription</BgStyledText> to continue. You'll be redirected to the Stripe customer portal to complete the cancellation.</li>
</Ordered>

<Screenshot src="/img/console/billing/cancel.png" alt="Cancel subscription dialog" dark/>

Your existing credits stay available until the end of the current billing period. Pay as you go top ups continue to work after cancellation.

## Transaction History

The **Transaction History** table at the bottom of the page shows every credit movement on your account: top ups, subscription charges, usage debits, and refunds.

| Column          | What it shows                                                            |
| --------------- | ------------------------------------------------------------------------ |
| **Date**        | When the transaction occurred.                                           |
| **Type**        | Top up (card or TAO), Subscription, Usage, or Refund.                    |
| **Description** | A short note (payment method, plan name, etc.).                          |
| **Amount**      | Positive (credits added) or negative (credits consumed).                 |
| **Status**      | Pending, Completed, or Failed.                                           |
| **Reference**   | Stripe charge ID, TAO transaction hash, or internal ID with a copy icon. |

Search by description or reference, sort by date or amount, and use pagination to navigate.

<Screenshot src="/img/console/billing/tx-history.png" alt="Transaction history" dark />

## How Credits Are Used

Credits are charged for every metered action:

| Action                   | How it's charged                                                      |
| ------------------------ | --------------------------------------------------------------------- |
| **Drive (HCFS) storage** | Per byte, per minute, based on the storage class.                     |
| **S3 storage**           | Per byte, per minute, with separate rates for traffic and operations. |

If your balance hits zero:

<Unordered>
  <li>New uploads are blocked. The upload dialog shows an Insufficient Credits message with a top up shortcut.</li>
  <li>If the balance stays at zero too long, files may be flagged for deletion. You'll receive email warnings well before that happens.</li>
</Unordered>

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: start uploading once you have credits.</li>
  <li><a href="/use/console/s3">S3 Buckets</a>: set up S3 compatible storage and manage access tokens.</li>
  <li><a href="/use/console/settings">Settings</a>: manage your subscription plan and preferences.</li>
</Unordered>
