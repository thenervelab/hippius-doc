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
    <footer className="relative bg-primary-50 dark:bg-[#111111] py-8 sm:py-14 px-6 flex text-white justify-center">
      {/* Light-mode grid: white lines on the blue footer */}
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
        className="absolute w-full h-full top-0 opacity-5 dark:hidden"
      />
      {/* Dark-mode grid: subtle grey lines on the dark footer */}
      <Graphsheet
        majorCell={{
          lineColor: [150, 150, 150, 0.08],
          lineWidth: 1,
          cellDim: 70,
        }}
        minorCell={{
          lineColor: [120, 120, 120, 0.05],
          lineWidth: 0.5,
          cellDim: 5,
        }}
        className="absolute w-full h-full top-0 opacity-10 hidden dark:block"
      />
      <div className="relative w-full max-w-screen-xl">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom flex font-medium">
            {logo && <div>{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
