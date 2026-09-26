import type { FieldAccess } from 'payload'

import { checkUserRoles } from '@/payload/access/utils/check-user-roles'
import { ORGANISATION_ROLE_ADMIN, ROLE_SUPER_ADMIN } from '@/payload/utilities/constants'
import { getIdFromRelation } from '@/payload/utilities/get-id-from-relation'
import { User } from '@/types/payload-types'

import { checkOrganisationRoles } from './utils/check-organisation-roles'

// Super admins, and admins of one of the organisations of the user document
export const isOrganisationAdminFieldAccess: FieldAccess<User> = ({ doc, req: { user } }) =>
  checkUserRoles([ROLE_SUPER_ADMIN], user) ||
  Boolean(
    // The organisation relation is populated when the user is read with depth (e.g. by the admin UI)
    doc?.organisations?.some(({ organisation }) => {
      const organisationId = getIdFromRelation(organisation)
      return (
        typeof organisationId === 'number' &&
        checkOrganisationRoles([ORGANISATION_ROLE_ADMIN], user, organisationId)
      )
    }),
  )
