export const fileVisibilities = ['public', 'private'] as const
export type FileVisibility = (typeof fileVisibilities)[number]

export const fileMimeTypes = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  pdf: 'application/pdf',
} as const

export type FileExtension = keyof typeof fileMimeTypes

export const fileExtensions = Object.keys(fileMimeTypes) as FileExtension[]
