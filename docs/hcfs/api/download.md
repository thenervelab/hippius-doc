---
id: download
title: GET /download/{ss58}/{folder_hash}/{file_id}
sidebar_label: GET /download
slug: /hcfs/api/download
---

# `GET /download/{ss58}/{folder_hash}/{file_id}`

Stream the stored ciphertext for one file, along with the metadata needed to drive a progress bar and to maintain the three-tree sync state.

## Authentication

`Authorization: Bearer <token>`. The token's resolved SS58 must match the `{ss58_address}` path segment. See [`auth.md`](./auth.md).

## Request

### Method and path

```
GET /download/{ss58_address}/{folder_hash}/{file_id}
```

### Path parameters

| Name | Format | Notes |
|---|---|---|
| `ss58_address` | string | Owner's SS58 address |
| `folder_hash` | 16-char hex | First 16 chars of `SHA-256(folder_label)` |
| `file_id` | 64-char hex | Hex encoding of `path_hash` (BLAKE3 of the relative path) |

### Headers

```
Authorization: Bearer <token>
Range:         bytes=<start>-<end>     # optional, for partial content
```

### Query parameters

None.

## Response — success

### Status

| Status | When |
|---|---|
| `200 OK` | Full blob returned |
| `206 Partial Content` | `Range:` header was honored |

### Response headers

| Header | Meaning |
|---|---|
| `Content-Length` | **Ciphertext** bytes. Drives HTTP progress. May be omitted when the storage layer cannot report a length — clients must handle chunked transfer. |
| `X-Size-Bytes` | **Plaintext** bytes. Display this in the UI. |
| `X-Revision-Id` | 64-char hex — the file's current revision |
| `X-Revision-Seq` | u64 — monotonic revision sequence |
| `X-File-Id` | Echo of the URL's `{file_id}` |
| `X-Ss58-Address` | Echo of the URL's `{ss58_address}` |
| `X-Folder-Hash` | Echo of the URL's `{folder_hash}` |
| `Accept-Ranges` | `bytes` — partial-content is supported |
| `Content-Range` | Set on `206 Partial Content` responses |

### Body

Raw ciphertext bytes in the HCFS chunked wire format. See [`upload.md`](./upload.md#ciphertext-wire-format) for the framing layout and the per-chunk nonce derivation.

## Response — errors

Shared envelope shape in [`errors.md`](./errors.md).

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_file_id` | `file_id` is not valid 64-char hex |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than the path |
| `404` | `not_found` | No file at this `(ss58_address, folder_hash, path_hash)` |
| `500` | `storage_inconsistency` | Metadata row exists but the ciphertext blob is missing — retry with backoff; re-surface to logs if persistent |

## Example

```bash
curl -H "Authorization: Bearer $SS58" \
     -o "file.enc" \
     -D "headers.txt" \
     "$SERVER/download/$SS58/$FOLDER_HASH/$FILE_ID"

# Range request (resumable download)
curl -H "Authorization: Bearer $SS58" \
     -H "Range: bytes=1048576-" \
     -o "file.enc.part2" \
     "$SERVER/download/$SS58/$FOLDER_HASH/$FILE_ID"
```

## Notes

- To decrypt the returned bytes, you need the per-file `encryption_key` derived from the same mnemonic that was used to sign the upload.
- `Content-Length` and `X-Size-Bytes` differ because encryption adds framing overhead (24-byte base nonce + 4-byte count + 20 bytes per chunk). Use `X-Size-Bytes` for any user-facing file-size UI, and `Content-Length` only for HTTP transfer progress.
- The `file_id` is stable across revisions — only the content, `revision_id`, and `revision_seq` change.
