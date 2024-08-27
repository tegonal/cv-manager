import type { Access } from 'payload';

import { isAdmin } from '@/payload/utilities/isAdmin';
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation';

// the user must be an admin of the organisation being accessed
export const organisationAdmins: Access = ({ req: { user } }) => {
  if (isAdmin(user)) {
    return true;
  }

  return {
    id: {
      in:
        user?.organisations
          ?.map(({ organisation, roles }) =>
            roles.includes(ROLE_SUPER_ADMIN) ? getIdFromRelation(organisation) : null,
          ) // eslint-disable-line function-paren-newline
          .filter(Boolean) || [],
    },
  };
};
