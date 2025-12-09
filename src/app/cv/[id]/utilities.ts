import { TypedLocale } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { PayloadLexicalReactRendererContent } from '@/payload/utilities/lexical-render/src/payload-lexical-react-renderer'

export const formatDate = (date: string, locale: string) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString(locale)
}

export const formatYear = (date: string) => {
  const dateObj = new Date(date)
  return dateObj.getFullYear().toString()
}

export const fromToYear = (locale: TypedLocale, from?: null | string, to?: null | string) => {
  if (!from) return ''
  let returnString = formatYear(from)
  if (!to) {
    returnString = `${I18nCollection.fieldLabel.since[locale]} ${returnString}`
  } else if (from != to) {
    returnString = `${returnString} - ${formatYear(to)}`
  }
  return returnString
}

// Recursively check nodes of lexical content that have empty children
export const filterEmptyLexicalNodes = (data: PayloadLexicalReactRendererContent) => {
  if (data.root.children.length > 0) {
    data.root.children = data.root.children.filter((child) => {
      return !('children' in child && child.children.length === 0)
    })
  }
  return data
}

export const hasLexicalNodes = (data: PayloadLexicalReactRendererContent) => {
  if (!data) return false
  const filtered = filterEmptyLexicalNodes(data)
  return filtered.root.children.length > 0
}
