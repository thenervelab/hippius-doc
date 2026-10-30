---
id: settings
title: App Settings
sidebar_label: App Settings
slug: /use/desktop/settings
description: Manage sync folders, screenshot and recording shortcuts, security, notifications, appearance, your API token, and the blockchain RPC endpoint from the Hippius desktop Settings page.
---

import DocAccordion, { DocAccordionItem } from '@site/src/components/DocAccordion';
import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

The **Settings** page is organized into sections you can open from the left sidebar: **Sync & Storage**, **Screenshots & Recording**, **Security**, **Notifications**, **Billing**, **Appearance**, **Updates**, and **Customize RPC**. Screenshots &amp; Recording only shows on a computer that can take captures. Billing has [its own page](/use/desktop/billing). Each section has a short description and an info (ⓘ) tooltip next to its title.

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

    <Screenshot src="/img/desktop/settings/sync-and-storage-settings.png" alt="Sync & Storage settings" dark />

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

    <p>If you haven't added anything yet, the section reads "No Folder Syncing Yet", with a line underneath: "Add a folder to get started with encrypted sync."</p>

    #### Per-Folder Actions

    <p>Click the three-dot (⋮) menu on any local folder card (or right-click the card) for these options:</p>
    <Unordered>
      <li><strong>Browse Contents</strong>: open a browser to inspect the folder's files.</li>
      <li><strong>Pause Sync</strong> / <strong>Resume Sync</strong>: pause syncing for this folder, or resume a paused one. Pausing asks you to confirm first.</li>
      <li><strong>Open in Finder</strong> / <strong>Open in Explorer</strong>: reveal the folder in your operating system's file manager.</li>
      <li><strong>Remove from Sync</strong>: stop syncing this folder. Your local files stay on your device, and remote files remain on the server.</li>
      <li><strong>Delete from Server</strong>: permanently delete all remote files for this folder. You must type the folder name to confirm.</li>
    </Unordered>

    <Screenshot src="/img/desktop/settings/settings-folder-menu.png" alt="Folder menu options" dark />

    :::danger Deleting from Server is permanent
    **Delete from Server** permanently removes all remote files for that folder and cannot be undone. You'll be required to type the exact folder name, then click **Delete Permanently**, to confirm.
    :::

    <Screenshot src="/img/desktop/settings/settings-delete-server-dialog.png" alt="Delete from server confirmation" dark />

    ### Syncing from Other Devices

    <p>Folders you sync on your other devices appear under <strong>Sync from Other Devices</strong>. Each remote folder card shows the folder name, its total size, file count, last-modified date, and the <strong>device</strong> it was synced from. From here you can pull a folder down to this device.</p>

    <Ordered>
      <li>In <strong>Sync from Other Devices</strong>, find the folder you want.</li>
      <li>Open its three-dot (⋮) menu and choose <BgStyledText>Sync to This Device</BgStyledText>.</li>
      <li>In the <strong>Choose Destination</strong> dialog, click <BgStyledText>Choose Destination Folder</BgStyledText> and pick a local location.</li>
      <li>Click <BgStyledText>Start Syncing</BgStyledText> to begin downloading and keeping the folder in sync.</li>
    </Ordered>

    <Screenshot src="/img/desktop/settings/settings-sync-destination-dialog.png" alt="Sync destination dialog" dark />

    <p>The remote folder ⋮ menu also offers <strong>Browse Contents</strong> and <strong>Delete from Server</strong>.</p>

    ### Finder

    <p>On a Mac, the <strong>Finder</strong> card at the bottom of the section has a switch, <strong>Show "Share with Hippius" in Finder</strong>. Turn it on to share files straight from Finder's right-click menu (see <a href="/use/desktop/share-from-finder">Share from Finder</a>), or off to take the item out of the menu. If macOS doesn't let Hippius turn the Finder extension on, the app tells you.</p>

</>
</DocAccordionItem>

## Screenshots & Recording

