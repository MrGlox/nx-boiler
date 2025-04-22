import {
  BellIcon,
  // Check
} from "lucide-react";
import { useState } from "react";

import { m } from "@repo/dictionaries/messages";
import { cn } from "@repo/utils";

import {
  Button,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  // Loader,
} from "@repo/ui";

type NotificationsCardProps = {
  notifications: {
    message: string;
    type: string;
    read: boolean;
  }[];
};

const notificationTypes = {
  info: "bg-sky-500",
  warning: "bg-yellow-500",
  error: "bg-destructive",
};

export function NotificationsCard({
  notifications = [],
  ...props
}: NotificationsCardProps) {
  const [active, setActive] = useState<boolean>(false);
  const activeNotifications = notifications.filter(({ read }) => !read);

  return (
    <DropdownMenu
      {...props}
      onOpenChange={(open: boolean) => setActive(open)}
      open={active}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={"relative rounded-full w-10 h-10 p-0 transition-transform"}
        >
          <span
            className={cn(
              "absolute origin-center inline-flex justify-center items-center",
              "top-1/4 right-1/4 w-2 h-2 translate-0 bg-destructive rounded-full scale-100 transition-all duration-700",
              activeNotifications.length !== 0
                ? "scale-75 w-6 h-6 top-1/4 right-1/4 text-white text-xs translate-x-1/3 -translate-y-1/2"
                : "scale-0",
              active ? "scale-0 w-4 h-4 top-1/2 right-1/2" : "",
            )}
          >
            {activeNotifications.length > 9
              ? "9+"
              : activeNotifications.length !== 0 && activeNotifications.length}
          </span>
          <BellIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[380px]" align="end">
        <CardHeader>
          <CardTitle>{m["dashboard.notifications.title"]()}</CardTitle>
          <CardDescription>
            {m["dashboard.notifications.description"]({
              count: activeNotifications.length,
            })}
          </CardDescription>
        </CardHeader>
        {notifications?.length !== 0 && (
          <CardContent className="grid gap-4">
            <ul className="overflow-y-auto max-h-[300px]">
              {notifications.map(({ message, type, read }, index) => (
                <li
                  key={message + index}
                  className={cn(
                    "mb-4 items-start last:mb-0 last:pb-0 grid grid-cols-[25px_1fr]",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-2 w-2 translate-y-1 rounded-full",
                      read
                        ? "bg-gray-300"
                        : notificationTypes?.[
                            type?.toLowerCase() as keyof typeof notificationTypes
                          ] || "bg-sky-500",
                    )}
                  />
                  <div className={cn("space-y-1")}>
                    <p className="text-sm font-medium leading-none">
                      {message}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {m["dashboard.notifications.description"]()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        )}

        {/* {activeNotifications.length !== 0 && (
          <CardFooter>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTimeout(() => {
                  setActive(false);
                }, 100);
              }}
              className="w-full"
            >
              <Button className="w-full">
                <div className="flex items-center justify-center space-x-2">
                  <Check /> {m["common.submit"]()}
                </div>
              </Button>
            </form>
          </CardFooter>
        )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
