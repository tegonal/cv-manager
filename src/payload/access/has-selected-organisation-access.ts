import type { Access } from 'payload'

import { getSelectedOrganisation } from '@/payload/access/utils/get-selected-organisation'
import { hasSuperAdminRole } from '@/payload/access/utils/has-super-admin-role'

// For creating organisation records: the record is assigned to the organisation the user works in
export const hasSelectedOrganisationAccess: Access = ({ req: { user } }) =>
  Boolean(user && (hasSuperAdminRole(user) || getSelectedOrganisation(user)))
