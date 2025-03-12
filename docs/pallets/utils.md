# Utils Pallet

The Utils pallet is an essential component of the Hippius blockchain ecosystem, providing various utility functions that enhance the functionality of other pallets. This pallet includes features for managing RPC interactions, signing payloads, and converting public keys.

## Overview

The Utils pallet provides functionalities to handle the following operations:

- **RPC Interaction**: Fetching node IDs using configured RPC parameters.
- **Payload Signing**: Signing payloads for secure transactions.
- **Public Key Conversion**: Converting BABE public keys to array format.

## Key Features

### 1. Setting Metagraph Submission Status

Users can enable or disable metagraph submissions:

#### Function: `set_metagraph_submission_enabled`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user changing the submission status (only root can perform this action).
  - `enabled`: A boolean indicating whether metagraph submissions should be enabled.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 2. Fetching Node ID

The pallet provides a helper function to fetch the node ID:

#### Function: `fetch_node_id`

- **Returns**: A `Result<Vec<u8>, http::Error>` containing the node ID or an error if the fetch fails.

### 3. Signing Payloads

The pallet provides a helper function for signing payloads:

#### Function: `sign_payload`

- **Parameters**:
  - `key`: A byte slice representing the key used for signing.
  - `payload`: A byte slice representing the payload to be signed.

- **Returns**: A `Result<Vec<u8>, ()>` containing the signed payload or an error if the signing fails.

### 4. Converting BABE Public Key

The pallet provides a helper function to convert BABE public keys:

#### Function: `babe_public_to_array`

- **Parameters**:
  - `public`: A reference to the BABE public key.

- **Returns**: An array of 32 bytes representing the public key.

## Storage Structures

The Utils pallet utilizes several storage structures to manage state:

- **MetagraphSubmissionEnabled**: A storage value indicating whether metagraph submissions are enabled.

## Events

The pallet emits several events to notify the system and users about significant actions:

- Currently, there are no defined events in this pallet.

## Errors

The pallet defines several error types to handle various failure scenarios:

- `NoneValue`: Raised when a function encounters a `None` value unexpectedly.
- `StorageOverflow`: Raised when a storage operation exceeds its limits.

## Additional Types

### Role Enum

The pallet defines a `Role` enum to represent different roles within the system:

- **Validator**
- **StorageMiner**
- **StorageS3**
- **ComputeMiner**
- **GpuMiner**
- **None** (default role)

### UID Struct

The pallet defines a `UID` struct to represent unique identifiers:

- **Fields**:
  - `address`: The public key associated with the UID.
  - `id`: A unique identifier (u16).
  - `role`: The role associated with the UID.
  - `substrate_address`: The corresponding Substrate address.

## Conclusion

The Utils pallet plays a vital role in the Hippius blockchain ecosystem by providing essential utility functions that support other pallets. Its design allows for efficient RPC interactions, secure payload signing, and public key management, ensuring a robust and user-friendly experience.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.