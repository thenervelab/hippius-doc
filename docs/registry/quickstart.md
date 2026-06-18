---
id: quickstart
title: Hippius Hub Registry — Quickstart
sidebar_label: Quickstart
slug: /registry
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Screenshot from '@site/src/components/Screenshot';

# Hippius Hub Registry

**The AI model registry built for distributed compute.** Hippius Hub is a public registry for AI models and OCI artifacts — pull anything anonymously, push with an account.

It has two faces:

| Face | What it is | Who uses it |
| --- | --- | --- |
| **Model Registry** | A drop-in replacement for [Hugging Face Hub](https://huggingface.co). Same Python API ([`hf_hub_download`](https://huggingface.co/docs/huggingface_hub/guides/download#download-a-single-file), [`snapshot_download`](https://huggingface.co/docs/huggingface_hub/guides/download#download-an-entire-repository), [`from_pretrained`](https://huggingface.co/docs/transformers/main_classes/model#transformers.PreTrainedModel.from_pretrained)), backed by an OCI registry instead of huggingface.co. | ML engineers loading models with `transformers`, `diffusers`, or any library that uses [`huggingface_hub`](https://huggingface.co/docs/huggingface_hub/index) under the hood. |
| **Container Registry** | A standard OCI registry. Push and pull Docker images, ORAS artifacts, and raw OCI blobs against `registry.hippius.com`. | Anyone running `docker push` / `docker pull`, plus power users with `oras` for non-image artifacts. |

Both faces share the same authentication, the same backing storage, and the same endpoint.

---

## Endpoints

| Purpose | URL |
| --- | --- |
| OCI registry (Docker, ORAS, `hippius-hub`) | `registry.hippius.com` |
| Web UI (browse models & containers) | [`hub.hippius.com`](https://hub.hippius.com) |
| Source / issues | [`github.com/thenervelab/hippius-hub`](https://github.com/thenervelab/hippius-hub) |

Models are indexed server-side by format, architecture, parameter count, and quantization — so search on [hub.hippius.com](https://hub.hippius.com) works the way you'd expect.

---

## Five-minute path

Pick the flow that matches what you're shipping. The CLI install and namespace provisioning are the same either way.

<Tabs groupId="registry-flow">
<TabItem value="models" label="Models (Python)">

```bash
# 1. Install the unified CLI (also the Python library)
pip install hippius_hub

# 2. Save your API token from https://console.hippius.com/dashboard/settings
hippius-hub login --hippius-token <paste-token-here>

# 3. Provision a namespace + run docker login in one shot
hippius-hub registry provision my-models --docker-login

# 4. Push a model folder as :v1
hippius-hub upload my-models/qwen-7b ./qwen-7b --revision v1
```

Pulling from Python is a one-line import swap — your existing `transformers` / `diffusers` code keeps working:

```python
import hippius_hub as huggingface_hub
from transformers import AutoModel

model = AutoModel.from_pretrained("my-models/qwen-7b")
```

</TabItem>
<TabItem value="docker" label="Containers (Docker)">

```bash
# 1. Install the CLI for namespace provisioning + credential helpers
pip install hippius_hub

# 2. Save your API token from https://console.hippius.com/dashboard/settings
hippius-hub login --hippius-token <paste-token-here>

# 3. Provision a namespace and run docker login in one shot
hippius-hub registry provision my-models --docker-login

# 4. Tag and push an image
docker tag my-app:latest registry.hippius.com/my-models/my-app:v1
docker push registry.hippius.com/my-models/my-app:v1
```

Pulling a public image needs no login:

```bash
docker pull registry.hippius.com/my-models/my-app:v1
```

</TabItem>
</Tabs>

:::tip Same Python API as Hugging Face
The Model Registry is a drop-in for [`huggingface_hub`](https://huggingface.co/docs/huggingface_hub/index). Same cache layout, same function signatures, same exception classes — so `transformers.from_pretrained(...)` and any other code that uses `huggingface_hub` under the hood works without modification. See [Pull](/registry/pull) for the full Python surface.
:::

---

## Hub access from the Console

Browse, manage, and inspect Hub repos directly from [console.hippius.com](https://console.hippius.com).

**[Repositories](https://console.hippius.com/dashboard/registry)** — see every container and model you've pushed, with pull counts and last-modified timestamps.

<Screenshot src="/img/registry/registry-repositories.png" alt="Registry repositories view in the Hippius console" dark />

**[Manage](https://console.hippius.com/dashboard/registry/manage)** — pick a subscription plan, toggle namespace public/private access, and rotate docker credentials for CI/CD.

<Screenshot src="/img/registry/manage-registry.png" alt="Manage registry namespace, access level, and docker credentials" dark />

Pricing details are available at [hippius.com/hippius-hub](https://hippius.com/hippius-hub).

---

## Where to next

- [**Pull**](/registry/pull) — download a single file or a whole repo from Python, the CLI, or `docker pull`.
- [**Push**](/registry/push) — provision a namespace, push artifacts, manage credentials.
- [**CLI reference**](/registry/cli) — the `hippius-hub` command surface, grouped by goal.
