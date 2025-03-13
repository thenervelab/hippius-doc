# Storage S3 Pallet

The Storage S3 pallet is an essential component of the Hippius blockchain ecosystem, designed to store and manage user bucket and bandwidth data on-chain. This pallet provides functionalities for managing storage resources, enabling users to efficiently allocate and monitor their storage usage.

## Overview

The Storage S3 pallet provides functionalities to handle the following operations:

- **Bucket Management**: Users can store and manage bucket names and sizes.
- **Bandwidth Management**: Users can track and manage their bandwidth usage.
- **Fee Management**: The pallet allows for the management of fees associated with storage usage.

## Key Features

### 1. Storing Bucket Names

Users can store bucket names associated with their accounts:

#### Function: `store_bucket_name`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user storing the bucket name (only root can perform this action).
  - `account`: The account ID of the user storing the bucket name.
  - `bucket_name`: The name of the bucket to be stored.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 2. Setting Bucket Size

Users can set the size of a specific bucket:

#### Function: `set_bucket_size`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user setting the bucket size (only root can perform this action).
  - `bucket_name`: The name of the bucket for which the size is being set.
  - `size`: The size of the bucket in bytes.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 3. Setting User Bandwidth

Users can set the bandwidth allocated to a specific user:

#### Function: `set_user_bandwidth`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user setting the bandwidth (only root can perform this action).
  - `user_id`: The account ID of the user for whom the bandwidth is being set.
  - `bandwidth`: The bandwidth size in bytes.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

## Storage Structures

The Storage S3 pallet utilizes several storage structures to manage state:

- **BucketNames**: A mapping of user account IDs to their respective bucket names.
- **BucketSize**: A mapping of bucket names to their sizes in bytes.
- **UserBandwidth**: A mapping of user account IDs to their bandwidth usage.
- **LastChargeAt**: A mapping of user account IDs to the last block number at which they were charged.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `BucketNameStored`: Triggered when a bucket name is successfully stored (user account ID, bucket name).
- `BucketSizeSet`: Triggered when a bucket size is successfully set (bucket name, size).
- `UserBandwidthSet`: Triggered when a user bandwidth is successfully set (user ID, bandwidth).

## Errors

The pallet defines several error types to handle various failure scenarios:

- `NoneValue`: Raised when a function encounters a `None` value unexpectedly.
- `StorageOverflow`: Raised when a storage operation exceeds its limits.
- `InvalidBucketName`: Raised when an invalid bucket name is provided.
- `BucketSizeTooLarge`: Raised when the specified bucket size exceeds the allowed limit.
- `InvalidUserId`: Raised when an invalid user ID is provided.
- `BandwidthTooLarge`: Raised when the specified bandwidth exceeds the allowed limit.

## Additional Types

### UserBucket Struct

The pallet defines a `UserBucket` struct to represent information about user buckets:

- **Fields**:
  - `bucket_name`: The name of the bucket.
  - `bucket_size`: A vector containing the size of the bucket in bytes.

## Conclusion

The Storage S3 pallet plays a vital role in the Hippius blockchain ecosystem by providing essential functionalities for managing user bucket and bandwidth data. Its design allows for efficient storage management, ensuring a robust and user-friendly experience.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.