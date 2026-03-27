---
id: intro
title: What is Hippius?
sidebar_label: What is Hippius?
slug: /learn/intro
---

# What is Hippius?

Hippius is a decentralized cloud storage platform. Store files, host websites, run VMs — without relying on AWS, Google Cloud, or any single company.

Under the hood it runs on a custom [Substrate](https://substrate.io/) blockchain, uses [Arion](/learn/storage-systems) for storage (Reed-Solomon erasure coding + CRUSH placement), and exposes a standard S3-compatible API.

## The two ways to use Hippius

**As a user** — store and retrieve files using any S3 client (boto3, AWS CLI, rclone). Sign up with Google or GitHub, no wallet required. → [Quickstart](/use/quickstart)

**As a network participant** — run a storage miner or validator to earn rewards. → [Run a Miner](/earn/arion/running-blockchain-node)

## Products

| Product | What it does |
|---|---|
| **S3 Storage** | S3-compatible API backed by Arion. Store anything. |
| **Desktop App** | Native app (macOS, Windows, Linux) with sync, file manager, wallet |
| **Web Console** | Browser-based dashboard for storage, VMs, staking, tokens |
| **Confidential Compute** | VMs inside AMD SEV-SNP encrypted enclaves |
| **Token Bridge** | Move Alpha ↔ hAlpha between native chain and EVM |

## How storage works

```
You → S3 API → Gateway → Validator
                              ↓
                    Reed-Solomon encode (k=10, m=20)
                              ↓
                    CRUSH placement → Miners (P2P/QUIC)
```

Upload flow: the gateway forwards your file to a validator, which erasure-codes it into 30 shards (10 data + 20 parity) and places them across miners via the CRUSH algorithm. Any 10 shards can reconstruct the original.

Download flow: the gateway fetches any 10 shards from miners and reconstructs your file on the fly.

## Authentication

New users sign in with Google or GitHub OAuth through [console.hippius.com](https://console.hippius.com). No wallet, no seed phrase, no browser extension.

S3 access keys (`hip_*`) are created in the console and used with any S3 client.

:::info Legacy
If you previously used a mnemonic seed phrase, it still works but is deprecated. See [Mnemonic Authentication](/learn/mnemonic-auth).
:::

## Next steps

- [Store your first file →](/use/quickstart)
- [Understand the storage architecture →](/learn/storage-systems)
- [Run a miner →](/earn/arion/running-blockchain-node)
