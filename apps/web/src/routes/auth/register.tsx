import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'

import { query } from '@/lib/tuyau'
import { queryClient } from '@/lib/query_client'
import { redirectToDashboardIfAuthenticated } from '@/hooks/auth'
import { registerSchema, type RegisterFormValues } from '@/lib/auth_schemas'
import { applyServerErrors, getApiFormErrors } from '@/lib/form_server_errors'
import { Input } from '@/components/ui/input'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/brand_logo'

export const Route = createFileRoute('/auth/register')({
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
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const registerMutation = useMutation(
    query.auth.register.mutationOptions({
      onSuccess: async () => {
        await queryClient.resetQueries()
        await navigate({ to: '/clients' })
      },
      onError: error => {
        const apiErrors = getApiFormErrors(error)
        if (apiErrors) {
          applyServerErrors(apiErrors, setError)
        }
      },
    }),
  )

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate({
      body: {
        fullName: data.fullName || null,
        email: data.email,
        password: data.password,
        // @ts-expect-error accepté par l'API (confirmation Vine)
        passwordConfirmation: data.confirmPassword,
      },
    })
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col gap-4">
          <BrandLogo />
          <CardTitle>Inscription</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <FieldError>{errors.root?.message}</FieldError>
              <Field data-invalid={!!errors.fullName}>
                <FieldLabel htmlFor="name">Nom</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={!!errors.fullName}
                  {...register('fullName')}
                />
                <FieldError errors={[errors.fullName]} />
              </Field>
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
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
                <FieldError errors={[errors.password]} />
              </Field>
              <Field data-invalid={!!errors.confirmPassword}>
                <FieldLabel htmlFor="confirm-password">Confirmation</FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={!!errors.confirmPassword}
                  {...register('confirmPassword')}
                />
                <FieldError errors={[errors.confirmPassword]} />
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                  {registerMutation.isPending ? 'Création…' : 'Créer le compte'}
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
