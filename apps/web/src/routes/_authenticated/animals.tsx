import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/animals')({
  component: RouteComponent,
})

function RouteComponent() {
  return <h1 className="text-2xl font-semibold tracking-tight">Animaux</h1>
}
