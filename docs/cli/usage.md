# Hippius

A Python SDK and CLI for interacting with Hippius blockchain storage, designed specifically for ML developers working with Bittensor.

## Features

- IPFS operations: Upload and download files to/from IPFS
- Multiple connection methods for IPFS (RPC or HTTP API)
- Human-readable formatting of file sizes and CIDs
- Simple and intuitive API for ML developers
- Substrate blockchain integration for decentralized storage references
- End-to-end encryption for secure file storage and retrieval
- Built-in CLI tools for encryption key generation

## Installation

```bash

# Using pipx
pipx install hippius

# Using pip
pip install hippius

# Using Poetry
poetry add hippius

# With clipboard support for encryption key utility
poetry add hippius -E clipboard
```

## Quick Start

```python
from hippius_sdk import HippiusClient

# Initialize the client with default connections to Hippius network
client = HippiusClient()

# Or specify custom endpoints
client = HippiusClient(
    ipfs_gateway="https://ipfs.io",                       # For downloads (default)
    ipfs_api_url="https://store.hippius.network",  # For uploads (default)
)

# Upload a file to IPFS
result = client.upload_file("path/to/your/model.pt")
print(f"File uploaded with CID: {result['cid']}")
print(f"File size: {result['size_formatted']}")

# Download a file from IPFS
dl_result = client.download_file(result['cid'], "path/to/save/model.pt")
print(f"Download successful in {dl_result['elapsed_seconds']} seconds")
print(f"File size: {dl_result['size_formatted']}")

# Check if a file exists
exists_result = client.exists(result['cid'])
print(f"File exists: {exists_result['exists']}")
print(f"Gateway URL: {exists_result['gateway_url']}")

# Get file content directly
content_result = client.cat(result['cid'])
if content_result['is_text']:
    print(f"Content preview: {content_result['text_preview']}")
else:
    print(f"Binary content (hex): {content_result['hex_preview']}")
print(f"Content size: {content_result['size_formatted']}")

# Pin a file to ensure it stays on the network
pin_result = client.pin(result['cid'])
print(f"Pinning successful: {pin_result['success']}")
print(f"Message: {pin_result['message']}")

# Format a CID for display
formatted_cid = client.format_cid(result['cid'])
print(f"Formatted CID: {formatted_cid}")

# Format file size for display
formatted_size = client.format_size(1024 * 1024)
print(f"Formatted size: {formatted_size}")  # Output: 1.00 MB
```

## Encryption Support

Hippius SDK supports end-to-end encryption for secure file storage and retrieval using the NaCl (libsodium) cryptography library.

### Generating an Encryption Key

```bash
# After installing the SDK, you can use the built-in command-line tool:
hippius-keygen

# Generate and copy to clipboard (requires pyperclip)
hippius-keygen --copy
```

### Setting Up Encryption

The SDK can be configured to use encryption in several ways:

1. Through environment variables (recommended for development):
   ```
   # In your .env file
   HIPPIUS_ENCRYPTION_KEY=your-base64-encoded-key
   HIPPIUS_ENCRYPT_BY_DEFAULT=true
   ```

2. Directly in code:
   ```python
   import base64
   from hippius_sdk import HippiusClient
   
   # Decode the base64 key
   encryption_key = base64.b64decode("your-base64-encoded-key")
   
   # Initialize client with encryption enabled
   client = HippiusClient(
       encrypt_by_default=True,
       encryption_key=encryption_key
   )
   
   # Or generate a new key programmatically
   encoded_key = client.generate_encryption_key()
   print(f"Generated key: {encoded_key}")
   ```

### Using Encryption

Once configured, encryption works transparently:

```python
# Upload with encryption (uses default setting)
result = client.upload_file("sensitive_data.txt")

# Explicitly enable/disable encryption for a specific operation
encrypted_result = client.upload_file("sensitive_data.txt", encrypt=True)
unencrypted_result = client.upload_file("public_data.txt", encrypt=False)

# Download and decrypt automatically
dl_result = client.download_file(encrypted_result['cid'], "decrypted_file.txt")

# Explicitly control decryption
decrypted_result = client.download_file(encrypted_result['cid'], "output.txt", decrypt=True)
raw_result = client.download_file(encrypted_result['cid'], "still_encrypted.txt", decrypt=False)

# View encrypted content
content = client.cat(encrypted_result['cid'], decrypt=True)
```

