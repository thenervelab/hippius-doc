---
id: billing
title: Billing
sidebar_label: Billing
slug: /use/console/billing
description: How paying for Hippius works. Add money to your balance by card, Bitcoin, USDC, TAO or Hippius tokens (hAlpha), choose a plan for Drive, S3 and Hub, and keep track of what you are charged.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Screenshot from '@site/src/components/Screenshot';

## How paying for Hippius works

There are two things to know about: your **balance** and your **plans**.

Your balance is money you keep on your account, in dollars. A plan is what gives a product its storage. Drive, S3 and Hub each have their own plan, so you can be on a free Drive plan, pay for a large S3 plan and never touch Hub at all.

Your balance pays for plans that renew from it each month (plans paid by card are charged to the card), and for anything you use by the hour, such as S3 on pay as you go and [Compute](/use/compute/billing). Topping up on its own does not give you more space. It keeps your plans paid.

You'll find all of this under <BgStyledIconWithText text="Billing" icon="Billing" /> in the sidebar.

<Screenshot src="/img/console/billing/overview.png" alt="Billing page with balance, services and plans" dark raw />

## Add money to your balance

You can top up by card, with Bitcoin, with USDC, with TAO, or with Hippius tokens (hAlpha). Whichever you pick, the money lands on your balance and stays there until a plan, S3 usage or compute usage draws on it.

### By card

Open Billing and click <BgStyledText>+ Top up</BgStyledText>. You can add money once, anywhere from $10 to $10,000, or choose **Monthly reload** to add a fixed amount every month. Payment goes through Stripe, so we never see your card details. If you close the Stripe page without paying, nothing is charged.

Monthly reload is a simple way to keep money coming in. You can change or stop it at any time from the same dialog, through Stripe. Anything it has already added stays on your balance.

### Auto-reload {#auto-reload}

**Monthly reload**: a fixed amount every month. **Auto-reload**: tops up when your balance drops below a threshold.

With auto-reload on, we check your balance every few minutes. When it falls below the threshold you set, we charge your saved card to bring it back to about your target. For example, below $10, back to $50: with $8.40 left, we charge $41.60. The credits show up a few minutes later. Every reload gets an invoice and an email.

Set it up on Billing, in the **Auto-reload** card:

1. Add a card with <BgStyledText>Add a card</BgStyledText> if you don't have one saved. This is the same card your plans paid by card are charged to, so a card you add or change here is used for those too.
2. Choose the threshold (at least $1) and the target (at least $5 above the threshold).
3. Optionally, set a monthly limit: the most auto-reload may charge in a calendar month (UTC). Once it is reached, auto-reload pauses until the 1st of next month and we email you.
4. Turn it on and save. If your balance is already below the threshold, the first reload happens right away.

Safety limits:

- At most 3 reloads in 24 hours.
- If your card is declined or your bank asks you to confirm the payment (3-D Secure), we email you and wait 24 hours before trying again. To fix it, use <BgStyledText>Change card</BgStyledText> to save the card again, then save your auto-reload settings.
- After 3 failures in a row, auto-reload turns itself off and we email you. Turn it back on once your card works.
- If a reload is disputed with your bank, auto-reload turns off.

On a [billing account](/use/console/projects), auto-reload is set per billing account, by its billing admins. Team members who can only view billing see the settings but can't change them. Every reload attempt is listed under the settings.

While auto-reload is on and working, we don't send the 3-day and 1-day low balance warnings. You still get an email if your balance reaches zero.

### With Bitcoin

In the same Top up dialog, choose <BgStyledText>Bitcoin</BgStyledText>. You can pay on-chain or over Lightning, from $20 to $100,000. The invoice is priced in dollars and opens on pay.hippius.com. Lightning is credited in seconds. An on-chain payment is credited after one confirmation, usually 10 to 60 minutes.

<Screenshot src="/img/console/billing/bitcoin.png" alt="Top up with Bitcoin" dark raw />

### With USDC

