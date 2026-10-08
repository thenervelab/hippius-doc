---
id: troubleshooting
title: Troubleshooting & FAQ
sidebar_label: Troubleshooting & FAQ
slug: /use/wordpress-plugin/troubleshooting
description: Fix common Hippius Media Offloader problems, from Test Connection errors and media that won't show to an account balance that reads 0, plus answers to frequent questions.
pagination_next: null
---

import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

When something's not working, start with the **Error Log** and **Debug Log** at the bottom of the plugin page. They usually point straight at the problem.

<Screenshot src="/img/wordpress/troubleshooting-logs.png" alt="Error log and debug log for troubleshooting." />

*Error log and debug log for troubleshooting.*

## Troubleshooting

### "Test Connection" fails with 403 / Access Denied

A few things to check:

<Unordered>
  <li>Your Access Key ID or Secret Access Key is wrong. Re-check both, and watch for stray spaces at the start or end.</li>
  <li>The bucket name doesn't match a bucket that exists in your Hippius account. Remember that the suggested <code>wordpress-media</code> is only a placeholder: enter the name of the bucket you created.</li>
  <li><strong>An empty account balance.</strong> Your account balance is empty. Top it up in the Hippius console.</li>
</Unordered>

### The plugin says no bucket is configured

You haven't saved a bucket name yet. Create your bucket in the console first, then enter its exact name in <BgStyledText>Bucket Name</BgStyledText> and save. See [Create your bucket](/use/wordpress-plugin/credentials#step-4-create-your-bucket).

### "Test Connection" fails with a timeout or DNS error

Your server can't reach the Hippius endpoint.

<Unordered>
  <li>Make sure your host allows outbound HTTPS traffic.</li>
  <li>Check that <BgStyledText>S3 Endpoint</BgStyledText> is set to <code>https://s3.hippius.com</code>, with no typos or extra paths.</li>
</Unordered>

### Some files won't migrate

Check the Error Log for the exact error on each file. The usual suspects:

<Unordered>
  <li><strong>The file is too large.</strong> Hippius handles big files fine, but your PHP setup might cap uploads. Raise <code>upload_max_filesize</code> and <code>post_max_size</code> in your PHP config.</li>
  <li>The file is corrupted or can't be read off the local disk.</li>
  <li>The upload hit a network timeout. Start the migration again: only files that aren't migrated yet are picked up.</li>
</Unordered>

### Migrated media doesn't show on the front-end

<Unordered>
  <li>Open one migrated file's Hippius URL in a private browser window. If it returns <strong>AccessDenied</strong>, the bucket isn't public. Click <BgStyledText>Make Bucket Public</BgStyledText> in the plugin, or run <code>aws s3api put-bucket-acl --bucket your-bucket-name --acl public-read --endpoint-url https://s3.hippius.com</code> (see <a href="/storage/s3/advanced#make-a-bucket-or-object-public">Make a bucket or object public</a>), then reload your page.</li>
  <li>Cached pages can still hold the old local URLs. Clear your WordPress page cache, plus any CDN cache in front of your site.</li>
</Unordered>

### Account balance shows 0 or doesn't update

<Unordered>
  <li>Make sure you added your API token in the plugin settings, not just the S3 keys. The token is what lets the plugin read your account balance.</li>
  <li>Click <BgStyledText>Check balance</BgStyledText> to force a refresh.</li>
  <li>If it really is 0, add funds to your account balance on the Billing page in the <a href="https://console.hippius.com">Hippius console</a>.</li>
</Unordered>

### Making sense of the Debug Log

The Debug Log records every URL decision the plugin makes. The entries worth knowing:

<Unordered>
  <li><strong>Original file match</strong> means the plugin found a matching Hippius file for a URL.</li>
  <li><strong>No size match found</strong> means it fell back to the original-size file.</li>
  <li><strong>Fallback URL</strong> is the URL it actually served.</li>
</Unordered>

## FAQ

**What is Hippius?**

