---
id: commands
title: Finding a command
sidebar_label: Finding a command
slug: /cli/commands
description: There is no command list to read on this site. The installed hipc answers for its own version, with --help at every level and hipc schema for a path.
---

These docs don't list `hipc` commands or their flags. The installed binary describes itself, for its own version, so ask it.

## Walk the help

The grammar is service, then resource, then verb, as in `hipc compute vms list`. Each help page lists what it holds, one line each, and ends with examples you can run:

```bash
hipc --help                       # the services, the global options, the exit codes
hipc s3 --help                    # the resources of one service
hipc s3 buckets --help            # the verbs of one resource
hipc s3 buckets create --help     # one command: what it sends, reads first, refuses; examples
```

A help line that ends in "needs --yes" spends, deletes, or can't be undone. The global options are listed only in `hipc --help`; they work after any command.

A wrong name is cheap: it exits 2 `usage`, sends nothing, and the message lists the names that exist at that level.

## Ask the schema

`hipc schema` is the same tree as JSON, with no network call. The whole document is about 190 KB, so pass a path to keep it small:

```bash
hipc schema s3 buckets | jq -r '.commands[] | .path | join(" ")'
hipc schema s3 buckets create | jq '.commands[0] | {about, effect, confirmation}'
```

Each command carries its `effect` (`read_only`, `idempotent`, or `non_idempotent`), `confirmation`, `guards`, `args`, and `flags`. The document also holds `global_flags` and `errors`, every error code with its exit code.

[hipc for agents](/cli/agents) has the rest: the dry-run and `--yes` loop, the output and error contract, and the safety rules.
