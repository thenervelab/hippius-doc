import cn from "@site/src/utils/cn";
import { IconGrid } from "../icons";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AbstractIconWrapper: React.FC<Props> = ({ className, children }) => (
  <div
    className={cn(
      "flex items-center relative px-1.5 justify-center",
      className
    )}
  >
    <IconGrid className="absolute w-full h-full" />
    {children}
  </div>
);

export default AbstractIconWrapper;