## Erasure Coding

Hippius SDK supports Reed-Solomon erasure coding for reliable and resilient file storage. This allows files to be split into chunks with added redundancy, so that the original file can be reconstructed even if some chunks are lost.

### Erasure Coding Concepts

- **k**: The number of data chunks needed to reconstruct the original file
- **m**: The total number of chunks created (m > k)
- The file can be reconstructed from any k chunks out of m total chunks
- Higher redundancy (m-k) provides better protection against chunk loss

### Using Erasure Coding

```python
from hippius_sdk import HippiusClient

client = HippiusClient()

# Erasure code a file with default parameters (k=3, m=5)
result = client.erasure_code_file("large_file.mp4")
metadata_cid = result["metadata_cid"]

# Use custom parameters for more redundancy
result = client.erasure_code_file(
    file_path="important_data.zip",
    k=4,               # Need 4 chunks to reconstruct
    m=10,              # Create 10 chunks total (6 redundant)
    chunk_size=2097152,  # 2MB chunks
    encrypt=True       # Encrypt before splitting
)

# Store erasure-coded file in Hippius marketplace
result = client.store_erasure_coded_file(
    file_path="critical_backup.tar",
    k=3,
    m=5,
    encrypt=True,
    miner_ids=["miner1", "miner2", "miner3"]
)

# Reconstruct a file from its metadata
reconstructed_path = client.reconstruct_from_erasure_code(
    metadata_cid=metadata_cid,
    output_file="reconstructed_file.mp4"
)
```

### When to Use Erasure Coding

Erasure coding is particularly useful for:

- Large files where reliability is critical
- Long-term archival storage
- Data that must survive partial network failures
- Situations where higher redundancy is needed without full replication

### Advanced Features

#### Small File Handling

The SDK automatically adjusts parameters for small files:

- If a file is too small to be split into `k` chunks, the SDK will adjust the chunk size
- For very small files, the content is split into exactly `k` sub-blocks
- Parameters are always optimized to provide the requested level of redundancy

#### Robust Storage in Marketplace

When using `store_erasure_coded_file`, the SDK now:

- Stores both the metadata file AND all encoded chunks in the marketplace
- Ensures miners can access all necessary data for redundancy and retrieval
- Reports total number of files stored for verification

#### CLI Commands

The CLI provides powerful commands for erasure coding:

```bash
# Basic usage with automatic parameter adjustment
hippius erasure-code myfile.txt

# Specify custom parameters
hippius erasure-code large_video.mp4 --k 4 --m 8 --chunk-size 4194304

# For smaller files, using smaller parameters
hippius erasure-code small_doc.txt --k 2 --m 5 --chunk-size 4096

# Reconstruct a file from its metadata CID
hippius reconstruct QmMetadataCID reconstructed_file.mp4
```

The CLI provides detailed output during the process, including:
- Automatic parameter adjustments for optimal encoding
- Progress of chunk creation and upload
- Storage confirmation in the marketplace
- Instructions for reconstruction

#### Erasure Coding

Erasure coding offers redundancy by splitting files into chunks:

```bash
# Basic erasure coding with default parameters (k=3, m=5)
hippius erasure-code my_large_file.zip

# Erasure code with custom parameters for increased redundancy
hippius erasure-code my_important_file.mp4 --k 4 --m 10 --chunk-size 2097152 --encrypt
```

To reconstruct a file from erasure-coded chunks:

```bash
hippius reconstruct QmMetadataCID reconstructed_filename
```

#### Listing Erasure Coded Files

To view only your erasure-coded files:

```bash
# List all erasure-coded files
hippius ec-files

# Show all miners for each erasure-coded file
hippius ec-files --all-miners

# Show associated chunks for each erasure-coded file
hippius ec-files --show-chunks
```

This command provides detailed information about each erasure-coded file including:
- Original file name
- Metadata CID
- File size
- Number of chunks
- Miners storing the file
- Reconstruction command

The `ec-files` command is optimized for performance through parallel processing and intelligent filtering, making it efficient even with large numbers of files.

#### Performance Considerations

The erasure coding implementation has been optimized for:

