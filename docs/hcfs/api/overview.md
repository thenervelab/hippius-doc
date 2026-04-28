---
id: overview
title: HCFS REST API Reference
sidebar_label: Overview
slug: /hcfs/api/overview
---

# HCFS REST API Reference

The authoritative description of every HCFS HTTP endpoint. Each endpoint has its own page with request shape, response shape, status codes, and a working `curl` example.

Before reading an endpoint page, skim [`auth.md`](./auth.md) and [`errors.md`](./errors.md) — every endpoint assumes that model.

- **Base URL:** `https://<server>/`
- **Transport:** HTTPS (TLS terminated upstream)
- **Content types:** `application/json` for request/response bodies, `multipart/form-data` for uploads, `application/octet-stream` for ciphertext downloads

---

## Prerequisites

| Page | What it covers |
|---|---|
| [`auth.md`](./auth.md) | Bearer-token model, identity resolution, 401 / 403 behaviour |
| [`errors.md`](./errors.md) | `NetworkResponse<T>` envelope, error-code catalog, optimistic concurrency |

---

## Endpoint index

### File lifecycle — HCFS native (end-to-end encrypted)

| Endpoint | Method | Purpose |
|---|---|---|
| [`/upload`](./upload.md) | POST | Upload a signed manifest + ciphertext for one file |
| [`/download/{ss58}/{folder_hash}/{file_id}`](./download.md) | GET | Stream the ciphertext back, with metadata headers |
| [`/delete/{ss58}/{folder_hash}/{file_id}`](./delete.md) | DELETE | Remove ciphertext + metadata for one file |

### File lifecycle — S3-compatible gateway (server-side only)

| Endpoint | Method | Purpose |
|---|---|---|
| [`/upload`](./s3-gateway.md#post-upload) | POST | Upload a plain file with `account_ss58` + `file` fields (no manifest, no client-side encryption) |
| [`/download/{ss58}/{file_id}`](./s3-gateway.md#get-downloadss58file_id) | GET | Stream file by ID without folder scope |
| [`/delete/{ss58}/{file_id}`](./s3-gateway.md#delete-deletess58file_id) | DELETE | Remove file by ID without folder scope |

### State and discovery

| Endpoint | Method | Purpose |
|---|---|---|
| [`/get_state/{ss58}/{folder_hash}`](./get-state.md) | GET | Paginated listing of every file in a folder |
| [`/browse/{ss58}/{folder_hash}`](./browse.md) | GET | Directory-scoped tree listing with subfolder aggregates |
| [`/search_files/{ss58}`](./search-files.md) | GET | Cross-folder file search with filters, sort, pagination |
| [`/register_relative_paths/{ss58}/{folder_hash}`](./register-relative-paths.md) | POST | Backfill plaintext relative paths for legacy rows |

### Folder lifecycle

| Endpoint | Method | Purpose |
|---|---|---|
| [`/register_folder`](./folders.md#post-register_folder) | POST | Declare a new sync folder under an SS58 address |
| [`/list_folders/{base_address}`](./folders.md#get-list_foldersbase_address) | GET | Enumerate every folder a user has registered |
| [`/unregister_folder`](./folders.md#delete-unregister_folder) | DELETE | Remove a folder and every file record it owns |

### Rename

| Endpoint | Method | Purpose |
|---|---|---|
| [`/rename_files`](./rename-files.md) | POST | Atomic batch rename — re-keys file records without touching storage |

### Resumable / chunked upload

| Endpoint | Method | Purpose |
|---|---|---|
| [`/upload/session`](./upload-session.md#post-uploadsession) | POST | Open a chunked upload session |
| [`/upload/session/{id}/chunk/{index}`](./upload-session.md#put-uploadsessionidchunkindex) | PUT | Upload one chunk (≤ 16 MiB) |
| [`/upload/session/{id}/status`](./upload-session.md#get-uploadsessionidstatus) | GET | Inspect session progress and resume point |
| [`/upload/session/{id}/finalize`](./upload-session.md#post-uploadsessionidfinalize) | POST | Assemble chunks and commit the file |
| [`/upload/session/{id}`](./upload-session.md#delete-uploadsessionid) | DELETE | Abort and clean up a session |

---

## Response envelope

Every endpoint's JSON body is shaped as one of:

```json
{ "Success": { ... endpoint-specific payload ... } }
{ "Conflict": { "error": "...", "message": "...", "current_revision_id": [...], "current_revision_seq": 0 } }
{ "Error":    { "error": "<code>", "message": "<human-readable>" } }
```

See [`errors.md`](./errors.md) for the code catalog and the optimistic-concurrency rules that produce `Conflict`.

---

## Authentication in one line

Send `Authorization: Bearer <token>`. The server resolves the token to an SS58 address and refuses requests whose URL `{ss58_address}` segment does not match. See [`auth.md`](./auth.md).
