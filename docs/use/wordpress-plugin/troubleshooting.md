---
id: troubleshooting
title: Troubleshooting & FAQ
sidebar_label: Troubleshooting & FAQ
slug: /use/wordpress-plugin/troubleshooting
description: Fix common Hippius Media Offloader problems, from settings that won't save and media that won't show to an account balance that reads 0, plus answers to frequent questions.
pagination_next: null
---

import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

When something's not working, start with the **Error Log** and **Debug Log** at the bottom of the plugin page. They usually point straight at the problem.

<Screenshot src="/img/wordpress/troubleshooting-logs.png" alt="Error log and debug log for troubleshooting." raw />

*Error log and debug log for troubleshooting.*

## Troubleshooting

### Settings won't save: access denied or authentication failed

When <BgStyledText>Save Settings</BgStyledText> can't reach your bucket, you'll see **Settings were not saved because the connection check failed**, followed by the reason. Your previous settings stay in place until a save succeeds. A few things to check:

<Unordered>
  <li><strong>Invalid Access Key ID</strong> or <strong>Signature mismatch</strong> means a key is wrong. Re-check both, and watch for stray spaces at the start or end. If you've lost the Secret Access Key, create a new key pair in the console.</li>
  <li><strong>Access denied</strong> means the keys work but aren't allowed to use that bucket. Make sure they belong to the same Hippius account as the bucket.</li>
  <li><strong>An empty account balance.</strong> If your account balance has run out, top it up on the Billing page in the Hippius console.</li>
</Unordered>

If the message says the Access Key ID and Secret Access Key are required, fill in both. On a site that already has a saved secret, an empty Secret Access Key field keeps the saved one.

### Settings won't save: the bucket doesn't exist

The message reads **Bucket "your-bucket-name" does not exist or is not accessible**. The plugin doesn't create buckets, so the name you entered has to match a bucket in your Hippius account exactly. Remember that the suggested <code>wordpress-media</code> is only a placeholder, and that an empty field falls back to it. Create your bucket in the console first, then enter its exact name in <BgStyledText>Bucket Name</BgStyledText> and save. See [Create your bucket](/use/wordpress-plugin/credentials#step-4-create-your-bucket).

### Settings won't save: a timeout or DNS error

Your server can't reach the Hippius endpoint.

<Unordered>
  <li>Make sure your host allows outbound HTTPS traffic.</li>
  <li>Check that <BgStyledText>S3 Endpoint</BgStyledText> is set to <code>https://s3.hippius.com</code>, with no typos or extra paths. The endpoint must start with <code>https://</code>.</li>
  <li>Try a regional endpoint closer to your server: <code>https://eu-central-1.hippius.com</code> in Europe or <code>https://us-east-1.hippius.com</code> in the United States. They serve the same buckets and files. See <a href="/use/wordpress-plugin/configure#choosing-an-endpoint">Choosing an endpoint</a>.</li>
</Unordered>

### Settings saved, but the bucket is private

