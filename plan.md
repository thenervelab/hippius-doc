# Hippius Documentation Overhaul Plan

## How We Got Here

The Hippius docs live in a Docusaurus v3.7.0 site. A colleague branched `dev` from `main` on March 27, 2026 and did an initial restructuring: split the monolithic S3 integration page into per-language client guides (Python, JavaScript, AWS CLI, rclone), added a troubleshooting page, rewrote the storage-miner and architecture pages, flattened the sidebar, and set up a staging CI/CD pipeline at `docs-dev.hippicode.com`.

After the branch, `main` received updates (April 1-3) for the desktop app: multi-folder sync, OAuth login, onboarding wizard, macOS Gatekeeper docs, billing dashboard, and getting-started screenshots. We've already merged those main-only updates into `dev` (via `git checkout main -- <files>`), so **dev is now the canonical branch** with all content from both sides.

The current state of the docs is functional but inconsistent. Code examples are scattered, some pages are long walls of text, there's no visual hierarchy, and the S3 documentation doesn't showcase what you can actually build. This plan is the roadmap to fix all of that.

## Where We Want to Go

A documentation site that:
1. Gets a developer from zero to a working S3 upload in under 5 minutes
2. Has copy-pasteable, tested code examples that actually run
3. Shows practical things you can build with Hippius S3 (not just API reference)
4. Is honest about what's supported and what isn't (S3 compatibility matrix)
5. Follows a consistent formatting standard across all pages
6. Has code examples extracted into standalone files that can be tested in CI/CD

---

## Part 1: Documentation Writing Rules

These rules apply to every page in the docs. They are based on research of what developers consistently praise (Stripe, Twilio, Vercel, Cloudflare R2) and consistently hate (outdated examples, marketing in docs, pseudo-code, information overload).

### Content Rules

1. **Every page answers "why should I care?" in the first paragraph.** State what problem this page solves and who it's for. Don't start with history or theory.

2. **Organize by user goals, not internal architecture.** Section headings should be tasks: "Upload a File," "Generate a Shareable Link," "Set Up a Storage Miner." Not "StorageS3 Pallet" or "ExecutionUnit Module."

3. **Quickstarts: 10 steps or fewer.** If it takes more than 10 steps, simplify the flow or split into a quickstart + a detailed guide. Target: first success in 5 minutes.

4. **Don't hide complexity.** If something is hard, say so. If there are gotchas, document them upfront. Pretending something is easy when it isn't destroys trust faster than admitting difficulty.

5. **Cross-link aggressively.** Mention an endpoint? Link to its reference. Mention a concept? Link to its explainer. The reader should never be more than one click from relevant context.

6. **No marketing language in technical docs.** Don't write "our innovative platform" or "cutting-edge technology." Developers searching for implementation details don't want sales copy.

7. **Write for a smart colleague who doesn't have your context.** Assume intelligence, not domain knowledge. Define terms on first use. Don't skip "obvious" steps.

### Formatting Rules

8. **Paragraphs: 3-4 lines max.** Documentation readers are task-focused. Lead with critical information. Use subheadings for scannability.

9. **Use admonitions for callouts.** Docusaurus supports `:::tip`, `:::warning`, `:::danger`, `:::info`, `:::note`. Use them instead of bold text or asterisks for important notices.

10. **Use Docusaurus `<Tabs>` for multi-language examples.** When showing the same operation in Python, JavaScript, and CLI, use tabs so the reader picks their language once.

11. **Always specify language on code blocks.** Every fenced code block must have a language identifier for syntax highlighting: ` ```python `, ` ```bash `, ` ```javascript `, etc.

12. **Add `title` to code blocks when they represent files.** Use ` ```python title="upload.py" ` to show which file the code belongs to.

13. **Keep pages focused on one topic.** If a page covers uploading, downloading, presigned URLs, public buckets, ACLs, and multipart uploads, it's too long. Split it.

14. **Use descriptive, keyword-rich headings.** "Configuring the S3 Client" is searchable; "Step 3" is not. Headings are what search indexes.

