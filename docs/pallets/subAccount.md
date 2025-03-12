# SubAccounts Pallet

The SubAccounts pallet is a critical component of the Hippius blockchain ecosystem, designed to manage sub-accounts associated with a main account. This pallet allows users to add and remove sub-accounts, enabling efficient management of multiple accounts for a single user profile.

## Overview

The SubAccounts pallet provides functionalities to handle the following operations:

- **Adding Sub-Accounts**: Users can add sub-accounts to their main account, allowing for more granular control over account management.
- **Removing Sub-Accounts**: Users can remove any sub-account associated with their main account.

### Goals

The pallet is designed to achieve the following objectives:

- Allow the main account or any sub-account of a main account to add or remove sub-accounts.

## Key Features

### 1. Adding Sub-Accounts

Users can add sub-accounts to their main account:

#### Function: `add_sub_account`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user adding the sub-account.
  - `main`: The account ID of the main account to which the sub-account will be added.
  - `new_sub_account`: The account ID of the new sub-account to be added.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

### 2. Removing Sub-Accounts

Users can remove sub-accounts from their main account:

#### Function: `remove_sub_account`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user removing the sub-account.
  - `main`: The account ID of the main account from which the sub-account will be removed.
  - `sub_account_to_remove`: The account ID of the sub-account to be removed.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

## Storage Structures

The SubAccounts pallet utilizes several storage structures to manage state:

- **SubAccount**: A mapping of user account IDs to their respective main account IDs.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `SubAccountAdded`: Triggered when a sub-account is successfully added (main account, sub-account).
- `SubAccountRemoved`: Triggered when a sub-account is successfully removed (main account, sub-account).

## Errors

The pallet defines several error types to handle various failure scenarios:

- `NoSubAccount`: Raised when the sender is not a sub-account.
- `NotAllowed`: Raised when the sender is not allowed to perform an action on the specified main account.
- `NoAccountsLeft`: Raised when attempting to remove the last sub-account associated with a main account.
- `AlreadySubAccount`: Raised when attempting to add a sub-account that already exists.

## Conclusion

The SubAccounts pallet plays a vital role in the Hippius blockchain ecosystem by enabling efficient management of sub-accounts. Its design allows users to easily add or remove sub-accounts, ensuring a flexible and user-friendly experience.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.