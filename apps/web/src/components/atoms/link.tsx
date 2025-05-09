import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "@tanstack/react-router";

import { cn } from "@repo/utils";

interface LinkProps extends RouterLinkProps {
  reversed?: boolean;
  className?: string;
}

const Link = ({ className, reversed = false, ...props }: LinkProps) => {
  return (
    <RouterLink
      {...props}
      className={cn(
        "hover:underline cursor-pointer underline-offset-1",
        reversed ? "underline hover:no-underline" : "",
        className,
      )}
    />
  );
};

export { Link };
