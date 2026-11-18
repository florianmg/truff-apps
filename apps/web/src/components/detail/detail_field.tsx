import type { ReactNode } from 'react'

type DetailFieldProps = {
  label: string
  value: ReactNode
}

export function DetailField({ label, value }: DetailFieldProps) {
  const display = value === null || value === undefined || value === '' ? '—' : value

  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{display}</dd>
    </div>
  )
}
