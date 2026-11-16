import Client from '#models/client'

export async function findClientForOrganization(organizationId: number, clientId: number) {
  return Client.query().where('organizationId', organizationId).where('id', clientId).firstOrFail()
}
