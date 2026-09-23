import { CollectionBeforeChangeHook } from 'payload'

import { MEDIA_PREFIX } from '@/payload/collections/Media/constants'
import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'

export const assignOrgToUpload: CollectionBeforeChangeHook = async ({
  context,
  data,
  operation,
  req: { user },
}) => {
  // Skip prefix assignment during seeding (when skipOrgPrefix context is set)
  if (context?.skipOrgPrefix) {
    return data
  }
  // Only new uploads get an organisation folder. Updates (metadata edits, or the storage
  // adapter persisting upload metadata after the file was stored) keep the stored prefix.
  if (operation !== 'create') {
    return data
  }
  data.prefix = `${MEDIA_PREFIX}/${getIdFromRelation(user?.selectedOrganisation)}`
  return data
}
