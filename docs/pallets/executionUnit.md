# Execution Unit Pallet

The Execution Unit pallet is the brain of the Hippius blockchain ecosystem, designed to manage execution tasks and metrics calculation for miners. This pallet facilitates the collection of system information, performance metrics, and the execution of off-chain tasks, ensuring efficient resource utilization and performance tracking across the network. It performs storage and compute request assignments to miners after checking miners' specifications, handles charging logic, and performs ranking calculations.

## Overview

The Execution Unit pallet provides functionalities to handle the following operations:

- **System Information Management**: Collects and stores system specifications and metrics.
- **Benchmarking**: Executes benchmarks to assess the performance of nodes based on various criteria.
- **Metrics Tracking**: Tracks and updates performance metrics for miners, including latency, peer count, and uptime.

## Key Features

### 1. System Information Management

The pallet manages the collection and storage of system information for nodes:

#### Function: `put_node_specs`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user submitting the request.
  - `node_id`: The ID of the node for which the specs are being submitted.
  - `system_info`: The system information to be stored.
  - `signature`: The signature of the transaction.
  - `node_type`: The type of the node (e.g., Validator).

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

### 2. Benchmarking

The pallet allows for the execution of benchmarks to evaluate node performance:

#### Function: `execute_benchmark`

- **Parameters**:
  - `node_id`: The ID of the node for which benchmarking is being executed.

- **Returns**: A `Result` indicating success or failure of the benchmarking process.

### 3. Metrics Tracking

The pallet tracks and updates various performance metrics for miners:

#### Function: `update_metrics_data`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user submitting the request.
  - `node_id`: The ID of the node for which metrics are being updated.
  - `signature`: The signature of the transaction.
  - `storage_proof_time_ms`: The time taken for storage proof.
  - `latency_ms`: The latency in milliseconds.
  - `peer_count`: The number of peers connected.
  - `failed_challenges_count`: The count of failed challenges.
  - `successful_challenges`: The count of successful challenges.
  - `total_challenges`: The total number of challenges.
  - `uptime_minutes`: The uptime in minutes.
  - `total_minutes`: The total time in minutes.
  - `consecutive_reliable_days`: The number of consecutive reliable days.
  - `recent_downtime_hours`: The number of recent downtime hours.
  - `node_type`: The type of node (e.g., Validator).

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

## Storage Structures

The Execution Unit pallet utilizes several storage structures to manage state:

- **NodeMetrics**: A mapping of node IDs to their corresponding performance metrics.
- **BlockNumbers**: A mapping storing block numbers for each block processed.
- **DowntimeStatus**: A storage value that keeps track of the downtime status of miners.
- **BenchmarkResults**: A mapping of node IDs to their corresponding benchmark results.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `BenchmarkStarted`: Triggered when a benchmarking process starts (node ID).
- `BenchmarkCompleted`: Triggered when a benchmarking process completes (node ID, metrics, final score).
- `BenchmarkFailed`: Triggered when a benchmarking process fails (node ID, error).
- `NodeSpecsStored`: Triggered when node specifications are stored (node ID).
- `SignedPayloadProcessed`: Triggered when a signed payload is processed (signer, payload, signature, node ID).
- `PinCheckMetricsUpdated`: Triggered when pin check metrics are updated (node ID).

## Errors

The pallet defines several error types to handle various failure scenarios:

- `MetricsNotFound`: Raised when the requested metrics cannot be found.

## Additional Types

### SystemInfo Struct

The pallet defines a `SystemInfo` struct to represent system specifications:

- **Fields**:
  - `cpu_cores`: The number of CPU cores allocated.
  - `memory_mb`: The amount of memory allocated in megabytes.
  - `storage_total_mb`: The total storage available in megabytes.
  - `storage_free_mb`: The free storage available in megabytes.
  - `network_bandwidth_mb_s`: The network bandwidth in megabytes per second.
  - `primary_network_interface`: Information about the primary network interface.
  - `disks`: Information about the disks attached to the node.
  - `ipfs_repo_size`: The size of the IPFS repository.
  - `ipfs_storage_max`: The maximum storage for IPFS.
  - `cpu_model`: The model of the CPU.
  - `vm_count`: The number of virtual machines running on the node.
  - `is_sev_enabled`: Indicates whether Secure Encrypted Virtualization (SEV) is enabled.

### NodeMetricsData Struct

The pallet defines a `NodeMetricsData` struct to represent performance metrics for a node:

- **Fields**:
  - `miner_id`: The ID of the miner.
  - `bandwidth_mbps`: The bandwidth in megabytes per second.
  - `current_storage_bytes`: The current storage in bytes.
  - `total_storage_bytes`: The total storage in bytes.
  - `geolocation`: The geolocation of the node.
  - `primary_network_interface`: The primary network interface details.
  - `disks`: Information about the disks.
  - `ipfs_repo_size`: The size of the IPFS repository.
  - `cpu_model`: The model of the CPU.
  - `cpu_cores`: The number of CPU cores.
  - `memory_mb`: The amount of memory allocated in megabytes.
  - `free_memory_mb`: The amount of free memory in megabytes.
  - `vm_count`: The number of virtual machines running on the node.

## Conclusion

The Execution Unit pallet plays a vital role in the Hippius blockchain ecosystem by managing execution tasks and performance metrics for miners. Its design ensures efficient resource utilization and performance tracking, enhancing the overall functionality and interoperability of the network.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.