# IP Pallet

The IP pallet is a vital component of the Hippius blockchain ecosystem, designed to manage the allocation and tracking of IP addresses for various roles, including virtual machines (VMs), clients, and storage miners. This pallet ensures efficient IP management, allowing for seamless interactions within the ecosystem.

## Overview

The IP pallet provides functionalities to handle the following operations:

- **Assigning IP Addresses**: The pallet allows for the assignment of IP addresses to different roles, such as VMs and clients.
- **Releasing IP Addresses**: IP addresses can be returned to the available pool after they are no longer in use.
- **Tracking IP Usage**: The pallet keeps track of which IP addresses are assigned to which roles, ensuring efficient resource management.

## Key Features

### 1. Assigning IP Addresses

The process of assigning IP addresses involves the following steps:

- **Request Submission**: Authorities submit a request to assign a specific IP address to a VM or client.
- **IP Allocation**: Upon approval, the specified IP address is allocated to the requested role.

#### Function: `assign_ip_to_vm`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the authority initiating the assignment.
  - `vm_uuid`: The unique identifier of the VM.
  - `ip`: The IP address to be assigned.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

#### Function: `assign_ip_to_client`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the authority initiating the assignment.
  - `client_id`: The account ID of the client.
  - `ip`: The IP address to be assigned.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 2. Releasing IP Addresses

The process of releasing IP addresses allows for the removal of an IP from active use:

#### Function: `remove_available_vm_ip`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the authority initiating the removal.
  - `ip`: The IP address to be released.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 3. Tracking IP Usage

The pallet maintains several storage structures to track the allocation and availability of IP addresses:

- **AvailableHypervisorIps**: A list of IP addresses available for hypervisors.
- **AvailableClientIps**: A list of IP addresses available for clients.
- **AvailableStorageMinerIps**: A list of IP addresses available for storage miners.
- **VmAvailableIps**: A list of IP addresses available for VMs.
- **AssignedVmIps**: A list of IP addresses currently assigned to VMs.
- **AssignedClientIps**: A list of IP addresses currently assigned to clients.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `IpAssigned`: Triggered when an IP address is successfully assigned to a role.
- `IpReturned`: Triggered when an IP address is released back to the available pool.
- `IpAdded`: Triggered when a new IP address is added to the available pool.
- `IpRemoved`: Triggered when an IP address is removed from the available pool.

## Errors

The pallet defines several error types to handle various failure scenarios:

- `NoAvailableIp`: Raised when there are no available IP addresses to assign.
- `VmAlreadyHasIp`: Raised when a VM is already assigned an IP address.
- `VmHasNoIp`: Raised when a VM does not have an assigned IP address.
- `IpAlreadyExists`: Raised when attempting to add an IP address that already exists.

## Conclusion

The IP pallet plays a crucial role in the Hippius blockchain ecosystem by enabling efficient management of IP addresses. Its design allows for secure assignment, release, and tracking of IP addresses, ensuring a robust and user-friendly experience.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.