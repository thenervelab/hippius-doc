# Arion Pallet

The Arion pallet (`pallet-arion`) is a Substrate runtime module that manages the on-chain state for Hippius's distributed storage network. It provides CRUSH map placement, miner registration, proof-of-storage attestations, and reputation-based weight calculations.

## Overview

The Arion pallet serves as the on-chain coordination layer for the Hippius storage network, enabling:

- **Deterministic data placement** via CRUSH (Controlled Replication Under Scalable Hashing)
- **Miner registration** with economic incentives and Sybil resistance
- **Proof-of-storage attestations** submitted by warden nodes
- **Reputation-based weight calculations** for miners and families
- **Third-party verifiability** of network state and audit results

## Key Concepts

### CRUSH Map

The CRUSH map is a deterministic placement algorithm that maps data to storage nodes. The pallet stores:

- **Epoch**: Monotonically increasing version of the CRUSH map
- **Miners**: List of registered miners with their endpoints and weights
- **Parameters**: Configuration like placement group count, erasure coding parameters (k, m)

Each epoch transition publishes a new immutable CRUSH map that validators and clients use for data placement.

### Miner Registration

Miners must register on-chain before joining the network:

- **Family Account**: The main account that represents a storage provider
- **Child Accounts**: Individual miner nodes under a family (proxy relationship)
- **Node ID**: Ed25519 public key that identifies each miner node
- **Economic Deposits**: Anti-Sybil mechanism with adaptive pricing

#### Registration Economics

- **First child free**: Each family gets one free miner registration
- **Adaptive pricing**: After the free slot, a global deposit doubles with each registration
- **Lazy decay**: Deposit halves after a configurable period of no registrations
- **Unbonding period**: Deposits are locked after deregistration

### Proof-of-Storage Attestations

Wardens (audit nodes) periodically challenge miners to prove they're storing data:

- **Challenge**: Warden sends a random seed to miner
- **Response**: Miner provides merkle proof of storage
- **Attestation**: Warden signs the audit result (Passed/Failed/Timeout/InvalidProof)
- **On-chain submission**: Attestations are submitted in batches with signature verification

Attestations are used to calculate miner reputation and can trigger penalties for storage failures.

### Weight System

The pallet implements a reputation-based weight system:

- **Node weights**: Calculated from bandwidth, storage, uptime, and integrity
- **Family weights**: Aggregated from top-N node weights with rank decay
- **Smoothing**: Exponential moving average (EMA) to prevent volatility
- **Newcomer grace**: Floor weight applied to new families during initial period

Weights determine miner rewards and influence data placement decisions.

## Core Features

### 1. CRUSH Map Management

Submit new CRUSH maps for each epoch transition:

```rust
submit_crush_map(
    epoch: u64,
    params: CrushParams,
    miners: Vec<MinerRecord>
)
```

- Enforces epoch monotonicity (no regressions)
- Validates miner list is sorted by UID
- Optionally enforces miners are registered on-chain
- Stores commitment hash for verification

### 2. Miner Registration & Lifecycle

#### Register a Child Node

```rust
register_child(
    family: AccountId,
    child: AccountId,
    node_id: [u8; 32],
    node_sig: [u8; 64]
)
```

Requirements:
- Family must be registered in `pallet-registration`
- Child must be a proxy of family in `pallet-proxy`
- Node signature over `(domain, family, child, node_id, nonce)`
- Deposit requirement (free for first child, adaptive pricing after)

#### Deregister a Child Node

```rust
deregister_child(child: AccountId)
```

- Moves child to `Unbonding` status
- Releases node ID (with cooldown)
- Deposit remains reserved until `claim_unbonded`

#### Claim Unbonded Deposit

```rust
claim_unbonded(child: AccountId)
```

- Available after unbonding period expires
- Unreserves deposit back to family account

### 3. Attestation System

#### Submit Attestations

```rust
submit_attestations(
    bucket: u32,
    attestations: Vec<AttestationRecord>
)
```

