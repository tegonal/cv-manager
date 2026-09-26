import { CollectionBeforeChangeHook, Forbidden } from 'payload'

import { hasSuperAdminRole } from '@/payload/access/utils/has-super-admin-role'
import { ORGANISATION_ROLE_ADMIN } from '@/payload/utilities/constants'
import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'
import { User, UserOrganisations } from '@/types/payload-types'

/**
 * Limits what organisation admins can change on users, beyond what access control can express:
 * - super admins can only be changed by themselves or other super admins
 * - email and password can only be changed by the user or a super admin
 * - organisation memberships and roles only in organisations the acting user is admin of
 */
export const guardUserChanges: CollectionBeforeChangeHook<User> = ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  const actor = req.user

  // System operations (seed, OAuth login) and super admins are not restricted
  if (!actor || hasSuperAdminRole(actor)) {
    return data
  }

  if (operation === 'update' && originalDoc && originalDoc.id !== actor.id) {
    const changesCredentials =
      Boolean(data.password) || (data.email !== undefined && data.email !== originalDoc.email)

    if (hasSuperAdminRole(originalDoc) || changesCredentials) {
      throw new Forbidden(req.t)
    }
  }

  if (data.organisations) {
    const administeredOrganisations = (actor.organisations ?? [])
      .filter(({ roles }) => roles.includes(ORGANISATION_ROLE_ADMIN))
      .map(({ organisation }) => getIdFromRelation(organisation))

    // Memberships in organisations the actor does not administer must stay as they are
    const foreignMemberships = (organisations: UserOrganisations = []) =>
      JSON.stringify(
        (organisations ?? [])
          .map(({ organisation, roles }) => ({
            organisation: getIdFromRelation(organisation),
            roles: [...roles].sort(),
          }))
          .filter(({ organisation }) => !administeredOrganisations.includes(organisation))
          .sort((a, b) => String(a.organisation).localeCompare(String(b.organisation))),
      )

    if (foreignMemberships(originalDoc?.organisations) !== foreignMemberships(data.organisations)) {
      throw new Forbidden(req.t)
    }
  }

  return data
}
