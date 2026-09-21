---
id: troubleshooting
title: Troubleshooting S3
sidebar_label: Troubleshooting
slug: /use/troubleshooting
---

import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

# Troubleshooting S3

If you encounter issues while using Hippius S3, check this guide for common errors and their solutions.

## Authentication errors

If you receive an `InvalidAccessKeyId`, `SignatureDoesNotMatch`, or `AccessDenied` error during initial connection:

<Unordered>
  <li><strong>Check key format:</strong> your Access Key ID must start with <code>hip_</code>.</li>
  <li><strong>Verify secrets:</strong> ensure there are no leading or trailing spaces in your Secret Access Key.</li>
  <li><strong>Token expiry:</strong> if you are using a master or sub token, confirm it has not expired in the <a href="https://console.hippius.com">Hippius Console</a>.</li>
</Unordered>

## Upload fails

If an upload fails to start or gets interrupted:

<Unordered>
  <li><strong>Insufficient credits:</strong> your account must have a positive credit balance. Check <BgStyledText>Billing</BgStyledText> in the console.</li>
  <li><strong>Invalid bucket name:</strong> names must be 3–63 characters, lowercase letters, numbers, and hyphens only, and must not look like an IP address.</li>
  <li><strong>File size:</strong> use multipart uploads for files larger than 5 GB. The console itself caps uploads at 100 MB — use a client for anything larger. See <a href="/storage/s3/advanced#upload-large-files">Upload large files</a>.</li>
</Unordered>

## Access denied

If you can connect but cannot read or write objects:

<Unordered>
  <li><strong>Sub-token permissions:</strong> confirm the token is Read Only vs Read &amp; Write, matching the operation you are trying.</li>
  <li><strong>Bucket scope:</strong> confirm the sub-token was granted access to this specific bucket. See <a href="/storage/s3/advanced#give-an-app-scoped-credentials">Give an app scoped credentials</a>.</li>
</Unordered>

## Slow uploads

If transfer speeds are lower than expected:

<Unordered>
  <li><strong>Multipart uploads:</strong> for large files, make sure the client is using multipart. SDKs usually do this automatically; some tools need it turned on.</li>
  <li><strong>Parallel transfers:</strong> increase concurrent connections. In rclone, use <code>--transfers 8</code> and <code>--s3-upload-concurrency 8</code>.</li>
</Unordered>

:::tip
For rclone, combining `--transfers 8 --s3-upload-concurrency 8 --progress` gives you fast parallel uploads with real-time feedback.
:::

## Endpoint errors

If your client talks to Amazon S3 instead of Hippius, or reports a DNS error:

<Unordered>
  <li><strong>Missing endpoint URL:</strong> set the endpoint to <code>https://s3.hippius.com</code>. In the AWS CLI that is the <code>--endpoint-url</code> flag.</li>
  <li><strong>Wrong region:</strong> set the region to <code>decentralized</code>.</li>
  <li><strong>Addressing style:</strong> use <strong>path-style</strong> addressing (<code>forcePathStyle: true</code> or equivalent). Virtual-hosted style is not supported.</li>
</Unordered>

Connection details are in [Getting Started](/use/quickstart#connection-details).

## Deleting a bucket and all its contents

To remove a bucket along with everything inside it, use the `--force` flag. It empties the bucket first, then deletes it:

```bash
aws s3 rb s3://my-bucket --force \
  --endpoint-url https://s3.hippius.com
```

:::tip Interactive script
For a guided, interactive experience, use [delete-bucket.sh](https://github.com/thenervelab/hippius-s3/blob/main/scripts/delete-bucket.sh). It handles credential setup and confirmation prompts.
:::

## Getting help

Still stuck?

<Unordered>
  <li>Join the discussion on our <a href="https://discord.gg/hippius">Discord server</a>.</li>
  <li>See <a href="/use/help-support">Help &amp; Support</a> for more resources.</li>
</Unordered>
