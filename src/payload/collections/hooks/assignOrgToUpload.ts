import { CollectionBeforeChangeHook } from 'payload'

import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation'

export const assignOrgToUpload: CollectionBeforeChangeHook = async ({ data, req: { user } }) => {
  data.prefix = `${data.prefix}/${getIdFromRelation(user?.selectedOrganisation)}`
  return data
}
