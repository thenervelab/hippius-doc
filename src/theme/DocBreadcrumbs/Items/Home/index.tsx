import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import IconHome from "@theme/Icon/Home";

import styles from "./styles.module.css";
import { Home2 } from "@site/src/components/icons";

export default function HomeBreadcrumbItem(): ReactNode {
  const homeHref = useBaseUrl("/");

  return (
    <li className="breadcrumbs__item inline-flex items-center">
      <Link
        aria-label={translate({
          id: "theme.docs.breadcrumbs.home",
          message: "Home page",
          description: "The ARIA label for the home page in the breadcrumbs",
        })}
        className="breadcrumbs__link inline-flex items-center p-0"
        href={homeHref}
      >
        {/* <IconHome className={styles.breadcrumbHomeIcon} /> */}
        <Home2 className="size-4 mb-px" />
      </Link>
    </li>
  );
}
