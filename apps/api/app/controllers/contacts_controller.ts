import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Contact from '#models/contact'
import ContactTransformer from '#transformers/contact_transformer'
import { findClientForOrganization } from '#utils/organization_client'
import {
  contactIdParamsValidator,
  createContactValidator,
  listContactsValidator,
} from '#validators/contact'

export default class ContactsController {
  async index({ request, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const {
      page = 1,
      perPage = 15,
      clientId,
    } = await request.validateUsing(listContactsValidator, {
      data: request.qs(),
    })

    const query = Contact.query()
      .where('organizationId', user.organizationId)
      .orderBy('createdAt', 'desc')

    if (clientId !== undefined) {
      query.where('clientId', clientId)
    }

    const contacts = await query.paginate(page, perPage)

    return serialize(ContactTransformer.paginate(contacts.all(), contacts.getMeta()))
  }

  async store({ request, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createContactValidator)

    await findClientForOrganization(user.organizationId, payload.clientId)

    const isPrimary = payload.isPrimary ?? false

    const contact = await db.transaction(async trx => {
      if (isPrimary) {
        await Contact.query({ client: trx })
          .where('clientId', payload.clientId)
          .where('isPrimary', true)
          .update({ isPrimary: false })
      }

      return Contact.create(
        {
          clientId: payload.clientId,
          organizationId: user.organizationId,
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email ?? null,
          phone: payload.phone ?? null,
          type: payload.type,
          isPrimary,
          prefersWhatsapp: payload.prefersWhatsapp ?? false,
        },
        { client: trx },
      )
    })

    return await serialize.withoutWrapping(ContactTransformer.transform(contact))
  }

  async show({ request, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { params } = await request.validateUsing(contactIdParamsValidator)

    const contact = await Contact.query()
      .where('organizationId', user.organizationId)
      .where('id', params.contactId)
      .firstOrFail()

    return await serialize.withoutWrapping(ContactTransformer.transform(contact))
  }

  async destroy({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { params } = await request.validateUsing(contactIdParamsValidator)

    const contact = await Contact.query()
      .where('organizationId', user.organizationId)
      .where('id', params.contactId)
      .firstOrFail()

    await contact.delete()

    return response.noContent()
  }
}
