"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { initialise } from "./functions";
import { GraphsheetData } from "./types";
import { DEFAULT_GRAPH_DATA } from "./constants";

const useGraphsheet = (graphData?: Partial<GraphsheetData>) => {
  const data: GraphsheetData = useMemo(
    () => ({ ...DEFAULT_GRAPH_DATA, ...(graphData || {}) }),
    [graphData]
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const observer = useRef<ResizeObserver | null>(null);

  useEffect(
    () => {
      if (canvasRef.current) {
        initialise(canvasRef.current)
          .then((render) => {
            observer.current = new ResizeObserver(() => {
              render(data);
            });
            if (canvasRef.current) observer.current.observe(canvasRef.current);
            setLoaded(true);
          })
          .catch((error) => {
            setError(error);
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // data
    ]
  );

  return {
    canvasRef,
    loaded,
    error,
  };
};

export default useGraphsheet;
