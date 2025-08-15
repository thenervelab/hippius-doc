import React, { type ReactNode } from "react";
import Layout from "@theme-original/DocItem/Layout";
import type LayoutType from "@theme/DocItem/Layout";
import type { WrapperProps } from "@docusaurus/types";
import DocHero from "@site/src/components/doc-hero";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  return (
    <>
      {/* Breadcrumbs above the banner */}

      <DocBreadcrumbs />
      <DocHero />
      <Layout {...props} />
    </>
  );
}
