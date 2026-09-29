import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { readFileSync } from "fs";
import path from "path";
const { version } = require("./package.json");

// Fonts ship inside each page's <head> as data URIs rather than as files the
// browser fetches. A fetched font, even preloaded, lets the first frame paint
// in the fallback and then swaps in, shifting the text. Inlined, the font is
// there before first paint. The files are subset to Latin to keep the HTML
// small; any glyph outside the subset falls back to the system font.
const inlineFont = (family: string, file: string, weight: string) => {
  const data = readFileSync(path.join(__dirname, "static/fonts", file));
  return `@font-face{font-family:"${family}";src:url(data:font/woff2;base64,${data.toString("base64")}) format("woff2");font-weight:${weight};font-style:normal;font-display:block}`;
};

// Node.js environment - no browser APIs/JSX

const config: Config = {
  title: "Hippius Docs - Learn, use, earn and develop with Hippius",
  tagline: "Encrypted storage, S3 and an AI model Hub",
  favicon: "img/favicon.ico",

  url: "https://docs.hippius.io",
  baseUrl: "/",

  organizationName: "thenervelab",
  projectName: "hippius-doc",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onBrokenAnchors: "warn",

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
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "alternate",
        type: "text/plain",
        href: "/llms.txt",
        title: "LLM-friendly summary",
      },
    },
    {
      tagName: "style",
      attributes: {},
      innerHTML:
        inlineFont("Geist", "Geist-Latin.woff2", "100 900") +
        inlineFont("DigitalFonts", "DigitalNumbers-Regular.woff2", "400"),
    },
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
      // Follow the visitor's OS light/dark setting by default, and let them
      // override it with the navbar toggle.
      respectPrefersColorScheme: true,
      disableSwitch: false,
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
          to: "/use/quickstart",
          label: "Use",
          position: "left",
          activeBasePath: "/use",
        },
        {
          to: "/earn/storage-miner",
          label: "Earn",
          position: "left",
          activeBasePath: "/earn",
        },
        {
          to: "/use/api",
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
          href: "https://status.hippius.com/",
          label: "Status",
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
              label: "Quickstart",
              to: "/use/quickstart",
            },
            {
              label: "S3 Advanced Usage",
              to: "/storage/s3/advanced",
            },
            {
              label: "Hipstats",
              href: "https://hipstats.com",
            },
            {
              label: "Hippius Community",
              href: "https://community.hippius.com/",
            },
            {
              label: "llms.txt",
              href: "https://docs.hippius.com/llms.txt",
            },
          ],
        },
        {
          title: "Earn",
          items: [
            {
              label: "Storage Miners",
              to: "/earn/storage-miner",
            },
            {
              label: "Alphanomics",
              href: "https://hippius.com/alphanomics",
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
              href: "https://x.com/Hippius_cloud",
            },
            {
              label: "GitHub",
              href: "https://github.com/thenervelab/hippius-doc",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/hippius",
            },
          ],
        },
      ],
      copyright: `<span class="footer__legal-row">
        <span class="footer__copyright-text">&copy; Hippius ${new Date().getFullYear()}</span>
        <span class="footer__legal-dot" aria-hidden="true">&bull;</span>
        <a class="footer__legal-link" href="https://hippius.com/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
        <span class="footer__legal-dot" aria-hidden="true">&bull;</span>
        <a class="footer__legal-link" href="https://hippius.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <span class="footer__legal-dot" aria-hidden="true">&bull;</span>
        <a class="footer__legal-link" href="https://hippius.com/acceptable-use-policy" target="_blank" rel="noopener noreferrer">Acceptable Use Policy</a>
      </span>`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