1. **Speed**: Parallel processing for file operations
2. **Memory efficiency**: Files are processed in chunks to minimize memory usage
3. **Auto-tuning**: Parameters like chunk size are automatically adjusted for small files
4. **Intelligent filtering**: The system can quickly identify potential erasure-coded files

For extremely large files (>1GB), consider using larger chunk sizes to improve performance:

```bash
hippius erasure-code large_video.mp4 --chunk-size 10485760  # 10MB chunks
```

#### Directory Support for Erasure Coding

Hippius SDK now supports applying erasure coding to entire directories:

```bash
# Apply erasure coding to an entire directory
hippius erasure-code my_directory/

# The CLI will detect that it's a directory and offer two options:
# 1. Archive the directory first, then erasure code the archive
# 2. Apply erasure coding to each file in the directory individually
```

When choosing the second option, the system will process each file in the directory individually, adjusting parameters like chunk size automatically for small files. A summary of the operation will be displayed, showing:
- Total files processed
- Successfully coded files with their metadata CIDs
- Any files that failed, with error details

You can also directly use the dedicated command for directory erasure coding:

```bash
# Direct command for applying erasure coding to an entire directory
hippius erasure-code-dir my_directory/

# With custom parameters
hippius erasure-code-dir my_important_files/ --k 4 --m 8 --encrypt
```

This dedicated command processes each file in the directory individually, optimizing erasure coding parameters for each file based on its size.

**Important Note on Directory Structure:**
- The command processes all files in the entire directory hierarchy, including all subdirectories
- Each file is processed independently and gets its own separate metadata CID
- The original directory structure is not automatically preserved for reconstruction
- You will need to reconstruct each file individually using its specific metadata CID

If preserving the exact directory structure is important, consider these options:
1. Archive the directory first (option 1 above), then erasure code the single archive file
2. Keep track of the original file paths relative to the root directory in your own system
3. For small directories with few files, reconstruct each file individually and manually recreate the structure

To reconstruct a file from erasure-coded chunks:

```bash
hippius reconstruct QmMetadataCID reconstructed_filename
```

**Integration with Other Features:**
The directory erasure coding functionality works seamlessly with other Hippius SDK features:

- **Account Management**: Use with multiple coldkeys and hotkeys by specifying the account with `--account` 
- **Default Address**: Combined with default address management for streamlined operations
- **Proxy Support**: Hotkeys with proper permissions can perform erasure coding operations on behalf of a coldkey
- **Configuration Management**: All erasure coding parameters can be preset in your config file with `hippius config set`

For a comprehensive workflow, you can manage accounts, set default addresses, configure erasure coding parameters, and then process directories in a single sequence of commands:

```bash
# Set active account
hippius account switch my_account_name

# Set default address for operations
hippius address set-default 5H1QBRF7T7dgKwzVGCgS4wioudvMRf9K4NEDzfuKLnuyBNzH

# Configure default erasure coding parameters
hippius config set erasure_coding default_k 4
hippius config set erasure_coding default_m 8

# Apply erasure coding to a directory
hippius erasure-code-dir my_important_directory/

# Check the status of erasure-coded files
hippius ec-files
```

#### Default Address Management

Hippius SDK now allows setting a default address for read-only operations, making it easier to use commands like `files` and `ec-files` without specifying an account address each time:

```bash
# Set a default address for read-only operations
hippius address set-default 5H1QBRF7T7dgKwzVGCgS4wioudvMRf9K4NEDzfuKLnuyBNzH

# View the currently set default address
hippius address get-default

# Clear the default address
hippius address clear-default
```

Once a default address is set, commands like `hippius files` and `hippius ec-files` will automatically use this address when no explicit address is provided.

#### Troubleshooting

1. **IPFS Connection Issues**: Make sure you have either:
   - A local IPFS daemon running (`ipfs daemon` in a separate terminal)
   - Or proper environment variables set in `.env` for remote connections

2. **Missing Dependencies**: If you get import errors, ensure all dependencies are installed:
   ```bash
   poetry install --all-extras
   ```

3. **CLI Not Found**: If the `hippius` command isn't found after installing, try:
   ```bash
   # Verify it's installed
   poetry show hippius
   
   # Check your PATH
   which hippius
   ```

