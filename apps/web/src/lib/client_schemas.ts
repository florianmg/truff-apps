import { z } from 'zod'

const optionalEmailSchema = z.union([
  z.literal(''),
  z
    .string()
    .trim()
    .min(1)
    .pipe(z.email('Email invalide'))
    .pipe(z.string().max(254, 'Email trop long')),
])

export const createClientSchema = z.object({
  firstName: z.string().trim().min(1, 'Prénom requis'),
  lastName: z.string().trim().min(1, 'Nom requis'),
  email: optionalEmailSchema,
  phone: z.string().trim().max(32, 'Maximum 32 caractères'),
})

export type CreateClientFormValues = z.infer<typeof createClientSchema>
