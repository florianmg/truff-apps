import { BaseTransformer } from '@adonisjs/core/transformers'

import type Contact from '#models/contact'

export default class ContactTransformer extends BaseTransformer<Contact> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'firstName',
      'lastName',
      'email',
      'phone',
      'type',
      'isPrimary',
      'prefersWhatsapp',
    ])
  }
}
