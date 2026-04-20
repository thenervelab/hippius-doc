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

    // ⚠️ WARNING: The "Console" section (Virtual Machines, Wallet) is NOT
    // live yet. Do NOT uncomment until these features are fully released
    // and verified by the team. Check with team before enabling.
    {
      type: "category",
      label: "Console",
      collapsed: true,
      items: [
        "use/virtual-machines",
        "use/wallet",
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

    // ── STAKE ──────────────────────────────────────────────────────
    "earn/staking",

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

    // ── DEVELOP ────────────────────────────────────────────────────
    {
      type: "category",
      label: "Develop",
      collapsed: true,
      items: [
        "blockchain/api",
      ],
    },

    // ── SUPPORT ────────────────────────────────────────────────────
    "use/help-support",
  ],
};

export default sidebars;
