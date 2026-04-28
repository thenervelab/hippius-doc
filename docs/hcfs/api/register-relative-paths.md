---
id: register-relative-paths
title: POST /register_relative_paths/{ss58}/{folder_hash}
sidebar_label: POST /register_relative_paths
slug: /hcfs/api/register-relative-paths
---

# `POST /register_relative_paths/{ss58}/{folder_hash}`

Backfill plaintext `relative_path` values for file rows that were uploaded before the field existed. After a successful call, those rows become visible in [`/browse`](./browse.md) and [`/search_files`](./search-files.md) results.

The server never overwrites an existing non-null `relative_path` with a different value — calls against already-populated rows land in `skipped`, not `updated`.

## Authentication

`Authorization: Bearer <token>` matching `{ss58_address}`. See [`auth.md`](./auth.md).

## Request

### Method and path

```
POST /register_relative_paths/{ss58_address}/{folder_hash}
```

### Headers

```
Authorization: Bearer <token>
Content-Type:  application/json
```

### Body

```json
{
  "entries": [
    { "path_hash": "<64-char hex>", "relative_path": "Documents/report.pdf" },
    { "path_hash": "<64-char hex>", "relative_path": "photos/trip/IMG_0001.jpg" }
  ]
}
```

| Field | Type | Notes |
|---|---|---|
| `entries` | array | ≤ 500 entries per call (server rejects with `batch_too_large` above). Total request body ≤ 4 MiB. |
| `entries[].path_hash` | 64-char hex | Hex encoding of the row's `path_hash` (`BLAKE3(relative_path)`) |
| `entries[].relative_path` | string | Plaintext relative path — validated server-side against a path whitelist |

## Response — success (200, partial-success)

The endpoint **always** returns `200 Success` even when every entry fails. Inspect the `errors` array to detect failures.

```json
{
  "Success": {
    "updated": 47,
    "skipped": 3,
    "errors": [
      {
        "path_hash": "<64-char hex of failing entry>",
        "reason":    "invalid_path"
      }
    ]
  }
}
```

| Field | Meaning |
|---|---|
| `updated` | Count of rows that transitioned from NULL to a valid `relative_path` |
| `skipped` | Count of entries where the row already had a matching `relative_path` (idempotent no-op) or did not exist |
| `errors` | Per-entry failures. Each carries the hex `path_hash` of the failing entry and a `reason` code. |

### Known `reason` codes

| `reason` | Meaning |
|---|---|
| `invalid_path` | Failed `path_validator` (contains `..`, backslashes, null bytes, etc.) |
| `not_found` | No `file_records` row at this `path_hash` for this `(ss58, folder)` |
| `path_mismatch` | Row already has a different non-null `relative_path` — the server refuses to overwrite |
| `database_error` | Transient per-entry DB failure; safe to retry this entry |

## Response — errors (non-200)

Only request-level failures produce an `Error` envelope:

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_manifest` / `batch_too_large` | Body JSON malformed, or `entries.len() > 500`, or body > 4 MiB |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than the path |

## Example

```bash
curl -X POST "$SERVER/register_relative_paths/$SS58/$FOLDER_HASH" \
  -H "Authorization: Bearer $SS58" \
  -H "Content-Type: application/json" \
  -d '{
    "entries": [
      { "path_hash": "abcd...", "relative_path": "Documents/report.pdf" },
      { "path_hash": "ef01...", "relative_path": "photos/IMG_0001.jpg" }
    ]
  }'
```

## Notes

- Idempotent: calling with an entry that already matches the stored `relative_path` lands in `skipped`, not as an error.
- Typical use: after a desktop client upgrades to a version that sends `relative_path` on new uploads, it walks `/get_state`, identifies rows with `relative_path = null`, and calls this endpoint in batches of 500 with the local plaintext paths.
- Plaintext relative paths leave the client for the first time when you call this endpoint. If path privacy matters in your deployment, decide whether to opt in.
