import { AnimalSchema } from '#database/schema'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { AnimalSex, AnimalSpecies } from '@truff-apps/domain/animals'

import AnimalDocument from '#models/animal_document'
import Client from '#models/client'
import File from '#models/file'

export default class Animal extends AnimalSchema {
  @column()
  declare sex: AnimalSex | null

  @column()
  declare species: AnimalSpecies

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @hasMany(() => AnimalDocument)
  declare documents: HasMany<typeof AnimalDocument>

  @belongsTo(() => File, { foreignKey: 'profileFileId' })
  declare profile: BelongsTo<typeof File>
}
