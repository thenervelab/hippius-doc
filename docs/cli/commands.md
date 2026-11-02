---
id: commands
title: hip command reference
sidebar_label: Command reference
slug: /cli/commands
description: Where the hip command reference lives, how it is generated from the binary, and how to read a command's help and the machine-readable schema.
---

The reference is the help. Every page of `hip --help`, the top level, each group, and each command, is rendered into one Markdown file in the repository, [docs/commands.md](https://github.com/thenervelab/hippius-cli/blob/main/docs/commands.md), by a script that runs the built binary. A test fails while the page differs from the binary, so what you read there is what the installed version says. It is not copied here, so there is one source of truth.

## Read it from the binary

The installed version is the one that answers. Three ways in:

```bash
hip --help                      # the groups, the global options, the exit codes
hip s3 --help                   # one group
hip s3 buckets create --help    # one command: what it sends, what it refuses, examples
```

For a program, `hip schema` is the same tree as JSON: every command with its `effect`, `confirmation`, `reveal`, `pagination`, `guards`, `args`, and `flags`, the global options once, and every error code with its exit code. It is JSON in every mode and never touches the network.

```bash
hip schema | jq -r '.commands[] | .path | join(" ")'
hip schema | jq '.commands[] | select(.path == ["s3", "buckets", "create"])'
hip schema | jq '.errors'
```

## The groups

From `hip --help`:

| Command | What it holds |
| --- | --- |
| `hip version` | The version; does not touch the network |
| `hip status` | The state of each product for the signed-in user: Hub, Drive, S3, and compute |
| `hip schema` | Every command with its effect, as JSON in every output mode |
| `hip completions` | A shell completion script for bash, zsh, fish, elvish, or powershell |
| `hip auth` | Store, check, or remove the console API token |
| `hip account` | The accounts the token can act in, members, invites, projects, and billing accounts |
| `hip billing` | The balance, compute burn rate and usage, every plan in one view, transactions, invoices, the billing profile, auto-reload, and top-ups |
| `hip drive` | Drive plans and the Drive subscription |
| `hip s3` | S3 plans, buckets, their objects' listing and presigned URLs, tokens, and an AWS CLI profile for s3.hippius.com |
| `hip hub` | Hub plans, the Hub subscription, the registry namespace, its usage, its repositories and artifacts, and its CI keys |
| `hip compute` | Virtual machines, their catalog and quota, public IPv4 and firewall, backups, SSH keys, managed databases, Kubernetes, and GitHub Actions runners |
| `hip cdn` | CDN zones that serve an S3 bucket, their spend cap, custom hostnames, cache purges, cache rules, traffic, and WAF |
| `hip support` | Support tickets: open one, list them, read one, and reply |
| `hip network` | The account's private network: its peers, groups, access policies, and VPC networks |
| `hip api` | Any console API endpoint, with the same token, account rules, confirmations, and error object |

## How a help page reads

The first line says what the command does and, when it needs one, the flag it needs: `Create a bucket; needs --yes`. The paragraph under it says what the command sends, what it reads first, and what it refuses. Then the usage line, the arguments, the command's own options, the global options, and at the end the examples, each one a line you can run.

Three things hold on every page: a command that spends, deletes, revokes, rotates, or cancels needs `--yes` outside a terminal; a command whose answer holds a secret needs `--reveal`; and `--dry-run` prints the requests a real run would send, sends nothing, and exits 0. [hip for agents](/cli/agents) has the rest of the contract.
