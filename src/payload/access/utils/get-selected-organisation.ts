import { hasSuperAdminRole } from '@/payload/access/utils/has-super-admin-role'
import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'
import { User } from '@/types/payload-types'

/**
 * The organisation the user works in: the selected organisation, as long as the user is still a
 * member of it. Super admins can select any organisation.
 */
export const getSelectedOrganisation = (user: null | undefined | User): null | number => {
  const selectedOrganisation = getIdFromRelation(user?.selectedOrganisation)

  if (!user || typeof selectedOrganisation !== 'number') {
    return null
  }

  if (hasSuperAdminRole(user)) {
    return selectedOrganisation
  }

  const isMember = user.organisations?.some(
    ({ organisation }) => getIdFromRelation(organisation) === selectedOrganisation,
  )
  return isMember ? selectedOrganisation : null
}
