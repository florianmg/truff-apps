import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-semibold tracking-tight">Truff</h1>
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
