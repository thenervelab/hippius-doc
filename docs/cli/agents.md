---
id: agents
title: hip for agents
sidebar_label: For agents
slug: /cli/agents
description: The hip playbook for coding agents, written to be pasted into an agent's context. Discovery with hip schema, the JSON output and error contract, exit codes, confirmations and guards, dry runs, pagination, selectors, secrets, idempotency, a worked loop, and when to use hip api.
---

:::info Source
This page mirrors [docs/agents.md](https://github.com/thenervelab/hippius-cli/blob/main/docs/agents.md) in the hip repository, which is the version tests hold to the binary. When the two differ, that file wins. The raw file, for pasting into a context, is https://raw.githubusercontent.com/thenervelab/hippius-cli/main/docs/agents.md.
:::

This page is written to be pasted into an agent's context. It says how to learn `hip`, how to read what it prints, what it asks for before a write, and what it refuses. The contract behind it is [TENETS.md](https://github.com/thenervelab/hippius-cli/blob/main/TENETS.md); the machine-readable half of that contract is `hip schema`, which every rule below points back to.

`hip` is the Hippius control plane from the terminal: accounts, billing, S3 buckets and tokens, Hub, compute, Kubernetes, databases, runners, CDN, the private network, and support. It moves no data: S3 objects go through the AWS CLI or rclone with the profile `hip s3 configure` writes, Hub blobs through `hippius-hub`.

## Setup, once, by a person

An agent cannot create the account or sign in. A person signs in at https://console.hippius.com, copies the API token from https://console.hippius.com/dashboard/settings, and gives it to `hip` on the machine the agent runs on:

```sh
curl -fsSL https://github.com/thenervelab/hippius-cli/releases/latest/download/install.sh | sh
hip auth login --token-file -      # paste the token, press Enter, then Ctrl-D
hip auth status
```

`hip auth login` reads the token from the file `--token-file` names, or from stdin when the path is `-`. It never reads it from argv, where `ps` shows it, and there is no prompt. The token is stored in `~/.hippius/config.toml` at mode `0600`. For one run without storing anything, set `HIPPIUS_TOKEN`; it is never written to the file.

Never ask the user to paste the token, a Drive unlock password, a recovery seed, or a one-time database password into the chat. The token goes to `hip auth login` on their machine, and nothing else is an input to `hip`.

## Discovery

Read the binary, not a web page: the installed version is the one that answers.

- `hip schema` prints every command as JSON, with its `path`, `effect` (`read_only`, `idempotent`, `non_idempotent`), `confirmation`, `reveal`, `pagination`, `guards`, `args`, and `flags`, the `global_flags` once, and every error code with its exit code in `errors`. It is JSON in every mode and never touches the network. Read it once per `hip version`.
- The top-level `--help`, and the `--help` of every group and command, is the prose: what the command sends, what it reads first, what it refuses, and examples at the end. The same pages are rendered in [Command reference](/cli/commands).

```sh
hip schema | jq -r '.commands[] | .path | join(" ")'
hip schema | jq -r '.commands[] | select(.effect != "read_only") | .path | join(" ")'
hip schema | jq '.commands[] | select(.path == ["s3", "buckets", "create"])'
hip schema | jq '.errors'
hip s3 buckets create --help
```

The grammar is service, resource, verb, as in `hip compute vms list`, with `list`, `get`, `create`, `update`, `delete` and a short shelf of product verbs; `get` reads one resource. There is no `show`, `describe`, or alias.

## Output

- `--output auto`, the default, prints JSON when stdout is not a terminal, when `CI` is set, or when `AI_AGENT` is set to anything but empty, `0`, `false`, `no`, or `off`. `--json` forces it; `--output text` forces text. A flag always wins over the detection.
- A successful document is the resource itself, with no wrapper. A list is `{"items":[...],"next_page_token":null}`, with the server's other page fields beside `items`. `--all` follows every page and prints one array.
- A document only gains fields; a field is never renamed, removed, or retyped without a new major version. Ignore fields you do not know. Server numbers are printed unchanged, never rounded.
- stdout holds the result and nothing else. stderr holds diagnostics; in JSON mode, only the one error object below. No pager, spinner, color, or update check.

## Errors and exit codes

Exit `0` is success, a dry run included. Exit `1` is an API or runtime failure. Exit `2` means the invocation must change, and nothing that changes state was sent.

A failure prints one JSON object on one line of stderr and leaves stdout empty:

```json
{"error":{"code":"not_found","message":"cannot get the VM `vm_123`: the API says `Not found.`","request_id":null,"hint":"run `hip compute vms list` to see what exists","retryable":false,"side_effects":"none","http_status":404,"retry_after_ms":null,"details":{"detail":"Not found."}}}
```

Branch on `code`, never on `message`. The codes are a closed set, listed with their exit codes in `hip schema` and in [TENETS.md](https://github.com/thenervelab/hippius-cli/blob/main/TENETS.md#4-errors-are-one-json-object-and-the-exit-code-is-small). The ones an agent meets first:

| Code | Exit | What to do |
| --- | --- | --- |
| `usage` | 2 | fix the flag, argument, variable, or local file the `hint` names |
| `confirmation_required` | 2 | the command spends, deletes, revokes, rotates, or cancels: run it again with `--yes` |
| `reveal_required` | 2 | the answer holds a secret: run it again with `--reveal`, and keep the answer out of logs |
| `remove_others_required`, `public_required`, `replace_required` | 2 | a write would drop entries, publish a bucket, or charge a second Hub plan: read the `hint`, then pass the one flag it names, or stop |
| `auth` | 1 | no token for this origin, or a 401: a person runs `hip auth login` |
| `not_found`, `conflict`, `validation`, `payment_required`, `permission` | 1 | the server refused; `details` holds its body |
| `rate_limited`, `unavailable`, `timeout` | 1 | wait `retry_after_ms` when it is set, then retry only if `retryable` is true |
| `partial_failure` | 1 | part of a multi-call command failed; stdout holds what was done |
| `internal` | 1 | run again with `--debug` and report it at https://github.com/thenervelab/hippius-cli/issues |

`side_effects` is `none` or `partial`. After `partial`, read the resource before repeating the write: a timeout after a `POST` may have created the thing. `hip` never retries on its own.

## Confirmations and guards

A command that spends money, deletes, revokes, rotates, cancels, or opens a support ticket needs `--yes`, or it exits 2 `confirmation_required` and sends nothing. `CI` and `AI_AGENT` never stand in for `--yes`; a terminal prompt appears only when a person is there and no variable is set. `--no-input` turns every prompt into that refusal.

Some writes need a second flag that names their risk. `--yes` does not imply it, and it does not imply `--yes`:

- `--reveal`: the answer holds a secret.
- `--remove-others`: a list replace (firewall rules, CDN cache and WAF rules, a WAF list's items, a member's grants) would drop an entry that exists now.
- `--public`: a CDN zone may publish a private bucket.
- `--replace`: a Hub subscribe while a paid plan is active.

`guards` in `hip schema` lists each refusal a command can make before sending anything, with the flag that gets past it. The checks run in a fixed order, all before any request that changes state.

## Dry runs

`--dry-run` prints every request a real run would send, in order, with placeholders for values only a read can give, sends nothing, needs no token, and exits 0. Run it before every write you have not run before:

```sh
hip s3 buckets create photos --dry-run
hip compute vms create --flavor small --ssh-key-id 123 --dry-run
```

The document starts with `"dry_run": true` and carries `method`, `url`, `body`, and `requests`.

## Pagination

A list returns one page of 100 items. `--limit <N>` sets the page size, `--page-token <TOKEN>` asks for the page `next_page_token` named, and `--all` follows to the end and prints one array. `pagination` in `hip schema` says which lists page; `hip compute runners jobs` pages at the server's fixed size and has no `--limit`.

```sh
hip billing transactions --limit 20
hip compute ssh-keys list --all
```

## Accounts, projects, and billing accounts

One token can act in the user's own account and in any shared account they are a member of. `hip account list` shows them; `--account <ID>` picks one for a run, `hip account use <account_id>` for every later run, and `self` goes back. Projects and billing accounts work the same way with `--project`, `--billing`, `hip account projects use`, and `hip account billing-accounts use`; `default` goes back. The variables `HIPPIUS_ACCOUNT`, `HIPPIUS_PROJECT`, and `HIPPIUS_BILLING` do the same for a shell. A route that cannot take the selection refuses it locally with `account_scope_unsupported`, `project_scope_unsupported`, or `billing_scope_unsupported` (exit 2) rather than act in the wrong place.

## Secrets

A command whose answer holds a secret needs `--reveal`: creating or rotating an S3 token or a Hub key, provisioning a Hub namespace, creating or restoring a database, reading Kubernetes backups, presigning an S3 URL. The secret is printed once, on stdout, in the resource; a later `get` shows a preview and `secret: null`, and the recovery is a rotate. Write it where the user asked and nowhere else. `--debug` redacts headers, tokens, and query values, so its lines are safe to show.

## Idempotency

`effect` in `hip schema` says what a repeat does: `read_only` changes nothing; `idempotent` leaves the server as one call did (deletes, revokes, cancels, start and stop); `non_idempotent` does the work again or spends again (creates, subscribes, resizes, rotates). Before repeating a `non_idempotent` command after a failure, list the resource.

## What hip refuses

Do not look for these; they are refused by design ([TENETS.md](https://github.com/thenervelab/hippius-cli/blob/main/TENETS.md#14-what-we-refuse)): a pager or a TUI, a generated command per API operation, uploading or downloading S3 objects, Drive files, or Hub blobs, an `--idempotency-key` the server ignores, a secret printed twice or without `--reveal`, a token in argv, a hardcoded price, a `--dry-run` that calls the server, reading `CI` or `AI_AGENT` as a reason to skip a confirmation, and rounding a server number.

## A worked loop

Read the schema, dry-run the write, run it with `--yes`, parse the answer, and branch on the error code:

```sh
hip schema | jq '.commands[] | select(.path == ["s3", "buckets", "create"]) | {effect, confirmation, args, flags}'
hip s3 buckets create photos --dry-run
hip s3 buckets create photos --yes
hip s3 buckets list | jq -r '.items[].name'
```

The same loop from a program, with the error object read from stderr:

```python
import json, os, subprocess

def hip(*args):
    run = subprocess.run(
        ["hip", *args],
        capture_output=True, text=True,
        env={**os.environ, "AI_AGENT": "1"},
    )
    if run.returncode == 0:
        return json.loads(run.stdout) if run.stdout else None
    error = json.loads(run.stderr)["error"]
    if error["code"] == "confirmation_required":
        raise RuntimeError(f"needs --yes: {error['message']}")
    if error["retryable"]:
        raise RuntimeError(f"retry after {error['retry_after_ms']} ms")
    raise RuntimeError(f"{error['code']}: {error['message']}; {error['hint']}")

plan = hip("s3", "buckets", "create", "photos", "--dry-run")
bucket = hip("s3", "buckets", "create", "photos", "--yes")
names = [b["name"] for b in hip("s3", "buckets", "list")["items"]]
```

## When to use hip api

`hip api <METHOD> <PATH>` calls any console endpoint with the same token, account rules, confirmations, guards, and error object as every other command. Use it for a route no command covers yet; prefer the command when one exists, because it reads first, names the risk, and prints a document that only gains fields.

```sh
hip api GET /accounts/
hip api GET /compute/vms/ --all
hip api POST /cdn/zones/ --body-file zone.json --yes
```

A method other than `GET` or `HEAD` needs `--yes`, a route whose answer holds a secret needs `--reveal`, and `--dry-run` works as everywhere. Four things are never sent, whatever the flags: an account deletion request, a read of a Kubernetes cluster's sealed secrets, a CDN hostname's DNS setup, and anything to another origin. `hip api --help` and `refused_when` on `api` in `hip schema` list them.

## Where to read next

- [Command reference](/cli/commands): every `--help` page, generated from the binary.
- [TENETS.md](https://github.com/thenervelab/hippius-cli/blob/main/TENETS.md): the whole contract, tenet by tenet.
- [user-journeys.md](https://github.com/thenervelab/hippius-cli/blob/main/docs/user-journeys.md): twelve scenarios with their commands in order, including the agent one.
