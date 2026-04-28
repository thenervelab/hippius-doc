---
title: "Example: Image Gallery"
sidebar_label: Image Gallery
slug: /storage/s3/examples/image-gallery
---

# Image Gallery

Build a public image gallery backed by Hippius S3. Upload images, list them with [`ListObjectsV2`](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html), and serve them directly from a public bucket.

:::tip Pick the closest region for best performance
Swap `s3.hippius.com` for `eu-central-1.hippius.com` (Europe) or `us-east-1.hippius.com` (US) to use the regional cache closest to you. See the [S3 API Reference](/storage/s3/integration) for details.
:::

## Setup

Create a public bucket for your gallery:

```bash
# Create bucket
aws s3 mb s3://my-gallery \
  --profile hippius --endpoint-url https://s3.hippius.com

# Make it public
aws s3api put-bucket-acl --bucket my-gallery --acl public-read \
  --profile hippius --endpoint-url https://s3.hippius.com
```

Upload some images:

```bash
aws s3 cp ./photos/ s3://my-gallery/photos/ --recursive \
  --profile hippius --endpoint-url https://s3.hippius.com
```

## List Images (Python)

```python
import os
from dotenv import load_dotenv
import boto3
from botocore.config import Config

load_dotenv()

s3 = boto3.client(
    "s3",
    endpoint_url="https://s3.hippius.com",
    aws_access_key_id=os.environ["HIPPIUS_ACCESS_KEY"],
    aws_secret_access_key=os.environ["HIPPIUS_SECRET_KEY"],
    region_name="decentralized",
    config=Config(signature_version="s3v4", s3={"addressing_style": "path"}),
)

response = s3.list_objects_v2(Bucket="my-gallery", Prefix="photos/")
images = [
    f"https://s3.hippius.com/my-gallery/{obj['Key']}"
    for obj in response.get("Contents", [])
    if obj["Key"].lower().endswith((".jpg", ".jpeg", ".png", ".webp"))
]

for url in images:
    print(url)
```

## List Images (JavaScript)

```javascript
import "dotenv/config";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: "https://s3.hippius.com",
  region: "decentralized",
  credentials: {
    accessKeyId: process.env.HIPPIUS_ACCESS_KEY,
    secretAccessKey: process.env.HIPPIUS_SECRET_KEY,
  },
  forcePathStyle: true,
});

const response = await s3.send(new ListObjectsV2Command({
  Bucket: "my-gallery",
  Prefix: "photos/",
}));

const images = (response.Contents ?? [])
  .filter(obj => /\.(jpe?g|png|webp)$/i.test(obj.Key))
  .map(obj => `https://s3.hippius.com/my-gallery/${obj.Key}`);

console.log(images);
```

## HTML Gallery

```html title="gallery.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gallery</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
    .grid img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; cursor: pointer; }
    .grid img:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <h1>Photo Gallery</h1>
  <div class="grid" id="gallery"></div>

  <script>
    // For a public bucket, you can list objects via the S3 ListObjectsV2 API directly
    // Here we hardcode URLs for simplicity — in production, fetch the list from your backend
    const images = [
      "https://s3.hippius.com/my-gallery/photos/photo1.jpg",
      "https://s3.hippius.com/my-gallery/photos/photo2.jpg",
      "https://s3.hippius.com/my-gallery/photos/photo3.jpg",
    ];

    const gallery = document.getElementById("gallery");
    images.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = url.split("/").pop();
      img.onclick = () => window.open(url);
      gallery.appendChild(img);
    });
  </script>
</body>
</html>
```

## Key Points

- Public buckets serve images directly — no presigned URLs needed
- Use [`ListObjectsV2`](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html) with a `Prefix` to list images in a specific folder
- For private galleries, generate presigned URLs server-side and pass them to the frontend
- Images are served with proper `Content-Type` headers, so browsers render them correctly
