# Hippius Documentation

This repository contains the Docusaurus-based documentation site for Hippius.

## Development

We use pnpm here.

To install dependencies, run `pnpm install`.

To run the project, run `pnpm run start`.

## Building

To build the static site:

```bash
pnpm run build
```

The built site will be in the `build` directory.

## Deployment

This project is automatically deployed to Kubernetes using GitHub Actions. The workflow:

1. Builds a Docker image when changes are pushed to main/master or when a tag is created
2. Pushes the image to the private registry
3. Deploys to Kubernetes in the `hippius-documentation` namespace

### Required Secrets

The following secrets must be configured in GitHub:

- `REGISTRY_USERNAME`: Username for the private Docker registry
- `REGISTRY_PASSWORD`: Password for the private Docker registry
- `KUBE_CONFIG`: Kubernetes configuration file with access to the cluster

## Kubernetes Configuration

Kubernetes manifests are located in the `k8s` directory. The deployment uses:

- Namespace: `hippius-documentation`
- Service Type: ClusterIP

---

## Documentation Writing Rules

These rules apply to **every page** in this documentation site. All contributors (human and AI) must follow them.

### Content

1. **Every page answers "why should I care?" in the first paragraph.** State what problem this page solves and who it's for. Don't start with history or theory.

2. **Organize by user goals, not internal architecture.** Headings should be tasks: "Upload a File," "Generate a Shareable Link." Not "StorageS3 Pallet" or "ExecutionUnit Module."

3. **Quickstarts: 10 steps or fewer.** Target: first success in 5 minutes. Advanced configuration belongs in separate linked guides.

4. **Don't hide complexity.** If something is hard or has gotchas, say so upfront. Pretending something is easy when it isn't destroys trust.

5. **Cross-link aggressively.** Mention an endpoint? Link to its reference. Mention a concept? Link to its explainer. Never more than one click from relevant context.

6. **No marketing language in technical docs.** Don't write "our innovative platform" or "cutting-edge technology." Developers don't want sales copy.

7. **Write for a smart colleague who doesn't have your context.** Assume intelligence, not domain knowledge. Define terms on first use.

### Formatting

8. **Paragraphs: 3-4 lines max.** Lead with critical information. Use subheadings for scannability.

9. **Use Docusaurus admonitions for callouts.** Use `:::tip`, `:::warning`, `:::danger`, `:::info`, `:::note` instead of bold text or asterisks.

10. **Use `<Tabs>` for multi-language examples.** When showing the same operation in Python, JavaScript, and CLI, use tabs.

11. **Always specify language on code blocks.** Every fenced code block needs a language identifier: ` ```python `, ` ```bash `, ` ```javascript `.

12. **Add `title` to code blocks representing files.** Use ` ```python title="upload.py" ` to clarify context.

13. **Keep pages focused on one topic.** If a page covers uploading, downloading, presigned URLs, ACLs, and multipart — it's too long. Split it.

14. **Use descriptive, keyword-rich headings.** "Configuring the S3 Client" is searchable; "Step 3" is not.

### Code Examples

15. **Every code example must be copy-pasteable and complete.** Include all imports, client setup, and operations. A developer should copy, replace credentials, and run.

16. **Use consistent credential placeholders.** Always use `YOUR_ACCESS_KEY` and `YOUR_SECRET_KEY`. Not `hip_your_access_key_id`, not `<YOUR_ACCESS_KEY_ID>`, not `your_secret_key`.

17. **Provide a complete working example at the end of each SDK page.** A single script: connect, create bucket, upload, list, download, presigned URL. The "I just want something that works" escape hatch.

18. **Code examples live in `/examples/` as standalone files.** Runnable code blocks should have a corresponding file in `/examples/{language}/` for CI/CD testing.

### Maintenance

19. **Broken links must not be merged.** `onBrokenLinks` is set to throw. Fix broken links before merging.

20. **Test code examples.** The `/examples/` directory has CI/CD tests that validate examples parse and compile correctly.