Choose <BgStyledText>USDC</BgStyledText> to pay with USDC on Base from a browser wallet, from $5 to $10,000. One USDC adds one dollar to your balance. You sign one authorization for that amount, and the network fee is paid for you. MetaMask, Rabby, Coinbase Wallet, and other browser wallets work. The balance updates once the payment is on Base, usually within a minute or two.

<Screenshot src="/img/console/billing/usdc.png" alt="Top up with USDC on Base" dark raw />

### With TAO

If you hold TAO, you can pay with it in two ways:

<Unordered>
  <li><strong>From a browser wallet.</strong> If your TAO is in Talisman or Polkadot.js, pick the wallet in the Top up dialog, enter an amount in dollars and approve the transfer. The dialog shows how much TAO that is at today's price.</li>
  <li><strong>By sending it yourself.</strong> If your TAO is on an exchange or in another wallet, copy your deposit address from the <strong>Manually</strong> tab and send TAO to it. We add it to your balance in dollars at the market rate once the transfer confirms.</li>
</Unordered>

Either way, your balance usually updates within a few minutes.

<Screenshot src="/img/console/billing/tao-wallet.png" alt="Top up with a Bittensor wallet" dark />

:::warning Send TAO only to your TAO deposit address
Copy the address from the **Manually** tab. It is not your Hippius account address, the one shown under **Convert balance** and in your Wallet: TAO sent there is not added to your balance, and you would have to [contact support](/use/console/support) to recover it. Send at least $20 of TAO in a single transaction. From a browser wallet, the console won't take less.

TAO transfers are final. TAO sent to anyone else's address can't be recovered.
:::

### With Hippius tokens (hAlpha)

If you hold hAlpha, the Hippius network's token, choose the <BgStyledText>Hippius</BgStyledText> tab to convert it into balance. The conversion happens on the Hippius chain, at the chain's hAlpha price: you get the amount of hAlpha times that price, in dollars.

The tab shows the live price (**Price**, in dollars per hAlpha), what you receive (**You receive**), and the smallest amount you can convert (**Min**). The price is read again every few seconds while the tab is open. You can get hAlpha from Alpha on Bittensor with the [bridge](/use/console/bridge).

How you convert depends on how you sign in.

**With Google, GitHub or Apple.** Your account has a Hippius address that Hippius manages for you. Converting takes two steps:

<Ordered>
  <li><strong>Send from my wallet.</strong> Pick an account from a Polkadot wallet extension (Talisman, polkadot.js, SubWallet or the Taostats Wallet), enter an amount and click <BgStyledText>Send to my Hippius account</BgStyledText>. This only moves hAlpha to your Hippius address: nothing is bought yet. You can also send hAlpha from anywhere else to the address shown under <strong>Convert balance</strong>, with <strong>Copy Hippius address</strong> or the QR code.</li>
  <li><strong>Convert balance.</strong> Enter the amount, or click <strong>Max</strong>, and click <BgStyledText>Convert to credits</BgStyledText>. We sign the purchase from your Hippius address, and the network fee is paid in hAlpha. About 0.01 hAlpha stays on the address for fees.</li>
</Ordered>

**With an access key or a wallet.** You hold your own key, so you sign the purchase yourself. Under **Sign with**, pick this session (your 12-word access key) or the wallet extension account that is your Hippius account, enter the amount and click <BgStyledText>Sign and buy</BgStyledText>. With a wallet extension, your wallet asks you to confirm one transaction.

Either way, the conversion is protected against price moves. **Slippage tolerance** is 1% by default; you can choose 0.5%, 1% or 3%. **At least** is the smallest amount you accept. If the price moves past it before the purchase lands, the conversion is refused and your hAlpha isn't converted. If the chain refused it, the network fee is still charged.

Your balance updates once the purchase is final on chain, usually within a minute or two. The conversion shows in **Payments and top-ups** as **Hippius tokens**. No invoice is issued for it.

:::warning Conversions are final
A conversion is an on-chain transaction. Once it is final it can't be reversed, and the hAlpha can't be refunded.
:::

