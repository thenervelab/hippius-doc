 # IPFS Pallet

The IPFS Pallet is an essential component of the Hippius blockchain ecosystem, designed to manage the storage and retrieval of files using the InterPlanetary File System (IPFS). This pallet facilitates the pinning and unpinning of files, tracks storage requests, and handles interactions with the IPFS network.

## Overview

The IPFS Pallet provides functionalities to handle the following operations:

- **Pinning Files**: Allows miners to request the storage of files by pinning them to the IPFS network.
- **Unpinning Files**: Enables miners to remove files from the IPFS network.
- **Storage Requests**: Manages requests from users to store files, including tracking fulfilled replicas and managing unpin requests.

## Key Features

### 1. Pinning Files

The pallet allows miners to pin files to the IPFS network:

#### Function: `add_ipfs_pin_request`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user submitting the request.
  - `file_hash`: The hash of the file to be pinned.
  - `node_identity`: The identity of the node requesting the pin.
  - `account_id`: The account ID of the user making the request.
  - `signature`: The signature of the transaction.
  - `file_size_in_bytes`: The size of the file in bytes.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

### 2. Unpinning Files

The pallet enables miners to unpin files from the IPFS network:

#### Function: `remove_unpin_request`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user submitting the unpin request.
  - `node_identity`: The identity of the node requesting the unpin.
  - `file_hashes_updated_vec`: A vector of file hashes to be unpinned.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

### 3. Storage Requests

The pallet manages storage requests from users:

#### Function: `update_user_storage_request`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user submitting the request.
  - `file_hash`: The hash of the file for which the storage request is being updated.
  - `storage_request`: An optional storage request containing details about the file.
  - `node_identity`: The identity of the node associated with the request.
  - `account_id`: The account ID of the user making the request.
  - `signature`: The signature of the transaction.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

## Storage Structures

The IPFS Pallet utilizes several storage structures to manage state:

- **FileSize**: A mapping of file hashes to their corresponding sizes.
- **RequestedPin**: A double map that stores user requests to pin files, keyed by account ID and file hash.
- **UnpinRequests**: A storage value that keeps track of files that need to be unpinned.
- **FileStored**: A mapping that stores all node IDs that have pinned a specific file hash.
- **Blacklist**: A storage value containing blacklisted file hashes.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `PinRequested`: Triggered when a pin request is made (who, file_hash, replicas).
- `MinerPinnedFile`: Triggered when a file is successfully pinned by a miner (file_hash, miner, file_size_in_bytes).
- `UnpinRequestAdded`: Triggered when a unpin request is added (file_hash).
- `FileBlacklisted`: Triggered when a file is blacklisted (file_hash).

## Errors

The pallet defines several error types to handle various failure scenarios:

- `RequestAlreadyExists`: Raised when a pin request already exists.
- `RequestDoesNotExists`: Raised when a requested pin does not exist.
- `FileHashBlacklisted`: Raised when a file hash is blacklisted.
- `NodeNotRegistered`: Raised when the node is not registered.

## Conclusion

The IPFS Pallet plays a vital role in the Hippius blockchain ecosystem by managing the storage and retrieval of files using IPFS. Its design ensures efficient file management and interaction with the IPFS network, enhancing the overall functionality of the system.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.