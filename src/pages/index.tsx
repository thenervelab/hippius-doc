import type { ReactNode } from "react";

import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { H1, P } from "@site/src/components/typography";

import Graphsheet from "../components/graphsheet";
import Button from "../components/button";
import { URLS } from "../utils/urls";
import * as Icons from "@site/src/components/ui/icons";
import AbstractIconWrapper from "../components/abstract-icon-wrapper";

import { SmallCardInfo } from "../types/small-card-info";

export const CATEGORIES: (SmallCardInfo & {
  cta: {
    label: string;
    href: string;
  };
})[] = [
  {
    title: "Learn",
    description: "What Hippius is, how your data is stored, and how the chain works.",
    icon: <Icons.Book className="text-primary-50 relative size-6" />,
    cta: {
      label: "Learn",
      href: "/learn/intro",
    },
  },
  {
    title: "Use",
    description: "Drive, S3 Storage and Hub, from the console, desktop and mobile apps.",
    icon: <Icons.Cursor className="text-primary-50 relative size-6" />,
    cta: {
      label: "Use",
      href: "/use/drive",
    },
  },
  {
    title: "Earn",
    description: "Run a storage miner or a validator, or stake on the network.",
    icon: <Icons.DollarSquare className="text-primary-50 relative size-6" />,
    cta: {
      label: "Earn",
      href: "/earn/storage-miner",
    },
  },
  {
    title: "Develop",
    description: "Management API, HCFS API, SDKs, and docs written for agents.",
    icon: <Icons.Code className="text-primary-50 relative size-6" />,
    cta: {
      label: "Develop",
      href: "/use/api",
    },
  },
];

export const SMARTER_CLOUD: SmallCardInfo[] = [
  {
    title: "Distributed",
    description:
      "Every file is split into 30 pieces spread across 30 independent machines. Any 10 rebuild it, so 20 can fail at once and nothing is lost.",
    icon: <Icons.FormatSquare className="text-primary-50 relative size-7" />,
  },
  {
    title: "Verifiable",
    description:
      "Where your pieces live and who gets paid for holding them is recorded on the Hippius chain, powered by Bittensor. Watch it live on Hipstats.",
    icon: <Icons.Box className="text-primary-50 relative size-7" />,
  },
  {
    title: "Encrypted",
    description:
      "Drive encrypts on your device; nobody else holds the key. S3 encrypts at rest, every chunk under its own key. Hub private repositories are access-controlled.",
    icon: <Icons.SheildTick className="text-primary-50 relative size-7" />,
  },
];

export const PRODUCTS: (SmallCardInfo & {
  cta: { label: string; href: string };
  badge?: string;
})[] = [
  {
    title: "Drive",
    description:
      "Your files, encrypted on your device before they leave it. Sync, phone backup, share by link, shared drives for teams.",
    icon: <Icons.Driver className="text-primary-50 relative size-7" />,
    cta: { label: "Store your first file", href: "/use/drive" },
  },
  {
    title: "S3 Storage",
    description:
      "Any S3 client, endpoint s3.hippius.com, no egress fees. Migrate from any S3 provider in one click.",
    icon: <Icons.Strongbox className="text-primary-50 relative size-7" />,
    cta: { label: "Create your first bucket", href: "/use/quickstart" },
  },
  {
    title: "Hub",
    description:
      "Push and pull AI models and container images. A drop-in for the Hugging Face Hub, docker and oras.",
    icon: <Icons.Global className="text-primary-50 relative size-7" />,
    cta: { label: "Publish your first model", href: "/registry" },
  },
  {
    title: "Confidential Computing",
    description:
      "Virtual machines and managed databases in hardware-encrypted memory. The host can't read them, and you can verify it.",
    icon: <Icons.SheildTick className="text-primary-50 relative size-7" />,
    cta: { label: "How it works", href: "/learn/confidential-computing" },
    badge: "Coming soon",
  },
];

