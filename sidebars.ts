import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Node.js environment - no browser APIs/JSX

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Learn',
      items: [
        'learn/intro', // What is Hippius?
        'learn/architecture', // System Architecture
        'learn/weights', // Weight Calculation System
        'learn/miner', //miner diagram - link to GH
  
        {
          type: 'category',
          label: 'Core Technologies',
          items: [
            "learn/substrate", //substrate
            'learn/mnemonic-auth', // Mnemonic Authentication
            'learn/encryption', // Encryption System
            'learn/storage-systems', // Decentralized Storage Systems
          ],
          collapsed: false, // Collapsed by default (not yet released)
        },
        //pulled into distinct pages 
        //'learn/substrate-staking', // Substrate, BABE, staking concepts
        


      ],
    },
    {
      type: 'category',
      label: 'Use',
      items: [
        'use/testing-phase', // Testing phase participation
        'use/ipfs-website', // Hosting a website on IPFS
        'use/react-ipfs', // Publishing a React app to IPFS
        'use/bridge', // Using the Hippius bridge
   
      ],
    },
    {
      type: 'category',
      label: 'Earn',
      items: [
        'earn/installing-validator', // Installing a validator node
        'earn/register-validator-in-chain', // Register a validator in the chain
        'earn/storage-miner', // Setting up storage miners
        'earn/register-in-blockchain', // Registering nodes in the blockchain
        'earn/staking', // Staking on Hippius
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
        'cli/usage',
        'blockchain/api',
        {
          type: 'category',
          label: 'Blockchain',
          items: [
            'blockchain/intro', // Hippius blockchain intro
            {
              type: 'category',
              label: 'Hippius Pallets',
              link: { type: 'doc', id: 'blockchain/pallets' }, // Link to the main page
              collapsed: true,
              items: [
           
                    'pallets/alpha-bridge', // Subpage for AlphaBridge
                    'pallets/credits',       // Subpage for Credits
                    'pallets/rankings',      // Subpage for Rankings
                    'pallets/marketplace',
                    'pallets/registration',
                    'pallets/ipfsPin',
                    'pallets/executionUnit',
                    'pallets/backup',
                    'pallets/containerRegistry',
                    'pallets/storageS3',
                    'pallets/computePallet',
                    'pallets/palletIp',
                    'pallets/bittensor',
                    'pallets/metagraph',
                    'pallets/subAccount',
                    'pallets/notifications',
                    'pallets/accountProfile',
                    'pallets/utils',
                
              ],
            },
            
          //  { type: 'category', label: 'API', items: ['blockchain/api'] }, // Swagger UI link
          ],
        },
        {
          type: 'category',
          label: 'Storage',
          collapsed: false,
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