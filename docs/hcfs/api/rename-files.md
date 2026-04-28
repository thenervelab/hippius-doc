---
id: rename-files
title: POST /rename_files
sidebar_label: POST /rename_files
slug: /hcfs/api/rename-files
---

# POST /rename_files

Atomic batch rename. Re-keys file records in the database — changes the `path_hash` (and optionally the encrypted / plaintext path metadata) without re-uploading the ciphertext. Every rename in the batch is signed together with one Ed25519 signature.

Use this instead of "upload at new path + delete at old path" whenever the file content hasn't changed — it's atomic, cheaper, and preserves revision history.

## Authentication

`Authorization: Bearer <token>` matching `ss58_address` in the request body. See [`auth.md`](./auth.md). In addition, the server verifies an Ed25519 signature over a deterministic serialization of the renames — see *Signature scheme* below.

## Request

### Method and path

```
POST /rename_files
```

### Headers

```
Authorization: Bearer <token>
Content-Type:  application/json
```

### Body

```json
{
  "ss58_address": "5Grw...",
  "folder_hash":  "abc1234567890def",
  "renames": [
    {
      "old_path_hash":      [ /* 32 bytes */ ],
      "new_path_hash":      [ /* 32 bytes */ ],
      "new_encrypted_path": [ /* variable-length ciphertext */ ],
      "new_file_name":      "renamed.pdf",
      "new_relative_path":  "Documents/2026/renamed.pdf",
      "base_revision_id":   [ /* 32 bytes */ ]
    }
  ],
  "signature":   [ /* 64 bytes */ ],
  "signing_key": [ /* 32 bytes */ ]
}
```

| Field | Type | Notes |
|---|---|---|
| `ss58_address` | string | Owner's SS58 (accepts alias `user_id`) |
| `folder_hash` | 16-char hex | Folder whose files are being renamed |
| `renames[]` | array | One `SingleRename` per file to rename |
| `signature` | `[u8; 64]` | Ed25519 signature over the canonical text — see below |
| `signing_key` | `[u8; 32]` | Ed25519 public verifying key |

### `SingleRename` fields

| Field | Type | Notes |
|---|---|---|
| `old_path_hash` | `[u8; 32]` | Current `path_hash` of the file — must exist for this `(ss58, folder)` |
| `new_path_hash` | `[u8; 32]` | Target `path_hash` — must not already exist at this `(ss58, folder)` |
| `new_encrypted_path` | `Vec<u8>` | New ciphertext for the encrypted path. Empty is allowed. |
| `new_file_name` | `string \| null` | Plaintext filename for UI / progress |
| `new_relative_path` | `string \| null` | Plaintext relative path. Optional. |
| `base_revision_id` | `[u8; 32]` | Client's view of the file's current revision — used for optimistic concurrency per-rename |

### Signature scheme

The signature covers a deterministic text built from the sorted list of `(old → new)` hex hash pairs:

```
sorted_renames = renames.sort_by(r => r.old_path_hash)
pairs          = sorted_renames.map(r => "hex(old_path_hash):hex(new_path_hash)")
text           = "I hereby declare that I am renaming the following files on HCFS with the understanding that I have read and agree to the Terms of Service: " + pairs.join(",")
signature      = Ed25519::sign(signing_key, text.as_bytes())
```

The server computes the same text from the received `renames` array and rejects mismatches. Sorting is performed server-side by `old_path_hash` in lexicographic byte order before verification, so the client must also sort before signing.

## Response — success (200, partial-success)

Returns `200 Success` even when individual renames fail — inspect the `failures` array.

```json
{
  "Success": {
    "status":        "ok",
    "renamed_count": 2,
    "successes": [
      {
        "old_path_hash":   [ /* 32 bytes */ ],
        "new_path_hash":   [ /* 32 bytes */ ],
        "new_revision_id": [ /* 32 bytes — server-assigned */ ],
        "new_revision_seq": 5
      }
    ],
    "failures": [
      {
        "old_path_hash": [ /* 32 bytes */ ],
        "reason":        "revision_mismatch"
      }
    ]
  }
}
```

| Field | Meaning |
|---|---|
| `renamed_count` | Entries that succeeded (`successes.len()`) |
| `successes[]` | Per-rename result with the new server-assigned `revision_id` + `revision_seq` |
| `failures[]` | Per-rename failure with the offending `old_path_hash` and a `reason` code |

### Known failure `reason` codes

| `reason` | Meaning |
|---|---|
| `not_found` | No row at `old_path_hash` for this `(ss58, folder)` |
| `target_exists` | A row already exists at `new_path_hash` — pick a different target or delete the existing one first |
| `revision_mismatch` | `base_revision_id` does not match the current row's revision — re-fetch state and retry this entry |
| `database_error` | Transient per-entry DB failure |

## Response — errors (non-200)

Only request-level failures produce an `Error` envelope:

| Status | `error` code | Cause |
|---|---|---|
| `400` | `invalid_manifest` / `batch_too_large` | Body malformed, signature verification failed, or too many entries |
| `401` | `unauthorized` | Missing / bad bearer token |
| `403` | `forbidden` | Token resolves to a different SS58 than `ss58_address` |

## Example

```bash
curl -X POST "$SERVER/rename_files" \
  -H "Authorization: Bearer $SS58" \
  -H "Content-Type: application/json" \
  -d @rename_batch.json
```

(Constructing `rename_batch.json` requires computing the signature locally — the exact format is the canonical text above, signed with the user's Ed25519 key.)

## Notes

- The signature covers the `(old → new)` path-hash pairs only. `new_encrypted_path`, `new_file_name`, and `new_relative_path` are **not** signed — they are metadata the server accepts on trust once the rename pair check passes.
- Because each rename carries its own `base_revision_id`, entries in the same batch may be independently accepted or rejected. The rest of the batch is unaffected.
- For a simple "move one file" the batch is allowed to have exactly one entry. There is no single-rename variant.
- After a successful rename, the file's `revision_seq` increments and its `revision_id` changes. Store the `new_revision_id` from the response for the next write.
