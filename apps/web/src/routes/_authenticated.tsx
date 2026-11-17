import { createFileRoute } from '@tanstack/react-router'

import { AppLayout } from '@/components/app_layout'
import { getMeQueryOptions, redirectToLoginIfNotAuthenticated } from '@/hooks/auth'
import { queryClient } from '@/lib/query_client'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    await redirectToLoginIfNotAuthenticated()
    await queryClient.ensureQueryData(getMeQueryOptions())
  },
  component: AppLayout,
})
