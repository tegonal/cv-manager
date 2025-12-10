import { CollectionBeforeChangeHook } from 'payload'

import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'

export const assignOrgToUpload: CollectionBeforeChangeHook = async ({
  context,
  data,
  req: { user },
}) => {
  // Skip prefix assignment during seeding (when skipOrgPrefix context is set)
  if (context?.skipOrgPrefix) {
    return data
  }
  data.prefix = `${data.prefix}/${getIdFromRelation(user?.selectedOrganisation)}`
  return data
}