Each attestation includes:
- Shard hash (BLAKE3)
- Miner UID
- Audit result (Passed/Failed/Timeout/InvalidProof)
- Challenge seed and timing information
- Warden public key
- Ed25519 signature (verified on-chain)

#### Attestation Commitment

For third-party verification, the pallet stores attestation commitments:

```rust
submit_attestation_commitment(
    epoch: u64,
    arion_content_hash: [u8; 32],
    attestation_merkle_root: [u8; 32],
    warden_pubkey_merkle_root: [u8; 32],
    attestation_count: u32
)
```

Third parties can:
1. Query commitment from chain
2. Download full bundle from Arion using content hash
3. Verify bundle integrity
4. Verify individual attestation signatures

#### Warden Registration

Only registered wardens can submit attestations:

```rust
register_warden(warden_pubkey: [u8; 32])    // Admin only
deregister_warden(warden_pubkey: [u8; 32])  // Admin only
```

### 4. Weight & Reputation System

#### Submit Node Quality Metrics

```rust
submit_node_quality(
    bucket: u32,
    updates: Vec<(AccountId, NodeQuality)>
)
```

Where `NodeQuality` includes:
- `shard_data_bytes`: Total bytes stored
- `bandwidth_bytes`: Bytes served in reporting window
- `uptime_permille`: Availability (0-1000)
- `strikes`: Penalty counter
- `integrity_fails`: Failed integrity checks

The pallet deterministically computes node weights using:
- Concave scoring (log2) to prevent "rich get richer"
- Weighted combination of bandwidth and storage
- Uptime multiplier
- Strike and integrity penalties

Family weights are then computed by:
- Sorting nodes by weight (descending)
- Taking top-N nodes
- Applying rank decay (each rank contributes less)
- Smoothing with EMA
- Clamping maximum delta per bucket

### 5. Stats Aggregation

```rust
submit_miner_stats(
    bucket: u32,
    updates: Vec<MinerStatsUpdate>,
    network_totals: Option<NetworkTotals>
)
```

Periodic stats updates for monitoring and analytics:
- Per-miner shard counts and bytes
- Network-wide totals
- Last-seen timestamps

## Storage Items

### CRUSH Map State

| Storage | Type | Description |
|---------|------|-------------|
| `CurrentEpoch` | `u64` | Latest epoch number |
| `EpochParams` | `Map<u64, CrushParams>` | CRUSH parameters per epoch |
| `EpochMiners` | `Map<u64, Vec<MinerRecord>>` | Miner list per epoch |
| `EpochRoot` | `Map<u64, H256>` | Commitment hash per epoch |

### Registration State

| Storage | Type | Description |
|---------|------|-------------|
| `ChildRegistrations` | `Map<AccountId, ChildRegistration>` | Active/unbonding children |
| `NodeIdToChild` | `Map<[u8; 32], AccountId>` | Node ID lookup |
| `FamilyChildren` | `Map<AccountId, Vec<AccountId>>` | Children per family |
| `GlobalNextDeposit` | `Balance` | Next registration cost |
| `FamilyCount` | `u32` | Total families with registrations |
| `TotalActiveChildren` | `u32` | Total active miners |

### Attestation State

| Storage | Type | Description |
|---------|------|-------------|
| `AttestationsByBucket` | `Map<u32, Vec<AttestationRecord>>` | Attestations per bucket |
| `EpochAttestationCommitments` | `Map<u64, EpochAttestationCommitment>` | Commitment per epoch |
| `RegisteredWardens` | `Map<[u8; 32], WardenInfo>` | Authorized wardens |
| `CurrentAttestationBucket` | `u32` | Latest bucket |

### Weight State

| Storage | Type | Description |
|---------|------|-------------|
| `NodeWeightByChild` | `Map<AccountId, u16>` | Current node weight |
| `NodeQualityByChild` | `Map<AccountId, NodeQuality>` | Latest quality metrics |
| `FamilyWeight` | `Map<AccountId, u16>` | Smoothed family weight |
| `FamilyWeightRaw` | `Map<AccountId, u16>` | Unsmoothed family weight |
| `CurrentWeightBucket` | `u32` | Latest weight bucket |

