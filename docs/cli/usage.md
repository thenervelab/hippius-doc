---
id: usage
title: Deprecated IPFS-era tools
sidebar_label: Deprecated tools
slug: /cli/usage
description: The IPFS-era hipc command and the storage commands of the hippius Python package are deprecated. What replaces each one.
---

:::warning Deprecated
`hipc`, the IPFS-era command line, and the storage commands of the Python package `hippius` (up to 0.2.77) no longer work. Hippius switched from IPFS to Arion.
:::

What replaces them:

- **The console and the account, from a terminal or a coding agent**: [hip](/cli), the Hippius command line. `brew install thenervelab/tap/hippius` (the formula is `hippius`, the command is `hip`), or the install script on that page. It manages accounts, billing, S3 buckets and tokens, Hub, compute, Kubernetes, CDN, the private network, and support.
- **File storage**: any S3 client against `https://s3.hippius.com`. Start with the [S3 quickstart](/use/quickstart).
- **Models and container images**: [`hippius-hub`](/registry/cli), with docker and oras.
- **Chain registration for a miner or a validator**: still the Python package `hippius`, as [Registering in the Hippius blockchain](/earn/register-in-blockchain) describes. From 1.0.0 that PyPI name ships `hip`; pin `hippius==0.2.77` for the registration tool.
- **Miner operations**: the [miner guide](/earn/arion/running-miner) and `miner-cli` from the [arion](https://github.com/thenervelab/arion) repository.
