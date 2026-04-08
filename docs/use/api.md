---
id: hippius-api
title: Hippius Management API
sidebar_label: Hippius API
slug: /use/api
---

# Hippius Management API

The [Hippius Management API](https://api.hippius.com/) is a REST API for managing your account, S3 tokens, and billing programmatically. Use it to automate token rotation, monitor credit balances, or build integrations that provision storage on demand.

## What It Does

The Management API handles everything outside of the S3 data plane:

| Area | What you can do |
|------|----------------|
| **Token management** | Create, list, rotate, and revoke master and sub tokens |
| **Billing & credits** | Check credit balance, view usage, add credits via TAO |
| **Account** | Manage account settings and access keys |

For storing and retrieving files, use the [S3-compatible API](/storage/s3/integration) with any standard S3 client. The Management API is for the control plane — managing *who* can access storage and *how much* they can use.

## Interactive Docs

The full API specification with request/response examples is available as an interactive Swagger UI:

**[api.hippius.com](https://api.hippius.com/)**

## Use Cases

- **CI/CD pipelines** — Create short-lived sub tokens scoped to a single bucket for deployments, then revoke them automatically
- **Multi-tenant apps** — Provision a bucket and scoped token per customer from your backend
- **Billing automation** — Monitor credit balance and top up via TAO before running out
- **AI agents & LLMs** — Automate storage operations end-to-end without manual console interaction

:::tip For AI agents and LLMs
A machine-readable summary of the entire Hippius documentation is available at [docs.hippius.com/llms.txt](https://docs.hippius.com/llms.txt). Point your agent at this URL for full context on S3 operations, authentication, and API capabilities.
:::

## Authentication

All Management API requests require an access token. Generate one in the [Hippius Console](https://console.hippius.com) under Settings.

## Related

- [S3 Token Management](/use/s3-token-management) — How master and sub tokens work
- [S3 API Reference](/storage/s3/integration) — Data plane operations (upload, download, ACLs)
- [S3 Compatibility Matrix](/storage/s3/compatibility) — Supported S3 operations
