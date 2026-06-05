---
id: pull
title: Pulling models & images
sidebar_label: Pull
slug: /registry/pull
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Pulling models & images

Public repos pull anonymously. Private repos need a login — see [Push](/registry/push#provision-a-namespace) for the one-shot provisioning step that also writes the credentials hippius-hub uses on pull.

---

## Pull a single file

<Tabs groupId="registry-flow">
<TabItem value="model-python" label="Python (huggingface_hub)">

```python
from hippius_hub import hf_hub_download

path = hf_hub_download(
    repo_id="my-models/qwen-7b",
    filename="config.json",
    revision="v1",
)
print(path)  # ~/.cache/hippius/hub/models--my-models--qwen-7b/snapshots/v1/config.json
```

Drop-in for [`hf_hub_download`](https://huggingface.co/docs/huggingface_hub/guides/download#download-a-single-file) — the cache layout matches `huggingface_hub` exactly, so `transformers` / `diffusers` reading from the same directory Just Works.

</TabItem>
<TabItem value="model-cli" label="CLI (hippius-hub)">

```bash
# Single file — uses the parallel Rust downloader
hippius-hub download my-models/qwen-7b model.safetensors --revision v1

# Verify the SHA256 of the bytes after download
hippius-hub download my-models/qwen-7b model.safetensors --verify-hash
```

Optional flags: `--revision <tag>`, `--chunk-size <bytes>` (defaults to `HIPPIUS_CHUNK_SIZE`), `--cache-dir <path>`.

</TabItem>
<TabItem value="docker" label="Docker">

```bash
# Pull by tag
docker pull registry.hippius.com/my-models/my-app:v1

# Pull by digest (immutable)
docker pull registry.hippius.com/my-models/my-app@sha256:0c1a…
```

Public images pull without `docker login`. The same reference works anywhere an image is accepted (`Dockerfile`, `docker-compose.yml`, Kubernetes pod specs).

</TabItem>
<TabItem value="oras" label="ORAS">

```bash
oras pull registry.hippius.com/my-models/my-artifact:v1
```

[`oras`](https://oras.land) pulls arbitrary OCI artifacts — model weights, datasets, anything you previously pushed with `oras push`. The Model Registry stores model files this way under the hood.

</TabItem>
</Tabs>

---

## Pull a whole repo

<Tabs groupId="registry-flow">
<TabItem value="model-python" label="Python (huggingface_hub)">

```python
from hippius_hub import snapshot_download

local_dir = snapshot_download(
    repo_id="my-models/qwen-7b",
    revision="v1",
    allow_patterns=["*.safetensors", "*.json"],
    ignore_patterns="optimizer*",
    max_workers=8,
)
```

Drop-in for [`snapshot_download`](https://huggingface.co/docs/huggingface_hub/guides/download#download-an-entire-repository). For whole-repo pulls this is the recommended path — it parallelizes across files and lays bytes out in the HF cache shape that `transformers.from_pretrained(...)` reads from.

</TabItem>
<TabItem value="model-cli" label="CLI (hippius-hub)">

The CLI's `download` command pulls one file at a time. For pulling **every file in a revision**, prefer `snapshot_download` from Python — it parallelizes across files and matches the HF cache layout.

If you really want shell only, loop over the filenames from `hippius-hub models show <repo> <revision> --json`.

</TabItem>
<TabItem value="docker" label="Docker">

A Docker image is one manifest — `docker pull <image>:<tag>` already pulls every layer it references. There's no separate "whole repo" command.

</TabItem>
</Tabs>

---

## Tag vs digest

Tags (`:v1`, `:main`) are **mutable** — re-pushing to the same revision moves the tag onto a new manifest. Digests (`@sha256:…`) are **immutable** — the same bytes forever.

- Pin to a **digest** for CI/CD, Kubernetes manifests, and anywhere reproducibility matters.
- Use a **tag** for interactive development and the "give me the latest" case.

`hippius-hub models show <repo>` prints every tag and digest indexed for a repo.

---

## Tuning parallel downloads

The Rust downloader ships in the wheel — no compile step needed. Two knobs are worth knowing:

| Env var | Default | What it does |
| --- | --- | --- |
| `HIPPIUS_CHUNK_SIZE` | `104857600` (100 MiB) | Per-chunk size for the parallel Rust downloader. Smaller = more parallel requests, larger = fewer/bigger requests. |
| `HIPPIUS_VERIFY_HASH` | unset (off) | Set to `1`/`true` to SHA256-verify every download against the registry's recorded digest. |

For `snapshot_download`, `max_workers=8` (the default) parallelizes across files. Bump it higher on fat connections.

---

## Where to next

- [**Push**](/registry/push) — upload your own models or container images.
- [**CLI reference**](/registry/cli) — every `hippius-hub` command, grouped by goal.
