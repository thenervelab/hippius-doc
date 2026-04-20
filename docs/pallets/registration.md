# Registration Pallet

The Registration pallet lets **main nodes** (coldkey-owned identities) register on Hippius, prove control of a **libp2p** node identity, and manage lifecycle, governance hooks, and fee metadata. User-facing registration is **`register_node_with_coldkey`**, which binds an on-chain owner account to a `node_id` backed by a signed challenge.

## Overview

- **Coldkey / main-node registration**: A signed caller registers a `node_id` for an `owner` account, with replay-safe challenges and Ed25519 verification against the libp2p peer ID encoding.
- **Governance & ops**: Root and authorities can force-register, ban accounts, toggle node types, fees, deregistration, and validator whitelists.
- **Lifecycle**: Owners can unregister or swap owner; validators can submit deregistration reports; consensus can remove nodes when enabled.
- **Fees**: Storage and hooks exist for per–node-type fees and fee charging; registration still carries a `pay_in_credits` parameter for API alignment with fee logic that may be enabled or wired elsewhere in the runtime.

## Extrinsics

### `register_node_with_coldkey` (primary)

Signed extrinsic. Registers the **main node** in **`ColdkeyNodeRegistrationV2`** and records **`Libp2pMainIdentity`** for audits and liveness.

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `origin` | Signing account (must be signed). |
| `node_type` | `Validator`, `StorageMiner`, `StorageS3`, `ComputeMiner`, or `GpuMiner`. |
| `node_id` | Node identifier bytes; must equal `node_id_hex` (libp2p peer ID bytes). |
| `pay_in_credits` | Reserved for fee-in-credits flows when fee charging is active at registration. |
| `owner` | On-chain account that owns the registration; must match the decoded challenge `account`. |
| `main_key_type` | Libp2p key type; **Ed25519** is required and enforced. |
| `main_public_key` | 32-byte Ed25519 public key. |
| `main_sig` | 64-byte Ed25519 signature over **`challenge_bytes`**. |
| `challenge_bytes` | SCALE-encoded **`RegisterChallenge`** (domain, expiry, genesis, account, node hash, etc.). |
| `node_id_hex` | Same bytes as `node_id`; used with the challenge and peer-ID checks. |

**High-level checks (success path)**

1. **Challenge**: Decode `RegisterChallenge`; domain must be `HIPPIUS::REGISTER::v1` (padded to 24 bytes); `account == owner`; not expired; `genesis_hash` matches chain genesis; `node_id_hash` matches `blake2_256(node_id_hex)`; `node_id == node_id_hex`; challenge hash not already in **`UsedChallenges`** (replay protection).
2. **Signature**: Ed25519 verify `main_sig` over `challenge_bytes`; **`verify_peer_id`** ensures `node_id_hex` matches the multihash prefix + public key layout for Ed25519.
3. **Policy**: Owner not **banned**; owner does not already have a node (**`OwnerAlreadyRegistered`**); **cooldown** after last deregistration (**`NodeCooldownPeriod`**); node not already in **`ColdkeyNodeRegistrationV2`**; **`node_type`** not **disabled**.
4. **Validators**: **`InsufficientStake`** if active stake for `owner` is below **`MinerStakeThreshold`** (via staking ledger).
5. **Persist**: Insert **`ColdkeyNodeInfoLite`**, update **`OwnerToNode`**, store **`Libp2pMainIdentity`**, mark challenge used until expiry, emit **`MainNodeRegistered`**.

**Returns**: `DispatchResultWithPostInfo`.

---

### `force_register_coldkey_node`

**Root only.** Registers `owner` for `node_id` / `node_type` without cryptographic proof. Same bans / duplicate owner / duplicate node checks as the user path where applicable. Emits **`MainNodeRegistered`**.

---

### `set_node_status_to_degraded`

**Root only.** If the node exists in **`ColdkeyNodeRegistrationV2`** and is a **`StorageMiner`**, sets status to **`Degraded`** and emits **`NodeStatusUpdated`**. Non–storage-miner types are rejected with **`NotAminer`** (error name reflects historical miner checks).

---

### `set_fee_charging`

