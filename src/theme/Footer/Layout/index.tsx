import React, { type ReactNode } from "react";
import Graphsheet from "@site/src/components/graphsheet";
import type { Props } from "@theme/Footer/Layout";

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): ReactNode {
  return (
    <footer className="relative bg-primary-50 py-8 sm:py-14 px-6 flex text-white justify-center">
      <Graphsheet
        majorCell={{
          lineColor: [255, 255, 255, 1.0],
          lineWidth: 3,
          cellDim: 70,
        }}
        minorCell={{
          lineColor: [255, 255, 255, 0.0],
          lineWidth: 0.0,
          cellDim: 5,
        }}
        className="absolute w-full h-full top-0 opacity-5"
      />
      <div className="relative w-full max-w-screen-xl">
        {links}
        {(logo || copyright) && (
          <div className="flex font-medium">
            {logo && <div>{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
