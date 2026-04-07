---
id: s3-token-management
title: S3 Token Management
sidebar_label: S3 Token Management
slug: /use/s3-token-management
---

import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';
import Icon from '@site/src/components/Icon';

## Overview

Hippius S3 Storage provides a secure token-based authentication system that uses **Master Tokens** and **Sub Tokens** to control access to your storage buckets and objects. This approach, inspired by AWS S3's access key management, gives you fine-grained control over permissions while maintaining security and ease of use.

## Master Tokens vs Sub Tokens

### Master Tokens

Master tokens are the primary credentials for your S3 storage account. They provide:

- **Full Access**: Complete control over all buckets and objects in your account
- **Long-lived**: Can be configured to last from 7 days to 1 year or custom duration
- **Bucket Operations**: Create, delete, and manage all buckets
- **Token Management**: Create and manage sub tokens
- **Security**: Provides both an Access Key ID and Secret Access Key

### Sub Tokens

Sub tokens are limited-scope credentials designed for specific use cases. They offer:

- **Granular Permissions**: Control exact permissions (Read Only or Read & Write) per bucket
- **Bucket-Specific**: Grant access to specific buckets only, multiple buckets, or all buckets
- **Shorter Lifespan**: Typically 7 days, 30 days, 1 year, or custom duration
- **Revocable**: Can be revoked or rotated at any time without affecting other tokens
- **API Integration**: Ideal for applications and third-party integrations

## Getting Started with Master Tokens

### Creating Your First Master Token (Console)

When you access S3 Storage in the Hippius Console for the first time, you'll need to create a master token:

<Ordered>
  <li>Navigate to <BgStyledIconWithText text="Files" icon="DocumentText" /> in the console.</li>
  <li>Select <BgStyledText>S3 Storage</BgStyledText> from the dropdown menu.</li>
  <li>You'll see a message: "No Entries in Your Storage"</li>
  <li>Click the <BgStyledText>Create Master Token</BgStyledText> button.</li>
  <li>Enter a descriptive <BgStyledText>Token Name</BgStyledText> (e.g., "Production Token").</li>
  <li>Choose <BgStyledText>Token Expiry</BgStyledText> from the dropdown: 7 days (short-term), 30 days (default), 1 year (long-term), or Custom (select any future date).</li>
  <li>Click <BgStyledText>Create Master Token</BgStyledText> to generate your credentials.</li>
</Ordered>

![Create Master Token Dialog](/img/s3-token-management/create-master-token.png)

### Saving Your Master Token Credentials

After creating a master token, you'll receive two critical pieces of information:

<Ordered>
  <li><strong>Access Key ID</strong>: Starts with <BgStyledText>hip_</BgStyledText> (e.g., hip_e7f37023498b6765ef1e64d8)</li>
  <li><strong>Secret Access Key</strong>: A long alphanumeric string</li>
</Ordered>

:::warning Important Information
**The Secret Access Key is displayed only once!** Save it securely before closing the dialog. If you lose it, you'll need to rotate (revoke and create a new) master token.
:::

<Ordered>
  <li>Click the <BgStyledText>Copy</BgStyledText> button next to each credential.</li>
  <li>Store both credentials in a secure password manager or secrets vault.</li>
  <li>Never share these credentials or commit them to version control.</li>
  <li>Click <BgStyledText>I've Saved My New Secret</BgStyledText> to confirm.</li>
</Ordered>

![Master Token Secret Display](/img/s3-token-management/master-token-secret.png)

### Automatic Token Creation (Desktop App)

The Hippius Desktop App simplifies the process by automatically creating a master token for you:

<Ordered>
  <li>When you first launch the Desktop App and access the <BgStyledIconWithText text="Files" icon="DocumentText" /> section, a master token is automatically created for you.</li>
  <li>You don't need to manually go through the creation process.</li>
  <li>The token is securely stored within the app.</li>
  <li>You can still access and manage tokens through the <BgStyledText>Manage</BgStyledText> section.</li>
</Ordered>

:::tip Desktop App Advantage
The desktop app handles master token management automatically on first access, so you can start using storage immediately without the setup hassle!
:::

:::note Desktop App vs Console
The Desktop App's **Files** section is for syncing folders and managing files directly. For S3-compatible bucket storage with API access, use the **Hippius Console** at https://console.hippius.com.
:::

## Managing Tokens

### Accessing Token Management

Both the Console and Desktop App provide a comprehensive token management interface:

