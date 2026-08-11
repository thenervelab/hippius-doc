---
id: staking
title: Staking
sidebar_label: Staking
slug: /use/console/staking
description: Stake hAlpha from the Hippius Console to earn rewards. Understand the staked, unstaked, unstaking and redeemable states, and how to unstake and withdraw.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

## Introduction

Staking locks your hAlpha to help secure the Hippius network, and pays you rewards for doing it. hAlpha sitting in your balance earns nothing, so staking is how you put it to work.

You stake from the **Stake hAlpha** panel on the [Wallet](/use/console/wallet) page. Every transaction is signed by your own extension, and we never take custody of your tokens.

:::info We choose the validator for you
Some networks ask you to pick a validator and manage your nomination. We do not. Staking here is a single amount-and-confirm step, and we handle the nomination behind it.
:::

## Reading the Stake Panel

We lead with the number that matters most, the amount you currently have staked, followed by your total position.

Underneath it, a coloured bar shows how much of your hAlpha is actually working. Each state gets a segment sized to its share, and we only show states you actually hold.

| State | Colour | What it means |
|---|---|---|
| **Staked** | Blue | Bonded and earning rewards. |
| **Unstaking** | Amber | In the unbonding period, not yet withdrawable. |
| **Redeemable** | Green | Finished unbonding, ready to withdraw. |
| **Unstaked** | Grey | Held but not put to work. This is what you can stake right now. |

:::tip Unstaked is your headroom
If you are paid as a miner, your rewards land in your free balance and show up as **Unstaked**. We calculate that figure the same way the Stake dialog calculates **MAX**, so the panel and the dialog can never disagree with each other.
:::

Hover the clock icon next to **Unstaking** and we show you **Unbonding Details**: every unbonding chunk listed separately with its own amount and remaining time. That matters if you unstaked on different days, because each chunk unlocks on its own schedule rather than all at once.

### The hAlpha Coefficient

Below the balances we show the **hAlpha Coef.** as a percentage, followed by *(network average, varies)* and a **View on Hipstats** link.

This is a network-wide average, not a promise about your account. It moves with network activity, so please treat it as an indication of what staking is currently returning rather than a fixed rate we are offering you. Click **View on Hipstats** for the full staking breakdown on [hipstats.com](https://hipstats.com).

## Staking hAlpha

<Ordered>
  <li>Open the <a href="/use/console/wallet">Wallet</a> page and check that the right account is selected.</li>
  <li>Click <BgStyledText>Stake hALPHA</BgStyledText> in the top right of the Stake panel.</li>
  <li>Enter the amount to stake, or click <BgStyledText>MAX</BgStyledText> to stake everything available.</li>
  <li>Click <BgStyledText>Stake</BgStyledText> and review the confirmation showing the amount and estimated gas fee.</li>
  <li>Click <BgStyledText>Confirm Staking</BgStyledText> and approve the signature in your extension.</li>
  <li>We show a success screen once the transaction finalizes.</li>
</Ordered>

![Stake dialog](/img/console/wallet/stake-dialog.png)

:::note Why MAX is not your whole balance
We hold back a small amount for gas. If you staked every last token you would have nothing left to pay for the unstake later, so we leave you the headroom deliberately.
:::

## Unstaking

The **Unstake** button only appears once you have something staked.

<Ordered>
  <li>Click <BgStyledText>Unstake</BgStyledText>.</li>
  <li>Enter the amount to unstake, or click <BgStyledText>MAX</BgStyledText>.</li>
  <li>Click <BgStyledText>Unstake</BgStyledText>, review the confirmation, then click <BgStyledText>Confirm Unstaking</BgStyledText>.</li>
  <li>Approve the signature in your extension.</li>
</Ordered>

![Unstake dialog](/img/console/wallet/unstake-dialog.png)

The amount moves into **Unstaking** and stops earning rewards straight away. Once the unbonding period ends we move it to **Redeemable**.

:::warning Unstaking is not instant
Unbonded tokens stay locked for the full unbonding period before you can withdraw them. We cannot shorten it, so plan ahead if you need the tokens for something else.
:::

## Withdrawing

The **Withdraw** button becomes available once you have a redeemable balance. While tokens are still unbonding we keep the button disabled and tell you roughly how long is left when you hover it.

<Ordered>
  <li>Click <BgStyledText>Withdraw</BgStyledText>.</li>
  <li>Confirm the amount, which is your full redeemable balance, and click <BgStyledText>Confirm Withdraw</BgStyledText>.</li>
  <li>Approve the signature. The amount moves into your free balance and shows as <strong>Unstaked</strong>.</li>
</Ordered>

![Withdraw dialog](/img/console/wallet/withdraw-dialog.png)

## Troubleshooting

**"Couldn't load staking info".** We could not reach the chain, which usually happens on a fresh page reload before the connection is established. Click retry on the panel.

**"Amount exceeds your available balance".** Staked and unstaking hAlpha is not available to stake again. Check the **Unstaked** figure in the panel, which is the real ceiling.

**"Amount exceeds your staked balance".** You are trying to unstake more than you have bonded. Unstaking does not include amounts already unbonding or redeemable.

**My rewards have not appeared.** Rewards are paid per era, and a stake bonded partway through an era does not earn for that era. Give it at least one full era before comparing figures.

## Where to next

<Unordered>
  <li><a href="/use/console/wallet">Wallet</a>: balances, sending, receiving and transaction history.</li>
  <li><a href="/use/console/bridge">Bridge</a>: move tokens between Hippius and Bittensor.</li>
  <li><a href="/learn/substrate-staking">Substrate Staking</a>: how the staking mechanism works at the protocol level.</li>
</Unordered>
