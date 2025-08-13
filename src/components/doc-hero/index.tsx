import React from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import GraphSheetContainer from "../graphsheet";

/** Map first URL segment → section label for the kicker */
function inferSectionLabel(permalink: string): string {
  const seg = (permalink || "/").split("/").filter(Boolean)[0] || "";
  return seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase() || "Docs";
}

export default function DocHero() {
  const { metadata } = useDoc();
  const title = metadata.title;
  const section = inferSectionLabel(metadata.permalink);
  const kicker = +metadata.description
    ? `${section} • ${metadata.description} ${
        +metadata.description > 1 ? "mins" : "min"
      } read`
    : `${section} • 2 mins read`;

  return (
    <div
      className={
        "font-sans w-full h-[130px] lg:h-[170px] bg-primary-50 relative  rounded lg:mb-6"
      }
    >
      <div className="absolute w-full top-0 h-full opacity-5">
        <GraphSheetContainer
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
      <div className={"flex flex-col justify-between h-full text-grey-100 p-4"}>
        <div className={"text-sm lg:text-base lg:leading-[22px]  font-medium"}>
          {kicker}
        </div>
        <h1
          className={"text-2xl lg:text-[40px] lg:leading-[48px]  font-medium"}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
