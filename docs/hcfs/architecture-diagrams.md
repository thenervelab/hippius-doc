---
id: architecture-diagrams
title: HCFS Architecture Diagrams
sidebar_label: Architecture Diagrams
slug: /hcfs/architecture-diagrams
---

# HCFS Architecture Diagrams

Three views of the HCFS system, each rendered as a standalone SVG. Click through for a crisp, zoomable render.

| # | Diagram | What it shows |
|---|---------|---------------|
| 1 | [Overall architecture](/img/hcfs/diagrams/01-overall-architecture.svg) | Both client protocols (HCFS native + S3-compatible gateway), the axum server, and the Arion storage plane in one picture |
| 2 | [Server ingestion (HCFS vs S3 gateway)](/img/hcfs/diagrams/02-server-ingestion.svg) | Side-by-side lanes of the two `/upload` paths, from request shape to FileRecord |
| 3 | [Sync engine (three-tree)](/img/hcfs/diagrams/03-sync-engine.svg) | Input trees → `SyncPlan::build` → execution → outcome, with the full classification matrix |

---

## 1 · Overall architecture

![HCFS overall architecture](/img/hcfs/diagrams/01-overall-architecture.svg)

Native HCFS clients and S3-compatible gateway clients both terminate at the same axum server. The server peeks the first multipart field of `/upload` to dispatch. All ciphertext + metadata converges on the Arion storage gateway and a PostgreSQL row in `file_records`. Billing pushes run as fire-and-forget Tokio tasks.

Sources: `hcfs-server/src/handlers/upload.rs`, `hcfs-server/src/state.rs`, `hcfs-server/src/storage.rs`.

---

## 2 · Server ingestion — HCFS vs S3 gateway

![Server ingestion](/img/hcfs/diagrams/02-server-ingestion.svg)

Both clients hit `POST /upload`. The first multipart field decides the path:

- **`"manifest"` → `handle_hcfs_upload`** — signed manifest, client-side encryption, `path_hash` and `salted_hash` computed on the client. Server authorizes with `authorize_hcfs_upload`, checks revision CAS, streams the ciphertext field to storage.
- **`"account_ss58"` → `handle_s3_upload`** — plain multipart with a cleartext filename. Server authorizes with `authorize_s3_upload` (token SS58 must match account), streams the file to storage, then `build_s3_file_record` derives `path_hash` from the filename and `persist_s3_record` writes the row.

After the handler split, both paths converge on the shared `StorageBackend.upload` + `upsert_file_checked` + async billing tail. Download URLs differ too: HCFS uses `/download/{ss58}/{folder_hash}/{file_id}`; S3 gateway clients use `/download/{ss58}/{file_id}` (see `download_no_folder` in `hcfs-server/src/handlers/file.rs`).

Sources: `hcfs-server/src/handlers/upload.rs`, `hcfs-server/src/handlers/helpers.rs`, `hcfs-server/src/storage.rs`, `hcfs-server/src/database.rs`.

---

## 3 · Sync engine (three-tree)

![Sync engine](/img/hcfs/diagrams/03-sync-engine.svg)

`hcfs-client` keeps three `FileTree`s — **local** (scanned from disk), **remote** (fetched via `HcfsClient::get_state`), and **synced** (last known reconciled state, persisted in `.hippius/sync_state.json`). `SyncPlan::build` classifies every `FileId` via the matrix in the diagram and sorts it into action buckets. A second pass, `extract_renames`, promotes matching upload/delete pairs into `RenameOp`s using Tier-1 watcher hints first, then Tier-2 content-hash pairing.

Execution is driven by `Drive::execute_sync_plan`:

1. Resolve any conflicts via the caller-supplied `conflict_resolver` callback (`KeepLocal`, `AcceptRemote`, `KeepBoth`, `Skip`).
2. Run uploads and downloads concurrently (bounded; cancellable via `CancellationToken`).
3. Run renames (batch `POST /rename_files`), then serial local/remote deletes.
4. Fold successes into a new `synced` tree, persist atomically, and hand the `SyncOutcome` back to `SyncRunner` for activity-log and health tracking.

Sources: `hcfs-client/src/sync/plan.rs`, `hcfs-client/src/sync/conflict.rs`, `hcfs-client/src/sync/rename.rs`, `hcfs-client/src/drive/sync_flow.rs`, `hcfs-client/src/engine/runner.rs`.

---

## Editing the diagrams

These are hand-authored SVG files — open them in any editor (VS Code renders them inline) or a vector tool like Figma/Inkscape. The styling is centralized in each file's `<defs><style>` block:

- `--fill` families: `#eff6ff` (HCFS/client trust), `#ecfeff` (S3 gateway ingress), `#fff7ed` (server), `#f5f3ff` (Arion storage), `#fee2e2` (conflicts).
- Arrows: solid `#374151` for synchronous flow, dashed `#7c3aed` for fire-and-forget or async side effects.
- Fonts use system stacks so GitHub / browsers render consistently without external assets.

If you regenerate these from another source (draw.io, D2, etc.), keep the filenames stable so the links above don't break.
