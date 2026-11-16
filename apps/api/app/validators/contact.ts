import vine from '@vinejs/vine'
import { contactTypes } from '@truff-apps/domain/contacts'

export const listContactsValidator = vine.create({
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
  clientId: vine.number().withoutDecimals().positive().optional(),
})

export const createContactValidator = vine.create({
  clientId: vine.number().withoutDecimals().positive(),
  firstName: vine.string().trim(),
  lastName: vine.string().trim(),
  type: vine.enum(contactTypes),
  email: vine.string().email().maxLength(254).nullable().optional(),
  phone: vine.string().maxLength(32).nullable().optional(),
  prefersWhatsapp: vine.boolean().optional(),
  isPrimary: vine.boolean().optional(),
})

export const contactIdParamsValidator = vine.create({
  params: vine.object({
    contactId: vine.number().withoutDecimals().positive(),
  }),
})
