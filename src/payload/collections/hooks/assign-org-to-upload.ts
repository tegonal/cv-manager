import { CollectionBeforeChangeHook } from 'payload'

import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'

export const assignOrgToUpload: CollectionBeforeChangeHook = async ({ data, req: { user } }) => {
  data.prefix = `${data.prefix}/${getIdFromRelation(user?.selectedOrganisation)}`
  return data
}
