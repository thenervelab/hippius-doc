---
id: integration-guide
title: HCFS Integration Guide
sidebar_label: Integration Guide
slug: /hcfs/integration-guide
---

# HCFS Integration Guide

How to talk to HCFS from your own application — desktop, browser, or anything else. This is a guide for *integrators*: people building a client on top of HCFS, not people changing HCFS itself.

---

## 1. Mental Model

HCFS is a sync system with a strict rule: **the server stores ciphertext and metadata, and never holds a key that can decrypt it.** Encryption, decryption, and signing all happen on your client. If a user loses their 24-word mnemonic, their data is unrecoverable — by design.

This shapes every integration choice. You are not building "a UI on top of a file API." You are building **a key-holding agent** that happens to talk to a file API. Three things follow:

- **Identity is a keypair, not a username.** A user is identified by an SS58 address derived (via Substrate's standard format, prefix `42`) from an Ed25519 public key, which is itself derived from a BIP-39 mnemonic. There is no password reset flow on the server side. One master mnemonic can produce many *folder-scoped* identities through deterministic derivation (§3.1, §6.1) — the same person can have several `ss58_address`/`folder_hash` namespaces on the same server.

- **The server is the source of truth, but only for ciphertext.** It tracks revisions, resolves write races (optimistic concurrency via `base_revision_id`), and serves any client who can present a valid token. Plaintext paths, filenames, and file content never reach it.

- **Sync is a three-tree merge, not a one-way push.** Every change is classified by comparing **local** (disk), **remote** (server), and **synced** (last reconciled state). This is what makes multi-device editing safe — and what makes "just upload everything on save" the wrong mental model.

Your job, regardless of stack, is: hold the keys, drive the merge, and stream ciphertext over HTTP. Everything else in this guide is detail on those three responsibilities.

---

## 2. Pick Your Integration Path

Four paths exist. Pick by the language you're already writing your UI in — not by what feels closest to HCFS.

| If your app is… | Use | Why |
|---|---|---|
| Tauri (Rust backend) or any native Rust UI (egui, slint) | **`hcfs-client` crate** | Direct access to `Drive`, the sync engine, and progress callbacks. Same code path as the reference CLI. |
| Electron, web-based Tauri frontend, or any browser/Node app | **`@hippius/hcfs-client-wasm`** *(crypto only)* + your own HTTP/sync layer | Real XChaCha20/Ed25519 in the renderer — no shipping a Rust binary alongside your JS. The WASM crate exposes primitives, **not** a full sync engine. |
| Python tooling, scripts, automation | **`hcfs-client` with `python` feature** (`pyo3` bindings) | One-line install via `maturin`, same `Drive` semantics. |
| Swift, Kotlin, Go, .NET, anything else | **Raw HTTP + crypto spec** (§6) | You re-implement the client side from the spec. Plan for it — this is real work, not a wrapper. |

### How to choose for a desktop app specifically

- **Default to Tauri + `hcfs-client`.** You get the full `Drive` API (init, unlock, stage, sync, conflict resolution) with one dependency. The reference CLI in `hcfs-client-cli/` is a complete working example — read it before you write anything new.
- **Choose Electron + WASM only if** you already have an Electron codebase, or your team can't ship Rust. Crypto runs in the renderer process; you still need a TypeScript layer for the HTTP client, the three-tree state, and persistence.
- **Avoid raw HTTP for desktop apps** unless you're targeting a platform with no Rust-to-binding story (e.g., a Swift-only macOS app where you want zero foreign code). Re-implementing BIP-39 → Ed25519 → XChaCha20 → manifest signing correctly is several weeks of work plus a test suite — most of which already exists in `hcfs-client`.

### What you're signing up for, regardless of path

Every path requires you to implement the same four responsibilities locally:

1. Mnemonic generation, encryption-at-rest, and password-gated unlock.
2. Per-file encryption with a fresh nonce, plus `path_hash` and `salted_hash` derivation.
3. Manifest signing (Ed25519) and Bearer token construction.
4. Three-tree state persistence between sync runs.

The Rust crate and Python bindings do all four for you. The WASM crate covers (1) and (2). Raw HTTP gives you none of it.

---

## 3. Core Concepts

Five concepts you must internalize. Skip these and the API will surprise you in production.

### 3.1 Identity is derived, not assigned

A user is a 24-word BIP-39 mnemonic. Everything else is derived deterministically. The desktop client supports a *per-folder* derivation so one master mnemonic produces multiple independent identities on the server:

```
master_mnemonic   →  master_seed (64 bytes, empty BIP-39 passphrase)
folder_label      →  folder_hash = hex(SHA-256(label))[..16]
                  →  folder_entropy = SHA-256(master_seed[..32] || label)
                  →  folder_mnemonic = BIP-39::from_entropy(folder_entropy)
                  →  folder_seed = folder_mnemonic.to_seed("")
                  →  ed25519 signing key  (folder_seed[..32])
                  →  xchacha20 encryption key (same 32 bytes — see §6.1)
                  →  ss58_address = SS58(public_key, prefix=42)
```

The bearer token presented to the server is the SS58 address (the desktop client falls back to it when no explicit token is configured — `hcfs-client/src/drive/init.rs:67-78`). The mnemonic is stored on-disk encrypted with AES-256-GCM, gated behind a user password (PBKDF2 in the desktop client; Argon2id in the WASM crate — §6.2). The server never sees the mnemonic, the seed, or the password.

### 3.2 Files are addressed by hash, not path

The server has no concept of `/Documents/taxes/2026.pdf`. It knows only:

- `path_hash = blake3(relative_path)` — the file's stable identifier across syncs
- `salted_hash = blake3(user_id || plaintext)` — used for content equality checks during sync (cheaper than re-hashing nonces)
- `file_id` — the hex form of `path_hash`, used in URLs

Renaming a file changes its `path_hash` and is therefore a delete-plus-create on the server, then promoted to a `RenameOp` by the client's pairing pass (§7.1). **Plaintext paths never leave the client.** If you want browseable folder structures (`/browse`, `/search_files`), you must explicitly upload encrypted relative paths via [`POST /register_relative_paths`](./api/register-relative-paths.md).

### 3.3 The three-tree sync model

Every sync compares three snapshots:

- **Local** — what's on disk right now (built by `scan_local_files`)
- **Remote** — what the server holds (paginated `GET /get_state/{ss58}/{folder_hash}`)
- **Synced** — the last reconciled state, persisted in `.hippius/sync_state.json`

The classification matrix (A, B, C are distinct content hashes; `-` is "not present"):

| Local | Remote | Synced | Action |
|:-:|:-:|:-:|---|
| A | A | A | Unchanged |
| A | - | - | LocalCreate → upload |
| - | A | - | RemoteCreate → download |
| A | A | B | LocalModify → upload |
| A | B | A | RemoteModify → download |
| - | A | A | LocalDelete → remote delete |
| A | - | A | RemoteDelete → local delete |
| A | B | C | Conflict (ModifyModify) |
| A | - | B | Conflict (ModifyDelete) |
| - | A | B | Conflict (DeleteModify) |
| A | B | - | Conflict (CreateCreate) |

You must persist the synced tree atomically — losing it means the next sync sees every file as a `LocalCreate` and re-uploads everything.

### 3.4 Server authority and optimistic concurrency

Uploads carry `base_revision_id` (the revision the client thought it was modifying). The server compares it to the current revision and rejects mismatches with `409 Conflict`. New files send `base_revision_id = null` and get rejected if a file at that `path_hash` already exists. The client handles `409` by re-fetching state, re-classifying, and surfacing a `Plan` conflict to the user.

### 3.5 `size_bytes` always means plaintext size

This trips up every integrator at least once:

| Where you see it | What it means |
|---|---|
| `FileMetadata.size_bytes`, manifest, DB row | **Plaintext** size |
| HTTP `Content-Length` on download | **Ciphertext** size (storage-backend reported) |
| HTTP `X-Size-Bytes` header on download | **Plaintext** size (use this for UI) |

Use `salted_hash`, not `size_bytes`, to decide whether two files have the same content.

---

## 4. Quick Starts

Each quick start is a minimum-viable wire-up — enough to confirm the path works. The reference CLI in `hcfs-client-cli/` is the canonical worked example; consult it before building anything elaborate.

### 4.1 Rust / Tauri (recommended for desktop)

Add the dependency from a path or git ref (no crates.io publish yet):

```toml
[dependencies]
hcfs-client = { git = "https://github.com/thenervelab/hcfs", package = "hcfs-client" }
tokio = { version = "1", features = ["full"] }
```

Wire a `Drive` into a Tauri command. The pattern is: build a `Drive`, attach config, unlock with the user's password, run the sync.

```rust
use hcfs_client::client::HcfsClientConfig;
use hcfs_client::drive::Drive;
use hcfs_client::sync::{SyncConflictResolution, SyncMode};
use std::path::PathBuf;

#[tauri::command]
async fn sync_folder(
    folder: PathBuf,
    password: String,
    server_url: String,
    ss58_address: String,
    bearer_token: String,
) -> Result<String, String> {
    let mut drive = Drive::new(&folder);

    let config = HcfsClientConfig {
        base_url: server_url,
        bearer_token,
        ss58_address,
        folder_hash: hcfs_client::drive::keys::folder_hash("default"),
        accept_invalid_certs: false,
        ..Default::default()
    };
    drive.set_config(config).map_err(|e| e.to_string())?;
    drive.unlock(&password).map_err(|e| e.to_string())?;

    // First-time only: drive.init(&password, None) to generate a mnemonic.
    // Returns the 24 words — show them to the user once, never persist plaintext.

    let outcome = drive
        .sync_with_resolver(SyncMode::NonInteractive, |_conflict| {
            // For a desktop app, queue conflicts to the UI thread instead.
            SyncConflictResolution::Skip
        })
        .await
        .map_err(|e| e.to_string())?;

    Ok(format!(
        "uploaded {}, downloaded {}, conflicts {}",
        outcome.files_uploaded, outcome.files_downloaded, outcome.conflicts_skipped
    ))
}
```

What's missing from this snippet — intentionally, to keep it under 30 lines — is progress callbacks via `Drive::set_progress_handlers`, `CancellationToken` wiring, and the conflict-resolution UX. All three are in `hcfs-client-cli/src/sync.rs`. Read that file before implementing your own.

### 4.2 TypeScript / Electron (WASM crypto + your HTTP)

`@hippius/hcfs-client-wasm` is published as a `wasm-pack --target web` module exposing crypto primitives only. You write the HTTP, sync, and state-persistence layers in TypeScript.

```bash
npm install @hippius/hcfs-client-wasm
```

A minimum encrypt-then-upload sketch (exports verified against `hcfs-client-wasm/src/lib.rs`):

```ts
import init, {
  derive_signing_key,        // (mnemonic) → SecretBytes (32-byte Ed25519 seed)
  derive_file_key,           // (master_mnemonic, folder_label) → SecretBytes (32-byte XChaCha20 key)
  compute_path_hash,         // (relative_path) → Uint8Array (BLAKE3, 32 bytes)
  compute_salted_hash,       // (ss58_address, plaintext) → Uint8Array (BLAKE3, 32 bytes)
  encrypt_for_upload,        // (file_key, plaintext) → EncryptedUpload { ciphertext, ciphertext_hash }
  sign_manifest_text,        // (signing_key, ciphertext_hash) → SignedManifest { signature, verifying_key }
} from "@hippius/hcfs-client-wasm";
import { generateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";

await init(); // load the .wasm

// One-time: generate a 24-word mnemonic in JS, then store it encrypted (Argon2id)
const mnemonic = generateMnemonic(wordlist, 256);

// Per upload:
const signingKey = derive_signing_key(mnemonic);              // SecretBytes
const fileKey    = derive_file_key(mnemonic, "default");      // SecretBytes (folder-scoped)
const plaintext  = await readFile("notes.md");                // Uint8Array

const encrypted = encrypt_for_upload(fileKey, plaintext);     // produces base_nonce-prefixed blob
const pathHash   = compute_path_hash("notes.md");
const saltedHash = compute_salted_hash(ss58Address, plaintext);

const signed = sign_manifest_text(signingKey, encrypted.ciphertext_hash);

const manifest = {
  ss58_address:     ss58Address,
  folder_hash:      folderHash,                  // 16-char hex of folder label, see §6.1
  ciphertext_hash:  encrypted.ciphertext_hash,   // BLAKE3 hex of ciphertext blob
  size_bytes:       plaintext.byteLength,        // plaintext length
  timestamp:        Math.floor(Date.now() / 1000),
  signature:        Array.from(signed.signature),       // [u8; 64]
  signing_key:      Array.from(signed.verifying_key),   // [u8; 32] — the public key
  path_hash:        Array.from(pathHash),
  salted_hash:      Array.from(saltedHash),
  revision_seq:     1,                           // strictly increasing per file
  base_revision_id: null,                        // null for new files
  encrypted_path:   [],                          // see api/register-relative-paths.md
  file_name:        "notes.md",
  relative_path:    "notes.md",
};

const form = new FormData();
form.append("manifest", JSON.stringify(manifest));
form.append("ciphertext", new Blob([encrypted.ciphertext]));
await fetch(`${serverUrl}/upload`, {
  method: "POST",
  headers: { Authorization: `Bearer ${ss58Address}` },
  body: form,
});
```

What you still owe yourself: persisting the encrypted mnemonic (the WASM crate exposes `argon2id_derive` and `open_mnemonic_blob` to help), building the three-tree state, paginating `/get_state`, and handling `409` conflicts. Treat this path as "I have a strong reason to avoid Rust"; otherwise prefer 4.1.

> The WASM `SecretBytes` / `SecretString` handles are zeroize-on-drop. Pass them between WASM functions directly rather than calling `.expose()` — once a buffer crosses into a JS `Uint8Array`, it cannot be reliably scrubbed.

### 4.3 Direct HTTP (any language)

Three calls get you a working read-only viewer:

```bash
# 1. List files in a folder
curl -H "Authorization: Bearer $SS58" \
     "$SERVER/get_state/$SS58/$FOLDER_HASH?offset=0&limit=1000"

# 2. Download a file (returns ciphertext + headers)
curl -H "Authorization: Bearer $SS58" \
     -o ciphertext.bin -D headers.txt \
     "$SERVER/download/$SS58/$FOLDER_HASH/$FILE_ID"

# 3. Decrypt locally with the encryption key + nonce from headers/manifest
#    (See §6 for the exact algorithm.)
```

Uploading from raw HTTP requires the full crypto stack from §6 — there is no shortcut.

---

## 5. REST API Reference

The full REST API lives in its own subdirectory — each endpoint has its own page with request shape, response shape, status codes, and a working `curl` example.

**Start here:** [`api/overview.md`](./api/overview.md) — base URL, prerequisites, and the grouped endpoint index.

Two pages every endpoint depends on:

- [`api/auth.md`](./api/auth.md) — the bearer-token model
- [`api/errors.md`](./api/errors.md) — the `NetworkResponse<T>` envelope, the error-code catalog, and the optimistic-concurrency rules that produce `Conflict`

A summary for orientation — follow the links for detail:

| Area | Pages |
|---|---|
| File lifecycle (HCFS native, end-to-end encrypted) | [`upload`](./api/upload.md) · [`download`](./api/download.md) · [`delete`](./api/delete.md) |
| File lifecycle (S3-compatible gateway, server-side) | [`s3-gateway`](./api/s3-gateway.md) |
| State and discovery | [`get-state`](./api/get-state.md) · [`browse`](./api/browse.md) · [`search-files`](./api/search-files.md) · [`register-relative-paths`](./api/register-relative-paths.md) |
| Folder lifecycle | [`folders`](./api/folders.md) |
| Rename | [`rename-files`](./api/rename-files.md) |
| Chunked / resumable upload | [`upload-session`](./api/upload-session.md) |

---

## 6. Cryptographic Spec

This section is for raw-HTTP integrators. If you are using `hcfs-client` or `hcfs-client-wasm`, the library does this for you — but read it anyway, because nothing about HCFS makes sense if you don't know what is encrypted, with what key, under what nonce.

### 6.1 Key derivation

```
master_mnemonic    : 24 BIP-39 words, generated client-side
folder_label       : utf-8 string, user-chosen (e.g., "default", "photos")

folder_entropy     = SHA-256( master_seed[..32] || folder_label )
folder_mnemonic    = BIP-39::from_entropy( folder_entropy )       // 24 words
folder_seed        = folder_mnemonic.to_seed("")                  // 64 bytes, empty passphrase
signing_key        = Ed25519::from_bytes( folder_seed[..32] )     // ed25519-dalek
encryption_key     = folder_seed[..32]                            // XChaCha20-Poly1305 key
ss58_address       = SS58( signing_key.public, prefix=42 )        // bittensor-substrate prefix
folder_hash        = hex( SHA-256(folder_label) )[..16]
```

Two notes that look wrong but are intentional:

- **Empty BIP-39 passphrase.** This is how the client guarantees that the same mnemonic recovers the same `ss58_address` on every device. Adding a passphrase would silently fork identities.
- **Same 32 bytes used for both signing and encryption.** Ed25519 only consumes the seed, never the public key, and XChaCha20-Poly1305 is a separate primitive. There is no known attack from key reuse across these two algorithms with this specific construction. Do not generalize this pattern.

### 6.2 Mnemonic-at-rest encryption

The desktop client stores `enc_mnemonic.json` in `.hippius/`:

```
salt           : 16 random bytes
key            = PBKDF2-HMAC-SHA256( password, salt, 600_000 iterations, 32 bytes out )
iv             : 12 random bytes
ciphertext+tag = AES-256-GCM::seal( key, iv, mnemonic_bytes, aad=empty )
file mode      : 0o600 on Unix
```

The legacy iteration count is 10_000 (`PBKDF2_LEGACY_ITERATIONS`); current is 600_000. New writes always use 600_000 and persist the count.

The WASM crate uses **Argon2id** with OWASP 2023 second-profile minimums (`MIN_ARGON2_MEMORY_KIB = 19456`, `MIN_ARGON2_TIME_COST = 2`, `MIN_ARGON2_PARALLELISM = 1`) for browser contexts where Argon2 is the modern default. The two storage formats are not interchangeable.

### 6.3 File encryption — wire format

The on-the-wire ciphertext is a chunked, framed format. Both `hcfs-client` and `hcfs-client-wasm` produce byte-identical blobs for the same key, plaintext, and `base_nonce`.

```
chunk_size      : 256 KiB plaintext (ENCRYPTION_CHUNK_SIZE in hcfs-client/src/crypto.rs)
base_nonce      : 24 random bytes (XChaCha20 nonce length, generated once per file)

[base_nonce: 24 bytes]
[chunk_count: u32 little-endian]
for each chunk i in 0..chunk_count:
    [chunk_len: u32 LE]   = ciphertext_bytes_len + 16 (Poly1305 auth tag)
    [ciphertext_bytes]
    [auth_tag: 16 bytes]
```

A per-chunk nonce is derived from the base nonce and the chunk index, so each chunk is encrypted under a unique nonce even though only one is stored on the wire:

```
chunk_nonce[..8]  = base_nonce[..8] XOR chunk_index.to_le_bytes()  (u64 little-endian)
chunk_nonce[8..]  = base_nonce[8..]
ciphertext_chunk  = XChaCha20-Poly1305::encrypt(key=file_key,
                                                nonce=chunk_nonce,
                                                aad=empty,
                                                plaintext=chunk_i)
```

A zero-byte file is encoded with `chunk_count=1` and a single empty-plaintext frame (still a 16-byte tag). The `ciphertext_hash` field of the manifest is `BLAKE3(entire blob).hex()`.

### 6.4 Hashes

```
path_hash      = BLAKE3( relative_path.utf8_bytes ) → 32 bytes
                 (hex form is the file_id used in URLs)

salted_hash    = BLAKE3( user_id.utf8_bytes || plaintext_bytes ) → 32 bytes
                 (used for content-equality checks during sync;
                  cheap to recompute, doesn't depend on the random nonce)
```

`user_id` here is the SS58 address.

### 6.5 Manifest schema and signing

Authoritative source: `hcfs-shared/src/network.rs::Manifest`.

```
ss58_address       : String                  (alias: "user_id" — server accepts either)
folder_hash        : String                  (16-char hex of folder label)
ciphertext_hash    : String                  (BLAKE3 hex of the ciphertext blob)
size_bytes         : u64                     (plaintext size)
timestamp          : i64                     (unix seconds, client-supplied)
signature          : [u8; 64]                (Ed25519 signature — see below)
signing_key        : [u8; 32]                (Ed25519 public verifying key)
path_hash          : [u8; 32]                (BLAKE3 of relative path)
salted_hash        : [u8; 32]                (BLAKE3(ss58_address || plaintext))
revision_seq       : u64                     (strictly > current; new files: 1)
base_revision_id   : Option<[u8; 32]>        (null for new files; required for OCC updates)
encrypted_path     : Vec<u8>                 (sealed relative path, see encrypt_relative_path)
file_name          : Option<String>          (plaintext filename, for download progress UI)
relative_path      : Option<String>          (plaintext relative path, for new-style routing)
```

`revision_id` is **not** a manifest field — the server assigns it on accept and returns it in `UploadResult`.

#### Signature scheme

The signature is **not** over the canonical JSON of the manifest. It is over a fixed-format Terms-of-Service declaration containing the ciphertext hash:

```
text = "I here by declare that the file with hash {ciphertext_hash} that i am uploading is in par with the ToS of the provider"
signature = Ed25519::sign(signing_key, text.as_bytes())
```

This is implemented as `Manifest::generate_text(ciphertext_hash)` in `hcfs-shared` and mirrored byte-for-byte by `manifest_tos_text` in `hcfs-client-wasm`. A cross-crate test pins the format — any drift breaks uploads server-wide. The string is intentionally not a configurable template.

The implication for integrators: signing only commits to the **ciphertext hash**. The other manifest fields (path hash, sizes, revision metadata) are bound by the server's revision check + `salted_hash` comparison during sync, not by the signature.

### 6.6 Multipart upload format

```
POST /upload
Content-Type: multipart/form-data; boundary=...

--boundary
Content-Disposition: form-data; name="manifest"
Content-Type: application/json

{ ...manifest JSON, signature included... }
--boundary
Content-Disposition: form-data; name="ciphertext"
Content-Type: application/octet-stream

<ciphertext_blob bytes>
--boundary--
```

Field order matters: the server peeks the **first** multipart field's name to route the request. For the HCFS native path it must be `manifest`; the S3-compatible gateway path expects `account_ss58` instead — see [`api/s3-gateway.md`](./api/s3-gateway.md).

---

## 7. Sync Protocol

The sync engine lives in `hcfs-client/src/sync/` and `hcfs-client/src/drive/sync_flow.rs`. The classification matrix is in §3.3; this section covers the execution loop and the failure modes a third-party client must handle.

### 7.1 The loop, end to end

```
1. scan_local_files()        → local: FileTree   (BLAKE3 path_hash + content)
2. fetch_remote_state()      → remote: FileTree  (paginated /get_state)
3. load synced from disk     → synced: FileTree  (.hippius/sync_state.json)
4. SyncPlan::build(local, remote, synced)
       → uploads, downloads, local_deletes, remote_deletes, conflicts
5. extract_renames()         → promote upload+delete pairs to RenameOps
       Tier 1: watcher-supplied hints (best, fast)
       Tier 2: content-hash pairing (fallback)
6. resolve conflicts via your callback (KeepLocal / AcceptRemote / KeepBoth / Skip)
7. execute concurrently:
       uploads + downloads (bounded, cancellable)
   then renames (POST /rename_files, batch)
   then serial local deletes, then remote deletes
8. fold successes into a new synced tree, atomic-write to disk
9. return SyncOutcome
```

If you re-implement this in another language, **persist the synced tree atomically** — write to a temp file, fsync, rename. Losing it forces a full re-upload because every local file looks like a `LocalCreate`. The Rust client also keeps a `.bak` of the previous synced tree.

### 7.2 Conflicts

Four types, surfaced via the resolver callback you pass to `Drive::sync_with_resolver`:

| Type | What happened |
|---|---|
| `ModifyModify` | Both sides changed the file to different contents |
| `ModifyDelete` | You modified locally, another device deleted |
| `DeleteModify` | You deleted locally, another device modified |
| `CreateCreate` | Same `path_hash`, two different first-time creations |

Four resolutions, all defined in `hcfs-client/src/sync/conflict.rs`:

| Resolution | Semantics |
|---|---|
| `KeepLocal` | Upload local, overwrite remote |
| `AcceptRemote` | Download remote, overwrite local |
| `KeepBoth` | Rename local to `…<basename>.conflict<ext>`, then download remote |
| `Skip` | Leave both sides untouched this run; surface again next sync |

For a desktop app, queue conflicts to the UI thread rather than answering them inside the resolver closure — the resolver runs on the sync task and blocking it stalls the whole run.

### 7.3 Server-side optimistic concurrency (what you'll see)

Two failure modes are normal, not bugs:

- **`409 conflict` on upload** — `base_revision_id` did not match the server's current revision. The server includes the current `revision_id` in the response. Re-fetch state, re-classify, surface as a `ModifyModify` conflict if the local content also changed.
- **`400 stale_sequence`** — your `revision_seq` is ≤ the current. Bump `revision_seq` to `current_seq + 1` and retry.

### 7.4 Retries and resumable uploads

Small files: just retry the multipart upload. Large files: open an `/upload/session`, push chunks in parallel up to 16 MiB each, finalize. Sessions survive process restarts and can be resumed via `/upload/session/{id}/status`.

The Rust client switches to chunked sessions automatically above an internal threshold (`hcfs-client/src/client/chunked.rs`); a third-party client should mirror that policy or accept slow re-uploads on flaky networks.

---

## 8. Production Notes

What bites people in week three.

### 8.1 Where to put the encrypted mnemonic

| Platform | Recommended store |
|---|---|
| Tauri / native macOS | macOS Keychain (`security` / `tauri-plugin-keyring`) |
| Tauri / native Windows | DPAPI via `tauri-plugin-keyring` or Windows Credential Manager |
| Tauri / native Linux | Secret Service (libsecret); fall back to `enc_mnemonic.json` (0o600) for headless servers |
| Electron | `safeStorage` (uses Keychain / DPAPI under the hood) |
| Browser-only | Argon2id-protected blob in IndexedDB, unlocked in-memory for the session only |

The Rust client's default — `enc_mnemonic.json` with mode `0o600` in the config directory — is acceptable on a single-user developer machine and not acceptable on a shared one.

### 8.2 Background sync

- Use `CancellationToken` (re-exported from `hcfs-client::CancellationToken`) on every sync run. Tie it to the user's "pause sync" toggle, app-quit, and laptop-sleep events.
- Don't spawn one sync task per file change — debounce. The CLI runs full passes; the desktop reference app uses a watcher to feed Tier-1 rename hints into the next pass.
- Store every spawned `JoinHandle` and await on shutdown; dropped handles silently swallow panics.

### 8.3 Conflict UX

- Show the user *what changed* (size, modified time, filename), not the conflict-type enum name.
- Default the action to `KeepBoth` for `ModifyModify` and `CreateCreate` — it never destroys data.
- For `ModifyDelete` / `DeleteModify`, default to `KeepLocal` / `AcceptRemote` respectively (favor whichever side made the most recent edit).
- Persist unresolved conflicts so the user can come back to them; `Skip` is a feature, not an error.

### 8.4 What the server will not do for you

- **No client-side flow control.** Your client is responsible for bounding its own concurrency so it doesn't starve itself or flood a slow network. The Rust client uses an internal cap; if you roll your own, pick 8–16 concurrent uploads and tune from there.
- **No background re-encryption.** Rotating an encryption key means decrypting every file with the old key and re-uploading it under the new one. Plan this UX explicitly.
- **No password reset.** Lose the mnemonic, lose the data. Build mnemonic backup into onboarding, not into "advanced settings."

### 8.5 Common pitfalls

| Pitfall | Cause | Fix |
|---|---|---|
| Every sync re-uploads all files | Lost / corrupt `sync_state.json` | Atomic write + `.bak`; never edit by hand |
| `409` storms after a clock change | Multiple devices racing; one wins, others retry | Add jitter; trust the conflict resolver |
| Plaintext path leaks to logs | Logging the relative path before hashing | Log `path_hash` only; never `relative_path` |
| Browse / search show empty names | Forgot `POST /register_relative_paths` after upload | Register encrypted relative paths in the same pass as upload |
| `Content-Length` ≠ file size in UI | Showing ciphertext bytes | Use `X-Size-Bytes` for UI, `Content-Length` only for HTTP progress |
| `Drive::unlock` fails after password change | Old `enc_mnemonic.json` used legacy iterations | Re-encrypt on first successful unlock |
