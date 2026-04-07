// Hippius S3 — List objects with AWS SDK v3
// Docs: /storage/s3/javascript

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

const bucketName = "my-bucket";

const response = await s3.send(new ListObjectsV2Command({
  Bucket: bucketName,
}));

for (const obj of response.Contents ?? []) {
  console.log(`${obj.Key}  (${obj.Size} bytes)`);
}
