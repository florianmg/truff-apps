import db from '@adonisjs/lucid/services/db'
import type { Infer } from '@vinejs/vine/types'

import Organization from '#models/organization'
import User from '#models/user'
import type { signupValidator } from '#validators/user'

type RegisterUserPayload = Omit<Infer<typeof signupValidator>, 'passwordConfirmation'>

export default class RegisterUser {
  async handle({ fullName, email, password }: RegisterUserPayload) {
    return db.transaction(async trx => {
      const organization = await Organization.create(
        { name: `${fullName ?? email} pro` },
        { client: trx },
      )

      return User.create(
        { fullName, email, password, organizationId: organization.id },
        { client: trx },
      )
    })
  }
}
