import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// Node.js environment - no browser APIs/JSX

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "category",
      label: "Learn",
      items: [
        "learn/intro", // What is Hippius?
        "learn/architecture", // System Architecture
        "learn/weights", // Weight Calculation System
        "learn/miner", //miner diagram - link to GH

        {
          type: "category",
          label: "Core Technologies",
          items: [
            "learn/substrate", //substrate
            "learn/substrate-staking", //substrate
            "learn/mnemonic-auth", // Mnemonic Authentication
            "learn/encryption", // Encryption System
            "learn/storage-systems", // Decentralized Storage Systems
            "learn/confidential-computing", // Confidential Computing
            "learn/vm-computing", // Decentralized Storage Systems
          ],
          collapsed: false, // Collapsed by default (not yet released)
        },
      ],
    },
    {
      type: "category",
      label: "Use",
      items: [
        "use/bridge", // Using the Hippius Coming Soon bridge
        "use/s3-token-management", // S3 Token Management
        "use/virtual-machines", // Virtual Machines
        // "use/wallet", // Hippius Wallet
        // "use/staking", // Staking
        // "use/bridge-tokens", // Bridge Tokens
        "use/help-support", // Help & Support
        {
          type: "category",
          label: "Hippius Desktop App",
          items: [
            "use/desktop/desktop-app", // Desktop App
            "use/desktop/using-the-app", // Using the App
            "use/desktop/file-system", // File System
            "use/desktop/settings", // App Settings
            "use/desktop/billing", // Billing
            "use/desktop/referral-system", // Referral System
          ],
          collapsed: false, // Collapsed by default (not yet released)
        },
      ],
    },
    {
      type: "category",
      label: "Earn",
      items: [
        "earn/installing-validator", // Installing a validator node
        "earn/register-validator-in-chain", // Register a validator in the chain
        "earn/storage-miner", // Setting up storage miners
        "earn/register-in-blockchain", // Registering nodes in the blockchain
        "earn/staking", // Staking on Hippius
      ],
    },
    {
      type: "category",
      label: "Develop",
      items: [
        "cli/usage",
        "blockchain/api",
        {
          type: "category",
          label: "Blockchain",
          items: [
            "blockchain/intro", // Hippius blockchain intro
            {
              type: "category",
              label: "Hippius Pallets",
              link: { type: "doc", id: "blockchain/pallets" }, // Link to the main page
              collapsed: true,
              items: [
                "pallets/alpha-bridge", // Subpage for AlphaBridge
                "pallets/credits", // Subpage for Credits
                "pallets/rankings", // Subpage for Rankings
                "pallets/marketplace",
                "pallets/registration",
                "pallets/ipfsPin",
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

            //  { type: 'category', label: 'API', items: ['blockchain/api'] }, // Swagger UI link
          ],
        },
        {
          type: "category",
          label: "Storage",
          collapsed: false,
          items: [
            {
              type: "category",
              label: "IPFS",
              items: ["storage/ipfs/setup", "storage/ipfs/pinning"],
            },
            {
              type: "category",
              label: "S3",
              items: [
                "storage/s3/integration",
                {
                  type: "link",
                  label: "Pricing",
                  href: "https://hippius.com/pricing",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
