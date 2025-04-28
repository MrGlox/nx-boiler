import { createFileRoute } from "@tanstack/react-router";
import { m } from "@repo/dictionaries/messages";

import { Container } from "@/components/layout/container";

export const Route = createFileRoute("/dashboard/account/appearance")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container className="px-0">
      <header className="flex-1 space-y-4 pt-6 pb-4">
        <h2 className="text-3xl font-bold tracking-tight">
          {m["dashboard.appearance.title"]()}
        </h2>
      </header>
    </Container>
  );
}
