# Credits Pallet

The Credits pallet is an essential component of the Hippius blockchain ecosystem, designed to manage user credits efficiently. This pallet facilitates the minting, burning, and referral systems associated with user credits, enabling seamless interactions within the ecosystem.

## Overview

The Credits pallet provides functionalities to handle the following operations:

- **Minting Credits**: Users can mint credits, which can be used for various transactions within the ecosystem.
- **Burning Credits**: Users can burn their credits, effectively removing them from circulation.
- **Referral System**: Users can create referral codes that allow them to earn rewards when others use their codes.

## Key Features

### 1. Minting Credits

The minting process involves the following steps:

- **Request Submission**: Authorities submit a request to mint a specified amount of credits for a user.
- **Credit Allocation**: Upon approval, the specified amount of credits is added to the user’s account.

#### Function: `mint`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the authority initiating the mint.
  - `who`: The account ID of the user receiving the minted credits.
  - `amount`: The amount of credits to mint.
  - `code`: An optional referral code associated with the minting.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 2. Burning Credits

The burning process allows users to remove credits from circulation:

- **Request Initiation**: Authorities can initiate a burn request for a specified amount of credits.
- **Credit Removal**: The specified amount of credits is deducted from the user’s account.

#### Function: `burn`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the authority initiating the burn.
  - `who`: The account ID of the user whose credits are being burned.
  - `amount`: The amount of credits to burn.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 3. Referral System

The referral system allows users to create unique referral codes that can be used by others to earn rewards.

#### Function: `create_referral_code`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user creating the referral code.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

### 4. Locking Credits

Users can lock their credits for a specified period, preventing them from being spent until the lock period expires.

#### Function: `set_lock_period`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the authority setting the lock period.
  - `start_block`: The block number at which the lock period starts.
  - `end_block`: The block number at which the lock period ends.

- **Returns**: A `DispatchResult` indicating success or failure of the operation.

## Storage Structures

The Credits pallet utilizes several storage structures to manage state:

- **FreeCredits**: A mapping of user account IDs to their respective free credit balances.
- **TotalCreditsPurchased**: A storage value tracking the total credits minted across the system.
- **ReferralCodes**: A mapping of referral codes to the corresponding user accounts.
- **TotalReferralCodes**: A storage value tracking the total number of referral codes created.
- **TotalReferralRewards**: A storage value tracking the total referral rewards earned by users.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `MintedAccountCredits`: Triggered when credits are successfully minted for a user.
- `BurnedAccountCredits`: Triggered when credits are successfully burned.
- `AuthorityAdded` and `AuthorityRemoved`: Triggered when authorities are added or removed from the system.
- `ReferralDiscountApplied`: Triggered when a referral discount is applied to a user.

## Errors

The pallet defines several error types to handle various failure scenarios:

- `InsufficientFreeCredits`: Raised when a user tries to burn more credits than they have.
- `AuthorityAlreadyExists`: Raised when attempting to add an authority that already exists.
- `InvalidReferralCode`: Raised when a provided referral code is not valid.
- `NoActiveLockPeriod`: Raised when there is no active lock period set.

## Conclusion

The Credits pallet plays a vital role in the Hippius blockchain ecosystem by enabling efficient management of user credits. Its design allows for secure minting, burning, and referral functionalities, ensuring a robust and user-friendly experience.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.