## Events

```rust
// CRUSH Map
CrushMapPublished { epoch, miners, root }

// Registration
ChildRegistered { family, child, node_id, deposit }
ChildDeregistered { family, child, node_id, unbonding_end, cooldown_end }
ChildUnbonded { family, child, node_id, amount }

// Attestations
AttestationsSubmitted { bucket, count }
AttestationCommitmentSubmitted { epoch, attestation_count, ... }
WardenRegistered { warden_pubkey, registered_at }
WardenDeregistered { warden_pubkey, deregistered_at }

// Weights
NodeWeightsUpdated { bucket, updates }
FamilyWeightsComputed { bucket, families }
MinerStatsUpdated { bucket, updates }

// Admin
LockupEnabledSet { enabled }
BaseChildDepositSet { deposit }
```

## Configuration Parameters

### Economic Parameters

| Parameter | Description | Recommended |
|-----------|-------------|-------------|
| `BaseChildDeposit` | Floor for adaptive deposit | 100 HIPP |
| `GlobalDepositHalvingPeriodBlocks` | Decay period for deposits | 14,400 (24h) |
| `UnbondingPeriodBlocks` | Lock period after deregistration | 100,800 (7 days) |
| `UnregisterCooldownBlocks` | Re-registration cooldown | 28,800 (48h) |

### Capacity Limits

| Parameter | Description | Recommended |
|-----------|-------------|-------------|
| `MaxFamilies` | Total families allowed | 256 |
| `MaxChildrenTotal` | Total miners allowed | 2,048 |
| `MaxChildrenPerFamily` | Miners per family | 32 |
| `MaxMiners` | Miners per CRUSH map | 2,048 |

### Weight Calculation

| Parameter | Description | Recommended |
|-----------|-------------|-------------|
| `NodeBandwidthWeightPermille` | Bandwidth contribution | 700 (70%) |
| `NodeStorageWeightPermille` | Storage contribution | 300 (30%) |
| `NodeScoreScale` | Score multiplier | 512 |
| `StrikePenalty` | Weight penalty per strike | 100 |
| `IntegrityFailPenalty` | Weight penalty per fail | 50 |

### Family Weight Smoothing

| Parameter | Description | Recommended |
|-----------|-------------|-------------|
| `FamilyTopN` | Nodes counted per family | 8 |
| `FamilyRankDecayPermille` | Rank decay factor | 800 (0.8x) |
| `FamilyWeightEmaAlphaPermille` | EMA smoothing | 300 (30% new) |
| `MaxFamilyWeightDeltaPerBucket` | Max change per bucket | 500 |
| `NewcomerGraceBuckets` | Grace period buckets | 100 |
| `NewcomerFloorWeight` | Floor during grace | 100 |

### Attestation Settings

| Parameter | Description | Recommended |
|-----------|-------------|-------------|
| `MaxAttestations` | Attestations per submission | 1,000 |
| `AttestationRetentionBuckets` | Buckets to keep before pruning | 1,000 |

## Admin Operations

### Enable/Disable Lockup

```rust
set_lockup_enabled(enabled: bool)
```

Controls whether deposits are required for registration. When disabled:
- No deposits are reserved
- Unbonding is immediate
- Useful for testnets or initial rollout

### Set Base Deposit

```rust
set_base_child_deposit(deposit: Balance)
```

Adjust the floor price for miner registration. Global deposit never falls below this value.

### Manage Wardens

```rust
register_warden(warden_pubkey: [u8; 32])
deregister_warden(warden_pubkey: [u8; 32])
```

Add or remove authorized wardens that can submit attestations.

## Security Considerations

### Signature Verification

The pallet performs on-chain Ed25519 signature verification for:

1. **Miner registration**: Proves ownership of node ID keypair
2. **Attestations**: Proves audit results from authorized wardens

Signatures use domain-separated messages to prevent cross-context replay attacks.

### Anti-Sybil Mechanisms

Multiple layers prevent Sybil attacks:

