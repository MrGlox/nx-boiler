import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/greeting')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/greeting"!</div>;
}
