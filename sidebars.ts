import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    // ══ LEARN ══════════════════════════════════════════════════════
    {
      type: "category",
      label: "Learn",
      collapsed: false,
      items: [
        "learn/intro",
        {
          type: "category",
          label: "How it Works",
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
      ],
    },

    // ══ USE ════════════════════════════════════════════════════════
    {
      type: "category",
      label: "Use",
      collapsed: false,
      items: [
        {
          type: "category",
          label: "S3 Storage",
          collapsed: true,
          items: [
            {
              type: "category",
              label: "Getting Started",
              collapsed: true,
              items: ["use/quickstart", "use/s3-token-management"],
            },
            {
              type: "category",
              label: "Client Libraries",
              collapsed: true,
              items: [
                "storage/s3/python",
                "storage/s3/javascript",
                "storage/s3/aws-cli",
                "storage/s3/rclone",
              ],
            },
            {
              type: "category",
              label: "Reference",
              collapsed: true,
              items: [
                "storage/s3/compatibility",
                "storage/s3/integration",
                "use/hippius-api",
                "use/troubleshooting",
              ],
            },
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
          ],
        },
        {
          type: "category",
          label: "Container Registry",
          collapsed: true,
          items: [
            "registry/quickstart",
            "registry/pull",
            "registry/push",
            "registry/cli",
          ],
        },
        {
          type: "category",
          label: "Desktop App",
          collapsed: true,
          items: [
            "use/desktop/desktop-app",
            "use/desktop/using-the-app",
            "use/desktop/drive",
            "use/desktop/shared-links",
            "use/desktop/share-from-finder",
            "use/desktop/virtual-machines",
            "use/desktop/settings",
            "use/desktop/billing",
            // ⚠️ "Referral System" is coming soon — hidden from the sidebar and
            // marked `draft: true` in referral-system.md to block direct access.
            // Re-enable both together when the feature is live.
            // "use/desktop/referral-system",
            // ⚠️ "Wallet" page is hidden until the feature is live. The page
            // is also marked `draft: true` in wallet.md to block direct access.
            // Re-enable both together when ready to publish.
            // "use/desktop/wallet",
            "use/desktop/notifications",
            "use/help-support",
          ],
        },
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
            // ⚠️ "Referrals" page is hidden until the feature is live. The page is
            // also marked `draft: true` in use/console/referrals.md to block direct
            // access. Re-enable both together when ready to publish.
            // "use/console/referrals",
            "use/console/settings",
            "use/console/support",
          ],
        },
        {
          type: "link",
          label: "Pricing",
          href: "https://hippius.com/pricing",
        },
      ],
    },

    // ══ EARN ═══════════════════════════════════════════════════════
    {
      type: "category",
      label: "Earn",
      collapsed: true,
      items: [
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
        {
          type: "category",
          label: "Run a Validator",
          collapsed: true,
          items: [
            "earn/installing-validator",
            "earn/register-validator-in-chain",
          ],
        },
      ],
    },

    // ══ DEVELOP ════════════════════════════════════════════════════
    {
      type: "category",
      label: "Develop",
      collapsed: true,
      items: [
        "blockchain/api",
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
      ],
    },
  ],
};

export default sidebars;
