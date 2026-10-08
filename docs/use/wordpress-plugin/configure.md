---
id: configure
title: Configure the Plugin
sidebar_label: Configure
slug: /use/wordpress-plugin/configure
description: Connect Hippius Media Offloader to your bucket with your S3 access keys and endpoint, make the bucket public, choose your migration options and test the connection.
---

import Ordered from '@site/src/components/Ordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

This is where WordPress and Hippius get connected. You'll enter the keys and bucket from the [previous page](/use/wordpress-plugin/credentials), make sure the bucket is public, and run a quick test before moving any media.

Open <BgStyledText>Hippius Media</BgStyledText> from your WordPress admin sidebar to get to the settings.

<Screenshot src="/img/wordpress/configure-settings.png" alt="Settings: your S3 access keys, bucket and endpoint." />

*Settings: your S3 access keys, bucket and endpoint.*

## Configuration fields

| Field | What to enter |
|---|---|
| **Access Key ID** | The Access Key ID from [Get your Hippius credentials](/use/wordpress-plugin/credentials). It starts with `hip_`. |
| **Secret Access Key** | Your Secret Access Key. The field is masked. Leave it blank to keep the saved key when you're only changing other settings. |
| **API Token** (optional) | Your API token, if you copied one. It's optional, only needed to show your account balance in the dashboard. |
| **S3 Endpoint** | The Hippius S3 endpoint: `https://s3.hippius.com`. This is already filled in, so leave it as it is. |
| **Bucket Name** | The bucket you created in the console in [step 4](/use/wordpress-plugin/credentials#step-4-create-your-bucket). The field starts out as `wordpress-media`: replace it with your own bucket name. |

:::warning Create your bucket in the console first
The plugin doesn't create buckets yet. Bucket names are globally unique, so `wordpress-media` most likely belongs to someone else. Enter the exact name of a bucket you've already created in your Hippius account.
:::

If you haven't saved a bucket yet, the plugin tells you so with a clear message on the settings page instead of failing on every file. Enter your bucket name and save, and the message goes away.

### Switching to a different bucket

You can change **Bucket Name** at any time. Save, and the plugin uses the new bucket from then on. Files already migrated keep their URLs in the bucket they were uploaded to, so don't delete the old bucket while your site still uses those files.

## Make sure your bucket is public

Your site serves each image from its public Hippius URL, so the bucket has to be public for visitors to see your media. Buckets created in the console start out private.

After you save your keys and bucket, the plugin checks whether the bucket is public. If it isn't, click <BgStyledText>Make Bucket Public</BgStyledText> and the plugin applies the public-read policy for you. It's your choice: if you'd rather do it yourself, any S3 client works, as shown in [Make your bucket public](/use/wordpress-plugin/credentials#step-5-make-your-bucket-public).

## Migration options

| Option | What it does |
|---|---|
| **Keep Local Files** | Leave this checked and your original files stay on your server after migration. Uncheck it and the local copy is deleted once the upload to Hippius succeeds, which frees up disk space. |
| **Auto-Migrate New Uploads** | Turn this on and every new file you upload to WordPress is offloaded to Hippius as it is uploaded. |

:::tip A good way to start
Keep **Keep Local Files** checked for your first migration. Once you've confirmed everything works and your media is serving from Hippius, you can uncheck it to reclaim disk space. Turn on **Auto-Migrate New Uploads** after your initial setup checks out.
:::

## Test the connection

Before you migrate anything, make sure the plugin can reach your bucket with your keys.

<Ordered>
  <li>Save your configuration.</li>
  <li>Click <BgStyledText>Test Connection</BgStyledText>.</li>
  <li>Wait for the result.</li>
</Ordered>

<Screenshot src="/img/wordpress/test-connection.png" alt="Test Connection confirms the plugin can reach your bucket." />

*Test Connection confirms the plugin can reach your bucket.*

What you might see:

- **Connection successful.** Your keys are valid and the bucket is reachable. Whether the bucket is public is a separate check, covered in the section above. Once both are in order, you're ready to [migrate your media](/use/wordpress-plugin/migrate).
- **Connection failed.** Head to [Troubleshooting](/use/wordpress-plugin/troubleshooting) for the exact error and how to fix it.

:::tip Double-check after your first upload
After the first file is migrated, open its Hippius URL in a private browser window. If it loads without asking you to sign in, your visitors will see it too. If you get **AccessDenied**, the bucket isn't public yet.
:::