### Code Example Rules

15. **Every code example must be copy-pasteable and complete.** Include all imports, client initialization, and setup. A developer should be able to copy the block, replace credentials, and run it.

16. **Use consistent placeholder format.** All credentials use `YOUR_ACCESS_KEY` and `YOUR_SECRET_KEY` (not `hip_your_access_key_id`, not `<YOUR_ACCESS_KEY_ID>`, not `your_secret_key`). Standardize across all docs.

17. **Provide a complete working example at the end of each SDK page.** A single script that connects, creates a bucket, uploads, lists, downloads, and generates a presigned URL. This is the "I just want something that works" escape hatch.

18. **Code examples live in `/examples/` as standalone files.** Every code block that's meant to be runnable should also exist as a file in `/examples/{language}/` so it can be tested in CI/CD. The docs embed these files or duplicate them (with a comment pointing to the source file).

### Maintenance Rules

19. **Broken links fail the build.** The Docusaurus config already has `onBrokenLinks: "warn"` — this should be changed to `"throw"` once all existing broken links are fixed.

20. **Code examples are tested in CI/CD.** The `/examples/` directory has its own test runner that validates examples can at least parse/compile (and ideally run against a test endpoint).

---

## Part 2: S3 Compatibility Positioning

### The "Just Change the Endpoint" Message

Hippius S3 is a drop-in replacement for AWS S3 with a limited feature set. This needs to be front and center:

- The same `boto3`, `@aws-sdk/client-s3`, `minio`, `rclone`, and `aws` CLI code works with Hippius
- You only change: endpoint URL, region, and credentials
- Link to the official AWS S3 docs for general concepts (bucket policies, multipart theory, etc.)

### S3 Compatibility Matrix Page

Create a dedicated `/storage/s3/compatibility.md` page following the Cloudflare R2 model. Clean table with status icons:

| Operation | Status | Notes |
|-----------|--------|-------|
| CreateBucket | Supported | |
| DeleteBucket | Supported | |
| ListBuckets | Supported | |
| PutObject | Supported | Up to ~5 TiB via multipart |
| GetObject | Supported | Range requests supported |
| DeleteObject | Supported | |
| ListObjectsV2 | Supported | |
| CopyObject | Supported | |
| HeadObject | Supported | |
| PutBucketAcl | Supported | |
| PutObjectAcl | Supported | |
| CreateMultipartUpload | Supported | |
| PresignedURLs | Supported | Max 7 days |
| PutBucketPolicy | Supported | |
| GetBucketTagging | Supported | |
| PutObjectTagging | Supported | |
| Versioning | Not supported | |
| Cross-region replication | Not supported | |
| S3 Select | Not supported | |
| Bucket notifications | Not supported | |
| Object Lock | Not supported | |
| Lifecycle policies | Partial | |

Link to the latest [AWS S3 API Reference](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html) for operations we support, so users can read the full parameter docs there.

---

## Part 3: Example Applications

Create a new `/docs/storage/s3/examples/` section with 5 practical tutorials. Each tutorial should:
- State what it builds and why in the first paragraph
- List prerequisites (account, credits, S3 credentials)
- Be completable in 15-20 minutes
- Have a working code repo linked (or inline)
- Use the `<Tabs>` component for Python and JavaScript variants where applicable

### 3.1 File Sharing with Expiring Links

**What**: Upload a file, get a presigned URL that expires after a configurable time. A "personal Dropbox link" in ~50 lines.

**S3 features demonstrated**: PutObject, presigned GET URL, expiration

**Structure**:
- Why presigned URLs are useful
- Python version (Flask, ~50 lines): upload endpoint + URL generator endpoint + simple HTML form
- JavaScript version (Express, ~50 lines): same
- Test it: upload a file, share the link, watch it expire

**File**: `docs/storage/s3/examples/file-sharing.md`
**Code**: `examples/python/file_sharing.py`, `examples/javascript/file-sharing.mjs`

### 3.2 Video Hosting / Streaming

