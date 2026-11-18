import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import { ClientDetail } from '@/components/clients/client_detail'
import { Skeleton } from '@/components/ui/skeleton'
import { query } from '@/lib/tuyau'

export const Route = createFileRoute('/_authenticated/clients/$clientId')({
  params: {
    parse: ({ clientId }) => {
      const id = Number(clientId)
      if (!Number.isInteger(id) || id <= 0) return false
      return { clientId: id }
    },
    stringify: ({ clientId }) => ({ clientId: String(clientId) }),
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { clientId } = Route.useParams()

  const { data, isPending, isError } = useQuery(
    query.clients.show.queryOptions({ params: { clientId } }),
  )

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
