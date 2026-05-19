---
id: model-registry
title: Model Registry
sidebar_label: Model Registry
slug: /registry/models
---

# Model Registry

Hippius Hub is a **drop-in replacement for `huggingface_hub`**. Same Python API, same cache layout — so `transformers`, `diffusers`, and anything else that uses `huggingface_hub` under the hood works without modification. Storage is backed by an OCI registry at `registry.hippius.com`.

Full API reference and source: [`github.com/thenervelab/hippius-hub`](https://github.com/thenervelab/hippius-hub).

---

## Install

```bash
pip install hippius_hub
```

Prebuilt wheels include the Rust download core — no toolchain needed.

---

## Authenticate once

Generate a token at [console.hippius.com/dashboard/settings](https://console.hippius.com/dashboard/settings), then:

```python
from hippius_hub import login

login(token="hf_xxx")
```

The token is cached locally — you only need to do this once per machine. Public models can be pulled without authenticating. See [hippius.com/hippius-hub](https://hippius.com/hippius-hub) for a full end-to-end example.

---

## The headline: drop-in for `transformers`

If your code already uses `huggingface_hub` (directly or via `transformers`, `diffusers`, `sentence-transformers`, etc.), point it at Hippius by aliasing the import:

```python
import hippius_hub as huggingface_hub

from transformers import AutoConfig, AutoModel

config = AutoConfig.from_pretrained("myorg/my-model")
model = AutoModel.from_pretrained("myorg/my-model")
```

That's the whole migration. Repo IDs, revisions, and the local cache directory all match Hugging Face's layout.

---

## Download and upload

```python
from hippius_hub import hf_hub_download, snapshot_download, upload_folder

hf_hub_download(repo_id="myorg/my-model", filename="config.json")

snapshot_download(
    repo_id="myorg/my-model",
    allow_patterns=["*.safetensors", "*.json"],
)

upload_folder(folder_path="./checkpoint", repo_id="myorg/my-model")
```

`allow_patterns` / `ignore_patterns`, `create_repo`, `delete_repo`, `repo_info`, and the rest of the surface mirror `huggingface_hub` one-to-one. See the [hippius-hub README](https://github.com/thenervelab/hippius-hub) for the full reference and environment variables (`HIPPIUS_CHUNK_SIZE`, `HIPPIUS_VERIFY_HASH`, `HIPPIUS_API_URL`).

---

## Supported model formats

GGUF, safetensors, ONNX, PyTorch (`.bin`, `.pt`), and Diffusers pipelines are parsed and indexed server-side. Quantization (`bf16`, `q4_k_m`, etc.) is detected automatically. Browse and filter at [hub.hippius.com](https://hub.hippius.com).

---

:::note Hugging Face features not supported
Inference Endpoints, Spaces, Webhooks, Collections, and Discussions raise `NotImplementedError` — they have no OCI equivalent. Everything required for `from_pretrained` works.
:::

---

## Where to next

- [Docker Registry](/registry/docker) — push and pull container images against the same endpoint.
- [hub.hippius.com](https://hub.hippius.com) — browse public models and containers.
- [hippius-hub on GitHub](https://github.com/thenervelab/hippius-hub) — full API reference and source.
