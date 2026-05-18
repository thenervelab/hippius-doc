---
id: docker-registry
title: Docker Registry
sidebar_label: Docker Registry
slug: /registry/docker
---

# Docker Registry

`registry.hippius.com` is a **standard OCI registry**. Anything that speaks the Docker Registry HTTP API — `docker`, `podman`, `buildah`, `oras`, `crane`, `skopeo` — works against it without special configuration.

Public images can be pulled anonymously. Pushing and pulling private repositories requires logging in.

---

## Sign in

Create credentials at [console.hippius.com/dashboard/settings](https://console.hippius.com/dashboard/settings), then:

```bash
docker login registry.hippius.com
```

---

## Push an image

```bash
docker tag my-app:latest registry.hippius.com/myorg/my-app:latest
docker push registry.hippius.com/myorg/my-app:latest
```

The first push to a new namespace creates it.

---

## Pull an image

```bash
docker pull registry.hippius.com/myorg/my-app:latest
```

No login needed for public images. The same reference works anywhere an image is accepted (`Dockerfile`, `docker-compose.yml`, Kubernetes pod specs).

---

## ORAS and raw OCI artifacts

Hippius Hub is a real OCI registry, so you can store more than container images. [`oras`](https://oras.land) pushes arbitrary files as OCI artifacts:

```bash
oras push registry.hippius.com/myorg/my-artifact:v1 ./weights.safetensors ./config.json
oras pull registry.hippius.com/myorg/my-artifact:v1
```

This is how the [Model Registry](/registry/models) stores model weights under the hood.

---

## The hippius-hub CLI

For namespace provisioning, credential helpers, and registry-aware search there's a dedicated CLI — see [hippius.com/hippius-hub](https://hippius.com/hippius-hub) for installation and reference.

---

## Where to next

- [Model Registry](/registry/models) — the `huggingface_hub` drop-in for pulling models from Python.
- [hub.hippius.com](https://hub.hippius.com) — browse containers and models.
