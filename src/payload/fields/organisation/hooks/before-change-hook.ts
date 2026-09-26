import { FieldHook, ValidationError } from 'payload'

import { getSelectedOrganisation } from '@/payload/access/utils/get-selected-organisation'
import { hasSuperAdminRole } from '@/payload/access/utils/has-super-admin-role'

// Records belong to the organisation the user works in, super admins can choose another one
export const beforeChangeHook: FieldHook = ({ collection, data, path, req: { t, user } }) => {
  // System operations (seed, migrations) keep the organisation they set
  if (!user) return undefined

  if (hasSuperAdminRole(user) && data?.organisation) {
    return data.organisation
  }

  const selectedOrganisation = getSelectedOrganisation(user)

  if (!selectedOrganisation) {
    throw new ValidationError(
      {
        collection: collection?.slug,
        errors: [
          { message: 'Select the organisation this record belongs to', path: path.join('.') },
        ],
      },
      t,
    )
  }

  return selectedOrganisation
}
