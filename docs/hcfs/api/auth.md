---
id: auth
title: Authentication
sidebar_label: Authentication
slug: /hcfs/api/auth
---

# Authentication

Every authenticated HCFS endpoint requires a bearer token. The server resolves it to a Substrate SS58 address and enforces that the URL's `{ss58_address}` segment matches the resolved identity.

## Header

```
Authorization: Bearer <token>
```

The token is whatever string the configured auth verifier accepts and maps to an SS58 address. The HCFS reference client sends the user's SS58 address itself as the token; a third-party client may send an opaque token issued by the auth service.

## Identity binding

Most endpoints embed the user's SS58 in the path:

```
GET  /get_state/{ss58_address}/{folder_hash}
POST /register_relative_paths/{ss58_address}/{folder_hash}
```

The server rejects any request where the token's resolved SS58 does not match the path segment. This prevents one valid user from probing another user's namespace by guessing path parameters.

## Billing bypass header

Some deployments honour an additional header:

```
X-Billing-Bypass: <token>
```

When present and valid, the server skips billing checks for that request. Clients should only set this when their environment explicitly requires it.

## Response behaviour

| Status | Condition |
|---|---|
| 200-family | Token valid, identity matches path |
| 401 `unauthorized` | Missing, malformed, or rejected token |
| 403 `forbidden` | Token valid, but resolved SS58 does not match the URL's `{ss58_address}` segment |

See [`errors.md`](./errors.md) for the full error envelope shape.

## Unauthenticated endpoints

| Path | Notes |
|---|---|
| `GET /health`, `/healthz`, `/readyz` | Liveness / readiness probes |
| `GET /public/download/{hash}` | Retrieve a blob that a user has explicitly published by its content hash |

All other endpoints require a bearer token.
