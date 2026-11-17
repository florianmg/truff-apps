import { z } from 'zod'

const emailSchema = z
  .string()
  .min(1, 'Email requis')
  .pipe(z.email('Email invalide'))
  .pipe(z.string().max(254, 'Email trop long'))

const passwordSchema = z.string().min(8, 'Minimum 8 caractères').max(32, 'Maximum 32 caractères')

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    fullName: z.string(),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirmation requise'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
