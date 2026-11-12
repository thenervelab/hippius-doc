---
id: agents
title: hipc for agents
sidebar_label: For agents
slug: /cli/agents
description: "The one page a coding agent reads before using hipc: how to find a command with --help and hipc schema, the dry-run and --yes loop, the JSON output and error contract, and the safety rules."
---

:::info Source
This page is [docs/agents.md](https://github.com/thenervelab/hippius-cli/blob/main/docs/agents.md) of the CLI repository, which tests hold to the binary, with its links rewritten for this site; `scripts/sync_hip_agents.py` regenerates it and the pages under it, and a check fails when they drift. When they differ, that file wins. The raw file, for pasting into a context, is https://raw.githubusercontent.com/thenervelab/hippius-cli/main/docs/agents.md.
:::

`hipc` runs the Hippius control plane from a shell: accounts and projects, billing, S3 buckets and tokens, Drive plans, Hub, compute (VMs, App Engine, Kubernetes, databases, runners), CDN, the private network, and support. It moves no data: S3 objects go through the AWS CLI or rclone with the profile `hipc s3 configure` writes, and Hub images go through `docker` or `hippius-hub`.

This page is the whole of what an agent needs to read. Everything about a single command (its flags, arguments, effect, confirmation, and examples) comes from the installed binary, which is always the right version. Look it up there; don't recall it from memory or from a web page.

## Find the command

The grammar is service, then resource, then verb, as in `hipc compute vms list`. Verbs come from a short shelf: `list`, `get`, `create`, `update`, `delete`, plus product words such as `subscribe`, `rotate`, `presign`, and `top-up`. There is no `show`, `describe`, or alias.

Walk the tree with help, one level at a time. Each page lists what it holds, one line each, and ends with examples:

```sh
hipc --help                       # the services, the global flags, exit codes
hipc s3 --help                    # the resources of one service
hipc s3 buckets --help            # the verbs of one resource
hipc s3 buckets create --help     # one command: what it sends, reads first, refuses; examples
```

`hipc schema` gives the same tree as JSON. Pass a path to keep it small: `hipc schema s3 buckets` lists only the commands under it, each with its `about` line, `effect` (`read_only`, `idempotent`, or `non_idempotent`), `confirmation`, `guards`, `args`, and `flags`. The whole document is large; don't read it unfiltered.

A wrong guess is cheap: an unknown name exits 2 `usage`, and the message lists the names that exist there.

## The loop

1. Find the command, and read its `--help` before the first use.
2. For a write, run it with `--dry-run` first. That prints the exact requests and sends nothing.
3. If the command spends money, deletes, or can't be undone (`confirmation` in the schema, or "needs --yes" at the end of its help line), tell the user what it will do and get a yes before adding `--yes`. `--yes` is the user's consent, not a way around an error.
4. Run it, read the JSON on stdout, and on failure branch on the error `code`.

```sh
hipc schema s3 buckets create | jq '.commands[0] | {about, effect, confirmation}'
hipc s3 buckets create photos --dry-run
hipc s3 buckets create photos --yes
hipc s3 buckets list | jq -r '.items[].name'
```

## Output

- When stdout is not a terminal, or `AI_AGENT` or `CI` is set, output is JSON. `--json` forces it.
- Success is exit 0, and stdout is the resource itself, with no wrapper. A list is `{"items":[...],"next_page_token":null}`; pass `--page-token` to get the next page, or `--all` for every page as one array.
- Fields are only added. Ignore the ones you don't know.
- `next_step`, when present, is the `hipc` command to run after the user finishes something in a browser, such as a card checkout.
- Billing amounts in JSON are base units (`10^18` is $1) unless the field says dollars.
- `warnings`, when present, holds texts the user should see.

## Errors

A failure prints one JSON object as the last line of stderr: `{"error":{"code","message","hint","retryable","side_effects","details",...}}`. Branch on `code`, never on `message`, and follow the `hint`: it names the command or flag that fixes the problem. `hipc schema` lists every code under `errors`.

| Exit | Codes | What to do |
| --- | --- | --- |
| 2 | `usage` | Fix the command line. Nothing was sent. |
| 2 | `confirmation_required` | Nothing was sent. Ask the user, then add `--yes`. |
| 2 | `reveal_required`, `public_required`, `remove_others_required`, `replace_required` | A second risk needs its own flag. See below. |
| 2 | `account_scope_unsupported`, `project_scope_unsupported`, `billing_scope_unsupported` | This command can't act in the selected account, project, or billing account. Drop that selector. |
| 1 | `auth` | No token. The user runs `hipc auth login` in their own terminal. |
| 1 | `not_found`, `conflict`, `validation`, `permission`, `payment_required` | The server refused. `details` holds its answer. |
| 1 | `rate_limited`, `unavailable`, `timeout` | Retry only if `retryable` is true, after `retry_after_ms`. |
| 1 | `partial_failure`, `internal` | Read stdout and `side_effects` first. |

When a failed command still printed a document on stdout, keep it: it is what was done, and may hold a new id or a one-time secret. When `side_effects` is `partial`, read the resource before running the write again; it may have happened. `hipc` never retries on its own.

## Safety rules

- **The user signs in, not you.** `hipc auth login` asks for an API token at a hidden prompt, in the user's own terminal. Never ask for the token, a 12-word access key, a seed phrase, or a password in the chat, and never put one on a command line. `hipc` refuses a command line that holds one. In CI, the token is the runner's `HIPPIUS_TOKEN` secret.
- **Second flags name a second risk.** `--yes` doesn't imply them:
  - `--reveal` prints a one-time secret;
  - `--public` may make a bucket or a namespace readable by anyone;
  - `--remove-others` lets a list replace drop entries that exist now;
  - `--replace` replaces a paid plan.

  Pass one only when the user asked for exactly that.
- **Keep secrets out of the transcript.** Commands that issue a secret take `--secret-file` or `--credentials-dir`, which write it to new private files and print their paths instead. Prefer those over `--reveal`. A secret is shown once; the recovery is a rotate. See [secrets](/cli/agents/secrets).
- **Dry runs prove the request, not the outcome.** `--dry-run` checks the command line and local files but asks the server nothing.

## Examples

One per service, to show the shape. `--help` on each has more.

```sh
hipc auth status                                       # which token and account a run uses
hipc account list                                      # the accounts this token can act in
hipc billing balance
hipc billing top-up --amount 25 --method card --dry-run
hipc drive subscription get
hipc s3 tokens create --kind sub --bucket photos --action read --secret-file s3.secret --yes
hipc s3 configure --from-token-file token.json --aws-profile hippius
hipc hub keys create --name ci --role push --secret-file ci.secret --yes
hipc compute vms create --flavor small --ssh-key-id 123 --open-ssh --dry-run
hipc compute databases list
hipc cdn zones list
hipc support tickets list
```

`hipc api GET /accounts/` calls a console route that no command covers yet, with the same token, confirmations, and errors. Prefer a command when one exists. See [hipc api](/cli/agents/api).

## Read on only when the task needs it

- [Accounts, projects, and billing accounts](/cli/agents/accounts): acting in a shared account or a project, and the `*_scope_unsupported` refusals.
- [Secrets](/cli/agents/secrets): S3 and Hub keys, database credentials, and DNS and App Engine secrets.
- [Hub](/cli/agents/hub): how `hippius-hub registry` commands map to `hipc` commands.
- [hipc api](/cli/agents/api): what it sends, what it refuses, and when to use it.

## For the user's own agent file

To point an agent at `hipc` in a project, add this to the project's `AGENTS.md` or `CLAUDE.md`:

```text
Hippius (storage, compute, CDN, Hub, billing) is managed with the CLI named hipc
Read https://github.com/thenervelab/hippius-cli/blob/main/docs/agents.md once.
To find a command, start from: hipc --help
Dry-run every write, and ask the user before adding --yes.
```
