---
id: settings
title: Desktop App Settings
sidebar_label: Desktop App Settings
slug: /learn/desktop/settings
description: 5
---

import DocAccordion, { DocAccordionItem } from '@site/src/components/DocAccordion';
import Ordered from '@site/src/components/Ordered';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import BgStyledText from '@site/src/components/BgStyledText';
import Icon from '@site/src/components/Icon';

<DocAccordion defaultValue="file-settings">

## File Settings

<DocAccordionItem value="file-settings" isFirst> <>
File Settings
</>
<>

<p>In file settings, select and change folder for private and public syncing.<br/>If files are added or removed, these changes will be synced automatically.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click on <BgStyledIconWithText text="File Settings" icon="File" />.</li>
      <li>Choose to change either private or public folder.</li>
      <li>Choose the new folder you want to use and click <BgStyledText>Sync Folder</BgStyledText>.</li>
    </Ordered>

    ![File settings screen](/img/desktop/settings-file.png)

</>
</DocAccordionItem>

## Change Passcode

<DocAccordionItem value="change-passcode">
  <>
 Change Passcode

</>
<>

<p>Your passcode encrypts your access key and secures your data. Only you can change it, keeping you in complete control of your access and security. It is recommended to use a strong password.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click on <BgStyledIconWithText text="Change Passcode" icon="WalletAdd" />.</li>
      <li>Enter your current passcode.</li>
      <li>Enter your desired passcode and re-enter it for confirmation.</li>
      <li>Save your changes.</li>
    </Ordered>

    ![Change passcode modal](/img/desktop/settings-passcode.png)

</>
</DocAccordionItem>

## Encryption Key

<DocAccordionItem value="encryption-key">
  <>
 Encryption Key
  </>
  <>
    <p>Your unique encryption key protects data integrity and access. Keep it safe—only you can regenerate or use it to secure your files on our decentralized storage network.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click on <BgStyledIconWithText text="Encryption Key" icon="Key" />.</li>
      <li>You can now generate a new encryption key which is to be stored securely.</li>
    </Ordered>

    ![Encryption key screen](/img/desktop/settings-encryption.png)

</>
</DocAccordionItem>

## Sub Accounts

<DocAccordionItem value="sub-accounts">
  <>
  Sub Accounts
  </>
  <>
    <p>Sub accounts lets you assign upload and delete rights. They store their own seed, yet all files still belong to your main account. We’re currently using these sub accounts to upload files to S3 storage.</p>

    ![Sub accounts table](/img/desktop/settings-sub-accounts.png)

    <Ordered>
      <li>Click on the <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click <BgStyledIconWithText text="Sub Accounts" icon="KeySquare" />.</li>
    </Ordered>

    ### Create a New Sub Account

    <Ordered>
      <li>Click on <BgStyledText>New Sub Account</BgStyledText>.</li>
      <li>Enter the address and select the role assigned to this account.</li>
      <li>Click on the <BgStyledText>Create Sub Account</BgStyledText> button.</li>
    </Ordered>

    ![Create sub account modal](/img/desktop/settings-sub-account-create.png)

    ### Generate Sub Account

    <Ordered>
      <li>Click on <BgStyledText>Generate New Account</BgStyledText>.</li>
      <li>Save the generated access key.</li>
      <li>Click on <BgStyledText>Add as Sub Account</BgStyledText> to make this sub account.</li>
      <li>Assign a role and click on <BgStyledText>Create Sub Account</BgStyledText> to share it to the account.</li>
      <li>Enter the passcode to save the seed of the sub account.</li>
    </Ordered>

    ![Generate sub account modal](/img/desktop/settings-sub-account-generate.png)

    ### Deleting Sub Accounts

    <Ordered>
      <li>Click on <BgStyledIconWithText icon="Trash" /> button.</li>
      <li>Confirm the action.</li>
    </Ordered>

    **Note that this action is irreversible.**

    ![Delete sub account confirm](/img/desktop/settings-sub-account-delete.png)

</>
</DocAccordionItem>

## Notifications

<DocAccordionItem value="notifications">
  <>
   Notifications
  </>
  <>
    <p>You will receive in-app notifications when your credits are low or when your uploads are complete.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click on <BgStyledIconWithText text="Notifications" icon="Notification" />.</li>
      <li>Choose your notification preferences.</li>
    </Ordered>

    ![Notifications screen](/img/desktop/settings-notifications.png)

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
      <li>Enter RPC.</li>
      <li>Save the edited RPC.</li>
    </Ordered>

    ![Custom RPC screen](/img/desktop/settings-rpc.png)

</>
</DocAccordionItem>

## Backup App Data

<DocAccordionItem value="backup">
  <>
 Backup App Data
  </>
  <>
    <p>Regular backups help you recover your data stored on this device if you lose access to it. Save your backup .ZIP file in a secure location.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click on the <BgStyledIconWithText text="Backup App Data" icon="Wallet" />.</li>
      <li>Click the <BgStyledText>Download</BgStyledText> button to get your saved phrase.</li>
    </Ordered>

    ![Backup app data screen](/img/desktop/settings-backup.png)

</>
</DocAccordionItem>

## Reset App Data

<DocAccordionItem value="reset">
  <>
   Reset App Data
  </>
  <>
    <p>Use this option if you’re experiencing issues or want to start fresh. Your blockchain data and files stored on the decentralized network remain secure and accessible after reset.</p>

    <Ordered>
      <li>Click on <BgStyledIconWithText text="Settings" icon="Settings" />.</li>
      <li>Click <BgStyledIconWithText text="Reset App Data" icon="Trash" />.</li>
      <li>Confirm this step in the modal that pops up and the reset will begin.</li>
    </Ordered>

    ![Reset app data modal](/img/desktop/settings-reset.png)

</>
</DocAccordionItem>

</DocAccordion>
