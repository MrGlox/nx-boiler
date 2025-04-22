import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { type HTMLAttributes, forwardRef } from "react";
import {
  Alert as AlertComponent,
  AlertDescription,
  AlertTitle,
} from "@repo/ui";
import { cn } from "@repo/utils";

export enum AlertVariant {
  default = "default",
  destructive = "destructive",
  success = "success",
  warning = "warning",
  info = "info",
}

const IconVariants = {
  default: <InfoCircledIcon className="size-4 !text-current" />,
  destructive: <CrossCircledIcon className="size-4 !text-current" />,
  success: <CheckCircledIcon className="size-4 !text-current" />,
  warning: <ExclamationTriangleIcon className="size-4 !text-current" />,
  info: <InfoCircledIcon className="size-4 !text-current" />,
};

const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof AlertVariant }
>(
  (
    { className, variant = "default", children, title = false, ...props },
    ref,
  ) => {
    return (
      <AlertComponent
        {...{ ...props, ref, variant }}
        className={cn("mb-4", className)}
      >
        {IconVariants[variant]}
        {typeof title === "boolean" && title ? (
          <AlertTitle>
            {/* {m[
              (variant as
                | "default"
                | "destructive"
                | "success"
                | "warning"
                | "info",
              typeof title === "string" ? title : "")
            ]()} */}
          </AlertTitle>
        ) : (
          title && <AlertTitle>{title}</AlertTitle>
        )}
        <AlertDescription>{children}</AlertDescription>
      </AlertComponent>
    );
  },
);
Alert.displayName = "Alert";

export { Alert };
