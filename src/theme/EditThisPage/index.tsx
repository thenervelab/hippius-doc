import React, { type ReactNode } from "react";
import Translate from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
import IconEdit from "@theme/Icon/Edit";
import type { Props } from "@theme/EditThisPage";
import cn from "@site/src/utils/cn";

export default function EditThisPage({ editUrl }: Props): ReactNode {
  return (
    <Link
      to={editUrl}
      className={cn(
        ThemeClassNames.common.editThisPage,
        "inline-flex items-center"
      )}
    >
      <IconEdit />
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the current page"
      >
        Edit this page
      </Translate>
    </Link>
  );
}
