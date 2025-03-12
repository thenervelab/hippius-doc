# Notifications Pallet

The Notifications pallet is an essential component of the Hippius blockchain ecosystem, designed to manage notifications for users. This pallet facilitates the sending, reading, and management of notifications, ensuring users are informed about important events and updates.

## Overview

The Notifications pallet provides functionalities to handle the following operations:

- **Sending Notifications**: Users can send notifications to other users, which can include important information or alerts.
- **Marking Notifications as Read**: Users can mark notifications as read to manage their notification lists.
- **Managing Banned Accounts**: The pallet allows for banning accounts that may misuse the notification system.

## Key Features

### 1. Sending Notifications

Users can send notifications to other users:

#### Function: `send_notification`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user sending the notification.
  - `recipient`: The account ID of the recipient.
  - `block_to_send`: The block number when the notification should be sent.
  - `recurrence`: A boolean indicating if the notification is recurring.
  - `starting_recurrence`: An optional block number for when the recurrence starts.
  - `frequency`: An optional block number indicating the frequency of recurrence.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

### 2. Marking Notifications as Read

Users can mark notifications as read:

#### Function: `mark_as_read`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user marking the notification as read.
  - `index`: The index of the notification to mark as read.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

### 3. Banning Accounts

The pallet allows for banning accounts:

#### Function: `ban_account`

- **Parameters**:
  - `origin`: The origin of the transaction, representing the user performing the ban (only root can ban).
  - `account`: The account ID of the account to be banned.

- **Returns**: A `DispatchResultWithPostInfo` indicating success or failure of the operation.

## Storage Structures

The Notifications pallet utilizes several storage structures to manage state:

- **Notifications**: A mapping of user account IDs to their respective notifications.
- **BannedAccounts**: A mapping of banned account IDs, preventing them from sending notifications.
- **LastCallTime**: A mapping of user account IDs to the last time they sent a notification, used for cooldown management.

## Events

The pallet emits several events to notify the system and users about significant actions:

- `NotificationSent`: Triggered when a notification is successfully sent (sender, recipient, block number).
- `NotificationRead`: Triggered when a notification is marked as read (recipient, index).
- `SubscriptionHasEnded`: Triggered when a subscription ends (recipient, subscription ID, expiration block number).
- `SubscriptionEndingSoon`: Triggered when a subscription is about to end (recipient, subscription ID, expiration block number).
- `AccountBanned`: Triggered when an account is banned.

## Errors

The pallet defines several error types to handle various failure scenarios:

- `NoNotifications`: Raised when there are no notifications found for the user.
- `InvalidNotificationIndex`: Raised when the provided notification index is invalid.
- `CooldownNotElapsed`: Raised when the cooldown period has not elapsed for sending notifications.
- `AccountBanned`: Raised when an action is attempted by a banned account.

## Conclusion

The Notifications pallet plays a vital role in the Hippius blockchain ecosystem by enabling efficient management of user notifications. Its design allows for secure sending, reading, and banning of notifications, ensuring a robust and user-friendly experience.

For further information, please refer to the related pallets and documentation within the Hippius ecosystem.