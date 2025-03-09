---
sidebar_position: 5
---

# Encryption System

Learn about our secure end-to-end encryption system for messaging and data storage.

## Overview

The Hippius network uses TweetNaCl's box encryption (curve25519-xsalsa20-poly1305) to provide end-to-end encryption for both messaging and data storage. Our system implements deterministic key generation from user mnemonics, ensuring secure and consistent access while eliminating the need to store private keys.

This documentation explains how our encryption system works, from key generation to message encryption, and provides best practices for secure implementation.

## Key Features

- **Deterministic Key Generation**: Keys are derived from user mnemonics, ensuring consistent access
- **Dual Key System**: Separate keys for messaging and data storage
- **No Private Key Storage**: Private keys are generated on-demand from mnemonics
- **Base58 Encoding**: All public keys and addresses use base58 for better readability
- **End-to-End Encryption**: Messages can only be decrypted by intended recipients

## Key Generation

### Process

#### Seed Generation
- Initial seed is derived from user's mnemonic using `mnemonicToMiniSecret`
- The seed is then modified based on the key type:
  - Message keys: last byte set to `0x01`
  - Data keys: last byte set to `0x02`

#### Key Pair Creation
- TweetNaCl generates the key pair from the modified seed
- Public key is encoded in base58 format
- Private key is never stored, only regenerated when needed

### Key Types

#### Message Keys
- Used for encrypted messaging between users
- Public key is shared in user's profile
- Private key is regenerated for message encryption/decryption

#### Data Keys
- Used for encrypted data storage
- Public key is shared in user's profile
- Private key is regenerated for data encryption/decryption

## Message Encryption Flow

### Sending a Message (Alice to Bob)

```javascript
// Bob's public key (from his profile)
const bobKeys = getMessageKeyPair(bobMnemonic);
const bobPublicKey = bobKeys.publicKey;

// Alice's private key (generated from her mnemonic)
const aliceMnemonic = "...";
const alicePrivateKey = getPrivateKey(aliceMnemonic, 'message');
```

### Receiving a Message (Bob from Alice)

```javascript
// Alice's public key (from her profile)
const aliceKeys = getMessageKeyPair(aliceMnemonic);
const alicePublicKey = aliceKeys.publicKey;

// Bob's private key (generated from his mnemonic)
const bobMnemonic = "...";
const bobPrivateKey = getPrivateKey(bobMnemonic, 'message');
```

## Security Considerations

### Key Management
- Private keys are never stored, only generated when needed
- Public keys are stored in base58 format
- Mnemonics must be securely managed by users
- Different keys for messaging and data prevent cross-purpose usage

### Encryption Security
- Uses TweetNaCl's proven box encryption
- Implements curve25519-xsalsa20-poly1305
- Each message uses a unique random nonce
- Authentication is built into the encryption process

## Best Practices

- Always verify recipient's public key before encryption
- Clear private keys from memory after use
- Validate all inputs before encryption/decryption
- Handle encryption/decryption errors gracefully
- Never store or transmit private keys
- Keep mnemonics secure and private 