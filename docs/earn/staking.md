---
id: staking
title: Staking on Hippius
sidebar_label: Staking
slug: /earn/staking
---

import BgStyledText from '@site/src/components/BgStyledText';

# Staking on Hippius

Staking lets you lock hAlpha tokens to help secure the Hippius network and earn rewards in return.

## How it works

Hippius uses **Nominated Proof of Stake (NPoS)**. You stake hAlpha tokens by nominating validators. Validators run the blockchain nodes that produce blocks. When a validator you've nominated earns rewards, you get a proportional share.

- No minimum stake required
- Rewards are distributed per era (roughly every 24 hours)
- Unstaking triggers an unbonding period before funds are available

## Stake from the Console

1. Go to [console.hippius.com](https://console.hippius.com) and sign in
2. Navigate to **Wallet → Staking**
3. Click **Stake hAlpha**
4. Enter the amount and choose a validator to nominate
5. Confirm the transaction

The **Stake hAlpha** widget on the Wallet Overview page shows your current staking status at a glance.

## Stake from the Desktop App

1. Open the Hippius Desktop App
2. Go to **Staking** in the sidebar
3. Select a validator and enter the amount
4. Confirm

See [Desktop App → Staking](/use/desktop/staking) for details.

## Unstaking

1. Go to **Wallet → Staking** in the console
2. Click **Unstake**
3. Confirm — your tokens enter the **unbonding period**

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

- Buy on a supported exchange
- Bridge Alpha → hAlpha via the [Token Bridge](/use/bridge)
- Earn as a storage miner or validator

## FAQ

**Can I stake and store files with the same account?**
Yes. Your staking wallet and your S3 access keys are separate — staking uses your on-chain account, S3 uses `hip_*` keys.

**What happens if my nominated validator goes offline?**
Your stake is not slashed for validator downtime on Hippius (unlike some other chains). You can re-nominate at any time.

**Is there a minimum staking amount?**
No minimum. But very small amounts may earn negligible rewards due to transaction fees.
