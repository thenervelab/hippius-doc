import React from "react";
import { Icons } from "./ui";

export default function Icon({
  icon = "HippiusLogo",
  className = "size-5 inline-block -translate-y-0.5",
}: {
  icon?: keyof typeof Icons;
  className?: string;
}) {
  const IconComponent = Icons[icon];
  return <IconComponent className={className} />;
}
