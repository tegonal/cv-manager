export const getIdFromRelation = (
  record: null | number | Record<string, any> | undefined,
): null | number | string => {
  if (typeof record === 'number') {
    return record as number
  }
  if (record && record.id) {
    return record.id as number | string
  }
  return null
}
