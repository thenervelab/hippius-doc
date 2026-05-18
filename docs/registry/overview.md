---
id: overview
title: Hippius Hub Registry
sidebar_label: Overview
slug: /registry
---

# Hippius Hub Registry

**The AI model registry built for decentralized compute.** Hippius Hub is a public registry for AI models and OCI artifacts — pull anything anonymously, push with an account.

It has two faces:

| Face | What it is | Who uses it |
| --- | --- | --- |
| **Model Registry** | A drop-in replacement for [Hugging Face Hub](https://huggingface.co). Same Python API (`hf_hub_download`, `snapshot_download`, `from_pretrained`), backed by an OCI registry instead of huggingface.co. | ML engineers loading models with `transformers`, `diffusers`, or any library that uses `huggingface_hub` under the hood. |
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

## Get started

- **Pull a model from Python** → [Model Registry](/registry/models). Three lines: `import hippius_hub as huggingface_hub`, and your existing `transformers.from_pretrained(...)` keeps working.
- **Push a Docker image** → [Docker Registry](/registry/docker). Standard `docker login` / `docker push` against `registry.hippius.com`.

:::tip Public pulls, authenticated pushes
Anyone can pull public models and containers — no account required. You only need to [sign in](/registry/docker#sign-in) when you want to push, create a namespace, or access private repositories.
:::

---

## Coming soon: Hub access from the Console
