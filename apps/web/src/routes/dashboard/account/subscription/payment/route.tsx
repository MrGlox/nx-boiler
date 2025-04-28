import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/account/subscription/payment')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/dashboard/account/subscription/payment"!</div>
}
