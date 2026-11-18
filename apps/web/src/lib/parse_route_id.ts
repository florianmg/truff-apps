export function parseRouteId(raw: string): number | null {
  const id = Number(raw)
  if (!Number.isInteger(id) || id <= 0) {
    return null
  }
  return id
}
