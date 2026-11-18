import { createFileRoute, redirect } from '@tanstack/react-router'

import { isAuthenticated } from '@/hooks/auth'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const isAuth = await isAuthenticated()
    throw redirect({ to: isAuth ? '/clients' : '/auth/login' })
  },
})
