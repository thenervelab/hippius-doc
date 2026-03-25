# Quickstart: Store Your First File on Hippius

Hippius S3 is a decentralized, S3-compatible storage service. This guide takes you from zero to your first file upload in under 5 minutes.

## Step 1: Create an Account

1. Go to [console.hippius.com](https://console.hippius.com)
2. Sign up with **Google** or **GitHub** OAuth

That's it — no wallet, seed phrase, or browser extension required.

## Step 2: Add Credits

1. In the console, go to **Billing**
2. Add credits using **credit card** (Stripe) or **TAO**

Credits are consumed as you store and retrieve files. See [pricing](https://hippius.com/pricing) for details.

## Step 3: Create S3 Credentials

1. In the console, go to **S3 Storage**
2. Click **Create Master Token**
3. Save your **Access Key ID** (starts with `hip_`) and **Secret Key**

:::warning
Store your secret key securely — it cannot be retrieved after creation.
:::

You can create multiple tokens with different access levels. See [Token Management](/use/s3-token-management) for details. Tokens can also be managed programmatically via the [Management API](https://api.hippius.com/).

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
    access_key="hip_your_access_key_id",
    secret_key="your_secret_key",
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
  accessKey: "hip_your_access_key_id",
  secretKey: "your_secret_key",
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
export AWS_ACCESS_KEY_ID="hip_your_access_key_id"
export AWS_SECRET_ACCESS_KEY="your_secret_key"
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

- [S3 API Reference](/storage/s3/integration) — Full list of operations, presigned URLs, ACLs, public buckets, and more
- [Token Management](/use/s3-token-management) — Create sub-tokens, manage access levels
- [Pricing](https://hippius.com/pricing) — Storage and bandwidth costs
