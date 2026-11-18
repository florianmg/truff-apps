import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Animal from '#models/animal'
import Client from '#models/client'
import Contact from '#models/contact'
import ClientTransformer from '#transformers/client_transformer'
import {
  clientIdParamsValidator,
  createClientValidator,
  listClientsValidator,
} from '#validators/client'

export default class ClientsController {
  async index({ request, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { page = 1, perPage = 15 } = await request.validateUsing(listClientsValidator, {
      data: request.qs(),
    })

    const clients = await Client.query()
      .where('organizationId', user.organizationId)
      .orderBy('createdAt', 'desc')
      .preload('contacts', query => query.where('isPrimary', true))
      .paginate(page, perPage)

    return serialize(ClientTransformer.paginate(clients.all(), clients.getMeta()))
  }

  async store({ request, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createClientValidator)

    const client = await db.transaction(async trx => {
      const createdClient = await Client.create(
        { organizationId: user.organizationId },
        { client: trx },
      )

      await Contact.create(
        {
          clientId: createdClient.id,
          organizationId: user.organizationId,
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email ?? null,
          phone: payload.phone ?? null,
          type: 'owner',
          isPrimary: true,
          prefersWhatsapp: false,
        },
        { client: trx },
      )

      if (payload.animals?.length) {
        await Animal.createMany(
          payload.animals.map(animal => ({
            clientId: createdClient.id,
            name: animal.name,
            species: animal.species,
          })),
          { client: trx },
        )
      }

      await createdClient.load('contacts', query => query.where('isPrimary', true))
      await createdClient.load('animals')
      return createdClient
    })

    return await serialize.withoutWrapping(
      ClientTransformer.transform(client).useVariant('forDetail'),
    )
  }

  async show({ request, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { params } = await request.validateUsing(clientIdParamsValidator)

    const client = await Client.query()
      .where('organizationId', user.organizationId)
      .where('id', params.clientId)
      .preload('contacts')
      .preload('address')
      .preload('animals')
      .firstOrFail()

    return await serialize.withoutWrapping(
      ClientTransformer.transform(client).useVariant('forDetail'),
    )
  }

  async destroy({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { params } = await request.validateUsing(clientIdParamsValidator)

    const client = await Client.query()
      .where('organizationId', user.organizationId)
      .where('id', params.clientId)
      .firstOrFail()

    await client.delete()

    return response.noContent()
  }
}
