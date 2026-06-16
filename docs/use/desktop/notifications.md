---
id: notifications
title: Notifications
sidebar_label: Notifications
slug: /use/desktop/notifications
description: Stay on top of activity in Hippius Desktop — review drive and credit notifications from the header bell or the Notifications Hub, open a notification for full details, and choose which updates you receive.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

## Introduction

Notifications keep you informed about what's happening in your account — files syncing to the Hippius network and changes to your credits. Every notification is stored locally on your device so you can review it at any time.

Notifications are grouped into two categories:

<Unordered>
  <li><strong>Drive</strong> — file activity such as uploads, downloads, and deletions across your sync folders.</li>
  <li><strong>Credits</strong> — changes to your account credits and balance.</li>
</Unordered>

You decide which of these categories you want to receive — see [Notification Settings](#notification-settings).



## Open Notifications

All notifications are accessed from the **bell icon** in the top right of the app — there is no Notifications entry in the left sidebar.

### The notifications dropdown

Click the **bell icon** to open the notifications dropdown. A badge on the bell shows your number of unread notifications.

<Ordered>
  <li>Use the category dropdown in the top right of the panel to filter by <BgStyledText>All</BgStyledText>, <BgStyledText>Drive</BgStyledText>, or <BgStyledText>Credits</BgStyledText>.</li>
  <li>Click any notification to open it on the full Notifications page.</li>
  <li>Click <BgStyledText>View More</BgStyledText> at the bottom to open the Notifications Hub.</li>
</Ordered>

![Notifications dropdown from the header bell](/img/desktop/notifications/notifications-dropdown.png)

### The Notifications Hub

Click <BgStyledText>View More</BgStyledText> at the bottom of the dropdown to open the full **Notifications Hub**. The page is split into a list of notifications on the left and a details panel on the right.

![Notifications Hub page](/img/desktop/notifications/notifications-hub.png)

## Filter and Manage Notifications

The toolbar at the top of the Notifications Hub gives you several controls:

<Unordered>
  <li><strong>Category tabs</strong> — switch between <BgStyledText>All</BgStyledText> and each enabled category (Drive, Credits).</li>
  <li><strong>All / Unread toggle</strong> — show every notification or only the ones you haven't read yet.</li>
  <li><strong>Mark all as read</strong> — clear the unread state for everything in the current view.</li>
  <li><strong>Clear all</strong> — permanently delete every notification after a confirmation prompt.</li>
  <li><strong>Notifications Settings</strong> — open the settings dialog to choose which categories you receive.</li>
</Unordered>

## View Notification Details

Select a notification from the list to open it in the details panel on the right.

<Unordered>
  <li><strong>Drive</strong> notifications show a summary of how many files were uploaded, downloaded, or deleted, along with a list of each file and its size.</li>
  <li>Use <BgStyledText>Mark as read</BgStyledText> / <BgStyledText>Mark as unread</BgStyledText> to change a notification's status.</li>
  <li>Open the three dot menu (⋮) in the top right of the panel to mark the notification as read/unread or <BgStyledText>Delete this notification</BgStyledText>.</li>
</Unordered>

![Notification details panel](/img/desktop/notifications/notification-details.png)


## Notification Settings {#notification-settings}

You choose which notifications reach your inbox. On the Notifications Hub, click the <BgStyledText>Notifications Settings</BgStyledText> button (top right) to open the settings dialog:

<Ordered>
  <li>Tick the categories you want to receive — <BgStyledText>Drive</BgStyledText> and <BgStyledText>Credits</BgStyledText>.</li>
  <li>Untick any category you'd like to mute.</li>
  <li>Click <BgStyledText>Save Changes</BgStyledText>.</li>
</Ordered>

The same preferences are also available in the **Notifications** section of the [Settings page](/use/desktop/settings#notifications), which additionally includes email notification options.

Only enabled categories appear as tabs in the dropdown and on the Notifications Hub. If you haven't enabled any categories, the Hub and the bell dropdown prompt you to turn them on from settings.

![Notifications settings dialog](/img/desktop/notifications/notifications-settings.png)
