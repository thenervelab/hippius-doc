// Hippius S3 — Connect with MinIO SDK
// Docs: /storage/s3/javascript
//
// Create a .env file (see .env.example):
//   HIPPIUS_ACCESS_KEY=hip_...
//   HIPPIUS_SECRET_KEY=...

import "dotenv/config";
import { Client } from "minio";

const client = new Client({
  endPoint: "s3.hippius.com",
  port: 443,
  useSSL: true,
  accessKey: process.env.HIPPIUS_ACCESS_KEY,
  secretKey: process.env.HIPPIUS_SECRET_KEY,
  region: "decentralized",
});

const buckets = await client.listBuckets();
console.log(`Connected. ${buckets.length} bucket(s) found.`);
