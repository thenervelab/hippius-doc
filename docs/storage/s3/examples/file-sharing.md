---
title: "Example: File Sharing with Presigned URLs"
sidebar_label: File Sharing
slug: /storage/s3/examples/file-sharing
---

# File Sharing with Presigned URLs

Build a simple file sharing service: upload a file and get a time-limited download link. No server-side storage needed — files go straight to Hippius S3.

## How It Works

1. User uploads a file via your app
2. Your server stores it in Hippius S3
3. Your server generates a presigned URL (valid 1–168 hours)
4. User gets a shareable link that expires automatically

## Python (Flask)

```bash
pip install flask boto3 python-dotenv
```

```python title="app.py"
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import boto3
from botocore.config import Config

load_dotenv()

app = Flask(__name__)

s3 = boto3.client(
    "s3",
    endpoint_url="https://s3.hippius.com",
    aws_access_key_id=os.environ["HIPPIUS_ACCESS_KEY"],
    aws_secret_access_key=os.environ["HIPPIUS_SECRET_KEY"],
    region_name="decentralized",
    config=Config(signature_version="s3v4", s3={"addressing_style": "path"}),
)

BUCKET = "file-shares"

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    key = f"shares/{file.filename}"

    s3.upload_fileobj(file, BUCKET, key)

    url = s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": BUCKET, "Key": key},
        ExpiresIn=86400,  # 24 hours
    )

    return jsonify({"url": url, "expires_in": "24 hours"})

if __name__ == "__main__":
    app.run(port=3000)
```

Test it:

```bash
curl -F "file=@photo.jpg" http://localhost:3000/upload
```

## JavaScript (Express)

```bash
npm install express multer @aws-sdk/client-s3 @aws-sdk/s3-request-presigner dotenv
```

```javascript title="server.mjs"
import "dotenv/config";
import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  endpoint: "https://s3.hippius.com",
  region: "decentralized",
  credentials: {
    accessKeyId: process.env.HIPPIUS_ACCESS_KEY,
    secretAccessKey: process.env.HIPPIUS_SECRET_KEY,
  },
  forcePathStyle: true,
});

const BUCKET = "file-shares";
const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.post("/upload", upload.single("file"), async (req, res) => {
  const key = `shares/${req.file.originalname}`;

  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  }));

  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: BUCKET, Key: key }),
    { expiresIn: 86400 },
  );

  res.json({ url, expires_in: "24 hours" });
});

app.listen(3000, () => console.log("Listening on :3000"));
```

## Key Points

- Presigned URLs expire automatically — no cleanup needed
- Max expiry is 7 days (604800 seconds)
- The download link works without any credentials
- For upload links (let users upload directly from the browser), use presigned PUT URLs — see the [JavaScript guide](/storage/s3/javascript#browser-uploads-with-presigned-urls)
