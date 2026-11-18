import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'

import { query } from '@/lib/tuyau'
import { queryClient } from '@/lib/query_client'
import { redirectToDashboardIfAuthenticated } from '@/hooks/auth'
import { loginSchema, type LoginFormValues } from '@/lib/auth_schemas'
import { applyServerErrors, getApiFormErrors } from '@/lib/form_server_errors'
import { Input } from '@/components/ui/input'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/brand_logo'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
  beforeLoad: () => redirectToDashboardIfAuthenticated(),
})

function RouteComponent() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const login = useMutation(
    query.auth.login.mutationOptions({
      onSuccess: async () => {
        await queryClient.resetQueries()
        await navigate({ to: '/clients' })
      },
      onError: error => {
        const apiErrors = getApiFormErrors(error)
        if (apiErrors) {
          applyServerErrors(apiErrors, setError)
        } else {
          setError('root', { type: 'server', message: 'Identifiants invalides.' })
        }
      },
    }),
  )

  const onSubmit = (data: LoginFormValues) => {
    login.mutate({
      body: { email: data.email, password: data.password },
    })
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col gap-4">
          <BrandLogo />
          <CardTitle>Connexion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <FieldError>{errors.root?.message}</FieldError>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register('email')}
                />
                <FieldError errors={[errors.email]} />
              </Field>
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
                <FieldError errors={[errors.password]} />
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={login.isPending}>
                  {login.isPending ? 'Connexion…' : 'Se connecter'}
                </Button>
                <FieldDescription className="text-center">
                  Pas de compte ?{' '}
                  <Link
                    to="/auth/register"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    S&apos;inscrire
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
