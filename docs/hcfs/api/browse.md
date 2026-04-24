---
id: browse
title: GET /browse/{ss58}/{folder_hash}
sidebar_label: GET /browse
slug: /hcfs/api/browse
---

# `GET /browse/{ss58}/{folder_hash}`

Directory-scoped tree listing — returns immediate subfolders and the files at the given path, with pagination. Use this for a Finder / Explorer style UI where the user navigates one level at a time.

For a flat listing of every file in a folder, use [`/get_state`](./get-state.md). For cross-folder search with filters, use [`/search_files`](./search-files.md).

## Authentication

`Authorization: Bearer <token>` matching `{ss58_address}`. See [`auth.md`](./auth.md).

## Request

### Method and path

```
GET /browse/{ss58_address}/{folder_hash}
```

### Path parameters

| Name | Format | Notes |
|---|---|---|
| `ss58_address` | string | Owner's SS58 address |
| `folder_hash` | 16-char hex | Folder label's hash |

### Query parameters

| Name | Type | Default | Notes |
|---|---|---|---|
| `path` | string | `""` (folder root) | Directory path relative to the folder root, POSIX-style (`Documents/2026`). Trailing slash optional. |
| `offset` | `u32` | `0` | Starting index into the combined folders+files result set |
| `limit` | `u32` | server default | Results per page |

### Headers

```
Authorization: Bearer <token>
```

## Response — success (200)

```json
{
  "Success": {
    "ss58_address": "5Grw...",
    "folder_hash":  "abc1234567890def",
    "path":         "Documents/2026",
    "folders": [
      { "name": "taxes",  "file_count": 12, "total_bytes": 54321 },
      { "name": "trips",  "file_count":  3, "total_bytes":  9876 }
    ],
    "files": [
      {
        "path_hash":    [ /* 32 bytes */ ],
        "salted_hash":  [ /* 32 bytes */ ],
        "size_bytes":   1048576,
        "revision_seq": 1,
        "revision_id":  [ /* 32 bytes */ ],
        "encrypted_path": [ /* variable */ ],
        "file_name":    "report.pdf",
        "relative_path":"Documents/2026/report.pdf",
        "arion_hash":   "Qm...",
        "chunk_hashes": null,
        "created_at":   1713139200,
        "updated_at":   1713139200
      }
    ],
    "total_count": 8,
    "has_more":    false,
    "offset":      0,
    "limit":       25
  }
}
```

### Sort order

1. Folders first, alphabetical, case-insensitive.
2. Files second, alphabetical case-insensitive by `file_name`, tiebreak by `path_hash`.

### Subfolder aggregates

`file_count` and `total_bytes` on each `BrowseFolderEntry` are **recursive** — they count every descendant of the subfolder, not just direct children. This matches Finder / Explorer UX where clicking a folder shows the full size summary regardless of nesting.

### File shape

Identical to the `RemoteFileEntry` returned by [`/get_state`](./get-state.md#remotefileentry-fields).

### Pagination

`total_count = folders.len() + count(files at this exact path)`. `has_more` is `true` iff `offset + (folders + files in this page) < total_count`.

## Response — errors

Shared envelope shape in [`errors.md`](./errors.md).

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_user_id` / validator errors from `path` | Malformed SS58, or `path` contains `..`, backslashes, etc. |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than the path |
| `500` | `database_error` | Transient — retry with backoff |

## Example

```bash
# Browse the folder root
curl -H "Authorization: Bearer $SS58" \
     "$SERVER/browse/$SS58/$FOLDER_HASH"

# Browse a subdirectory
curl -H "Authorization: Bearer $SS58" \
     "$SERVER/browse/$SS58/$FOLDER_HASH?path=Documents/2026&limit=100"
```

## Notes

- **Files without a `relative_path` are hidden from browse.** Legacy rows (uploaded before relative-path support) will not appear here until the client backfills them via [`/register_relative_paths`](./register-relative-paths.md). They still appear in `/get_state` and in sync.
- Empty directories return a 200 with empty `folders` and `files` arrays — not a 404.
- The endpoint pages the combined folders+files stream, not folders and files separately. If you need to page them independently, consider using `/search_files` with explicit filters.
