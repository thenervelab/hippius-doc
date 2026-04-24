# Quickstart: Store Your First File on Hippius

import BgStyledText from '@site/src/components/BgStyledText';
import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';

Hippius S3 is a decentralized, S3-compatible storage service. This guide takes you from zero to your first file upload in under 5 minutes.

## Step 1: Create an Account

<Ordered>
  <li>Go to <a href="https://console.hippius.com">console.hippius.com</a></li>
  <li>Sign up with <BgStyledText>Google</BgStyledText> or <BgStyledText>GitHub</BgStyledText> OAuth</li>
</Ordered>

That's it ✅ — no wallet, seed phrase, or browser extension required.

## Step 2: Add Credits

<Ordered>
  <li>In the console, go to <BgStyledText>Billing</BgStyledText></li>
  <li>Add credits using <strong>credit card</strong> (Stripe) or <strong>TAO</strong></li>
</Ordered>

Credits are consumed as you store and retrieve files. See [pricing](https://hippius.com/pricing) for details.

<div class="screenshot-container">
  <img src="/img/getting-started/billing.png" alt="Billing page" />
</div>

## Step 3: Create S3 Credentials

<Ordered>
  <li>In the console, go to <BgStyledText>S3 Storage</BgStyledText></li>
  <li>Click <BgStyledText>Create Master Token</BgStyledText></li>
  <li>Save your <strong>Access Key ID</strong> (starts with <code>hip_</code>) and <strong>Secret Key</strong></li>
</Ordered>

:::warning
Store your secret key securely — it cannot be retrieved after creation.
:::

<div class="screenshot-container">
  <img src="/img/getting-started/master-token.png" alt="Master token created" />
</div>

You can create multiple tokens with different access levels. See [Token Management](/use/s3-token-management) for details. Tokens can also be managed programmatically via the [Management API](https://api.hippius.com/).

:::tip Pick the closest region for best performance
Hippius S3 is served through regional caches. For lower latency, use the endpoint closest to you in the examples below:
- **Europe:** `eu-central-1.hippius.com` (the default `s3.hippius.com` also resolves here)
- **US:** `us-central-1.hippius.com`

All regions serve the same data — just swap the endpoint in your client config.
:::

## Step 4: Upload a File

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python (minio)">

```bash
pip install minio
```

```python
from minio import Minio
from io import BytesIO

client = Minio(
    "s3.hippius.com",
    access_key="YOUR_ACCESS_KEY",
    secret_key="YOUR_SECRET_KEY",
    secure=True,
    region="decentralized",
)

# Create a bucket
client.make_bucket("my-first-bucket")

# Upload a file
content = b"Hello from Hippius!"
client.put_object(
    "my-first-bucket",
    "hello.txt",
    BytesIO(content),
    length=len(content),
    content_type="text/plain",
)

print("Uploaded successfully!")
```

</TabItem>
<TabItem value="javascript" label="JavaScript (minio)">

```bash
npm install minio
```

```javascript
const Minio = require("minio");

const client = new Minio.Client({
  endPoint: "s3.hippius.com",
  port: 443,
  useSSL: true,
  accessKey: "YOUR_ACCESS_KEY",
  secretKey: "YOUR_SECRET_KEY",
  region: "decentralized",
});

// Create a bucket
await client.makeBucket("my-first-bucket", "decentralized");

// Upload a file
const content = Buffer.from("Hello from Hippius!");
await client.putObject("my-first-bucket", "hello.txt", content, {
  "Content-Type": "text/plain",
});

console.log("Uploaded successfully!");
```

</TabItem>
<TabItem value="cli" label="AWS CLI">

```bash
# Configure credentials
export AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY"
export AWS_SECRET_ACCESS_KEY="YOUR_SECRET_KEY"
export AWS_DEFAULT_REGION="decentralized"

# Create a bucket
aws s3 mb s3://my-first-bucket --endpoint-url https://s3.hippius.com

# Upload a file
echo "Hello from Hippius!" > hello.txt
aws s3 cp hello.txt s3://my-first-bucket/hello.txt --endpoint-url https://s3.hippius.com
```

</TabItem>
</Tabs>

## Step 5: Download and Verify

<Tabs>
<TabItem value="python" label="Python (minio)">

```python
response = client.get_object("my-first-bucket", "hello.txt")
print(response.read().decode())
response.close()
response.release_conn()
```

</TabItem>
<TabItem value="javascript" label="JavaScript (minio)">

```javascript
const stream = await client.getObject("my-first-bucket", "hello.txt");
let data = "";
for await (const chunk of stream) {
  data += chunk.toString();
}
console.log(data);
```

</TabItem>
<TabItem value="cli" label="AWS CLI">

```bash
aws s3 cp s3://my-first-bucket/hello.txt - --endpoint-url https://s3.hippius.com
```

</TabItem>
</Tabs>

## Connection Details

| Setting | Value |
|---|---|
| **Endpoint** | `https://s3.hippius.com` |
| **Region** | `decentralized` |
| **Signature** | AWS Signature V4 |
| **Addressing** | Path-style |

## Next Steps

<Unordered>
  <li><a href="/storage/s3/integration">S3 API Reference</a> — Full list of operations, presigned URLs, ACLs, public buckets, and more</li>
  <li><a href="/use/s3-token-management">Token Management</a> — Create sub-tokens, manage access levels</li>
  <li><a href="https://hippius.com/pricing">Pricing</a> — Storage and bandwidth costs</li>
</Unordered>
