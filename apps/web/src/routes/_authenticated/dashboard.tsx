import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <h1 className="text-2xl font-semibold tracking-tight">Tableau de bord</h1>
}
