import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    // ── INTRO ──────────────────────────────────────────────────────
    "learn/intro",

    // ── S3 STORAGE ─────────────────────────────────────────────────
    {
      type: "category",
      label: "S3 Storage",
      collapsed: false,
      items: [
        "use/quickstart",
        "use/s3-token-management",
        "storage/s3/python",
        "storage/s3/javascript",
        "storage/s3/aws-cli",
        "storage/s3/rclone",
        "storage/s3/compatibility",
        "use/troubleshooting",
        "storage/s3/integration",
        {
          type: "category",
          label: "Example Apps",
          collapsed: true,
          items: [
            "storage/s3/examples/file-sharing",
            "storage/s3/examples/video-hosting",
            "storage/s3/examples/image-gallery",
            "storage/s3/examples/static-site",
            "storage/s3/examples/nextcloud",
            "storage/s3/examples/duplicati",
          ],
        },
        "use/hippius-api",
        {
          type: "link",
          label: "Pricing",
          href: "https://hippius.com/pricing",
        },
      ],
    },

    // ── REGISTRY ───────────────────────────────────────────────────
    {
      type: "category",
      label: "Registry",
      collapsed: false,
      items: [
        "registry/quickstart",
        "registry/pull",
        "registry/push",
        "registry/cli",
      ],
    },

    // ── DESKTOP APP ────────────────────────────────────────────────
    {
      type: "category",
      label: "Desktop App",
      collapsed: true,
      items: [
        "use/desktop/desktop-app",
        "use/desktop/using-the-app",
        "use/desktop/file-system",
        "use/desktop/settings",
        "use/desktop/billing",
        "use/desktop/referral-system",
        // ⚠️ WARNING: "Wallet" page is NOT live yet. Do NOT uncomment
        // until the feature is fully released and verified by the team.
        "use/desktop/wallet",
      ],
    },

    // ── CONSOLE ────────────────────────────────────────────────────
    {
      type: "category",
      label: "Console",
      collapsed: true,
      items: [
        "use/console/getting-started",
        "use/console/overview",
        "use/console/drive",
        "use/console/shared-links",
        "use/console/s3",
        "use/console/uploads",
        "use/console/virtual-machines",
        // ⚠️ "Wallet" page is hidden until the feature is live. The page
        // is also marked `draft: true` in wallet.md to block direct access.
        // Re-enable both together when ready to publish.
        // "use/console/wallet",
        "use/console/billing",
        "use/console/referrals",
        "use/console/settings",
        "use/console/support",
      ],
    },

    // ── SEPARATOR ──────────────────────────────────────────────────
    {
      type: "html",
      value: "<hr />",
    },

    // ── CONCEPTS ───────────────────────────────────────────────────
    {
      type: "category",
      label: "How it works",
      collapsed: true,
      items: [
        "learn/architecture",
        "learn/storage-systems",
        "learn/proof-of-storage",
        "learn/encryption",
        "learn/confidential-computing",
        "learn/vm-computing",
        "learn/substrate",
        "learn/substrate-staking",
        "learn/babe-consensus-mechanism",
        "learn/nominated-proof-of-stake-npos",
        "learn/miner",
        "learn/weights",
      ],
    },

    // ── EARN / MINE ────────────────────────────────────────────────
    {
      type: "category",
      label: "Run a Miner",
      collapsed: true,
      items: [
        "earn/arion/running-blockchain-node",
        "earn/arion/running-miner",
        "earn/register-in-blockchain",
        "earn/storage-miner",
        "cli/usage",
      ],
    },

    // ── VALIDATORS ─────────────────────────────────────────────────
    {
      type: "category",
      label: "Run a Validator",
      collapsed: true,
      items: [
        "earn/installing-validator",
        "earn/register-validator-in-chain",
      ],
    },

    // ── STAKE ──────────────────────────────────────────────────────
    {
      type: "category",
      label: "Stake",
      collapsed: true,
      items: [
        "earn/staking",
      ],
    },

    // ── DEVELOP ────────────────────────────────────────────────────
    {
      type: "category",
      label: "Develop",
      collapsed: true,
      items: [
        "blockchain/api",
      ],
    },

    // ── HCFS ───────────────────────────────────────────────────────
    {
      type: "category",
      label: "HCFS",
      collapsed: true,
      items: [
        "hcfs/integration-guide",
        "hcfs/architecture-diagrams",
        {
          type: "category",
          label: "REST API",
          collapsed: true,
          items: [
            "hcfs/api/overview",
            "hcfs/api/auth",
            "hcfs/api/errors",
            "hcfs/api/upload",
            "hcfs/api/download",
            "hcfs/api/delete",
            "hcfs/api/s3-gateway",
            "hcfs/api/get-state",
            "hcfs/api/browse",
            "hcfs/api/search-files",
            "hcfs/api/register-relative-paths",
            "hcfs/api/folders",
            "hcfs/api/rename-files",
            "hcfs/api/upload-session",
          ],
        },
      ],
    },

    // ── SUPPORT ────────────────────────────────────────────────────
    "use/help-support",
  ],
};

export default sidebars;
