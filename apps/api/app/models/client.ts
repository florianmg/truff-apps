import { ClientSchema } from '#database/schema'
import { belongsTo, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'

import Address from '#models/address'
import Animal from '#models/animal'
import Contact from '#models/contact'
import File from '#models/file'
import Organization from '#models/organization'

export default class Client extends ClientSchema {
  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>

  @hasMany(() => Animal)
  declare animals: HasMany<typeof Animal>

  @hasMany(() => Contact)
  declare contacts: HasMany<typeof Contact>

  @belongsTo(() => File, { foreignKey: 'profileFileId' })
  declare profile: BelongsTo<typeof File>
}
