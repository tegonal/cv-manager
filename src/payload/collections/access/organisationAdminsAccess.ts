import { checkUserRoles } from '@/payload/utilities/checkUserRoles';
import { ROLE_SUPER_ADMIN } from '@/payload/utilities/constants';
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation';
import { Access } from 'payload';
import { User } from '@/types/payload-types';

// the user must be an admin of the document's organisation
export const organisationAdminsAccess: Access<User> = ({ req: { user } }) => {
  if (checkUserRoles([ROLE_SUPER_ADMIN], user)) {
    return true;
  }

  return {
    organisation: {
      in:
        user?.organisations
          ?.map(({ organisation, roles }) =>
            roles.includes(ROLE_SUPER_ADMIN) ? getIdFromRelation(organisation) : null,
          ) // eslint-disable-line function-paren-newline
          .filter(Boolean) || [],
    },
  };
};
