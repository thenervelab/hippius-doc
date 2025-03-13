"use client";

import { useEffect } from "react";

import Graphsheet from "./graphsheet";

import { GraphsheetSharedProps } from "./types";
import useGraphsheet from "@site/src/hooks/use-graphsheet";
import { GraphsheetData } from "@site/src/hooks/use-graphsheet/types";

const GraphSheetContainer: React.FC<
  { onLoad?: () => void } & Partial<GraphsheetData> & GraphsheetSharedProps
> = ({ onLoad, ...rest }) => {
  const { loaded, ...useGraphRestProps } = useGraphsheet(rest);

  useEffect(() => {
    if (loaded && onLoad) {
      onLoad();
    }
  }, [loaded, onLoad]);

  return (
    <Graphsheet
      loaded={loaded}
      className={rest.className}
      {...useGraphRestProps}
    />
  );
};

export default GraphSheetContainer;
