import React from "react";

export default function Unordered({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 mb-6">{children}</ul>;
}
