import React, { type ReactNode } from "react";
import clsx from "clsx";
import LinkItem from "@theme/Footer/LinkItem";
import ThemeToggle from "@site/src/components/theme-toggle";
import type { Props } from "@theme/Footer/Links/MultiColumn";

type ColumnType = Props["columns"][number];
type ColumnItemType = ColumnType["items"][number];

function ColumnLinkItem({ item }: { item: ColumnItemType }) {
  return item.html ? (
    <li
      className={clsx("footer__item", item.className)}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}

function Column({
  column,
  slot,
}: {
  column: ColumnType;
  slot?: ReactNode;
}) {
  return (
    <div className={clsx("col footer__col", column.className)}>
      <div className="footer__title sm:text-lg">{column.title}</div>
      <ul className="footer__items clean-list">
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
      {slot}
    </div>
  );
}

export default function FooterLinksMultiColumn({ columns }: Props): ReactNode {
  return (
    <div className="row footer__links">
      {columns.map((column, i) => (
        <Column
          key={i}
          column={column}
          // Drop the theme toggle under the first column, below the version.
          slot={i === 0 ? <ThemeToggle className="mt-4" /> : undefined}
        />
      ))}
    </div>
  );
}
