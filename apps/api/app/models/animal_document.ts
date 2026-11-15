import { AnimalDocumentSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Animal from '#models/animal'
import File from '#models/file'

export default class AnimalDocument extends AnimalDocumentSchema {
  @belongsTo(() => Animal)
  declare animal: BelongsTo<typeof Animal>

  @belongsTo(() => File)
  declare file: BelongsTo<typeof File>
}
