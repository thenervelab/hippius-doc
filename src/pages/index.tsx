import type { ReactNode } from "react";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { H1, P, H4 } from "@site/src/components/typography";

import Graphsheet from "../components/graphsheet";
import Button from "../components/button";
import { URLS } from "../utils/urls";
import * as Icons from "@site/src/components/icons";
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
    description: "Understand Hippius and web3 basics.",
    icon: <Icons.Book className="text-primary-50 relative" />,
    cta: {
      label: "Go to Learn",
      href: "/learn/intro",
    },
  },
  {
    title: "Use",
    description: "Create and host a website or app on IPFS.",
    icon: <Icons.Cursor className="text-primary-50 relative size-5" />,
    cta: {
      label: "Go to Use",
      href: "/use/ipfs-website",
    },
  },
  {
    title: "Earn",
    description: "Stake tokens or run miners to contribute and earn rewards.",
    icon: <Icons.DollarSquare className="text-primary-50 relative" />,
    cta: {
      label: "Go to Earn",
      href: "/earn/staking",
    },
  },
  {
    title: "Develop",
    description: "Build on Hippius with our developer guides and API.",
    icon: <Icons.Code className="text-primary-50 relative" />,
    cta: {
      label: "Go to Develop",
      href: "/blockchain/intro",
    },
  },
];

export const SMARTER_CLOUD: SmallCardInfo[] = [
  {
    title: "Decentralized Storage",
    description:
      "Store files securely on IPFS with Hippius pinning, or use our S3-compatible storage for enterprise-grade compatibility.",
    icon: <Icons.FormatSquare className="text-primary-50 relative" />,
  },
  {
    title: "Blockchain-Powered",
    description:
      "Our Substrate blockchain ensures transparency and trust, with staking and rewards for network participants",
    icon: <Icons.Box className="text-primary-50 relative" />,
  },
  {
    title: "Anonymous & Secure",
    description:
      "Protect your data with anonymous storage solutions, backed by cryptographic guarantees.",
    icon: <Icons.DollarSquare className="text-primary-50 relative" />,
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="relative text-white justify-center bg-primary-50 flex flex-col px-6 pt-20 pb-40 items-center w-full">
      <div className="absolute w-full top-0 h-full opacity-5">
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
      <div className="absolute flex items-center justify-center bottom-10 left-10 size-20">
        <Icons.CircularBittensor
          className="animate-spin"
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
            className="px-4 py-2 bg-white rounded text-grey-40 font-digital"
            to="/learn/intro"
          >
            ⏱️ 5 Minute Read
          </Link>
        </div>
        <H1 className="text-center mt-4 max-w-[1050px]">
          Learn how Hippius works with our documentation
        </H1>

        <div className="flex gap-y-5 delay-700 duration-500 flex-wrap relative items-center justify-center mt-8">
          <Button
            asLink
            href={URLS.LEARN}
            size="lg"
            variant="secondary"
            icon={<Icons.ArrowRight />}
          >
            Get Started
          </Button>
          <Button asLink href={URLS.DASHBOARD} variant="ghost" size="lg">
            Try Free Storage
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
          className="absolute w-full h-full duration-500 opacity-15"
        />
        <div className="bg-white-cloud-gradient absolute w-full h-full" />
        <div className="flex flex-col text-grey-40 items-center relative justify-center w-full h-full pt-14 pb-10">
          <P size="sm" className="text-center font-digital">
            categories
          </P>
          <H4 className="mt-4 text-grey-10 max-w-screen-sm text-center">
            Learn various aspects of the Hippius infrastructure
          </H4>
          <div className="flex gap-8 mt-8 items-center flex-wrap justify-center max-w-screen-xl w-full mx-auto">
            {CATEGORIES.map((offering, i) => (
              <div
                className="flex flex-col items-center font-medium max-w-[250px]"
                key={i}
              >
                <AbstractIconWrapper className="size-10 duration-500 delay-300">
                  {offering.icon}
                </AbstractIconWrapper>
                <P className="mt-4" size="lg">
                  {offering.title}
                </P>
                <P
                  className="mt-2 text-grey-50 text-center duration-500 delay-700"
                  size="sm"
                >
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
          className="absolute w-full h-full duration-500 opacity-15"
        />
        <div className="bg-white-cloud-gradient absolute w-full h-full" />
        <div className="flex flex-col text-grey-40 items-center relative justify-center w-full h-full pt-14 pb-10">
          <P size="sm" className="text-center font-digital">
            Hippius: A Smarter Cloud
          </P>
          <H4 className="mt-4 text-grey-10 max-w-screen-sm text-center">
            Hippius is the solution to storage on Bittensor
          </H4>
          <div className="flex gap-8 mt-10 flex-wrap justify-center max-w-screen-xl w-full mx-auto">
            {SMARTER_CLOUD.map((offering, i) => (
              <div
                className="flex flex-col items-center font-medium max-w-72"
                key={i}
              >
                <AbstractIconWrapper className="size-10 duration-500 delay-300">
                  {offering.icon}
                </AbstractIconWrapper>
                <P className="mt-4" size="lg">
                  {offering.title}
                </P>
                <P
                  className="mt-2 text-grey-50 text-center duration-500 delay-700"
                  size="sm"
                >
                  {offering.description}
                </P>
              </div>
            ))}
          </div>
          <Button
            className="mt-8 duration-500 delay-500"
            icon={<Icons.ArrowRight />}
            asLink
            href={URLS.DASHBOARD}
          >
            Use Hippius
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Welcome to Hippius"
      description="Hippius is a transparent, decentralized, anonymous cloud storage platform built on a custom Substrate blockchain, leveraging IPFS and S3-compatible storage."
    >
      <main>
        <HomepageHeader />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
