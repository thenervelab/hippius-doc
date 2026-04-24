---
id: delete
title: DELETE /delete/{ss58}/{folder_hash}/{file_id}
sidebar_label: DELETE /delete
slug: /hcfs/api/delete
---

# `DELETE /delete/{ss58}/{folder_hash}/{file_id}`

Remove one file from a folder: drops the `file_records` row, decrements the user's storage summary, and deletes the ciphertext blob from storage.

## Authentication

`Authorization: Bearer <token>`. The token's resolved SS58 must match the `{ss58_address}` path segment. See [`auth.md`](./auth.md).

## Request

### Method and path

```
DELETE /delete/{ss58_address}/{folder_hash}/{file_id}
```

### Path parameters

| Name | Format | Notes |
|---|---|---|
| `ss58_address` | string | Owner's SS58 address |
| `folder_hash` | 16-char hex | Folder label's hash |
| `file_id` | 64-char hex | `path_hash` of the file |

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
    "status":       "deleted",
    "file_id":      "<64-char hex>",
    "ss58_address": "5Grw...",
    "folder_hash":  "abc1234567890def"
  }
}
```

## Response — errors

Shared envelope shape in [`errors.md`](./errors.md).

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_file_id` | `file_id` is not valid 64-char hex |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than the path |
| `404` | `not_found` | No file at this `(ss58_address, folder_hash, path_hash)` |
| `500` | `database_error` | Transient — retry with backoff |

## Example

```bash
curl -X DELETE \
     -H "Authorization: Bearer $SS58" \
     "$SERVER/delete/$SS58/$FOLDER_HASH/$FILE_ID"
```

## Notes

- Deletion is immediate. There is no undo endpoint.
- To remove every file in a folder in one call, use [`/unregister_folder`](./folders.md#delete-unregister_folder) instead.
- Concurrent deletes of the same file are idempotent: the first caller gets `200 Success`, subsequent callers get `404 not_found`.
