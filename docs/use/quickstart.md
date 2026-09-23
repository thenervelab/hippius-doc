import Screenshot from '@site/src/components/Screenshot';
import BgStyledText from '@site/src/components/BgStyledText';
import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstart: Store Your First File on Hippius

Hippius S3 is a distributed, S3-compatible storage service. This guide takes you from zero to your first file upload in under 5 minutes.

## Create an Account

<Ordered>
  <li>Go to <a href="https://console.hippius.com">console.hippius.com</a></li>
  <li>Sign up with <BgStyledText>Google</BgStyledText> or <BgStyledText>GitHub</BgStyledText> OAuth</li>
</Ordered>

No wallet, seed phrase, or browser extension required.

## Top Up Your Balance

S3 starts on **pay as you go**: $6 per TB per month, charged hourly from your account balance on what you store. So before you upload, add some money to your balance.

<Ordered>
  <li>In the console, go to <BgStyledText>Billing</BgStyledText>.</li>
  <li>Click <BgStyledText>+ Top up</BgStyledText> and pay by <strong>card</strong> (Stripe) or with <strong>TAO</strong>.</li>
</Ordered>

Storing a lot? A monthly S3 plan covers a block of storage for a flat price, up to 22% cheaper per TB. See [S3 plans and pay as you go](/use/console/billing#s3-plans-and-pay-as-you-go).

## Create S3 Credentials

<Ordered>
  <li>In the console, go to <BgStyledText>S3 Storage</BgStyledText></li>
  <li>Click <BgStyledText>Create Master Token</BgStyledText></li>
  <li>Save your <strong>Access Key ID</strong> (starts with <code>hip_</code>) and <strong>Secret Key</strong></li>
</Ordered>

:::warning
Store your secret key securely — it cannot be retrieved after creation.
:::

<Screenshot src="/img/getting-started/master-token.png" alt="Master Token Created screen" dark />

A master token can do everything on your account. Scoped sub-tokens, rotation, and ACLs are in [Advanced Usage](/storage/s3/advanced#give-an-app-scoped-credentials).

## Connection Details {#connection-details}

| Setting | Value |
|---|---|
| **Endpoint** | `https://s3.hippius.com` |
| **Region** | `decentralized` |
| **Signature** | AWS Signature V4 |
| **Addressing** | Path-style |

Always use `https://s3.hippius.com`. ETH wallets, TAO wallets, and Polkadot extensions are not used for S3 auth. TAO is only for paying credits.

## Upload a File

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

client.make_bucket("my-first-bucket")

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

await client.makeBucket("my-first-bucket", "decentralized");

const content = Buffer.from("Hello from Hippius!");
await client.putObject("my-first-bucket", "hello.txt", content, {
  "Content-Type": "text/plain",
});

console.log("Uploaded successfully!");
```

</TabItem>
<TabItem value="cli" label="AWS CLI">

```bash
export AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY"
export AWS_SECRET_ACCESS_KEY="YOUR_SECRET_KEY"
export AWS_DEFAULT_REGION="decentralized"

aws s3 mb s3://my-first-bucket --endpoint-url https://s3.hippius.com

echo "Hello from Hippius!" > hello.txt
aws s3 cp hello.txt s3://my-first-bucket/hello.txt --endpoint-url https://s3.hippius.com
```

</TabItem>
</Tabs>

## Download and Verify

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

## Next Steps

<Unordered>
  <li><a href="/storage/s3/advanced">Advanced Usage</a> — presigned URLs, public buckets, ACLs, sub-tokens, large files</li>
  <li><a href="/storage/s3/python">Python</a>, <a href="/storage/s3/javascript">JavaScript</a>, <a href="/storage/s3/aws-cli">AWS CLI</a>, <a href="/storage/s3/rclone">rclone</a></li>
  <li><a href="/storage/s3/compatibility">Compatibility matrix</a> — every supported S3 operation</li>
  <li><a href="/use/troubleshooting">Troubleshooting</a></li>
  <li><a href="https://hippius.com/pricing">Pricing</a></li>
</Unordered>
