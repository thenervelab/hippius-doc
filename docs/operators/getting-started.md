---
title: Provider dashboard
slug: /operators/getting-started
description: provider.hippius.com, the dashboard for the people who run nodes for the Hippius network. Follow your fleet, link your accounts, track earnings and sign on-chain actions from your wallet.
---

# Provider dashboard

If you run compute or storage nodes for the network, you manage them on [provider.hippius.com](https://provider.hippius.com). It's a separate site from the customer console at [console.hippius.com](https://console.hippius.com), which is for buying storage and compute.

The operator pages that used to be in the console now live here. Old console links (`/dashboard/miner`, `/dashboard/compute-miners`) redirect to the dashboard.

## Signing in

You use the same account as on the console: Google, GitHub, Apple or your access key. There's no separate provider account. One login covers every account and node you operate.

Each site keeps its own session, though:

- You sign in once on provider.hippius.com and once on console.hippius.com.
- Signing out of one site doesn't sign you out of the other.

## Your accounts

The dashboard shows the nodes that belong to the chain accounts linked to your login. The **Accounts** page lists them:

- the wallet you signed in with;
- your Hippius account;
- any accounts you linked.

For each one you see its node count, transferable balance and compute stake.

To add one, choose **Link an account**:

1. Pick an account from your wallet extension (polkadot.js, Talisman, SubWallet or Taostats), or paste its SS58 address.
2. Sign the one-time message the dashboard shows. It moves no funds, and the challenge expires after 5 minutes.

If the account is already linked to another login, you can move it to this one by signing again. You can unlink an account at any time.

The **Compute stake** panel is also on the Accounts page. Use it to add stake, request a withdrawal and claim it.

## Pages

| Page | What it's for |
|---|---|
| **My fleet** (`/`) | Summary tiles: nodes online, nodes that need attention, compute capacity and earnings over 30 days. Below them, one table of all your compute and storage nodes, with filters by kind, status and account, and a search. |
| **Node** (`/nodes/<id>`) | When the node was last seen, its capacity, its VMs (compute) or deposit (storage), and its earnings. Its identity: node id, owner, child account, region, price in USD per unit and deposit. For a compute node, also whether it can take placements (and why not when it can't), its attestation, and launch refusals over 30 days. Then its actions (see below). |
| **Accounts** | Your linked accounts and your compute stake (see above). |
| **Earnings** | Earnings per account and per node, with a CSV export. |
| **Add a node** (`/register`) | **Compute**: the onboarding wizard. It's in private beta for now; if you're not in the beta, the page tells you how to get in touch. **Storage**: points to the host-side setup guides below. |
| **Network** | Chain totals and the largest compute and storage families. |

## Actions

Every on-chain action is signed in your wallet extension by the account the chain requires. The dashboard never signs for you, and the signing account must be one of your linked accounts.

- **Compute**
  - **Set price**: your child account announces a price change. It takes effect after a notice period, and each change is limited in size. Then **apply price** to put it in force.
  - **Deregister** the node and **claim** the deposit, signed by the family account.
- **Storage**
  - **Deregister** the node and **claim** the deposit.

An action only appears when the live chain supports it. There's no maintenance, drain or payout-address action, because the chain has no such call.

## Running the node itself

The dashboard follows and manages nodes; it doesn't install them. To set up a storage miner and register it on chain, follow these guides:

- [Storage Miner Overview](/earn/storage-miner)
- [Running a blockchain node](/earn/arion/running-blockchain-node)
- [Running a miner](/earn/arion/running-miner)
- [Registering in the blockchain](/earn/register-in-blockchain)

Wallets, staking and billing for your customer account stay in the console. See [Staking](/use/console/staking).
