# Hippius Documentation

This repository contains the Docusaurus-based documentation site for Hippius.

## Development

We use pnpm here.

To install dependencies, run `pnpm install`.

To run the project, run `pnpm run start`.

## Building

To build the static site:

```bash
pnpm run build
```

The built site will be in the `build` directory.

## Deployment

This project is automatically deployed to Kubernetes using GitHub Actions. The workflow:

1. Builds a Docker image when changes are pushed to main/master or when a tag is created
2. Pushes the image to the private registry
3. Deploys to Kubernetes in the `hippius-documentation` namespace

### Required Secrets

The following secrets must be configured in GitHub:

- `REGISTRY_USERNAME`: Username for the private Docker registry
- `REGISTRY_PASSWORD`: Password for the private Docker registry
- `KUBE_CONFIG`: Kubernetes configuration file with access to the cluster

## Kubernetes Configuration

Kubernetes manifests are located in the `k8s` directory. The deployment uses:

- Namespace: `hippius-documentation`
- Service Type: ClusterIP
