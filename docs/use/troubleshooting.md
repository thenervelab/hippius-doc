---
id: troubleshooting
title: Troubleshooting S3
sidebar_label: Troubleshooting
slug: /use/troubleshooting
---

# Troubleshooting S3

If you encounter issues while using Hippius S3, check this guide for common errors and their solutions.

## Authentication errors

If you receive an `InvalidAccessKeyId`, `SignatureDoesNotMatch`, or `AccessDenied` error during initial connection:

- **Check Key Format:** Your Access Key ID must start with `hip_`.
- **Verify Secrets:** Ensure there are no leading or trailing spaces in your Secret Access Key.
- **Token Expiry:** If using a Master or Sub Token, verify it hasn't expired in the [Hippius Console](https://console.hippius.com).

## Upload fails

If an upload fails to start or gets interrupted:

- **Insufficient Credits:** Your account must have a positive credit balance to upload data. Check your balance in the **Billing** section of the console.
- **Invalid Bucket Name:** Bucket names must be between 3 and 63 characters long, contain only lowercase letters, numbers, and hyphens, and must not be formatted as an IP address.
- **File Size Limits:** Ensure you are using multipart uploads for files larger than 5GB.

## Access denied

If you can connect but cannot perform specific operations (like reading or writing objects):

- **Sub Token Permissions:** If you are using a Sub Token, ensure it has been granted the correct permissions (Read Only vs Read & Write).
- **Bucket Scope:** Verify the Sub Token was granted access to the specific bucket you are trying to access.

## Slow uploads

If your transfer speeds are lower than expected:

- **Use Multipart Uploads:** For large files, ensure your S3 client is configured to use multipart uploads. This is often handled automatically by SDKs, but may need manual configuration.
- **Parallel Transfers:** Increase the number of concurrent connections. In tools like `rclone`, use flags like `--transfers 8` and `--s3-upload-concurrency 8`.
- **Network Proximity:** While Hippius is decentralized, initial routing performance can depend on your local ISP peering.

:::tip
For rclone, combining `--transfers 8 --s3-upload-concurrency 8 --progress` gives you fast parallel uploads with real-time feedback.
:::

## Endpoint errors

If your client attempts to connect to Amazon S3 instead of Hippius or reports a DNS error:

- **Missing Endpoint URL:** You must explicitly configure the endpoint URL `https://s3.hippius.com` in your client. In the AWS CLI, this is the `--endpoint-url` flag.
- **Wrong Region:** Set the region to `decentralized`.
- **Addressing Style:** Ensure your client is set to use **Path-style** addressing (`forcePathStyle: true` or equivalent) instead of Virtual Hosted-style.

## Deleting a bucket and all its contents

To remove a bucket along with everything inside it, use the `--force` flag which empties the bucket first and then deletes it:

```bash
aws s3 rb s3://my-bucket --force \
  --profile hippius --endpoint-url https://s3.hippius.com
```

:::tip Interactive Script
For a guided, interactive experience, you can use the [delete-bucket.sh](https://github.com/thenervelab/hippius-s3/blob/main/scripts/delete-bucket.sh) script which handles credential setup and confirmation prompts for you.
:::

## Getting help

Still stuck? We're here to help!

- Join the discussion on our [Discord Server](https://discord.gg/hippius) to ask the community or reach out to the core team.
- Check the [Help & Support](/use/help-support) page for more resources.
