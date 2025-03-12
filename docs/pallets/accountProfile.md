# Account Profile Pallet

The Account Profile pallet is a crucial component of the Hippius blockchain ecosystem, designed to manage user account profiles, including public and private data storage, usernames, and cryptographic keys. This pallet facilitates the secure handling of user information, ensuring data integrity and accessibility.

## Overview

The Account Profile pallet provides functionalities to handle the following operations:

- **Setting Public and Private Data**: Users can store public and private data associated with their accounts.
- **Managing Usernames**: Users can set unique usernames that are mapped to their account IDs.
- **Storing Cryptographic Keys**: Users can store their data and message public keys for secure transactions.

## Key Features

### 1. Setting Public and Private Data

Users can store data in both public and private storage:

#### Function: `set_public_item`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user setting the public item.
  - `item`: The hex-encoded string representing the public item.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

#### Function: `set_private_item`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user setting the private item.
  - `item`: The hex-encoded string representing the private item.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 2. Managing Usernames

Users can set unique usernames for their accounts:

#### Function: `set_username`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user setting the username.
  - `username`: The desired username as a byte vector.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 3. Storing Cryptographic Keys

Users can store their cryptographic keys for secure transactions:

#### Function: `set_data_public_key`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user setting the data public key.
  - `key`: The hex-encoded data public key.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

#### Function: `set_message_public_key`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user setting the message public key.
  - `key`: The hex-encoded message public key.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

## Storage Structures

The Account Profile pallet utilizes several storage structures to manage state:

- **UserPublicStorage**: A mapping of user account IDs to their respective public data.
- **DataPublicKeys**: A mapping of user account IDs to their data public keys.
- **MessagePublicKeys**: A mapping of user account IDs to their message public keys.
- **UserPrivateStorage**: A mapping of user account IDs to their respective private data.
- **Usernames**: A mapping of usernames to account IDs, ensuring uniqueness.
- **AccountUsernames**: A mapping of account IDs to their corresponding usernames.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `PublicItemSet`: Triggered when a public item is successfully set for a user.
- `PrivateItemSet`: Triggered when a private item is successfully set for a user.
- `UsernameSet`: Triggered when a username is successfully set for a user.
- `DataPublicKeySet`: Triggered when a data public key is successfully set for a user.
- `MessagePublicKeySet`: Triggered when a message public key is successfully set for a user.

## Errors

The pallet defines several error types to handle various failure scenarios:

- `InvalidHexString`: Raised when the provided hex string is invalid.
- `UsernameAlreadySet`: Raised when a user tries to set a username that they already have.
- `UsernameAlreadyTaken`: Raised when attempting to set a username that is already in use.

## Conclusion

The Account Profile pallet plays a vital role in the Hippius blockchain ecosystem by enabling efficient management of user account profiles. Its design allows for secure storage of public and private data, usernames, and cryptographic keys, ensuring a robust and user-friendly experience.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.