import cn from "@site/src/utils/cn";

type Props = React.HTMLAttributes<HTMLHeadingElement>;

const H5: React.FC<Props> = ({ className, ...rest }) => (
  <h5
    className={cn("text-2xl lg:text-3xl font-bold font-grotesk", className)}
    {...rest}
  />
);

export default H5;