4. **Default Address Issues**: If you receive errors about missing account address:
   ```bash
   # Set a default address for read-only operations
   hippius address set-default 5H1QBRF7T7dgKwzVGCgS4wioudvMRf9K4NEDzfuKLnuyBNzH
   ```

5. **Substrate Issues**: For marketplace operations, make sure your `.env` has the correct `SUBSTRATE_SEED_PHRASE` and `SUBSTRATE_URL` values.

6. **Erasure Coding Problems**:
   - **"Wrong length for input blocks"**: This typically happens with very small files
     ```bash
     # Try smaller k and m values for small files
     hippius erasure-code small_file.txt --k 2 --m 3
     ```
   - **Directories can't be directly coded**: Use the directory support option when prompted
   - **"zfec is required"**: Install the missing package
     ```bash
     pip install zfec
     poetry add zfec
     ```
   - **Slow performance with large files**: Increase chunk size
     ```bash
     hippius erasure-code large_file.mp4 --chunk-size 5242880  # 5MB chunks
     ```

## Command Line Interface

The Hippius SDK includes a powerful command-line interface (CLI) that provides access to all major features of the SDK directly from your terminal.

### Basic Usage

```bash
# Get help and list available commands
hippius --help

# Set global options
hippius --gateway https://ipfs.io --api-url https://store.hippius.network --verbose
```

### IPFS Operations

```bash
# Download a file from IPFS
hippius download QmCID123 output_file.txt

# Check if a CID exists
hippius exists QmCID123

# Display file content
hippius cat QmCID123

# Store a file on IPFS and Hippius Marketplace
hippius store my_file.txt

# Store a directory on IPFS and Hippius Marketplace
hippius store-dir ./my_directory
```

### Account Operations

```bash
# Check available credits for an account
hippius credits

# Check credits for a specific account
hippius credits 5H1QBRF7T7dgKwzVGCgS4wioudvMRf9K4NEDzfuKLnuyBNzH

# View files stored by an account
hippius files

# View files for a specific account
hippius files 5H1QBRF7T7dgKwzVGCgS4wioudvMRf9K4NEDzfuKLnuyBNzH

# Show all miners for each file
hippius files --all-miners

# View only erasure-coded files
hippius ec-files

# View erasure-coded files with details about chunks
hippius ec-files --show-chunks
```

### Encryption

```bash
# Generate an encryption key
hippius keygen

# Generate and copy to clipboard
hippius keygen --copy

# Upload with encryption
hippius store my_file.txt --encrypt

# Download and decrypt
hippius download QmCID123 output_file.txt --decrypt
```

### Erasure Coding

```bash
# Erasure code a file with default parameters (k=3, m=5)
hippius erasure-code large_file.mp4

# Erasure code with custom parameters
hippius erasure-code important_data.zip --k 4 --m 10 --chunk-size 2097152 --encrypt

# Reconstruct a file from its metadata
hippius reconstruct QmMetadataCID reconstructed_file.mp4

# List all your erasure-coded files with metadata CIDs
hippius ec-files

# Show all miners for each erasure-coded file
hippius ec-files --all-miners

# Show detailed information including associated chunks
hippius ec-files --show-chunks
```

The `ec-files` command has been optimized for performance and can now handle large numbers of files efficiently through parallel processing.

### Using Environment Variables

The CLI automatically reads from your `.env` file for common settings:

```
IPFS_GATEWAY=https://ipfs.io
IPFS_API_URL=https://store.hippius.network
SUBSTRATE_URL=wss://rpc.hippius.network
SUBSTRATE_SEED_PHRASE="your twelve word seed phrase..."
SUBSTRATE_DEFAULT_MINERS=miner1,miner2,miner3
HIPPIUS_ENCRYPTION_KEY=your-base64-encoded-key
HIPPIUS_ENCRYPT_BY_DEFAULT=true|false
```

## Detailed Usage

### IPFS Operations

