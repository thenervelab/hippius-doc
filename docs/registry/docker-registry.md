---
id: docker-registry
title: Docker Registry
sidebar_label: Docker Registry
slug: /registry/docker
---

# Docker Registry

The Hippius Hub endpoint at `registry.hippius.com` is a **standard OCI registry**. Anything that speaks the Docker Registry HTTP API — `docker`, `podman`, `buildah`, `oras`, `crane`, `skopeo` — works against it without special configuration.

Public images can be pulled anonymously. Pushing and pulling private repositories requires logging in.

---

## Sign in

Create credentials at [console.hippius.com/dashboard/settings](https://console.hippius.com/dashboard/settings), then log in with the Docker CLI:

```bash
docker login registry.hippius.com
```

Docker will prompt for your username and password (or token). Credentials are stored in your local Docker keychain.

---

## Push an image

Tag the image with the full `registry.hippius.com/<namespace>/<image>:<tag>` path, then push:

```bash
docker tag my-app:latest registry.hippius.com/myorg/my-app:latest
docker push registry.hippius.com/myorg/my-app:latest
```

The first push to a new namespace will create it; subsequent pushes update tags.

---

## Pull an image

```bash
docker pull registry.hippius.com/myorg/my-app:latest
```

No login is needed for public images.

You can also reference Hippius-hosted images directly in a `Dockerfile`:

```dockerfile
FROM registry.hippius.com/myorg/base-image:1.4
```

…or in a `docker-compose.yml`, Kubernetes `Pod` spec, or anywhere else an image reference is accepted.

---

## ORAS and raw OCI artifacts

Because Hippius Hub is a real OCI registry, you can store more than just container images. [`oras`](https://oras.land) pushes arbitrary files (model weights, configs, datasets, charts) as OCI artifacts:

```bash
oras push registry.hippius.com/myorg/my-artifact:v1 \
  ./weights.safetensors \
  ./config.json
```

```bash
oras pull registry.hippius.com/myorg/my-artifact:v1
```

This is how Hippius Hub's [Model Registry](/registry/models) stores model weights under the hood — every model is an OCI artifact.

---

## The `hippius-hub` CLI

For namespace provisioning, credential helpers, and registry-aware search, there's a dedicated CLI. Get it from [hippius.com/hippius-hub](https://hippius.com/hippius-hub).

It complements `docker` and `oras` rather than replacing them — use it for the registry-management side, and keep `docker` for image work.

---

:::tip Mirror your build pipeline
Point your CI registry credentials at `registry.hippius.com` and your existing `docker build` / `docker push` jobs require no other changes. Image tags, multi-arch manifests, and signed images (cosign, notation) all behave like any other OCI registry.
:::

---

## Where to next

- [Model Registry](/registry/models) — the `huggingface_hub` drop-in for pulling models from Python.
- [Browse the registry](https://hub.hippius.com) — explore public containers and models.
