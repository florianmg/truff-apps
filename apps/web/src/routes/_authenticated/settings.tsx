import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <h1 className="text-2xl font-semibold tracking-tight">Paramètres</h1>
}