You'll see **Settings saved and connection verified, but the current bucket is private**. Your keys work, but visitors can't load media from a private bucket. Click <BgStyledText>Make Bucket Public</BgStyledText> under **Bucket Policy Status**, or make it public with any S3 client. See [Make sure your bucket is public](/use/wordpress-plugin/configure#make-sure-your-bucket-is-public).

### Some files won't migrate

Check the Error Log for the exact error on each file. The plugin already retries brief network errors on its own, so what's left there usually needs a fix. The usual suspects:

<Unordered>
  <li><strong>The file is too large.</strong> Hippius handles big files fine, but your PHP setup might cap uploads. Raise <code>upload_max_filesize</code> and <code>post_max_size</code> in your PHP config.</li>
  <li>The file is corrupted or can't be read off the local disk.</li>
  <li>The upload hit a network timeout. Retry just that file with <BgStyledText>Migrate to Hippius</BgStyledText> in the Media Library list view, or start the bulk migration again: only files that aren't migrated yet are picked up.</li>
  <li>The file type isn't supported. These files show as <strong>Unsupported</strong> in the Media Library and stay local. See the file types question below.</li>
</Unordered>

Once you've dealt with the errors, <BgStyledText>Clear Error Log</BgStyledText> empties the list so new problems are easy to spot.

### Bulk migration stopped partway

Bulk migration runs from your open browser tab, so closing the tab or losing your connection pauses it. Open <BgStyledText>Hippius Media</BgStyledText> again: within the hour it carries on by itself, and after that you click <BgStyledText>Start Migration</BgStyledText> and it picks up only what's left. See [Keep the page open while it runs](/use/wordpress-plugin/migrate#bulk-migration-for-existing-files).

### Migrated media doesn't show on the front-end

<Unordered>
  <li>Open one migrated file's Hippius URL in a private browser window. If it returns <strong>AccessDenied</strong>, the bucket isn't public. Click <BgStyledText>Make Bucket Public</BgStyledText> in the plugin, or run <code>aws s3api put-bucket-acl --bucket your-bucket-name --acl public-read --endpoint-url https://s3.hippius.com</code> (see <a href="/storage/s3/advanced#make-a-bucket-or-object-public">Make a bucket or object public</a>), then reload your page.</li>
  <li>Cached pages can still hold the old local URLs. Clear your WordPress page cache, plus any CDN cache in front of your site.</li>
</Unordered>

### Account balance shows 0 or doesn't update

<Unordered>
  <li>Make sure you added your API token in the plugin settings, not just the S3 keys. The token is what lets the plugin read your account balance. Without it, the plugin tells you no API token is configured.</li>
  <li>Click <BgStyledText>Check balance</BgStyledText> to force a refresh.</li>
  <li>If it really is 0, add funds to your account balance on the Billing page in the <a href="https://console.hippius.com">Hippius console</a>.</li>
</Unordered>

### Making sense of the Debug Log

The Debug Log records every URL decision the plugin makes. <BgStyledText>Refresh Log</BgStyledText> shows the latest entries, <BgStyledText>Download Log</BgStyledText> saves a copy you can share when asking for help, and <BgStyledText>Clear Log</BgStyledText> starts it fresh. The entries worth knowing:

<Unordered>
  <li><strong>Original file match</strong> means the plugin found a matching Hippius file for a URL.</li>
  <li><strong>No size match found</strong> means it couldn't find that exact image size, so it fell back to the original-size file.</li>
  <li><strong>Fallback URL</strong> is the URL it actually served.</li>
</Unordered>

## FAQ

**What is Hippius?**

Hippius is a distributed cloud storage platform where every file is encrypted and split across independent machines. You get the convenience of mainstream cloud storage without having to trust any single provider.

**What is Arion?**

Arion is our own distributed storage engine. It uses Reed-Solomon erasure coding (10 data pieces plus 20 parity pieces, 30 in total) and the CRUSH placement algorithm. Your files rebuild even if 20 machines fail at once. See [How Arion stores your data](/learn/storage-systems).

**Do my files leave WordPress encrypted?**

The connection between WordPress and Hippius runs over HTTPS. Once on Hippius, your files are encrypted at rest with envelope encryption: every chunk is encrypted under its own key, and those keys are wrapped by a key management service, so miners only ever see encrypted bytes, never your content. The plugin itself doesn't encrypt files before they leave your server, and media served on a website is public by nature anyway. For true end-to-end, client-side encryption, use the [Hippius Desktop app](/use/desktop/getting-started).

**Why does my bucket need to be public?**

Your pages load each image straight from its Hippius URL, and visitors' browsers can't sign in to a private bucket. Making the bucket public is what lets them see your media. It's your choice, and you can do it with the plugin's <BgStyledText>Make Bucket Public</BgStyledText> button or any S3 client. Keep anything private out of that bucket.

**What does it cost?**

Your storage is paid from your account balance, or with an S3 plan. Downloads are free, only storage is billed. You can top up your account balance by card, TAO, Bitcoin or USDC. See [Console Billing](/use/console/billing).

**Where are my credentials stored?**

Your Access Key ID, Secret Access Key and API token live in WordPress's standard options API, with admin-only access. The Secret Access Key field is masked in the UI and never exposed to JavaScript or the front-end.

**Will this slow my site down?**

In most cases it speeds things up. Hippius serves your files from a distributed network of machines, which takes load off your origin server and frees up your hosting bandwidth. The plugin isn't a CDN, though, so for a global audience you can still put one in front of Hippius.

**What happens to my existing media?**

Nothing, until you choose to migrate it. You can bulk-migrate everything at once, or just switch on auto migration for new uploads and leave your older files where they are.

**Can I close the tab while a bulk migration runs?**

It's better not to. Bulk migration is driven by the open plugin page, so closing the tab pauses it. Nothing is lost: reopen <BgStyledText>Hippius Media</BgStyledText> and it carries on, or click <BgStyledText>Start Migration</BgStyledText> to pick up the remaining files. Auto migration of new uploads is different: it runs in the background and needs no open page.

**Can I stop a migration and finish it later?**

Yes. Click <BgStyledText>Stop Migration</BgStyledText> and it stops. When you start again, only the files that aren't migrated yet are picked up, and nothing already uploaded is repeated. The progress counter restarts for the remaining files.

**Can I go back to local storage?**

If you kept local copies during migration, deactivating the plugin puts WordPress back to serving from `wp-content/uploads`. There's no automatic reverse migration that pulls your files back down from Hippius, so keep local copies if you want an easy way back.

**What if migration fails for some files?**

The plugin logs every failure with a clear reason in the Error Log. Fix the cause, then retry. To retry one file, use <BgStyledText>Migrate to Hippius</BgStyledText> on it in the Media Library list view. To retry everything that's left, start the bulk migration again: it only picks up the files that didn't make it.

**Does it support all WordPress file types?**

It supports the media types sites use day to day:

<Unordered>
  <li><strong>Images:</strong> JPEG, PNG, GIF, WebP, HEIC, SVG, BMP and ICO.</li>
  <li><strong>Video:</strong> MP4, M4V, MOV, AVI, WMV, MPEG, OGG and 3GP.</li>
  <li><strong>Audio:</strong> MP3, M4A, OGG, WAV and WMA.</li>
  <li><strong>Documents:</strong> PDF, Word, Excel, PowerPoint, OpenDocument text, RTF, Photoshop, plain text, CSV and calendar files.</li>
  <li><strong>Archives:</strong> ZIP.</li>
</Unordered>

Anything else stays on your server and shows as <strong>Unsupported</strong> in the Media Library's Hippius Status column. The list is built into the plugin, so there's currently no setting or filter to add more types.

**Can I use more than one bucket?**

The plugin uses one bucket per site. You can switch to a different bucket in the settings, and the plugin uses the new one from then on, while files already migrated keep loading from the bucket they went to. If you need several buckets side by side, say to separate content types, run a WordPress site per bucket.

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
