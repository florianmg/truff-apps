import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import { AnimalDetail } from '@/components/animals/animal_detail'
import { Skeleton } from '@/components/ui/skeleton'
import { query } from '@/lib/tuyau'

export const Route = createFileRoute('/_authenticated/animals/$animalId')({
  params: {
    parse: ({ animalId }) => {
      const id = Number(animalId)
      if (!Number.isInteger(id) || id <= 0) return false
      return { animalId: id }
    },
    stringify: ({ animalId }) => ({ animalId: String(animalId) }),
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { animalId } = Route.useParams()

  const { data, isPending, isError } = useQuery(
    query.animals.show.queryOptions({ params: { animalId } }),
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
    return <p className="text-muted-foreground">Animal introuvable.</p>
  }

  return <AnimalDetail animal={data} />
}
