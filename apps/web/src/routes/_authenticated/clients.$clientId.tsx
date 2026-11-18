import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import { ClientDetail } from '@/components/clients/client_detail'
import { Skeleton } from '@/components/ui/skeleton'
import { parseRouteId } from '@/lib/parse_route_id'
import { query } from '@/lib/tuyau'

export const Route = createFileRoute('/_authenticated/clients/$clientId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { clientId: clientIdParam } = Route.useParams()
  const clientId = parseRouteId(clientIdParam)

  const { data, isPending, isError } = useQuery(
    query.clients.show.queryOptions(
      { params: { clientId: clientId! } },
      { enabled: clientId !== null },
    ),
  )

  if (clientId === null) {
    return <p className="text-muted-foreground">Identifiant invalide.</p>
  }

  if (isPending) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (isError || !data) {
    return <p className="text-muted-foreground">Client introuvable.</p>
  }

  return <ClientDetail client={data} />
}
