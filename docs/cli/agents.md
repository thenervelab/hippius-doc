---
id: agents
title: hipc for agents
sidebar_label: For agents
slug: /cli/agents
description: The hipc playbook for coding agents, written to be pasted into an agent's context. Discovery with hipc schema, the JSON output and error contract, exit codes, confirmations and guards, dry runs, pagination, selectors, secrets, idempotency, a worked loop, and when to use hipc api.
---

:::info Source
This page is [docs/agents.md](https://github.com/thenervelab/hippius-cli/blob/main/docs/agents.md) of the CLI repository, which tests hold to the binary, with its relative links rewritten to point at this site and at the repository; `scripts/sync_hip_agents.py` regenerates it and a check fails when the two drift. When they differ, that file wins. The raw file, for pasting into a context, is https://raw.githubusercontent.com/thenervelab/hippius-cli/main/docs/agents.md.
:::

This page is written to be pasted into an agent's context. It says how to learn `hipc`, how to read what it prints, what it asks for before a write, and what it refuses. The contract behind it is [TENETS.md](https://github.com/thenervelab/hippius-cli/blob/main/TENETS.md); the machine-readable half is `hipc schema`, which every rule below points back to.

`hipc` is the Hippius control plane from the terminal: accounts and projects, billing, S3 buckets and tokens, Hub, compute and App Engine, Kubernetes, databases, runners, CDN, the private network, and support. It moves no data. S3 objects go through the AWS CLI, boto3, or rclone with the profile `hipc s3 configure` writes; Drive files go through the Drive apps; Hub blobs go through `hippius-hub`, `docker`, or `oras`. `hippius-hub` ignores `HIPPIUS_TOKEN` for registry calls.

## Setup, once, by a person

An agent cannot create the account or sign in. A person signs in at https://console.hippius.com, copies the API token from https://console.hippius.com/dashboard/settings, and gives it to `hipc` on the machine the agent runs on:

```sh
brew install thenervelab/tap/hipc
# or
curl -fsSL https://github.com/thenervelab/hippius-cli/releases/latest/download/install.sh | sh
hipc auth login --token-file -      # paste the token, press Enter, then Ctrl-D
hipc auth status
```

`hipc auth login` reads the token from the file `--token-file` names, or from stdin when the path is `-`. It never reads it from argv, where `ps` shows it, and there is no prompt. The token is stored in `~/.hippius/config.toml` at mode `0600` and sent only to the origin it was stored for. For one run without storing anything, set `HIPPIUS_TOKEN`; it is never written to the file, and it goes to whatever origin that run targets.

Never ask the user to paste the token, a Drive unlock password, a recovery seed, or a one-time database password into the chat. The token goes to `hipc auth login` on their machine, and nothing else is an input to `hipc`.

## Discovery

Read the binary, not a web page: the installed version is the one that answers.

- `hipc schema` prints `schema_version` (now `2`) and every command as JSON, with its `path`, `effect` (`read_only`, `idempotent`, `non_idempotent`), `confirmation`, `reveal`, `pagination`, `guards`, `args`, and `flags`, the `global_flags` once, and every error code with its exit code in `errors`. It is JSON in every mode and never touches the network. Read it once per `hipc version`, and treat a new `schema_version` as a document that renamed or removed a field.
- The `--help` of every group and command is the prose: what the command sends, what it reads first, what it refuses, and examples at the end. The same pages are in [Command reference](/cli/commands).

```sh
hipc schema | jq -r '.commands[] | .path | join(" ")'
hipc schema | jq -r '.commands[] | select(.effect != "read_only") | .path | join(" ")'
hipc schema | jq '.commands[] | select(.path == ["s3", "buckets", "create"])'
hipc schema | jq '.errors'
hipc s3 buckets create --help
```

The grammar is service, resource, verb, as in `hipc compute vms list`, with `list`, `get`, `create`, `update`, `delete` and a short shelf of product verbs. There is no `show`, `describe`, or alias. `get` reads one resource, with one exception: `hipc network get` creates the account's private network on its first call, so it needs `--yes` every time. To set the network up on purpose, run `hipc network create --yes`.

## Output

- `--output auto`, the default, prints JSON when stdout is not a terminal, when `CI` is set to any value, or when `AI_AGENT` is set to anything but empty, `0`, `false`, `no`, or `off`. `--json` forces it; `--output text` forces text. A flag always wins over the detection.
- A successful document is the resource itself, with no wrapper and no `ok` field: exit 0 is the success. A list is `{"items":[...],"next_page_token":null}`, with the server's other page fields beside `items`.
- A document only gains fields; a field is never renamed, removed, or retyped without a new major version. Before 1.0 a minor version may remove or rename a field, always with a new `schema_version`. Server numbers are printed unchanged, never rounded.
- Honor `next_step` when it is present: it is the `hipc` command that reads what a person finishes in a browser (a Drive or S3 card subscribe, `hipc billing auto-reload card-setup`, `hipc cdn hostnames domain-connect`). Ignore every other field you do not know.
- Money: `hipc billing summary` and `hipc billing usage` keep base units in JSON (`10^18` is $1), and `balance` on the summary is dollars. Text mode shows credits (1 credit is $1).
- With `CI`, `AI_AGENT`, or a pipe, `hipc compute vms create` and `hipc compute app-engine apps create` return before the VM or app is `running`; pass `--wait` to wait, or follow it with `hipc compute vms get` or `hipc compute app-engine apps get`. `hipc compute databases create` never waits; follow it with `hipc compute databases get`.
- stdout holds the result and nothing else. stderr holds diagnostics; in JSON mode, only the one error object below, after any `--debug` lines. No pager, spinner, color, or update check.

## Errors and exit codes

Exit `0` is success, a dry run included. Exit `1` is an API or runtime failure. Exit `2` means the invocation must change, and nothing that changes state was sent.

A failure prints one JSON object on the last line of stderr (any `--debug` lines come first) and leaves stdout empty, with two exceptions: after `partial_failure`, and after a VM or app launch whose wait ended before `running`, stdout holds what was done. Keep that document; the id is in it.

```json
{"error":{"code":"not_found","message":"cannot get the VM `vm_123`: the API says `Not found.`","request_id":null,"hint":"run `hipc compute vms list` to see what exists","retryable":false,"side_effects":"none","http_status":404,"retry_after_ms":null,"details":{"detail":"Not found."}}}
```

Branch on `code`, never on `message`. The codes are a closed set, listed with their exit codes in `hipc schema` and in [TENETS.md](https://github.com/thenervelab/hippius-cli/blob/main/TENETS.md#4-errors-are-one-json-object-and-the-exit-code-is-small). The ones an agent meets first:

| Code | Exit | What to do |
| --- | --- | --- |
| `usage` | 2 | fix the flag, argument, variable, or local file the `hint` names |
| `confirmation_required` | 2 | nothing was sent; the command needs `--yes` (see below). Pass it only for the write you meant |
| `reveal_required` | 2 | the answer holds a secret: run it again with `--reveal`, and keep the answer out of logs |
| `remove_others_required`, `public_required`, `replace_required`, `change_isolation_required` | 2 | a write would drop entries, publish a bucket or open the Hub namespace, charge a second Hub plan, or change the network's isolation: read the `hint`, then pass the one flag it names, or stop |
| `account_scope_unsupported`, `project_scope_unsupported`, `billing_scope_unsupported` | 2 | the route cannot take the selected account, project, or billing account; drop that selector |
| `auth` | 1 | no token for this origin, or a 401: a person runs `hipc auth login` |
| `not_found`, `conflict`, `validation`, `payment_required`, `permission` | 1 | the server refused; `details` holds its body |
| `rate_limited`, `unavailable`, `timeout` | 1 | wait `retry_after_ms` when it is set, then retry only if `retryable` is true |
| `partial_failure` | 1 | part of a multi-call command failed; stdout holds what was done |
| `internal` | 1 | run again with `--debug` and report it at https://github.com/thenervelab/hippius-cli/issues |

Two refusals to recognise:

- A network command on an account with no private network is `permission` (403) with the message `the private network is not set up for this account`; the hint is `hipc network create --yes`. Ask the user before creating it.
- A refused compose (`hipc compute app-engine validate`) is `validation` with every problem in `details.issues`, each with its `rule`, `line`, `column`, `message`, and `hint`, so one pass can fix the file.

`side_effects` is `none` or `partial`. After `partial`, read the resource before repeating the write: a timeout after a `POST` may have created the thing. `hipc` never retries on its own.

## Confirmations and guards

A command that spends money, deletes, revokes, rotates, cancels, or opens or closes a support ticket needs `--yes`, or it exits 2 `confirmation_required` and sends nothing. So do `hipc network get` and `hipc network create`, `hipc hub namespace create`, and `hipc auth logout`; `confirmation` and `confirmation_when` in `hipc schema` name every one. `CI` and `AI_AGENT` never stand in for `--yes`; a terminal prompt appears only when a person is there and no variable is set. `--no-input` turns every prompt into that refusal.

Some writes need a second flag that names their risk. `--yes` does not imply it, and it does not imply `--yes`:

- `--reveal`: the answer holds a secret.
- `--remove-others`: a list replace (firewall rules, CDN cache rules, WAF rules and rate limits, a WAF list's items, a member's grants) would drop an entry that exists now.
- `--public`: a CDN zone or a bucket ACL may publish a private bucket, or `hipc hub namespace update --visibility public` would let anyone pull from the namespace.
- `--replace`: a Hub subscribe while a paid plan is active.
- `--change-isolation`: a `hipc api` call that changes which peers of the network can reach each other.

`guards` in `hipc schema` lists each refusal a command can make before sending anything, as `code`, `flag`, and `when`. The checks run in a fixed order, all before any request that changes state.

## Dry runs

`--dry-run` prints every request a real run would send, in order, with placeholders for values only a read can give. It sends nothing, needs no token, and needs no confirmation flag. Run it before every write you have not run before:

```sh
hipc s3 buckets create photos --dry-run
hipc compute vms create --flavor small --ssh-key-id 123 --dry-run
```

Success exits 0. A dry run still exits 2 for a bad argument, for a local file the command must read that is missing or open to others (`hipc compute kubernetes clusters kubeconfig` reads `--cluster-key-file`, `hipc compute app-engine apps create` reads `--compose-file`, and `--secrets-file` when given), and for a route `hipc api` never sends.

The document starts with `"dry_run": true`. Each request (the top level, or each entry of `requests`) carries `method`, `url`, `account_header`, `project_header`, `billing_header`, and `body`; the three headers are always present, `null` when the request goes out without one. A command that only changes a local file (`hipc auth login`, `hipc account use`, `hipc s3 configure`) sends nothing: its dry run names the `action` and the `profile` (or `aws_profile`) it would change.

## Pagination

A list returns one page, 100 items by default. `--limit <N>` sets the page size, `--page-token <TOKEN>` asks for the page `next_page_token` named, and `--all` follows to the end and prints one array. `pagination` in `hipc schema` says which lists page; a list without these flags is read whole.

```sh
hipc billing transactions --limit 20
hipc compute ssh-keys list --all
```

- `next_page_token` is null on the last page. `hipc` never prints one page as the whole list: an answer that says more exist without a way to reach them is `internal`.
- `hipc compute runners jobs` pages at the server's fixed size and has no `--limit`. `hipc hub models list` works out the next page from the index's `page`, `page_size`, and `total`.
- Past 1000 pages or 64 MiB, `--all` stops with `internal`. Page with `--page-token` instead of filing that as a bug.

## Accounts, projects, and billing accounts

One token can act in the user's own account and in any shared account they are a member of. `hipc account list` shows them; `--account <ID>` picks one for a run, `hipc account use <account_id>` for every later run, and `self` goes back. Projects and billing accounts work the same way with `--project`, `--billing`, `hipc account projects use`, and `hipc account billing-accounts use`; `default` goes back. The variables `HIPPIUS_ACCOUNT`, `HIPPIUS_PROJECT`, and `HIPPIUS_BILLING` do the same for a shell.

- `hipc account use` clears a stored project and billing account when the account changes. Set them again afterwards.
- No route takes both a project and a billing account, so passing both by flag or variable refuses every route except the personal ones.
- A route that cannot take the selection refuses one from a flag or variable with `account_scope_unsupported`, `project_scope_unsupported`, or `billing_scope_unsupported` (exit 2) rather than act in the wrong place. A selection stored with `use` is left off a read of such a route and refuses a write.
- A stored project is also left off the routes that name one project in their path (`hipc account projects update`, `delete`, `transfer`, `budget`, and `quota`), and a stored billing account off `hipc account billing-accounts update`: the path says which one. A selection from a flag or variable still refuses them.
- Personal routes act as the signed-in user whatever is selected, and send no selection: SSH keys, support tickets, project transfers, referral links (`hipc account referrals list`), notification settings (`hipc account notifications get`), and marketing consent.

Projects and billing accounts are created and renamed with `hipc account projects create` and `update`, and `hipc account billing-accounts create` and `update`; these are free and take no `--yes`. A project also has an archive (`delete`), a `budget`, a `quota`, and a `transfer` to another account, each needing `--yes`. `hipc account project-transfers list` joins the transfers offered to the account and those it offered; each item's `direction`, `incoming` or `outgoing`, is `hipc`'s own field.

## Secrets

A command whose answer holds a secret needs `--reveal`: creating or rotating an S3 token or a Hub key, creating a Hub namespace, rotating the Hub docker robot secret (`hipc hub namespace robot rotate`), creating or restoring a database, reading Kubernetes backups, and presigning an S3 URL. The secret is printed once, on stdout, in the resource; with `--credentials-dir`, `hipc compute databases create` writes the TLS files to new files instead. A later read (`hipc hub keys get`, or the `list` of S3 tokens or Hub keys) shows `secret: null` and a preview. There is no second read of a secret; the recovery is a rotate. A kubeconfig is the exception: `hipc compute kubernetes clusters kubeconfig` writes it only to `--output-file` and needs no `--reveal`.

Write a secret where the user asked and nowhere else. `--debug` prints only each request's method, its URL with the query values redacted, and its status, never a header or a body, so its lines are safe to show.

A secret the user sends comes only from a private file, never from argv or stdin: the file must be the user's own, mode 0600, not a symlink, in a directory no one else can write. `hipc cdn hostnames dns-setup` reads a DNS provider credential from `--credentials-file`. `hipc compute app-engine apps create` reads an app's secret values from `--secrets-file`, one JSON object of each name to its value, and the names must be exactly the ones the compose declares. Its dry run shows `<the NAME from --secrets-file>` for each value, and every value is redacted from the answer and from every error. Secret values are write-only, and in this beta Hippius operators can read them. Do not write the values anywhere else to build the file.

## App Engine

App Engine runs one docker compose file on a confidential VM. An app is a VM, so delete, power, resize, and backups go through the VM and backup commands (`hipc compute vms delete`, `hipc compute backups list`) with its `vm_id`.

```sh
hipc compute app-engine get                                   # may the account use it, and its limits
hipc compute app-engine validate --compose-file compose.yaml  # check, launch nothing
hipc compute app-engine fix --compose-file compose.yaml --output-file fixed.yaml
hipc compute app-engine apps create --flavor small --compose-file compose.yaml --secrets-file secrets.json --dry-run
hipc compute app-engine apps list
```

`apps create` spends money and needs `--yes`. It first sends the compose alone to `validate` (no secret leaves the machine), checks that the answer's hash is the file's, and checks the secrets file against the names the compose declares: a declared name with no value, or a value for a name it does not declare, is `usage` (exit 2) before the question, so nothing is launched. It waits as `hipc compute vms create` does: at a terminal until the app is `running`, and with `CI`, `AI_AGENT`, or a pipe it returns at once unless `--wait` or `--wait-timeout` is given; a wait that ends early still prints the app, so its `vm_id` is not lost. Then `apps get` prints the exact compose and its last revisions, `apps runtime` what the app's runner reports, and `guest-components get` the release its VM runs.

## Idempotency

`effect` in `hipc schema` says what a repeat does: `read_only` changes nothing; `idempotent` leaves the server as one call did (deletes, revokes, cancels, start and stop, `hipc network create`); `non_idempotent` does the work again or spends again (creates, subscribes, resizes, rotates). Before repeating a `non_idempotent` command after a failure, list the resource.

## What hipc refuses

Do not look for these; they are refused by design ([TENETS.md](https://github.com/thenervelab/hippius-cli/blob/main/TENETS.md#14-what-we-refuse)): a pager or a TUI, a generated command per API operation, uploading or downloading S3 objects, Drive files, or Hub blobs, an `--idempotency-key` the server ignores, a secret printed twice or without `--reveal`, a token in argv, a hardcoded price, a `--dry-run` that calls the server, reading `CI` or `AI_AGENT` as a reason to skip a confirmation, and rounding a server number.

## A worked loop

Read the schema, dry-run the write, run it with `--yes`, parse the answer, and branch on the error code:

```sh
hipc schema | jq '.commands[] | select(.path == ["s3", "buckets", "create"]) | {effect, confirmation, args, flags}'
hipc s3 buckets create photos --dry-run
hipc s3 buckets create photos --yes
hipc s3 buckets list | jq -r '.items[].name'
```

The same loop from a program, with the error object read from the last line of stderr:

```python
import json, os, subprocess

def hipc(*args):
    run = subprocess.run(
        ["hipc", *args],
        capture_output=True, text=True,
        env={**os.environ, "AI_AGENT": "1"},
    )
    if run.returncode == 0:
        return json.loads(run.stdout) if run.stdout else None
    # The error object is the last line; --debug lines may come before it.
    error = json.loads(run.stderr.strip().splitlines()[-1])["error"]
    if run.stdout.strip():
        # partial_failure, or a VM or app launch whose wait ended early: keep what was done.
        done = json.loads(run.stdout)
        raise RuntimeError(f"{error['code']}: {error['message']}; kept {done}")
    if error["code"] == "confirmation_required":
        raise RuntimeError(f"needs --yes: {error['message']}")
    if error["retryable"]:
        raise RuntimeError(f"retry after {error['retry_after_ms']} ms")
    raise RuntimeError(f"{error['code']}: {error['message']}; {error['hint']}")

plan = hipc("s3", "buckets", "create", "photos", "--dry-run")
bucket = hipc("s3", "buckets", "create", "photos", "--yes")
names = [b["name"] for b in hipc("s3", "buckets", "list")["items"]]
```

## When to use hipc api

`hipc api <METHOD> <PATH>` calls any console endpoint with the same token, account rules, confirmations, guards, and error object as every other command. Use it for a route no command covers yet; prefer the command when one exists, because it reads first, names the risk, and prints a document that only gains fields.

```sh
hipc api GET /accounts/
hipc api GET /compute/vms/ --all
hipc api POST /cdn/zones/ --body-file zone.json --yes
```

A method other than `GET` or `HEAD` needs `--yes`, and so does `GET` or `HEAD` of `/network/me/`, whose first call creates the account's network; a route whose answer holds a secret needs `--reveal`; `--dry-run` works as everywhere. Three requests are never sent, whatever the flags: an account deletion request, a read of a Kubernetes cluster's sealed secrets, and a CDN hostname's DNS setup. An App Engine launch, compose update, or compose check whose body sets `secrets` is never sent either; without `secrets` it is sent as usual. A full URL on another origin is sent, but without the token and the account header. `hipc api --help`, and `refused_when` and `confirmation_when` on `api` in `hipc schema`, say all of this.

## Where to read next

- [Command reference](/cli/commands): every `--help` page, generated from the binary.
- [TENETS.md](https://github.com/thenervelab/hippius-cli/blob/main/TENETS.md): the whole contract, tenet by tenet.
- [user-journeys.md](https://github.com/thenervelab/hippius-cli/blob/main/docs/user-journeys.md): twelve scenarios with their commands in order, including the agent one.
