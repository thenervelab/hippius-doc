// Hippius S3 — Generate presigned URLs with AWS SDK v3
// Docs: /storage/s3/javascript

import "dotenv/config";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
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

const bucketName = "my-bucket";

const url = await getSignedUrl(
  s3,
  new GetObjectCommand({ Bucket: bucketName, Key: "hello.txt" }),
  { expiresIn: 3600 },
);
console.log(`Presigned URL: ${url}`);
