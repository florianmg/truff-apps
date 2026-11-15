export const animalSpecies = ['cat', 'dog', 'bird', 'rodent'] as const
export type AnimalSpecies = (typeof animalSpecies)[number]

export const animalSexes = ['male', 'female'] as const
export type AnimalSex = (typeof animalSexes)[number]
