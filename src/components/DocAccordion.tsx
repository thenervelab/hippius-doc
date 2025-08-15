import * as Accordion from "@radix-ui/react-accordion";
import React from "react";
import { Icons } from "./ui";
import cn from "../utils/cn";

type RootProps = {
  /** For multiple: pass an array (e.g. ["file-settings"]). For single: pass a string. */
  defaultValue?: string | string[];
  /** Set false if you really want single-open behavior again. */
  multiple?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Root wrapper. Multiple-open by default.
 */
export function DocAccordion({
  defaultValue,
  multiple = true,
  className,
  children,
}: RootProps) {
  // Map defaultValue to what Radix expects.
  const mappedDefault =
    multiple && typeof defaultValue === "string"
      ? [defaultValue]
      : (defaultValue as any);

  return (
    <Accordion.Root
      type={multiple ? "multiple" : "single"}
      defaultValue={mappedDefault}
      collapsible
      className={cn("w-full doc-accordion-mode", className)}
    >
      {children}
    </Accordion.Root>
  );
}

type ItemProps = {
  /** unique value for this section */
  value: string;
  /** exactly two children: [headerNode, contentNode] */
  children: React.ReactNode;
  className?: string;
  /** Apply padding-bottom only (no top padding) */
  isFirst?: boolean;
};

/**
 * Item expects EXACTLY TWO children.
 * First child = header content (MDX/JSX — use <h2>…</h2> as requested).
 * Second child = accordion panel content.
 */
export function DocAccordionItem({
  value,
  children,
  className,
  isFirst = false,
}: ItemProps) {
  const kids = React.Children.toArray(children);
  if (kids.length !== 2 && process.env.NODE_ENV !== "production") {
    console.warn(
      `DocAccordionItem("${value}") expects exactly TWO children: [header, content]. Received ${kids.length}.`
    );
  }
  const header = kids[0] ?? null;
  const content = kids[1] ?? null;

  return (
    <Accordion.Item value={value} className={cn(className)}>
      <Accordion.Header className="!mb-0">
        <Accordion.Trigger
          className={cn(
            "group w-full flex items-center justify-between text-left",
            isFirst ? "pb-3" : "py-3",
            "outline-none"
          )}
        >
          <h2 className="!mb-0">{header}</h2>

          {/* Your icon */}
          <div className="ml-3 h-5 w-5 rounded border-[1.5px] border-grey-10 flex items-center justify-center">
            <Icons.ArrowDown
              className="shrink-0 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </div>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden will-change-[height,opacity,transform] AccordionContent">
        <div className="markdown mb-3">{content}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

export const DocAccordionNamespace = {
  Root: DocAccordion,
  Item: DocAccordionItem,
};

export default DocAccordion;
