---
id: get-state
title: GET /get_state/{ss58}/{folder_hash}
sidebar_label: GET /get_state
slug: /hcfs/api/get-state
---

# `GET /get_state/{ss58}/{folder_hash}`

Paginated listing of every file the user has in a folder. This is the primary input to a client's remote-tree reconstruction: walk it in order, page by page, and build a `path_hash → RemoteFileEntry` map.

For a directory-scoped tree view, see [`/browse`](./browse.md). For cross-folder filename/size/date search, see [`/search_files`](./search-files.md).

## Authentication

`Authorization: Bearer <token>` matching `{ss58_address}`. See [`auth.md`](./auth.md).

## Request

### Method and path

```
GET /get_state/{ss58_address}/{folder_hash}
```

### Path parameters

| Name | Format | Notes |
|---|---|---|
| `ss58_address` | string | Owner's SS58 address |
| `folder_hash` | 16-char hex | Folder label's hash |

### Query parameters

| Name | Type | Default | Notes |
|---|---|---|---|
| `offset` | `u32` | `0` | Starting index into the full ordered result set |
| `limit` | `u32` | server default | Results per page (capped server-side; consult server-config for exact max) |

### Headers

```
Authorization: Bearer <token>
```

### Body

None.

## Response — success (200)

```json
{
  "Success": {
    "ss58_address": "5Grw...",
    "folder_hash":  "abc1234567890def",
    "files": [
      {
        "path_hash":    [ /* 32 bytes */ ],
        "salted_hash":  [ /* 32 bytes */ ],
        "size_bytes":   1048576,
        "revision_seq": 1,
        "revision_id":  [ /* 32 bytes */ ],
        "encrypted_path": [ /* variable length ciphertext */ ],
        "file_name":    "report.pdf",
        "relative_path":"Work/report.pdf",
        "arion_hash":   "Qm...",
        "chunk_hashes": ["Qm...", "Qm..."],
        "created_at":   1713139200,
        "updated_at":   1713139200
      }
    ],
    "total_count": 142,
    "has_more":    true,
    "offset":      0,
    "limit":       25
  }
}
```

### `RemoteFileEntry` fields

| Field | Type | Notes |
|---|---|---|
| `path_hash` | `[u8; 32]` | Stable file identifier (`BLAKE3(relative_path)`) |
| `salted_hash` | `[u8; 32]` | `BLAKE3(ss58 ‖ plaintext)` — content-equality check that doesn't depend on the nonce |
| `size_bytes` | `u64` | Plaintext size |
| `revision_seq` | `u64` | Monotonic revision counter |
| `revision_id` | `[u8; 32]` | Opaque version identifier |
| `encrypted_path` | `Vec<u8>` | Chunked-encrypted relative path; may be empty |
| `file_name` | `string \| null` | Plaintext filename. `null` for legacy rows |
| `relative_path` | `string \| null` | Plaintext relative path. `null` for legacy rows; backfill via [`/register_relative_paths`](./register-relative-paths.md) |
| `arion_hash` | `string \| null` | Content hash from the storage backend. `null` when metadata is unavailable |
| `chunk_hashes` | `string[] \| null` | Per-chunk content hashes for chunk-native files. `null` / empty for single-blob files |
| `created_at` | `i64` | Unix seconds |
| `updated_at` | `i64` | Unix seconds |

## Response — errors

Shared envelope shape in [`errors.md`](./errors.md).

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_user_id` | `ss58_address` empty, > 256 bytes, or contains illegal characters |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than `{ss58_address}` |
| `500` | `database_error` | Transient — retry with backoff |

## Pagination

- `total_count` is the number of files across the whole folder, not just the current page.
- `has_more` is `true` iff `offset + returned_count < total_count`.
- Stable ordering: results are sorted by an internal primary key that does not change between pages, so paging through a dataset does not drop or repeat entries.

## Example

```bash
# First page
curl -H "Authorization: Bearer $SS58" \
     "$SERVER/get_state/$SS58/$FOLDER_HASH?offset=0&limit=100"

# Subsequent pages — loop until has_more is false
curl -H "Authorization: Bearer $SS58" \
     "$SERVER/get_state/$SS58/$FOLDER_HASH?offset=100&limit=100"
```

## Notes

- This endpoint is the canonical source for the remote `FileTree` consumed by the three-tree sync engine.
- Files without a `relative_path` are still returned — they are visible in sync but hidden from [`/browse`](./browse.md) and [`/search_files`](./search-files.md) until the client backfills via [`/register_relative_paths`](./register-relative-paths.md).
- Clients should cache `revision_id` from the most recent `get_state` response and pass it as `base_revision_id` on subsequent writes to that file.
