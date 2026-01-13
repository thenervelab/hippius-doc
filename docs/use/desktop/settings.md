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

<DocAccordion defaultValue="file-settings">

## File Settings

<DocAccordionItem value="file-settings" isFirst> <>
File Settings
</>
<>

    ### Selecting Sync Folder

    <p>Select a folder on your device to sync with Hippius. Changes made in this folder will automatically sync to the cloud.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click on <BgStyledIconWithText text="File Settings" icon="File" />.</li>
      <li>Review the current sync folder path.</li>
      <li>Click <BgStyledText>Change Folder</BgStyledText> to select a new location. The folder is automatically saved once selected.</li>
      <li>To pause syncing, click <BgStyledText>Stop Syncing</BgStyledText>.</li>
    </Ordered>

    <p>This folder serves as your private sync path, ensuring secure and private synchronization between your device and Hippius.</p>

    ### File Deletion Behavior Settings

    <p>Configure how file deletions are handled between your local device and the cloud.</p>

    <Ordered>
      <li>Under <strong>File Deletion Behaviour</strong>, choose how deletions should be handled.</li>
      <li>Click <BgStyledText>Save Changes</BgStyledText> to apply your deletion behavior settings.</li>
    </Ordered>

    <p><strong>File Deletion Behaviour options:</strong></p>
    <ul>
      <li><strong>Upload only (Default)</strong>: Never download deletions; keep cloud backups even if local files are removed.</li>
      <li><strong>Remote Backup</strong>: Keep a copy in the cloud; local deletions do not remove cloud files.</li>
      <li><strong>Mirror Local Delete</strong>: Delete cloud files when you delete them locally.</li>
      <li><strong>Restore Local Files</strong>: Re-download deleted files from the cloud to your device.</li>
    </ul>

    ![File settings screen](/img/desktop/settings/settings-file.png)

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

    ![Master token screen](/img/desktop/settings/settings-master-token.png)

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
    <p>The RPC endpoint determines which blockchain network you connect to. By default, we use wss://rpc.hippius.network. Custom endpoints can provide better performance in specific regions or enable connection to test networks. Always ensure you're using a trusted RPC provider for security.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click <BgStyledIconWithText text="Customize RPC" icon="Box" />.</li>
      <li>Click Edit RPC.</li>
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
