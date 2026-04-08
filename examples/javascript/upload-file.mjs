// Hippius S3 — Upload files with AWS SDK v3
// Docs: /storage/s3/javascript

import "dotenv/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";

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

// Upload from disk
await s3.send(new PutObjectCommand({
  Bucket: bucketName,
  Key: "file.txt",
  Body: readFileSync("./file.txt"),
}));
console.log("Uploaded file.txt from disk");

// Upload from string
await s3.send(new PutObjectCommand({
  Bucket: bucketName,
  Key: "hello.txt",
  Body: "Hello from Hippius!",
  ContentType: "text/plain",
}));
console.log("Uploaded hello.txt from string");
