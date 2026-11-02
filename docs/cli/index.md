---
id: index
title: hipc, the Hippius command line
sidebar_label: Get started
slug: /cli
description: Install hipc, the Hippius command line for coding agents and people, store your API token once, and drive accounts, billing, S3, Hub, compute, Kubernetes, CDN and support from a terminal.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`hipc` is the Hippius command line, for coding agents and for people. One binary drives everything the console manages: accounts, projects and teams, the balance and the plans, S3 buckets and tokens, the Hub registry, confidential virtual machines, managed Kubernetes and PostgreSQL, GitHub Actions runners, CDN zones and their WAF, the private network, and support tickets.

It does not move data: S3 objects stay with the AWS CLI or rclone, Drive files with the Drive apps, and Hub blobs with `hippius-hub`. It is the control plane, from a shell.

When a person and a program want different things, the program wins: on a pipe, output is JSON, an error is one JSON object, nothing prompts, and nothing pages. Source, releases, and the full documentation: [github.com/thenervelab/hippius-cli](https://github.com/thenervelab/hippius-cli).

## Install

`hipc` runs on macOS (Apple silicon and Intel) and Linux (x86_64 and aarch64). Each channel installs one command, `hipc`.

<Tabs groupId="install">
<TabItem value="curl" label="curl">

The install script downloads the release for your machine into `~/.local/bin` (or `$HIPC_INSTALL_DIR`), with no root. It checks the tarball against the release's `SHA256SUMS`, and the Sigstore signature of `SHA256SUMS` when `cosign` is on `PATH`; with `HIPC_INSTALL_REQUIRE_SIGNATURE=1` it fails instead when `cosign` is absent. To uninstall, remove `$HIPC_INSTALL_DIR/hipc` (by default `~/.local/bin/hipc`); `hipc` keeps its config in `~/.hippius`.

```bash
curl -fsSL https://github.com/thenervelab/hippius-cli/releases/latest/download/install.sh | sh
```

</TabItem>
<TabItem value="brew" label="Homebrew">

On macOS and Linux. The formula is `hippius`; the command it installs is `hipc`.

```bash
brew install thenervelab/tap/hipc
```

</TabItem>
<TabItem value="pypi" label="PyPI">

:::caution Available from hipc 1.0.0
Until then `pip install hippius` installs the old Python SDK (0.2.77), whose `hippius` command is the deprecated IPFS-era CLI. Use the curl or Homebrew tab today.
:::

From 1.0.0, for a machine that already has Python; the wheels hold the same binary. Pin `hippius==0.2.77` if your code imports the old SDK.

```bash
# from hipc 1.0.0
pip install hippius
```

</TabItem>
</Tabs>

Then check it:

```bash
hipc version
```

## Log in

`hipc` cannot create an account or sign in for you. Sign in at [console.hippius.com](https://console.hippius.com) once, open [Settings](https://console.hippius.com/dashboard/settings), and copy your API token. Then store it:

```bash
hipc auth login --token-file -      # paste the token, press Enter, then Ctrl-D
hipc auth status
```

The token is read from stdin with `-`, or from a file: `hipc auth login --token-file ~/token.txt`, then delete the file. On macOS, `pbpaste | hipc auth login --token-file -` reads it from the clipboard. It is never read from the command line, where other users can see it with `ps`. It is stored in `~/.hippius/config.toml` at mode `0600`; `HIPPIUS_TOKEN` sets a token for one run without storing it.

## First commands

```bash
hipc account get
hipc billing balance
hipc s3 buckets list
hipc compute vms list --json
hipc s3 buckets create photos --dry-run
```

A command that spends, deletes, revokes, rotates, or cancels asks first at a terminal, and needs `--yes` everywhere else. A command whose answer holds a secret needs `--reveal`. `--dry-run` prints the requests a real run would send and sends nothing. The `--help` of every command ends with examples.

## For agents

```bash
hipc schema                                 # every command, its effect, flags, confirmation, guards, and every error code; JSON, no network
hipc compute vms list --json                # JSON at a terminal too; a pipe, CI=1, or AI_AGENT=1 already means JSON
hipc s3 buckets create photos --dry-run     # the requests a real run would send; sends nothing, needs no token, exit 0
hipc s3 buckets create photos --yes         # confirms a command that spends, deletes, revokes, rotates, or cancels
# exit 0: done; 1: the API or the runtime failed; 2: the invocation must change, nothing was sent
# a failure is one JSON object on stderr: {"error":{"code":...,"message":...,"request_id":...,"hint":...,"retryable":...,"side_effects":...,"http_status":...,"retry_after_ms":...,"details":...}}
```

[hipc for agents](/cli/agents) is the playbook, written to be pasted into an agent's context.

## Where to next

- [hipc for agents](/cli/agents): discovery, the output and error contract, confirmations, dry runs, a worked loop.
- [Examples](/cli/examples): twelve journeys as copyable snippets, from the first login to a pipeline's scoped tokens.
- [Command reference](/cli/commands): every `--help` page, generated from the binary.
- [TENETS.md](https://github.com/thenervelab/hippius-cli/blob/main/TENETS.md): the contract `hipc` keeps, tenet by tenet.
- Agents start at [docs.hippius.com/llms.txt](https://docs.hippius.com/llms.txt).
