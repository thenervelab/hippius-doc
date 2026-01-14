# Hippius Pallets

This document provides an overview of the custom pallets integrated into TheBrain runtime. Each pallet serves a specific purpose and contributes to the overall functionality of the blockchain.

## 1. AlphaBridge

- **Description**: Manages the minting and burning of alpha tokens. It includes logic for confirming mint requests, handling burn requests, and maintaining a record of required confirmations.

## 2. Credits

- **Description**: Handles user credits within the system. Users can convert credits to alpha and vice versa, facilitating a seamless interaction between credits and alpha tokens.

## 3. Rankings

- **Description**: Manages the ranking system for miners based on various criteria. It integrates with the staking pallet to reward users based on their contributions.

## 4. Marketplace

- **Description**: Facilitates the buying and selling of compute packages and storage pin requests within the blockchain ecosystem. The Marketplace pallet provides users with a platform to engage in transactions, manage their resources, and leverage referral systems.

## 5. Registration

- **Description**: Manages Node registrations within the system. It ensures sommth registration process for nodes.

## 6. IPFS Pin

- **Description**: Integrates with IPFS to manage and pin user data, ensuring that important files remain accessible and are not lost over time. It handle Pin , Unpin Operations

## 7. ExecutionUnit

- **Description**: Manages the assignment of storage and compute requests to the appropriate miners based on their specifications and capabilities. This pallet ensures that resources are allocated efficiently and effectively within the blockchain ecosystem.

## 8. Backup

- **Description**: Provides backup functionalities for critical data within the system, ensuring data integrity and availability.

## 9. ContainerRegistry

- **Description**: Manages the registration and deployment of containers within the ecosystem, facilitating a microservices architecture.

## 10. Storage (S3 Pallet)

- **Description**: Manages storage solutions for user data on S3, ensuring efficient data handling, retrieval, and user bandwidth management. This pallet allows users to create and manage storage buckets, track their sizes, and monitor bandwidth usage.

## 11. Compute Pallet

- **Description**: Manages compute resources within the blockchain ecosystem, allowing users to create, manage, and charge for compute subscriptions. This pallet integrates with other components to facilitate the execution of compute tasks and resource allocation.

## 12. PalletIp

- **Description**: Manages IP-related functionalities within the blockchain ecosystem. This pallet provides mechanisms for handling IP addresses, ensuring that network interactions are properly managed and secured.

## 13. Bittensor

- **Description**: Facilitates the integration with the Bittensor network, allowing our blockchain to connect and interact with its decentralized machine learning ecosystem. This pallet is responsible for submitting the weights of all miners that are also available on Bittensor.

## 14. Metagraph

- **Description**: Manages interactions with the Bittensor network to fetch unique identifiers (UIDs) and dividends of miners. This pallet plays a crucial role in ensuring that our blockchain can retrieve and utilize relevant data from the Bittensor ecosystem.

## 15. SubAccount

- **Description**: Manages sub-accounts within the ecosystem, allowing users to create and manage multiple accounts under a single primary account. This pallet enhances user flexibility and organization.

## 16. Notifications

- **Description**: Handles notifications within the blockchain ecosystem, allowing users to receive updates on important events, transactions, and account activities. This pallet enhances user engagement and awareness.

## 17. AccountProfile

- **Description**: Manages user account profiles within the ecosystem, allowing users to create and update their profiles with relevant information. This pallet enhances user identity and personalization.

## 18. Utils

- **Description**: Provides utility functions and helper methods that are commonly used across various pallets. This pallet enhances code reusability and simplifies development.

## Conclusion

These custom pallets enhance the functionality of TheBrain runtime, providing a robust framework for managing tokens, user interactions, and data storage. Each pallet is designed to work seamlessly with others, contributing to the overall efficiency and usability of the system.
