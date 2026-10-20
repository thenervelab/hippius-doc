---
id: intro
title: What is Hippius?
sidebar_label: What is Hippius?
slug: /learn/intro
description: Hippius in one page. Drive, S3 Compatible, CDN, Hub and Confidential Compute, how to sign in and pay, and how your data is stored on Arion.
---

# What is Hippius?

Hippius is a distributed cloud. It gives you **Drive**, encrypted file storage for people; **S3 Compatible**, S3-compatible object storage for apps and backups; **CDN**, to serve the files in your S3 buckets from edge locations; **Hub**, a registry for AI models and container images; and **Confidential Compute**, virtual machines and managed services that run in encrypted memory. One account and one balance pay for all of them, and new services join the same account as they launch.

## Products

| Product | What it does | Start here |
|---|---|---|
| **Drive** | Your files, encrypted on your device before upload. Sync folders, back up your phone's photos, share by link, and share whole drives with a team. Free plan of 10 GB. | [Drive quickstart](/use/drive) |
| **S3 Compatible** | An S3-compatible API at `s3.hippius.com`. Works with the AWS CLI, rclone, boto3 and any S3 tool. Pay as you go at $6 per TB per month, no egress fees. One-click migration from any S3 provider. | [S3 quickstart](/use/quickstart) |
| **CDN** | Serves the files in your Hippius S3 buckets from edge locations in France and Australia, over HTTPS. Custom domains, cache rules, purge, static website mode and a monthly spend cap per zone. Pay as you go: $0.010 per GB billed in France, $0.060 per GB billed in Australia, $0.002 per 10,000 requests, $1 per custom domain per month. Other web servers as origins aren't supported yet. | [CDN guide](/use/cdn) |
| **Hub** | Push and pull AI models and container images with `hippius-hub`, docker or oras. A drop-in for the Hugging Face Hub. Free plan with 25 GB of private storage. | [Hub quickstart](/registry) |
| **Confidential Compute** | Virtual machines, managed PostgreSQL, managed Kubernetes and GitHub Actions runners that run in hardware-encrypted memory on AMD SEV-SNP. The machine's owner can't read your data, and the console shows each VM's attestation status. Metered per second, charged hourly. | [Confidential Compute guide](/use/compute) |

## Where you use them

| Surface | What it's for | Guide |
|---|---|---|
| **Web console** | Everything: Drive, S3 keys and buckets, migrations, CDN zones, Hub, Confidential Compute, your balance and plans, team members, referrals, staking and the token bridge, support tickets. | [Console guide](/use/console/getting-started) |
| **Desktop app** | Drive on Mac, Windows and Linux: sync folders, share from Finder, notifications. | [Desktop guide](/use/desktop/getting-started) |
| **Mobile app** | Drive on your phone: photo and video backup, browse, preview and share. Android today, iPhone coming soon. | [Mobile guide](/use/mobile/getting-started) |
| **Command line and code** | Any S3 client for S3 Compatible, `hippius-hub` for the Hub, the Management API for your account, the HCFS API for Drive. | [API reference](/use/api) |

## Signing in and paying

Sign in with Google, GitHub or Apple at [console.hippius.com](https://console.hippius.com). A 12-word access key also signs in; an account created that way has no email address and no free Drive plan, so it needs a plan before its first upload. There is no email and password sign-in.

Everything is paid from one balance. Top up by card, TAO, Bitcoin or USDC. Drive, S3 Compatible and Hub have plans; S3 Compatible can also be pay as you go, and CDN and Confidential Compute are pay as you go. [How paying works](/use/console/billing).

## How your data is stored

Storage runs on [Arion](/learn/storage-systems), the Hippius storage network. A file is erasure-coded into 30 pieces, 10 data and 20 parity, and placed on 30 independent miners. Any 10 pieces rebuild the file, so up to 20 machines can fail at once with no loss. Placement and miner rewards are recorded on the Hippius chain, a Substrate chain powered by Bittensor. You can watch the network live on [Hipstats](https://hipstats.com).

```
S3:     you → S3 API → gateway → validator → 30 pieces → miners
Drive:  you → encrypted on your device → chunks → same network
CDN:    visitor → edge location → your S3 bucket
```

What each product encrypts: Drive encrypts on your device and only you hold the key. S3 encrypts at rest, every chunk under its own key. Confidential Compute keeps a VM's memory encrypted by the processor while it runs. Hub private repositories are private by access control: only you and the keys you issue can pull them. To index a model, the Hub reads the header of the files you push, never the weights themselves.

## Running the network

Anyone can run a [storage miner](/earn/storage-miner) and be paid for the space and bandwidth they provide, or run a [validator](/earn/installing-validator). No GPU is needed for storage mining. [Compute miners](/learn/vm-computing) host the confidential virtual machines on AMD EPYC servers. Holders can also [stake](/use/console/staking) from the console.

## Next steps

- [Store your first file in Drive](/use/drive)
- [Create your first S3 bucket](/use/quickstart)
- [Serve a bucket through the CDN](/use/cdn)
- [Launch your first confidential VM](/use/compute)
- [Publish your first model on the Hub](/registry)
- [How Arion works in detail](/learn/storage-systems)
- [Run a miner](/earn/storage-miner)
- [Get help](/use/help-support)
