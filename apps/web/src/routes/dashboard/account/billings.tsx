import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/account/billings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/account/billings"!</div>
}