```python
from hippius_sdk import IPFSClient

# Initialize the IPFS client (uses Hippius relay node by default)
ipfs_client = IPFSClient()

# Or specify custom endpoints
ipfs_client = IPFSClient(
    gateway="https://ipfs.io",                       # For downloads
    api_url="http://relay-fr.hippius.network:5001"   # For uploads
)

# Upload a file
result = ipfs_client.upload_file("path/to/your/file.txt")
cid = result["cid"]
size = result["size_formatted"]

# Upload a directory
dir_result = ipfs_client.upload_directory("path/to/your/directory")
dir_cid = dir_result["cid"]
file_count = dir_result["file_count"]
total_size = dir_result["size_formatted"]

# Download a file
dl_result = ipfs_client.download_file(cid, "path/to/save/file.txt")
success = dl_result["success"]
elapsed_time = dl_result["elapsed_seconds"]

# Check if a CID exists
exists_result = ipfs_client.exists(cid)
exists = exists_result["exists"]
gateway_url = exists_result["gateway_url"]

# Get file content directly
content_result = ipfs_client.cat(cid)
content = content_result["content"]
is_text = content_result["is_text"]
preview = content_result["text_preview"] if is_text else content_result["hex_preview"]

# Pin a file
pin_result = ipfs_client.pin(cid)
success = pin_result["success"]
message = pin_result["message"]

# Format a CID
formatted_cid = ipfs_client.format_cid("6261666b7265696134...")  # Hex-encoded CID
# Will return a proper formatted CID like "bafkrei..."

# Format a file size
human_readable = ipfs_client.format_size(1048576)  # 1 MB
```

### IPFS Connection Methods

The SDK provides robust connection handling for IPFS:

1. **RPC Connection (Default)**: Attempts to connect to the IPFS node via its RPC port (typically 5001) using the `ipfshttpclient` library.

2. **HTTP API Fallback**: If the RPC connection fails, the SDK automatically falls back to using the HTTP REST API (same approach as used in web browsers).

This dual approach ensures maximum compatibility across different environments. The fallback happens automatically, so you don't need to worry about it.

## Configuration

Hippius SDK now supports persistent configuration stored in your home directory at `~/.hippius/config.json`. This makes it easier to manage your settings without having to specify them each time or maintain environment variables.

### Configuration Management

The configuration file is automatically created with default values when you first use the SDK. You can manage it using the CLI:

```bash
# List all configuration settings
hippius config list

# Get a specific configuration value
hippius config get ipfs gateway

# Set a configuration value
hippius config set ipfs gateway https://ipfs.io

# Import settings from your .env file
hippius config import-env

# Reset configuration to default values
hippius config reset
```

### Configuration Structure

The configuration is organized in the following sections:

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

### Environment Variables and Configuration

The SDK still supports environment variables for backward compatibility. You can import settings from your `.env` file to the configuration using:

```bash
hippius config import-env
```

### Using Configuration in Code

```python
from hippius_sdk import get_config_value, set_config_value, HippiusClient

# Get a configuration value
gateway = get_config_value("ipfs", "gateway")
print(f"Current gateway: {gateway}")

# Set a configuration value
set_config_value("ipfs", "gateway", "https://dweb.link")

# Client will automatically use configuration values
client = HippiusClient()
```

## Development

```bash
# Clone the repository
git clone https://github.com/your-username/hippius-sdk.git
cd hippius-sdk

# Install dependencies
poetry install

# With encryption and clipboard support
poetry install -E clipboard

# Run tests
poetry run pytest
```

## Testing Locally

You can test Hippius locally during development or before publishing to PyPI. Here's how to test both the SDK and CLI components:

### 1. Install in Development Mode

The easiest way to test everything together is to install the package in development mode:

```bash
# In the root directory of the project
poetry install

# With encryption and clipboard support
poetry install -E clipboard
```

This makes both the SDK and CLI available while still allowing you to make changes to the code.

### 2. Testing the CLI

After installing in development mode, you can run the CLI commands directly:

```bash
# Basic commands
hippius --help
hippius download QmCID123 output_file.txt
hippius keygen

# To see what commands would do without actually running them, add --verbose
hippius --verbose store myfile.txt
```

If you want to test CLI changes without reinstalling the package:

```bash
# Run the CLI module directly
python -m hippius_sdk.cli download QmCID123 output_file.txt

# Or make it executable and run it directly
chmod +x hippius_sdk/cli.py
./hippius_sdk/cli.py download QmCID123 output_file.txt
```

### 3. Testing the SDK

