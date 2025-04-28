import { Link, useLocation } from "@tanstack/react-router";
import { Fragment, useState } from "react";

import { m } from "@repo/dictionaries/messages";

import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@repo/utils";

const ITEMS_TO_DISPLAY = 4;

export function Breadcrumb({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const items = pathnames.map((name, index, arr) => {
    const href = `/${pathnames.slice(0, index + 1).join("/")}`;

    return arr.length - 1 === index
      ? {
          label: name,
          defaultValue: name.charAt(0).toUpperCase() + name.slice(1),
          ns: arr[0],
        }
      : {
          href,
          label: name,
          defaultValue: name.charAt(0).toUpperCase() + name.slice(1),
          ns: arr[0],
        };
  });

  const handleLabel = (label: string, ns: string) => {
    return m[`${ns}.${label}.title`]?.() || m[`${label}.title`]?.() || label;
  };

  return (
    <BreadcrumbComponent {...props} className={cn("", className)}>
      <BreadcrumbList className="text-sm">
        {items.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {items
                      .slice(1, -2)
                      .map(({ href, label, defaultValue, ns }, index) => (
                        <DropdownMenuItem
                          key={`${label || defaultValue}-${index}-${ns}-menu-item`}
                        >
                          <Link to={href ? href : "#"} className="py-1 text-sm">
                            {handleLabel(label, ns)}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle Menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>{m["common.navigate"]()}</DrawerTitle>
                      <DrawerDescription>
                        {m["common.navigate_to_desc"]()}
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {items
                        .slice(1, -2)
                        .map(({ label, defaultValue, href, ns }, index) => (
                          <Link
                            key={`${label || defaultValue}-${index}-${ns}-link`}
                            to={href ? href : "#"}
                            className="py-1 text-sm"
                          >
                            {handleLabel(label, ns)}
                          </Link>
                        ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">{m["common.close"]()}</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}
        {items.map(({ label, defaultValue, href, ns }, index) => (
          <Fragment
            key={`${label || defaultValue}-${index}-${ns}-fragment-item`}
          >
            <BreadcrumbItem>
              {href ? (
                <>
                  <BreadcrumbLink
                    asChild
                    className="max-w-20 truncate md:max-w-none"
                  >
                    <Link to={href ? href : "#"} className="py-1 text-sm">
                      {handleLabel(label, ns)}
                    </Link>
                  </BreadcrumbLink>
                </>
              ) : (
                <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                  {handleLabel(label, ns)}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {href && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
}
