import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { animalSpecies } from '@truff-apps/domain/animals'

import { query } from '@/lib/tuyau'
import { queryClient } from '@/lib/query_client'
import {
  animalSpeciesLabels,
  createClientSchema,
  type CreateClientFormValues,
} from '@/lib/client_schemas'
import { applyServerErrors, getApiFormErrors } from '@/lib/form_server_errors'
import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native_select'
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
  animals: [],
}

type CreateClientSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateClientSheet({ open, onOpenChange }: CreateClientSheetProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateClientFormValues>({
    resolver: zodResolver(createClientSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'animals',
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
        animals: data.animals,
      },
    })
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-full data-[side=right]:w-full data-[side=right]:max-w-full sm:max-w-lg sm:data-[side=right]:max-w-lg"
      >
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
            <div className="grid grid-cols-2 gap-4">
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
            </div>
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

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <FieldLabel>Animaux</FieldLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: '', species: 'cat' })}
                >
                  <PlusIcon />
                  Ajouter un animal
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <div className="grid flex-1 grid-cols-2 gap-4">
                    <Field data-invalid={!!errors.animals?.[index]?.species}>
                      <FieldLabel htmlFor={`animal-species-${index}`}>Espèce</FieldLabel>
                      <NativeSelect
                        id={`animal-species-${index}`}
                        className="w-full"
                        aria-invalid={!!errors.animals?.[index]?.species}
                        {...register(`animals.${index}.species`)}
                      >
                        {animalSpecies.map(species => (
                          <NativeSelectOption key={species} value={species}>
                            {animalSpeciesLabels[species]}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <FieldError errors={[errors.animals?.[index]?.species]} />
                    </Field>
                    <Field data-invalid={!!errors.animals?.[index]?.name}>
                      <FieldLabel htmlFor={`animal-name-${index}`}>Nom</FieldLabel>
                      <Input
                        id={`animal-name-${index}`}
                        aria-invalid={!!errors.animals?.[index]?.name}
                        {...register(`animals.${index}.name`)}
                      />
                      <FieldError errors={[errors.animals?.[index]?.name]} />
                    </Field>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="mt-7 shrink-0"
                    onClick={() => remove(index)}
                    aria-label="Supprimer l'animal"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              ))}
            </div>
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
