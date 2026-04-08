---
id: settings
title: App Settings
sidebar_label: App Settings
slug: /use/desktop/settings
description: 5
---

import DocAccordion, { DocAccordionItem } from '@site/src/components/DocAccordion';
import Ordered from '@site/src/components/Ordered';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import BgStyledText from '@site/src/components/BgStyledText';

<DocAccordion defaultValue="sync-storage">

## Sync & Storage

<DocAccordionItem value="sync-storage" isFirst> <>
Sync & Storage
</>
<>

    The Sync & Storage settings let you manage your device name, all your synced folders, add new ones, sync folders from other devices, and control per-folder sync behavior.

    ### Device Name

    <p>Your device name is shown at the top of the Sync & Storage section. By default, it is set to your computer's actual device name. This name is displayed on remote folder cards so you can identify which device a folder was synced from.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>In the <strong>Device Name</strong> section, click the edit icon next to your current device name.</li>
      <li>Enter a new name and confirm to save.</li>
    </Ordered>

    ![Sync & Storage settings](/img/desktop/settings/sync-and-storage-settings.png)

    ### Managing Multiple Folders

    <p>You can sync multiple folders simultaneously. Each folder syncs independently and shows its own status.</p>

    #### Adding a Local Folder

    <Ordered>
      <li>In the <strong>Local Folders</strong> section, click the <BgStyledText>Add Folder</BgStyledText> button.</li>
      <li>Select a folder from your device.</li>
      <li>Click <BgStyledText>Add Folder</BgStyledText> to confirm.</li>
      <li>Syncing starts automatically for the new folder.</li>
    </Ordered>


    <p>Each folder card shows:</p>
    <ul>
      <li>Folder name and full path</li>
      <li>Status badge: <strong>Syncing</strong> (green), <strong>Paused</strong> (grey), or <strong>Error</strong> (red)</li>
      <li>File count and last synced time</li>
      <li>A menu with folder actions</li>
    </ul>

    #### Per-Folder Actions

    <p>Click the three-dot menu on any folder card to access these options:</p>
    <ul>
      <li><strong>Pause Sync</strong>: Temporarily pause syncing for this folder. A confirmation dialog will appear.</li>
      <li><strong>Resume Syncing</strong>: Resume syncing for a paused folder.</li>
      <li><strong>Remove Folder</strong>: Remove the folder from sync tracking. Your local files stay on your device, and remote files remain on the server.</li>
      <li><strong>Delete from Server</strong>: Permanently delete all remote files for this folder. You must type the folder name to confirm this action.</li>
    </ul>

    ![Folder menu options](/img/desktop/settings/settings-folder-menu.png)

    :::danger Deleting from Server
    The **Delete from Server** option permanently removes all remote files for that folder. This action cannot be undone. You will be required to type the exact folder name to confirm.
    :::

    ![Delete from server confirmation](/img/desktop/settings/settings-delete-server-dialog.png)

    ### Syncing from Other Devices

    <p>If you have synced folders from other devices, they appear in the <strong>Remote Folders</strong> section. You can sync them to your current device.</p>

    <Ordered>
      <li>In the <strong>Remote Folders</strong> section, find the folder you want to sync.</li>
      <li>Click the three-dot menu and select <BgStyledText>Sync to This Device</BgStyledText>.</li>
      <li>Choose a destination folder on your local device.</li>
      <li>Click <BgStyledText>Start Syncing</BgStyledText> to begin downloading and syncing.</li>
    </Ordered>


    ![Sync destination dialog](/img/desktop/settings/settings-sync-destination-dialog.png)

    <p>Each remote folder card shows:</p>
    <ul>
      <li>Folder name and the device it was synced from</li>
      <li>File count, total size, and last modified date</li>
    </ul>

</>
</DocAccordionItem>

## Recovery Phrase

