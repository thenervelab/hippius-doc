---
title: "Example: Static Site Hosting"
sidebar_label: Static Site
slug: /storage/s3/examples/static-site
---

# Static Site Hosting

Deploy a static website (HTML, CSS, JS) to a public Hippius S3 bucket and serve it directly. No web server needed.

## Setup

Create a public bucket for your site:

```bash
# Create bucket
aws s3 mb s3://my-site \
  --profile hippius --endpoint-url https://s3.hippius.com

# Make it public
aws s3api put-bucket-acl --bucket my-site --acl public-read \
  --profile hippius --endpoint-url https://s3.hippius.com
```

## Deploy

Use `aws s3 sync` to upload your site. It only uploads changed files:

```bash
aws s3 sync ./dist s3://my-site/ \
  --profile hippius --endpoint-url https://s3.hippius.com
```

Your site is now live at:
```
https://s3.hippius.com/my-site/index.html
```

## Example Site

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Site</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello from Hippius S3!</h1>
  <p>This page is served from decentralized storage.</p>
  <script src="app.js"></script>
</body>
</html>
```

```css title="style.css"
body {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  margin: 4rem auto;
  text-align: center;
}
```

Deploy:

```bash
aws s3 sync . s3://my-site/ \
  --profile hippius --endpoint-url https://s3.hippius.com
```

## Automate with CI/CD

Add to your GitHub Actions workflow:

```yaml title=".github/workflows/deploy-site.yaml"
name: Deploy to Hippius S3
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build site
        run: npm run build

      - name: Deploy to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.HIPPIUS_ACCESS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.HIPPIUS_SECRET_KEY }}
          AWS_DEFAULT_REGION: decentralized
        run: |
          aws s3 sync ./dist s3://my-site/ \
            --endpoint-url https://s3.hippius.com \
            --delete
```

:::warning
The `--delete` flag removes files from S3 that don't exist locally. Only use it if you want a clean mirror.
:::

## Key Points

- Static files are served directly from the public bucket
- Use `aws s3 sync` for efficient incremental deploys
- All standard web assets work: HTML, CSS, JS, images, fonts
- URLs follow the pattern `https://s3.hippius.com/{bucket}/{path}`
- No custom domain support yet — files are served from `s3.hippius.com`
