# AlphaBridge Pallet

The AlphaBridge pallet is a crucial component of the Hippius blockchain ecosystem, designed to manage the minting and burning of alpha tokens. This pallet facilitates seamless interactions between different blockchain networks, allowing users to mint new tokens and burn existing ones as needed.

## Overview

The AlphaBridge pallet provides functionalities to handle the following operations:

- **Minting Tokens**: Users can mint alpha tokens by confirming mint requests. This process ensures that the tokens are generated in a controlled manner, requiring validation from designated authorities.
- **Burning Tokens**: Users can initiate burn requests to remove alpha tokens from circulation. This feature is essential for maintaining the token supply and ensuring the integrity of the ecosystem.

## Key Features

### 1. Minting Alpha Tokens

The minting process involves the following steps:

- **Request Submission**: Users submit a mint request along with necessary proof (e.g., block hash and event index).
- **Authority Confirmation**: Designated operators confirm the mint request, ensuring that it meets the required criteria.
- **Token Generation**: Upon confirmation, the specified amount of alpha tokens is minted and credited to the user's account.

#### Function: `confirm_mint_alpha`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user initiating the mint.
  - `amount`: The amount of alpha tokens to mint.
  - `user`: The account ID of the user receiving the minted tokens.
  - `proof`: A vector containing proof data for the mint request.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 2. Burning Alpha Tokens

The burning process allows users to remove tokens from circulation:

- **Request Initiation**: Users can initiate a burn request by specifying the amount of tokens to burn and their associated account details.
- **Pending Status**: The burn request is marked as pending until it is confirmed by the authorities.
- **Finalization**: Once confirmed, the tokens are permanently removed from the user's balance.

#### Function: `burn_alpha_for_bridge`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user initiating the burn.
  - `amount`: The amount of alpha tokens to burn.
  - `bittensor_coldkey`: The cold key associated with the Bittensor network.
  - `user`: The account ID of the user burning the tokens.
  - `nonce`: A unique identifier for the burn request.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

## Storage Structures

The AlphaBridge pallet utilizes several storage structures to manage state:

- **AlphaBalances**: A mapping of user account IDs to their respective alpha token balances.
- **PendingMints**: A mapping to track mint requests that are pending confirmation.
- **PendingBurns**: A mapping to track burn requests that are pending confirmation.
- **Authorities**: A list of authorized accounts that can confirm mint and burn requests.
- **MinRequiredSignatures**: A value indicating the minimum number of confirmations required for minting and burning operations.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `AlphaMintPending`: Triggered when a mint request is submitted and is pending confirmation.
- `AlphaMinted`: Triggered when alpha tokens are successfully minted.
- `AlphaBurnPending`: Triggered when a burn request is submitted and is pending confirmation.
- `AlphaBurned`: Triggered when alpha tokens are successfully burned.
- `AuthorityAdded` and `AuthorityRemoved`: Triggered when authorities are added or removed from the system.
- `MinRequiredSignaturesUpdated`: Triggered when the minimum required signatures for operations are updated.

## Errors

The pallet defines several error types to handle various failure scenarios:

- `Unauthorized`: Raised when an unauthorized account attempts to perform an operation.
- `DoubleSpendDetected`: Raised if a mint request is confirmed more than once.
- `InsufficientBalance`: Raised when a user tries to burn more tokens than they hold.
- `NotEnoughConfirmations`: Raised when the required number of confirmations for a mint or burn request is not met.

## Conclusion

The AlphaBridge pallet plays a vital role in the Hippius blockchain ecosystem by enabling efficient and secure minting and burning of alpha tokens. Its design ensures that only authorized operators can perform critical operations, maintaining the integrity and stability of the token economy.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.