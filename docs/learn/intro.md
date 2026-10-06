---
id: intro
title: What is Hippius?
sidebar_label: What is Hippius?
slug: /learn/intro
description: Hippius in one page. Drive, S3 Storage, Hub and Confidential Computing, how to sign in and pay, and how your data is stored on Arion.
---

# What is Hippius?

Hippius is a distributed cloud. It gives you **Drive**, encrypted file storage for people; **S3 Storage**, S3-compatible object storage for apps and backups; **Hub**, a registry for AI models and container images; and, coming soon, **Confidential Computing**, virtual machines and databases that run in encrypted memory. One account and one balance pay for all of them.

## Products

| Product | What it does | Start here |
|---|---|---|
| **Drive** | Your files, encrypted on your device before upload. Sync folders, back up your phone's photos, share by link, and share whole drives with a team. Free plan of 10 GB. | [Drive quickstart](/use/drive) |
| **S3 Storage** | An S3-compatible API at `s3.hippius.com`. Works with the AWS CLI, rclone, boto3 and any S3 tool. Pay as you go at $6 per TB per month, no egress fees. One-click migration from any S3 provider. | [S3 quickstart](/use/quickstart) |
| **Hub** | Push and pull AI models and container images with `hippius-hub`, docker or oras. A drop-in for the Hugging Face Hub. | [Hub quickstart](/registry) |
| **Confidential Computing** | Virtual machines, managed PostgreSQL, managed Kubernetes and GitHub Actions runners that run in hardware-encrypted memory on AMD SEV-SNP. The machine's owner can't read your data, and the console shows you the attestation report that proves it. | [Compute guide](/use/compute) |

## Where you use them

| Surface | What it's for | Guide |
|---|---|---|
| **Web console** | Everything: Drive, S3 keys and buckets, migrations, Hub, your balance and plans, referrals, staking and the token bridge, support tickets. | [Console guide](/use/console/getting-started) |
| **Desktop app** | Drive on Mac, Windows and Linux: sync folders, share from Finder, notifications. | [Desktop guide](/use/desktop/getting-started) |
| **Mobile app** | Drive on your phone: photo and video backup, browse, preview and share. Android today, iPhone coming soon. | [Mobile guide](/use/mobile/getting-started) |
| **Command line and code** | Any S3 client for S3 Storage, `hippius-hub` for the Hub, the Management API for your account, the HCFS API for Drive. | [API reference](/use/api) |

## Signing in and paying

Sign in with Google, GitHub or Apple at [console.hippius.com](https://console.hippius.com). A 12-word access key also signs in; an account created that way has no email address and no free Drive plan, so it needs a plan before its first upload. There is no email and password sign-in.

Everything is paid from one balance. Top up by card, TAO, Bitcoin or USDC, then pick a plan per product. [How paying works](/use/console/billing).

## How your data is stored

Storage runs on [Arion](/learn/storage-systems), the Hippius storage network. A file is erasure-coded into 30 pieces, 10 data and 20 parity, and placed on 30 independent miners. Any 10 pieces rebuild the file, so up to 20 machines can fail at once with no loss. Placement and miner rewards are recorded on the Hippius chain, a Substrate chain powered by Bittensor. You can watch the network live on [Hipstats](https://hipstats.com).

```
S3:     you → S3 API → gateway → validator → 30 pieces → miners
Drive:  you → encrypted on your device → chunks → same network
```

What each product encrypts: Drive encrypts on your device and only you hold the key. S3 encrypts at rest, every chunk under its own key. Hub private repositories are private by access control: only you and the keys you issue can pull them. To index a model, the Hub reads the header of the files you push, never the weights themselves.

## Running the network

Anyone can run a [storage miner](/earn/storage-miner) and be paid for the space and bandwidth they provide, or run a [validator](/earn/installing-validator). No GPU is needed for storage mining. When Confidential Computing opens, [compute miners](/learn/vm-computing) will host the virtual machines on AMD EPYC servers. Holders can also [stake](/use/console/staking) from the console.

## Next steps

- [Store your first file in Drive](/use/drive)
- [Create your first S3 bucket](/use/quickstart)
- [Publish your first model on the Hub](/registry)
- [How Arion works in detail](/learn/storage-systems)
- [Run a miner](/earn/storage-miner)
- [Get help](/use/help-support)
