import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/account/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/account/settings"!</div>;
}
