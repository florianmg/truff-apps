import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'

import { CreateClientSheet } from '@/components/clients/create_client_sheet'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authenticated/clients')({
  component: RouteComponent,
})

function RouteComponent() {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <Button type="button" onClick={() => setCreateOpen(true)}>
          <PlusIcon />
          Nouveau client
        </Button>
      </div>

      <CreateClientSheet open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
