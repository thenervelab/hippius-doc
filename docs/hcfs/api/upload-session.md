---
id: upload-session
title: Chunked upload session
sidebar_label: Chunked upload session
slug: /hcfs/api/upload-session
---

# Chunked upload session

Five endpoints that implement a resumable, parallel-friendly upload flow for large files. The client opens a session, uploads chunks in any order (optionally in parallel), finalizes to commit the assembled file, or deletes to abort.

Use this instead of the single-shot [`/upload`](./upload.md) for anything above a few tens of MiB — the single-shot path buffers the full multipart body and fails entirely on network blips.

## Lifecycle

```
POST   /upload/session                           → session_id
PUT    /upload/session/{id}/chunk/{index}        (repeat per chunk)
GET    /upload/session/{id}/status               (optional; resume after a crash)
POST   /upload/session/{id}/finalize             → revision_id
DELETE /upload/session/{id}                      (optional; abort)
```

## Authentication

Every endpoint requires `Authorization: Bearer <token>` matching the session owner's SS58 address. See [`auth.md`](./auth.md). The session owner is fixed at creation time from `manifest.ss58_address`.

---

## `POST /upload/session` {#post-uploadsession}

Open a new chunked upload session. The request carries the full `Manifest` for the target file (same shape as for a single-shot upload — see [`upload.md`](./upload.md#manifest-schema)) plus chunk-layout metadata.

### Request

```
POST /upload/session
Content-Type:  application/json
Authorization: Bearer <token>
```

```json
{
  "manifest":        { /* full Manifest — see upload.md */ },
  "chunk_count":     64,
  "chunk_size":      1048576,
  "ciphertext_size": 67108864
}
```

| Field | Type | Notes |
|---|---|---|
| `manifest` | object | Full signed manifest for the file being uploaded |
| `chunk_count` | `u32` | Number of chunks the client intends to upload |
| `chunk_size` | `u64` | Bytes per chunk (last chunk may be smaller). Each chunk ≤ 16 MiB. |
| `ciphertext_size` | `u64` | Total ciphertext size (base nonce + framing + all chunks) |

### Response — success (200)

```json
{
  "Success": {
    "session_id": "<opaque string>",
    "expires_at": 1713225600
  }
}
```

Store `session_id` — every subsequent endpoint needs it. Sessions expire at `expires_at` (Unix seconds); uploading a chunk or calling `status` refreshes the expiry.

### Errors

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_manifest` | Manifest signature invalid, or `chunk_count` / `chunk_size` inconsistent with `ciphertext_size` |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than `manifest.ss58_address` |

### Example

```bash
curl -X POST "$SERVER/upload/session" \
  -H "Authorization: Bearer $SS58" \
  -H "Content-Type: application/json" \
  -d @create_session.json
```

---

## `PUT /upload/session/{session_id}/chunk/{chunk_index}` {#put-uploadsessionidchunkindex}

Upload one chunk of ciphertext. Chunks may be uploaded in any order and in parallel. Re-uploading a chunk is idempotent (last write wins, same index).

### Request

```
PUT /upload/session/{session_id}/chunk/{chunk_index}
Content-Type:  application/octet-stream
Authorization: Bearer <token>
```

| Parameter | Format | Notes |
|---|---|---|
| `session_id` | string | Returned by `POST /upload/session` |
| `chunk_index` | `u32` | 0-based chunk index. Must be `< chunk_count` from the session. |

Body: raw chunk bytes. ≤ 16 MiB.

### Response — success (200)

```json
{ "Success": { "chunk_index": 7 } }
```

### Errors

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_manifest` | Chunk size exceeds 16 MiB, or `chunk_index ≥ chunk_count` |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token does not own the session |
| `404` | `not_found` | No such session (never existed, or expired) |

### Example

```bash
curl -X PUT "$SERVER/upload/session/$SESSION_ID/chunk/7" \
  -H "Authorization: Bearer $SS58" \
  -H "Content-Type: application/octet-stream" \
  --data-binary "@chunk-7.bin"
```

---

## `GET /upload/session/{session_id}/status` {#get-uploadsessionidstatus}

Inspect session progress — which chunks have arrived, which are still missing, and whether the session is ready to finalize. Use this to resume after a client restart.

### Request

```
GET /upload/session/{session_id}/status
Authorization: Bearer <token>
```

### Response — success (200)

```json
{
  "Success": {
    "session_id":      "<same as URL>",
    "state":           "receiving",
    "total_chunks":    64,
    "chunks_received": [0, 1, 2, 3, 5, 6, 8 /* ... */],
    "expires_at":      1713225600,
    "ciphertext_hash": "<BLAKE3 hex from manifest>"
  }
}
```

| Field | Meaning |
|---|---|
| `state` | `"receiving"` or `"finalized"`. Clients should only call `finalize` when `chunks_received.len() == total_chunks`. |
| `chunks_received` | List of chunk indices uploaded so far. To resume, compute `missing = { 0..total_chunks } - chunks_received` and upload those. |
| `expires_at` | Unix seconds when the session will be garbage-collected if idle |
| `ciphertext_hash` | Mirror of the session's `Manifest.ciphertext_hash`. Handy when resuming without access to the original manifest — lets you confirm you have the right session. |

### Errors

| Status | `error` code | Cause |
|---|---|---|
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token does not own the session |
| `404` | `not_found` | No such session |

### Example

```bash
curl -H "Authorization: Bearer $SS58" \
     "$SERVER/upload/session/$SESSION_ID/status"
```

---

## `POST /upload/session/{session_id}/finalize` {#post-uploadsessionidfinalize}

Assemble the uploaded chunks into the final ciphertext, verify the BLAKE3 hash against the session manifest, persist to storage, and write the `file_records` row. After this returns `200 Success`, the file behaves identically to one uploaded via the single-shot [`/upload`](./upload.md) endpoint.

### Request

```
POST /upload/session/{session_id}/finalize
Authorization: Bearer <token>
```

No body.

### Response — success (200)

Same shape as [`/upload`](./upload.md#response--success-200) — a `UploadResult` with the server-assigned `revision_id`.

```json
{
  "Success": {
    "upload_id":   "<opaque>",
    "timestamp":   1713139200,
    "revision_id": [ /* 32 bytes */ ],
    "created_at":  1713139200,
    "updated_at":  1713139200
  }
}
```

### Errors

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_manifest` | Not all chunks have been uploaded, or assembled `ciphertext_hash` does not match the manifest |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token does not own the session |
| `404` | `not_found` | No such session |
| `409` | `conflict` / `upload_conflict` | `base_revision_id` does not match current — handle exactly as for a single-shot upload |
| `500` | `database_error`, `storage_inconsistency` | Transient |

### Example

```bash
curl -X POST "$SERVER/upload/session/$SESSION_ID/finalize" \
  -H "Authorization: Bearer $SS58"
```

---

## `DELETE /upload/session/{session_id}` {#delete-uploadsessionid}

Abort a session and release its temporary storage. Safe to call at any point; idempotent.

### Request

```
DELETE /upload/session/{session_id}
Authorization: Bearer <token>
```

### Response — success (200)

```json
{ "Success": { "deleted": true } }
```

### Errors

| Status | `error` code | Cause |
|---|---|---|
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token does not own the session |
| `404` | `not_found` | No such session (already deleted, or never existed) |

### Example

```bash
curl -X DELETE "$SERVER/upload/session/$SESSION_ID" \
  -H "Authorization: Bearer $SS58"
```

---

## Notes

- Sessions are owned by the SS58 that created them. A different user cannot read, extend, finalize, or delete a session even if they somehow learn the `session_id`.
- Expired sessions and their chunk data are garbage-collected by a background worker. Treat `404 not_found` on a session you believe you created as "your session expired — open a new one and re-upload".
- There is no per-chunk signature. The server verifies the whole assembled ciphertext against `manifest.ciphertext_hash` at finalize time — a chunk that is altered in transit will cause `finalize` to fail with `invalid_manifest`, not the individual `PUT`.
- Parallel chunk upload is supported and encouraged — the server accepts chunks independently. Bound your client-side concurrency to avoid self-DoS.
