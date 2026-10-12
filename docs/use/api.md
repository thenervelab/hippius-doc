---
id: hippius-api
title: Hippius Management API
sidebar_label: Hippius API
slug: /use/api
---

import Unordered from '@site/src/components/Unordered';

# Hippius Management API

The [Hippius Management API](https://api.hippius.com/) is a REST API for managing your account, S3 tokens, billing and compute programmatically. Use it to automate token rotation, check the balance, subscribe to a plan, or provision storage on demand.

## What It Does

The Management API handles everything outside of the S3 data plane:

| Area | What you can do |
|------|----------------|
| **Token management** | Create, list, rotate, and revoke master and sub tokens |
| **Billing** | Check the balance, top up, subscribe to Drive / S3 / Hub plans from the existing balance |
| **Account** | Manage account settings and access keys |
| **Compute** | Create and manage VMs, managed databases and Kubernetes clusters. See [Compute API](#compute-api) |

For storing and retrieving files, start with [Getting Started](/use/quickstart) and [Advanced Usage](/storage/s3/advanced). The Management API is the control plane: it manages *who* can access storage and *how much* they can use.

## Interactive Docs

The full API specification with request/response examples is available as an interactive Swagger UI:

**[api.hippius.com](https://api.hippius.com/)**

## Use Cases

<Unordered>
  <li><strong>CI/CD pipelines</strong> — Create short-lived sub tokens scoped to a single bucket for deployments, then revoke them automatically</li>
  <li><strong>Multi-tenant apps</strong> — Provision a bucket and scoped token per customer from your backend</li>
  <li><strong>Billing automation</strong> — Check the balance, top up, and subscribe to a plan without a browser</li>
  <li><strong>AI agents &amp; LLMs</strong> — Automate storage operations end-to-end without manual console interaction</li>
</Unordered>

:::tip For AI agents and LLMs
A machine-readable index is at [docs.hippius.com/llms.txt](https://docs.hippius.com/llms.txt). It points at each product's own `llms.txt`. The long S3 ingest is [docs.hippius.com/llms-full.txt](https://docs.hippius.com/llms-full.txt).
:::

## Authentication

Management API requests need an access token. Generate one in the [Hippius Console](https://console.hippius.com) under Settings, and send it in the `Authorization` header:

```bash
curl -H "Authorization: Token YOUR_TOKEN" https://api.hippius.com/api/accounts/
```

A few catalogue reads need no token, for example the compute sizes and prices at `GET /api/compute/flavors/` and the plans at `GET /api/s3/plans/` and `GET /api/drive/plans/`. To act in an account shared with you, add the header `X-Hippius-Account: acct_...`. See [Shared accounts](/use/console/team).

## Compute API

Virtual machines, managed databases and Kubernetes clusters are driven through the same API.

<Unordered>
  <li><strong>Base URL</strong>: <code>https://api.hippius.com/api</code>. VMs are under <code>/compute/</code>, databases under <code>/databases/</code>, Kubernetes under <code>/kubernetes/</code>.</li>
  <li><strong>Authentication</strong>: <code>Authorization: Token YOUR_TOKEN</code>, as above. Add <code>X-Hippius-Account: acct_...</code> to act in a shared account.</li>
  <li><strong>Specification</strong>: the OpenAPI (Swagger 2.0) document is at <a href="https://api.hippius.com/swagger.json">api.hippius.com/swagger.json</a>, with the endpoints and their fields.</li>
</Unordered>

To create a VM and connect to it:

```bash
API=https://api.hippius.com/api
AUTH="Authorization: Token YOUR_TOKEN"

# 1. Pick a size, an image and a region, and find your SSH key's id
curl -s -H "$AUTH" $API/compute/flavors/
curl -s -H "$AUTH" $API/compute/images/
curl -s -H "$AUTH" $API/compute/regions/
curl -s -H "$AUTH" $API/ssh-keys/

# 2. Launch it: 202 Accepted, with the VM and its vm_id
curl -s -H "$AUTH" -H "Content-Type: application/json" \
  -d '{"name": "web-1", "flavor": "small", "region": "FR", "ssh_key_ids": [123]}' \
  $API/compute/vms/

# 3. Poll until it is up
curl -s -H "$AUTH" $API/compute/vms/VM_ID/
```

`flavor` and an SSH key are required: the ids of saved keys in `ssh_key_ids` (up to 20), or a key itself in `ssh_public_key`. Without `image` the size's default image is used, and without `region` one is picked for you. While the VM boots, `progress` shows the current step and `boot_phase` goes from `booting` to `kek_released` and `running`. Once `netbird_ip` is set, SSH to it from a device on your [private network](/use/virtual-machines#connect-from-your-private-network), or to `public_ip` if you launched with `"public_ip": true` and a firewall rule opens port 22.

A VM has two state fields:

<Unordered>
  <li><code>status</code> is its lifecycle: <code>pending</code>, <code>provisioning</code>, <code>running</code>, <code>failed</code>, <code>decommissioning</code>, <code>decommissioned</code>. A VM is billed while it is <code>running</code>, including when it is stopped.</li>
  <li><code>power_state</code> says whether it is on: <code>running</code>, <code>stopping</code>, <code>stopped</code> or <code>starting</code>, empty until reported, and <code>off</code> once the VM is deleted. A stopped VM stays <code>running</code> under <code>status</code>.</li>
</Unordered>

:::note Set a User-Agent
Some HTTP clients' default `User-Agent` is blocked in front of the API, with `403` and `error code: 1010`. Python's `urllib` is one. Send your own `User-Agent` header, for example `my-deploy-script/1.0`.
:::

## Related

<Unordered>
  <li><a href="/use/quickstart">S3 Quickstart</a>: first upload</li>
  <li><a href="/storage/s3/advanced">Advanced Usage</a> — Presigned URLs, ACLs, public buckets, sub-tokens</li>
  <li><a href="/storage/s3/compatibility">S3 Compatibility Matrix</a> — Supported S3 operations</li>
</Unordered>
