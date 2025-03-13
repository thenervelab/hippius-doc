# Marketplace Pallet

The Marketplace Pallet is a vital component of the Hippius blockchain ecosystem, designed to facilitate the management of subscriptions, storage requests, and compute resources. It allows users to purchase plans, manage their subscriptions, and handle storage and compute requests efficiently. Users can buy services such as compute and storage, and sudo can mint credits to users accounts, which they can use to consume these services.

## Overview

The Marketplace Pallet provides functionalities to handle the following operations:

- **Subscription Management**: Enables users to purchase and manage subscriptions for storage and compute resources.
- **Storage Requests**: Allows users to request storage for files and manage unpinning operations.
- **Compute Resource Management**: Facilitates the management of compute resources, including charging for usage and handling requests.
- **Pricing Management**: Provides mechanisms to set and update prices for storage and compute plans.
- **Credit Management**: Allows sudo to mint credits to users's accounts, enabling them to use purchased services.

## Key Features

### 1. Subscription Management

The pallet allows users to manage their subscriptions:

#### Function: `add_new_plan`

- **Parameters**:
  - `plan_name`: The name of the subscription plan.
  - `plan_description`: A description of the subscription plan.
  - `plan_technical_description`: Technical details about the plan.
  - `price`: The cost of the subscription plan.
  - `name`: The name associated with the plan.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

#### Function: `purchase_plan`

- **Parameters**:
  - `plan_id`: The unique identifier of the plan to purchase.
  - `location_id`: Optional CDN location for the storage.
  - `selected_image_name`: The name of the OS image to use.
  - `cloud_init_cid`: Optional cloud-init configuration.
  - `pay_for`: Optional account ID for payment.
  - `miner_id`: Optional miner ID for specific requests.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 2. Storage Requests

The pallet manages storage requests for users:

#### Function: `storage_request`

- **Parameters**:
  - `files_input`: A vector of files to be stored.
  - `miner_ids`: Optional specific miner IDs for the request.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

#### Function: `storage_unpin_request`

- **Parameters**:
  - `file_hash`: The hash of the file to unpin.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 3. Compute Resource Management

The pallet handles compute resource requests:

#### Function: `enable_vms_backup`

- **Parameters**: None.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

#### Function: `disable_vms_backup`

- **Parameters**: None.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 4. Pricing Management

The pallet allows for setting and updating prices:

#### Function: `set_price_per_gb`

- **Parameters**:
  - `price`: The new price per GB for storage.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

#### Function: `set_bandwidth_price`

- **Parameters**:
  - `price`: The new price per bandwidth.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

## Storage Structures

The Marketplace Pallet utilizes several storage structures to manage state:

- **Plans**: A storage map that holds subscription plans identified by their unique hash.
- **PricePerGbs**: A storage value that defines the price per GB for storage.
- **PricePerBandwidth**: A storage value that defines the price per bandwidth.
- **UserPlanSubscriptions**: A storage map that tracks user subscriptions by their account ID.
- **UserFileHashes**: A storage map that holds file hashes associated with user accounts.
- **OSDiskImageUrls**: A storage map that stores URLs for OS disk images.
- **Batches**: A storage map for managing user batches.
- **NextBatchId**: A storage value that tracks the next batch ID for user operations.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `CdnLocationAdded`: Triggered when a CDN location is added.
- `PlanPurchased`: Triggered when a user purchases a plan.
- `StorageRequestAdded`: Triggered when a storage request is added.
- `BackupEnabled`: Triggered when backup is enabled for a subscription.
- `BackupDisabled`: Triggered when backup is disabled for a subscription.
- `PricePerGbUpdated`: Triggered when the price per GB is updated.
- `SpecificMinerRequestFeeUpdated`: Triggered when the specific miner request fee is updated.

## Errors

The pallet defines several error types to handle various failure scenarios:

- `NoneValue`: Raised when a value is not found.
- `NotSubscriptionOwner`: Raised when a user attempts to modify a subscription they do not own.
- `InsufficientBalance`: Raised when a user does not have enough balance to complete a transaction.
- `PlanNotFound`: Raised when a requested plan does not exist.
- `StorageRequestNotFound`: Raised when a storage request cannot be found.
- `NodeTypeDisabled`: Raised when a specific node type is disabled.

## Conclusion

The Marketplace Pallet is essential for managing subscriptions, storage requests, and compute resources within the Hippius blockchain ecosystem. Its design ensures efficient handling of user requests, pricing management, and subscription tracking, enhancing the overall functionality and user experience of the network. Additionally, the ability for sudo to mint credits to users' accounts provides flexibility in service consumption.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.