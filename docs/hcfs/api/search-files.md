---
id: search-files
title: GET /search_files/{ss58}
sidebar_label: GET /search_files
slug: /hcfs/api/search-files
---

# `GET /search_files/{ss58}`

Cross-folder file search with server-side filtering, sorting, and pagination. Shipped in PR #143. Use this instead of `GET /list_folders` + per-folder `GET /get_state` when you need to search or filter — client-side filtering against a paginated `get_state` response will miss matches on later pages.

## Authentication

Same as `/get_state`: `Authorization: Bearer <token>` where the token is tied to the `{ss58_address}` in the path. `X-Billing-Bypass: <token>` if your environment requires it. Requests authorized as a different ss58 get **403**.

## Query parameters

All are optional. Filters that are set combine with **AND**.

| Name         | Type    | Default       | Notes |
|--------------|---------|---------------|-------|
| `q`          | string  | —             | Case-insensitive substring match against `file_name` (falls back to `relative_path` if `file_name` is null). Max 256 chars; longer returns 400 `q_too_long`. |
| `file_type`  | string  | —             | Either a category or an explicit extension like `.png`. See [categories](#file_type-categories). Unknown value returns 400 `invalid_file_type`. |
| `size_min`   | number  | —             | Bytes, inclusive (`size_bytes >= size_min`). |
| `size_max`   | number  | —             | Bytes, inclusive (`size_bytes <= size_max`). |
| `date_from`  | number  | —             | Unix seconds, inclusive (`created_at >= date_from`). |
| `date_to`    | number  | —             | Unix seconds, inclusive (`created_at <= date_to`). |
| `offset`     | number  | `0`           | |
| `limit`      | number  | `25`          | Capped at 10000. |
| `sort_by`    | string  | `created_at`  | One of: `file_name`, `size_bytes`, `created_at`, `updated_at`. Unknown values silently fall back to the default. |
| `sort_order` | string  | `desc`        | `asc` or `desc` (case-insensitive). Unknown values silently fall back to `desc`. |

### `file_type` categories

| Category    | Extensions |
|-------------|------------|
| `image`     | `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`, `.bmp`, `.ico`, `.tiff` |
| `video`     | `.mp4`, `.mov`, `.avi`, `.mkv`, `.webm`, `.flv`, `.wmv` |
| `audio`     | `.mp3`, `.wav`, `.ogg`, `.flac`, `.aac`, `.m4a`, `.wma` |
| `document`  | `.doc`, `.docx`, `.xls`, `.xlsx`, `.ppt`, `.pptx`, `.txt`, `.csv`, `.rtf` |
| `pdf`       | `.pdf` |
| `archive`   | `.zip`, `.rar`, `.7z`, `.tar`, `.gz`, `.bz2` |
| `code`      | `.js`, `.ts`, `.py`, `.rs`, `.go`, `.java`, `.c`, `.cpp`, `.html`, `.css`, `.json` |

`file_type=other` returns **400** — the spec listed it but it has no defined extensions on the server side, so rejecting it early prevents a silent "returns every row" bug.

Explicit extensions (`file_type=.png`) match files whose name ends with that extension, case-insensitively.

## Response — success (200)

```json
{
  "Success": {
    "ss58_address": "5Grw...",
    "files": [
      {
        "folder_hash": "abc1234567890def",
        "folder_label": "My Documents",
        "path_hash": [ /* 32 bytes */ ],
        "salted_hash": [ /* 32 bytes */ ],
        "size_bytes": 1048576,
        "revision_seq": 1,
        "revision_id": [ /* 32 bytes */ ],
        "encrypted_path": [ /* variable length ciphertext */ ],
        "file_name": "report.pdf",
        "relative_path": "Work/report.pdf",
        "arion_hash": "Qm...",
        "chunk_hashes": ["Qm...", "Qm..."],
        "created_at": 1713139200,
        "updated_at": 1713139200
      }
    ],
    "total_count": 142,
    "has_more": true,
    "offset": 0,
    "limit": 25
  }
}
```

### Hit shape notes

- `folder_hash` and `folder_label` are added by this endpoint — they tell you which folder each result belongs to so you can render breadcrumbs or group by folder without a second lookup.
- `folder_label` is `""` if the folder was never registered via `POST /register_folder` (legacy rows or unregistered test data).
- Every other field is identical to what `/get_state` returns per file (`RemoteFileEntry` shape, flattened onto the top level — no nested `file: {}` object).
- `relative_path` is plaintext. If you need the parent directory path, strip the filename client-side: `relative_path.rsplit('/', 1).first()`.
- `arion_hash` and `chunk_hashes` are `null` when Arion storage metadata is unavailable for the row; `file_name` / `relative_path` are `null` for pre-backfill rows.

## Response — errors

All errors use the shared `NetworkResponse::Error` envelope:

```json
{ "Error": { "error": "<code>", "message": "<human-readable>" } }
```

| Status | `error` code          | When                                                           |
|--------|-----------------------|----------------------------------------------------------------|
| 400    | `invalid_file_type`   | Unknown category or `other` or malformed extension.            |
| 400    | `q_too_long`          | `q` exceeds 256 characters.                                    |
| 400    | `invalid_user_id`     | `ss58_address` is empty, over 256 bytes, or contains `%` / `\`.|
| 401    | `unauthorized`        | Missing / invalid `Authorization` header.                      |
| 403    | `forbidden`           | Token valid but does not match the path `ss58_address`.        |
| 404    | `not_found`           | Resource missing (reserved; not produced by the current read path). |
| 409    | `conflict`            | Write conflict (reserved; not produced by the current read path).   |
| 500    | `database_error`      | Server-side DB failure. The body is generic; check server logs.|

## Pagination

- Send `offset` + `limit`. Server returns `total_count` (across all pages, not just this page) and `has_more`.
- `has_more` is `true` iff `offset + returned_count < total_count`.
- Results are stably sorted by the chosen column plus `path_hash` as a tiebreaker, so paging through a dataset with duplicate sort values doesn't drop or repeat rows.

## Examples

```
GET /search_files/{ss58}?q=report&offset=0&limit=25
GET /search_files/{ss58}?file_type=image&size_min=1048576
GET /search_files/{ss58}?date_from=1710000000&date_to=1713139200&sort_by=size_bytes&sort_order=desc
GET /search_files/{ss58}?q=photo&file_type=image&size_max=5242880&date_from=1710000000
```

## Caveats

- **Pre-backfill rows.** Rows where both `file_name` AND `relative_path` are null (uploaded before relative-path support) are invisible to `q` and `file_type` filters. They will still appear when no name/type filter is set. Same caveat applies to `/browse`.
- **Substring search performance.** `q` uses `ILIKE '%...%'` which does not hit the existing prefix index, so very large folders may be slow under deep substring searches. Fine at current scale; if your UI shows noticeable latency on large libraries, ping backend about adding a `pg_trgm` index.
- **`list_folders` and `get_state` are unchanged.** This endpoint is additive; existing flows keep working.

## Source

- Plan: `docs/plans/2026-04-20-hcfs-search-files-endpoint.md`
- Handler: `hcfs-server/src/handlers/search.rs`
- DB method: `hcfs-server/src/database.rs` (`HcfsStore::search_user_files`)
- Types: `hcfs-shared/src/network.rs` (`SearchFilesQuery`, `SearchFileHit`, `SearchFilesResult`)
- PR: [#143](https://github.com/thenervelab/hcfs/pull/143)
