import { ContactSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { ContactType } from '@truff-apps/domain/contacts'

import Client from '#models/client'
import Organization from '#models/organization'

export default class Contact extends ContactSchema {
  @column()
  declare type: ContactType

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>
}
