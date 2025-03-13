import cn from "@site/src/utils/cn";
import { Ref } from "react";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  ref?: Ref<HTMLHeadingElement>;
};

const H1: React.FC<Props> = ({ className, ref, ...rest }) => (
  <h1
    ref={ref}
    className={cn(
      "text-4xl md:text-6xl lg:text-7xl 2xl:text-[82px] font-medium",
      className
    )}
    {...rest}
  />
);

export default H1;
