import { CollectionAfterChangeHook } from 'payload';
import { User } from '@/types/payload-types';
import { ROLE_USER } from '@/payload/utilities/constants';
import { Users } from '@/payload/collections/Users';

export const userDefaultsAfterCreate: CollectionAfterChangeHook<User> = async ({
  collection,
  doc,
  req,
  operation,
}) => {
  if (collection.slug !== Users.slug) {
    req.payload.logger.warn({ msg: `Skipping defaultsAfterCreate hook for ${collection.slug}` });
  }

  if (operation === 'create') {
    const { roles, organisations, selectedOrganisation } = doc;
    let updatedDoc = doc;

    if (!roles || roles.length === 0) {
      req.payload.logger.info({ msg: 'Setting default role to user' });
      await req.payload.update({
        id: doc.id,
        collection: 'users',
        data: {
          roles: [ROLE_USER],
        },
        req,
      });
    }

    if (!organisations || organisations.length === 0) {
      req.payload.logger.info({ msg: 'Setting default organisation to 1' });
      updatedDoc.organisations = [
        {
          organisation: 1,
          roles: [ROLE_USER],
        },
      ];
      await req.payload.update({
        id: doc.id,
        collection: 'users',
        data: {
          organisations: [
            {
              organisation: 1,
              roles: [ROLE_USER],
            },
          ],
        },
        req,
      });
    }

    if (!selectedOrganisation) {
      req.payload.logger.info({ msg: 'Setting default selected organisation to 1' });
      await req.payload.update({
        id: doc.id,
        collection: 'users',
        data: {
          selectedOrganisation: 1,
        },
        req,
      });
    }
  }
};
