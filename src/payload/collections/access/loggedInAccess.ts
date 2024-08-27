import type { Access } from 'payload';

export const loggedInAccess: Access = ({ req: { user } }) => {
  return Boolean(user);
};
