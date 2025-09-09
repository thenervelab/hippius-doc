import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
const { version } = require("./package.json");

// Node.js environment - no browser APIs/JSX

const config: Config = {
  title: "Hippius Docs",
  tagline: "Transparent, Decentralized, Anonymous Cloud Storage",
  favicon: "img/favicon.ico",

  url: "https://docs.hippius.io",
  baseUrl: "/",

  organizationName: "thenervelab",
  projectName: "hippius-doc",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    require.resolve("./plugins/inline-critical-css.cjs"),
  ],

  // Add custom scripts
  scripts: [
    {
      src: "/js/diagramZoom.js",
      async: true,
      defer: true,
    },
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/", // Docs at root (e.g., /learn/intro)
          editUrl: "https://github.com/thenervelab/hippius-doc/edit/main/",
        },
        blog: false, // Blog disabled
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    "@docusaurus/theme-mermaid", // For diagrams
    "docusaurus-theme-github-codeblock", // GitHub-style code blocks
  ],

  themeConfig: {
    image: "img/hippius-social-card.jpg", // Update with Hippius social card
    colorMode: {
      defaultMode: "light",
      disableSwitch: true, // Force dark mode
    },
    navbar: {
      title: "Hippius",
      logo: {
        alt: "Hippius Logo",
        src: "img/logo.svg",
      },
      items: [
        // {
        //   to: "/", // Points to index.tsx
        //   label: "Home",
        //   position: "left",
        // },
        {
          to: "/learn/intro",
          label: "Learn",
          position: "left",
        },
        {
          to: "/use/ipfs-website",
          label: "Use",
          position: "left",
        },
        {
          to: "/earn/staking",
          label: "Earn",
          position: "left",
        },
        {
          type: "html",
          position: "right",
          value: '<div style="width: 20px;"></div>', // Spacer for visual separation
        },
        {
          to: "/blockchain/intro",
          label: "Develop",
          position: "right",
        },
        {
          href: "http://api.hippius.io/swagger-ui",
          label: "API",
          position: "right",
        },
        {
          href: "https://github.com/thenervelab/hippius-doc",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Learn",
          items: [
            {
              label: "What is Hippius?",
              to: "/learn/intro",
            },
            {
              label: "Substrate & Staking",
              to: "/learn/substrate-staking",
            },
            {
              html: `<span class="font-digital text-xs" style="color: #89A8EC;" >Ver ${version}</span>`,
            },
          ],
        },
        {
          title: "Use",
          items: [
            {
              label: "Host a Website on IPFS",
              to: "/use/ipfs-website",
            },
            {
              label: "Publish a React App",
              to: "/use/react-ipfs",
            },
            {
              label: "Account Management",
              to: "/use/account-management",
            },
            {
              label: "Hipstats",
              href: "https://hipstats.com",
            },
          ],
        },
        {
          title: "Earn",
          items: [
            {
              label: "Staking",
              to: "/earn/staking",
            },
            {
              label: "Storage Miners",
              to: "/earn/storage-miner",
            },
          ],
        },
        {
          title: "Develop",
          items: [
            {
              label: "Hippius Chain",
              to: "/blockchain/intro",
            },
            {
              label: "API",
              to: "/blockchain/api",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.hippius.com",
            },
            {
              label: "X",
              href: "https://x.com/hippius_subnet",
            },
            {
              label: "GitHub",
              href: "https://github.com/thenervelab/hippius-doc",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hippius.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
