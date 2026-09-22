---
id: billing
title: Billing
sidebar_label: Billing
slug: /use/console/billing
description: Top up your Hippius balance by card or TAO, choose Drive, S3 and Hub plans, pay for them by card or from your balance, and track every charge from the Billing page in the Hippius Console.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## Introduction

**Billing** is where you manage the money side of your account: your **balance**, and the **plans** it pays for. Each product has its own plan, so Drive, S3 and Hub are bought, filled and upgraded separately.

Reach it from the sidebar at <BgStyledIconWithText text="Billing" icon="Billing" />, under **Account**.

:::info Your balance and your plans are two different things
Your **balance** is money on your account, in dollars (1 credit = $1). A **plan** is what gives a product its storage. Topping up does not give you more space on its own. Your balance pays for plans when they renew, and for anything you use by the hour, such as S3 on pay as you go.
:::

{/* Screenshot needed: static/img/console/billing/overview.png (+ overview-dark.png).
    Capture /dashboard/billing on an account with a Drive plan and S3 on pay as you go.
    The current overview.png shows the retired credits page. */}

## What is on the page

| Section                       | What it is for                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------ |
| **Your Balance**              | Your balance now, and a chart of how it has moved.                                               |
| **Top up your balance**       | Add money by card or with TAO, once or every month.                                              |
| **Your services**             | One card per product: the plan you are on, what it costs, when it renews, and a way to change it. |
| **Active subscriptions**      | Every plan you pay for, in one table.                                                            |
| **Transaction history**       | Every top up, plan charge and renewal.                                                           |

## Your Balance

The chart at the top shows your **Account Balance** in dollars, with a line of how it has changed. Pick **THIS WEEK**, **LAST 30 DAYS** or **MAX** to change the window, and hover over any point for the exact figure that day.

Your balance also shows in the top row of the [Overview](/use/console/overview) in Pro view, with a <BgStyledText>+ Top up</BgStyledText> button beside it.

## Topping up your balance

Click <BgStyledText>+ Top up</BgStyledText> in the **Top up your balance** panel. The **Top up** dialog has two tabs: **Card** and **$TAO**.

### By card, once

<Ordered>
  <li>On the <strong>Card</strong> tab, choose <strong>One time</strong>.</li>
  <li>Enter an amount, or pick <strong>$10</strong>, <strong>$25</strong>, <strong>$50</strong> or <strong>$100</strong>. The dialog shows your <strong>Balance after top up</strong>.</li>
  <li>Click <BgStyledText>Pay with card</BgStyledText>. Checkout opens on Stripe.</li>
  <li>Pay, and Stripe brings you back to Billing. Your balance updates within a moment.</li>
</Ordered>

A card top up is between **$10** and **$10,000**. If you close Stripe without paying, nothing is charged.

### By card, every month (auto reload)

Auto reload adds a fixed amount to your balance every month, so your plans keep renewing on time without you having to remember.

<Ordered>
  <li>On the <strong>Card</strong> tab, choose <strong>Auto reload</strong>.</li>
  <li>Under <strong>Add to my balance every month</strong>, pick an amount.</li>
  <li>Click <BgStyledText>Start $X monthly reload</BgStyledText> and complete checkout on Stripe.</li>
</Ordered>

Once it is running, the panel on Billing reads **Auto reload: $X each month**. To change or stop it, open the same tab and click <BgStyledText>Manage in Stripe</BgStyledText>. What a cancelled reload has already added stays on your balance.

### With TAO

Choose the **$TAO** tab. There are two ways to pay, depending on where your TAO is.

**Bittensor Wallet**, if your TAO is in a Talisman or Polkadot.js browser extension:

<Ordered>
  <li>Choose the <strong>Bittensor Wallet</strong> tab and pick your wallet.</li>
  <li>Enter the dollar amount. The dialog shows the current $TAO price and the amount in TAO.</li>
  <li>Click <BgStyledText>Add Credits</BgStyledText> and confirm the transaction in your wallet.</li>
  <li>Your balance updates within a few minutes, once the transfer confirms on chain.</li>
</Ordered>

<Screenshot src="/img/console/billing/tao-wallet.png" alt="Top up with a Bittensor wallet" dark />

