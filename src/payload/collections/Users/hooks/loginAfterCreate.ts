import { CollectionAfterChangeHook } from 'payload';

export const loginAfterCreate: CollectionAfterChangeHook = async ({
  doc,
  req,
  req: { payload, body = {} },
  operation,
}) => {
  if (operation === 'create' && !req.user) {
    const { email, password } = body as any;

    console.log(body);

    if (email && password) {
      const { user, token } = await payload.login({
        collection: 'users',
        data: { email, password },
        req,
      });

      return {
        ...doc,
        token,
        user,
      };
    }
  }

  return doc;
};
