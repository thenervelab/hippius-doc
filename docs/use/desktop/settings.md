---
id: settings
title: App Settings
sidebar_label: App Settings
slug: /use/desktop/settings
description: Manage sync folders, security, notifications, appearance, your API token, and the blockchain RPC endpoint from the Hippius desktop Settings page.
---

import DocAccordion, { DocAccordionItem } from '@site/src/components/DocAccordion';
import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import BgStyledText from '@site/src/components/BgStyledText';

The **Settings** page is organized into sections you can open from the left sidebar: **Sync & Storage**, **Security**, **Notifications**, **Appearance**, **API Token**, and **Customize RPC**. Each section has a short description and an info (ⓘ) tooltip next to its title.

<DocAccordion defaultValue="sync-storage">

## Sync & Storage

<DocAccordionItem value="sync-storage" isFirst> <>
Sync & Storage
</>
<>

    The **Sync & Storage** section lets you set your device name, manage the folders you sync from this device, and sync folders shared from your other devices.

    ### Device Name

    <p>Your device name appears at the top of the section under <strong>Device Name</strong>. By default it matches your computer's name. It's the label other devices see, so you can tell which device a folder was synced from (it's shown on remote folder cards and when choosing a sync destination).</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Sync &amp; Storage</strong>.</li>
      <li>Click <BgStyledText>Edit Name</BgStyledText> under <strong>Device Name</strong>.</li>
      <li>Type a new name (for example, "Work MacBook"), then click <BgStyledText>Save</BgStyledText> (or <BgStyledText>Cancel</BgStyledText> to keep the current one).</li>
    </Ordered>

    ![Sync & Storage settings](/img/desktop/settings/sync-and-storage-settings.png)

    ### Local Sync Folders

    <p>The <strong>Local Sync Folders</strong> section lists every folder you sync from this device. Each folder syncs independently and shows its own status.</p>

    #### Adding a Folder

    <Ordered>
      <li>In <strong>Local Sync Folders</strong>, click <BgStyledText>+ Add Folder</BgStyledText>.</li>
      <li>Choose a folder on your device.</li>
      <li>Confirm to add it. Syncing starts automatically.</li>
    </Ordered>

    <p>Each local folder card shows:</p>
    <Unordered>
      <li>Folder name and a <strong>status badge</strong>: <strong>Syncing</strong> (green), <strong>Paused</strong> (grey), or <strong>Error</strong> (red)</li>
      <li>Total size, file count, and the last-synced time</li>
      <li>The full local path</li>
      <li>A three-dot (⋮) menu of folder actions</li>
    </Unordered>

    <p>If you haven't added anything yet, the section reads "No Folder Syncing Yet — Add a folder to get started with encrypted sync."</p>

    #### Per-Folder Actions

    <p>Click the three-dot (⋮) menu on any local folder card (or right-click the card) for these options:</p>
    <Unordered>
      <li><strong>Browse Contents</strong>: open a browser to inspect the folder's files.</li>
      <li><strong>Pause Sync</strong> / <strong>Resume Sync</strong>: pause syncing for this folder, or resume a paused one. Pausing asks you to confirm first.</li>
      <li><strong>Open in Finder</strong> / <strong>Open in Explorer</strong>: reveal the folder in your operating system's file manager.</li>
      <li><strong>Remove from Sync</strong>: stop syncing this folder. Your local files stay on your device, and remote files remain on the server.</li>
      <li><strong>Delete from Server</strong>: permanently delete all remote files for this folder. You must type the folder name to confirm.</li>
    </Unordered>

    ![Folder menu options](/img/desktop/settings/settings-folder-menu.png)

    :::danger Deleting from Server is permanent
    **Delete from Server** permanently removes all remote files for that folder and cannot be undone. You'll be required to type the exact folder name, then click **Delete Permanently**, to confirm.
    :::

    ![Delete from server confirmation](/img/desktop/settings/settings-delete-server-dialog.png)

    ### Syncing from Other Devices

    <p>Folders you sync on your other devices appear under <strong>Sync from Other Devices</strong>. Each remote folder card shows the folder name, its total size, file count, last-modified date, and the <strong>device</strong> it was synced from. From here you can pull a folder down to this device.</p>

    <Ordered>
      <li>In <strong>Sync from Other Devices</strong>, find the folder you want.</li>
      <li>Open its three-dot (⋮) menu and choose <BgStyledText>Sync to This Device</BgStyledText>.</li>
      <li>In the <strong>Choose Destination</strong> dialog, click <BgStyledText>Choose Destination Folder</BgStyledText> and pick a local location.</li>
      <li>Click <BgStyledText>Start Syncing</BgStyledText> to begin downloading and keeping the folder in sync.</li>
    </Ordered>

    ![Sync destination dialog](/img/desktop/settings/settings-sync-destination-dialog.png)

    <p>The remote folder ⋮ menu also offers <strong>Browse Contents</strong> and <strong>Delete from Server</strong>.</p>

</>
</DocAccordionItem>

{/*
  ───────────────────────────────────────────────────────────────────────
  WALLETS SECTION — hidden while the wallet feature is gated off in the
  desktop app (WALLET_FEATURE_ENABLED = false in app/lib/featureFlags.ts).
  Preserved for future release: to restore, delete this comment wrapper
  (this opening line and the closing line at the bottom of the section),
  and re-add **Wallets** to the sidebar list in the intro paragraph above.
  ───────────────────────────────────────────────────────────────────────

## Wallets

<DocAccordionItem value="wallets">
  <>
  Wallets
  </>
  <>
    <p>The <strong>Wallets</strong> section manages the local wallets stored on this device — "Switch between them, rename, export a backup, or remove ones you no longer use."</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Wallets</strong>.</li>
    </Ordered>

    <p>The table lists each wallet with its <strong>Wallet</strong> name (with an <strong>Active</strong> badge on the current one), full <strong>Address</strong> (with a copy button), and the date it was <strong>Added</strong>. Use <BgStyledText>Create wallet</BgStyledText> or <BgStyledText>Import</BgStyledText> in the header to add more.</p>

    <p>Each row's three-dot (⋮) menu offers <strong>Set as active</strong>, <strong>Copy address</strong>, <strong>View on Hipstats</strong>, <strong>Export backup</strong>, <strong>Rename</strong>, and <strong>Delete</strong>.</p>

    ![Wallet settings](/img/desktop/wallet/wallet-settings.png)

    :::note
    Here you can create, import, export backups, rename, and delete the local wallets stored on this device. Renaming or deleting a wallet here only affects what's stored on this device; the underlying account on Hippius is unchanged. Always export a backup before deleting.
    :::

</>
</DocAccordionItem>

  ───────────────────────────────────────────────────────────────────────
*/}

## Security

<DocAccordionItem value="security">
  <>
  Security
  </>
  <>
    <p>The <strong>Security</strong> section lets you back up your mnemonic seed and set or change your unlock password — "Backup your mnemonic seed and set an unlock password to access your encrypted files on other devices."</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Security</strong>.</li>
    </Ordered>

    ![Security settings tab](/img/desktop/settings/security-settings-tab.png)

    ### Mnemonic Seed Backup

    <p>Your <strong>mnemonic seed</strong> is the only way to restore access to your wallet and encrypted files. Click <BgStyledText>Backup Mnemonic Seed</BgStyledText> to start the backup.</p>

    :::danger Keep your mnemonic key secure
    If you lose your mnemonic seed, you will permanently lose access to your encrypted files. There is no way to recover it.
    :::

    #### Backup Flow

    <p>The backup runs in two steps:</p>

    <Ordered>
      <li><strong>Secure Your Mnemonic Seed</strong>: review the best-practice tips (write it on paper, store it somewhere safe, never share it, keep copies in multiple secure locations, and never store it in email, cloud, or screenshots). Click <BgStyledText>I Understand, Show My Mnemonic Seed</BgStyledText>.</li>
      <li><strong>Your Mnemonic Seed</strong>: your seed phrase is shown (blurred until you click <BgStyledText>Show</BgStyledText>). You can <BgStyledText>Copy</BgStyledText> it (the clipboard is auto-cleared after 30 seconds) or click <BgStyledText>Download Encrypted Backup</BgStyledText> to save a password-protected ZIP. When you're done, click <BgStyledText>I Have Written It Down</BgStyledText>.</li>
    </Ordered>

    :::tip Encrypted backup
    Choosing **Download Encrypted Backup** lets you protect your seed with a password (minimum 8 characters) and save it as a ZIP in your Downloads folder. Keep both the file and that password safe.
    :::

    ### Unlock Password

    <p>Your <strong>unlock password</strong> protects your encrypted files when previewing or downloading them on other devices and on the <a href="https://console.hippius.com">Hippius Console</a>. For how it works, see the <a href="/use/desktop/drive#unlock-password">Unlock Password</a> section in the Drive guide.</p>

    <p>If you haven't set one yet, the row shows <BgStyledText>Set Unlock Password</BgStyledText>. Once it's set, the row reads "Your unlock password is set. You can change it at any time."</p>

    #### Changing Your Unlock Password

    <Ordered>
      <li>Click <BgStyledText>Change Unlock Password</BgStyledText>.</li>
      <li>Enter your <strong>current password</strong>.</li>
      <li>Choose a <strong>new password</strong> (a strength meter helps you pick a strong one) and confirm it.</li>
      <li>Click <BgStyledText>Change password</BgStyledText>.</li>
    </Ordered>

    ![Change unlock password dialog](/img/desktop/change-unlock-password-dialog.png)

    <p>Changing the password re-encrypts the sealed backup on the server. Your mnemonic seed and the files on your desktop app are not affected.</p>

</>
</DocAccordionItem>

## Notifications

<DocAccordionItem value="notifications">
  <>
   Notifications
  </>
  <>
    <p>The <strong>Notification</strong> section controls which updates you receive — "Choose which updates you'd like to receive in your inbox. You're in control—check only the notifications that matter to you."</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Notifications</strong>.</li>
    </Ordered>

    ### Notification Preferences

    <p>Under <strong>Notification Preferences</strong>, each in-app notification type has a checkbox and an <strong>On</strong> / <strong>Off</strong> badge:</p>
    <Unordered>
      <li><strong>Credits</strong>: "Notifications for account credits, including low balance warnings and credit additions."</li>
      <li><strong>Drive</strong>: "Notifications for file operations including sync completion and failures."</li>
    </Unordered>

    ![Notifications screen](/img/desktop/settings/settings-notifications.png)

    ### Email Notification

    <p>The <strong>Email Notification</strong> card depends on how you signed in:</p>
    <Unordered>
      <li>If you signed in with an access key (and haven't linked an email login), it reads "Sign in with Google, GitHub, or Email to manage email notifications."</li>
      <li>If you signed in with Google, GitHub, or Email, a <strong>Receive Email Notifications</strong> toggle appears with sub-options: <strong>Low credit balance alerts</strong>, <strong>Zero balance alerts</strong>, and <strong>Marketing emails &amp; newsletter</strong>.</li>
    </Unordered>

    <p>After changing anything, click <BgStyledText>Save Changes</BgStyledText> (or <BgStyledText>Cancel</BgStyledText> to discard). These buttons stay disabled until you have unsaved changes.</p>

    ![Email notification preferences](/img/desktop/settings/email-preference.png)

</>
</DocAccordionItem>

## Appearance

<DocAccordionItem value="appearance">
  <>
  Appearance
  </>
  <>
    <p>The <strong>Appearance</strong> section controls how Hippius looks on this device — "Personalize how Hippius looks on this device."</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Appearance</strong>.</li>
    </Ordered>

    ### Theme

    <p>Under <strong>Theme</strong>, pick the look you want: <strong>Light</strong>, <strong>Dark</strong>, or <strong>System</strong> to follow your operating system. The change applies right away.</p>

    :::note
    Your theme choice is stored locally, so it only affects this device — your other devices and the <a href="https://console.hippius.com">Hippius Console</a> keep their own setting.
    :::

    ![Appearance screen](/img/desktop/settings/appearance-settings.png)


</>
</DocAccordionItem>

## API Token

<DocAccordionItem value="api-token">
  <>
  API Token
  </>
  <>
    <p>The <strong>API Token</strong> section gives you the token that authenticates API requests to the Hippius platform — "Manage your API token for secure file operations and delegated access."</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>API Token</strong>.</li>
      <li>Under <strong>API Token</strong>, use the eye icon to reveal the token and the copy icon to copy it.</li>
      <li>Use <strong>API Token Usage Example</strong> as a reference: it shows the <code>Authorization: Token &lt;token&gt;</code> header, which you can copy directly.</li>
    </Ordered>

    <p>Include this header in your API requests to access storage control, file upload, and other authenticated endpoints.</p>

    :::warning Keep your API key secure
    Never share your API token with anyone. It provides full access to your account and should be treated like a password.
    :::

    ![API token screen](/img/desktop/settings/settings-api-token.png)

</>
</DocAccordionItem>

## Customize RPC

<DocAccordionItem value="customize-rpc">
  <>
  Customize RPC
  </>
  <>
    <p>The <strong>RPC Setting</strong> section controls which blockchain endpoint the app connects to — "Customize your connection by updating the blockchain RPC endpoint." The default is <code>wss://rpc.hippius.network</code>. A custom endpoint can improve performance in some regions or point at your own node — only use a trusted provider.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Customize RPC</strong>.</li>
      <li>Edit the value in the <strong>RPC Endpoint</strong> field (it must start with <code>ws://</code> or <code>wss://</code>).</li>
      <li>Click <BgStyledText>Save Changes</BgStyledText>. The app verifies the endpoint is reachable before applying it.</li>
      <li>Confirm in the <strong>Confirm RPC Endpoint</strong> dialog by clicking <BgStyledText>Update &amp; Restart</BgStyledText>.</li>
    </Ordered>

    :::note The app restarts
    Changing the RPC endpoint affects your blockchain connection, so the application restarts automatically to apply the change.
    :::

    ![Custom RPC screen](/img/desktop/settings/settings-rpc.png)

</>
</DocAccordionItem>

</DocAccordion>
