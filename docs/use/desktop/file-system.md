---
id: file-system
title: File System
sidebar_label: File System
slug: /use/desktop/file-system
---

import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';

## Introduction

Our file system is one of our core innovations, offering a unique, decentralized approach to storage. Designed to be efficient and accessible, it was built with a strong focus on security and privacy. Let’s get started.

## Erasure Coding

To enable truly decentralized storage, we use erasure coding to split uploaded files into multiple chunks, which are then distributed across miners worldwide. You can track these chunks using our [CID Tracker](https://hipstats.com/cid-tracker/bafybeihfmsk2jmld2mtppgkiujllylgj7ixkfhl6hlkqmkisls6njs2toe). Simply copy and paste the CID in our tracker to view a detailed history of where each chunk has been hosted.

![Upload Your Files modal](/img/desktop/file-system-erasure.png)

## Private Files

Private files take the default encryption key which can be changed in the [Encryption Key](/learn/desktop/settings#encryption-key) section in the settings page. We advise uploading files or folders with personal information as [Private Files](#private-files) or [Private Folders](#uploading-private-folders).

### Uploading Private Files {#uploading-private-files}

<Ordered>
  <li>Double click the Hippius <Icon /> icon to open the app.</li>
  <li>Click on <BgStyledIconWithText text="Files" icon="DocumentText" /> and select <BgStyledText>Private</BgStyledText>.</li>
  <li>Click the <BgStyledText>Upload File</BgStyledText> button.</li>
  <li>Enter an encryption key to secure your files. If left blank, Hippius will automatically use the default encryption key.</li>
  <li>Click the <BgStyledText>Upload File</BgStyledText> button in the modal to start the upload process.</li>
</Ordered>

### Uploading Private Folders {#uploading-private-folders}

<Ordered>
  <li>Double click the Hippius <Icon /> icon to open the app.</li>
  <li>Click on <BgStyledIconWithText text="Files" icon="DocumentText" /> and select <BgStyledText>Private</BgStyledText>.</li>
  <li>Click <BgStyledText>Add Folder</BgStyledText> button.</li>
  <li>Select the folder location and enter an optional encryption key.</li>
  <li>Click <BgStyledText>Upload Folder</BgStyledText> button in the modal to start the upload process.</li>
</Ordered>

## Public Files

Public files do not use any encryption and are accessible to the public. We recommend making only non-sensitive or less important files public. If your files or folders contain personal information please upload them as [Private Files](#private-files) or [Private Folders](#uploading-private-folders).

### Uploading Public Files {#uploading-public-files}

<Ordered>
  <li>Double click the Hippius <Icon /> icon to open the app.</li>
  <li>Click on <BgStyledIconWithText text="Files" icon="DocumentText" /> and select <BgStyledText>Public</BgStyledText>.</li>
  <li>Click <BgStyledText>Upload File</BgStyledText> button.</li>
  <li>Click <BgStyledText>Upload File</BgStyledText> button in the modal to start the uploading process.</li>
</Ordered>

### Uploading Public Folders {#uploading-public-folders}

<Ordered>
  <li>Double click the Hippius <Icon /> icon to open the app.</li>
  <li>Click on <BgStyledIconWithText text="Files" icon="DocumentText" /> and select <BgStyledText>Public</BgStyledText>.</li>
  <li>Click <BgStyledText>Add Folder</BgStyledText> button.</li>
  <li>Click <BgStyledText>Upload Folder</BgStyledText> button in the modal to start the uploading process.</li>
</Ordered>

**It usually takes some time to complete the upload to Hippius, but you can always monitor the upload progress.**
