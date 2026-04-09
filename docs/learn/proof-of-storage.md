---
sidebar_position: 6
description: How Hippius uses Plonky3-based zero-knowledge proofs to verify that miners actually store your data.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';

# Proof of Storage (Ziggy)

Hippius uses a zero-knowledge proof system called **Ziggy** to verify that miners actually hold the data they claim to store. It allows miners to cryptographically prove possession of specific data chunks without revealing the data itself.

## The short version

<Ordered>
  <li>When a file is uploaded, each shard is hashed into a <strong>Merkle tree</strong> and a commitment (the tree root) is stored</li>
  <li>A <strong>Warden</strong> periodically challenges miners by asking them to prove they hold specific random chunks</li>
  <li>The miner generates a <strong>STARK proof</strong> that their chunks match the original commitment</li>
  <li>The Warden verifies the proof — if it fails, the miner's reputation is penalized</li>
</Ordered>

No data is ever revealed during this process. The proof is purely mathematical.

## Cryptographic stack

Ziggy is built on three layers:

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Field arithmetic** | BabyBear (p = 2³¹ - 2²⁷ + 1) | Fast finite-field math for proof generation |
| **Hashing** | Poseidon2 (width=16, 8 digest elements) | ZK-friendly hash function for Merkle trees |
| **Proof system** | Plonky3 STARK with FRI | Generates and verifies succinct proofs |

## How it works

### 1. Commitment phase (upload)

When a shard is stored on a miner, the system generates a **commitment** — a fingerprint of the data:

<Ordered>
  <li>The shard is split into <strong>1 KB chunks</strong></li>
  <li>Each chunk is hashed using <strong>Poseidon2</strong></li>
  <li>The hashes are assembled into a <strong>binary Merkle tree</strong></li>
  <li>The resulting commitment contains the <strong>merkle_root</strong>, <strong>chunk_count</strong>, and <strong>shard_hash</strong></li>
</Ordered>

The Merkle root is sent to the Warden. The miner keeps the full tree cached for fast proof generation.

### 2. Challenge phase (audit)

Wardens run an audit loop (every 30 seconds) that selects shards round-robin and generates challenges:

<Ordered>
  <li>A deterministic <strong>nonce</strong> is derived from <code>BLAKE3(shard_hash || block_hash || warden_id)</code></li>
  <li>The nonce seeds a PRNG that picks <strong>4 random chunk indices</strong></li>
  <li>The challenge is sent to the miner with a <strong>60-second deadline</strong></li>
</Ordered>

The deterministic nonce ensures challenges are verifiable and non-repeatable.

### 3. Prove phase (miner response)

The miner receives the challenge and:

<Ordered>
  <li>Reads the shard from disk</li>
  <li>Retrieves the cached Merkle tree (or rebuilds it)</li>
  <li>Extracts the challenged chunks and generates Merkle proofs for each</li>
  <li>Produces a STARK proof that the chunks match the committed Merkle root</li>
  <li>Sends the proof back to the Warden</li>
</Ordered>

### 4. Verify phase (Warden)

The Warden verifies:

<Ordered>
  <li>The Merkle root in the proof matches the stored commitment</li>
  <li>The chunk indices match the original challenge</li>
  <li>The challenge hasn't expired</li>
  <li>All Merkle proofs are valid</li>
  <li>The STARK proof is sound</li>
</Ordered>

## Audit results and reputation

| Result | Meaning | Reputation penalty |
|--------|---------|-------------------|
| **Passed** | Proof verified successfully | None |
| **Failed** | Proof verification failed | +1.0 |
| **Timeout** | No response within 60 seconds | +0.3 |
| **Invalid Proof** | Malformed or corrupt proof | +1.0 |

<Unordered>
  <li>At a reputation score of <strong>≥ 3.0</strong>, a miner is banned from the cluster</li>
  <li>Successful proofs gradually recover reputation (+0.05 decay after 10 consecutive passes)</li>
</Unordered>

## Security properties

| Property | Mechanism |
|----------|-----------|
| **Soundness** | STARK proofs guarantee the prover knows the chunk data at challenged indices |
| **Freshness** | Nonce + expiry + block hash prevent replay attacks |
| **Privacy** | Shard contents are never revealed — only mathematical possession is proven |
| **Determinism** | Same challenge inputs always produce the same indices, making audits verifiable |
