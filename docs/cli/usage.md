---
title: Command Line Tools and SDKs
sidebar_label: CLI and SDKs
description: Which command line tool or SDK to use for your Hippius account, Drive, Object Storage and miner operations, and which old Hippius CLI and SDK packages no longer store files.
---

# Command Line Tools and SDKs

Hippius has a different tool for each product. This page tells you which one to install, and which older packages to avoid.

## For your account, billing and compute

Use `hipc`, the Hippius command line, from [github.com/thenervelab/hippius-cli](https://github.com/thenervelab/hippius-cli). It does what the [console](https://console.hippius.com) does: accounts and teams, billing and plans, S3 buckets and keys, the Hub registry, VMs, App Engine, managed Kubernetes and PostgreSQL, GitHub Actions runners, CDN and support. It does not upload or download files: use an S3 client or `hippius-drive` for that.

```bash
curl -q --proto '=https' --tlsv1.2 -fsSL https://github.com/thenervelab/hippius-cli/releases/latest/download/install.sh | sh
hipc version
hipc auth login
```

With Homebrew, run `brew trust thenervelab/tap` and then `brew install thenervelab/tap/hipc`. Homebrew 7.0.0 and later need the `brew trust` line; an older one does not, and one older than 5.1.15 answers it with `Unknown command: trust`, which is harmless. `hipc auth login` asks for the API token from console [Settings](https://console.hippius.com/dashboard/settings). [hipc, the Hippius command line](/cli) covers install, login and the first commands, and [hipc for agents](/cli/agents) is the page a coding agent reads first.

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

## For Models and Container Images

Use [`hippius-hub`](/registry/cli), with docker and oras.

## For Miner Operations

If you're registering or managing miner nodes, see the [Miner Setup guide](/earn/arion/running-blockchain-node). Chain registration for a miner or a validator uses the pinned Python package `hippius`, in its own virtual environment so it never replaces `hipc` on your `PATH`: see [Registering in the Hippius Blockchain](/earn/register-in-blockchain).

## Older CLI and SDK packages

:::warning Deprecated
The old IPFS-based Hippius CLI and SDKs no longer store or fetch files, because Hippius storage now runs on Arion. That includes the old `hipc` (versions 0.0.x and 0.1.x, with commands such as `hipc storage pin`), `hippius-sdk`, `hippius-sdk-ts` and `hippius-rust-sdk`, and the file commands of the `hippius` Python package on PyPI.
:::

The current `hipc` (0.17 and later) is not deprecated. If `hipc --help` lists `storage` or `miner`, you have the old one: remove it and install the current one as shown above. If the old one came from Homebrew, `brew uninstall hipc` first, so the old command does not come first on your `PATH`.

Don't install `hippius` from PyPI to work with Drive or Object Storage. Use `hippius-drive` or an S3 client instead.
