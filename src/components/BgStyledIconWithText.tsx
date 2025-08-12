import cn from "../utils/cn";
import { Icons } from "./ui";

export default function BgStyledIconWithText({
  text,
  icon,
  iconClassName = "size-4 inline-block -translate-y-[1px] ",
  paddingClassName = "px-1.5 py-0.5",
}: {
  text: string;
  icon?: keyof typeof Icons;
  iconClassName?: string;
  paddingClassName?: string;
}) {
  const IconComponent = Icons[icon];

  return (
    <div
      className={cn(
        "inline-flex gap-1 bg-grey-80 text-grey-50 rounded items-center justify-center translate-y-[3px]",
        paddingClassName
      )}
    >
      {icon && <IconComponent className={iconClassName} />}
      {text && <span>{text}</span>}
    </div>
  );
}
