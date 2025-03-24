import { FieldHook } from 'payload'

export const beforeChangeHook: FieldHook = async ({ req, req: { user } }) => {
  if (!user || !req.user) return undefined
  return user.id
}
