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
        "storage/s3/integration",
        {
          type: "link",
          label: "API Reference ↗",
          href: "https://api.hippius.com/",
        },
        {
          type: "link",
          label: "Pricing ↗",
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
        "use/desktop/wallet",
        "use/desktop/staking",
      ],
    },

    // ── CONSOLE ────────────────────────────────────────────────────
    {
      type: "category",
      label: "Console",
      collapsed: true,
      items: [
        "use/virtual-machines",
        "use/wallet",
        "use/staking",
        "use/bridge-tokens",
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

    // ── CONCEPTS ───────────────────────────────────────────────────
    {
      type: "category",
      label: "How it works",
      collapsed: true,
      items: [
        "learn/architecture",
        "learn/storage-systems",
        "learn/encryption",
        "learn/confidential-computing",
        "learn/vm-computing",
        "learn/substrate",
        "learn/substrate-staking",
        "learn/babe-consensus-mechanism",
        "learn/nominated-proof-of-stake-npos",
        "learn/mnemonic-auth",
        "learn/miner",
        "learn/weights",
      ],
    },

    // ── DEVELOP ────────────────────────────────────────────────────
    // Kept but collapsed — internal/developer reference
    {
      type: "category",
      label: "Blockchain & Pallets",
      collapsed: true,
      items: [
        "blockchain/api",
        "blockchain/intro",
        {
          type: "category",
          label: "Pallets",
          link: { type: "doc", id: "blockchain/pallets" },
          collapsed: true,
          items: [
            "pallets/arion-pallet",
            "pallets/alpha-bridge",
            "pallets/credits",
            "pallets/rankings",
            "pallets/marketplace",
            "pallets/registration",
            "pallets/executionUnit",
            "pallets/backup",
            "pallets/containerRegistry",
            "pallets/storageS3",
            "pallets/computePallet",
            "pallets/palletIp",
            "pallets/bittensor",
            "pallets/metagraph",
            "pallets/subAccount",
            "pallets/notifications",
            "pallets/accountProfile",
            "pallets/utils",
          ],
        },
      ],
    },

    // ── SUPPORT ────────────────────────────────────────────────────
    "use/help-support",
  ],
};

export default sidebars;
