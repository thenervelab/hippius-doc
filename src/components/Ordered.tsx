import React from "react";

export default function Ordered({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal pl-6 mb-6">{children}</ol>;
}
