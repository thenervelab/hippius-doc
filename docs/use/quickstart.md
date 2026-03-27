# Quickstart: Store Your First File on Hippius

This guide takes you from zero to your first file uploaded to Hippius S3 in under 5 minutes.

## Step 1: Create an Account

1. Go to [console.hippius.com](https://console.hippius.com).
2. Sign up with Google or GitHub.

## Step 2: Add Credits

Hippius uses a prepaid credit system for storage and bandwidth.

1. In the console, navigate to **Billing**.
2. Add credits using a credit card or crypto (TAO).

## Step 3: Create a Token

You need S3 credentials to authenticate your requests.

1. In the console, navigate to **S3 Storage**.
2. Click **Create Master Token**.
3. Save your **Access Key ID** (starts with `hip_`) and **Secret Key**. You will not be able to view the secret key again.

## Step 4: Upload Your First File

Choose your preferred tool to interact with Hippius S3.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="cli" label="AWS CLI">

```bash
# 1. Configure credentials
export AWS_ACCESS_KEY_ID="<YOUR_ACCESS_KEY_ID>"
export AWS_SECRET_ACCESS_KEY="<YOUR_SECRET_KEY>"
export AWS_DEFAULT_REGION="decentralized"

# 2. Create a bucket
aws s3 mb s3://my-first-bucket --endpoint-url https://s3.hippius.com

# 3. Create a test file
echo "Hello from Hippius!" > hello.txt

# 4. Upload the file
aws s3 cp hello.txt s3://my-first-bucket/hello.txt --endpoint-url https://s3.hippius.com

# 5. Download and verify (prints to stdout)
aws s3 cp s3://my-first-bucket/hello.txt - --endpoint-url https://s3.hippius.com
```

</TabItem>
<TabItem value="python" label="Python (MinIO)">

```bash
pip install minio
```

```python
from minio import Minio
from io import BytesIO

client = Minio(
    "s3.hippius.com",
    access_key="<YOUR_ACCESS_KEY_ID>",
    secret_key="<YOUR_SECRET_KEY>",
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

# Download and verify
response = client.get_object("my-first-bucket", "hello.txt")
print(response.read().decode())
response.close()
response.release_conn()
```

</TabItem>
<TabItem value="javascript" label="JavaScript (MinIO)">

```bash
npm install minio
```

```javascript
const Minio = require("minio");

const client = new Minio.Client({
  endPoint: "s3.hippius.com",
  port: 443,
  useSSL: true,
  accessKey: "<YOUR_ACCESS_KEY_ID>",
  secretKey: "<YOUR_SECRET_KEY>",
  region: "decentralized",
});

async function main() {
  // Create a bucket
  await client.makeBucket("my-first-bucket", "decentralized");

  // Upload a file
  const content = Buffer.from("Hello from Hippius!");
  await client.putObject("my-first-bucket", "hello.txt", content, {
    "Content-Type": "text/plain",
  });

  // Download and verify
  const stream = await client.getObject("my-first-bucket", "hello.txt");
  let data = "";
  for await (const chunk of stream) {
    data += chunk.toString();
  }
  console.log(data);
}

main().catch(console.error);
```

</TabItem>
</Tabs>

## Connection Details

If you are configuring a different S3 client, use these settings:

- **Endpoint URL:** `https://s3.hippius.com`
- **Region:** `decentralized`
- **Signature Version:** `s3v4` (AWS Signature Version 4)
- **Addressing Style:** Path-style (`https://s3.hippius.com/bucket-name`)
