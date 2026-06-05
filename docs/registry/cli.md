---
id: cli
title: The hippius-hub CLI
sidebar_label: CLI reference
slug: /registry/cli
---

# The `hippius-hub` CLI

`hippius-hub` is the unified CLI for namespace provisioning, credential management, registry search, and parallel uploads / downloads. It's the same package that ships the Python library — install it once and use either surface.

Full reference and source: [`github.com/thenervelab/hippius-hub`](https://github.com/thenervelab/hippius-hub). For AI agents and coding assistants there's a self-contained reference at [`llms.txt`](https://github.com/thenervelab/hippius-hub/blob/main/llms.txt).

---

## Install

```bash
pip install hippius_hub

hippius-hub --version
hippius-hub --help
```

Published wheels include the pre-built Rust core, so no toolchain is needed. Building from source requires Rust via [rustup](https://rustup.rs) — see the [README](https://github.com/thenervelab/hippius-hub#install) for the source path.

---

## Two kinds of credentials

| For… | Use | Cached at |
| --- | --- | --- |
| `registry` and `models` commands | **API token** from [console.hippius.com/dashboard/settings](https://console.hippius.com/dashboard/settings) | `~/.cache/hippius/hub/api_token` |
| `upload` / `download` (raw OCI registry IO) | Docker registry credentials | `~/.cache/hippius/hub/token` |

In practice the API token is all you save by hand — `hippius-hub registry provision <namespace>` mints the docker credentials and writes them into the second cache for you. Pass `--docker-login` to also run `docker login` so `docker push` / `docker pull` work.

```bash
hippius-hub login --hippius-token <token>
hippius-hub login --username <you> --password <secret>   # docker creds, manual path
```

---

## Manage your namespace

| Command | Purpose |
| --- | --- |
| `registry plans` | List pricing tiers and quotas |
| `registry check <name>` | Is a namespace available? |
| `registry provision <ns> [--docker-login]` | Create your namespace; new projects are public by default |
| `registry me` | Plan, quota, status, and robot login of your active project |
| `registry repos [--page N --page-size M]` | List your repositories |
| `registry artifacts <repo>` | List artifacts in one repo |
| `registry usage` | Storage used + 7-day history |
| `registry publicity public\|private` | Toggle anonymous-pull access (also resizes quota to the plan's tier) |
| `registry rotate-token [--docker-login]` | Issue a new docker secret (old one stops working immediately) |

---

## Upload & download

```bash
hippius-hub upload my-models/qwen-7b ./qwen-7b --revision v1
hippius-hub download my-models/qwen-7b model.safetensors --verify-hash
```

Full workflows with merge semantics, single-file uploads, and HF-mirroring → [Push](/registry/push). Parallel-download tuning → [Pull](/registry/pull#tuning-parallel-downloads).

---

## Search the model index

Every artifact is parsed server-side (GGUF, safetensors, ONNX, Diffusers) and indexed by format / architecture / parameter count / quantization.

```bash
hippius-hub models list --format gguf --arch llama --max-params 8000000000
hippius-hub models show my-models/qwen-7b              # all versions of a repo
hippius-hub models show my-models/qwen-7b v1           # one version, with file breakdown
hippius-hub models list --mine                         # restrict to your own
hippius-hub models formats                             # available filter values
```

Add `--json` to `models list` / `models show` for machine-readable output.

---

## Subscriptions

```bash
hippius-hub registry subscribe Builder              # subscribe to a plan on-chain
hippius-hub registry subscriptions                  # list current subscriptions
hippius-hub registry unsubscribe <sub-id>           # cancel; 30-day grace before hard delete
```

Pricing details: [hippius.com/hippius-hub](https://hippius.com/hippius-hub).

---

## Environment variables

| Env var | Default | Purpose |
| --- | --- | --- |
| `HIPPIUS_CHUNK_SIZE` | `104857600` (100 MiB) | Per-chunk size for the parallel Rust downloader |
| `HIPPIUS_VERIFY_HASH` | unset (off) | Set to `1`/`true` to SHA256-verify downloads locally |
| `HIPPIUS_API_URL` | `https://api.hippius.com` | Console API base used by the `registry` and `models` commands |

---

## Where to next

- [**Quickstart**](/registry) — the five-minute path from zero to push or pull.
- [**Pull**](/registry/pull) — download a file, a whole repo, or pull by digest.
- [**Push**](/registry/push) — provision a namespace and ship your first artifact.
