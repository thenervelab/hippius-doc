---
id: folders
title: Folder lifecycle
sidebar_label: Folders
slug: /hcfs/api/folders
---

# Folder lifecycle

Three endpoints for the folder registry: register a new folder, list a user's folders, unregister (and delete) a folder. Folder registration is what makes `folder_label` show up in [`/list_folders`](./folders.md#get-list_foldersbase_address) and [`/search_files`](./search-files.md); files can still be uploaded to an unregistered `folder_hash`, they just surface with `folder_label = ""`.

---

## `POST /register_folder` {#post-register_folder}

Declare a new sync folder under an SS58 address.

### Authentication

`Authorization: Bearer <token>` matching `ss58_address` in the request body. See [`auth.md`](./auth.md).

### Request

```
POST /register_folder
Content-Type:  application/json
Authorization: Bearer <token>
```

```json
{
  "ss58_address": "5Grw...",
  "folder_hash":  "abc1234567890def",
  "label":        "My Documents",
  "device_name":  "laptop-home"
}
```

| Field | Type | Notes |
|---|---|---|
| `ss58_address` | string | Owner's SS58 (accepts alias `user_id`) |
| `folder_hash` | 16-char hex | First 16 chars of `SHA-256(label)` — the client computes this |
| `label` | string | Human-readable folder name |
| `device_name` | `string \| null` | Optional — records which device first registered this folder |

### Response — success (200)

```json
{ "Success": { "status": "registered" } }
```

### Response — errors

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_manifest` | Body malformed or required field missing |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than `ss58_address` |
| `409` | `conflict` | A folder with this `folder_hash` is already registered for this user |
| `500` | `database_error` | Transient |

### Example

```bash
curl -X POST "$SERVER/register_folder" \
  -H "Authorization: Bearer $SS58" \
  -H "Content-Type: application/json" \
  -d '{
    "ss58_address": "'"$SS58"'",
    "folder_hash":  "abc1234567890def",
    "label":        "My Documents",
    "device_name":  "laptop-home"
  }'
```

---

## `GET /list_folders/{base_address}` {#get-list_foldersbase_address}

Enumerate every folder a user has registered, with per-folder file count and total size.

### Authentication

`Authorization: Bearer <token>` matching `{base_address}`.

### Request

```
GET /list_folders/{base_address}
Authorization: Bearer <token>
```

### Response — success (200)

```json
{
  "Success": {
    "base_address": "5Grw...",
    "folders": [
      {
        "label":       "My Documents",
        "folder_hash": "abc1234567890def",
        "file_count":  142,
        "total_bytes": 943718400,
        "created_at":  1713139200,
        "updated_at":  1713225600,
        "device_name": "laptop-home"
      }
    ]
  }
}
```

| `RemoteFolderInfo` field | Type | Notes |
|---|---|---|
| `label` | string | Human-readable folder name from registration |
| `folder_hash` | 16-char hex | Use this in path parameters of other endpoints |
| `file_count` | `u64` | Files currently in the folder |
| `total_bytes` | `u64` | Sum of plaintext sizes |
| `created_at` | `i64` | Unix seconds when the folder was registered |
| `updated_at` | `i64` | Unix seconds when a file in the folder last changed |
| `device_name` | string | `""` when the folder was registered without one |

### Response — errors

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_user_id` | `base_address` malformed |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than `{base_address}` |

### Example

```bash
curl -H "Authorization: Bearer $SS58" \
     "$SERVER/list_folders/$SS58"
```

---

## `DELETE /unregister_folder` {#delete-unregister_folder}

Remove a folder and **every file it owns**. Storage blobs for every file in the folder are scheduled for deletion.

### Authentication

`Authorization: Bearer <token>` matching `ss58_address` in the request body.

### Request

```
DELETE /unregister_folder
Content-Type:  application/json
Authorization: Bearer <token>
```

```json
{ "ss58_address": "5Grw...", "folder_hash": "abc1234567890def" }
```

### Response — success (200)

```json
{
  "Success": {
    "status":        "unregistered",
    "files_deleted": 142
  }
}
```

### Response — errors

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_manifest` | Body malformed |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | SS58 mismatch |
| `404` | `not_found` | No folder registered at this `folder_hash` for this user |
| `500` | `database_error` | Transient |

### Example

```bash
curl -X DELETE "$SERVER/unregister_folder" \
  -H "Authorization: Bearer $SS58" \
  -H "Content-Type: application/json" \
  -d '{ "ss58_address": "'"$SS58"'", "folder_hash": "abc1234567890def" }'
```

## Notes

- `folder_hash` is deterministic: same `label` always produces the same hash. This lets multiple devices register the same folder without coordination — the second caller gets `409 conflict` and can proceed assuming the folder exists.
- Unregistering is destructive and irreversible. To delete a single file instead, use [`/delete`](./delete.md).
- You can upload files to a `folder_hash` that was never registered — they will show up in `/get_state` but with `folder_label = ""` in `/search_files` results. Registering after-the-fact adds the label.
