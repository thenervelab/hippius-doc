import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
const { version } = require("./package.json");

// Node.js environment - no browser APIs/JSX

const config: Config = {
  title: "Hippius Docs - Learn, use, earn and develop with Hippius",
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
    image: "img/meta-image.png",
    metadata: [
      {
        name: "description",
        content:
          "Learn how Hippius works, how to use our products, how to earn when staking on Hippius network and how to develop app with Hippius.",
      },
      {
        property: "og:description",
        content:
          "Learn how Hippius works, how to use our products, how to earn when staking on Hippius network and how to develop app with Hippius.",
      },
      {
        property: "og:image",
        content: "https://docs.hippius.com/img/meta-image.png",
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:type",
        content: "image/png",
      },
      {
        name: "twitter:description",
        content:
          "Learn how Hippius works, how to use our products, how to earn when staking on Hippius network and how to develop app with Hippius.",
      },
      {
        name: "twitter:image",
        content: "https://docs.hippius.com/img/meta-image.png",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
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
          activeBasePath: "/learn",
        },
        {
          to: "/use/bridge",
          label: "Use",
          position: "left",
          activeBasePath: "/use",
        },
        {
          to: "/earn/staking",
          label: "Earn",
          position: "left",
          activeBasePath: "/earn",
        },
        {
          to: "/cli/usage",
          label: "Develop",
          position: "left",
          activeBaseRegex: "^/(blockchain|cli|pallets|storage)(/|$)",
        },
        {
          type: "html",
          position: "right",
          value: '<div style="width: 20px;"></div>', // Spacer for visual separation
        },
        {
          href: "https://api.hippius.com/",
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
              label: "Hipstats",
              href: "https://hipstats.com",
            },
            {
              label: "Hippius Community",
              href: "https://community.hippius.com/",
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
            {
              label: "Alphanomics",
              href: "https://community.hippius.com/",
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
      copyright: `<span class="flex items-center gap-x-2">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="size-5">
          <path d="M10 18.3332C5.40001 18.3332 1.66667 14.5998 1.66667 9.99984C1.66667 5.39984 5.40001 1.6665 10 1.6665C14.6 1.6665 18.3333 5.39984 18.3333 9.99984C18.3333 14.5998 14.6 18.3332 10 18.3332Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.4 12.4998C11.8083 13.0165 11.0417 13.3332 10.2 13.3332C8.35832 13.3332 6.86665 11.8415 6.86665 9.99984C6.86665 8.15817 8.35832 6.6665 10.2 6.6665C11.0417 6.6665 11.8083 6.98317 12.4 7.49984" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Hippius ${new Date().getFullYear()}
      </span>`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
