---
id: usage
title: Deprecated IPFS-era tools
sidebar_label: Deprecated tools
slug: /cli/usage
description: The IPFS-era command line and the storage commands of the hippius Python package are deprecated. What replaces each one.
---

:::warning Deprecated
The IPFS-era command line (its `hipc storage` and other IPFS commands) and the storage commands of the old Python package `hippius` no longer work. Hippius switched from IPFS to Arion. The name `hipc` now belongs to the new [Hippius command line](/cli).
:::

What replaces them:

- **The account, from a terminal or a coding agent**: [hipc](/cli), installed with the script on that page. It manages accounts and projects, billing, Object Storage, Hub, compute and App Engine, Kubernetes, CDN, the private network, and support.
- **File storage**: any S3 client against `https://s3.hippius.com`. Start with the [Object Storage quickstart](/use/quickstart).
- **Models and container images**: [`hippius-hub`](/registry/cli), with docker and oras.
- **Chain registration for a miner or a validator**: the pinned Python package, in its own virtual environment so it never replaces `hipc`, in [Registering in the Hippius blockchain](/earn/register-in-blockchain).
- **Miner operations**: the [miner guide](/earn/arion/running-miner) and the `miner` binary from the [arion](https://github.com/thenervelab/arion) repository.

If you have the IPFS-era `hipc` from Homebrew, remove it with `brew uninstall hipc` before you run the install script, so the old command does not come first on your `PATH`. The Homebrew formula of the new `hipc` is not published yet.
