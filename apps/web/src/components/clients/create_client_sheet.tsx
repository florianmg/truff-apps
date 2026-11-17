import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { query } from '@/lib/tuyau'
import { queryClient } from '@/lib/query_client'
import { createClientSchema, type CreateClientFormValues } from '@/lib/client_schemas'
import { applyServerErrors, getApiFormErrors } from '@/lib/form_server_errors'
import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const defaultValues: CreateClientFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

type CreateClientSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateClientSheet({ open, onOpenChange }: CreateClientSheetProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateClientFormValues>({
    resolver: zodResolver(createClientSchema),
    defaultValues,
  })

  const createClient = useMutation(
    query.clients.store.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(query.clients.index.queryFilter())
        reset(defaultValues)
        onOpenChange(false)
      },
      onError: error => {
        const apiErrors = getApiFormErrors(error)
        if (apiErrors) {
          applyServerErrors(apiErrors, setError)
        } else {
          setError('root', { type: 'server', message: 'Impossible de créer le client.' })
        }
      },
    }),
  )

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset(defaultValues)
    }
    onOpenChange(nextOpen)
  }

  const onSubmit = (data: CreateClientFormValues) => {
    createClient.mutate({
      body: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email === '' ? null : data.email,
        phone: data.phone === '' ? null : data.phone,
      },
    })
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Nouveau client</SheetTitle>
          <SheetDescription>Ajoutez un client et son contact principal.</SheetDescription>
        </SheetHeader>

        <form
          id="create-client-form"
          className="flex flex-1 flex-col overflow-y-auto px-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <FieldGroup className="py-4">
            <FieldError>{errors.root?.message}</FieldError>
            <Field data-invalid={!!errors.firstName}>
              <FieldLabel htmlFor="client-first-name">Prénom</FieldLabel>
              <Input
                id="client-first-name"
                autoComplete="given-name"
                aria-invalid={!!errors.firstName}
                {...register('firstName')}
              />
              <FieldError errors={[errors.firstName]} />
            </Field>
            <Field data-invalid={!!errors.lastName}>
              <FieldLabel htmlFor="client-last-name">Nom</FieldLabel>
              <Input
                id="client-last-name"
                autoComplete="family-name"
                aria-invalid={!!errors.lastName}
                {...register('lastName')}
              />
              <FieldError errors={[errors.lastName]} />
            </Field>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="client-email">Email</FieldLabel>
              <Input
                id="client-email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register('email')}
              />
              <FieldError errors={[errors.email]} />
            </Field>
            <Field data-invalid={!!errors.phone}>
              <FieldLabel htmlFor="client-phone">Téléphone</FieldLabel>
              <Input
                id="client-phone"
                type="tel"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                {...register('phone')}
              />
              <FieldError errors={[errors.phone]} />
            </Field>
          </FieldGroup>
        </form>

        <SheetFooter className="flex-row justify-end gap-2 border-t border-border">
          <SheetClose render={<Button type="button" variant="outline" />}>Annuler</SheetClose>
          <Button type="submit" form="create-client-form" disabled={createClient.isPending}>
            {createClient.isPending ? 'Création…' : 'Créer'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
