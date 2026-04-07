// Hippius S3 — Connect with AWS SDK v3
// Docs: /storage/s3/javascript
//
// Create a .env file (see .env.example):
//   HIPPIUS_ACCESS_KEY=hip_...
//   HIPPIUS_SECRET_KEY=...

import "dotenv/config";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: "https://s3.hippius.com",
  region: "decentralized",
  credentials: {
    accessKeyId: process.env.HIPPIUS_ACCESS_KEY,
    secretAccessKey: process.env.HIPPIUS_SECRET_KEY,
  },
  forcePathStyle: true,
});

const { Buckets } = await s3.send(new ListBucketsCommand({}));
console.log(`Connected. ${Buckets.length} bucket(s) found.`);