**Manually**, if your TAO is on an exchange or in a wallet that is not connected:

<Ordered>
  <li>Choose the <strong>Manually</strong> tab.</li>
  <li>Copy the <strong>SS58 Bittensor Chain</strong> deposit address.</li>
  <li>Send TAO to it from any Bittensor wallet or exchange. Your balance is credited at the market rate in dollars once the transfer confirms.</li>
</Ordered>

<Screenshot src="/img/console/billing/tao-manual.png" alt="Top up with TAO manually" dark />

:::warning Send at least $20 of TAO, to the right address
Paying in TAO starts at **$20**. Anything less is not credited and cannot be refunded. TAO transfers cannot be reversed, so check the address before you send. We cannot recover funds sent to the wrong address.
:::

## Your services

**Your services** has one card for each product, always in the same order: **Drive**, **S3**, **Hub** and **Compute**.

Each card shows the plan you are on, its storage, its price, when it renews and what pays for it (**Saved card** or **Account balance**). The button opens that product's plans page, where you subscribe, change or cancel. Nothing is charged from Billing itself.

| What the card shows         | Button                                      |
| --------------------------- | ------------------------------------------- |
| A paid plan                 | <BgStyledText>Manage plan</BgStyledText>    |
| A free plan                 | <BgStyledText>Upgrade</BgStyledText>        |
| No plan yet                 | <BgStyledText>Subscribe</BgStyledText>, with the cheapest plan shown |
| S3 on pay as you go         | <BgStyledText>Upgrade</BgStyledText>        |
| Compute                     | Coming soon                                 |

A card shows the renewal in red when something needs attention, such as **Payment failed** or **Ends at period end**.

You can also reach each product's plans from the [Overview](/use/console/overview), from the button at the top of the Drive and S3 pages, and from any banner that asks you to upgrade.

## Paying for a plan: card or balance

When you subscribe to a Drive or S3 plan, the confirmation dialog asks how to pay under **Pay with**:

| Option              | What happens                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Card**            | Checkout opens on Stripe and brings you back. Stripe adds the payment to your balance, the plan is paid from it, and your card is kept (by Stripe, not by us) for renewals. |
| **Account balance** | The plan is paid straight from your balance. Your available balance is shown on the option.                                                      |

If your balance will not cover the plan, the dialog says so and offers a **Top up** link, or you can pay by card instead.

