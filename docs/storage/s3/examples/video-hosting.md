---
title: "Example: Video Hosting"
sidebar_label: Video Hosting
slug: /storage/s3/examples/video-hosting
---

# Video Hosting

Host and stream videos from Hippius S3. The S3 API supports range requests, so browsers can seek through videos without downloading the entire file.

## How It Works

1. Upload your video to Hippius S3
2. Generate a presigned URL (or use a public bucket)
3. Point an HTML5 `<video>` tag at the URL
4. The browser handles seeking and buffering via HTTP range requests

## Upload a Video

```bash
aws s3 cp my-video.mp4 s3://my-videos/ \
  --profile hippius --endpoint-url https://s3.hippius.com
```

Or with Python:

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

s3.upload_file("my-video.mp4", "my-videos", "my-video.mp4")
print("Uploaded.")
```

## Option A: Public Bucket

Make the bucket public and reference the video directly:

```bash
aws s3api put-bucket-acl --bucket my-videos --acl public-read \
  --profile hippius --endpoint-url https://s3.hippius.com
```

```html
<video controls width="720">
  <source src="https://s3.hippius.com/my-videos/my-video.mp4" type="video/mp4">
</video>
```

## Option B: Presigned URL

Keep the bucket private and generate a time-limited URL:

```python
url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": "my-videos", "Key": "my-video.mp4"},
    ExpiresIn=3600,
)
```

```html
<video controls width="720">
  <source src="PRESIGNED_URL_HERE" type="video/mp4">
</video>
```

## Complete HTML Player

```html title="player.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Video Player</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; }
    video { width: 100%; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>My Video</h1>
  <video controls>
    <source src="https://s3.hippius.com/my-videos/my-video.mp4" type="video/mp4">
  </video>
</body>
</html>
```

:::tip
Live demo: [https://s3.hippius.com/micky/index.html](https://s3.hippius.com/micky/index.html)
:::

## Key Points

- Hippius S3 supports HTTP range requests out of the box — no configuration needed
- Large videos benefit from multipart upload (the SDK handles this automatically for files > 5MB)
- For private videos, generate presigned URLs server-side and inject them into your HTML
- Presigned URLs work in any player that supports standard HTTP video (VLC, mobile browsers, etc.)
