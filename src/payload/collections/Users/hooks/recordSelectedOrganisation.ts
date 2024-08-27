import { CollectionAfterLoginHook } from 'payload';

export const recordSelectedOrganisation: CollectionAfterLoginHook = async ({ req, user }) => {
  req.payload.logger.info(`Setting selected organisation for user ${user.id}`);
  try {
    let selectedOrgId = user.selectedOrganisation;

    if (!selectedOrgId) {
      req.payload.logger.info({
        msg: `No selected organisation found for user ${user.id}, setting a default`,
      });
      selectedOrgId = user.organisations?.[0]?.organisation;
    }

    if (!selectedOrgId) {
      req.payload.logger.warn({ msg: `No organisations found for user ${user.id}`, user });
      return user;
    }

    await req.payload.update({
      id: user.id,
      collection: 'users',
      data: {
        selectedOrganisation: selectedOrgId || null,
      },
      req,
    });
  } catch (err: unknown) {
    req.payload.logger.error(`Error recording selected organisation for user ${user.id}: ${err}`);
  }

  return user;
};
