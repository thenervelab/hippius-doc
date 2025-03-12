# Backup Pallet

The Backup pallet is an essential component of the Hippius blockchain ecosystem, designed to manage backup operations for user data and snapshots. This pallet facilitates the creation, restoration, and management of backups, ensuring data integrity and availability.

## Overview

The Backup pallet provides functionalities to handle the following operations:

- **Creating Backups**: Users can create backups of their data, which can be restored later as needed.
- **Restoring Backups**: Users can restore their data from backups, allowing for recovery in case of data loss.
- **Managing Backup Frequency**: Users can set the frequency of backup operations to ensure their data is regularly backed up.

## Key Features

### 1. Creating Backups

The process of creating backups involves the following steps:

- **Request Submission**: Authorities submit a request to create a backup for a specific node.
- **Backup Allocation**: Upon approval, the backup is stored along with its metadata.

#### Function: `add_snapshot`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the authority initiating the backup.
  - `node_id`: The unique identifier of the node for which the backup is created.
  - `snapshot_cid`: The content identifier (CID) of the snapshot being created.
  - `description`: An optional description of the backup.
  - `request_id`: A unique identifier for the backup request.
  - `account_id`: The account ID of the user creating the backup.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 2. Restoring Backups

The restoration process allows users to recover their data from backups:

#### Function: `restore_from_snapshot`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user requesting the restoration.
  - `cid`: The CID of the snapshot to restore.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 3. Managing Backup Frequency

Users can set the frequency of backup operations to ensure their data is regularly backed up.

#### Function: `set_backup_offchain_worker_frequency`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user setting the frequency.
  - `new_frequency`: The new frequency for backup operations.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

## Storage Structures

The Backup pallet utilizes several storage structures to manage state:

- **Backups**: A mapping of node IDs and account IDs to their respective backup metadata.
- **BackupOffchainWorkerFrequency**: A mapping of user account IDs to their backup operation frequency.
- **RestoreRequests**: A mapping of restore request IDs to their respective metadata.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `BackupCreated`: Triggered when a backup is successfully created for a node.
- `SnapshotAdded`: Triggered when a snapshot is added to an existing backup.
- `BackupUpdated`: Triggered when a backup is updated.
- `UserStorageDeleted`: Triggered when a user's backup storage is deleted.
- `BackupOffchainWorkerFrequencyUpdated`: Triggered when the backup frequency is updated.
- `SnapshotRestoreRequested`: Triggered when a restore request is made.

## Errors

The pallet defines several error types to handle various failure scenarios:

- `BackupAlreadyExists`: Raised when attempting to create a backup that already exists.
- `BackupNotFound`: Raised when a requested backup cannot be found.
- `NotAuthorized`: Raised when a user attempts to perform an action they are not authorized for.
- `AccessAlreadyGranted`: Raised when access is already granted to a resource.
- `AccessNotFound`: Raised when an access request cannot be found.
- `NotBackupOwner`: Raised when a user attempts to access a backup they do not own.
- `RestoreRequestNotFound`: Raised when a requested restore cannot be found.

## Conclusion

The Backup pallet plays a vital role in the Hippius blockchain ecosystem by enabling efficient management of backup operations. Its design allows for secure creation, restoration, and management of backups, ensuring data integrity and availability for users.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.