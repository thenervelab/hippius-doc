---
id: index
title: hip, the Hippius command line
sidebar_label: Get started
slug: /cli
description: Install hip, the Hippius command line for coding agents and people, store your API token once, and drive accounts, billing, S3, Hub, compute, Kubernetes, CDN and support from a terminal.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`hip` is the Hippius command line, for coding agents and for people. One binary drives everything the console manages: accounts, projects and teams, the balance and the plans, S3 buckets and tokens, the Hub registry, confidential virtual machines, managed Kubernetes and PostgreSQL, GitHub Actions runners, CDN zones and their WAF, the private network, and support tickets.

It does not move data: S3 objects stay with the AWS CLI or rclone, Drive files with the Drive apps, and Hub blobs with `hippius-hub`. It is the control plane, from a shell.

When a person and a program want different things, the program wins: on a pipe, output is JSON, an error is one JSON object, nothing prompts, and nothing pages. Source, releases, and the full documentation: [github.com/thenervelab/hippius-cli](https://github.com/thenervelab/hippius-cli).

## Install

`hip` runs on macOS (Apple silicon and Intel) and Linux (x86_64 and aarch64). Each channel installs one command, `hip`.

<Tabs groupId="install">
<TabItem value="curl" label="curl">

The install script downloads the release for your machine into `~/.local/bin` (or `$HIP_INSTALL_DIR`), with no root. It checks the tarball against the release's `SHA256SUMS`, and the Sigstore signature of `SHA256SUMS` when `cosign` is on `PATH`.

```bash
curl -fsSL https://github.com/thenervelab/hippius-cli/releases/latest/download/install.sh | sh
```

</TabItem>
<TabItem value="brew" label="Homebrew">

On macOS and Linux:

```bash
brew install thenervelab/tap/hip
```

</TabItem>
<TabItem value="pypi" label="PyPI">

From 1.0.0, for a machine that already has Python. The wheels hold the same binary. The package `hippius` was the Python SDK up to 0.2.77; pin `hippius==0.2.77` if your code imports it.

```bash
pip install hippius
```

</TabItem>
</Tabs>

Then check it:

```bash
hip version
```

## Log in

`hip` cannot create an account or sign in for you. Sign in at [console.hippius.com](https://console.hippius.com) once, open [Settings](https://console.hippius.com/dashboard/settings), and copy your API token. Then store it:

```bash
hip auth login --token-file -      # paste the token, press Enter, then Ctrl-D
hip auth status
```

The token is read from stdin with `-`, or from a file: `hip auth login --token-file ~/token.txt`, then delete the file. On macOS, `pbpaste | hip auth login --token-file -` reads it from the clipboard. It is never read from the command line, where other users can see it with `ps`. It is stored in `~/.hippius/config.toml` at mode `0600`; `HIPPIUS_TOKEN` sets a token for one run without storing it.

## First commands

```bash
hip account get
hip billing balance
hip s3 buckets list
hip compute vms list --json
hip s3 buckets create photos --dry-run
```

A command that spends, deletes, revokes, rotates, or cancels asks first at a terminal, and needs `--yes` everywhere else. A command whose answer holds a secret needs `--reveal`. `--dry-run` prints the requests a real run would send and sends nothing. The `--help` of every command ends with examples.

## For agents

```bash
hip schema                                 # every command, its effect, flags, confirmation, guards, and every error code; JSON, no network
hip compute vms list --json                # JSON at a terminal too; a pipe, CI=1, or AI_AGENT=1 already means JSON
hip s3 buckets create photos --dry-run     # the requests a real run would send; sends nothing, needs no token, exit 0
hip s3 buckets create photos --yes         # confirms a command that spends, deletes, revokes, rotates, or cancels
# exit 0: done; 1: the API or the runtime failed; 2: the invocation must change, nothing was sent
# a failure is one JSON object on stderr: {"error":{"code":...,"hint":...,"retryable":...,"side_effects":...}}
```

[hip for agents](/cli/agents) is the playbook, written to be pasted into an agent's context.

## Where to next

- [hip for agents](/cli/agents): discovery, the output and error contract, confirmations, dry runs, a worked loop.
- [Examples](/cli/examples): twelve journeys as copyable snippets, from the first login to a pipeline's scoped tokens.
- [Command reference](/cli/commands): every `--help` page, generated from the binary.
- [TENETS.md](https://github.com/thenervelab/hippius-cli/blob/main/TENETS.md): the contract `hip` keeps, tenet by tenet.
- Agents start at [docs.hippius.com/llms.txt](https://docs.hippius.com/llms.txt).
