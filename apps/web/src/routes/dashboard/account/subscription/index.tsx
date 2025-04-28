import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/account/subscription/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/account/subscription/"!</div>
}
