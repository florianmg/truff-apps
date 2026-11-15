import { AddressSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Organization from '#models/organization'

export default class Address extends AddressSchema {
  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>
}
