import { BaseTransformer } from '@adonisjs/core/transformers'

import type Address from '#models/address'

export default class AddressTransformer extends BaseTransformer<Address> {
  toObject() {
    return this.pick(this.resource, ['id', 'formattedAddress', 'latitude', 'longitude', 'placeId'])
  }
}
