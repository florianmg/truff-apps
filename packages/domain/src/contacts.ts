export const contactTypes = ['owner', 'neighbor', 'veterinarian', 'family', 'other'] as const
export type ContactType = (typeof contactTypes)[number]
