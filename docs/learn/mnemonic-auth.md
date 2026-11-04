---
sidebar_position: 4
description: How signing in to Hippius with a 12-word access key works, and how it compares with Google, GitHub and Apple
---

# Access Key Authentication

Hippius lets you sign in with a 12-word access key (a mnemonic, or recovery phrase) instead of Google, GitHub or Apple. Anyone can use it: the first sign-in with a new key creates a wallet-only account. That account has no email address and no free Drive plan, so subscribe before your first Drive upload.

:::info Building an app?
The challenge and signature flow, with code, is in [Access Key Sign-In API](/use/wallet-login).
:::

## Authentication Methods

| Method | Description |
| ------ | ----------- |
| **Google**, **GitHub**, **Apple** | Sign in with that account. Includes the Free Drive Plan. |
| **Access Key** | Enter your 12 words. Wallet-only account, no email, no free Drive plan. |

Google, GitHub and Apple give you single sign-on, your provider's two-factor authentication, and nothing to back up. The access key needs no third-party account, but nobody can recover it for you. See [Signing In](/use/console/getting-started#signing-in) in the console guide.

---

## Overview

The access key signs you in without a browser extension and without Hippius storing anything secret. The words are your identity: whoever has them can sign in to your account.

## How It Works

### Mnemonic Generation

Your mnemonic is a sequence of words that represents your cryptographic identity. It's generated using secure random number generation and follows BIP39 standards.

### Key Derivation

From your mnemonic, the app derives two key pairs on your device: an Ethereum key and a Substrate (sr25519) key. Your account is named by the Substrate address.

### Secure Authentication

When you log in, the app asks the server for a one-time challenge and signs it with both keys. The server checks both signatures against your addresses and returns a session token. The words themselves are never sent.

## Advantages Over Browser Extensions

### No Dependencies:

- No need to install or maintain browser extensions
- Works across all modern browsers without compatibility issues
- No version conflicts or update requirements

### Enhanced Security:

- No persistent storage of sensitive data
- No attack surface from third-party extensions
- Protection against extension-based phishing attacks
- Immune to extension-specific vulnerabilities

### Better User Experience:

- Consistent experience across all devices
- No need to sync extensions between browsers
- Faster loading without extension overhead

## Security Considerations

### Zero Storage Policy:

We never store your mnemonic or private keys. They exist only in memory during your session and are cleared when you log out or close the browser.

### Client-Side Operations:

All cryptographic operations happen in your browser. Your mnemonic never leaves your device, ensuring complete privacy.

### Secure Key Generation:

Keys are generated using cryptographically secure random number generation and follow industry-standard protocols.

## Important: No Recovery Option

:::caution
**Your access key cannot be recovered if lost**
:::

Due to our zero-knowledge security model:

- We do not store your mnemonic phrase anywhere
- There is no "forgot password" option
- No one, including our support team, can recover your access key
- Losing your mnemonic means permanently losing access to your account

We strongly recommend using a password manager or other secure method to store your access key. Make sure to have a backup in a safe place.

## Password Manager Compatibility

Our login system is designed to work seamlessly with password managers. The access key field is properly marked as a password field, allowing your preferred password manager to:

- Securely store your mnemonic phrase
- Auto-fill the access key field on subsequent visits
- Generate and store backup copies of your mnemonic

We recommend using a password manager to securely store your mnemonic phrase, as it provides an additional layer of security and convenience.

## Browser Security

Our application is designed with security in mind:

- Your mnemonic is handled securely in memory and never stored in plain text
- The application works safely even with multiple tabs open
- We use secure input fields that prevent accidental exposure of sensitive data
- All cryptographic operations are performed client-side for maximum security

## Best Practices

- Store your mnemonic phrase securely offline
- Never share your mnemonic with anyone
- Use a secure device when entering your mnemonic
- Always log out when using shared devices
- Regularly verify your backup of the mnemonic phrase
