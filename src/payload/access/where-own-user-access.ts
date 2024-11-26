import { Access, AccessResult } from 'payload';

export const whereOwnUserAccess: Access = ({ req: { user } }): AccessResult => {
  const userId = user?.id;
  if (!userId) return false;
  return {
    id: {
      equals: userId,
    },
  };
};
