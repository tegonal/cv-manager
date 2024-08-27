import type { FieldAccess } from 'payload';

import { checkUserRoles } from '@/payload/utilities/checkUserRoles';
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation';

export const organisationFieldAdminAccess: FieldAccess = ({ req: { user }, doc }) => {
  if (checkUserRoles([ROLE_SUPER_ADMIN], user)) {
    return true;
  }

  if (!doc?.organisation) {
    return false;
  }

  for (const userOrg of user?.organisations || []) {
    const userOrgId = getIdFromRelation(userOrg.organisation);
    const docOrgId = getIdFromRelation(doc?.organisation);

    if (userOrgId === docOrgId && userOrg.roles?.includes(ROLE_SUPER_ADMIN)) {
      return true;
    }
  }

  return false;
};
