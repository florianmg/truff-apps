import type { AnimalSex, AnimalSpecies } from '@truff-apps/domain/animals'
import type { ContactType } from '@truff-apps/domain/contacts'

import { animalSpeciesLabels } from '@/lib/client_schemas'

export const animalSexLabels: Record<AnimalSex, string> = {
  male: 'Mâle',
  female: 'Femelle',
}

export const contactTypeLabels: Record<ContactType, string> = {
  owner: 'Propriétaire',
  neighbor: 'Voisin',
  veterinarian: 'Vétérinaire',
  family: 'Famille',
  other: 'Autre',
}

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formatSpecies(species: AnimalSpecies): string {
  return animalSpeciesLabels[species]
}

export function formatDisplayDate(value: string | null | undefined): string {
  if (!value) {
    return '—'
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '—'
  }
  return dateFormatter.format(date)
}

export function formatBoolean(value: boolean | null | undefined): string {
  if (value === null || value === undefined) {
    return '—'
  }
  return value ? 'Oui' : 'Non'
}

export function formatText(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  return String(value)
}
