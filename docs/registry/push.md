---
id: push
title: Pushing models & images
sidebar_label: Push
slug: /registry/push
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Pushing models & images

Pushing always requires a namespace. The `hippius-hub` CLI provisions one — and the docker credentials you'll need — in a single command.

---

## Namespaces

Every artifact lives at `<namespace>/<repo>:<tag>`. New namespaces are **public by default** — anyone can pull, only you can push. Pricing tiers gate storage quota; see [hippius.com/hippius-hub](https://hippius.com/hippius-hub) for the plans.

---

## Provision a namespace

Run these three commands in order — the first time only:

```bash
hippius-hub registry plans                       # see pricing tiers
hippius-hub registry check my-models             # is the name free?
hippius-hub registry provision my-models --docker-login
```

`provision --docker-login` does three things in one shot: creates your namespace, mints docker credentials, and runs `docker login registry.hippius.com` for you. The hippius-hub CLI's own `upload` / `download` commands also start working immediately because the credentials are cached at `~/.cache/hippius/hub/token`.

:::tip Save the robot secret
The robot secret prints **once** at the bottom of `registry provision`. If you lose it, rotate with `hippius-hub registry rotate-token` — it issues a new secret and updates the local cache.
:::

---

## Push

<Tabs groupId="registry-flow">
<TabItem value="model-python" label="Python (huggingface_hub)">

```python
from hippius_hub import upload_folder

upload_folder(
    folder_path="./outputs/checkpoint-1000",
    repo_id="my-models/qwen-7b",
    revision="v1",
    allow_patterns=["*.safetensors", "*.json"],
    delete_patterns="*.tmp",     # prune any *.tmp from the existing revision
    commit_message="Initial checkpoint",
)
```

Drop-in for [`upload_folder`](https://huggingface.co/docs/huggingface_hub/guides/upload#upload-a-folder). Re-running it merges into the existing manifest at that revision — individual files get added or replaced without wiping the rest.

For a single file, use `upload_file(path_or_fileobj, path_in_repo, repo_id, revision)`.

</TabItem>
<TabItem value="model-cli" label="CLI (hippius-hub)">

```bash
# Upload an entire folder as :v1
hippius-hub upload my-models/qwen-7b ./qwen-7b --revision v1

# Add or replace a single file in an existing revision
hippius-hub upload my-models/qwen-7b ./README.md --revision v1

# Skip --revision to push to the default :main tag
hippius-hub upload my-models/qwen-7b ./qwen-7b
```

Folder uploads **merge** into the existing manifest — re-running adds or replaces individual files without wiping the rest. The indexer picks up format / architecture / parameter count / quantization within a few seconds of the push completing.

</TabItem>
<TabItem value="docker" label="Docker">

```bash
docker tag my-app:latest registry.hippius.com/my-models/my-app:v1
docker push registry.hippius.com/my-models/my-app:v1
```

The first push to a namespace fails if you haven't [provisioned it](#provision-a-namespace). Subsequent pushes to repos in the same namespace work without further setup.

</TabItem>
<TabItem value="oras" label="ORAS">

```bash
oras push registry.hippius.com/my-models/my-artifact:v1 \
  ./weights.safetensors ./config.json
```

[`oras`](https://oras.land) pushes arbitrary files as OCI artifacts. This is how the Model Registry stores model weights under the hood — but you can use it directly for datasets, configs, or anything else you want to address by name and digest.

</TabItem>
</Tabs>

---

## Mirror a HuggingFace model

The fastest way to put an existing HF model behind your own namespace — pull with `hf`, push with `hippius-hub`:

```bash
# 1. Grab the model from HF
pip install -U "huggingface_hub[cli]" hf_transfer
HF_HUB_ENABLE_HF_TRANSFER=1 hf download Qwen/Qwen2.5-7B-Instruct --local-dir ./qwen-7b

# 2. Push the whole folder under your namespace as :v1
hippius-hub upload my-models/qwen-7b ./qwen-7b --revision v1

# 3. Confirm it landed and got indexed
hippius-hub registry repos
hippius-hub models show my-models/qwen-7b v1
```

The [`hf download`](https://huggingface.co/docs/huggingface_hub/guides/cli#hf-download) CLI handles the HF side; `hippius-hub upload` chunks and parallelizes the push to your namespace.

---

## Public vs private

```bash
hippius-hub registry publicity public      # anyone can pull
hippius-hub registry publicity private     # only your credentials can pull
```

Toggling publicity also resizes your quota to the plan's public or private tier.

---

## Rotate credentials

```bash
hippius-hub registry rotate-token --docker-login
```

Issues a new docker secret and writes it to the local cache. **The old secret stops working immediately** — relevant for CI/CD pipelines that hold a copy of the secret. Re-distribute before rotating.

---

## Troubleshooting `docker push 500`

If `docker push` loops with `500 Cannot find server.`, check `docker info | grep -i proxy`. A daemon-level proxy (e.g. `http.docker.internal:3128`) in Docker Desktop routes the push through an unreachable proxy and the registry is never hit.

**Fix:** Docker Desktop → Settings → Resources → Proxies → disable it or bypass `registry.hippius.com`, then restart Docker Desktop. `NO_PROXY` in your shell does not help — the daemon ignores it.

---

:::note Hugging Face features not supported
Inference Endpoints, Spaces, Webhooks, Collections, and Discussions raise `NotImplementedError` — they have no OCI equivalent. Everything required for `from_pretrained` works.
:::

---

## Where to next

- [**Pull**](/registry/pull) — download from Python, CLI, or `docker pull`.
- [**CLI reference**](/registry/cli) — every `hippius-hub` command, grouped by goal.