To test the SDK components, you can create a small test script:

```python
# test_script.py
from hippius_sdk import HippiusClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create a client
client = HippiusClient()

# Test a simple operation
print("Testing IPFS client...")
try:
    result = client.exists("QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx")
    print(f"Result: {result}")
except Exception as e:
    print(f"Error: {e}")
```

Then run it:

```bash
python test_script.py
```

### 4. Running Unit Tests

You can use pytest to run the test suite:

```bash
# Run all tests
poetry run pytest

# Run specific tests
poetry run pytest tests/test_ipfs.py

# Run a specific test function
poetry run pytest tests/test_ipfs.py::test_upload_file
```

### 5. Building and Testing the Package

If you want to test the exact package that will be uploaded to PyPI:

```bash
# Build the package
poetry build

# Install the built package in a virtual environment
python -m venv test_env
source test_env/bin/activate  # On Windows: test_env\Scripts\activate
pip install dist/hippius-0.1.0-py3-none-any.whl

# Test the installed package
hippius --help
```

### Troubleshooting Local Testing

1. **IPFS Connection Issues**: Make sure you have either:
   - A local IPFS daemon running (`ipfs daemon` in a separate terminal)
   - Or proper environment variables set in `.env` for remote connections

2. **Missing Dependencies**: If you get import errors, ensure all dependencies are installed:
   ```bash
   poetry install --all-extras
   ```

3. **CLI Not Found**: If the `hippius` command isn't found after installing, try:
   ```bash
   # Verify it's installed
   poetry show hippius
   
   # Check your PATH
   which hippius
   ```

4. **Default Address Issues**: If you receive errors about missing account address:
   ```bash
   # Set a default address for read-only operations
   hippius address set-default 5H1QBRF7T7dgKwzVGCgS4wioudvMRf9K4NEDzfuKLnuyBNzH
   ```

5. **Substrate Issues**: For marketplace operations, make sure your `.env` has the correct `SUBSTRATE_SEED_PHRASE` and `SUBSTRATE_URL` values.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

### Seed Phrase Management

For enhanced security, Hippius SDK supports encrypting your Substrate seed phrase with a password:

```bash
# Set a seed phrase in plain text
hippius seed set "your twelve word seed phrase here"

# Set a seed phrase and encrypt it with a password
hippius seed set "your twelve word seed phrase here" --encode
# You will be prompted to enter and confirm a password

# Check the status of your seed phrase
hippius seed status

# Encrypt an existing seed phrase with a password
hippius seed encode
# You will be prompted to enter and confirm a password

# Temporarily decrypt and view your seed phrase
hippius seed decode
# You will be prompted to enter your password
```

> **Note:** Password-based encryption requires both the `pynacl` and `cryptography` Python packages, which are included as dependencies when you install Hippius SDK.

To use password-based seed phrase encryption:
1. Set your seed phrase with encryption: `hippius seed set "your seed phrase" --encode`
2. You'll be prompted to enter and confirm a secure password
3. The seed phrase will be encrypted using your password and stored safely
4. When the SDK needs to use your seed phrase, you'll be prompted for your password
5. Your password is never stored - it's only used temporarily to decrypt the seed phrase

This provides enhanced security by:
- Protecting your seed phrase with a password only you know
- Never storing the seed phrase in plain text
- Using strong cryptography (PBKDF2 with SHA-256) to derive encryption keys
- Requiring your password every time the seed phrase is needed

When interacting with the Hippius SDK programmatically, you can provide the password when initializing clients:

```python
from hippius_sdk import HippiusClient

# The client will prompt for password when needed to decrypt the seed phrase
client = HippiusClient()

# Or you can provide a password when initializing
client = HippiusClient(seed_phrase_password="your-password")
```

### Multi-Account Management

Hippius SDK now supports managing multiple named accounts, each with their own seed phrase:

```bash
# Set a seed phrase for a named account
hippius seed set "your seed phrase here" --account "my-validator"

# Set another seed phrase for a different account
hippius seed set "another seed phrase" --account "my-developer-account" --encode

# List all configured accounts
hippius account list

# Switch the active account
hippius account switch my-developer-account

# Check the status of a specific account
hippius seed status --account my-validator

# Delete an account
hippius account delete my-developer-account
```

