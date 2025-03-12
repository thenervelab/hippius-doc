# Rankings Pallet

The Rankings pallet is a crucial component of the Hippius blockchain ecosystem, designed to manage and store rankings for miners based on various performance metrics. This pallet calculates and updates rankings for different types of miners, including compute miners and storage miners, based on their contributions to the network.

## Overview

The Rankings pallet provides functionalities to handle the following operations:

- **Ranking Calculation**: Computes rankings for miners based on their performance metrics.
- **Reward Distribution**: Distributes rewards to miners based on their rankings.
- **Historical Tracking**: Maintains records of rewards distributed to miners over time.

## Key Features

### 1. Updating Rankings

Users can update the rankings of miners based on their performance metrics:

#### Function: `update_rankings`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user updating the rankings.
  - `all_nodes_ss58`: A list of SS58-encoded node identifiers.
  - `weights`: A list of weights corresponding to each node.
  - `node_ids`: A list of node identifiers.
  - `node_types`: A list of node types.
  - `_block_number`: The current block number.
  - `_ranking_instance_id`: The instance ID for the ranking.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 2. Updating Rank Distribution Limit

Users can update the limit for rank distribution:

#### Function: `update_rank_distribution_limit`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user updating the limit.
  - `new_limit`: The new limit for rank distribution.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

## Storage Structures

The Rankings pallet utilizes several storage structures to manage state:

- **RankDistributionLimit**: A storage value that keeps track of the limit for rank distribution.
- **Rankings**: A mapping of node IDs to their corresponding rankings.
- **RankedList**: A storage value that maintains a sorted list of node rankings.
- **LastGlobalUpdate**: A storage value that records the last global update block number.
- **RewardsRecord**: A mapping that tracks historical reward records for each node.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `RankingsUpdated`: Triggered when the rankings are updated (count of updated rankings).
- `RewardDistributed`: Triggered when a reward is distributed to a miner (account, amount).
- `RankDistributionLimitUpdated`: Triggered when the rank distribution limit is updated (new limit).

## Errors

The pallet defines several error types to handle various failure scenarios:

- `NoneValue`: Raised when a value is `None`.
- `StorageOverflow`: Raised when a storage operation exceeds its limits.
- `InvalidInput`: Raised when an invalid input is provided.
- `ConversionError`: Raised during conversion errors.
- `NoSignerAvailable`: Raised when no signer is available to submit the transaction.
- `CannotAcquireLock`: Raised when unable to acquire a lock for updating rankings.

## Additional Types

### NodeRankings Struct

The pallet defines a `NodeRankings` struct to represent the ranking of a node:

- **Fields**:
  - `rank`: The rank of the node (position in the sorted list).
  - `node_id`: The identifier of the node.
  - `node_ss58_address`: The SS58 address of the node.
  - `node_type`: The type of the node (e.g., ComputeMiner, StorageMiner).
  - `weight`: The weight of the node, representing its contribution.
  - `last_updated`: The timestamp of the last weight update.
  - `is_active`: Indicates whether the node is active.

### RewardsRecordDetails Struct

The pallet defines a `RewardsRecordDetails` struct to represent details of rewards for a node:

- **Fields**:
  - `node_types`: The type of the node.
  - `weight`: The weight associated with the reward.
  - `amount`: The amount of reward distributed.
  - `account`: The account associated with the reward.
  - `block_number`: The block number at which the reward was distributed.

## Conclusion

The Rankings pallet plays a vital role in the Hippius blockchain ecosystem by managing and storing miners' rankings. Its design allows for efficient ranking calculations based on various metrics, ensuring a fair and transparent reward distribution system for miners.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.