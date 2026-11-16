import { HttpContext } from '@adonisjs/core/http'
import Animal from '#models/animal'
import AnimalTransformer from '#transformers/animal_transformer'
import { findClientForOrganization } from '#utils/organization_client'
import {
  animalIdParamsValidator,
  createAnimalValidator,
  listAnimalsValidator,
} from '#validators/animal'

function animalsForOrganization(organizationId: number) {
  return Animal.query().whereHas('client', query => {
    query.where('organizationId', organizationId)
  })
}

export default class AnimalsController {
  async index({ request, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const {
      page = 1,
      perPage = 15,
      clientId,
    } = await request.validateUsing(listAnimalsValidator, {
      data: request.qs(),
    })

    const query = animalsForOrganization(user.organizationId).orderBy('createdAt', 'desc')

    if (clientId !== undefined) {
      query.where('clientId', clientId)
    }

    const animals = await query.paginate(page, perPage)

    return serialize(AnimalTransformer.paginate(animals.all(), animals.getMeta()))
  }

  async store({ request, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createAnimalValidator)

    await findClientForOrganization(user.organizationId, payload.clientId)

    const { clientId, ...attributes } = payload
    const animal = await Animal.create({ ...attributes, clientId })

    return await serialize.withoutWrapping(
      AnimalTransformer.transform(animal).useVariant('forDetail'),
    )
  }

  async show({ request, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { params } = await request.validateUsing(animalIdParamsValidator)

    const animal = await animalsForOrganization(user.organizationId)
      .where('id', params.animalId)
      .firstOrFail()

    return await serialize.withoutWrapping(
      AnimalTransformer.transform(animal).useVariant('forDetail'),
    )
  }

  async destroy({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { params } = await request.validateUsing(animalIdParamsValidator)

    const animal = await animalsForOrganization(user.organizationId)
      .where('id', params.animalId)
      .firstOrFail()

    await animal.delete()

    return response.noContent()
  }
}