1. **Family registration**: Must be registered in `pallet-registration`
2. **Proxy verification**: Child must be authorized proxy of family
3. **Adaptive deposits**: Cost increases with network usage
4. **Cooldown periods**: Prevent rapid deregistration/reregistration
5. **Capacity limits**: Hard caps on total miners and per-family miners

### Replay Protection

- **Node ID nonce**: Incremented on each registration/deregistration
- **Cooldown tombstones**: Prevent immediate reuse of accounts/node IDs

### Weight Calculation Safety

- **Concave scoring**: Log2 prevents runaway rewards
- **Capped values**: Max node weight, max family weight
- **Delta limits**: Prevents sudden weight spikes
- **EMA smoothing**: Reduces impact of transient fluctuations
- **Top-N limit**: Prevents infinite-children attacks

## Integration Guide

### Runtime Configuration

```rust
impl pallet_arion::Config for Runtime {
    type RuntimeEvent = RuntimeEvent;
    type ArionAdminOrigin = EnsureRoot<AccountId>;
    type MapAuthorityOrigin = EnsureValidatorSet<Self>;
    type StatsAuthorityOrigin = EnsureValidatorSet<Self>;
    type AttestationAuthorityOrigin = EnsureWardenOrValidator<Self>;
    type WeightAuthorityOrigin = EnsureValidatorSet<Self>;
    
    type DepositCurrency = Balances;
    type FamilyRegistry = PalletRegistration;
    type ProxyVerifier = PalletProxy;
    
    // Economic parameters
    type BaseChildDeposit = ConstU128<{ 100 * HIPP }>;
    type GlobalDepositHalvingPeriodBlocks = ConstU32<14_400>;
    type UnbondingPeriodBlocks = ConstU32<100_800>;
    type UnregisterCooldownBlocks = ConstU32<28_800>;
    
    // Capacity limits
    type MaxFamilies = ConstU32<256>;
    type MaxChildrenTotal = ConstU32<2_048>;
    type MaxChildrenPerFamily = ConstU32<32>;
    type MaxMiners = ConstU32<2_048>;
    
    // ... other parameters
}
```

### Off-Chain Integration

#### Validator Service

1. Monitor chain state and miner registrations
2. Build CRUSH map each epoch
3. Submit via `submit_crush_map`
4. Collect quality metrics from miners
5. Submit via `submit_node_quality`

#### Warden Service

1. Sample random shards for auditing
2. Challenge miners with random seeds
3. Verify merkle proofs from miners
4. Sign attestations with Ed25519 keypair
5. Submit via chain-submitter service

#### Chain Submitter

1. Aggregate attestations from wardens
2. Submit batches via `submit_attestations`
3. Create attestation bundles (SCALE-encoded)
4. Upload bundles to Arion storage
5. Submit commitments via `submit_attestation_commitment`

#### Miner Registration Flow

1. Family registers in `pallet-registration`
2. Family creates child account
3. Family adds child as proxy in `pallet-proxy`
4. Miner generates Ed25519 keypair (node ID)
5. Miner signs registration message
6. Family calls `register_child` (first free, then paid)
7. Miner joins network with node ID

## Usage Examples

### Register First Miner (Free)

```rust
// 1. Ensure family is registered
pallet_registration::register_owner_node(family_origin, ...)?;

// 2. Add proxy relationship
pallet_proxy::add_proxy(family_origin, child_account, ProxyType::NonTransfer, 0)?;

// 3. Register child (off-chain: sign with node keypair)
let message = arion::registration_message(&family, &child, &node_id, nonce);
let signature = node_keypair.sign(&message);

// 4. Submit registration (on-chain)
pallet_arion::register_child(
    family_origin,
    family,
    child,
    node_id,
    signature
)?;
// No deposit required for first child
```

### Register Additional Miner (Paid)

```rust
// Same process, but now requires deposit
pallet_arion::register_child(
    family_origin,
    family,
    child2,
    node_id2,
    signature2
)?;
// Deposit = current GlobalNextDeposit (then doubles)
```