<DocAccordionItem value="recovery-phrase">
  <>
  Recovery Phrase
  </>
  <>
    <p>Your recovery phrase (12-word mnemonic) is the only way to restore access to your encrypted sync folders. Back it up securely and never share it with anyone.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click on <BgStyledIconWithText text="Recovery Phrase" icon="KeySquare" />.</li>
      <li>Click <BgStyledText>Backup Recovery Phrase</BgStyledText> to start the backup process.</li>
    </Ordered>

    ![Recovery phrase settings](/img/desktop/settings/settings-recovery-phrase.png)

    ### Backup Flow

    <p>The backup process guides you through four steps:</p>

    <Ordered>
      <li><strong>Security best practices</strong>: Review tips for safely storing your phrase (write on paper, use a secure location, never share, keep multiple copies). Click <BgStyledText>I Understand, Show My Recovery Phrase</BgStyledText> to continue.</li>
      <li><strong>View your phrase</strong>: Your 12-word recovery phrase is displayed (blurred by default). Click <strong>Show</strong> to reveal it. You can copy it to the clipboard or download an encrypted backup as a password-protected ZIP file.</li>
      <li><strong>Verify your phrase</strong>: You will be asked to enter 3 randomly selected words from your phrase to confirm you have backed it up correctly.</li>
      <li><strong>Confirmation</strong>: A success screen confirms your phrase is secured.</li>
    </Ordered>

    :::danger Important
    If you lose your recovery phrase, you will permanently lose access to your encrypted files. There is no way to recover it.
    :::

    :::tip Encrypted Backup
    You can download your recovery phrase as a password-protected ZIP file for additional security. Set a strong password (minimum 8 characters) when prompted.
    :::

</>
</DocAccordionItem>

## API Token

<DocAccordionItem value="api-token">
  <>
  API Token
  </>
  <>
    <p>Your api token authenticates API requests to the Hippius platform.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click on <BgStyledIconWithText text="API Token" icon="KeySquare" />.</li>
      <li>Copy the token using the copy icon.</li>
      <li>Use the <strong>Token Usage</strong> field as a reference for the Authorization header.</li>
    </Ordered>

    :::warning Keep your master token secure
    Anyone with this token can access your account. Treat it like a password.
    :::

    ![Master token screen](/img/desktop/settings/settings-api-token.png)

</>
</DocAccordionItem>

## Notifications

<DocAccordionItem value="notifications">
  <>
   Notifications
  </>
  <>
    <p>Control which in-app notifications you receive and manage email preferences.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click on <BgStyledIconWithText text="Notifications" icon="Notification" />.</li>
      <li>Select the notification types you want, such as <strong>Credits</strong> and <strong>Files</strong>.</li>
      <li>Click <BgStyledText>Save</BgStyledText>.</li>
    </Ordered>

    ![Notifications screen](/img/desktop/settings/settings-notifications.png)

    ### Email Preferences

    <Ordered>
      <li>Click <BgStyledText>Email Notifications</BgStyledText> in the notifications panel.</li>
      <li>Toggle <strong>Receive Email Notifications</strong> on or off.</li>
      <li>Select the email types you want: <strong>Low credit balance alerts</strong>, <strong>Zero balance alerts</strong>, and <strong>Marketing emails & newsletter</strong>.</li>
      <li>Click <BgStyledText>Save Changes</BgStyledText>.</li>
    </Ordered>

    ![Email notification preferences](/img/desktop/settings/email-preference.png)

</>
</DocAccordionItem>

## Customize RPC

<DocAccordionItem value="customize-rpc">
  <>
  Customize RPC
  </>
  <>
    <p>The RPC endpoint determines which blockchain network you connect to. By default, we use wss://rpc.hippius.network. Custom endpoints can provide better performance in specific regions or enable connection to test networks. Always ensure you are using a trusted RPC provider for security.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click <BgStyledIconWithText text="Customize RPC" icon="Box" />.</li>
      <li>Click <BgStyledText>Edit RPC</BgStyledText>.</li>
      <li>Save the edited RPC.</li>
    </Ordered>

    ![Custom RPC screen](/img/desktop/settings/settings-rpc.png)

</>
</DocAccordionItem>

## VPN Settings

<DocAccordionItem value="vpn-settings">
  <>
  VPN Settings
  </>
  <>
    <p>Configure how the VPN behaves when the desktop app starts.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click on <BgStyledIconWithText text="VPN Settings" icon="ShieldTick" />.</li>
      <li>Toggle <strong>Autoconnect on Startup</strong> to enable or disable automatic VPN connection.</li>
      <li>Click <BgStyledText>Update</BgStyledText>.</li>
    </Ordered>

    ![VPN settings screen](/img/desktop/settings/vpn-settings.png)

</>
</DocAccordionItem>

</DocAccordion>
