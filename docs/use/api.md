---
id: hippius-api
title: Hippius Management API
sidebar_label: Hippius API
slug: /use/api
---

import Unordered from '@site/src/components/Unordered';

# Hippius Management API

The [Hippius Management API](https://api.hippius.com/) is a REST API for managing your account, S3 tokens, and billing programmatically. Use it to automate token rotation, monitor your balance, or build integrations that provision storage on demand.

## What It Does

The Management API handles everything outside of the S3 data plane:

| Area | What you can do |
|------|----------------|
| **Token management** | Create, list, rotate, and revoke master and sub tokens |
| **Billing** | Check your balance, list transactions and invoices, start a top up by card (Stripe), Bitcoin (BTCPay) or USDC (x402), read your TAO deposit address |
| **Account** | Manage account settings and access keys |

For storing and retrieving files, start with [Getting Started](/use/quickstart) and [Advanced Usage](/storage/s3/advanced). The Management API is the control plane: it manages *who* can access storage and *how much* they can use.

## Interactive Docs

The full API specification with request/response examples is available as an interactive Swagger UI:

**[api.hippius.com](https://api.hippius.com/)**

## Use Cases

<Unordered>
  <li><strong>CI/CD pipelines</strong>: create short-lived sub tokens scoped to a single bucket for deployments, then revoke them automatically</li>
  <li><strong>Multi-tenant apps</strong>: provision a bucket and scoped token per customer from your backend</li>
  <li><strong>Billing automation</strong>: monitor your balance and start a top up before running out</li>
  <li><strong>AI agents &amp; LLMs</strong>: automate storage operations end-to-end without manual console interaction</li>
</Unordered>

:::tip For AI agents and LLMs
A machine-readable index is at [docs.hippius.com/llms.txt](https://docs.hippius.com/llms.txt). It points at each product's own `llms.txt`. The long S3 ingest is [docs.hippius.com/llms-full.txt](https://docs.hippius.com/llms-full.txt).
:::

## Authentication

All Management API requests require an access token. Generate one in the [Hippius Console](https://console.hippius.com) under Settings.

## Related

<Unordered>
  <li><a href="/use/quickstart">S3 Quickstart</a>: first upload</li>
  <li><a href="/storage/s3/advanced">Advanced Usage</a>: presigned URLs, ACLs, public buckets, sub-tokens</li>
  <li><a href="/storage/s3/compatibility">S3 Compatibility Matrix</a>: supported S3 operations</li>
</Unordered>
