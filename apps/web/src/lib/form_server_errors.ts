import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'

type VineFieldError = {
  field?: string
  message: string
}

export type ApiFormErrors = Record<string, string> | VineFieldError[]

export function getApiFormErrors(error: unknown): ApiFormErrors | undefined {
  if (typeof error !== 'object' || error === null || !('response' in error)) {
    return undefined
  }

  const response = (error as { response?: { data?: { errors?: ApiFormErrors } } }).response
  return response?.data?.errors
}

export function applyServerErrors<T extends FieldValues>(
  errors: ApiFormErrors,
  setError: UseFormSetError<T>,
) {
  if (Array.isArray(errors)) {
    for (const error of errors) {
      const field = error.field as Path<T> | undefined
      if (field) {
        setError(field, { type: 'server', message: error.message })
      } else {
        setError('root', { type: 'server', message: error.message })
      }
    }
    return
  }

  for (const [key, message] of Object.entries(errors)) {
    if (key === 'general') {
      setError('root', { type: 'server', message })
    } else {
      setError(key as Path<T>, { type: 'server', message })
    }
  }
}
