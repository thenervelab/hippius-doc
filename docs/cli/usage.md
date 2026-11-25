---
title: Command Line Tools and SDKs
sidebar_label: CLI and SDKs
description: Which command line tool or SDK to use for Hippius Drive, Object Storage and miner operations, and which old Hippius CLI and SDK packages no longer store files.
---

# Command Line Tools and SDKs

Hippius has a different tool for each product. This page tells you which one to install, and which older packages to avoid.

## For Drive

Use the `hippius-drive` Python SDK and its command line tool of the same name, from [github.com/thenervelab/hippius-drive-sdk](https://github.com/thenervelab/hippius-drive-sdk). They upload, download, list, move and share files in the same end-to-end encrypted Drive you use in the console and the apps, and they work well for scripts and AI agents.

```bash
pip install "hippius-drive[login] @ git+https://github.com/thenervelab/hippius-drive-sdk"
hippius-drive --version
```

They are not on PyPI yet, so install them from GitHub as shown. [AI Agents and Scripts](/use/drive/agents) walks through signing in, your first commands and keeping your keys safe.

## For Object Storage

Use any S3-compatible client, such as the AWS CLI, rclone, boto3 or the AWS SDK for JavaScript. See the [Object Storage Quickstart](/use/quickstart) for setup instructions.

Object Storage and Drive are separate: files in one never appear in the other.

## For Miner Operations

If you're registering or managing miner nodes, see the [Miner Setup guide](/earn/arion/running-blockchain-node).

## Older CLI and SDK packages

:::warning Deprecated
The old IPFS-based Hippius CLI and SDKs no longer store or fetch files, because Hippius storage now runs on Arion. That includes `hippius-cli`, `hippius-sdk`, `hippius-sdk-ts` and `hippius-rust-sdk`, and the file commands of the `hippius` Python package on PyPI.
:::

Don't install `hippius` from PyPI to work with Drive or Object Storage. Use `hippius-drive` or an S3 client instead. Registering a miner on chain still uses the `hippius` package: see [Registering in the Hippius Blockchain](/earn/register-in-blockchain).
