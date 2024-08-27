import { Access } from 'payload/config';

export const isAdminOrOwnUser: Access = ({ req: { user } }) => {
  if (user && user.role === 'admin') {
    return true;
  }

  if (user) {
    return {
      id: {
        equals: user.id,
      },
    };
  }

  return false;
};
