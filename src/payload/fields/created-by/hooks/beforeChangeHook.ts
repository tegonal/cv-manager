import { FieldHook } from 'payload'

import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation'

export const beforeChangeHook: FieldHook = async ({ req, req: { user }, siblingData }) => {
  if (!user || !req.user) return undefined

  if (siblingData.createdBy) {
    return getIdFromRelation(siblingData.createdBy)
  }

  return user.id
}
