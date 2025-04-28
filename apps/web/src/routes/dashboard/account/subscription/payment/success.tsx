import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/account/subscription/payment/success',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/account/subscription/payment/success"!</div>
}
