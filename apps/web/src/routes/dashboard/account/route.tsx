import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

import { m } from "@repo/dictionaries/messages";
import { Card, CardContent, CardHeader } from "@repo/ui";
import { Separator } from "@repo/ui";

import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/containers/breadcrumb";
import { SidebarNav } from "@/containers/dashboard/sidebar-nav";

export const Route = createFileRoute("/dashboard/account")({
  component: RouteComponent,
});

const sidebarNavItems = [
  {
    title: m["dashboard.my_account.title"](),
    to: "/dashboard/account",
  },
  {
    title: m["dashboard.profile.title"](),
    to: "/dashboard/account/profile",
  },
  {
    title: m["dashboard.notifications.title"](),
    to: "/dashboard/account/notifications",
  },
  {
    type: "separator",
  },
  {
    title: m["dashboard.subscription.title"](),
    to: "/dashboard/account/subscription",
  },
  {
    title: m["dashboard.billings.title"](),
    to: "/dashboard/account/billings",
  },
];

function RouteComponent() {
  return (
    <Container className="flex flex-col justify-stretch space-y-2 flex-1">
      <Breadcrumb className="ml-0.5" />
      <Card className="flex flex-1 flex-col !mt-2">
        <CardHeader className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            {m["dashboard.settings.title"]()}
          </h2>
          <p className="text-muted-foreground">
            {m["dashboard.settings.description"]()}
          </p>
          <Separator className="!mt-4" />
        </CardHeader>
        <CardContent className="flex flex-col flex-1 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="flex flex-col lg:flex-row -mx-4 lg:mx-0 lg:w-1/5 gap-x-2 overflow-auto lg:overflow-visible no-scrollbar">
            <SidebarNav className="flex-1" items={sidebarNavItems} />
            <Separator
              orientation="vertical"
              className="hidden lg:flex h-full"
            />
          </aside>
          <main className="flex-1">
            <Outlet />
          </main>
        </CardContent>
      </Card>
    </Container>
  );
}
