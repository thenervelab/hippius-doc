import * as Accordion from "@radix-ui/react-accordion";
import React from "react";
import { Icons } from "./ui";
import cn from "../utils/cn";
import Graphsheet from "@site/src/components/graphsheet";

type RootProps = {
  /** For multiple: pass an array (e.g. ["file-settings"]). For single: pass a string. */
  defaultValue?: string | string[];
  /** Set false if you really want single-open behavior again. */
  multiple?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Find the accordion item a page anchor belongs to. */
function itemValueForAnchor(target: HTMLElement): string | null {
  // A heading inside an item's panel.
  const inside = target.closest<HTMLElement>("[data-doc-accordion-value]");
  if (inside) return inside.dataset.docAccordionValue ?? null;
  // A section heading written just above its item, as on the settings page.
  let next = target.nextElementSibling as HTMLElement | null;
  while (next) {
    if (next.dataset.docAccordionValue) return next.dataset.docAccordionValue;
    if (/^H[1-6]$/.test(next.tagName)) return null;
    next = next.nextElementSibling as HTMLElement | null;
  }
  return null;
}

/**
 * Root wrapper. Multiple-open by default.
 *
 * Opening the page at a section's anchor (#screenshots--recording) opens
 * that section and scrolls to it, so links from other pages land on the
 * section instead of the top of the page.
 */
export function DocAccordion({
  defaultValue,
  multiple = true,
  className,
  children,
}: RootProps) {
  // Map defaultValue to what Radix expects.
  const mappedDefault: string[] = Array.isArray(defaultValue)
    ? defaultValue
    : defaultValue
      ? [defaultValue]
      : [];
  const [open, setOpen] = React.useState<string[]>(mappedDefault);

  React.useEffect(() => {
    const timers: number[] = [];
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      const value = itemValueForAnchor(target);
      if (!value) return;
      setOpen((current) =>
        current.includes(value) ? current : multiple ? [...current, value] : [value]
      );
      // A section heading is hidden in accordion mode, so scroll to the
      // item's own header. Scroll again once the panel has opened and the
      // pictures above have taken their space.
      const scroll = () => {
        const item = document.querySelector<HTMLElement>(
          `[data-doc-accordion-value="${value}"]`
        );
        const into = target.closest("[data-doc-accordion-value]") ? target : item;
        into?.scrollIntoView({ block: "start" });
      };
      [50, 400, 1200].forEach((ms) => timers.push(window.setTimeout(scroll, ms)));
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [multiple]);

  const rootProps = multiple
    ? {
        type: "multiple" as const,
        value: open,
        onValueChange: (next: string[]) => setOpen(next),
      }
    : {
        type: "single" as const,
        value: open[0] ?? "",
        onValueChange: (next: string) => setOpen(next ? [next] : []),
        collapsible: true,
      };

  return (
    <Accordion.Root
      {...rootProps}
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
 * First child = header content (MDX/JSX, use <h2>…</h2> as requested).
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
  console.log("Rendering DocAccordionItem:", value);
  return (
    <Accordion.Item
      value={value}
      data-doc-accordion-value={value}
      className={cn("doc-accordion-item", className)}
    >
      <Accordion.Header
        className={cn("!mb-0", {
          "border-t border-grey-80": !isFirst,
        })}
      >
        <Accordion.Trigger
          className={cn(
            "group w-full flex items-center justify-between text-left rounded transition-all",
            isFirst ? "pb-4" : "py-4 ",
            "outline-none"
            // "hover:bg-primary-100 hover:px-3 hover:pt-3 hover:pb-3 duration-200 hover:text-[#1F51BE]"
          )}
        >
          <div
            className={cn(
              "flex flex-wrap rounded transition-colors duration-200 ease-[cubic-bezier(0.08,0.52,0.52,1)] relative text-base w-full justify-between py-2 px-3 items-center hover:bg-[#0000000d]"
            )}
          >
            <>
              <Graphsheet
                majorCell={{
                  lineColor: [31, 80, 189, 1.0],
                  lineWidth: 2,
                  cellDim: 40,
                }}
                minorCell={{
                  lineColor: [49, 103, 211, 1.0],
                  lineWidth: 1,
                  cellDim: 5,
                }}
                className="absolute w-full h-full top-0 bottom-0 left-0 opacity-10 group-data-[state=open]:block hidden"
              />

              <div className="absolute w-full h-full top-0 bottom-0 left-0 group-data-[state=open]:block hidden">
                <div className="size-1.5 border-2 border-primary-50 border-r-0 border-b-0 absolute left-0 top-0" />
                <div className="size-1.5 border-2 border-primary-50 border-r-0 border-t-0 absolute left-0 bottom-0" />
                <div className="size-1.5 border-2 border-primary-50 border-l-0 border-t-0 absolute right-0 bottom-0" />
                <div className="size-1.5 border-2 border-primary-50 border-l-0 border-b-0 absolute right-0 top-0" />
              </div>
            </>

            <h2 className="!mb-0 font-medium group-hover:bg-none group-hover:text-[#3578e5] z-10">
              {header}
            </h2>

            {/* Your icon */}
            <div className="ml-3 h-5 w-5 rounded border-[1.5px] border-grey-10 flex items-center justify-center">
              <Icons.ArrowDown
                className="shrink-0 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180 text-grey-10"
                aria-hidden
              />
            </div>
          </div>
        </Accordion.Trigger>
      </Accordion.Header>

      {/* Always rendered, and hidden by CSS while closed, so the headings
          inside have their anchors in the page (and in its table of
          contents) before anyone opens the section. */}
      <Accordion.Content
        forceMount
        className="overflow-hidden will-change-[height,opacity,transform] AccordionContent"
      >
        <div className="markdown mb-6">{content}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

export const DocAccordionNamespace = {
  Root: DocAccordion,
  Item: DocAccordionItem,
};

export default DocAccordion;
