---
title: Provider dashboard
slug: /operators/getting-started
description: provider.hippius.com, the dashboard for the people who run nodes for the Hippius network. Follow your fleet, link your accounts, see your payouts and sign on-chain actions from your wallet.
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
- any accounts you linked.

The platform account Hippius generates for your login (the address the console created for you) is not an operator account. Operators run their nodes from keys held in their own wallet extension, linked here.

For each one you see its node count, transferable balance and compute stake. Stake is shown read-only, and the dashboard offers no stake actions. Compute staking isn't enabled on the network today, so requesting an unstake on chain is not required, including when you retire a node.

To add one, choose **Link an account**:

1. Pick an account from your wallet extension (polkadot.js, Talisman, SubWallet or Taostats), or paste its SS58 address.
2. Sign the one-time message the dashboard shows. It moves no funds, and the challenge expires after 5 minutes.

If the account is already linked to another login, you can move it to this one by signing again. You can unlink an account at any time.

A node's registered **child** account must be linked with the role *child*, and its key must be in your extension, for you to change that node's price (see [Set price](#set-price)).

## Pages

| Page | What it's for |
|---|---|
| **My fleet** (`/`) | Summary tiles for your fleet. Below them, one table of all your compute and storage nodes, with filters by kind, status and account, and a search. |
| **Node** (`/nodes/<id>`) | When the node was last seen, its capacity, its VMs (compute) or deposit (storage), and its payouts. Its identity: node id, owner, child account, region, price in USD per unit and deposit. For a compute node, also why recent VM launches failed (see [Launch error codes](/operators/launch-error-codes)), whether it can take placements (and why not when it can't), its attestation, and launch refusals over 30 days. Then its actions (see below). |
| **Accounts** | Your linked accounts and their stake (see above). |
| **Earnings** | Payouts you actually received, never estimates. Storage payouts are listed and can be exported as CSV. Compute payouts say "not available yet". |
| **Add a node** (`/register`) | See [Adding a node](#adding-a-node). |
| **Network** | Chain totals and the largest compute and storage families. |

## Adding a node

- **Compute** is in private beta. You need to be in the beta, have a family account, and pick a child account from your extension, linked as *child*. You also give the host's CPU generation (Milan, Genoa or Turin) and its CHIP_ID: 128 hex digits, or 16 on Turin. No deposit is taken while the network's compute lockup is off.
- **Storage** is temporarily closed to new families: the network is full (600 of 600 families).
  - An existing Arion family that still has room can add a node. On the node, run `generate_registration_data ... --nonce <n> --output-json`, paste the JSON into the page, and sign with the family account.
  - A paid slot takes a deposit of 50,000 hAlpha.
- If none of your linked accounts is a family, the page offers **Request onboarding**, which opens a support ticket. Link an account first: the button only appears for linked accounts.

## Actions

Every on-chain action is signed in your wallet extension. The dashboard never signs for you. An action only appears when the live chain supports it.

### Set price

The node's registered child account signs the price change, so that child must be a key in your extension, linked to your login as *child*.

The network enforces these rules:

- the price stays between the network's floor and ceiling (currently 5,000 to 15,000 µUSD per unit-hour);
- each change is at most ×1.5;
- a change takes effect after about 24 hours of notice;
- changes are at least 12 hours apart.

Once the change is due, **Apply price** appears; any account can sign it.

If the child isn't linked to your login, the page explains how to re-key the node: graceful exit, deregister, then register it again with a child from your extension.

### Deregister

- **Compute**: a node can only be deregistered once it's drained.
  1. On the host, run:

     ```bash
     sudo hippius-miner-agent request-graceful-exit --miner-id <your miner id> --edge-url https://edge.hippius.network:443 --ca-cert /var/lib/hippius-miner/mtls/ca.crt
     ```

     `<your miner id>` is shown on the node's page in provider.hippius.com. For older miners, it's also in `/etc/hippius-miner/config.toml`, under `[miner]`. The node's page shows this exact command with its id already filled in, so you can copy it from there.

     A coming agent release will read these values from `config.toml`, so that the bare `hippius-miner-agent request-graceful-exit` works on its own. Until then, pass the flags.
  2. Wait until the node shows as quarantined with 0 VMs.
  3. Deregister it. No deposit is held while the compute lockup is off, so the node is freed in the same transaction. Requesting an unstake is not required today.
- **Storage**: deregistering forfeits the node's unpaid accruals. The page asks you to confirm that.

There's no maintenance or payout-address action, because the chain has no such call.

## Troubleshooting

**VM launches fail on a compute node.** The fleet shows a red **Launches failing** badge on the node, and its page has a **Launch errors** card with the failing step's code, what it means and the commands to fix it. Every code is described in [Launch error codes](/operators/launch-error-codes).

## Running the node itself

The dashboard follows and manages nodes; it doesn't install them. To set up a storage miner and register it on chain, follow these guides:

- [Storage Miner Overview](/earn/storage-miner)
- [Running a blockchain node](/earn/arion/running-blockchain-node)
- [Running a miner](/earn/arion/running-miner)
- [Registering in the blockchain](/earn/register-in-blockchain)

Wallets, staking and billing for your customer account stay in the console. See [Staking](/use/console/staking).
