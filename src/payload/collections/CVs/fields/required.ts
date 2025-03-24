import { Field } from 'payload'

export const required = (field: Field) => ({
  ...field,
  required: true,
})
