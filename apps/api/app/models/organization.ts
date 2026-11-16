import { OrganizationSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import User from '#models/user'
import Client from '#models/client'
import Contact from '#models/contact'
import File from '#models/file'

export default class Organization extends OrganizationSchema {
  @belongsTo(() => File, { foreignKey: 'logoFileId' })
  declare logo: BelongsTo<typeof File>

  @hasMany(() => Client)
  declare clients: HasMany<typeof Client>

  @hasMany(() => Contact)
  declare contacts: HasMany<typeof Contact>

  @hasMany(() => User)
  declare users: HasMany<typeof User>
}