**Root only.** Sets **`FeeChargingEnabled`**. Emits **`FeeChargingStatusChanged`**.

---

### `set_node_type_fee`

**Signed authority** (via **`pallet_credits::ensure_is_authority`**). Updates **`CurrentNodeTypeFee`**. Emits **`NodeTypeFeeUpdated`**.

---

### `set_node_type_disabled`

**Root only.** Updates **`DisabledNodeTypes`**. Emits **`NodeTypeDisabledChanged`**.

---

### `force_unregister_coldkey_node`

**Root only.** Runs **`do_set_node_status_degraded_or_unregister`**: storage miners become **`Degraded`**; other node types are fully unregistered.

---

### `unregister_main_node`

**Signed owner** of the node in **`ColdkeyNodeRegistrationV2`**. Same degrade-or-unregister behavior as the force path for the given `node_id`.

---

### `swap_node_owner`

**Signed current owner**. Sets a new **`owner`** if the new account is not banned and does not already own a node. Emits **`NodeOwnerSwapped`**.

---

### `submit_deregistration_report`

**Signed** reporter resolved to a **validator owner** (via proxy resolution where applicable). Requires **deregistration enabled**, caller’s registered node to be **`Validator`**, and rate limits via **`ReportSubmissionCount`** / **`MaxDeregRequestsPerPeriod`**. Appends **`DeregistrationReport`** entries per `node_id` to **`TemporaryDeregistrationReports`**. Consensus processing runs on a **`ConsensusPeriod`** boundary in **`on_initialize`**.

---

### `set_account_ban_status`

**Root only.** Inserts or removes **`BannedAccounts`**. Emits **`AccountBanStatusChanged`**.

---

### `set_whitelisted_validators`

**Root only.** Replaces **`WhitelistedValidators`** (bounded; max size enforced). Emits **`WhitelistUpdated`**.

---

### `set_deregistration_enabled`

**Root only.** Sets **`DeregistrationEnabled`**. Emits **`DeregistrationStatusChanged`**.

## Storage (selected)

| Name | Role |
|------|------|
| **`ColdkeyNodeRegistrationV2`** | Canonical main-node registry: `node_id` → optional **`ColdkeyNodeInfoLite`**. |
| **`OwnerToNode`** | `owner` → list of `node_id`s for indexing. |
| **`Libp2pMainIdentity`** | `node_id` → `(Libp2pKeyType, public_key)` bound at registration. |
| **`UsedChallenges`** | `blake2_256(challenge_bytes)` → expiry block (replay protection). |
| **`NodeLastDeregisteredAt`** | Cooldown anchor per `node_id`. |
| **`DisabledNodeTypes`** | Per–`NodeType` disable flag. |
| **`FeeChargingEnabled`** | Global fee charging toggle. |
| **`CurrentNodeTypeFee`** | Per–`NodeType` fee amount. |
| **`LastRegistrationBlock`** | Used by dynamic fee helpers when registrations update fees. |
| **`BannedAccounts`** | Banned owner accounts cannot register. |
| **`WhitelistedValidators`** | Optional validator allowlist (with **`ValidatorWhitelistEnabled`** if used by runtime). |
| **`TemporaryDeregistrationReports`** | Pending deregistration votes by reporter account. |
| **`ReportSubmissionCount`** | Rate limiting; periodically cleared in **`on_initialize`**. |
| **`DeregistrationEnabled`** | Gate for report submission and consensus unregister. |

Legacy or parallel maps (**`ColdkeyNodeRegistration`**, **`NodeRegistration`**, etc.) may still exist for migration or compatibility; **v2 coldkey storage** is the path described for new registrations above.

## Hooks

**`on_initialize`**: Initializes **`CurrentNodeTypeFee`** if empty; clears report counters on an interval; applies **deregistration consensus** on **`ConsensusPeriod`**; clears temporary reports on an epoch-based schedule; periodic housekeeping for duplicate-owner coldkey rows; garbage-collects expired **`UsedChallenges`**.

## Events

