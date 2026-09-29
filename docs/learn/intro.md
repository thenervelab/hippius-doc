---
id: intro
title: What is Hippius?
sidebar_label: What is Hippius?
slug: /learn/intro
---

# What is Hippius?

Hippius is a distributed cloud. Store encrypted files, serve objects over an S3-compatible API, and publish models and containers.

Under the hood it runs on a custom [Substrate](https://substrate.io/) blockchain, uses [Arion](/learn/storage-systems) for storage (Reed-Solomon erasure coding + CRUSH placement), and exposes a standard S3-compatible API.

## The two ways to use Hippius

**As a user** — store and retrieve files using any S3 client (boto3, AWS CLI, rclone). Sign up with Google, GitHub, or Apple. A 12-word access key also signs in. → [Quickstart](/use/quickstart)

**As a network participant** — run a storage miner or validator to earn rewards. → [Run a Miner](/earn/arion/running-blockchain-node)

## Products

| Product | What it does |
|---|---|
| **Drive** | Encrypted files in the browser, the desktop app, and the Android app. |
| **S3 Storage** | S3-compatible API backed by Arion. Endpoint `https://s3.hippius.com`, region `decentralized`. |
| **Hub** | Container images and AI models. |
| **Desktop App** | Sync folders on macOS, Windows, and Linux. |
| **Mobile App** | Drive on Android. The iPhone app is not released. |
| **Web Console** | Sign in, pay, and manage Drive, S3, and Hub. |

Hippius VMs are not offered yet. The console also has staking and a token bridge.

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

New users sign in with Google, GitHub, or Apple at [console.hippius.com](https://console.hippius.com). An existing 12-word access key signs in too. There is no email and password sign-in.

S3 access keys are created in the console and used with any S3 client.

## Next steps

- [Store your first file →](/use/quickstart)
- [Understand the storage architecture →](/learn/storage-systems)
- [Run a miner →](/earn/arion/running-blockchain-node)
