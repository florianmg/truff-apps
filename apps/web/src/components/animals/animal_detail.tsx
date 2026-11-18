import type { Data } from '@truff-apps/api/data'
import type { AnimalSex, AnimalSpecies } from '@truff-apps/domain/animals'

import { DetailField } from '@/components/detail/detail_field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  animalSexLabels,
  formatBoolean,
  formatDisplayDate,
  formatSpecies,
  formatText,
} from '@/lib/entity_labels'

type AnimalForDetail = Data.Animal.Variants['forDetail']

type AnimalDetailProps = {
  animal: AnimalForDetail
}

export function AnimalDetail({ animal }: AnimalDetailProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">{formatText(animal.name)}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Identité</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailField label="Espèce" value={formatSpecies(animal.species as AnimalSpecies)} />
            <DetailField label="Race" value={formatText(animal.breed)} />
            <DetailField
              label="Sexe"
              value={animal.sex ? animalSexLabels[animal.sex as AnimalSex] : formatText(animal.sex)}
            />
            <DetailField label="Stérilisé" value={formatBoolean(animal.sterilized)} />
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailField label="Date de naissance" value={formatDisplayDate(animal.birthDate)} />
            <DetailField label="Date d'adoption" value={formatDisplayDate(animal.adoptionDate)} />
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Identification</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailField label="Puce" value={formatText(animal.chipNumber)} />
            <DetailField label="Tatouage" value={formatText(animal.tattoo)} />
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Santé et alimentation</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailField label="Poids" value={formatText(animal.weight)} />
            <DetailField label="Régime" value={formatText(animal.diet)} />
            <div className="sm:col-span-2">
              <DetailField
                label="Consignes nourriture"
                value={formatText(animal.foodInstructions)}
              />
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Référence</CardTitle>
        </CardHeader>
        <CardContent>
          <DetailField label="Client" value={formatText(animal.clientId)} />
        </CardContent>
      </Card>
    </div>
  )
}
