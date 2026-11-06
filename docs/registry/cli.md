---
id: cli
title: The hippius-hub CLI
sidebar_label: CLI reference
slug: /registry/cli
---

# The `hippius-hub` CLI

`hippius-hub` is the unified CLI for namespace provisioning, credential management, registry search, and parallel uploads / downloads. It's the same package that ships the Python library: install it once and use either surface.

Full reference and source: [`github.com/thenervelab/hippius-hub`](https://github.com/thenervelab/hippius-hub). For AI agents and coding assistants there's a self-contained reference at [`llms.txt`](https://github.com/thenervelab/hippius-hub/blob/main/llms.txt).

---

## Install

```bash
pip install hippius_hub

hippius-hub --version
hippius-hub --help
```

Published wheels include the pre-built Rust core, so no toolchain is needed. Building from source requires Rust via [rustup](https://rustup.rs). See the [README](https://github.com/thenervelab/hippius-hub#install) for the source path.

PyPI is currently **0.7.0**. The git `main` branch can be ahead (0.7.2 as of 2026-09-07). `pip install hippius_hub` gets the wheel. The CLI prints a notice when a newer wheel exists; set `HIPPIUS_HUB_NO_UPDATE_CHECK=1` to turn it off (also auto-off when `CI=true`).

---

## Two kinds of credentials

| For… | Use | Cached at |
| --- | --- | --- |
| `registry` and `models` commands | **API token** from [console.hippius.com/dashboard/settings](https://console.hippius.com/dashboard/settings) | `~/.cache/hippius/hub/api_token` |
| `upload` / `download` (raw OCI registry IO) | Docker registry credentials | `~/.cache/hippius/hub/token` |

In practice the API token is all you save by hand. `hippius-hub registry provision <namespace>` mints the docker credentials and writes them into the second cache for you. Pass `--docker-login` to also run `docker login` so `docker push` / `docker pull` work.

```bash
hippius-hub login --hippius-token <token>
hippius-hub login --username '<login>' --password-stdin < key.txt   # registry creds, manual path
```

Keep the registry secret off the command line: pass it on stdin, as above, so it never shows in your shell history or in `ps`. Quote the login in single quotes: it contains a `$`, such as `robot$my-models+ci`.

For CI, don't share the namespace's own login. Create a scoped key (`hippius-hub registry keys create ci --role push > key.txt`, or `hipc --json hub keys create --name ci --role push --secret-file key.txt --reveal --yes > key.json`, which writes the secret alone to `key.txt` and the `login` to `key.json`) and log docker and `hippius-hub` in with its login and `--password-stdin`. `registry rotate-token` replaces the namespace login's secret, so everything logged in with that login has to log in again; CI keys keep working. A full workflow is on [Publish from GitHub Actions](/registry/ci).

---

## Manage your namespace

| Command | Purpose |
| --- | --- |
| `registry plans` | List pricing tiers and quotas |
| `registry check <name>` | Is a namespace available? |
| `registry provision <ns> [--docker-login]` | Create your namespace; new projects are public by default. The Free plan requires a balance of at least $10 on the account first |
| `registry status` | Poll an in-flight provision until the robot secret is ready |
| `registry me` | Plan, quota, status, and robot login of your active project |
| `registry repos [--page N --page-size M]` | List your repositories (page size default 50) |
| `registry repos delete <project>/<repo> [--missing-ok] [-y]` | Delete a whole repository from the CLI |
| `registry artifacts <repo>` | List artifacts in one repo (page size default 50) |
| `registry usage` | Storage used + 7-day history |
| `registry publicity public\|private` | Toggle anonymous-pull access (also resizes quota to the plan's tier) |
| `registry rotate-token [--docker-login]` | Issue a new docker secret (old one stops working immediately) |
| `registry keys list` | List scoped keys for the active project |
| `registry keys create <name> --role read\|push\|push-delete\|admin [--expires-days N] [--docker-login]` | Issue a scoped key; secret printed once |
| `registry keys show\|rotate\|revoke <key-id>` | Inspect, rotate the secret, or delete a key |
| `revisions <repo> [--json]` | List a repository's revisions, newest first |

---

## Same tasks with hipc

[`hipc`](/cli), the Hippius command line, manages the namespace, the plan and the keys with your account token. Moving bytes (upload, download, `docker push`) stays with `hippius-hub` and `docker`.

| `hippius-hub` | `hipc` |
| --- | --- |
| `registry plans` | `hipc hub plans` |
| `registry check <name>` | `hipc hub namespace availability <name>` |
| `registry provision <ns>` | `hipc hub namespace create <ns> --reveal --yes` |
| `registry status` | `hipc hub namespace status` |
| `registry me` | `hipc hub namespace get`, and `hipc hub namespace robot get` for the login |
| `registry repos` | `hipc hub repositories list` |
| `registry artifacts <repo>` | `hipc hub artifacts list <ns>/<repo>` |
| `registry usage` | `hipc hub usage` |
| `registry publicity public\|private` | `hipc hub namespace update --visibility public --public --yes`, or `--visibility private --yes` |
| `registry rotate-token` | `hipc hub namespace robot rotate --reveal --yes` |
| `registry keys list` | `hipc hub keys list` |
| `registry keys create <name> --role push --expires-days N` | `hipc hub keys create --name <name> --role push --expires-in N --reveal --yes` |
| `registry keys show\|rotate\|revoke <key-id>` | `hipc hub keys get\|rotate\|delete <key-id>` (`rotate` needs `--reveal --yes`, `delete` needs `--yes`) |
| `registry subscribe Builder` | `hipc hub subscription subscribe --plan Builder --yes` |
| `registry subscriptions` | `hipc hub subscription get` |
| `registry unsubscribe <sub-id>` | `hipc hub subscription cancel <sub-id> --yes` |

Every `hipc` command that prints a secret needs `--reveal`. `hub namespace create`, `hub namespace robot rotate`, and `hub keys create` and `rotate` also take `--secret-file <path>`, which writes the secret alone, with no newline, to a new file of mode 0600 instead of stdout. The answer then names that file as `secret_file` (`robot_secret_file` for the namespace robot) in place of the secret, and keeps the `login` and a `docker_login_command` that reads the secret on stdin: for example `hipc --json hub keys create --name ci --role push --secret-file key.txt --reveal --yes > key.json`, then `docker login registry.hippius.com -u '<login>' --password-stdin < key.txt`. Run any write with `--dry-run` first to see the request.

---

## Upload & download

```bash
hippius-hub upload my-models/qwen-7b ./qwen-7b --revision v1
hippius-hub download my-models/qwen-7b model.safetensors --verify-hash
hippius-hub diagnose my-models/qwen-7b model.safetensors --verbose --json
```

`--verify-hash` forces the whole-file check when `HIPPIUS_VERIFY_HASH=0`. The check is on by default.

Full workflows with merge semantics, single-file uploads, and HF-mirroring: [Push](/registry/push). Parallel-download tuning: [Pull](/registry/pull#tuning-parallel-downloads).

---

## Search the model index

Every artifact is parsed server-side (GGUF, safetensors, ONNX, Diffusers) and indexed by format / architecture / parameter count / quantization.

```bash
hippius-hub models list --format gguf --arch llama --quant int4 --min-params 1000000000 --max-params 8000000000 -q "qwen"
hippius-hub models list --page 1 --page-size 25
hippius-hub models show my-models/qwen-7b              # all versions of a repo
hippius-hub models show my-models/qwen-7b v1           # one version, with file breakdown
hippius-hub models list --mine                         # restrict to your own
hippius-hub models formats                             # available filter values
```

Add `--json` to `models list` / `models show` for machine-readable output.

---

## Subscriptions

```bash
hippius-hub registry subscribe Builder                 # name or numeric plan_id
hippius-hub registry subscribe Builder --pay-upfront 6 # pay 1–24 months at once
hippius-hub registry subscriptions                     # list current subscriptions
hippius-hub registry unsubscribe <sub-id>              # cancel; 30-day grace before hard delete
```

The CLI resolves the plan name to an id, then POSTs `{"plan_id": <int>}` to `/api/registry/subscribe/`. After `unsubscribe`, docker login stops working on the next sync (about 3 minutes). Artifacts and the project stay until the 30-day grace ends.

Hub has no one-step plan swap. If you subscribe while a paid plan is still active, you can be billed for both. Cancel first, then subscribe to the new plan.

Pricing details: [hippius.com/hippius-hub](https://hippius.com/hippius-hub).

---

## Environment variables

| Env var | Default | Purpose |
| --- | --- | --- |
| `HIPPIUS_CHUNK_SIZE` | `104857600` (100 MiB) | Per-chunk size for the parallel Rust downloader |
| `HIPPIUS_VERIFY_HASH` | on | Set to `0`/`false` to skip the whole-file SHA256 check on plain downloads. Chunked downloads always verify |
| `HIPPIUS_API_URL` | `https://api.hippius.com` | Console API base used by the `registry` and `models` commands |
| `HIPPIUS_MAX_CONCURRENT` | 16 | Parallel Range connections per file |
| `HIPPIUS_SNAPSHOT_WORKERS` | 8 | File-parallelism for `snapshot_download` |
| `HIPPIUS_UPLOAD_WORKERS` | 8 | Upload worker count |
| `HIPPIUS_HUB_NO_UPDATE_CHECK` | off | Set to `1` to silence the newer-version notice (`CI=true` also silences it) |

---

## Where to next

- [**Quickstart**](/registry): the five-minute path from zero to push or pull.
- [**Pull**](/registry/pull): download a file, a whole repo, or pull by digest.
- [**Push**](/registry/push): provision a namespace and ship your first artifact.
