import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";

import { buttonVariants, Separator } from "@repo/ui";
import { cn } from "@repo/utils";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    to: string;
    title: string;
    type?: "separator";
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = useLocation();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item, index) => {
        if (item.type === "separator") {
          return <Separator className="!my-2" key={`separator-${index}`} />;
        }

        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.to
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
