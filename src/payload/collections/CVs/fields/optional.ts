import { Field } from 'payload';

export const optional = (field: Field) => ({
  ...field,
  required: false,
});