- **`MainNodeRegistered`** — `{ node_id }` (primary success for coldkey registration).
- **`NodeRegistered`** — Defined on the enum; the coldkey registration extrinsics emit **`MainNodeRegistered`** on success.
- **`NodeUnregistered`**, **`NodeUnregisteredBatch`**
- **`NodeStatusUpdated`** — `{ node_id, status }`
- **`FeeChargingStatusChanged`**, **`FeePercentageChanged`**, **`NodeTypeFeeUpdated`**, **`NodeTypeDisabledChanged`**
- **`NodeOwnerSwapped`**, **`DeregistrationConsensusReached`**, **`DeregistrationConsensusFailed`**
- **`AccountBanStatusChanged`**, **`WhitelistUpdated`**
- **`NodeVerified`**, **`ColdkeyNodeVerified`** — Verification flows if used by the runtime.
- **`DeregistrationStatusChanged`**

## Errors (reference)

Including but not limited to: **`NoneValue`**, **`StorageOverflow`**, **`IpfsNodeIdRequired`**, **`NodeAlreadyRegistered`**, **`NodeNotFound`**, **`NotAminer`**, **`IpfsNodeIdAlreadyRegistered`**, **`AddressUidNotFoundOnBittensor`**, **`InvalidAccountId`**, **`InsufficientStake`**, **`InsufficientBalanceForFee`**, **`InsufficientCreditsForFee`**, **`FeeTooHigh`**, **`NodeTypeDisabled`**, **`NodeTypeMismatch`**, **`NodeNotRegistered`**, **`DeregistrationDisabled`**, **`NotNodeOwner`**, **`NotAProxyAccount`**, **`InvalidProxyType`**, **`AccountNotRegistered`**, **`NodeNotInUids`**, **`NodeCooldownPeriodNotExpired`**, **`OwnerAlreadyRegistered`**, **`InvalidNodeType`**, **`NodeNotDegradedStorageMiner`**, **`TooManyRequests`**, **`AccountBanned`**, **`ExceededMaxWhitelistedValidators`**, **`NodeNotWhitelisted`**, **`InvalidSignature`**, **`InvalidKeyType`**, **`InvalidChallenge`**, **`InvalidChallengeDomain`**, **`ChallengeExpired`**, **`ChallengeReused`**, **`GenesisMismatch`**, **`PublicKeyMismatch`**, **`ChallengeMismatch`**, **`NodeIdMismatch`**, **`TooManyUnverifiedNodes`**, **`NodeAlreadyVerified`**, **`Unauthorized`**.

Registration with **`register_node_with_coldkey`** specifically exercises challenge, signature, cooldown, ban, owner-uniqueness, node-type disable, and (for validators) stake errors.

## Types

### `ColdkeyNodeRegistrationV2` record: `ColdkeyNodeInfoLite`

Minimal fields stored on-chain for a main node:

- **`node_id`**
- **`node_type`**
- **`status`** — e.g. **`Online`**, **`Degraded`**
- **`registered_at`** — block number
- **`owner`** — account ID

APIs that return **`NodeInfo`** may map this struct into a richer view (for example with **`ipfs_node_id: None`** and **`is_verified: true`** in **`coldkey_lite_to_node_info`**).

### `NodeType`

- **`Validator`**
- **`StorageMiner`**
- **`StorageS3`**
- **`ComputeMiner`**
- **`GpuMiner`**

### `Status`

- **`Online`**
- **`Degraded`**
- **`Offline`** (defined in the enum; primary transitions in the shown calls focus on **`Online`** / **`Degraded`** and unregister paths.)

### `RegisterChallenge` (conceptual)

The SCALE-encoded challenge binds registration to a specific chain genesis, owner account, expiry block, and **`blake2_256(node_id_hex)`**, under the fixed domain bytes **`HIPPIUS::REGISTER::v1`** (zero-padded to 24 bytes). The exact field order and types match the pallet’s **`RegisterChallenge`** definition in **`types`**.

## Conclusion

The Registration pallet centers on **`register_node_with_coldkey`**: cryptographic proof of libp2p identity, one main node per owner in **`ColdkeyNodeRegistrationV2`**, and supporting extrinsics for operations, fees, bans, whitelists, and decentralized deregistration when enabled.

For cross-pallet behavior (staking thresholds, credits authorities, metagraph), see the related Hippius pallets and runtime configuration.