### Deregister Miner

```rust
// 1. Deregister (begins unbonding)
pallet_arion::deregister_child(family_origin, child)?;
// Status: Active -> Unbonding
// Cooldown starts for re-registration

// 2. Wait for unbonding period (e.g., 7 days)

// 3. Claim deposit
pallet_arion::claim_unbonded(family_origin, child)?;
// Deposit unreserved back to family
```

### Submit Attestation (Warden)

```rust
// Off-chain: Perform audit
let challenge_seed = random_seed();
let response = miner.challenge(shard_hash, challenge_seed).await?;
let result = verify_merkle_proof(response)?;

// Sign attestation
let attestation = AttestationRecord {
    shard_hash,
    miner_uid,
    result,
    challenge_seed,
    block_number,
    timestamp,
    warden_pubkey,
    signature: warden_keypair.sign(&message),
    merkle_proof_sig_hash,
    warden_id,
};

// Submit to chain
pallet_arion::submit_attestations(
    warden_origin,
    bucket,
    vec![attestation]
)?;
```

### Query CRUSH Map

```rust
// Get current epoch
let epoch = pallet_arion::CurrentEpoch::<T>::get();

// Get miners for epoch
let miners = pallet_arion::EpochMiners::<T>::get(epoch)?;

// Get parameters
let params = pallet_arion::EpochParams::<T>::get(epoch)?;

// Verify commitment
let root = pallet_arion::EpochRoot::<T>::get(epoch)?;
let computed = compute_hash(&params, &miners);
assert_eq!(root, computed);
```

### Query Miner Registration

```rust
// Lookup by child account
let registration = pallet_arion::ChildRegistrations::<T>::get(child)?;

// Lookup by node ID
let child = pallet_arion::NodeIdToChild::<T>::get(node_id)?;
let registration = pallet_arion::ChildRegistrations::<T>::get(child)?;

// Check if active
if registration.status == ChildStatus::Active {
    println!("Miner is active, family: {:?}", registration.family);
}
```

### Query Weights

```rust
// Get node weight
let node_weight = pallet_arion::NodeWeightByChild::<T>::get(child);

// Get family weight
let family_weight = pallet_arion::FamilyWeight::<T>::get(family);

// Get quality metrics
let quality = pallet_arion::NodeQualityByChild::<T>::get(child)?;
println!("Uptime: {}%, Strikes: {}", quality.uptime_permille / 10, quality.strikes);
```

## Troubleshooting

### Registration Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `FamilyNotRegistered` | Family not in `pallet-registration` | Register family first |
| `ProxyVerificationFailed` | Child not proxy of family | Add proxy in `pallet-proxy` |
| `ChildInCooldown` | Recently deregistered | Wait for cooldown period |
| `NodeIdAlreadyRegistered` | Node ID in use | Use different keypair |
| `InsufficientDeposit` | Not enough balance | Ensure family has sufficient funds |
| `TooManyChildrenInFamily` | Hit per-family limit | Deregister old miners or use new family |

### Attestation Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `InvalidAttestationSignature` | Signature verification failed | Check signing message format |
| `UnregisteredWarden` | Warden not authorized | Register warden via admin |
| `AttestationBucketFull` | Too many attestations in bucket | Increase `MaxAttestations` |

### CRUSH Map Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `EpochRegression` | Epoch not increasing | Ensure epoch > current |
| `MinerListNotSortedOrNotUnique` | Miners not sorted by UID | Sort miners before submission |
| `MinerNotRegistered` | Miner not on-chain (when enforced) | Ensure all miners are registered |

## Related Pallets

- **`pallet-registration`**: Family account registration
- **`pallet-proxy`**: Proxy relationships for child accounts
- **`pallet-balances`**: Currency for deposits

## References

- [CRUSH Algorithm Paper](https://ceph.io/assets/pdfs/weil-crush-sc06.pdf)
- [Substrate Pallet Development](https://docs.substrate.io/build/custom-pallets/)
- [Ed25519 Signatures](https://ed25519.cr.yp.to/)
 