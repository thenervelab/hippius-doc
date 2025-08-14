import React from "react";

export default function BgStyledText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="bg-grey-80 text-grey-50 rounded px-1.5 py-0.5">
      {children}
    </span>
  );
}
