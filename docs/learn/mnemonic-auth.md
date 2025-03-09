---
sidebar_position: 4
---

# Mnemonic Authentication

Learn about our secure, extension-free authentication system using cryptographic mnemonics.

## Overview

Hippius uses a mnemonic-based authentication system that provides secure access without requiring browser extensions or storing sensitive data. Your mnemonic phrase acts as both your identity and encryption key, giving you complete control over your account security.

## How It Works

### Mnemonic Generation

Your mnemonic is a sequence of words that represents your cryptographic identity. It's generated using secure random number generation and follows BIP39 standards.

### Key Derivation

From your mnemonic, we derive multiple cryptographic keys for different purposes (authentication, encryption, signing) using deterministic algorithms.

### Secure Authentication

When you log in, we use your mnemonic to generate your public-private key pair. The public key identifies you, while the private key proves your identity.

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