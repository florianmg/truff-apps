import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/clients')({
  component: RouteComponent,
})

function RouteComponent() {
  return <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
}
