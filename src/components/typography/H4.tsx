import cn from "@site/src/utils/cn";

type Props = React.HTMLAttributes<HTMLHeadingElement>;

const H4: React.FC<Props> = ({ className, ...rest }) => (
  <h4
    className={cn("text-3xl lg:text-4xl font-medium font-grotesk", className)}
    {...rest}
  />
);

export default H4;
