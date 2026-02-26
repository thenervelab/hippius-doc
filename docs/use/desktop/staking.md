---
id: staking
title: Staking
sidebar_label: Staking
slug: /use/desktop/staking
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';

## Introduction

Staking lets you lock your hAlpha tokens to help secure the Hippius network. Your staked tokens earn rewards over time. When you're ready, you can unstake your tokens — they enter an unbonding period before becoming available to withdraw.

The Hippius Desktop app provides a seamless staking experience with local wallet signing, so you never need to expose your mnemonic phrase to external extensions.

## Staking Overview Widget

The **Stake hAlpha** widget on the Wallet Overview page gives you a quick snapshot of your staking status:

| Field | Description |
|---|---|
| **Total Staked** | Your actively bonded hALPHA |
| **Total Locked** | Combined total of bonded + unbonding + redeemable amounts (shown with a lock icon) |
| **Unbonding** | Tokens currently in the unbonding period, shown with a clock icon and estimated remaining time (e.g., "~1d 14h remaining") |
| **Redeemable** | Tokens that have finished unbonding and are ready to withdraw (shown with an unlock icon) |

![Staking Widget](/img/desktop/wallet/staking-widget.png)

:::tip
Hover over the unbonding amount to see detailed information for each unbonding period, including the exact number of blocks remaining and the estimated time.
:::

## Accessing Staking

You can access staking features in multiple ways:

1. Click <BgStyledText>Stake Now</BgStyledText> on the Stake widget on the Wallet page
2. Navigate to the **Stake** page from the sidebar
3. Use the **Bridge** tab which includes staking options

## Staking hAlpha

<Ordered>
  <li>Open the Wallet page and ensure the correct wallet is active.</li>
  <li>Click <BgStyledText>Stake Now</BgStyledText> on the Stake widget, or navigate to the Stake page.</li>
  <li>Your available balance (excluding already staked and unbonding tokens) is shown at the top.</li>
  <li>Enter the amount you wish to stake. Click <BgStyledText>Max</BgStyledText> to stake your full available balance.</li>
  <li>Click <BgStyledText>Stake Now</BgStyledText>.</li>
  <li>Review the confirmation dialog — note that this transaction cannot be reversed.</li>
  <li>Enter your wallet password to sign the transaction.</li>
  <li>Click <BgStyledText>Confirm</BgStyledText>.</li>
</Ordered>

A loading notification will appear while the staking transaction is processed. Once confirmed, your staked balance will update automatically.

![Stake hAlpha](/img/desktop/wallet/stake-halpha.png)

:::note
If you already have staked tokens, additional stakes are added to your existing bond automatically. You don't need to do anything different.
:::

## Unstaking hAlpha

Unstaking schedules your staked tokens for release. They enter an **unbonding period** before becoming withdrawable.

<Ordered>
  <li>Open the Wallet page and click <BgStyledText>Unstake</BgStyledText> on the Stake widget, or navigate to the Unstake page.</li>
  <li>Ensure the correct wallet is active.</li>
  <li>Your current staked balance is shown at the top.</li>
  <li>Enter the amount you wish to unstake.</li>
  <li>Click <BgStyledText>Unstake hAlpha</BgStyledText>.</li>
  <li>Review the confirmation dialog — note the warning about the unbonding period.</li>
  <li>Enter your wallet password to sign the transaction.</li>
  <li>Click <BgStyledText>Confirm</BgStyledText>.</li>
</Ordered>

After confirmation, the unstaked amount moves to **Unbonding** status. You can track the remaining time on the Stake widget.

![Unstake hAlpha](/img/desktop/wallet/unstake-halpha.png)

## Withdrawing Redeemable Tokens

Once the unbonding period is complete, your tokens become **Redeemable** and can be withdrawn to your wallet balance.

<Ordered>
  <li>Open the Wallet page. The Stake widget will show your redeemable amount in green.</li>
  <li>Click <BgStyledText>Withdraw</BgStyledText>.</li>
  <li>Review the amount shown in the confirmation dialog.</li>
  <li>Enter your wallet password to sign the transaction.</li>
  <li>Click <BgStyledText>Confirm Withdraw</BgStyledText>.</li>
</Ordered>

The dialog closes immediately and a loading notification tracks the withdrawal progress. Once confirmed, the tokens are added back to your transferable balance.

![Withdraw Tokens](/img/desktop/wallet/withdraw-tokens.png)

:::tip
The **Withdraw** button only appears when you have redeemable tokens. If all your tokens are still unbonding, you'll see the remaining time instead.
:::

## Understanding Token States

Your hAlpha tokens can be in several states:

```
Transferable → [Stake] → Bonded (Staked)
                              ↓ [Unstake]
                         Unbonding (waiting period)
                              ↓ (period complete)
                         Redeemable
                              ↓ [Withdraw]
                         Transferable
```

| State | Can Transfer? | Can Stake More? | Can Unstake? | Can Withdraw? |
|---|---|---|---|---|
| **Transferable** | Yes | Yes | — | — |
| **Bonded (Staked)** | No | Yes (adds to bond) | Yes | — |
| **Unbonding** | No | No | No | Not yet |
| **Redeemable** | No | No | No | Yes |

## Staking Rewards

Staked tokens earn rewards proportional to:
<Unordered>
<li>The amount staked</li>
<li>The duration of staking</li>
<li>The overall network staking participation</li>
</Unordered>

Rewards are automatically added to your staked balance. You don't need to manually claim them.

## Transaction Signing with Local Wallets

Unlike the web version which requires browser extension wallets, Hippius Desktop uses your local wallet to sign staking transactions:
<Ordered>
  <li>All transaction signing happens locally on your device</li>
  <li>Your mnemonic phrase never leaves your computer</li>
  <li>You simply enter your wallet password to authorize transactions</li>
</Ordered>

This provides enhanced security while maintaining a smooth user experience.

:::note
Make sure your wallet is unlocked before attempting staking operations. If your session has expired, you'll be prompted to enter your password again.
:::

## Frequently Asked Questions

### 1. How long is the unbonding period?

The unbonding period is set by the network and is typically several days. The exact duration is shown in the Stake widget when you have unbonding tokens.

### 2. Can I cancel an unstake?

No, once you've initiated an unstake, you cannot cancel it. The tokens will complete the unbonding period before becoming withdrawable.

### 3. Do I earn rewards while unbonding?

No, tokens in the unbonding state do not earn staking rewards. Only actively bonded (staked) tokens earn rewards.

### 4. Is there a minimum stake amount?

The network may enforce a minimum stake amount. If your stake is below this minimum, you'll see an error when attempting to stake.

### 5. Can I stake from multiple wallets?

Yes, you can stake from any wallet you have added to Hippius Desktop. Each wallet's stake is tracked independently.