If the Top up dialog has no **Hippius** tab, buying with hAlpha is paused for now. The other ways to pay still work.

## Choose a plan

Each product has its own plans page. You can get there from the product's card on Billing, or from the Upgrade and Subscribe buttons around the console.

When you subscribe, you choose how to pay:

<Unordered>
  <li><strong>Card.</strong> You pay through Stripe, and each renewal is charged to your card too, up to 3 days before it is due, so your balance is left for usage such as Compute. Stripe keeps your card on file. If the card can't be charged, the renewal is paid from your balance when it covers it, and we email you to update the card.</li>
  <li><strong>Account balance.</strong> The plan is paid straight from what you already have. If it is not enough, the console tells you and offers a top up.</li>
</Unordered>

All plans are monthly. Hub plans are paid from your balance; paying them by card is marked coming soon. Drive offers the card only to an account subscribing for the first time; see [Drive plans](#drive-plans).

### Drive plans

A Drive plan sets how much encrypted storage your Drive has. These are the plans at the time of writing. The console always shows the current ones.

| Plan                | Storage | Price       |
| ------------------- | ------- | ----------- |
| **Free Drive Plan** | 10 GB   | Free        |
| **Starter**         | 500 GB  | $4 / month  |
| **Plus**            | 2 TB    | $7 / month  |
| **Max**             | 10 TB   | $22 / month |
| **Scale**           | 25 TB   | $50 / month |

<Screenshot src="/img/console/billing/drive-plans.png" alt="Drive storage plans" dark raw />

**Who gets the free plan.** If you sign in with Google, GitHub, or Apple, your account comes with the Free Drive Plan, and you fall back to it if you ever cancel a paid plan. An **access key** creates a wallet-only account. It has no real email address, so it gets no lifecycle mail, and it does not include free storage, so you'll need to pick a Drive plan before your first upload. S3 and Hub work the same as on any other account.

**Subscribing** takes a minute. Pick a plan and confirm. On an account with no plan at all, such as an access key account, you choose how to pay: **Card** (Stripe checkout, and the card is kept for renewals) or **Account balance**. After a card payment the console shows the plan activating. That usually finishes in under a minute, and you can leave the page while it does. In the rare case a card payment goes through but the plan does not activate, the money stays on your balance and you can subscribe from there.

Plans are sold monthly. Moving from the Free Drive Plan to a paid plan, and every later change, is paid from your balance, so [top up](#add-money-to-your-balance) first if you need to.

**Moving to a bigger plan** (<BgStyledText>Upgrade</BgStyledText>) charges the difference for the rest of the current period now, prorated, and the bigger plan applies straight away. It then renews at its own price. You can't upgrade in the last 25 hours of a period: wait for the renewal, then upgrade.

**Moving to a smaller plan** (<BgStyledText>Downgrade</BgStyledText>) charges nothing and refunds nothing. You keep your current plan until the end of the period, then it switches. Until then, <BgStyledText>Keep this plan</BgStyledText> undoes it. You can't move to a plan smaller than what you already store, so free up some space first.

**Shared drives.** Plus, Max and Scale can share a drive with other people. Anyone on any plan, including Free, can be invited.

**Screenshots and screen recording.** Screenshots and sharing are unlimited on every plan. On the Free Drive Plan, a recording stops at 5 minutes, you can keep 25 recordings in total (deleting one frees a slot), and screenshots and recordings carry a small Hippius watermark. Captures count toward your 10 GB like any other file. Paid plans have no capture limits beyond their storage, and no watermark. See [Free and paid plans](/use/captures/plans).

**Cancelling** stops the renewal. The plan stays active until the end of the period you paid for, nothing is refunded, and <BgStyledText>Resume plan</BgStyledText> keeps it until then. After that you're back on the Free Drive Plan, or, for access key accounts, left with no storage at all.

**Renewals.** Each month is charged from your balance, or your card for a plan paid by card, when the previous one ends. If it can't be charged, the plan ends and your Drive goes back to the Free Drive Plan.

#### Storage cap on Max and Scale {#drive-storage-cap}

Max and Scale don't stop at their storage. What you store above it is billed by the hour from your balance, at **$2.20 per TB per month** on Max and **$2.00** on Scale, up to a **storage cap**.

The cap starts at twice your plan's storage: 20 TB on Max, 50 TB on Scale. Change it on the Drive plans page, under **Storage cap**, with <BgStyledText>Save cap</BgStyledText>, or go back with <BgStyledText>Reset to default</BgStyledText>. It can't go below your plan's storage. Changing plan resets it to the new plan's default.

At 80% of the cap the console warns you. At the cap, new uploads pause and your files stay readable. Raise the cap, upgrade, or free up space to upload again.

:::warning Over the Free Drive Plan, uploads stop
If you store more than the Free Drive Plan's 10 GB and have no paid plan, you get a notice, a reminder after 7 days, and after 14 days Drive becomes **read only**: you can still open, download and delete, but nothing new can be uploaded. Subscribing to a plan, or getting back under 10 GB, lifts it at the next daily check.

Starter and Plus stop uploads as soon as they are full. An account with no plan at all can't upload anything. When a plan ends, files already uploaded are kept for a grace period and may then be removed; [contact support](/use/console/support) if you need more time.
:::

When your Drive is full, uploads stop and the console offers a bigger plan. You can also delete something and try again.

### S3 plans {#s3-plans-and-pay-as-you-go}

S3 can be paid for in two ways.

**Pay as you go** is where everyone starts. You pay **$6 per TB per month** for what you actually store, charged by the hour from your balance, with no cap and no commitment. There is nothing to sign up for.

**A plan** gives you a block of storage for a flat monthly price, and works out cheaper once you store a few terabytes:

| Plan              | Storage | Price        | Per TB | Saving vs pay as you go |
| ----------------- | ------- | ------------ | ------ | ----------------------- |
| **S3 Pro**        | 10 TB   | $53 / month  | $5.30  | 12%                     |
| **S3 Business**   | 50 TB   | $245 / month | $4.90  | 18%                     |
| **S3 Enterprise** | 100 TB  | $465 / month | $4.65  | 22%                     |

<Screenshot src="/img/console/billing/s3-plans.png" alt="S3 storage plans and pay as you go" dark raw />

The plans page works out what you'd save based on what you store today.

Switching to a plan doesn't touch your buckets or access keys, so there's nothing to reconfigure.

- **Buying a plan.** The first month is charged with the next hourly billing, usually within the hour, and the plan's storage applies from then. Until it does, your storage is billed pay as you go.
- **Upgrading.** You pay the price difference for what is left of the current month right away. For example, moving from Pro ($53) to Business ($245) with a third of the month left costs $64. The bigger plan's storage applies as soon as that charge clears, usually within the hour, and your renewal date stays the same.
- **Downgrading.** The smaller plan starts at your next renewal. You keep your current plan until then, and nothing is refunded.
- **Cancelling.** You can cancel at any time. The plan stays active until the end of the month you paid for, nothing is refunded, and you go back to pay as you go after that. Until then you can keep the plan from its card on the plans page. Choosing your current plan again also cancels a pending downgrade.
- **Renewals.** Each month is charged from your balance (or your card, for a card-funded plan) when the previous one ends. If it can't be charged, the plan ends and your storage goes back to pay as you go. You are never left owing the plan's fee.

Changing plan resets your [storage limit](#s3-storage-limit) to the new plan's default.

**Filling your plan.** The plan's storage is included, not a hard stop. Storage above it is billed by the hour at your plan's own rate, the plan price divided by its storage: $5.30 per TB per month on S3 Pro, $4.90 on Business and $4.65 on Enterprise. You only pay for what you store above the plan, for the hours you store it, up to your storage limit.

#### Storage limit {#s3-storage-limit}

A **storage limit** protects you from a runaway bill. It caps the total you can store, and it starts at **twice your plan's storage** (20 TB on S3 Pro). You can change it on the S3 plans page, under **Storage limit**:

- The lowest limit is your plan's storage. At that setting there is no overage at all, and uploads pause at your plan's size.
- A limit below what you already store deletes nothing: uploads pause right away, and what is above your plan is still billed until you free up space.
- There is no fixed maximum. The page shows the most a month of overage could cost at the limit you pick: (limit − plan storage) × your plan's rate, for example (30 TB − 10 TB) × $5.30 = $106 a month on S3 Pro. It is a ceiling, not a forecast. You are billed by the hour for what you actually store.
- **At the limit, writes pause and reads keep working.** You can still list and download everything, but nothing new can be uploaded. Writes resume on their own as soon as you free up space or raise the limit.
- We email you at 80% of the limit, when you reach it, and when writes resume.
- Only the account owner can change the limit. Team members with S3 access can see it.

### Hub plans

Hub plans set how much you can store in your Hub namespace. Everyone starts on the free plan (25 GB private, 100 GB public), and paid plans start at $5 a month. Hub works a little differently from Drive and S3 when you switch or cancel, so the full details are on the [Hub page](/use/console/hub#hub-plans).

## Keep track of what you pay

Billing shows every product side by side, with the plan you're on, what it costs and when it renews. Four tabs underneath give you the detail:

<Unordered>
  <li><strong>Active subscriptions</strong> lists every paid plan with its next charge. Anything past due or about to end is flagged.</li>
  <li><strong>Payments and top-ups</strong> lists every top up, plan charge and renewal, and how each one was paid.</li>
  <li><strong>Invoices</strong> lists your invoices, to download as PDF.</li>
  <li><strong>Billing details</strong> holds the company name and tax ID printed on your invoices. A change applies to invoices issued after you save it.</li>
</Unordered>

<Screenshot src="/img/console/billing/tx-history.png" alt="Billing transaction history" dark raw />

### Invoices

An invoice is issued for each payment, a few minutes after the money comes in: card top-ups, Monthly reload and auto-reload, plans paid or renewed by card, Bitcoin, USDC and TAO. We email you when it is ready, and you download the PDF from the **Invoices** tab. There is no monthly invoice. Conversions from hAlpha aren't invoiced. Plans paid from your balance aren't either: the payment that added the money was.

## If your balance runs out

Your balance pays for renewals and for S3 pay as you go, so running dry affects both:

<Unordered>
  <li>A Hub plan that can't renew is marked <strong>past due</strong>, and the console asks you to top up. A Drive plan ends instead, and your Drive goes back to the Free Drive Plan. An S3 plan ends too, and your storage goes back to pay as you go.</li>
  <li>S3 on pay as you go becomes <strong>read only</strong> after 7 days. You can still download, but nothing new can be written. 7 days later S3 is <strong>suspended</strong> and your buckets can't be reached. After 37 days of unpaid storage the data may be <strong>deleted</strong>, with a final notice a week before. Any top up that covers your usage puts everything back.</li>
</Unordered>

Topping up puts everything back. To avoid it altogether, turn on **Low balance alerts** in [Settings](/use/console/settings), or turn on [auto-reload](#auto-reload).

## Older subscriptions

Before plans existed, the monthly top-up now called [Monthly reload](#by-card) was sold as subscriptions named Personal, Professional, Business and Enterprise. If you still have one, it keeps adding to your balance every month and shows on Billing as **Your top-up subscription**. You can cancel it through Stripe, and doing so doesn't affect any of your plans.

## Where to next

<Unordered>
  <li><a href="/use/console/drive">Drive</a>: start uploading once you have a plan.</li>
  <li><a href="/use/console/s3">S3 Buckets</a>: create buckets and access keys.</li>
  <li><a href="/use/console/hub">Hub</a>: your container images and AI models.</li>
  <li><a href="/use/console/settings">Settings</a>: low balance alerts.</li>
  <li><a href="/use/compute/billing">Compute billing</a>: what VMs, databases and clusters cost by the hour.</li>
</Unordered>