<Ordered>
  <li>Navigate to S3 Storage section.</li>
  <li>Click the <BgStyledText>Manage</BgStyledText> button in the top-right corner.</li>
  <li>You'll see two tabs: <BgStyledText>Sub Tokens</BgStyledText> (manage limited-scope API tokens) and <BgStyledText>Master Tokens</BgStyledText> (manage full-access tokens).</li>
</Ordered>

![Token Management Interface](/img/s3-token-management/token-management.png)

### Master Tokens Tab

The Master Tokens tab displays:

- **Token Name**: Descriptive name you assigned
- **Access Key ID**: Your unique identifier (starts with `hip_`)
- **Secret (Last 4)**: Last 4 characters of your secret key
- **Created**: When the token was generated
- **Expires**: Expiration date and countdown
- **Status**: Active or Expired

#### Master Token Actions

Each master token has an options menu (⋮) with the following actions:

**Rotate Token**
<Ordered>
  <li>Click the options menu (⋮) next to the master token.</li>
  <li>Select <BgStyledText>Rotate</BgStyledText>.</li>
  <li>A new secret key will be generated while keeping the same Access Key ID.</li>
  <li><strong>Save the new secret immediately!</strong> The old secret becomes invalid.</li>
</Ordered>

**Revoke Token**
<Ordered>
  <li>Click the options menu (⋮) next to the master token.</li>
  <li>Select <BgStyledText>Revoke</BgStyledText>.</li>
  <li>Confirm the action in the warning dialog.</li>
  <li>The token will be immediately invalidated.</li>
</Ordered>

:::danger Warning
Revoking a master token cannot be undone! Any applications using this token will immediately lose access. Make sure to update all integrations before revoking.
:::

![Revoke Master Token Dialog](/img/s3-token-management/revoke-master-token.png)

### Sub Tokens Tab

The Sub Tokens tab displays:

- **Token Name**: Descriptive name for the token
- **Applied To**: Number of buckets this token can access
- **Permission**: Read Only or Read & Write
- **Date Created**: When the token was generated
- **Status**: Active or Revoked

## Creating Sub Tokens

Sub tokens allow you to grant limited, scoped access to your S3 buckets. This is ideal for:

- Third-party application integrations
- API access for specific services
- Temporary access for contractors or partners
- Testing and development environments

### Creating a Sub Token

<Ordered>
  <li>Navigate to Token Management and select the <BgStyledText>Sub Tokens</BgStyledText> tab.</li>
  <li>Click the <BgStyledText>New Token</BgStyledText> button.</li>
  <li>Enter a <strong>Token Name</strong> (e.g., "API Integration Token").</li>
  <li>Select <strong>Permissions</strong>: <BgStyledText>Object Read Only</BgStyledText> (can only read/download objects) or <BgStyledText>Object Read & Write</BgStyledText> (can read, upload, and delete objects).</li>
  <li>Choose <strong>Select Buckets</strong>: Click the dropdown to see all your buckets. You can select all buckets, multiple specific buckets, or just a single bucket. Only selected buckets will be accessible with this token.</li>
  <li>Set <strong>Token Lifespan</strong>: Choose 7 days, 30 days, 1 year, or Custom (pick any future date).</li>
  <li>Click <BgStyledText>Create Sub Token</BgStyledText> to generate the token.</li>
</Ordered>

![Create Sub Token Dialog](/img/s3-token-management/create-sub-token.png)

### Using Sub Token Credentials

After creation, you'll receive the token credentials:

<Ordered>
  <li><strong>Access Key ID</strong>: Your sub token identifier</li>
  <li><strong>Secret Access Key</strong>: The secret key (shown only once!)</li>
  <li>Copy both credentials using the <BgStyledText>Copy</BgStyledText> buttons.</li>
  <li>Store them securely.</li>
  <li>Use them in your S3-compatible applications and SDKs.</li>
</Ordered>

:::warning One-Time Display
Just like master tokens, sub token secrets are shown only once. Save them immediately or you'll need to create a new token!
:::

### Managing Sub Tokens

Each sub token has an options menu (⋮) with the following actions:

#### Rotating a Sub Token

<Ordered>
  <li>Navigate to Token Management → <BgStyledText>Sub Tokens</BgStyledText> tab.</li>
  <li>Find the token you want to rotate.</li>
  <li>Click the options menu (⋮) next to the token.</li>
  <li>Select <BgStyledText>Rotate</BgStyledText>.</li>
  <li>A new secret key will be generated while keeping the same Access Key ID and permissions.</li>
  <li><strong>Save the new secret immediately!</strong> The old secret becomes invalid.</li>
</Ordered>

#### Revoking a Sub Token

