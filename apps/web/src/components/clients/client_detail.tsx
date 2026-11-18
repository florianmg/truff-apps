import type { Data } from '@truff-apps/api/data'
import type { AnimalSpecies } from '@truff-apps/domain/animals'
import type { ContactType } from '@truff-apps/domain/contacts'

import { DetailField } from '@/components/detail/detail_field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { contactTypeLabels, formatBoolean, formatSpecies, formatText } from '@/lib/entity_labels'

type ClientForDetail = Data.Client.Variants['forDetail']

type ClientDetailProps = {
  client: ClientForDetail
}

function contactDisplayName(
  contact: {
    firstName: string | null
    lastName: string | null
  } | null,
): string {
  if (!contact) {
    return '—'
  }
  const name = [contact.firstName, contact.lastName].filter(Boolean).join(' ')
  return name || '—'
}

export function ClientDetail({ client }: ClientDetailProps) {
  const title = contactDisplayName(client.primaryContact)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Contact principal</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailField label="Email" value={formatText(client.primaryContact?.email)} />
            <DetailField label="Téléphone" value={formatText(client.primaryContact?.phone)} />
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adresse</CardTitle>
        </CardHeader>
        <CardContent>
          <DetailField label="Adresse" value={formatText(client.address?.formattedAddress)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logement</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailField label="Étage" value={formatText(client.floor)} />
            <DetailField label="Code d'accès" value={formatText(client.accessCode)} />
            <div className="sm:col-span-2">
              <DetailField label="Note" value={formatText(client.note)} />
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Consentements</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailField label="Réseaux sociaux" value={formatBoolean(client.socialMediaConsent)} />
            <DetailField
              label="Soins d'urgence"
              value={formatBoolean(client.emergencyCareConsent)}
            />
          </dl>
        </CardContent>
      </Card>

      {client.contacts.some(contact => !contact.isPrimary) ? (
        <Card>
          <CardHeader>
            <CardTitle>Autres contacts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {client.contacts
              .filter(contact => !contact.isPrimary)
              .map(contact => (
                <div
                  key={contact.id}
                  className="flex flex-col gap-3 border-b border-border pb-6 last:border-0 last:pb-0"
                >
                  <p className="font-medium">{contactDisplayName(contact)}</p>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <DetailField
                      label="Type"
                      value={contactTypeLabels[contact.type as ContactType] ?? contact.type}
                    />
                    <DetailField label="Email" value={formatText(contact.email)} />
                    <DetailField label="Téléphone" value={formatText(contact.phone)} />
                  </dl>
                </div>
              ))}
          </CardContent>
        </Card>
      ) : null}

      {client.animals.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Animaux</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {client.animals.map(animal => (
                <li key={animal.id} className="text-foreground">
                  {formatText(animal.name)} — {formatSpecies(animal.species as AnimalSpecies)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
