# Kubernetes Deployment for Hippius Documentation

This directory contains Kubernetes manifests for deploying the Hippius Documentation site.

## Deployment

The deployment is handled automatically by the GitHub Actions workflow. The workflow:

1. Builds a Docker image from the Docusaurus project
2. Pushes the image to the private registry
3. Deploys the application to Kubernetes in the `hippius-documentation` namespace

## Manifests

- `deployment.yaml`: Contains both the Deployment and Service resources
  - Deployment: Runs the Docusaurus site in a container
  - Service: Exposes the site as a ClusterIP service

## Manual Deployment

If you need to deploy manually, you can use:

```bash
# Set the image variable
export IMAGE=registry.starkleytech.com/hippius/docs:latest

# Apply the manifests
kubectl create namespace hippius-documentation --dry-run=client -o yaml | kubectl apply -f -
envsubst < deployment.yaml | kubectl apply -f -
```

## Requirements

The following secrets must be configured in GitHub:

- `REGISTRY_USERNAME`: Username for the private Docker registry
- `REGISTRY_PASSWORD`: Password for the private Docker registry
- `KUBE_CONFIG`: Kubernetes configuration file with access to the cluster 