<Ordered>
  <li>Navigate to Token Management → <BgStyledText>Sub Tokens</BgStyledText> tab.</li>
  <li>Find the token you want to revoke.</li>
  <li>Click the options menu (⋮) next to the token.</li>
  <li>Select <BgStyledText>Revoke</BgStyledText>.</li>
  <li>Confirm the action in the warning dialog.</li>
</Ordered>

![Revoke Sub Token Dialog](/img/s3-token-management/revoke-sub-token.png)

:::info Revocation Effects
- The token becomes invalid immediately
- Applications using this token will receive authentication errors
- This action cannot be undone
- You can create a new token with the same permissions if needed
:::

## Token Expiration

### Understanding Expiration

All tokens (master and sub) have expiration dates:

- **Active Tokens**: Can be used for authentication and API calls
- **Expired Tokens**: Automatically become invalid after the expiration date
- **Renewal**: You must create a new token when one expires

### Handling Expired Tokens

When a master token expires in the Console:

<Ordered>
  <li>You'll see the "No Entries in Your Storage" message again.</li>
  <li>Click <BgStyledText>Create Master Token</BgStyledText> to generate a new one.</li>
  <li>Update all applications using the old credentials with the new ones.</li>
</Ordered>

When a sub token expires:

<Ordered>
  <li>The token's status changes to "Expired" in the management interface.</li>
  <li>Applications using it will receive authentication errors.</li>
  <li>Create a new sub token with the same or updated permissions.</li>
</Ordered>

:::tip Best Practice
Set calendar reminders before tokens expire to ensure uninterrupted service for your applications and integrations.
:::

## Security Best Practices

### Protecting Your Tokens

<Ordered>
  <li><strong>Never Share Secrets</strong>: Keep your Secret Access Keys private and secure.</li>
  <li><strong>Use Environment Variables</strong>: Store credentials in environment variables, not in code.</li>
  <li><strong>Rotate Regularly</strong>: Rotate master tokens periodically for enhanced security.</li>
  <li><strong>Use Sub Tokens for Apps</strong>: Create specific sub tokens for each application or service.</li>
  <li><strong>Revoke Unused Tokens</strong>: Remove tokens that are no longer needed.</li>
  <li><strong>Monitor Usage</strong>: Regularly review active tokens in the management interface.</li>
  <li><strong>Least Privilege</strong>: Grant minimum permissions needed (use Read Only when possible).</li>
</Ordered>

### Token Storage Recommendations

**DO:**
- ✅ Store in password managers (1Password, LastPass, Bitwarden)
- ✅ Use secrets management services (AWS Secrets Manager, HashiCorp Vault)
- ✅ Store in secure environment variables
- ✅ Encrypt if storing in configuration files

**DON'T:**
- ❌ Commit to Git or version control
- ❌ Share in Slack, email, or messaging apps
- ❌ Store in plain text files
- ❌ Hardcode in application source code

## Use Cases

### Master Tokens

**When to use Master Tokens:**
- Personal account management in Desktop App
- Full administrative access to all buckets
- Bulk operations across multiple buckets
- Creating and managing sub tokens
- Account-wide configuration changes

**Example Scenarios:**
- Daily use in Hippius Desktop App
- Administrative scripts for bucket management
- Backup and disaster recovery operations
- Migrating data between storage systems

### Sub Tokens

**When to use Sub Tokens:**
- API integrations with third-party services
- Web applications requiring S3 access
- Mobile app backends
- CI/CD pipelines for deployment
- Sharing limited access with team members or contractors

**Example Scenarios:**

**Read Only Token for Analytics Service:**
<Ordered>
  <li>Create sub token with "Object Read Only" permission</li>
  <li>Grant access to "analytics-data" bucket only</li>
  <li>Analytics service can read data but not modify it</li>
</Ordered>

**Read & Write Token for Content Management:**
<Ordered>
  <li>Create sub token with "Object Read & Write" permission</li>
  <li>Grant access to "website-assets" and "user-uploads" buckets</li>
  <li>CMS can upload, update, and delete content</li>
</Ordered>

## Summary

Master Tokens and Sub Tokens provide a flexible, secure way to manage access to your Hippius S3 Storage:

- **Master Tokens**: Full access, automatically created in Desktop App, manually created in Console
- **Sub Tokens**: Limited scope, perfect for API integrations and specific use cases
- **Security**: Secrets shown only once, tokens can be revoked anytime
- **Flexibility**: Custom permissions, bucket selection, and expiration dates
- **Management**: Comprehensive interface in both Console and Desktop App

Start using tokens today to secure your S3 storage and integrate with your applications!
