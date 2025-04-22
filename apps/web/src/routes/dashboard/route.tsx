import { DashboardFooter } from "@/containers/dashboard/footer";
import { DashboardHeader } from "@/containers/dashboard/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";
// import { useMemo } from "react";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
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
      <DashboardHeader
      // {...{
      //   notifications,
      // }}
      />
      <main className="flex flex-col min-h-[calc(100vh-64px)] py-10">
        <Outlet />
      </main>
      <DashboardFooter />
    </>
  );
}
