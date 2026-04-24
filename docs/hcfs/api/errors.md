---
id: errors
title: Errors and Response Envelope
sidebar_label: Errors
slug: /hcfs/api/errors
---

# Errors and Response Envelope

Every HCFS JSON response is wrapped in a `NetworkResponse<T>` envelope with exactly three variants: `Success`, `Conflict`, and `Error`. The variant name is the outer JSON key.

## Envelope

### Success

```json
{ "Success": { /* endpoint-specific payload, see individual endpoint pages */ } }
```

### Error

```json
{
  "Error": {
    "error":   "<machine-readable code>",
    "message": "<human-readable explanation>"
  }
}
```

The `error` field is a stable string the client can switch on. `message` is intended for logs and UI; wording is not part of the API contract and may change.

### Conflict

Only returned by write endpoints when an optimistic-concurrency check fails. Carries the current server state so the client can re-reconcile without re-fetching:

```json
{
  "Conflict": {
    "error":                "conflict",
    "message":              "...",
    "current_revision_id":  [/* 32 bytes */],
    "current_revision_seq": 42
  }
}
```

## Status code catalog

| Status | Codes | Meaning |
|---|---|---|
| `400` | `invalid_manifest`, `stale_sequence`, `invalid_file_id`, `invalid_user_id`, `batch_too_large`, `q_too_long`, `invalid_file_type` | Malformed request, payload fails validation, revision_seq ≤ current, or a batch exceeded its entry / body cap |
| `401` | `unauthorized` | Missing, malformed, or rejected bearer token |
| `403` | `forbidden` | Token valid but resolved SS58 does not match the URL path segment |
| `404` | `not_found` | No such file, folder, or session for this user |
| `409` | `conflict`, `upload_conflict` | `base_revision_id` in the request does not match the current server revision — re-fetch state and retry |
| `500` | `database_error`, `storage_inconsistency` | Server-side failure; safe to retry with backoff |

Endpoint pages list any additional codes specific to their handler.

## Optimistic concurrency (409 / `Conflict`)

HCFS uses optimistic concurrency on every write that modifies a file: the client sends the `base_revision_id` it believed was current. The server compares it to the row's current revision and rejects mismatches with `409 Conflict`, returning the authoritative state in the envelope.

On `Conflict`:

1. Update the local representation with `current_revision_id` / `current_revision_seq`.
2. Re-run the sync classification to decide whether the local change and remote change can be merged, or whether the user must pick a winner.
3. Retry the write with the new `base_revision_id`.

New files send `base_revision_id = null`. If a file already exists at that `path_hash`, the server returns `409 conflict` — treat it as an unexpected-existing-file case and sync before retrying.

## Per-entry partial success

A few endpoints (e.g. [`/register_relative_paths`](./register-relative-paths.md), [`/rename_files`](./rename-files.md)) always return `200 Success` even when individual entries fail. Those endpoints include per-entry `errors` / `failures` arrays inside their success payload. Clients **must** inspect those arrays — HTTP status alone does not convey per-entry outcomes.

## Client policy recommendations

- Treat `401` / `403` / `404` as terminal; fix the request.
- Treat `409` as an expected sync event, not an error. Handle as above.
- Treat `500` as transient; back off and retry up to a small, bounded number of times.
- Treat unknown `error` codes as terminal and surface to logs — they indicate a server upgrade the client hasn't been updated for.
