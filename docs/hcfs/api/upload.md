---
id: upload
title: POST /upload — HCFS native upload
sidebar_label: POST /upload
slug: /hcfs/api/upload
---

# POST /upload — HCFS native upload

Upload one end-to-end encrypted file. The request body is a `multipart/form-data` payload with a signed `manifest` field (JSON) followed by a `ciphertext` field (binary). The server authenticates the manifest signature, enforces optimistic concurrency on revisions, streams the ciphertext to storage, and writes a `file_records` row.

For the S3-compatible gateway variant (plain file upload without a manifest or client-side encryption), see [`s3-gateway.md`](./s3-gateway.md).

## Authentication

`Authorization: Bearer <token>`. The token's resolved SS58 must match `manifest.ss58_address`. See [`auth.md`](./auth.md).

## Request

### Method and path

```
POST /upload
```

### Headers

```
Authorization: Bearer <token>
Content-Type:  multipart/form-data; boundary=<boundary>
```

### Body — multipart form

The first multipart field **must** be named `manifest`; the server peeks the field name to dispatch the handler.

| Field | Content-Type | Body |
|---|---|---|
| `manifest` (first) | `application/json` | JSON-serialized `Manifest` — see below |
| `ciphertext` (second) | `application/octet-stream` | The chunked-encrypted file blob |

### Manifest schema

Authoritative source: `hcfs-shared/src/network.rs::Manifest`.

| Field | Type | Notes |
|---|---|---|
| `ss58_address` | `string` | The user's SS58 (accepts alias `user_id`) |
| `folder_hash` | `string` | 16-char hex — first 16 chars of `SHA-256(folder_label)` |
| `ciphertext_hash` | `string` | BLAKE3 hex of the ciphertext blob |
| `size_bytes` | `u64` | **Plaintext** size in bytes |
| `timestamp` | `i64` | Client-supplied Unix seconds |
| `signature` | `[u8; 64]` | Ed25519 signature — see below |
| `signing_key` | `[u8; 32]` | Ed25519 public verifying key |
| `path_hash` | `[u8; 32]` | `BLAKE3(relative_path.utf8_bytes)` |
| `salted_hash` | `[u8; 32]` | `BLAKE3(ss58_address ‖ plaintext_bytes)` |
| `revision_seq` | `u64` | Monotonic — strictly greater than the file's current `revision_seq`. `1` for new files. |
| `base_revision_id` | `[u8; 32] \| null` | Current revision the client believed it was modifying. `null` for new files. |
| `encrypted_path` | `Vec<u8>` | Chunked-encrypted relative path (may be empty) |
| `file_name` | `string \| null` | Plaintext filename — improves download progress UX |
| `relative_path` | `string \| null` | Plaintext relative path — enables `/browse` and `/search_files` |

### Signature scheme

The signature does **not** cover the full manifest JSON. It covers a fixed-format Terms-of-Service declaration containing the ciphertext hash:

```
text = "I here by declare that the file with hash {ciphertext_hash} that i am uploading is in par with the ToS of the provider"
signature = Ed25519::sign(signing_key, text.as_bytes())
```

The integrity of the other manifest fields is enforced at lookup / sync time via `salted_hash` comparisons and the server's independent BLAKE3 recomputation of the ciphertext.

### Ciphertext wire format

The `ciphertext` multipart field is a framed chunked blob:

```
[base_nonce: 24 bytes]
[chunk_count: u32 little-endian]
for each chunk i in 0..chunk_count:
  [chunk_len: u32 LE]   = ciphertext_bytes_len + 16 (Poly1305 tag)
  [ciphertext_bytes]
  [auth_tag: 16 bytes]
```

Per-chunk nonce is `base_nonce[..8] XOR chunk_index.to_le_bytes()` (XOR against the first 8 bytes; remaining 16 bytes unchanged). Chunk size is 256 KiB. Zero-byte files produce `chunk_count = 1` with a single empty-plaintext frame.

`manifest.ciphertext_hash` is `BLAKE3(entire blob).hex()` — the server re-computes and rejects mismatches.

## Response — success (200)

```json
{
  "Success": {
    "upload_id":   "<opaque>",
    "timestamp":   1713139200,
    "revision_id": [ /* 32 bytes — the new revision */ ],
    "created_at":  1713139200,
    "updated_at":  1713139200
  }
}
```

`revision_id` is server-assigned. Store it so the next write to this file can send it as `base_revision_id`.

## Response — errors

Shared envelope shape in [`errors.md`](./errors.md).

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_manifest` | Manifest JSON malformed, signature invalid, or required field missing |
| `400` | `stale_sequence` | `revision_seq` is not strictly greater than the current row's |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than `manifest.ss58_address` |
| `409` | `conflict` / `upload_conflict` | `base_revision_id` does not match current. Envelope carries `current_revision_id` + `current_revision_seq`. |
| `500` | `database_error`, `storage_inconsistency` | Transient — retry with backoff |

## Example

```bash
curl -X POST "$SERVER/upload" \
  -H "Authorization: Bearer $SS58" \
  -F "manifest=@manifest.json;type=application/json" \
  -F "ciphertext=@file.enc;type=application/octet-stream"
```

Field order matters: the `manifest` field must be first. Tools like `curl` send `-F` flags in order.

## Notes

- Large files should use the chunked upload session flow — see [`upload-session.md`](./upload-session.md).
- To discover a file's current `revision_id` before an update, list the folder via [`/get_state`](./get-state.md) and find the entry by `path_hash`.
- For renames, prefer [`/rename_files`](./rename-files.md) over an upload at the new path + delete at the old one — the batch rename is atomic and does not re-upload ciphertext.
