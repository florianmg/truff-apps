import { z } from 'zod'
import { animalSpecies, type AnimalSpecies } from '@truff-apps/domain/animals'

const optionalEmailSchema = z.union([
  z.literal(''),
  z
    .string()
    .trim()
    .min(1)
    .pipe(z.email('Email invalide'))
    .pipe(z.string().max(254, 'Email trop long')),
])

export const animalSpeciesLabels: Record<AnimalSpecies, string> = {
  cat: 'Chat',
  dog: 'Chien',
  bird: 'Oiseau',
  rodent: 'Rongeur',
}

export const createClientSchema = z.object({
  firstName: z.string().trim().min(1, 'Prénom requis'),
  lastName: z.string().trim().min(1, 'Nom requis'),
  email: optionalEmailSchema,
  phone: z.string().trim().max(32, 'Maximum 32 caractères'),
  animals: z.array(
    z.object({
      name: z.string().trim().min(1, 'Nom requis'),
      species: z.enum(animalSpecies),
    }),
  ),
})

export type CreateClientFormValues = z.infer<typeof createClientSchema>
