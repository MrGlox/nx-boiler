import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { DashboardFooter } from "@/containers/dashboard/footer";
import { DashboardHeader } from "@/containers/dashboard/header";
import { getSession } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: async () => {
    const sessionData = await getSession();

    if (!sessionData?.session) {
      return redirect({
        to: "/signin",
      });
    }

    return null;
  },
});

function RouteComponent() {
  // Listen to notifications events
  // const notificationEvent = useEventSource(
  //   `/events/notifications/${loaderData.sessionToken}/stream`,
  //   { event: "message" },
  // );

  // const notifications = useMemo(() => {
  //   if (!notificationEvent) return loaderData.notifications;
  //   const notificationData = JSON.parse(notificationEvent);

  //   if (loaderData.notifications.find(({ id }) => id === notificationData.id))
  //     return loaderData.notifications;

  //   return [...(actionData?.notifications || loaderData.notifications)];
  // }, [notificationEvent]);

  return (
    <>
      <DashboardHeader />
      <main className="flex flex-col min-h-[calc(100vh-64px)] pt-4 pb-10">
        <Outlet />
      </main>
      <DashboardFooter />
    </>
  );
}
