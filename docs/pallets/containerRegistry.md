# Container Registry Pallet

The Container Registry pallet is a vital component of the Hippius blockchain ecosystem, designed to manage the registration and tracking of Docker images pushed to the registry. This pallet facilitates the storage of image metadata and associated files on IPFS, ensuring efficient and decentralized image management.

## Overview

The Container Registry pallet provides functionalities to handle the following operations:

- **Image Registration**: Users can register Docker images, including metadata and associated files.
- **Space Management**: Users can manage spaces for organizing their images and associated data.
- **Digest Management**: The pallet tracks manifest digests and their corresponding CIDs for efficient retrieval.

## Key Features

### 1. Registering Docker Images

Users can register their Docker images on the network:

#### Function: `register_node`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user registering the image.
  - `node_type`: The type of the node being registered (e.g., StorageMiner, Validator).
  - `node_id`: A unique identifier for the image.
  - `pay_in_credits`: A boolean indicating whether the fee should be paid in credits.
  - `ipfs_node_id`: An optional identifier for the IPFS node.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

### 2. Creating Spaces

Users can create spaces to organize their images:

#### Function: `create_space`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user creating the space.
  - `name`: The name of the space to be created.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 3. Adding Members to Spaces

Users can add members to their spaces:

#### Function: `add_space_member`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user adding a member.
  - `space_id`: The ID of the space to which the member will be added.
  - `new_member`: The account ID of the new member to be added.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 4. Storing Manifest Digests

Users can store manifest digests and their associated CIDs:

#### Function: `add_manifest_head_digest_and_manifest_json_cid`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user storing the digest.
  - `repo_name`: The name of the repository.
  - `image_name`: The name of the image being registered.
  - `tag`: An optional tag for the image.
  - `digest`: The digest of the image.
  - `cid`: The CID associated with the image.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 5. Storing Digest Information

Users can store information related to digests:

#### Function: `store_digest_info`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user storing the digest information.
  - `repo_name`: The name of the repository.
  - `digest`: The digest of the image.
  - `digest_type`: The type of the digest (file or JSON).
  - `cid`: The CID associated with the digest.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

## Storage Structures

The Container Registry pallet utilizes several storage structures to manage state:

- **NextSpaceId**: A storage value that keeps track of the next available space ID.
- **Spaces**: A mapping of space IDs to their corresponding metadata.
- **ManifestDigests**: A mapping of (repo_name, image_name, tag) to their respective digests.
- **DigestInfoStorage**: A mapping of digests to their associated information (type and CID).
- **ImageDigestToCid**: A mapping of (image_name, digest) to their corresponding CIDs.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `SpaceCreated`: Triggered when a new space is created (space ID, owner).
- `MemberAdded`: Triggered when a member is added to a space (space ID, member).
- `ManifestDigestUpdated`: Triggered when a manifest digest is updated (repo name, image name, tag, digest).
- `ImageDigestToCidStored`: Triggered when a mapping of image name and digest to CID is stored (user ID, image name, digest, CID).
- `DigestInfoStored`: Triggered when digest information is successfully stored (user ID, digest, digest type, CID).

## Errors

The pallet defines several error types to handle various failure scenarios:

- `RepositoryAlreadyExists`: Raised when attempting to create a repository that already exists.
- `MaxTagsLimitReached`: Raised when the maximum limit for tags is reached.
- `ExceedsMaxLength`: Raised when input exceeds the maximum allowed length.
- `RepositoryNotFound`: Raised when a requested repository cannot be found.
- `SpaceAlreadyExists`: Raised when attempting to create a space that already exists.
- `SpaceNotFound`: Raised when a requested space cannot be found.
- `NotAuthorized`: Raised when a user is not authorized to perform an action.
- `MaxSpaceMembersReached`: Raised when the maximum number of members for a space is reached.
- `EmptyImageName`: Raised when an empty image name is provided.
- `EmptyDigest`: Raised when an empty digest is provided.
- `EmptyCid`: Raised when an empty CID is provided.
- `EmptyDigestInfo`: Raised when empty digest information is provided.
- `EmptyCidInfo`: Raised when empty CID information is provided.
- `NotSpaceMember`: Raised when a user is not a member of the space.
- `SpaceDoesNotExist`: Raised when a specified space does not exist.
- `NotSpaceOwner`: Raised when a user attempts to perform an action that requires ownership of the space.
- `UserAlreadyHasSpace`: Raised when a user already has a space.

## Additional Types

### DigestInfo Struct

The pallet defines a `DigestInfo` struct to represent information about digests:

- **Fields**:
  - `digest_type`: The type of the digest (file or JSON).
  - `cid`: The CID associated with the digest.

### SpaceMetadata Struct

The pallet defines a `SpaceMetadata` struct to represent metadata for spaces:

- **Fields**:
  - `owner`: The account ID of the space owner.
  - `members`: A list of members associated with the space.
  - `repo_name`: The name of the repository.
  - `image_names`: A list of image names associated with the space.

## Conclusion

The Container Registry pallet plays a vital role in the Hippius blockchain ecosystem by facilitating the registration and management of Docker images. Its design allows for efficient tracking of image metadata and associated files, ensuring a robust and user-friendly experience.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.