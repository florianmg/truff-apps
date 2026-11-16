import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Client from '#models/client'
import Contact from '#models/contact'
import ClientTransformer from '#transformers/client_transformer'
import { createClientValidator, listClientsValidator } from '#validators/client'

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

      await createdClient.load('contacts', query => query.where('isPrimary', true))
      return createdClient
    })

    return await serialize.withoutWrapping(
      ClientTransformer.transform(client).useVariant('forDetail'),
    )
  }

  async show({ params, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const client = await Client.query()
      .where('organizationId', user.organizationId)
      .where('id', params.id)
      .preload('contacts')
      .preload('address')
      .preload('animals')
      .firstOrFail()

    return await serialize.withoutWrapping(
      ClientTransformer.transform(client).useVariant('forDetail'),
    )
  }

  async destroy({ params, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const client = await Client.query()
      .where('organizationId', user.organizationId)
      .where('id', params.id)
      .firstOrFail()

    await client.delete()

    return response.noContent()
  }
}
