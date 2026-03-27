---
id: javascript
title: JavaScript / Node.js
sidebar_label: JavaScript
slug: /storage/s3/javascript
---

# JavaScript / Node.js

Use the AWS SDK v3 or the MinIO SDK to interact with Hippius S3 from Node.js or the browser.

## AWS SDK v3

### Install

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### Connect

```javascript
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: "https://s3.hippius.com",
  region: "decentralized",
  credentials: {
    accessKeyId: "hip_your_access_key_id",
    secretAccessKey: "your_secret_key",
  },
  forcePathStyle: true,
});
```

### Create a bucket

```javascript
import { CreateBucketCommand } from "@aws-sdk/client-s3";

await s3.send(new CreateBucketCommand({ Bucket: "my-bucket" }));
```

### Upload a file

```javascript
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";

// From disk (Node.js)
await s3.send(new PutObjectCommand({
  Bucket: "my-bucket",
  Key: "file.txt",
  Body: readFileSync("./file.txt"),
}));

// From string/buffer
await s3.send(new PutObjectCommand({
  Bucket: "my-bucket",
  Key: "hello.txt",
  Body: "Hello from Hippius!",
  ContentType: "text/plain",
}));
```

### Download a file

```javascript
import { GetObjectCommand } from "@aws-sdk/client-s3";

const response = await s3.send(new GetObjectCommand({
  Bucket: "my-bucket",
  Key: "hello.txt",
}));

// Read the stream
const text = await response.Body.transformToString();
console.log(text);
```

### List objects

```javascript
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

const response = await s3.send(new ListObjectsV2Command({
  Bucket: "my-bucket",
}));

for (const obj of response.Contents ?? []) {
  console.log(obj.Key, obj.Size);
}
```

### Presigned URL

```javascript
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const url = await getSignedUrl(
  s3,
  new GetObjectCommand({ Bucket: "my-bucket", Key: "file.txt" }),
  { expiresIn: 3600 }, // 1 hour
);
console.log(url);
```

---

## MinIO SDK (Node.js)

### Install

```bash
npm install minio
```

### Connect

```javascript
import { Client } from "minio";

const client = new Client({
  endPoint: "s3.hippius.com",
  port: 443,
  useSSL: true,
  accessKey: "hip_your_access_key_id",
  secretKey: "your_secret_key",
  region: "decentralized",
});
```

### Create a bucket

```javascript
await client.makeBucket("my-bucket", "decentralized");
```

### Upload a file

```javascript
// From disk
await client.fPutObject("my-bucket", "file.txt", "./file.txt");

// From buffer
import { Readable } from "stream";
const buffer = Buffer.from("Hello from Hippius!");
await client.putObject(
  "my-bucket", "hello.txt",
  Readable.from(buffer), buffer.length,
  { "Content-Type": "text/plain" }
);
```

### Download a file

```javascript
// To disk
await client.fGetObject("my-bucket", "file.txt", "./downloaded.txt");
```

### Presigned URL

```javascript
const url = await client.presignedGetObject("my-bucket", "file.txt", 3600);
console.log(url);
```

---

## Browser uploads with presigned URLs

For browser-side uploads, generate a presigned PUT URL on your server and use it client-side — no credentials needed in the browser:

**Server (Node.js):**

```javascript
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const uploadUrl = await getSignedUrl(
  s3,
  new PutObjectCommand({ Bucket: "my-bucket", Key: "user-upload.jpg" }),
  { expiresIn: 300 }, // 5 minutes
);
// Send uploadUrl to the browser
```

**Browser:**

```javascript
await fetch(uploadUrl, {
  method: "PUT",
  body: file, // File object from <input type="file">
  headers: { "Content-Type": file.type },
});
```
