"use client";

import useGraphsheet from "@site/src/hooks/use-graphsheet";
import { GraphsheetSharedProps } from "./types";
import cn from "@site/src/utils/cn";

const Graph: React.FC<
  ReturnType<typeof useGraphsheet> & GraphsheetSharedProps
> = ({ canvasRef, loaded, className }) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <canvas
        ref={canvasRef}
        className={cn(
          "w-full h-full opacity-0 duration-1000",
          loaded && "opacity-1"
        )}
      ></canvas>
    </div>
  );
};

export default Graph;
