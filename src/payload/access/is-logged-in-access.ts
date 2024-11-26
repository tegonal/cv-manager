import type { Access } from 'payload';

export const isLoggedInAccess: Access = ({ req: { user } }) => {
  return Boolean(user);
};
