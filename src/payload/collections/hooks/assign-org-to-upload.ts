import { CollectionBeforeChangeHook } from 'payload'

import { getSelectedOrganisation } from '@/payload/access/utils/get-selected-organisation'
import { hasSuperAdminRole } from '@/payload/access/utils/has-super-admin-role'
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
  // Runs before the organisation field hook, which assigns the same organisation (or rejects the
  // upload without one): only super admins and system operations choose it, others get the selected one
  const organisation =
    !user || hasSuperAdminRole(user)
      ? (getIdFromRelation(data.organisation) ?? getSelectedOrganisation(user))
      : getSelectedOrganisation(user)
  data.prefix = organisation ? `${MEDIA_PREFIX}/${organisation}` : MEDIA_PREFIX
  return data
}
