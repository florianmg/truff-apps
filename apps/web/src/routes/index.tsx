import { createFileRoute, Link } from '@tanstack/react-router'

import { BrandLogo } from '@/components/brand_logo'

export const Route = createFileRoute('/')({
  component: () => (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1>
        <BrandLogo variant="stacked" />
      </h1>
      <p className="flex gap-4 text-sm">
        <Link to="/auth/login" className="text-primary underline-offset-4 hover:underline">
          Se connecter
        </Link>
        <Link to="/auth/register" className="text-primary underline-offset-4 hover:underline">
          Créer un compte
        </Link>
      </p>
    </main>
  ),
})