Key features of the multi-account system:

1. **Named Accounts**: Each account has a unique name for easy identification
2. **SS58 Address Storage**: Addresses are stored unencrypted for convenient access
3. **Active Account**: One account is designated as "active" and used by default
4. **Shared Password**: All accounts use the same password for encryption
5. **Separate Encryption**: Each account can choose whether to encrypt its seed phrase

To use multiple accounts in your code:

```python
from hippius_sdk import HippiusClient, set_active_account, list_accounts

# List all accounts
accounts = list_accounts()
for name, data in accounts.items():
    print(f"{name}: {data.get('ss58_address')}")

# Switch the active account
set_active_account("my-validator")

# Create a client with the active account
client = HippiusClient(seed_phrase_password="your-password")

# Or specify a different account to use
client = HippiusClient(
    account_name="my-developer-account",
    seed_phrase_password="your-password"
)
```

The multi-account system makes it easier to manage multiple identities while maintaining security and convenience.

## Blockchain Account Management

Hippius SDK provides a comprehensive solution for managing blockchain accounts, including coldkeys, hotkeys, and proxy relationships.

### Coldkeys and Hotkeys

Hippius uses a hierarchical account structure:

- **Coldkey**: The main account that holds your funds and grants permissions
- **Hotkey**: Delegated accounts that can perform specific actions on behalf of your coldkey

This separation provides enhanced security by allowing you to keep your main account (coldkey) secure while using hotkeys for day-to-day operations.

### Creating and Managing Accounts

```python
from hippius_sdk.account import AccountManager

# Initialize the account manager
account_manager = AccountManager()

# Create a coldkey (main account)
coldkey = account_manager.create_coldkey(
    name="my_hippius_coldkey",  # Optional custom name
    mnemonic="your mnemonic phrase here"  # Optional - will generate if not provided
)

# Create a hotkey associated with the coldkey
hotkey = account_manager.create_hotkey(
    name="my_hippius_hotkey_1",  # Optional custom name
    coldkey_address=coldkey["address"]  # Optional association
)

# List all coldkeys
coldkeys = account_manager.list_coldkeys()

# List hotkeys for a specific coldkey
hotkeys = account_manager.list_hotkeys(coldkey_address=coldkey["address"])

# Create a proxy relationship on the blockchain
result = account_manager.create_proxy_relationship(
    coldkey_address=coldkey["address"],
    hotkey_address=hotkey["address"],
    proxy_type="NonTransfer",  # Type of permissions granted
    delay=0  # Blocks before proxy becomes active
)

# List proxy relationships
proxies = account_manager.list_proxies(coldkey_address=coldkey["address"])

# Remove a proxy relationship
result = account_manager.remove_proxy(
    coldkey_address=coldkey["address"],
    hotkey_address=hotkey["address"]
)
```

### CLI Commands for Account Management

The SDK provides CLI commands for managing accounts:

```bash
# Create a coldkey
hippius account coldkey create --name "my_hippius_coldkey" --generate-mnemonic --show-mnemonic

# Create a hotkey and associate with a coldkey
hippius account hotkey create --name "my_hippius_hotkey_1" --coldkey [COLDKEY_ADDRESS]

# List accounts
hippius account list coldkey --verbose
hippius account list hotkey
hippius account list proxy --coldkey [COLDKEY_ADDRESS]

# Create a proxy relationship on the blockchain
hippius account proxy create --coldkey [COLDKEY_ADDRESS] --hotkey [HOTKEY_ADDRESS] --proxy-type NonTransfer

# Remove a proxy relationship
hippius account proxy remove --coldkey [COLDKEY_ADDRESS] --hotkey [HOTKEY_ADDRESS]
```

### Best Practices for Account Management

1. **Security**: Keep your coldkey mnemonic secure and never share it. This is the master key to your account.

2. **Proxy Types**: Different proxy types grant different permissions:
   - `NonTransfer`: Can perform operations except transferring funds
   - Other types may be available depending on the chain configuration

3. **Multiple Hotkeys**: Create separate hotkeys for different applications or services to limit the impact if one is compromised.

4. **Regular Auditing**: Regularly check your proxy relationships using `hippius account list proxy` to ensure only authorized delegates have access.