export const ALSO_USEFUL: { label: string; href: string }[] = [
  { label: "Hipstats, the network explorer", href: "https://hipstats.com" },
  { label: "Status", href: "https://status.hippius.com" },
  { label: "Help & Support", href: "/use/help-support" },
  { label: "Referrals", href: "/use/console/referrals" },
  { label: "Alphanomics", href: "https://hippius.com/alphanomics" },
  { label: "llms.txt for agents", href: "https://docs.hippius.com/llms.txt" },
];

function HomepageHeader() {
  return (
    <header className="relative text-white justify-center min-h-[800px] lg:min-h-[auto] bg-primary-50 dark:bg-[#111111] flex flex-col px-6 pt-20 pb-40 items-center w-full">
      {/* Light-mode grid: white lines on the blue hero */}
      <div className="absolute w-full top-0 h-full opacity-5 dark:hidden">
        <Graphsheet
          majorCell={{
            lineColor: [255, 255, 255, 0.1],
            lineWidth: 2,
            cellDim: 200,
          }}
          minorCell={{
            lineColor: [255, 255, 255, 0.1],
            lineWidth: 1,
            cellDim: 20,
          }}
        />
      </div>
      {/* Dark-mode grid: identical to the light grid above (same line widths,
          cells, opacity) — only the colour changes (white → the footer's grey). */}
      <div className="absolute w-full top-0 h-full opacity-5 hidden dark:block">
        <Graphsheet
          majorCell={{
            lineColor: [150, 150, 150, 0.08],
            lineWidth: 2,
            cellDim: 200,
          }}
          minorCell={{
            lineColor: [120, 120, 120, 0.05],
            lineWidth: 1,
            cellDim: 20,
          }}
        />
      </div>
      <div className="absolute flex items-center justify-center bottom-10 left-10 size-20">
        <Icons.CircularBittensor
          className="animate-spin absolute"
          style={{
            animationDuration: "10s",
          }}
        />
        <Icons.BittensorLogo className="size-5 absolute" />
      </div>
      <div className="absolute bottom-10 right-10 border-r-2 size-10 border-b-2 border-white rounded-br"></div>
      <div className="relative flex flex-col items-center">
        <div>
          <Link
            className="px-4 py-2 bg-white rounded text-[#353535] font-digital"
            to="/learn/intro"
          >
            What is Hippius? 3 min read
          </Link>
        </div>
        <H1 className="text-center mt-4 max-w-[1050px]">
          Encrypted storage, S3 and an AI model Hub
        </H1>
        <P className="text-center mt-4 max-w-[760px] text-white/90" size="lg">
          Drive for your files, S3 Storage for your apps, Hub for your AI models and containers, and Confidential Computing on the way.
        </P>

        <div className="flex gap-y-5  flex-wrap relative items-center justify-center mt-8">
          <Button
            asLink
            href={URLS.LEARN}
            size="lg"
            variant="secondary"
            icon={<Icons.ArrowRight />}
          >
            Get started
          </Button>
          <Button asLink href={URLS.DASHBOARD} variant="ghost" size="lg">
            Open Console
          </Button>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className="bg-grey-100 py-10 flex flex-col items-center w-full px-6 relative">
      <div className="relative">
        <Graphsheet
          majorCell={{
            lineColor: [31, 80, 189, 1.0],
            lineWidth: 2,
            cellDim: 200,
          }}
          minorCell={{
            lineColor: [49, 103, 211, 1.0],
            lineWidth: 1,
            cellDim: 20,
          }}
          className="absolute w-full h-full opacity-15"
        />
        <div className="bg-white-cloud-gradient absolute w-full h-full" />
        <div className="flex flex-col text-grey-40 items-center relative justify-center w-full h-full mt-0 md:pt-14 pb-10">
          <P size="sm" className="text-center font-digital">
            categories
          </P>
          <h2 className="text-3xl lg:text-4xl font-medium font-grotesk mt-4 text-grey-10 max-w-screen-sm text-center">
            Find your way around Hippius
          </h2>
          <div className="flex gap-8 mt-8 items-center flex-wrap justify-center max-w-screen-xl w-full mx-auto">
            {CATEGORIES.map((offering, i) => (
              <div
                className="flex flex-col items-center font-medium max-w-[300px] md:max-w-[250px] border rounded-lg py-4 px-12 border-grey-80 bg-grey-100 md:px-0 md:py-0 md:border-none md:bg-transparent"
                key={i}
              >
                <AbstractIconWrapper className="size-10 ">
                  {offering.icon}
                </AbstractIconWrapper>
                <P className="mt-4" size="lg">
                  {offering.title}
                </P>
                <P className="mt-2 text-grey-50 text-center " size="sm">
                  {offering.description}
                </P>
                <Link
                  className="flex gap-x-2 mt-4 items-center font-semibold text-primary-50"
                  href={offering.cta.href}
                >
                  {offering.cta.label}
                  <Icons.ArrowRight className="size-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex flex-col text-grey-40 items-center relative justify-center w-full h-full pt-14 pb-10">
          <P size="sm" className="text-center font-digital">
            Hippius: a distributed cloud
          </P>
          <h2 className="text-3xl lg:text-4xl font-medium font-grotesk mt-4 text-grey-10 max-w-screen-sm text-center">
            Four products, one account
          </h2>
          <div className="flex gap-8 mt-8 items-start flex-wrap justify-center max-w-screen-xl w-full mx-auto">
            {PRODUCTS.map((product, i) => (
              <div
                className="relative flex flex-col items-center font-medium w-[280px] min-h-[300px] border rounded-lg py-6 px-6 border-grey-80 bg-grey-100"
                key={i}
              >
                {product.badge && (
                  <span className="absolute top-2 right-2 text-xs rounded-full px-2 py-0.5 bg-primary-50 text-white">
                    {product.badge}
                  </span>
                )}
                <AbstractIconWrapper className="size-10">
                  {product.icon}
                </AbstractIconWrapper>
                <P className="mt-4" size="lg">
                  {product.title}
                </P>
                <P className="mt-2 text-grey-50 text-center flex-1" size="sm">
                  {product.description}
                </P>
                <Link
                  className="flex gap-x-2 mt-4 items-center font-semibold text-primary-50"
                  href={product.cta.href}
                >
                  {product.cta.label}
                  <Icons.ArrowRight className="size-5" />
                </Link>
              </div>
            ))}
          </div>
          <P size="sm" className="text-center font-digital mt-12">
            also useful
          </P>
          <div className="flex gap-3 mt-4 flex-wrap justify-center max-w-screen-lg w-full mx-auto">
            {ALSO_USEFUL.map((item, i) => (
              <Link
                className="rounded-full border border-grey-80 bg-grey-100 px-4 py-1.5 text-sm font-semibold text-primary-50"
                href={item.href}
                key={i}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <Graphsheet
          majorCell={{
            lineColor: [31, 80, 189, 1.0],
            lineWidth: 2,
            cellDim: 200,
          }}
          minorCell={{
            lineColor: [49, 103, 211, 1.0],
            lineWidth: 1,
            cellDim: 20,
          }}
          className="absolute w-full h-full opacity-15"
        />
        <div className="bg-white-cloud-gradient absolute w-full h-full" />
        <div className="flex flex-col text-grey-40 items-center relative justify-center w-full h-full pt-14 pb-10">
          <P size="sm" className="text-center font-digital">
            under the hood
          </P>
          <h2 className="text-3xl lg:text-4xl font-medium font-grotesk mt-4 text-grey-10 max-w-screen-sm text-center">
            How Hippius stores your data
          </h2>
          <div className="flex gap-8 mt-10 flex-wrap justify-center max-w-screen-xl w-full mx-auto">
            {SMARTER_CLOUD.map((offering, i) => (
              <div
                className="flex flex-col items-center font-medium max-w-72"
                key={i}
              >
                <AbstractIconWrapper className="size-10">
                  {offering.icon}
                </AbstractIconWrapper>
                <P className="mt-4" size="lg">
                  {offering.title}
                </P>
                <P className="mt-2 text-grey-50 text-center" size="sm">
                  {offering.description}
                </P>
              </div>
            ))}
          </div>
          <Button
            className="mt-8"
            icon={<Icons.ArrowRight />}
            asLink
            href={URLS.DASHBOARD}
          >
            Open Console
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout>
      <main>
        <HomepageHeader />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
