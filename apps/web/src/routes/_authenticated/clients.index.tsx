import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'

import { CreateClientSheet } from '@/components/clients/create_client_sheet'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { formatText } from '@/lib/entity_labels'
import { query } from '@/lib/tuyau'

export const Route = createFileRoute('/_authenticated/clients/')({
  component: RouteComponent,
})

function clientName(client: { firstName: string | null; lastName: string | null }) {
  const name = [client.firstName, client.lastName].filter(Boolean).join(' ')
  return name || '—'
}

function RouteComponent() {
  const [createOpen, setCreateOpen] = useState(false)
  const [page, setPage] = useState(1)

  const { data, isPending, isError } = useQuery(
    query.clients.index.queryOptions({ query: { page } }),
  )

  const clients = data?.data ?? []
  const lastPage = Number(data?.metadata.lastPage ?? 1)

  if (isPending) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }

  if (isError) {
    return <p className="text-muted-foreground">Impossible de charger les clients.</p>
  }

  if (clients.length === 0) {
    return <p className="text-muted-foreground">Aucun client.</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <Button type="button" onClick={() => setCreateOpen(true)}>
          <PlusIcon />
          Nouveau client
        </Button>
      </div>

      <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-white">
        {clients.map(client => (
          <li key={client.id}>
            <Link
              to="/clients/$clientId"
              params={{ clientId: client.id }}
              className="flex flex-col gap-1 px-4 py-3 hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-medium">{clientName(client)}</span>
              <span className="text-sm text-muted-foreground">
                {formatText(client.email)} · {formatText(client.phone)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => setPage(current => Math.max(1, current - 1))}
        >
          Précédent
        </Button>
        <span className="text-sm text-muted-foreground">
          {page} / {lastPage}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page >= lastPage}
          onClick={() => setPage(current => current + 1)}
        >
          Suivant
        </Button>
      </div>

      <CreateClientSheet open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
