---
id: s3-gateway
title: S3-compatible gateway
sidebar_label: S3 Gateway
slug: /hcfs/api/s3-gateway
---

# S3-compatible gateway

Three endpoints that let any S3 SDK (or any plain multipart client) upload, download, and delete files through HCFS without implementing the native manifest + client-side encryption flow.

**These paths are not end-to-end encrypted.** The server holds the plaintext of every file uploaded through the gateway. Use the gateway when the client environment cannot hold keys; use the [native HCFS path](./upload.md) otherwise.

The gateway and the native path share the same `/upload` URL — the server inspects the first multipart field to decide which handler to dispatch.

---

## `POST /upload` {#post-upload}

Upload a plain file. The server hashes the content, derives `path_hash` from the filename, and writes a `file_records` row.

### Authentication

`Authorization: Bearer <token>`. The token's resolved SS58 must match the `account_ss58` field in the request body. See [`auth.md`](./auth.md).

### Request

```
POST /upload
Content-Type: multipart/form-data; boundary=<boundary>
Authorization: Bearer <token>
```

The **first** multipart field must be `account_ss58`. (This is the signal the server uses to route to the S3 handler rather than the HCFS native handler.) The `file` field follows.

| Field | Content-Type | Body |
|---|---|---|
| `account_ss58` (first) | `text/plain` | The uploader's SS58 address |
| `file` (second) | `application/octet-stream` | Raw file bytes — the server derives `path_hash` from the field filename |

### Response — success (200)

```json
{
  "Success": {
    "file_id":   "<64-char hex>",
    "upload_id": "<opaque>",
    "timestamp": 1713139200
  }
}
```

### Response — errors

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_manifest` / `missing_field` | First field isn't `account_ss58`, or the `file` field is missing |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than `account_ss58` |
| `500` | `database_error`, `storage_inconsistency` | Transient |

### Example

```bash
curl -X POST "$SERVER/upload" \
  -H "Authorization: Bearer $SS58" \
  -F "account_ss58=$SS58" \
  -F "file=@/path/to/document.pdf"
```

---

## `GET /download/{ss58}/{file_id}` {#get-downloadss58file_id}

Stream a file without folder scope. This is the gateway counterpart to the folder-scoped native [`/download`](./download.md) endpoint.

### Authentication

`Authorization: Bearer <token>` matching `{ss58}`.

### Request

```
GET /download/{ss58}/{file_id}
Authorization: Bearer <token>
Range: bytes=<start>-<end>    # optional
```

### Response

| Status | Meaning |
|---|---|
| `200 OK` | Full file returned |
| `206 Partial Content` | Range request honored |

Response headers mirror the native download: `Content-Length`, `X-Size-Bytes`, `X-Revision-Id`, `X-Revision-Seq`, `X-File-Id`, `X-Ss58-Address`, `Accept-Ranges`, `Content-Range`.

The body is raw file bytes (the server stored the plaintext directly — no HCFS chunked envelope).

### Response — errors

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_file_id` | Not valid 64-char hex |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than `{ss58}` |
| `404` | `not_found` | No such file |
| `500` | `storage_inconsistency` | Metadata row exists but blob is missing |

### Example

```bash
curl -H "Authorization: Bearer $SS58" \
     -o "document.pdf" \
     "$SERVER/download/$SS58/$FILE_ID"
```

---

## `DELETE /delete/{ss58}/{file_id}` {#delete-deletess58file_id}

Remove a file uploaded via the gateway.

### Authentication

`Authorization: Bearer <token>` matching `{ss58}`.

### Request

```
DELETE /delete/{ss58}/{file_id}
Authorization: Bearer <token>
```

### Response — success (200)

```json
{
  "Success": {
    "status":       "deleted",
    "file_id":      "<64-char hex>",
    "ss58_address": "5Grw...",
    "folder_hash":  ""
  }
}
```

`folder_hash` is empty for gateway-owned files.

### Response — errors

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_file_id` | Not valid hex |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | SS58 mismatch |
| `404` | `not_found` | No such file |

### Example

```bash
curl -X DELETE \
     -H "Authorization: Bearer $SS58" \
     "$SERVER/delete/$SS58/$FILE_ID"
```

---

## Notes

- Files uploaded through the gateway are listed by [`/get_state`](./get-state.md) alongside native uploads — the two paths share the `file_records` table.
- Because the server holds plaintext for gateway uploads, do not use this path for anything the user would not put on a conventional S3 bucket.
- If you need the full end-to-end-encrypted experience (server never sees plaintext, client-side key management), use the native [`/upload`](./upload.md) flow instead.