<DocAccordionItem value="screenshots-recording">
  <>
  Screenshots &amp; Recording
  </>
  <>
    <p>Set your capture shortcuts, choose where captures are saved, and decide what happens after each one. This section appears on computers where Hippius can take <a href="/use/captures">screenshots and recordings</a>.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Screenshots &amp; Recording</strong>.</li>
    </Ordered>

    <p>If this computer can take screenshots but not recordings, a note at the bottom of the section says why. On Linux with Wayland, a note explains that screenshots go through your desktop's own screenshot tool.</p>

    ### Shortcuts

    <p>Two keyboard shortcuts work from any app while Hippius is running, even with its window closed:</p>
    <Unordered>
      <li><strong>Recording shortcut</strong>: <BgStyledText>Option Shift Command 2</BgStyledText> on a Mac, <BgStyledText>Ctrl Alt Shift 2</BgStyledText> on Windows and Linux. It opens the capture bar ready to record. Shown on computers where Hippius can record.</li>
      <li><strong>Screenshot shortcut</strong>: <BgStyledText>Command Shift 2</BgStyledText> on a Mac, <BgStyledText>Ctrl Shift 2</BgStyledText> on Windows and Linux. Drag over an area and let go, and the screenshot is saved and its link copied, in one step.</li>
    </Unordered>
    <p>Press either one during a recording to stop it. To pick other keys, click <BgStyledText>Change</BgStyledText> on a card and press the new keys (<BgStyledText>Esc</BgStyledText> cancels). <BgStyledText>Reset</BgStyledText> puts the original keys back, and <BgStyledText>Turn off</BgStyledText> and <BgStyledText>Turn on</BgStyledText> do what they say. Hippius won't let both shortcuts use the same keys, and it refuses keys your system already uses for its own screenshots, such as <BgStyledText>Command Shift 3</BgStyledText> to <BgStyledText>Command Shift 6</BgStyledText> on a Mac or the Print Screen keys.</p>

    :::note On Linux with Wayland
    Apps can't grab keys there on their own, so each card shows a short command to add as a custom shortcut in your desktop's keyboard settings. The shortcut then works even when Hippius is closed: Hippius starts and opens the capture as soon as you're signed in. On the beta channel, Hippius can also ask desktops that support it to set up the screenshot shortcut for you, and your desktop may ask you to confirm.
    :::

    ### Capture folder

    <p>Shows where your screenshots and recordings are kept on this computer. That folder is backed up as your captures drive, the same drive the console uses. Click <BgStyledText>Show in Finder</BgStyledText> (<BgStyledText>Show in folder</BgStyledText> on Windows and Linux) to open it.</p>

    <p>Click <BgStyledText>Change</BgStyledText> to save new captures somewhere else, any folder with any name, including a folder inside one of your drives. The captures you already took stay where they are.</p>

    <p>Your first capture asks where to keep captures and suggests a folder called <code>hippius-captures</code> in Documents. If you haven't taken one yet, <BgStyledText>Set up</BgStyledText> lets you choose now. See <a href="/use/captures#choose-where-captures-are-saved">Choose where captures are saved</a>.</p>

    <Screenshot src="/img/desktop/captures/settings-captures.png" alt="The Screenshots and Recording settings with both shortcuts, the capture folder in Documents › hippius-captures, and the after-capture switches" dark raw />

    ### After a capture

    <p>All of these start on except <strong>Record system audio</strong>, and most are also in the capture bar's <strong>Options</strong> menu. Changing them in either place changes both.</p>
    <Unordered>
      <li><strong>Copy a share link after capture</strong>: each screenshot and recording gets a public link that is copied once it's uploaded. Turn it off and captures are only saved to your drive, so you can share them later. See <a href="/use/captures/share-links">Share links for captures</a>.</li>
      <li><strong>Open the link in your browser</strong>, while links are being made: opens each capture's link as soon as it's ready, so you can check it.</li>
      <li><strong>Show a preview in chats</strong>: when you paste a capture's link into a chat, it shows the screenshot or the recording's first frame. The preview picture and file name aren't encrypted. See <a href="/use/captures/share-links#a-preview-when-you-paste-the-link-in-a-chat">chat previews</a>.</li>
      <li><strong>Track views, comments and reactions</strong>: links to your screenshots and recordings count views and watch time and let viewers comment and react. You can still turn any of it off for a single link. On the Free plan it's marked as a paid feature and starts off. See <a href="/use/captures/insights">Insights, comments and reactions</a>.</li>
      <li><strong>Recording countdown</strong>: none, 3 seconds or 5 seconds between pressing Record and the recording starting.</li>
      <li><strong>Record system audio</strong>: adds what your computer plays to recordings, where your computer supports it. With speakers your voice may be recorded twice, and headphones avoid that.</li>
    </Unordered>

    ### When saving an edited image

    <p>What <strong>Save</strong> does in the <a href="/use/captures/edit">screenshot editor</a>: <strong>Ask</strong> each time, always <strong>Save a copy</strong> next to the original, or always <strong>Replace the original</strong>.</p>

