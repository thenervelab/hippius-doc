// Hippius S3 — Complete end-to-end example with AWS SDK v3
// Docs: /storage/s3/javascript

import "dotenv/config";
import {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// 1. Connect to Hippius S3
const s3 = new S3Client({
  endpoint: "https://s3.hippius.com",
  region: "decentralized",
  credentials: {
    accessKeyId: process.env.HIPPIUS_ACCESS_KEY,
    secretAccessKey: process.env.HIPPIUS_SECRET_KEY,
  },
  forcePathStyle: true,
});

const bucketName = `hippius-demo-js-${Date.now()}`;
const fileKey = "greeting.txt";

// Run a delete, ignoring an object or bucket that is already gone.
async function deleteIfPresent(command) {
  try {
    await s3.send(command);
  } catch (err) {
    if (err.name !== "NoSuchKey" && err.name !== "NoSuchBucket") throw err;
  }
}

let bucketCreated = false;
let uploaded = false;

try {
  // 2. Create bucket
  console.log(`Creating bucket: ${bucketName}`);
  await s3.send(new CreateBucketCommand({ Bucket: bucketName }));
  bucketCreated = true;

  // 3. Upload string
  console.log(`Uploading file: ${fileKey}`);
  await s3.send(new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    Body: "Welcome to Hippius S3 Storage!",
    ContentType: "text/plain",
  }));
  uploaded = true;

  // 4. List objects
  console.log("Listing objects:");
  const listRes = await s3.send(new ListObjectsV2Command({ Bucket: bucketName }));
  for (const obj of listRes.Contents || []) {
    console.log(`  ${obj.Key} (${obj.Size} bytes)`);
  }

  // 5. Download file
  console.log("Downloading file:");
  const getRes = await s3.send(new GetObjectCommand({ Bucket: bucketName, Key: fileKey }));
  const content = await getRes.Body.transformToString();
  console.log(`  Content: ${content}`);

  // 6. Generate presigned URL
  console.log("Generating presigned URL:");
  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: bucketName, Key: fileKey }),
    { expiresIn: 3600 },
  );
  console.log(`  URL: ${url}`);
} finally {
  // 7. Clean up. A real app would keep its bucket; this example deletes
  // what it created so it can be rerun without leaving buckets behind.
  if (bucketCreated) {
    if (uploaded) {
      await deleteIfPresent(new DeleteObjectCommand({ Bucket: bucketName, Key: fileKey }));
    }
    await deleteIfPresent(new DeleteBucketCommand({ Bucket: bucketName }));
    console.log(`Cleaned up ${bucketName}`);
  }
}
