# Compute Pallet

The Compute pallet is a vital component of the Hippius blockchain ecosystem, designed to manage compute requests and operations for miners. This pallet facilitates the creation, submission, and management of compute tasks, ensuring efficient resource utilization and performance tracking across the network.

## Overview

The Compute pallet provides functionalities to handle the following operations:

- **Compute Request Management**: Handles the creation, assignment, and fulfillment of compute requests.
- **IP Management**: Manages the assignment and release of IP addresses for virtual machines (VMs).
- **Node Metrics Tracking**: Tracks and updates performance metrics for miners.

## Key Features

### 1. Compute Request Management

Users can create and manage compute requests:

#### Function: `submit_compute_request_assignment`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user submitting the request.
  - `miner_node_id`: The ID of the miner node to which the request is assigned.
  - `plan_id`: The unique identifier for the compute plan.
  - `request_id`: The unique identifier for the compute request.
  - `owner`: The account ID of the request owner.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

### 2. IP Management

The pallet manages the assignment and release of IP addresses for VMs:

#### Function: `assign_ip_to_vm`

- **Parameters**:
  - `vm_name`: The name of the virtual machine.
  - `ip`: The IP address to be assigned.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 3. Node Metrics Tracking

The pallet tracks and updates performance metrics for miners:

#### Function: `get_node_metrics`

- **Parameters**:
  - `node_id`: The ID of the node for which metrics are requested.

- **Returns**: A `NodeMetricsData` structure containing the performance metrics.

## Storage Structures

The Compute pallet utilizes several storage structures to manage state:

- **NextRequestId**: A storage value that keeps track of the next available request ID.
- **ComputeRequests**: A mapping of account IDs to their corresponding compute requests.
- **MinerComputeRequests**: A mapping of miner node IDs to their corresponding compute requests.
- **MinerComputeDeletionRequests**: A mapping of miner node IDs to their corresponding deletion requests.
- **MinerComputeStopRequests**: A mapping of miner node IDs to their corresponding stop requests.
- **MinerComputeBootRequests**: A mapping of miner node IDs to their corresponding boot requests.
- **MinerComputeRebootRequests**: A mapping of miner node IDs to their corresponding reboot requests.
- **MinerComputeResizeRequests**: A mapping of miner node IDs to their corresponding resize requests.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `ComputeRequestCreated`: Triggered when a new compute request is created (plan ID, owner).
- `ComputeRequestSubmitted`: Triggered when a compute request is submitted (miner, request ID, owner).
- `ComputeRequestFulfilled`: Triggered when a compute request is fulfilled (node, request ID, owner).
- `ComputeDeletionRequestRemoved`: Triggered when a compute deletion request is removed (node ID, request ID, owner).
- `ComputeBootRequestRemoved`: Triggered when a compute boot request is removed (node ID, request ID, owner).
- `ComputeRebootRequestFulfilled`: Triggered when a compute reboot request is fulfilled (node ID, request ID, owner).
- `ComputeResizeRequestFulfilled`: Triggered when a compute resize request is fulfilled (node ID, request ID, owner).

## Errors

The pallet defines several error types to handle various failure scenarios:

- `NoAvailableIp`: Raised when there are no available IP addresses.
- `VmAlreadyHasIp`: Raised when a VM already has an assigned IP address.
- `VmHasNoIp`: Raised when a VM does not have an assigned IP address.
- `IpAlreadyExists`: Raised when attempting to assign an IP address that already exists.
- `InvalidSignature`: Raised when an invalid signature is provided.
- `ComputeRequestNotFound`: Raised when a compute request cannot be found.
- `ComputeDeletionRequestNotFound`: Raised when a compute deletion request cannot be found.
- `ComputeStopRequestAlreadyExists`: Raised when a compute stop request already exists.
- `ComputeStopRequestNotFound`: Raised when a compute stop request cannot be found.
- `ComputeBootRequestNotFound`: Raised when a compute boot request cannot be found.
- `ComputeRebootRequestNotFound`: Raised when a compute reboot request cannot be found.
- `ComputeResizeRequestNotFound`: Raised when a compute resize request cannot be found.

## Additional Types

### ImageMetadata Struct

The pallet defines an `ImageMetadata` struct to represent metadata for a virtual machine image:

- **Fields**:
  - `name`: The name of the image.
  - `image_url`: The IPFS hash of the image.

### ComputeRequest Struct

The pallet defines a `ComputeRequest` struct to represent a compute request:

- **Fields**:
  - `request_id`: Unique identifier for the request.
  - `plan_technical_description`: Technical description of the compute plan.
  - `plan_id`: The unique identifier for the compute plan.
  - `status`: The status of the compute request (e.g., Pending, Running).
  - `created_at`: The block number when the request was created.
  - `owner`: The account ID of the request owner.
  - `selected_image`: The image metadata for the selected image.
  - `is_assigned`: Indicates if the request is assigned.
  - `cloud_init_cid`: Optional cloud-init configuration CID.
  - `miner_id`: Optional miner ID if selected.

### ComputeRequestStatus Enum

The pallet defines a `ComputeRequestStatus` enum to represent the status of a compute request:

- **Variants**:
  - `Pending`: The request is pending.
  - `Stopped`: The request has been stopped.
  - `InProgress`: The request is currently in progress.
  - `Running`: The request is actively running.
  - `Failed`: The request encountered an error.
  - `Cancelled`: The request was cancelled.

### MinerComputeRequest Struct

The pallet defines a `MinerComputeRequest` struct to represent a miner's compute request:

- **Fields**:
  - `miner_node_id`: The ID of the miner node.
  - `miner_account_id`: The account ID of the miner.
  - `job_id`: The job ID assigned to the miner (if applicable).
  - `hypervisor_ip`: The hypervisor IP address assigned to the miner.
  - `fail_reason`: The reason for failure (if applicable).
  - `vnc_port`: The VNC port assigned to the miner.
  - `ip_assigned`: The IP address assigned to the miner.
  - `request_id`: The unique identifier for the request.
  - `plan_id`: The unique identifier for the compute plan.
  - `created_at`: The block number when the request was created.
  - `fullfilled`: Indicates if the request has been fulfilled.

## Conclusion

The Compute pallet plays a vital role in the Hippius blockchain ecosystem by managing compute requests and operations for miners. Its design ensures efficient resource utilization and performance tracking, enhancing the overall functionality and interoperability of the network.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.