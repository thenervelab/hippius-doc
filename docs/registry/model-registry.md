---
id: model-registry
title: Model Registry
sidebar_label: Model Registry
slug: /registry/models
---

# Model Registry

Hippius Hub is a **drop-in replacement for `huggingface_hub`**. The Python package mirrors Hugging Face's API surface — `hf_hub_download`, `snapshot_download`, `upload_folder`, `create_repo`, the lot — and its cache layout is identical, so libraries like `transformers` and `diffusers` work without modification.

Under the hood it's an OCI registry (`registry.hippius.com`) with a thin Rust core (`hippius_core`) for fast byte transfers.

---

## Install

```bash
pip install hippius_hub
```

Python 3.8+ is supported. The package ships prebuilt wheels with the Rust download extension baked in — no Rust toolchain needed for regular installs.

---

## Sign in

Create an account at [console.hippius.com](https://console.hippius.com/dashboard/settings), then log in once from Python:

```python
from hippius_hub import login

login(username="me", password="pwd")
```

Credentials are cached locally the same way `huggingface_hub` caches them. Public models can be pulled without logging in.

---

## The headline: drop-in for `transformers`

If your code already uses `huggingface_hub` (directly or transitively through `transformers`, `diffusers`, `sentence-transformers`, etc.), point it at Hippius by aliasing the import:

```python
import hippius_hub as huggingface_hub

from transformers import AutoConfig, AutoModel

config = AutoConfig.from_pretrained("myorg/my-model")
model = AutoModel.from_pretrained("myorg/my-model")
```

That's the whole migration. Repo IDs, revisions, the local cache directory layout — all match.

---

## Downloading

### Single file

```python
from hippius_hub import hf_hub_download

path = hf_hub_download(repo_id="myorg/my-model", filename="config.json")
```

### Full snapshot with pattern filters

```python
from hippius_hub import snapshot_download

local_dir = snapshot_download(
    repo_id="myorg/my-model",
    allow_patterns=["*.safetensors", "*.json"],
)
```

`allow_patterns` and `ignore_patterns` work identically to the Hugging Face equivalents — useful for skipping `.bin` weights when you only want `.safetensors`, or pulling just tokenizer files.

---

## Uploading

### One file

```python
from hippius_hub import upload_file

upload_file(
    path_or_fileobj="./model.safetensors",
    path_in_repo="model.safetensors",
    repo_id="myorg/my-model",
)
```

### A whole folder

```python
from hippius_hub import upload_folder

upload_folder(folder_path="./checkpoint", repo_id="myorg/my-model")
```

`upload_folder` accepts the same `allow_patterns` / `ignore_patterns` filters as `snapshot_download`.

---

## Managing repositories

```python
from hippius_hub import create_repo, delete_repo, repo_info

create_repo("myorg/my-model")
info = repo_info("myorg/my-model")
delete_repo("myorg/my-model")
```

---

## Configuration

Tune behavior through environment variables:

| Variable | Default | What it does |
| --- | --- | --- |
| `HIPPIUS_CHUNK_SIZE` | `100 MiB` | Size of chunks for uploads and downloads. Bigger chunks = fewer round trips on fast links. |
| `HIPPIUS_VERIFY_HASH` | off | When set, verifies SHA256 of downloaded files against the registry manifest. |
| `HIPPIUS_API_URL` | console API | Override the metadata API endpoint (useful for staging / self-hosted setups). |
| `HIPPIUS_TEST_REPO` | — | Repo used by the test suite; set this if you're contributing to `hippius-hub`. |

---

## Supported model formats

The server parses and indexes the following formats so they show up correctly in search:

- **GGUF** — llama.cpp / Ollama-style quantized weights
- **safetensors** — the modern default for PyTorch checkpoints
- **ONNX** — portable inference graphs
- **PyTorch** (`.bin`, `.pt`) — legacy pickled checkpoints
- **Diffusers** — full pipelines with components in subdirectories

Quantization level (`bf16`, `q4_k_m`, etc.) is detected automatically where the format allows.

---

:::note Hugging Face features that are not supported
Some Hugging Face features have no equivalent in an OCI registry. The following raise `NotImplementedError`:

- **Inference Endpoints** — Hippius doesn't host inference for you (yet).
- **Spaces** — no hosted Gradio/Streamlit apps.
- **Webhooks**, **Collections**, **Discussions** — community/social features.

A handful of fields on `model_info()` return `None` when they have no OCI counterpart. Everything required for `from_pretrained` works.
:::

---

## Where to next

- [Docker Registry](/registry/docker) — push and pull container images and OCI artifacts against the same endpoint.
- [Browse models on hub.hippius.com](https://hub.hippius.com) — search by format, architecture, parameter count, or quantization.
