import vine from '@vinejs/vine'
import { animalSexes, animalSpecies } from '@truff-apps/domain/animals'

export const listAnimalsValidator = vine.create({
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
  clientId: vine.number().withoutDecimals().positive().optional(),
})

export const createAnimalValidator = vine.create({
  clientId: vine.number().withoutDecimals().positive(),
  name: vine.string().trim(),
  species: vine.enum(animalSpecies),
  breed: vine.string().trim().nullable().optional(),
  sex: vine.enum(animalSexes).nullable().optional(),
  sterilized: vine.boolean().nullable().optional(),
  birthDate: vine.date().nullable().optional(),
  adoptionDate: vine.date().nullable().optional(),
  weight: vine.string().trim().nullable().optional(),
  chipNumber: vine.string().trim().nullable().optional(),
  tattoo: vine.string().trim().nullable().optional(),
  diet: vine.string().trim().nullable().optional(),
  foodInstructions: vine.string().trim().nullable().optional(),
})

export const animalIdParamsValidator = vine.create({
  params: vine.object({
    animalId: vine.number().withoutDecimals().positive(),
  }),
})