</>
</DocAccordionItem>

{/*
  ───────────────────────────────────────────────────────────────────────
  WALLETS SECTION: hidden while the wallet feature is gated off in the
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
    <p>The <strong>Wallets</strong> section manages the local wallets stored on this device: "Switch between them, rename, export a backup, or remove ones you no longer use."</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Wallets</strong>.</li>
    </Ordered>

    <p>The table lists each wallet with its <strong>Wallet</strong> name (with an <strong>Active</strong> badge on the current one), full <strong>Address</strong> (with a copy button), and the date it was <strong>Added</strong>. Use <BgStyledText>Create wallet</BgStyledText> or <BgStyledText>Import</BgStyledText> in the header to add more.</p>

    <p>Each row's three-dot (⋮) menu offers <strong>Set as active</strong>, <strong>Copy address</strong>, <strong>View on Hipstats</strong>, <strong>Export backup</strong>, <strong>Rename</strong>, and <strong>Delete</strong>.</p>

    <Screenshot src="/img/desktop/wallet/wallet-settings.png" alt="Wallet settings" dark />

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
    <p>The <strong>Security</strong> section lets you back up your mnemonic seed and set or change your unlock password: "Backup your mnemonic seed and set an unlock password to access your encrypted files on other devices."</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Security</strong>.</li>
    </Ordered>

    <Screenshot src="/img/desktop/settings/security-settings-tab.png" alt="Security settings tab" dark />

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

    <Screenshot src="/img/desktop/change-unlock-password-dialog.png" alt="Change unlock password dialog" dark />

    <p>Changing the password re-encrypts the sealed backup on the server. Your mnemonic seed and the files on your desktop app are not affected.</p>

</>
</DocAccordionItem>

## Notifications

<DocAccordionItem value="notifications">
  <>
   Notifications
  </>
  <>
    <p>Choose which updates Hippius sends you, in the app and by email.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Notifications</strong>.</li>
    </Ordered>

    ### Notification Preferences

    <p>Under <strong>Notification Preferences</strong>, each in-app notification type has a checkbox and an <strong>On</strong> / <strong>Off</strong> badge:</p>
    <Unordered>
      <li><strong>Credits</strong>: "Notifications for account credits, including low balance warnings and credit additions."</li>
      <li><strong>Drive</strong>: "Notifications for file operations including sync completion and failures."</li>
    </Unordered>

    <Screenshot src="/img/desktop/settings/settings-notifications.png" alt="Notifications screen" dark />

    ### Email Notification

    <p>The <strong>Email Notification</strong> card depends on how you signed in:</p>
    <Unordered>
      <li>If you signed in with an access key, the card reads "Sign in with Google, GitHub, or Email to manage email notifications." There is no email sign-in; the card means Google, GitHub or Apple.</li>
      <li>If you signed in with Google, GitHub or Apple, a <strong>Receive Email Notifications</strong> toggle appears with sub-options: <strong>Low account balance alerts</strong>, <strong>Zero balance alerts</strong>, and <strong>Marketing emails &amp; newsletter</strong>.</li>
    </Unordered>

    <p>After changing anything, click <BgStyledText>Save Changes</BgStyledText> (or <BgStyledText>Cancel</BgStyledText> to discard). These buttons stay disabled until you have unsaved changes.</p>

    <Screenshot src="/img/desktop/settings/email-preference.png" alt="Email notification preferences" dark />

    ### Emails about your links

    <p>This card lets Hippius email you about your share links and their <a href="/use/captures/insights">Insights</a>: <strong>First views</strong> when a link is opened for the first time, <strong>New comments</strong> when people comment (the email says how many, since comments are encrypted), and a <strong>Summary</strong> of views and comments, daily, weekly or off. You can choose the same emails in the console. More in <a href="/use/captures/insights#emails-about-your-links">Emails about your links</a>.</p>

    <Screenshot src="/img/desktop/captures/settings-link-emails.png" alt="Emails about your links with First views, New comments and a weekly Summary" dark raw />

</>
</DocAccordionItem>

## Appearance

<DocAccordionItem value="appearance">
  <>
  Appearance
  </>
  <>
    <p>The <strong>Appearance</strong> section controls how Hippius looks on this device: "Personalize how Hippius looks on this device."</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Appearance</strong>.</li>
    </Ordered>

    ### Theme

    <p>Under <strong>Theme</strong>, pick the look you want: <strong>Light</strong>, <strong>Dark</strong>, or <strong>System</strong> to follow your operating system. The change applies right away.</p>

    :::note
    Your theme choice is stored locally, so it only affects this device. Your other devices and the <a href="https://console.hippius.com">Hippius Console</a> keep their own setting.
    :::

    <Screenshot src="/img/desktop/settings/appearance-settings.png" alt="Appearance screen" dark />


</>
</DocAccordionItem>

## Updates

<DocAccordionItem value="updates">
  <>
  Updates
  </>
  <>
    <p>The <strong>Updates</strong> section shows which release channel this computer is on and lets you change it. Under <strong>Release channel</strong>, pick <strong>Stable</strong> (the default) or <strong>Beta</strong>, which gets new features first, before they are fully stabilized. Hippius asks you to confirm before it switches. See <a href="/use/desktop/beta-channel">Beta Channel</a> for what changes and what doesn't.</p>

    <p>On macOS and Windows, Hippius downloads the new build and restarts. On Linux it can't install a new version by itself: it points you to the releases page, where you download the new package and install it with your package manager.</p>

</>
</DocAccordionItem>

{/* The API Token section is hidden in the app for now. Restore this block when it comes back.

## API Token

<DocAccordionItem value="api-token">
  <>
  API Token
  </>
  <>
    <p>The <strong>API Token</strong> section gives you the token that authenticates API requests to the Hippius platform: "Manage your API token for secure file operations and delegated access."</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>API Token</strong>.</li>
      <li>Under <strong>API Token</strong>, use the eye icon to reveal the token and the copy icon to copy it.</li>
      <li>Use <strong>API Token Usage Example</strong> as a reference: it shows the <code>Authorization: Token &lt;token&gt;</code> header, which you can copy directly.</li>
    </Ordered>

    <p>Include this header in your API requests to access storage control, file upload, and other authenticated endpoints.</p>

    :::warning Keep your API key secure
    Never share your API token with anyone. It provides full access to your account and should be treated like a password.
    :::

    <Screenshot src="/img/desktop/settings/settings-api-token.png" alt="API token screen" dark />

</>
</DocAccordionItem>

*/}

## Customize RPC

<DocAccordionItem value="customize-rpc">
  <>
  Customize RPC
  </>
  <>
    <p>The <strong>RPC Setting</strong> section controls which blockchain endpoint the app connects to: "Customize your connection by updating the blockchain RPC endpoint." The default is <code>wss://rpc.hippius.network</code>. A custom endpoint can improve performance in some regions or point at your own node. Only use a provider you trust.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />, then open <strong>Customize RPC</strong>.</li>
      <li>Edit the value in the <strong>RPC Endpoint</strong> field (it must start with <code>ws://</code> or <code>wss://</code>).</li>
      <li>Click <BgStyledText>Save Changes</BgStyledText>. The app verifies the endpoint is reachable before applying it.</li>
      <li>Confirm in the <strong>Confirm RPC Endpoint</strong> dialog by clicking <BgStyledText>Update &amp; Restart</BgStyledText>.</li>
    </Ordered>

    :::note The app restarts
    Changing the RPC endpoint affects your blockchain connection, so the application restarts automatically to apply the change.
    :::

    <Screenshot src="/img/desktop/settings/settings-rpc.png" alt="Custom RPC screen" dark />

</>
</DocAccordionItem>

</DocAccordion>
