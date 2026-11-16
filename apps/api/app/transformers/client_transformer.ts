import { BaseTransformer } from '@adonisjs/core/transformers'

import type Client from '#models/client'
import type Contact from '#models/contact'
import AddressTransformer from '#transformers/address_transformer'
import AnimalTransformer from '#transformers/animal_transformer'
import ContactTransformer from '#transformers/contact_transformer'

function primaryContact(contacts: Contact[] | undefined) {
  return contacts?.find(contact => contact.isPrimary) ?? contacts?.[0]
}

const emptyContactSummary = {
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
} as const

export default class ClientTransformer extends BaseTransformer<Client> {
  toObject() {
    const contact = primaryContact(this.resource.contacts)

    return {
      ...this.pick(this.resource, ['id', 'createdAt']),
      ...(contact
        ? this.pick(contact, ['firstName', 'lastName', 'email', 'phone'])
        : emptyContactSummary),
    }
  }

  forDetail() {
    const contact = primaryContact(this.resource.contacts)

    return {
      ...this.pick(this.resource, [
        'id',
        'note',
        'accessCode',
        'floor',
        'socialMediaConsent',
        'emergencyCareConsent',
        'profileFileId',
      ]),
      primaryContact: contact ? ContactTransformer.transform(contact) : null,
      contacts: this.resource.contacts ? ContactTransformer.transform(this.resource.contacts) : [],
      address: this.resource.address ? AddressTransformer.transform(this.resource.address) : null,
      animals: this.resource.animals ? AnimalTransformer.transform(this.resource.animals) : [],
    }
  }
}
