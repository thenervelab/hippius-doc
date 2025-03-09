import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Node.js environment - no browser APIs/JSX

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Learn',
      items: [
        'learn/intro', // What is Hippius?
        'learn/substrate-staking', // Substrate, BABE, staking concepts
        'learn/mnemonic-auth', // Mnemonic Authentication
        'learn/encryption', // Encryption System
        'learn/storage-systems', // Decentralized Storage Systems
      ],
    },
    {
      type: 'category',
      label: 'Use',
      items: [
        'use/ipfs-website', // Hosting a website on IPFS
        'use/react-ipfs', // Publishing a React app to IPFS
        'use/account-management', // Managing accounts in Hippius
        'use/bridge', // Using the Hippius bridge
      ],
    },
    {
      type: 'category',
      label: 'Earn',
      items: [
        'earn/staking', // Staking on Hippius
        'earn/storage-miner', // Setting up storage miners
        'earn/blockchain-ocw', // Setting up blockchain OCW miners
        {
          type: 'category',
          label: 'Compute VMs',
          items: [
            'earn/compute-vms', // Compute VMs (post-launch)
          ],
          collapsed: true, // Collapsed by default (not yet released)
        },
      ],
    },
    {
      type: 'category',
      label: 'Develop',
      items: [
        {
          type: 'category',
          label: 'Blockchain',
          items: [
            'blockchain/intro', // Hippius blockchain intro
            'blockchain/pallets', // Hippius pallets
            { type: 'category', label: 'API', items: ['blockchain/api'] }, // Swagger UI link
          ],
        },
        {
          type: 'category',
          label: 'Storage',
          items: [
            { type: 'category', label: 'IPFS', items: ['storage/ipfs/setup', 'storage/ipfs/pinning'] },
            { type: 'category', label: 'S3', items: ['storage/s3/integration', { type: 'link', label: 'Pricing', href: 'https://hippius.io#pricing' }] },
          ],
        },
      ],
    },
  ],
};

export default sidebars;