import vine from '@vinejs/vine'

export const createClientValidator = vine.create({
  firstName: vine.string().trim(),
  lastName: vine.string().trim(),
  email: vine.string().email().maxLength(254).nullable().optional(),
  phone: vine.string().maxLength(32).nullable().optional(),
})

export const listClientsValidator = vine.create({
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
})

export const clientIdParamsValidator = vine.create({
  params: vine.object({
    clientId: vine.number().withoutDecimals().positive(),
  }),
})
