---
description: 10
---

# Hippius SDK & CLI Documentation

Welcome to the Hippius SDK and CLI documentation! This guide will help you store, manage, and retrieve files using the Hippius decentralized storage network.

## What is Hippius?

Hippius combines two powerful technologies to provide resilient decentralized storage:

- **[IPFS (InterPlanetary File System)](https://ipfs.tech/)**: A distributed file system for storing and accessing files across a network of computers
- **[Substrate Blockchain](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#substrate)**: A framework for building custom blockchains, used by Hippius to store file references and handle transactions

This combination provides:
1. **Redundant Storage**: Your files are stored across multiple nodes
2. **Tamper Resistance**: File references are secured on a blockchain
3. **Resilient Access**: Files can be retrieved even if some nodes go offline

If you're new to decentralized storage, think of Hippius as a more resilient alternative to traditional cloud storage, where files are distributed across a network rather than stored in a single location.

## Table of Contents

- [What is Hippius?](#what-is-hippius)
- [Installation](#installation)
- [CLI Quick Reference](#cli-quick-reference)
  - [Global Flags](#global-flags)
  - [Basic File Operations](#basic-file-operations)
  - [Account Operations](#account-operations)
  - [Seed Phrase Management](#seed-phrase-management)
  - [Configuration](#configuration)
  - [Advanced Operations](#advanced-operations)
  - [Miner Operations](#miner-operations)
- [SDK Developer Guide](#sdk-developer-guide)
  - [Understanding Async Operation](#understanding-async-operation)
  - [Complete SDK Usage Example](#complete-sdk-usage-example)
  - [IPFS Connection Options](#ipfs-connection-options)
  - [Basic File Operations](#basic-file-operations-1)
  - [Handling Errors](#handling-errors)
- [Advanced Features](#advanced-features)
  - [Encryption](#encryption)
  - [Erasure Coding](#erasure-coding)
  - [Account Management](#account-management)
  - [Configuration](#configuration-1)
- [Development & Testing](#development--testing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Installation

Hippius SDK requires Python 3.9 or higher and can be installed using pip, pipx, or Poetry.

```bash
# Using pipx (recommended for CLI usage)
pipx install hippius

# Using pip
pip install hippius

# Using Poetry
poetry add hippius

# With clipboard support for encryption key utility
poetry add hippius -E clipboard
```
To verify the installation:

```bash
hippius --version
```

### Logging in
Have your seed phrase ready and then run:
```bash
# You _should_ encrypt it, pick a password and remember it, you will use it later
hippius account login
```

You can verify you configured your account properly by doing:

```bash
hippius account list
```

---

## CLI Quick Reference

> ⚡ **Quick Tip**: Add `--verbose` to any command to see detailed information about what's happening.

### Global Flags

These flags can be used with any command:

| Flag | Description | Default | Example |
| ------------------ | ---------------------------------- | ------------------------------- | ----------------------------------- |
| `--gateway` | IPFS gateway URL for downloads | `https://ipfs.io` | `--gateway https://dweb.link` |
| `--api-url` | IPFS API URL for uploads | `https://store.hippius.network` | `--api-url http://localhost:5001` |
| `--local-ipfs` | Use local IPFS node | `False` | `--local-ipfs` |
| `--substrate-url` | Substrate node WebSocket URL | `wss://rpc.hippius.network` | `--substrate-url wss://custom.node` |
| `--miner-ids` | Comma-separated miner IDs | none | `--miner-ids miner1,miner2,miner3` |
| `--encrypt` | Enable file encryption | Configured default | `--encrypt` |
| `--no-encrypt` | Disable file encryption | n/a | `--no-encrypt` |
| `--decrypt` | Enable file decryption | `True` with encrypted files | `--decrypt` |
| `--no-decrypt` | Disable file decryption | n/a | `--no-decrypt` |
| `--encryption-key` | Base64-encoded encryption key | From config | `--encryption-key BASE64_KEY` |
| `--account` | Account name to use | Active account | `--account my_account` |
| `--password` | Password for encrypted seed phrase | n/a | `--password "my password"` |
| `--verbose` | Enable verbose output | `False` | `--verbose` |

### Basic File Operations

Store and retrieve files:

```bash
# Upload a file to IPFS and store on Hippius
hippius store myfile.txt

# Upload with encryption
hippius --encrypt store myfile.txt

# Upload a directory
hippius store-dir ./my_directory

# Download a file from IPFS
hippius download QmCID123 output_file.txt

# Check if a CID exists
hippius exists QmCID123

# Display file content
hippius cat QmCID123
```

### Account Operations

Manage your accounts and check storage:

```bash
# List all your accounts
hippius account list

# Create a new account 
hippius account create --name my_new_account

# Import an account from a file
hippius account import --file account_export.json

# Export an account to a file
hippius account export my_account_name --output account_export.json

# Show detailed information about an account
hippius account info my_account_name

# Check account balance
hippius account balance my_account_name
# Shows your blockchain account's token balance (free, reserved, and total tokens)

# Switch active account
hippius account switch my_account_name

# Delete an account
hippius account delete my_account_name

# Check available credits
hippius credits
# Shows free storage credits allocated to your account that can be used without spending tokens

# View files stored by your account
hippius files

# View erasure-coded files
hippius ec-files

# Check pinning status for all files
hippius pinning-status

# Show detailed information for each pinned file
hippius pinning-status --verbose

# Show or hide file contents in the output
hippius pinning-status --show-contents
hippius pinning-status --no-contents
```

> 🔍 **Understanding Credits vs Balance**: Hippius uses two different economic mechanisms:
>
> **Account Balance (tokens)**: 
>
> - The blockchain's native cryptocurrency
> - Transferable between accounts
> - Used for blockchain transactions
> - Represents actual economic value
> - Acquired through exchanges or transfers
>
> **Free Credits**:
>
> - Storage-specific allocations
> - Non-transferable
> - Used exclusively for storing files
> - Provided as incentives or to new users
> - Periodically replenished based on platform rules
>
> This dual system lets you try Hippius storage for free with credits while maintaining a robust token economy.

### Seed Phrase Management

Manage your blockchain account credentials:

```bash
# Set a seed phrase
hippius seed set "your twelve word seed phrase here"

# Set encrypted seed phrase
hippius seed set "your twelve word seed phrase here" --encode

# Check seed phrase status
hippius seed status

# Temporarily decrypt and view
hippius seed decode
```

### Configuration

Manage your Hippius settings:

```bash
# List all configuration
hippius config list

# Get a specific setting
hippius config get ipfs gateway

# Set a configuration value
hippius config set ipfs gateway https://ipfs.io

# Import settings from .env file
hippius config import-env
```

### Advanced Operations

```bash
# Erasure code a file with default parameters (k=3, m=5), will also publish globally by default
hippius erasure-code large_file.mp4

# Erasure code with custom parameters
hippius erasure-code important_data.zip --k 4 --m 10 --chunk-size 2097152 --encrypt

# Reconstruct a file from erasure-coded chunks
hippius reconstruct QmMetadataCID reconstructed_file.mp4

# Generate an encryption key
hippius keygen

# Generate and copy to clipboard
hippius keygen --copy
```

> ⚡ **Important Note About IPFS Propagation**: When uploading and then immediately downloading files, you may encounter gateway timeouts or "not found" errors. This is normal behavior in distributed networks - content requires time to propagate. For best results:
>
> 1. Wait 30-60 seconds after uploading before attempting to download
> 2. Use the `--publish` flag for better availability 
> 3. Try different gateways if one isn't responding (`--gateway https://dweb.link`)

> ⚠️ **Note for Directory Erasure Coding**: When erasure coding a directory, you have two options:
>
> 1. Archive the directory first, then apply erasure coding to the archive
> 2. Apply erasure coding to individual files within the directory
>
> The second option processes each file independently, but doesn't preserve the directory structure for reconstruction.

### Miner Operations

Register and verify miner nodes on the Hippius blockchain to provide storage, compute, or validation services.

```bash
# Register with main account
hippius miner register-coldkey \
  --node-id YOUR_NODE_PEER_ID \
  --node-priv-hex YOUR_NODE_PRIVATE_KEY \
  --node-type StorageMiner \
  --ipfs-priv-b64 YOUR_IPFS_PRIVATE_KEY

# Register with delegated account
hippius miner register-hotkey \
  --coldkey YOUR_COLDKEY_ADDRESS \
  --node-id YOUR_NODE_PEER_ID \
  --node-priv-hex YOUR_NODE_PRIVATE_KEY \
  --node-type ComputeMiner \
  --ipfs-priv-b64 YOUR_IPFS_PRIVATE_KEY

# Verify node registration
hippius miner verify-node \
  --node-id YOUR_NODE_PEER_ID \
  --node-priv-hex YOUR_NODE_PRIVATE_KEY \
  --ipfs-priv-b64 YOUR_IPFS_PRIVATE_KEY

# Verify coldkey node
hippius miner verify-coldkey-node \
  --node-id YOUR_NODE_PEER_ID \
  --node-priv-hex YOUR_NODE_PRIVATE_KEY \
  --ipfs-priv-b64 YOUR_IPFS_PRIVATE_KEY
```

**Node Types**: `StorageMiner`, `ComputeMiner`, `GpuMiner`, `StorageS3`, `Validator`

> **Note**: IPFS configuration is required for `StorageMiner` and `Validator` types. Use `--ipfs-config /path/to/config` instead of `--ipfs-priv-b64` if you prefer.

---

## SDK Developer Guide

The Hippius SDK is designed to be easy to use in Python applications. The SDK uses asynchronous programming patterns with `async`/`await` for better performance and resource utilization.

### Understanding Async Operation

The SDK uses Python's `asyncio` library for handling asynchronous operations:

```
┌────────────────────┐       ┌───────────────────┐
│ HippiusClient (SDK)│──────►│ IPFSClient        │
└────────────────────┘       └───────────────────┘
          │                            │
          │                            │
          ▼                            ▼
┌────────────────────┐       ┌───────────────────┐
│ SubstrateInterface │       │ AsyncIPFSClient   │
└────────────────────┘       └───────────────────┘
```

This approach provides several benefits:
- Improved throughput for concurrent operations
- Better use of system resources
- Non-blocking network I/O
- Enhanced error handling

### Complete SDK Usage Example

Here's a comprehensive example showing all major SDK features with proper async/await patterns:

```python
import asyncio
import os
from hippius_sdk import HippiusClient

async def run_example():
    # Initialize the client with default connections to Hippius network
    client = HippiusClient()
    
    print("=== Hippius SDK Complete Example ===\n")
    
    # Create a test file
    test_file = "test_file.txt"
    with open(test_file, "w") as f:
        f.write("This is a test file for Hippius SDK.")
    
    try:
        # 1. Upload a file to IPFS
        print("Uploading file...")
        result = await client.upload_file(test_file)
        cid = result["cid"]
        print(f"File uploaded with CID: {cid}")
        print(f"File size: {result['size_formatted']}\n")
        
        # 2. Publish globally
        print("Publishing file globally...")
        publish_result = await client.ipfs_client.publish_global(cid)
        print(f"Global publishing successful: {publish_result['published']}")
        print(f"Message: {publish_result['message']}\n")
        
        # 3. Wait for IPFS propagation (important for reliability)
        print("Waiting for IPFS propagation (30 seconds)...")
        await asyncio.sleep(30)  # Allow time for IPFS propagation
        
        # 4. Download the file
        download_path = "downloaded_file.txt"
        print(f"Downloading file with CID {cid}...")
        dl_result = await client.download_file(cid, download_path)
        print(f"File downloaded to: {dl_result['output_path']}")
        print(f"Download completed in {dl_result['elapsed_seconds']} seconds\n")
        
        # 5. Check if a file exists
        print(f"Checking if CID {cid} exists...")
        exists_result = await client.exists(cid)
        print(f"File exists: {exists_result['exists']}")
        if exists_result['exists']:
            print(f"Gateway URL: {exists_result['gateway_url']}\n")
        
        # 6. Get file content
        print(f"Getting content for CID {cid}...")
        content_result = await client.cat(cid)
        if content_result['is_text']:
            print(f"Content preview: {content_result['text_preview']}")
        else:
            print(f"Binary content (hex): {content_result['hex_preview']}")
        print(f"Content size: {content_result['size_formatted']}\n")
        
        # 7. Pin the file
        print(f"Pinning file with CID {cid}...")
        pin_result = await client.pin(cid)
        print(f"Pinning successful: {pin_result['success']}")
        if not pin_result['success']:
            print(f"Reason: {pin_result['message']}")
        print()
        
        # 8. Utility functions (synchronous)
        print("Using utility functions...")
        formatted_cid = client.format_cid(cid)
        print(f"Formatted CID: {formatted_cid}")
        
        formatted_size = client.format_size(1024 * 1024)
        print(f"1024*1024 bytes formatted: {formatted_size}")  # Output: 1.00 MB
        print()
        
        # 9. Demonstrate error handling with retry
        print("Demonstrating error handling with retry logic...")
        async def retry_with_backoff(func, max_retries=3):
            for attempt in range(max_retries):
                try:
                    return await func()
                except Exception as e:
                    if attempt == max_retries - 1:
                        raise
                    wait_time = 2 ** attempt  # Exponential backoff
                    print(f"Attempt {attempt+1} failed: {e}")
                    print(f"Retrying in {wait_time} seconds...")
                    await asyncio.sleep(wait_time)
        
        try:
            # This will fail but demonstrate proper retry handling
            await retry_with_backoff(
                lambda: client.download_file("QmInvalidCID", "invalid.txt"),
                max_retries=2
            )
        except Exception as e:
            print(f"Expected error caught after retries: {e}")
        print()
        
        print("All examples completed successfully!")
        
    finally:
        # Clean up test files
        for path in [test_file, download_path]:
            if os.path.exists(path):
                os.remove(path)

def main():
    """Entry point for examples"""
    asyncio.run(run_example())

if __name__ == "__main__":
    main()
```

### IPFS Connection Options

> ⚡ **Tip for Beginners**: IPFS requires two different endpoints - an "API" for uploading files and a "Gateway" for downloading them. The Hippius SDK handles this complexity for you, but you can customize both if needed.

#### Understanding IPFS Nodes

There are three ways to interact with IPFS:

1. **Public Gateway** (easiest): Use Hippius or other [public IPFS gateways](https://ipfs.github.io/public-gateway-checker/) without running any software
2. **Remote API Node** (balanced): Use dedicated IPFS nodes run by Hippius or other providers
3. **Local Node** (advanced): Run your own IPFS daemon for full control and privacy

The SDK supports all three connection methods, offering flexibility for different deployment scenarios:

#### 1. Default Hippius Gateway (Easiest)

```python
# Uses Hippius-hosted IPFS nodes
client = HippiusClient()  # Uses defaults
```

#### 2. Custom Remote Endpoints

```python
# Use custom IPFS gateways and API endpoints
client = HippiusClient(
    ipfs_gateway="https://cloudflare-ipfs.com",  # Any public gateway
    ipfs_api_url="https://custom-api.example"    # Your API endpoint
)
```

#### 3. Local IPFS Daemon (Advanced)

```python
# Connect to a local IPFS daemon (must be running)
client = HippiusClient(
    ipfs_gateway="http://127.0.0.1:8080",  # Local gateway
    ipfs_api_url="http://127.0.0.1:5001"   # Local API
)

# Or use the shorthand
client = HippiusClient(local_ipfs=True)
```

The SDK uses straightforward HTTP requests for all IPFS interactions:

- **API Endpoint** (port 5001): Used for uploading files and management operations
- **Gateway Endpoint** (typically port 8080): Used for downloading and accessing files

> 🔍 **What's the difference?** In IPFS, the API endpoint allows you to add and manage content, while the gateway provides HTTP access to retrieve content. Think of the API as the "write" interface and the gateway as the "read" interface.

### Basic File Operations

#### Upload & Download

```python
import asyncio
from hippius_sdk import HippiusClient

async def file_operations():
    client = HippiusClient()
    
    # Upload a file
    print("Uploading file...")
    result = await client.upload_file("path/to/your/file.txt")
    cid = result["cid"]
    print(f"File uploaded with CID: {cid}")
    
    # Check if a file exists
    print("Checking if file exists...")
    exists_result = await client.exists(cid)
    print(f"File exists: {exists_result['exists']}")
    
    # Get file content directly
    print("Getting file content...")
    content_result = await client.cat(cid)
    if content_result['is_text']:
        print(f"Content preview: {content_result['text_preview']}")
    else:
        print(f"Binary content (hex): {content_result['hex_preview']}")
        
    # Download a file
    print("Downloading file...")
    dl_result = await client.download_file(cid, "path/to/save/file.txt")
    print(f"Download successful in {dl_result['elapsed_seconds']} seconds!")

# Run the async function
if __name__ == "__main__":
    asyncio.run(file_operations())
```

#### Directory Operations

```python
import asyncio
from hippius_sdk import HippiusClient

async def directory_operations():
    client = HippiusClient()
    
    # Upload a directory
    print("Uploading directory...")
    dir_result = await client.upload_directory("path/to/your/directory")
    dir_cid = dir_result["cid"]
    file_count = dir_result["file_count"]
    total_size = dir_result["size_formatted"]
    
    print(f"Directory uploaded with CID: {dir_cid}")
    print(f"Contains {file_count} files, total size: {total_size}")
    
    # Download individual files from the directory
    print(f"Accessing files in directory...")
    
    # Example file in the directory - adjust path as needed
    file_path = f"{dir_cid}/example.txt"
    
    # Check if file exists in the directory
    exists_result = await client.exists(file_path)
    if exists_result['exists']:
        print(f"Found file in directory: {file_path}")
        
        # Download the specific file
        await client.download_file(file_path, "downloaded_example.txt")
        print("Downloaded file from directory successfully")

# Run the async function
if __name__ == "__main__":
    asyncio.run(directory_operations())
```

### Handling Errors

Proper error handling is important with async operations:

```python
import asyncio
from hippius_sdk import HippiusClient

async def safe_operations():
    client = HippiusClient()
    
    # Handle file upload errors
    try:
        result = await client.upload_file("path/to/your/file.txt")
        print(f"File uploaded with CID: {result['cid']}")
    except FileNotFoundError:
        print("Error: Input file not found")
    except PermissionError:
        print("Error: Permission denied when reading file")
    except Exception as e:
        print(f"Upload error: {e}")
    
    # Handle download errors    
    try:
        dl_result = await client.download_file("QmInvalidCID", "output.txt")
    except FileNotFoundError:
        print("Error: The CID doesn't exist on IPFS")
    except PermissionError:
        print("Error: Permission denied when writing to output file")
    except ValueError as e:
        print(f"Error: Invalid CID format - {e}")
    except Exception as e:
        print(f"Download error: {e}")
    
    # Handle connection errors
    try:
        # This will fail if the gateway is unreachable
        await client.exists("QmValidButUnreachableCID")
    except ConnectionError:
        print("Error: Cannot connect to IPFS gateway")
    except TimeoutError:
        print("Error: Connection to IPFS gateway timed out")
    except Exception as e:
        print(f"Connection error: {e}")

# Run the async function
if __name__ == "__main__":
    asyncio.run(safe_operations())
```

---

## Advanced Features

### Encryption

Hippius SDK supports end-to-end encryption for secure file storage and retrieval using the NaCl (libsodium) cryptography library.

#### Generating an Encryption Key

The SDK provides a command-line tool for generating secure encryption keys:

```bash
# Generate a new encryption key
hippius keygen

# Generate and copy to clipboard (requires pyperclip)
hippius keygen --copy
```

#### Setting Up Encryption

The SDK can be configured to use encryption in several ways:

1. Through environment variables:
   ```
   # In your .env file
   HIPPIUS_ENCRYPTION_KEY=your-base64-encoded-key
   HIPPIUS_ENCRYPT_BY_DEFAULT=true
   ```

2. Through configuration:
   ```bash
   hippius config set encryption encryption_key your-base64-encoded-key
   hippius config set encryption encrypt_by_default true
   ```

3. Directly in code:
   ```python
   import base64
   from hippius_sdk import HippiusClient
   
   def setup_encryption():
       """Set up a client with encryption enabled (synchronous function)"""
       # If you have an existing key
       # encryption_key = base64.b64decode("your-base64-encoded-key")
       
       # Or generate a new key programmatically (synchronous method)
       client = HippiusClient()
       encoded_key = client.generate_encryption_key()
       print(f"Generated key: {encoded_key}")
       
       # Decode the generated key for use
       encryption_key = base64.b64decode(encoded_key)
       
       # Create a client with encryption enabled
       encrypted_client = HippiusClient(
           encrypt_by_default=True,
           encryption_key=encryption_key
       )
       
       return encrypted_client
   
   async def main():
       # Get encrypted client (this call is synchronous, no await needed)
       client = setup_encryption()
       
       # Now use the client for async operations
       result = await client.upload_file("sensitive_data.txt")
       print(f"Encrypted file uploaded: {result['cid']}")
       
   asyncio.run(main())
   ```

#### Using Encryption

Once configured, encryption works transparently:

```python
async def encryption_example():
    client = HippiusClient(encrypt_by_default=True)
    
    # Upload with encryption (uses default setting)
    result = await client.upload_file("sensitive_data.txt")
    
    # Explicitly enable/disable encryption for a specific operation
    encrypted_result = await client.upload_file("sensitive_data.txt", encrypt=True)
    unencrypted_result = await client.upload_file("public_data.txt", encrypt=False)
    
    # Download and decrypt automatically
    dl_result = await client.download_file(encrypted_result['cid'], "decrypted_file.txt")
    
    # Explicitly control decryption
    decrypted_result = await client.download_file(
        encrypted_result['cid'], 
        "output.txt", 
        decrypt=True
    )
    
    # Get raw encrypted content without decryption
    raw_result = await client.download_file(
        encrypted_result['cid'], 
        "still_encrypted.txt", 
        decrypt=False
    )
    
    # View encrypted content
    content = await client.cat(encrypted_result['cid'], decrypt=True)

asyncio.run(encryption_example())
```

### Erasure Coding

> 🔍 **What is Erasure Coding?** Erasure coding is a technique that splits your files into fragments and adds redundancy, allowing you to recover the entire file even if some fragments are lost. It's like RAID for decentralized storage.

Erasure coding provides data redundancy by splitting files into chunks with added redundancy, enabling reconstruction even if some chunks are lost or corrupted. This is particularly valuable for important files stored on a distributed network.

Hippius uses the [Reed-Solomon error correction algorithm](https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction), a well-established technique used in everything from CDs and DVDs to QR codes and deep space communications. The [implementation in Hippius](https://ieeexplore.ieee.org/document/10392473) is optimized for efficient operation in a decentralized network environment.

#### How Erasure Coding Works

```
Original File
      │
      ▼
┌─────────────┐
│ Split into k │
│ data chunks  │
└─────────────┘
      │
      ▼
┌─────────────┐
│ Generate m-k │
│ parity chunks│
└─────────────┘
      │
      ▼
┌─────────────┐
│ Store all m  │
│ chunks       │
└─────────────┘
```

Where:
- **k**: Minimum number of chunks needed to reconstruct the file
- **m**: Total number of chunks created (where m > k)
- The file can be reconstructed from any k chunks out of m total

#### Using Erasure Coding

```python
from hippius_sdk import HippiusClient
import asyncio

async def erasure_coding_example():
    client = HippiusClient()
    
    # Erasure code a file with default parameters (k=3, m=5)
    result = await client.erasure_code_file("large_file.mp4")
    metadata_cid = result["metadata_cid"]
    print(f"File erasure coded with metadata CID: {metadata_cid}")
    
    # Use custom parameters for more redundancy and publish globally
    # Publishing makes the content more widely available across the IPFS network
    result = await client.erasure_code_file(
        file_path="important_data.zip",
        k=4,                # Need 4 chunks to reconstruct
        m=10,               # Create 10 chunks total (6 redundant)
        chunk_size=2097152, # 2MB chunks
        encrypt=True        # Encrypt before splitting
    )
    
    # Publish the metadata globally for better availability
    publish_result = await client.ipfs_client.publish_global(result["metadata_cid"])
    print(f"Metadata published globally: {publish_result['published']}")
    
    # Important: Wait for IPFS propagation before attempting reconstruction
    # This is crucial for reliable operation, especially with erasure-coded files
    print("Waiting for IPFS propagation (60 seconds)...")
    await asyncio.sleep(60)  # Allow time for IPFS propagation
    
    # Reconstruct a file from its metadata
    reconstructed_path = await client.reconstruct_from_erasure_code(
        metadata_cid=metadata_cid,
        output_file="reconstructed_file.mp4",
        verbose=True  # Enable detailed debugging information
    )
    
    print(f"File reconstructed to: {reconstructed_path}")

asyncio.run(erasure_coding_example())
```

#### When to Use Erasure Coding

Erasure coding is particularly useful for:

- Large files where reliability is critical
- Long-term archival storage
- Data that must survive partial network failures
- Situations where higher redundancy is needed without full replication

#### Erasure Coding vs. Simple Replication

| Feature | Erasure Coding | Simple Replication |
| ---------------- | ----------------------------- | ---------------------------- |
| Space Efficiency | High (typically ~1.6x size) | Low (typically 3x size) |
| Redundancy | Customizable (k,m parameters) | Fixed |
| Recovery | Can lose up to (m-k) chunks | Must have 1 complete copy |
| Complexity | Higher | Lower |
| Ideal for | Large, important files | Small, easily replaced files |

#### Advanced Options

```python
async def advanced_erasure_coding():
    client = HippiusClient()
    
    # For extremely large files, use larger chunks
    result = await client.erasure_code_file(
        file_path="massive_video.mp4",
        chunk_size=10485760  # 10MB chunks
    )
    
    # For small files, use smaller parameters
    result = await client.erasure_code_file(
        file_path="small_doc.txt",
        k=2,
        m=4,
        chunk_size=4096
    )

asyncio.run(advanced_erasure_coding())
```

> 🔍 **Power User Info**: The erasure coding implementation automatically adjusts parameters for small files:
>
> - If a file is too small to be split into `k` chunks, the SDK will adjust the chunk size
> - For very small files, the content is split into exactly `k` sub-blocks
> - Parameters are always optimized to provide the requested level of redundancy

#### Directory Support for Erasure Coding

When applying erasure coding to an entire directory:

```bash
# The CLI will detect that it's a directory and offer two options:
hippius erasure-code my_directory/

# Or use the dedicated command
hippius erasure-code-dir my_important_files/ --k 4 --m 8 --encrypt
```

> ⚠️ **Important Note**: When erasure coding a directory:
>
> - Each file is processed independently and gets its own metadata CID
> - The original directory structure is not preserved for reconstruction
> - You'll need to reconstruct each file individually using its specific metadata CID
> - For preserving directory structure, consider archiving the directory first

### Account Management

Hippius uses a hierarchical account structure with coldkeys (main accounts) and hotkeys (delegated accounts).

#### Managing Named Accounts

```python
from hippius_sdk.account import AccountManager
import asyncio

async def account_management():
    # Initialize the account manager
    account_manager = AccountManager()
    
    # Create a coldkey (main account)
    coldkey = await account_manager.create_coldkey(
        name="my_hippius_coldkey",  # Optional custom name
        mnemonic=None  # Will generate if not provided
    )
    
    print(f"Created coldkey with address: {coldkey['address']}")
    
    # Create a hotkey associated with the coldkey
    hotkey = await account_manager.create_hotkey(
        name="my_hippius_hotkey_1",  # Optional custom name
        coldkey_address=coldkey["address"]  # Optional association
    )
    
    print(f"Created hotkey with address: {hotkey['address']}")
    
    # List all coldkeys
    coldkeys = await account_manager.list_coldkeys()
    
    # List hotkeys for a specific coldkey
    hotkeys = await account_manager.list_hotkeys(coldkey_address=coldkey["address"])

asyncio.run(account_management())
```

#### Proxy Relationships

Proxy relationships allow hotkeys to act on behalf of coldkeys:

```python
async def proxy_management():
    account_manager = AccountManager()
    
    # Create a proxy relationship on the blockchain
    result = await account_manager.create_proxy_relationship(
        coldkey_address="5H1QBRF7T7dgKwzVGCgS4wioudvMRf9K4NEDzfuKLnuyBNzH",
        hotkey_address="5EJA1oSrTx7xYMBerrUHLnuE2YGmgGgCdJmjNYT5Qv7qM5vm",
        proxy_type="NonTransfer",  # Type of permissions granted
        delay=0  # Blocks before proxy becomes active
    )
    
    # List proxy relationships
    proxies = await account_manager.list_proxies(
        coldkey_address="5H1QBRF7T7dgKwzVGCgS4wioudvMRf9K4NEDzfuKLnuyBNzH"
    )
    
    # Remove a proxy relationship
    result = await account_manager.remove_proxy(
        coldkey_address="5H1QBRF7T7dgKwzVGCgS4wioudvMRf9K4NEDzfuKLnuyBNzH",
        hotkey_address="5EJA1oSrTx7xYMBerrUHLnuE2YGmgGgCdJmjNYT5Qv7qM5vm"
    )

asyncio.run(proxy_management())
```

> 🔍 **Power User Info**: Different proxy types grant different permissions:
>
> - `NonTransfer`: Can perform operations except transferring funds
> - Other types may be available depending on the chain configuration
> 
> It's recommended to create separate hotkeys for different applications to limit impact if one is compromised.

#### Seed Phrase Management

For enhanced security, Hippius supports encrypting your seed phrases:

```python
async def seed_management():
    client = HippiusClient()
    
    # Set a seed phrase for the active account
    await client.set_seed_phrase("your twelve word seed phrase here")
    
    # Set with encryption (will prompt for password)
    await client.set_seed_phrase("your twelve word seed phrase here", encode=True)
    
    # Check seed phrase status
    status = await client.get_seed_status()
    print(f"Seed phrase is {'encrypted' if status['encoded'] else 'not encrypted'}")

asyncio.run(seed_management())
```

> 🔍 **Power User Info**: Password-based encryption leverages:
>
> - PBKDF2 with SHA-256 for key derivation
> - Strong cryptography to protect your seed phrase
> - Your password is never stored, only used temporarily to decrypt

### Configuration

Hippius stores configuration in `~/.hippius/config.json` and provides APIs to manage it.

#### Configuration Structure

```json
{
  "ipfs": {
    "gateway": "https://ipfs.io",
    "api_url": "https://store.hippius.network",
    "local_ipfs": false
  },
  "substrate": {
    "url": "wss://rpc.hippius.network",
    "seed_phrase": null,
    "default_miners": [],
    "default_address": null
  },
  "encryption": {
    "encrypt_by_default": false,
    "encryption_key": null
  },
  "erasure_coding": {
    "default_k": 3,
    "default_m": 5,
    "default_chunk_size": 1048576
  },
  "cli": {
    "verbose": false,
    "max_retries": 3
  }
}
```

#### Managing Configuration in Code

```python
from hippius_sdk import get_config_value, set_config_value, HippiusClient
import asyncio

async def configuration_management():
    # Get a configuration value
    gateway = get_config_value("ipfs", "gateway")
    print(f"Current gateway: {gateway}")
    
    # Set a configuration value
    set_config_value("ipfs", "gateway", "https://dweb.link")
    
    # Client will automatically use configuration values
    client = HippiusClient()
    
    # Or override specific settings
    client = HippiusClient(ipfs_gateway="https://custom-gateway.example")

asyncio.run(configuration_management())
```

> 🔍 **Power User Info**: Configuration precedence (highest to lowest):
>
> 1. Parameters passed directly to the client
> 2. Environment variables
> 3. Configuration file values
> 4. Default values built into the SDK

---

## Development & Testing

This section provides information for contributors and those wanting to test or extend the Hippius SDK.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/thenervelab/hippius-sdk.git
cd hippius-sdk

# Install dependencies
poetry install

# With encryption and clipboard support
poetry install -E clipboard
```

### Testing the SDK

```bash
# Run all tests
poetry run pytest

# Run specific tests
poetry run pytest tests/test_ipfs.py

# Run a specific test function
poetry run pytest tests/test_ipfs.py::test_upload_file
```

### Testing Locally

You can test Hippius locally during development:

#### 1. Install in Development Mode

```bash
# In the root directory of the project
poetry install

# With encryption and clipboard support
poetry install -E clipboard
```

#### 2. Testing the CLI

```bash
# Basic commands
hippius --help
hippius keygen

# To see what commands would do without actually running them
hippius --verbose store myfile.txt
```

#### 3. Testing the SDK

Create a small test script:

```python
# test_script.py
from hippius_sdk import HippiusClient
from dotenv import load_dotenv
import asyncio
import os

# Load environment variables
load_dotenv()

async def main():
    # Create a client
    client = HippiusClient()
    
    # Test a simple operation
    print("Testing IPFS client...")
    try:
        result = await client.exists("QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx")
        print(f"Result: {result}")
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(main())
```

Then run it:

```bash
python test_script.py
```

#### 4. Building the Package

If you want to test the exact package that will be uploaded to PyPI:

```bash
# Build the package
poetry build

# Install the built package in a virtual environment
python -m venv test_env
source test_env/bin/activate  # On Windows: test_env\Scripts\activate
pip install dist/hippius-*.whl

# Test the installed package
hippius --help
```

### Development Best Practices

1. **Test before committing**: Always run tests before submitting a PR
2. **Follow the code style**: Use black, isort, and pylint
3. **Add type hints**: The codebase uses full typing with annotation
4. **Write docstrings**: Follow Google style docstrings
5. **Add tests**: Maintain test coverage when adding features

---

## Troubleshooting

### Common Issues and Solutions

#### IPFS Propagation Delays (Important!)

**Problem**: Files not found or gateway timeouts immediately after uploading
**Solution**:
1. Wait for content to propagate through the IPFS network:
   ```python
   # In Python code
   import asyncio
   await asyncio.sleep(60)  # Wait 60 seconds after uploading
   ```
   ```bash
   # In shell scripts
   hippius store myfile.txt
   sleep 60  # Wait 60 seconds before downloading
   hippius download QmCID123 output.txt
   ```
   
2. Use the global publishing feature:
   ```bash
   # With CLI
   hippius erasure-code large_file.mp4 --publish
   ```
   ```python
   # In Python code
   result = await client.upload_file("myfile.txt")
   await client.ipfs_client.publish_global(result["cid"])
   ```
   
3. Implement retry logic for important operations:
   ```python
   async def retry_with_backoff(func, max_retries=3):
       for attempt in range(max_retries):
           try:
               return await func()
           except Exception as e:
               if attempt == max_retries - 1:
                   raise
               wait_time = 2 ** attempt  # Exponential backoff
               print(f"Retrying in {wait_time} seconds...")
               await asyncio.sleep(wait_time)
   
   # Use the retry function
   await retry_with_backoff(
       lambda: client.download_file(cid, "output.txt")
   )
   ```

#### IPFS Connection Issues

**Problem**: Unable to connect to IPFS node
**Solution**:
1. Check if your IPFS gateway is accessible:
   ```bash
   curl -s https://ipfs.io/ipfs/QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A
   ```
2. Try using a different gateway:
   ```bash
   hippius --gateway https://dweb.link download QmCID output.txt
   ```
3. Check your internet connection and any firewalls.

#### Missing Dependencies

**Problem**: Import errors or missing functionality
**Solution**:
1. Install all extra dependencies:
   ```bash
   pip install hippius[all]
   # Or with Poetry:
   poetry add hippius -E all
   ```
2. Verify Python version is 3.9+:
   ```bash
   python --version
   ```

#### CLI Not Found

**Problem**: `hippius` command not found after installing
**Solution**:
1. Check if it's installed:
   ```bash
   pip show hippius
   ```
2. Check your PATH:
   ```bash
   which hippius
   ```
3. Try installing with pipx for better isolation:
   ```bash
   pip install --user pipx
   pipx install hippius
   ```

#### Default Address Issues

**Problem**: Errors about missing account address
**Solution**:
1. Set a default address:
   ```bash
   hippius address set-default 5H1QBRF7T7dgKwzVGCgS4wioudvMRf9K4NEDzfuKLnuyBNzH
   ```
2. Or specify the address with each command:
   ```bash
   hippius files --address 5H1QBRF7T7dgKwzVGCgS4wioudvMRf9K4NEDzfuKLnuyBNzH
   ```

#### Substrate Connection Issues

**Problem**: Errors connecting to Substrate blockchain
**Solution**:
1. Check your substrate URL:
   ```bash
   hippius config get substrate url
   ```
2. Set a correct URL if needed:
   ```bash
   hippius config set substrate url wss://rpc.hippius.network
   ```
3. Check your internet connection and any firewalls.

#### Erasure Coding Problems

**Problem**: "Wrong length for input blocks"
**Solution**: This typically happens with very small files. Try smaller k and m values:
```bash
hippius erasure-code small_file.txt --k 2 --m 3
```

**Problem**: "zfec is required"
**Solution**: Install the missing package:
```bash
pip install zfec
```

**Problem**: Slow performance with large files
**Solution**: Increase chunk size:
```bash
hippius erasure-code large_file.mp4 --chunk-size 5242880  # 5MB chunks
```

### Getting Help

If you encounter issues not covered here:

1. Check the verbose output:
   ```bash
   hippius --verbose command args
   ```

2. Check for common environment issues:
   ```bash
   hippius doctor
   ```

3. Report issues on the GitHub repository:
   [https://github.com/thenervelab/hippius-sdk](https://github.com/thenervelab/hippius-sdk)

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## API Reference

For complete API documentation, check out the [API Reference](https://docs.hippius.network/api).