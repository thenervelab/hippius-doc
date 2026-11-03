---
id: index
title: hipc, the Hippius command line
sidebar_label: Get started
slug: /cli
description: Install hipc, the Hippius command line for coding agents and people, log in once, and drive accounts, billing, S3, Hub, compute, Kubernetes, CDN and support from a terminal.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`hipc` is the Hippius command line, for people and coding agents. It drives everything the console manages: accounts, projects and teams, billing and plans, S3 buckets and tokens, Hub, VMs and App Engine apps, Kubernetes, PostgreSQL, GitHub Actions runners, CDN and WAF, the private network, and support. It does not move data: use an S3 client for objects and `hippius-hub` for Hub blobs. Source: [github.com/thenervelab/hippius-cli](https://github.com/thenervelab/hippius-cli).

## Install

macOS and Linux, x86_64 and arm64.

<Tabs groupId="install">
<TabItem value="brew" label="Homebrew">

```bash
brew install thenervelab/tap/hipc
```

</TabItem>
<TabItem value="curl" label="curl">

Installs to `~/.local/bin` (or `$HIPC_INSTALL_DIR`), no root, and checks the release checksum.

```bash
curl -fsSL https://github.com/thenervelab/hippius-cli/releases/latest/download/install.sh | sh
```

</TabItem>
<TabItem value="pypi" label="PyPI">

Coming right after the first release; it installs the same `hipc` binary.

```bash
pip install hippius
```

</TabItem>
</Tabs>

Check it with `hipc version`.

## Log in

Sign in at [console.hippius.com](https://console.hippius.com), copy your API token from [Settings](https://console.hippius.com/dashboard/settings), then:

```bash
hipc auth login --token-file -    # paste the token, press Enter, then Ctrl-D
hipc auth status
```

Or pass a file path instead of `-`. The token never goes on the command line. `HIPPIUS_TOKEN` sets a token for a single run.

## First commands

```bash
hipc account get
hipc billing balance
hipc s3 buckets list
hipc s3 buckets create photos --dry-run
```

- `--dry-run` shows the requests and sends nothing.
- A command that spends, deletes, revokes, rotates or cancels asks first, and needs `--yes` outside a terminal.
- A command that prints a secret needs `--reveal`.
- Every `--help` ends with examples.

## Next

- [For agents](/cli/agents): the JSON and error contract, written to paste into an agent's context. Start with `hipc schema`.
- [Examples](/cli/examples): twelve journeys as copyable snippets.
- [Command reference](/cli/commands): every `--help` page.
