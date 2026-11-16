import { BaseTransformer } from '@adonisjs/core/transformers'

import type Animal from '#models/animal'

export default class AnimalTransformer extends BaseTransformer<Animal> {
  toObject() {
    return this.pick(this.resource, ['id', 'name', 'species'])
  }

  forDetail() {
    return {
      ...this.pick(this.resource, [
        'id',
        'clientId',
        'name',
        'species',
        'breed',
        'sex',
        'sterilized',
        'birthDate',
        'adoptionDate',
        'weight',
        'chipNumber',
        'tattoo',
        'diet',
        'foodInstructions',
        'profileFileId',
        'createdAt',
      ]),
    }
  }
}
