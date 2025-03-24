import type { Field } from 'payload'
import { beforeChangeHook } from '@/payload/fields/organisation/hooks/beforeChangeHook'
import { organisationFieldAdminAccess } from '@/payload/fields/created-by/access/admin'
import { checkUserRoles } from '@/payload/access/utils/checkUserRoles'
import { checkOrganisationRoles } from '@/payload/access/utils/checkOrganisationRoles'
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation'
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants'

export const organisationField: Field = {
  name: 'organisation',
  type: 'relationship',
  relationTo: 'organisations',
  // don't require this field because we need to auto-populate it, see below
  // required: true,
  // we also don't want to hide this field because super-admins may need to manage it
  // to achieve this, create a custom component that conditionally renders the field based on the user's role
  // hidden: true,
  index: true,
  admin: {
    description:
      "The organisation this record belongs to. It is set automatically based on the user's role and his or her selected organisation while creating a new record.",
    condition: (a, b, { user }) => {
      if (checkUserRoles([ROLE_SUPER_ADMIN], user)) return true
      const selectedOrganisation = getIdFromRelation(user?.selectedOrganisation)
      if (selectedOrganisation) {
        if (checkOrganisationRoles([ROLE_SUPER_ADMIN], user, selectedOrganisation as number)) {
          return true
        }
      }
      return false
    },
  },
  access: {
    // create: superAdminFieldAccess,
    // read: organisationFieldAdminAccess,
    update: organisationFieldAdminAccess,
  },
  hooks: {
    // automatically set the organisation to the last logged in organisation
    // for super admins, allow them to set the organisation
    beforeChange: [beforeChangeHook],
  },
}
