import type { TextFieldSingleValidation } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import { text } from 'payload/shared'

import { I18nCollection } from '@/lib/i18n-collection'

const isWebAddress = (value: string) => {
  try {
    const { protocol } = new URL(value)
    return protocol === 'https:' || protocol === 'http:'
  } catch {
    return false
  }
}

/**
 * Accepts complete web addresses only: the PDF prints them as links, which do not work without
 * the protocol (e.g. "github.com/name").
 */
export const validateUrl: TextFieldSingleValidation = (value, args) => {
  if (value && !isWebAddress(value)) {
    return getTranslation(I18nCollection.validation.url, args.req.i18n)
  }
  return text(value, args)
}
