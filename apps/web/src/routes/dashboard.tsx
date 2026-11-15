import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

import { getMeQueryOptions, redirectToLoginIfNotAuthenticated } from '@/hooks/auth'
import { query } from '@/lib/tuyau'
import { queryClient } from '@/lib/query_client'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/brand_logo'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => await redirectToLoginIfNotAuthenticated(),
})

function RouteComponent() {
  const navigate = useNavigate()
  const { data: user } = useSuspenseQuery(getMeQueryOptions())

  const logout = useMutation(
    query.auth.logout.mutationOptions({
      onSuccess: async () => {
        queryClient.clear()
        await navigate({ to: '/' })
      },
    }),
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <BrandLogo />
      <p className="text-muted-foreground">{user.email}</p>
      <Button variant="outline" onClick={() => logout.mutate({})} disabled={logout.isPending}>
        Se déconnecter
      </Button>
    </main>
  )
}
