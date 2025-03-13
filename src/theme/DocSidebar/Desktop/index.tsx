import React from "react";
import clsx from "clsx";
import { useThemeConfig } from "@docusaurus/theme-common";
import Logo from "@theme/Logo";
import CollapseButton from "@theme/DocSidebar/Desktop/CollapseButton";
import Content from "@theme/DocSidebar/Desktop/Content";
import type { Props } from "@theme/DocSidebar/Desktop";

import styles from "./styles.module.css";

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
        "pl-4 pb-4 border-none"
      )}
    >
      <div className="border mt-4 pt-2 px-2 flex grow border-grey-80 rounded">
        {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
        <Content className="p-0" path={path} sidebar={sidebar} />
        {hideable && <CollapseButton onClick={onCollapse} />}
      </div>
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
