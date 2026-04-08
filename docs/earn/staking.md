---
id: staking
title: Staking on Hippius
sidebar_label: Staking
slug: /earn/staking
---

import BgStyledText from '@site/src/components/BgStyledText';
import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';

# Staking on Hippius

Staking lets you lock hAlpha tokens to help secure the Hippius network and earn rewards in return.

## How it works

Hippius uses **Nominated Proof of Stake (NPoS)**. You stake hAlpha tokens by nominating validators. Validators run the blockchain nodes that produce blocks. When a validator you've nominated earns rewards, you get a proportional share.

<Unordered>
  <li>No minimum stake required</li>
  <li>Rewards are distributed per era (roughly every 24 hours)</li>
  <li>Unstaking triggers an unbonding period before funds are available</li>
</Unordered>

## Stake from the Console

<Ordered>
  <li>Go to <a href="https://console.hippius.com">console.hippius.com</a> and sign in</li>
  <li>Navigate to <strong>Wallet → Staking</strong></li>
  <li>Click <BgStyledText>Stake hAlpha</BgStyledText></li>
  <li>Enter the amount and choose a validator to nominate</li>
  <li>Confirm the transaction</li>
</Ordered>

The **Stake hAlpha** widget on the Wallet Overview page shows your current staking status at a glance.

## Stake from the Desktop App

<Ordered>
  <li>Open the Hippius Desktop App</li>
  <li>Go to <BgStyledText>Staking</BgStyledText> in the sidebar</li>
  <li>Select a validator and enter the amount</li>
  <li>Confirm</li>
</Ordered>

See [Desktop App → Staking](/use/desktop/staking) for details.

## Unstaking

<Ordered>
  <li>Go to <strong>Wallet → Staking</strong> in the console</li>
  <li>Click <BgStyledText>Unstake</BgStyledText></li>
  <li>Confirm — your tokens enter the <strong>unbonding period</strong></li>
</Ordered>

During the unbonding period, tokens are locked and earn no rewards. After the period ends, they appear in your wallet as available to withdraw.

:::info Unbonding period
The unbonding period duration is set by the chain governance. Check the current value in [Polkadot.js Apps → Chain State → staking → unbondingDuration](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.hippius.network#/chainstate).
:::

## hAlpha vs Alpha

| Token | Where | Use |
|---|---|---|
| **Alpha** | Native Hippius chain | Staking, governance, miner rewards |
| **hAlpha** | EVM-compatible | DeFi, bridges, EVM apps |

Use the [Token Bridge](/use/bridge) to move between the two.

## Getting hAlpha

<Unordered>
  <li>Buy on a supported exchange</li>
  <li>Bridge Alpha → hAlpha via the <a href="/use/bridge">Token Bridge</a></li>
  <li>Earn as a storage miner or validator</li>
</Unordered>

## FAQ

**Can I stake and store files with the same account?**
Yes. Your staking wallet and your S3 access keys are separate — staking uses your on-chain account, S3 uses `hip_*` keys.

**What happens if my nominated validator goes offline?**
Your stake is not slashed for validator downtime on Hippius (unlike some other chains). You can re-nominate at any time.

**Is there a minimum staking amount?**
No minimum. But very small amounts may earn negligible rewards due to transaction fees.
