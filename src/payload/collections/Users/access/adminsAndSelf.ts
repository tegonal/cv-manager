import type { Access, AccessResult } from 'payload';

import { isAdmin } from '@/payload/utilities/isAdmin';
import { User } from '@/types/payload-types';
import { getIdFromRelation } from '@/payload/utilities/getIdFromRelation';

export const adminsAndSelf: Access<User> = async ({ req: { user } }): Promise<AccessResult> => {
  if (!user) return false;
  const isSuper = isAdmin(user);

  // allow super-admins through only if they have not scoped their user via `selectedOrganisation`
  if (isSuper && !user?.selectedOrganisation) {
    return true;
  }

  if (!isSuper) {
    return {
      id: {
        equals: user.id,
      },
    };
  }

  // allow users to read themselves and any users within the isCurrentlySelectedOrganisationAccess they are admins of
  return {
    or: [
      {
        id: {
          equals: user.id,
        },
      },
      {
        'organisations.organisation': {
          in: [getIdFromRelation(user.selectedOrganisation)].filter(
            (id): id is string | number => id !== null,
          ),
        },
      },
      // : user?.organisations
      //     ?.map(({ organisation, roles }) =>
      //       roles.includes(ROLE_SUPER_ADMIN) ? getIdFromRelation(organisation) : null,
      //     )
      //     .filter((id): id is string | number => id !== null)
      //     .map((id) => ({
      //       'organisations.organisation': {
      //         in: [id],
      //       },
      //     })) || []),
    ],
  };
};
