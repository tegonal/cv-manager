import type { FieldAccess } from 'payload'

import { checkUserRoles } from '@/payload/access/utils/check-user-roles'
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants'
import { User } from '@/types/payload-types'

import { checkOrganisationRoles } from './utils/check-organisation-roles'

export const isOrganisationAdminFieldAccess: FieldAccess<User> = async ({ doc, req: { user } }) => {
  return !!(
    checkUserRoles([ROLE_SUPER_ADMIN], user) ||
    doc?.organisations?.some(({ organisation }) => {
      if (typeof organisation !== 'number') {
        throw new Error('organisationAdmins: The organisation ID must be a number')
      }
      return checkOrganisationRoles([ROLE_SUPER_ADMIN], user, organisation)
    })
  )
}
