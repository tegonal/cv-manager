export const getIdFromRelation = (
  record: number | Record<string, any> | null | undefined,
): string | number | null => {
  if (typeof record === 'number') {
    return record as number
  }
  if (record && record.id) {
    return record.id as string | number
  }
  return null
}
