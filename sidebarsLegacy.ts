import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// Node.js environment - no browser APIs/JSX

const sidebars: SidebarsConfig = {
  legacySidebar: [
    {
      type: "category",
      label: "Archive",
      link: { type: "doc", id: "intro" },
      items: [
        {
          type: "category",
          label: "IPFS",
          items: ["storage/ipfs/setup", "storage/ipfs/pinning"],
        },
      ],
    },
  ],
};

export default sidebars;