Plans renew **monthly**, from your balance. If you paid by card, your saved card tops the balance up before each renewal. Hub plans are paid from your balance only for now. See [Hub plans](/use/console/hub#hub-plans).

## Drive plans

Your Drive plan decides how much encrypted storage your Drive has. Open the plans from the **Drive** card on Billing, or from <BgStyledText>Subscribe</BgStyledText> on the Drive page.

Plans are loaded live, so the console always shows the current catalogue. At the time of writing it is:

| Plan                | Storage | Price       |
| ------------------- | ------- | ----------- |
| **Free Drive Plan** | 10 GB   | Free        |
| **Starter**         | 500 GB  | $4 / month  |
| **Plus**            | 2 TB    | $7 / month  |
| **Max**             | 10 TB   | $22 / month |
| **Scale**           | 25 TB   | $50 / month |

Plus, Max and Scale will also include a **shared team drive**. It is marked as coming soon on the plan cards.

{/* Screenshot needed: static/img/console/billing/drive-plans.png (+ drive-plans-dark.png).
    Capture /dashboard/storage/drive/plans. */}

### Who gets the free plan

Accounts that sign in with **email, Google, GitHub or Apple** get the **Free Drive Plan** from the start, and fall back to it when they cancel a paid plan.

Accounts that sign in with an **access key** do not include free storage. Until you subscribe, the Free card is not offered, and a new file upload asks you to pick a plan first.

### Subscribing

<Ordered>
  <li>Click <BgStyledText>Subscribe</BgStyledText> on the plan you want.</li>
  <li>Choose <strong>Card</strong> or <strong>Account balance</strong> under <strong>Pay with</strong>.</li>
  <li>Click <BgStyledText>Make Payment</BgStyledText>.</li>
  <li>With a card, pay on Stripe. When you come back the page shows <strong>Activating your plan</strong> while it confirms the payment. This usually takes under a minute, and you can leave the page.</li>
  <li>When the plan is live you'll see <strong>You're subscribed to</strong>. Click <BgStyledText>Continue</BgStyledText>.</li>
</Ordered>

If activating takes longer, a **Setting up your Drive plan** banner on Drive keeps you posted. It usually takes two to three minutes.

If a card payment goes through but the plan cannot be activated, the money stays on your balance, and you can subscribe from your balance instead.

### Upgrading and downgrading

Click <BgStyledText>Upgrade</BgStyledText> or <BgStyledText>Downgrade</BgStyledText> on another plan and confirm. A plan change is paid from your balance, starts straight away, and the dialog tells you the price of the first month.

A downgrade is refused if you already store more than the smaller plan holds. Free up space first.

### Cancelling

<Ordered>
  <li>Click <BgStyledText>Cancel subscription</BgStyledText> on your current plan.</li>
  <li>Read what happens next and click <BgStyledText>Cancel plan</BgStyledText>.</li>
</Ordered>

If your account includes the free plan, you go back to the **Free Drive Plan** and its 10 GB. If you signed in with an access key, cancelling leaves you with **no storage**, which starts the 30 day clock below.

### When you have no Drive plan

This applies to accounts with no storage at all: an access key account with no plan, or one whose plan has ended.

<Unordered>
  <li>A red banner on Drive reads <strong>You don't have a subscription plan</strong>.</li>
  <li><strong>Nothing new can be uploaded.</strong> <BgStyledText>+ New File</BgStyledText> asks you to pick a plan instead.</li>
  <li>Files already in your Drive are <strong>permanently deleted after 30 days</strong> without a plan.</li>
</Unordered>

:::danger Subscribe within 30 days to keep your files
Once the 30 days are up, the files are gone and cannot be restored. Subscribing to any plan stops the clock.
:::

### When your Drive is full

An upload that would go over your plan opens **You're out of storage**. Click <BgStyledText>View plans</BgStyledText> to move to a bigger plan, or free up space and try again.

### Plans bought in the mobile app

A plan bought through the **App Store** or **Google Play** shows on Billing like any other, but it has to be changed or cancelled where you bought it. Its buttons read **Managed in** the store's name.

## S3 plans and pay as you go

S3 works two ways: **pay as you go**, where you pay for what you store by the hour, or a **plan**, where you pay a flat monthly price for a block of storage. Open the plans from the **S3** card on Billing, or from <BgStyledText>Upgrade</BgStyledText> on the S3 page.

{/* Screenshot needed: static/img/console/billing/s3-plans.png (+ s3-plans-dark.png).
    Capture /dashboard/storage/s3/plans on a pay as you go account. */}

### Pay as you go

Every account starts on pay as you go. There is nothing to subscribe to.

<Unordered>
  <li>Storage costs <strong>$6 per TB per month</strong>, charged hourly from your balance on what you actually store.</li>
  <li>There is <strong>no cap</strong> and no commitment.</li>
  <li>On the Overview your S3 card shows <strong>Pay as you go</strong> with an <strong>Hourly, no commitment</strong> tag.</li>
</Unordered>

### S3 plans

A plan covers a block of storage for a flat price. You are never billed above it. At the time of writing:

| Plan              | Storage | Price        | Per TB | Saving vs pay as you go |
| ----------------- | ------- | ------------ | ------ | ----------------------- |
| **S3 Pro**        | 10 TB   | $53 / month  | $5.30  | 12%                     |
| **S3 Business**   | 50 TB   | $245 / month | $4.90  | 18%                     |
| **S3 Enterprise** | 100 TB  | $465 / month | $4.65  | 22%                     |

On pay as you go, each plan card also works out what it would mean for you, for example **You pay $X/month today. S3 Pro saves you $Y/month.**, and its button reads <BgStyledText>Switch and save</BgStyledText>.

The **Save N%** badge on the Overview's S3 card is the saving from where you are now to the cheapest plan per TB. From pay as you go that is 22%. On S3 Enterprise there is nothing cheaper, so the badge disappears.

### Subscribing, changing and cancelling

Subscribing works the same way as for Drive: pick a plan, choose **Card** or **Account balance**, and click <BgStyledText>Make Payment</BgStyledText>. Your buckets and keys are unchanged, so there is nothing to reconfigure.

When you change plans, the difference is prorated for the rest of the billing period. You can move to a plan smaller than what you store. The dialog warns you that new uploads will pause until you are back under its cap, and nothing extra is billed.

To go back to pay as you go, click <BgStyledText>Cancel subscription</BgStyledText> on your plan, or <BgStyledText>Switch to pay-as-you-go</BgStyledText>. If a plan ends or cannot renew, your storage is billed pay as you go again automatically.

### When you reach your plan's cap

<Unordered>
  <li>With less than 10% left, the plans page warns that you are close to your cap.</li>
  <li>At the cap, <strong>new uploads pause</strong> until you upgrade or free space. Nothing extra is ever charged.</li>
  <li>An upload that would go over the cap is stopped before it starts, with an <BgStyledText>Upgrade</BgStyledText> button.</li>
</Unordered>

## Hub plans

Hub plans set how much you can store in your Hub namespace. Every account starts on the free plan. At the time of writing:

| Plan        | Private storage | Public storage | Projects | Price       |
| ----------- | --------------- | -------------- | -------- | ----------- |
| **Free**    | 25 GB           | 100 GB         | 1        | Free        |
| **Builder** | 75 GB           | 200 GB         | 1        | $5 / month  |
| **Pro**     | 250 GB          | 500 GB         | 3        | $19 / month |
| **Team**    | 2 TB            | 5 TB           | 20       | $99 / month |

Hub plans are paid from your balance. Changing plans and cancelling work differently from Drive and S3, so read [Hub plans](/use/console/hub#hub-plans) before you switch.

## Active subscriptions

The **Active subscriptions** tab lists every plan you pay for, with its **service**, **plan**, **next charge** and **amount**. A plan that is **Past due** or **Ending** is marked. Click <BgStyledText>Manage</BgStyledText> on a row to open that plan.

Free plans are not listed, because there is nothing to charge.

## Transaction history

The **Transaction history** tab lists every top up, plan charge and renewal, newest first. Plan charges are labelled **Drive ·** or **S3 ·** so you can tell them apart, and each row shows how it was paid: **Credit Card**, **TAO** or **Balance**.

{/* Screenshot needed: static/img/console/billing/tx-history.png (+ -dark).
    The current one shows the retired table. Capture the Transaction history tab. */}

## When your balance runs out

Your balance pays for plan renewals and for S3 pay as you go, so running out affects both.

<Unordered>
  <li><strong>A plan that cannot renew</strong> is marked <strong>Past due</strong>, and a banner such as <strong>Your Drive plan could not be renewed</strong> asks you to top up.</li>
  <li><strong>S3 on pay as you go</strong> first becomes <strong>read only</strong>: you can still download, but new writes are refused. If the balance stays empty, S3 is <strong>suspended</strong> and your buckets are not reachable.</li>
  <li><strong>Topping up</strong> restores both.</li>
</Unordered>

To be warned before it happens, turn on **Low balance alerts** in [Settings](/use/console/settings), or set up [auto reload](#by-card-every-month-auto-reload).

## The old top-up subscription

Before plans existed, you could buy a monthly credit subscription (Personal, Professional, Business or Enterprise). It is no longer sold. If you still have one, it shows under **Your top-up subscription** on Billing, and it keeps adding credits each month.

Cancelling it opens the Stripe customer portal and does not affect any of your plans.

## Where to next

<Unordered>
  <li><a href="/use/console/overview">Overview</a>: every plan and your balance in one row.</li>
  <li><a href="/use/console/drive">Drive</a>: start uploading once you have a plan.</li>
  <li><a href="/use/console/s3">S3 Buckets</a>: create buckets and access keys.</li>
  <li><a href="/use/console/hub">Hub</a>: your container images and AI models, and Hub plans.</li>
  <li><a href="/use/console/settings">Settings</a>: balance alerts and your Drive plan.</li>
</Unordered>
