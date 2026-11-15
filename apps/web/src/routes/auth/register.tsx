import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'

import { query } from '@/lib/tuyau'
import { queryClient } from '@/lib/query_client'
import { redirectToDashboardIfAuthenticated } from '@/hooks/auth'
import { Input } from '@/components/ui/input'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
  beforeLoad: () => redirectToDashboardIfAuthenticated(),
})

function RouteComponent() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const register = useMutation(
    query.auth.register.mutationOptions({
      onSuccess: async () => {
        await queryClient.resetQueries()
        await navigate({ to: '/dashboard' })
      },
      onError: (error: any) => {
        if (error.response?.data?.errors) setErrors(error.response.data.errors)
      },
    }),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    register.mutate({
      body: {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        // @ts-expect-error accepté par l’API (confirmation Vine)
        passwordConfirmation: formData.confirmPassword,
      },
    })
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nom</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange('fullName')}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange('password')}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">Confirmation</FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={register.isPending}>
                  {register.isPending ? 'Création…' : 'Créer le compte'}
                </Button>
                <FieldDescription className="text-center">
                  Déjà un compte ?{' '}
                  <Link
                    to="/auth/login"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Se connecter
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
