import { FileSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { FileVisibility } from '@truff-apps/domain/files'

import Organization from '#models/organization'

export default class File extends FileSchema {
  @column()
  declare visibility: FileVisibility

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>
}