**What**: Upload videos, stream them in a browser with an HTML5 `<video>` player using range requests. ~100 lines.

**S3 features demonstrated**: PutObject with content-type, presigned URLs, range requests, public buckets

**Structure**:
- How range requests enable video streaming from S3
- Upload a video (CLI or script)
- Create a simple HTML page with `<video src="presigned-url">`
- Make the bucket public for a permanent video page
- Working demo link (Hippius already has one at `s3.hippius.com/micky/index.html`)

**File**: `docs/storage/s3/examples/video-hosting.md`
**Code**: `examples/python/video_hosting.py`, `examples/html/video-player.html`

### 3.3 Image Gallery / Portfolio

**What**: Upload images, list them, display a public gallery page. ~150 lines.

**S3 features demonstrated**: PutObject, ListObjectsV2, public bucket policy, content-type headers

**Structure**:
- Create a public bucket
- Upload images (script or CLI)
- List objects to build a gallery page
- Simple HTML/CSS gallery template
- Python and JavaScript variants

**File**: `docs/storage/s3/examples/image-gallery.md`
**Code**: `examples/python/image_gallery.py`, `examples/javascript/image-gallery.mjs`

### 3.4 Static Site / SPA Deployment

**What**: Deploy a React/Vue/plain HTML site to a public Hippius S3 bucket. Mostly CLI commands.

**S3 features demonstrated**: Bucket policy (public-read), `aws s3 sync`, content-type headers

**Structure**:
- Build your static site (any framework)
- Create a public bucket
- Sync the build directory: `aws s3 sync ./build s3://my-site --endpoint-url https://s3.hippius.com`
- Access at `https://s3.hippius.com/my-site/index.html`
- Caveat: no auto index.html routing (honest about limitations)
- Works best for SPAs where client-side routing handles paths

**File**: `docs/storage/s3/examples/static-site.md`

### 3.5 Nextcloud with Hippius S3 Backend

**What**: Configure Nextcloud to use Hippius S3 as its primary object storage.

**S3 features demonstrated**: Full CRUD operations, multipart uploads, path-style addressing, real-world integration

**Structure**:
- Why use S3 for Nextcloud (scalability, decentralization, no local disk dependency)
- Prerequisites: Hippius S3 credentials, Nextcloud instance (Docker recommended)
- Two approaches:
  1. **Primary storage** (all files in S3, must configure at install time):
     ```php title="config.php"
     'objectstore' => [
         'class' => '\\OC\\Files\\ObjectStore\\S3',
         'arguments' => [
             'bucket'         => 'nextcloud-data',
             'key'            => 'YOUR_ACCESS_KEY',
             'secret'         => 'YOUR_SECRET_KEY',
             'hostname'       => 's3.hippius.com',
             'port'           => 443,
             'use_ssl'        => true,
             'use_path_style' => true,
             'region'         => 'decentralized',
             'autocreate'     => true,
         ],
     ],
     ```
  2. **External storage** (mount as additional folder, can add anytime):
     - Admin Settings > External Storage > Amazon S3
     - Enter bucket, access key, secret, hostname `s3.hippius.com`, enable path style, enable SSL
