# Metagraph Pallet

The Metagraph Pallet is a crucial component of the Hippius blockchain ecosystem, designed to manage validators, their roles, and their interactions within the network. This pallet facilitates the submission of unique identifiers (UIDs) by validators, tracks their trust points, and maintains a whitelist of validators. Additionally, it is responsible for fetching UIDs and miners' information from the Bittensor RPC and storing that information on our chain, setting their roles as miners, validators, etc., and registering all accounts for each UID on Bittensor.

## Overview

The Metagraph Pallet provides functionalities to handle the following operations:

- **UID Management**: Allows validators to submit their UIDs and track their roles within the network.
- **Validator Trust Points**: Manages trust points assigned to validators based on their submissions and behaviors.
- **Whitelist Management**: Maintains a whitelist of trusted validators for the network.
- **Data Fetching**: Retrieves UIDs and miner information from the Bittensor RPC and updates the local chain.

## Key Features

### 1. UID Management

The pallet allows validators to submit their UIDs:

#### Function: `submit_hot_keys`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user submitting the UID.
  - `hot_keys`: A vector of UIDs submitted by the validator.
  - `dividends`: A vector of dividend values associated with the UIDs.
  - `_signature`: The signature of the transaction.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

### 2. Validator Trust Points

The pallet manages trust points for validators:

#### Function: `ValidatorTrustUpdated`

- **Parameters**:
  - `validator`: The account ID of the validator whose trust points are being updated.
  - `points`: The new trust points assigned to the validator.

- **Returns**: An event indicating the update of trust points for the validator.

### 3. Whitelist Management

The pallet allows for the management of a whitelist of validators:

#### Function: `sudo_add_whitelisted_validator`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user making the request.
  - `validator`: The account ID of the validator to be added to the whitelist.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

#### Function: `sudo_remove_whitelisted_validator`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user making the request.
  - `validator`: The account ID of the validator to be removed from the whitelist.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

## Storage Structures

The Metagraph Pallet utilizes several storage structures to manage state:

- **UIDs**: A storage value that holds a vector of UIDs submitted by validators.
- **ValidatorSubmissions**: A mapping that tracks submissions of UIDs by validators keyed by block number.
- **WhitelistedValidators**: A storage value containing a list of whitelisted validators.
- **ValidatorTrustPoints**: A mapping that tracks trust points assigned to each validator.
- **FinalizedBlocks**: A mapping that tracks which blocks have been finalized.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `HotKeysUpdated`: Triggered when hot keys are updated (count, validators, miners).
- `SignedPayloadProcessed`: Triggered when a payload is signed and processed (signer, payload, signature, hot_keys_count).
- `StorageUpdated`: Triggered when storage is updated (uids_count).
- `ValidatorTrustUpdated`: Triggered when a validator's trust points are updated (validator, points).
- `WhitelistedValidatorAdded`: Triggered when a validator is added to the whitelist (validator).
- `WhitelistedValidatorRemoved`: Triggered when a validator is removed from the whitelist (validator).

## Errors

The pallet defines several error types to handle various failure scenarios:

- `NoneValue`: Raised when a value is not found.
- `StorageOverflow`: Raised when there is a storage overflow.
- `SigningError`: Raised when there is an error during signing.
- `InvalidSignature`: Raised when a signature is invalid.
- `InvalidUIDFormat`: Raised when a UID format is invalid.
- `DecodingError`: Raised when there is an error decoding hex.
- `ValidatorAlreadyWhitelisted`: Raised when a validator is already in the whitelist.
- `ValidatorNotWhitelisted`: Raised when a validator is not in the whitelist.

## Conclusion

The Metagraph Pallet plays a vital role in the Hippius blockchain ecosystem by managing validators, their roles, and their interactions. Its design ensures efficient UID management, trust point tracking, and validator whitelisting, enhancing the overall functionality and security of the network. Additionally, by fetching UIDs and miner information from the Bittensor RPC, it ensures that the network remains updated with the latest validator data.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.