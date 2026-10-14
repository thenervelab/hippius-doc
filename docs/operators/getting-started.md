---
title: Provider dashboard
slug: /operators/getting-started
description: provider.hippius.com, the dashboard for the people who run nodes for the Hippius network. Sign in, follow your nodes, register a compute miner, and see the network.
---

# Provider dashboard

If you run nodes for the network, you follow them on [provider.hippius.com](https://provider.hippius.com). It's a separate site from the customer console at [console.hippius.com](https://console.hippius.com), which is for buying storage and compute.

The operator pages that used to be in the console now live here. Old console links (`/dashboard/miner`, `/dashboard/compute-miners`) redirect to the matching page.

## Signing in

You use the same account as on the console: Google, GitHub, Apple or your access key. There's no separate provider account.

Each site keeps its own session, though:

- You sign in once on provider.hippius.com and once on console.hippius.com.
- Signing out of one site doesn't sign you out of the other.

## What the dashboard shows

The dashboard reads the nodes registered under the chain accounts linked to your login. It works that scope out from the chain every time it loads, so it always matches what's on chain.

| Page | What it's for |
|---|---|
| **Overview** | Your nodes and the network on one page. Sections that aren't live yet, such as pricing, collateral, maintenance and earnings, appear as they ship. |
| **Nodes** | Each node's status, attestation, whether it can take placements (and why not when it can't), hosted VMs, capacity, launch refusals over 30 days, and when it was last seen. |
| **Node detail** | One node's identity, verdicts and attestation. Open it from the node list. |
| **Register a node** | Onboard a compute miner: its family and child accounts and its hostname. The dashboard gives you the network key and host settings, then you sign the registration in your wallet. For now, registration is open to the compute-miner beta only. |
| **Network** | Network-wide totals and the miner ranking. |

If your login has no chain account yet, the dashboard links you to the console's **Wallet** page to link one. Wallets, staking and billing stay in the console. See [Staking](/use/console/staking) for staking.

## Running the node itself

The dashboard follows nodes; it doesn't install them. To set up a storage miner and register it on chain, follow these guides:

- [Storage Miner Overview](/earn/storage-miner)
- [Running a blockchain node](/earn/arion/running-blockchain-node)
- [Running a miner](/earn/arion/running-miner)
- [Registering in the blockchain](/earn/register-in-blockchain)