Hippius is a distributed cloud storage platform where every file is encrypted and split across independent machines. You get the convenience of mainstream cloud storage without having to trust any single provider.

**What is Arion?**

Arion is our own distributed storage engine. It uses Reed-Solomon erasure coding (10 data pieces plus 20 parity pieces, 30 in total) and the CRUSH placement algorithm. Your files rebuild even if 20 machines fail at once. See [How Arion stores your data](/learn/storage-systems).

**Do my files leave WordPress encrypted?**

The connection between WordPress and Hippius runs over HTTPS. On Hippius your files are encrypted at rest, every chunk under its own key, so miners only ever see encrypted bytes. Media served on a website is public by nature. For files only you can read, use [Hippius Drive](/use/drive).

**Why does my bucket need to be public?**

Your pages load each image straight from its Hippius URL, and visitors' browsers can't sign in to a private bucket. Making the bucket public is what lets them see your media. It's your choice, and you can do it with the plugin's <BgStyledText>Make Bucket Public</BgStyledText> button or any S3 client. Keep anything private out of that bucket.

**What does it cost?**

Your storage is paid from your account balance, or with an S3 plan. Downloads are free, only storage is billed. You can top up your account balance by card, TAO, Bitcoin or USDC. See [Console Billing](/use/console/billing).

**Where are my credentials stored?**

Your Access Key ID, Secret Access Key and API token live in WordPress's standard options API, with admin-only access. The Secret Access Key field is masked in the UI and never exposed to JavaScript or the front-end.

**Will this slow my site down?**

Hippius serves your files from a distributed network of machines, which takes load off your origin server and frees up your hosting bandwidth. For a global audience, you can still put a CDN in front of Hippius.

**What happens to my existing media?**

Nothing, until you choose to migrate it. You can bulk-migrate everything at once, or just switch on auto migration for new uploads and leave your older files where they are.

**Can I stop a migration and finish it later?**

Yes. Click <BgStyledText>Stop Migration</BgStyledText> and it stops. When you start again, only the files that aren't migrated yet are picked up, and nothing already uploaded is repeated. The progress counter restarts for the remaining files.

**Can I go back to local storage?**

If you kept local copies during migration, deactivating the plugin puts WordPress back to serving from `wp-content/uploads`. There's no automatic reverse migration that pulls your files back down from Hippius, so keep local copies if you want an easy way back.

**What if migration fails for some files?**

The plugin logs every failure with a clear reason in the Error Log. Fix the cause and start the migration again: it only picks up the files that didn't make it.

**Does it support all WordPress file types?**

Yes. Images, video, audio, documents (PDF, DOC, XLS, and so on), archives, and anything else WordPress supports. You can add custom file types through WordPress filters.

**Can I use more than one bucket?**

Each site uses one bucket at a time. You can switch to a different bucket in the settings, and the plugin uses the new one from then on. If you need several buckets side by side, say to separate content types, run a WordPress site per bucket.

## Support & resources

**Plugin support**

<Unordered>
  <li>WordPress.org forum: <a href="https://wordpress.org/support/plugin/hippius-media-offloader/">wordpress.org/support/plugin/hippius-media-offloader</a></li>
</Unordered>

**Hippius documentation**

<Unordered>
  <li>S3 compatibility: <a href="/storage/s3/compatibility">supported S3 operations</a></li>
  <li>Public buckets and ACLs: <a href="/storage/s3/advanced#make-a-bucket-or-object-public">Make a bucket or object public</a></li>
  <li>How storage works on Arion: <a href="/learn/storage-systems">How Arion stores your data</a></li>
</Unordered>

**Hippius console**

<Unordered>
  <li>Account, keys and buckets: <a href="https://console.hippius.com">console.hippius.com</a></li>
  <li>Billing page, to top up your account balance: <a href="/use/console/billing">Console Billing</a></li>
</Unordered>

**Community**

<Unordered>
  <li>Community forum: <a href="https://community.hippius.com">community.hippius.com</a></li>
</Unordered>
