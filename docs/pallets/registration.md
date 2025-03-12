# Registration Pallet

The Registration pallet is a critical component of the Hippius blockchain ecosystem, enabling nodes to register on the network. This pallet allows for the management of node types, registration status, and associated fees, facilitating a robust and efficient node registration process.

## Overview

The Registration pallet provides functionalities to handle the following operations:

- **Node Registration**: Nodes can register their information, including node type and IPFS node ID.
- **Node Status Management**: The status of registered nodes can be updated to reflect their operational state.
- **Fee Management**: The pallet manages fees associated with different node types and enables fee charging.

## Key Features

### 1. Registering Nodes

Users can register their nodes on the network:

#### Function: `register_node`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user registering the node.
  - `node_type`: The type of the node being registered (e.g., Validator, StorageMiner).
  - `node_id`: A unique identifier for the node.
  - `pay_in_credits`: A boolean indicating whether the fee should be paid in credits.
  - `ipfs_node_id`: An optional identifier for the IPFS node.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

### 2. Updating Node Status

Users can update the status of their nodes:

#### Function: `set_node_status_to_degraded`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user updating the node status.
  - `node_id`: The unique identifier of the node to be updated.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 3. Enabling or Disabling Fee Charging

The pallet allows for the management of fee charging:

#### Function: `set_fee_charging`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user changing the fee charging status (only root can perform this action).
  - `enabled`: A boolean indicating whether fee charging should be enabled.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 4. Updating Node Type Fees

Users can update the fees associated with specific node types:

#### Function: `set_node_type_fee`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user updating the fee (only authorities can perform this action).
  - `node_type`: The type of node for which the fee is being updated.
  - `fee`: The new fee amount for the specified node type.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

## Storage Structures

The Registration pallet utilizes several storage structures to manage state:

- **DisabledNodeTypes**: A mapping of node types to their disabled status.
- **NodeRegistration**: A mapping of node IDs to their corresponding node information.
- **FeeChargingEnabled**: A storage value indicating whether fee charging is enabled.
- **CurrentNodeTypeFee**: A mapping of node types to their current fees.
- **LastRegistrationBlock**: A mapping of node types to the last block number at which they were registered.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `NodeRegistered`: Triggered when a node is successfully registered (node ID).
- `NodeStatusUpdated`: Triggered when a node's status is updated (node ID, status).
- `FeeChargingStatusChanged`: Triggered when the fee charging status is changed (enabled).
- `NodeTypeFeeUpdated`: Triggered when the fee for a specific node type is updated (node type, fee).
- `NodeTypeDisabledChanged`: Triggered when the disabled status of a node type is changed (node type, disabled).

## Errors

The pallet defines several error types to handle various failure scenarios:

- `NoneValue`: Raised when a function encounters a `None` value unexpectedly.
- `NodeAlreadyRegistered`: Raised when attempting to register a node that is already registered.
- `NodeNotFound`: Raised when a requested node cannot be found.
- `NotAminer`: Raised when the node is not a miner.
- `IpfsNodeIdRequired`: Raised when a required IPFS node ID is missing.
- `InsufficientStake`: Raised when the required stake for a node type is not met.
- `InsufficientBalanceForFee`: Raised when the user does not have enough balance to cover the fee.
- `FeeTooHigh`: Raised when the fee exceeds the allowed limit.
- `NodeTypeDisabled`: Raised when attempting to register a node type that is disabled.

## Additional Types

### NodeInfo Struct

The pallet defines a `NodeInfo` struct to represent information about registered nodes:

- **Fields**:
  - `node_id`: The unique identifier for the node.
  - `node_type`: The type of the node (e.g., Validator, StorageMiner).
  - `ipfs_node_id`: An optional IPFS node ID.
  - `status`: The current status of the node (e.g., Online, Degraded).
  - `registered_at`: The block number at which the node was registered.
  - `owner`: The account ID of the node owner.

### NodeType Enum

The pallet defines a `NodeType` enum to represent different types of nodes:

- **Validator**
- **StorageMiner**
- **StorageS3**
- **ComputeMiner**
- **GpuMiner**

### Status Enum

The pallet defines a `Status` enum to represent the operational state of nodes:

- **Online**
- **Degraded**
- **Offline**

## Conclusion

The Registration pallet plays a vital role in the Hippius blockchain ecosystem by facilitating the registration and management of nodes on the network. Its design allows for efficient handling of node types, registration statuses, and associated fees, ensuring a robust and user-friendly experience.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.