- Gotchas:
  - `use_path_style` MUST be `true` (this is the #1 mistake with non-AWS S3 providers)
  - Cannot migrate existing Nextcloud instance to S3 primary storage (must be fresh install)
  - Files stored as opaque blobs with internal IDs (cannot browse bucket directly)
  - Bucket name must use hyphens, not underscores
- Link to official Nextcloud docs: [Primary Storage](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/primary_storage.html), [External Storage S3](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/external_storage/amazons3.html)
- Other self-hosted apps that work with S3: Mastodon (media attachments), GitLab (CI artifacts, LFS), Mattermost (file uploads)

**File**: `docs/storage/s3/examples/nextcloud.md`

---

## Part 4: Code Examples Extraction

### Current State

There are **180+ code blocks** across 17 documentation files. The breakdown:

| Category | Files | Code blocks | Languages |
|----------|-------|-------------|-----------|
| S3 SDK guides | `storage/s3/python.md`, `javascript.md`, `aws-cli.md`, `rclone.md` | ~70 | Python, JavaScript, Bash, INI |
| S3 integration | `storage/s3/integration.md` | ~25 | Python, JavaScript, Bash, HTML |
| Quickstart | `use/quickstart.md` | ~8 | Python, JavaScript, Bash |
| Blockchain/miner setup | `earn/arion/running-blockchain-node.md`, `running-miner.md` | ~35 | Bash, INI, TOML |
| Blockchain API | `blockchain/api.md` | ~31 | JSON |
| Validator setup | `earn/installing-validator.md`, `register-validator-in-chain.md` | ~17 | Bash, YAML, JSON |
| Registration | `earn/register-in-blockchain.md` | ~9 | Bash |
| VM management | `use/virtual-machines.md` | ~16 | Bash, PowerShell |
| Other (staking, bridge, pallets) | Various | ~5 | Rust, Text |

### Proposed `/examples/` Directory Structure

```
examples/
  python/
    connect.py              # S3 client initialization (boto3)
    connect_minio.py        # S3 client initialization (minio)
    upload_file.py          # Upload from disk and memory
    download_file.py        # Download to disk and memory
    list_objects.py         # List bucket contents
    presigned_url.py        # Generate presigned URLs
    public_bucket.py        # Create and use public buckets
    multipart_upload.py     # Large file uploads
    full_example.py         # Complete end-to-end example
    file_sharing.py         # Example app: file sharing service
    video_hosting.py        # Example app: video hosting
    image_gallery.py        # Example app: image gallery
  javascript/
    connect.mjs             # S3 client initialization (AWS SDK v3)
    connect-minio.mjs       # S3 client initialization (MinIO)
    upload-file.mjs         # Upload from disk and memory
    download-file.mjs       # Download to disk and memory
    list-objects.mjs        # List bucket contents
    presigned-url.mjs       # Generate presigned URLs
    public-bucket.mjs       # Create and use public buckets
    full-example.mjs        # Complete end-to-end example
    file-sharing.mjs        # Example app: file sharing service
    image-gallery.mjs       # Example app: image gallery
    browser-upload.html     # Browser-side presigned URL upload
  html/
    video-player.html       # HTML5 video player template
    image-gallery.html      # Gallery page template
  test/
    test_python.sh          # Run Python examples (syntax check + basic execution)
    test_javascript.sh      # Run JavaScript examples (syntax check + basic execution)
    README.md               # How to run tests, what endpoint to use
```

### Extraction Rules

1. **Every runnable code example in the docs should have a corresponding file in `/examples/`**
2. **Snippets stay inline.** One-liners like `pip install boto3` or `aws s3 ls` don't need their own files
3. **Complete examples get extracted.** Any block with imports + client setup + operations becomes a file
4. **Credential placeholders are standardized.** Every file uses:
   - `YOUR_ACCESS_KEY` (env var: `HIPPIUS_ACCESS_KEY`)
   - `YOUR_SECRET_KEY` (env var: `HIPPIUS_SECRET_KEY`)
   - Files read from env vars with fallback to placeholder strings
5. **Each file is self-contained.** Can be run with `python examples/python/upload_file.py` or `node examples/javascript/upload-file.mjs`
6. **Files include a header comment** pointing back to the docs page they're featured in

### CI/CD Test Strategy

Add a GitHub Actions workflow (`.github/workflows/test-examples.yaml`) that:

1. **Syntax validation** (runs on every PR):
   - Python: `python -m py_compile examples/python/*.py`
   - JavaScript: `node --check examples/javascript/*.mjs`
   
2. **Integration tests** (runs on demand or nightly, requires S3 credentials):
   - Creates a test bucket with a unique name
   - Runs each example against `s3.hippius.com`
   - Cleans up test bucket
   - Requires `HIPPIUS_ACCESS_KEY` and `HIPPIUS_SECRET_KEY` secrets

---

## Part 5: Page-by-Page Refactoring Plan

### S3 Documentation (Priority: HIGH)

#### `docs/storage/s3/integration.md` — Main S3 landing page
**Current state**: Monolithic page with Python, JavaScript, public buckets, ACLs, presigned URLs, multipart uploads, troubleshooting — all in one 700+ line file.
**Changes**:
- Strip down to an **overview and orientation page**: What is Hippius S3? How is it different from AWS S3? What can you do with it? Where to go next.
- Move all code examples to the per-language client guide pages
- Add the "just change the endpoint" message prominently
- Link to: Quickstart, Python guide, JavaScript guide, AWS CLI guide, rclone guide, Compatibility matrix, Example apps
- Keep: Connection parameters table (endpoint, region, signature version, path style)
- Remove: All SDK-specific code (it's duplicated in the client guide pages)

#### `docs/storage/s3/python.md` — Python SDK guide
**Current state**: Good structure with boto3 and minio sections. Complete working example at the end.
**Changes**:
- Standardize credential placeholders to `YOUR_ACCESS_KEY` / `YOUR_SECRET_KEY`
- Add `title` attributes to code blocks (e.g., `title="upload.py"`)
- Extract the complete working example to `examples/python/full_example.py`
- Add `<Tabs>` to switch between boto3 and minio for each operation
- Add a "Which library should I use?" decision box at the top
- Link to AWS boto3 docs for advanced S3 operations we support

#### `docs/storage/s3/javascript.md` — JavaScript SDK guide
**Current state**: Good structure with AWS SDK v3 and MinIO sections. Complete working example.
**Changes**:
- Same standardization as Python guide
- Extract complete example to `examples/javascript/full-example.mjs`
- Add browser upload section (presigned PUT URLs) — this is already partially there
- Add `<Tabs>` between AWS SDK v3 and MinIO
- Clarify ESM vs CommonJS (`.mjs` vs `require`)

#### `docs/storage/s3/aws-cli.md` — AWS CLI guide
**Current state**: Good. Has aliases tip, common operations, presigned URLs, public buckets.
**Changes**:
- Add `:::warning` admonition for the mandatory `--endpoint-url` flag (currently just bold text)
- Add `:::tip` for the alias trick
- Link to [AWS CLI S3 Command Reference](https://docs.aws.amazon.com/cli/latest/reference/s3/) for the full flag reference

#### `docs/storage/s3/rclone.md` — rclone guide
**Current state**: Good. Has config, operations, mount, performance tips.
**Changes**:
- Add `:::info` about FUSE requirement for mount
- Link to [rclone S3 docs](https://rclone.org/s3/) for the full config reference

#### NEW: `docs/storage/s3/compatibility.md` — S3 Compatibility Matrix
**Create from scratch**. See Part 2 above.

#### NEW: `docs/storage/s3/examples/*.md` — Example app tutorials
**Create from scratch**. See Part 3 above (5 tutorials).

#### `docs/use/troubleshooting.md` — Troubleshooting
**Current state**: Good coverage of common errors.
**Changes**:
- Add admonitions for each error type
- Ensure every error message is exact (copy-pasteable for Googling)
- Add "Still stuck?" section linking to Help & Support

### Quickstart (Priority: HIGH)

#### `docs/use/quickstart.md`
**Current state**: Works but could be tighter. Has screenshots now.
**Changes**:
- Ensure it's under 10 steps
- Use `<Tabs>` for Python/JavaScript/CLI examples
- Standardize credential placeholders
- Add a "What's next?" section linking to: S3 client guides, example apps, token management

### Learn Section (Priority: MEDIUM)

#### `docs/learn/intro.md`
**Changes**: Ensure the first paragraph answers "what is Hippius and why would I use it" in 2-3 sentences. Not a feature list — a value proposition.

#### `docs/learn/architecture.md`
**Changes**: Currently uses text descriptions. Consider adding a Mermaid diagram (already enabled in config) instead of the removed React component.

#### `docs/learn/storage-systems.md`
**Changes**: Good after the dev rewrite. Ensure it links to the S3 compatibility matrix and the Arion pallet docs.

### Earn Section (Priority: MEDIUM)

#### `docs/earn/storage-miner.md`
**Changes**: The dev rewrite is good. Ensure the two "getting started" links (blockchain node + Arion miner) are prominent.

#### `docs/earn/arion/running-blockchain-node.md` and `running-miner.md`
**Changes**:
- Fix the pre-existing broken link (`/docs/earn/installing-validator` should be `/earn/installing-validator`)
- Fix broken cross-reference anchors between the two pages
- Add `:::warning` admonitions for destructive operations (purge chain data, etc.)

### Desktop App Docs (Priority: LOW)

Already up to date from the main merge. No structural changes needed — just apply formatting rules (admonitions, shorter paragraphs) as a polish pass.

### Pallets Documentation (Priority: LOW)

These are reference docs. Apply formatting rules but don't restructure. Ensure each pallet page has:
- A one-paragraph description of what it does and why
- Links to related user-facing docs (e.g., StorageS3 pallet links to S3 integration guide)

---

## Part 6: Sidebar Restructuring

The current sidebar on dev is already improved from main. Proposed final structure:

```
Getting Started
  What is Hippius? (learn/intro)
  Quickstart (use/quickstart)

Storage (S3)
  Overview (storage/s3/integration) — renamed to "Overview"
  S3 Compatibility (storage/s3/compatibility) — NEW
  Client Guides
    Python (storage/s3/python)
    JavaScript / Node.js (storage/s3/javascript)
    AWS CLI (storage/s3/aws-cli)
    rclone (storage/s3/rclone)
  Token Management (use/s3-token-management)
  Example Apps
    File Sharing (storage/s3/examples/file-sharing) — NEW
    Video Hosting (storage/s3/examples/video-hosting) — NEW
    Image Gallery (storage/s3/examples/image-gallery) — NEW
    Static Site Deployment (storage/s3/examples/static-site) — NEW
    Nextcloud Integration (storage/s3/examples/nextcloud) — NEW
  Troubleshooting (use/troubleshooting)

Hippius Console
  Wallet (use/wallet)
  Staking (use/staking)
  Bridge Tokens (use/bridge-tokens)
  Virtual Machines (use/virtual-machines)
  Help & Support (use/help-support)

Desktop App
  Overview (use/desktop/desktop-app)
  Getting Started (use/desktop/using-the-app)
  File System (use/desktop/file-system)
  Settings (use/desktop/settings)
  Billing (use/desktop/billing)
  Wallet (use/desktop/wallet)
  Staking (use/desktop/staking)
  Bridge (use/desktop/bridge)
  Referral System (use/desktop/referral-system)

Learn
  Architecture (learn/architecture)
  Weight Calculation (learn/weights)
  Core Technologies
    Substrate (learn/substrate)
    BABE Consensus (learn/babe-consensus-mechanism)
    NPoS (learn/nominated-proof-of-stake-npos)
    Encryption (learn/encryption)
    Storage Systems (learn/storage-systems)
    Confidential Computing (learn/confidential-computing)
    VM Computing (learn/vm-computing)
    Mnemonic Auth (learn/mnemonic-auth) — marked as Legacy

Run a Node
  Validators
    Install Validator (earn/installing-validator)
    Register Validator (earn/register-validator-in-chain)
  Storage Miners
    Overview (earn/storage-miner)
    Run Blockchain Node (earn/arion/running-blockchain-node)
    Run Arion Miner (earn/arion/running-miner)
    Register in Blockchain (earn/register-in-blockchain)
  Staking (earn/staking)

Develop
  Blockchain API (blockchain/api)
  Blockchain Overview (blockchain/intro)
  Pallets (collapsed)
    [all pallet pages]
```

Key changes from current dev sidebar:
- S3 docs promoted to top-level section (it's the main product)
- Example apps added under S3
- "Earn" renamed to "Run a Node" (clearer intent)
- "Learn" moved below user-facing sections (most visitors are users, not learners)
- Quickstart at the very top

---

## Part 7: Configuration Changes

### `docusaurus.config.ts`
- Change `onBrokenLinks: "warn"` to `onBrokenLinks: "throw"` (after fixing existing broken links)
- Change `onBrokenMarkdownLinks: "warn"` to `onBrokenMarkdownLinks: "throw"`

### Fix Pre-existing Broken Links
Before changing to `"throw"`, fix these:
1. `docs/earn/arion/running-blockchain-node.md`: Link to `/docs/earn/installing-validator` should be `/earn/installing-validator`
2. `docs/earn/arion/running-blockchain-node.md`: Anchor `./running-miner#register-miner-in-arion-pallet` — verify the heading ID exists
3. `docs/earn/arion/running-miner.md`: Anchor `./running-blockchain-node#5-register-your-node-on-chain` — verify the heading ID exists
4. `docs/use/desktop/settings.md`: Anchor `#email-preferences` — verify the heading ID exists

---

## Part 8: Execution Order

### Phase 1: Foundation (do first)
1. Create `/examples/` directory structure
2. Extract all S3 code examples into standalone files with standardized credentials
3. Fix all pre-existing broken links
4. Create the S3 Compatibility Matrix page
5. Standardize credential placeholders across all existing docs

### Phase 2: S3 Docs Overhaul
6. Refactor `integration.md` into an overview/landing page
7. Apply formatting rules to Python, JavaScript, AWS CLI, rclone guides (admonitions, tabs, titles)
8. Write the 5 example app tutorials
9. Update the quickstart with `<Tabs>` and standardized placeholders

### Phase 3: Sidebar and Navigation
10. Update `sidebars.ts` with the new structure
11. Verify all navigation links work

### Phase 4: Polish Pass
12. Apply formatting rules to Learn, Earn, Desktop docs
13. Add Mermaid diagram to architecture page
14. Ensure every page has a clear opening paragraph

### Phase 5: CI/CD
15. Add `test-examples.yaml` workflow for syntax validation
16. Change `onBrokenLinks` to `"throw"`
17. Build and verify the full site

---

## Appendix: Key Links and References

### S3-Compatible Provider Docs (for reference)
- [AWS S3 API Reference](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)
- [AWS S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/)
- [Cloudflare R2 S3 Compatibility](https://developers.cloudflare.com/r2/api/s3/api/)
- [MinIO S3 Compatibility](https://min.io/docs/minio/linux/reference/minio-mc.html)
- [rclone S3 Provider Docs](https://rclone.org/s3/)

### Nextcloud S3 Docs
- [Nextcloud Primary Object Storage](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/primary_storage.html)
- [Nextcloud External Storage S3](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/external_storage/amazons3.html)

### Documentation Best Practices Sources
- [Stripe & Twilio: Cutting-Edge Documentation (DevDocs)](https://devdocs.work/post/stripe-twilio-achieving-growth-through-cutting-edge-documentation)
- [9 Components of Great Developer Documentation (WorkOS)](https://workos.com/blog/great-documentation-examples)
- [What Nobody Tells Developers About Documentation (PostHog)](https://newsletter.posthog.com/p/what-nobody-tells-developers-about)
- [Why These API Docs Are Better Than Yours (ReadMe)](https://readme.com/resources/why-these-api-docs-are-better-than-yours-and-what-you-can-do-about-it)
- [Stripe Documentation Case Study (Apidog)](https://apidog.com/blog/stripe-docs/)

### Other Self-Hosted Apps with S3 Support
These can be mentioned as "works with Hippius S3" in the Nextcloud tutorial or a future "Integrations" page:
- **Mastodon**: Media attachments via `.env.production` S3 settings
- **GitLab**: CI artifacts, LFS, uploads via `gitlab.rb`
- **Mattermost**: File attachments via `config.json` FileSettings
- **Immich**: Community forks with S3 support (official support planned)
