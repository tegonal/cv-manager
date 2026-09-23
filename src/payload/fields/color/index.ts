import type { TextField, TextFieldSingleValidation } from 'payload'

import { text } from 'payload/shared'

import { HEX_COLOR_REGEX } from './hex-color'

const validateHexColor: TextFieldSingleValidation = (value, args) => {
  if (value && !HEX_COLOR_REGEX.test(value)) {
    return args.req.t('validation:invalidInput')
  }
  return text(value, args)
}

type ColorFieldArgs = Omit<SingleTextField, 'hasMany' | 'type' | 'validate'>

type SingleTextField = Extract<TextField, { hasMany?: false }>

/**
 * Text field storing a hex color (e.g. `#64748b`), edited with a native color picker.
 */
export const colorField = ({ admin, ...field }: ColorFieldArgs): SingleTextField => ({
  ...field,
  admin: {
    ...admin,
    components: {
      ...admin?.components,
      Field: '/src/payload/fields/color/color-field.tsx#ColorField',
    },
  },
  type: 'text',
  validate: validateHexColor,
})
