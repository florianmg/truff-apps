import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Organization from '#models/organization'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  /**
   * Users created via Google have no password. The mixin throws in that
   * case, which would turn a failed login into a server error.
   */
  async verifyPassword(plainPassword: string) {
    if (!this.password) {
      return false
    }
    return super.verifyPassword(plainPassword)
  }
}
