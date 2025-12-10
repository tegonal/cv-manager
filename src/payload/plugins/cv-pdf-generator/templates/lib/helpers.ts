import { I18nCollection } from '@/lib/i18n-collection'

import { LexicalContent } from './types'

/**
 * Format a date string to a localized date format
 */
export const formatDate = (date: string, locale: string): string => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString(locale)
}

/**
 * Extract just the year from a date string
 */
export const formatYear = (date: string): string => {
  const dateObj = new Date(date)
  return dateObj.getFullYear().toString()
}

/**
 * Format a date range as years (e.g., "2020 - 2023" or "Since 2020")
 */
export const fromToYear = (
  locale: string,
  from?: null | string,
  to?: null | string,
  i18n?: typeof I18nCollection,
): string => {
  if (!from) return ''
  let returnString = formatYear(from)
  if (!to) {
    returnString = `${i18n?.fieldLabel.since[locale as keyof typeof i18n.fieldLabel.since] || 'Since'} ${returnString}`
  } else if (from != to) {
    returnString = `${returnString} - ${formatYear(to)}`
  }
  return returnString
}

/**
 * Filter out empty Lexical nodes (paragraphs with no children)
 */
export const filterEmptyLexicalNodes = (
  data: LexicalContent | null | undefined,
): LexicalContent | null => {
  if (!data?.root) return null
  const filteredChildren = data.root.children.filter((child) => {
    return !('children' in child && Array.isArray(child.children) && child.children.length === 0)
  })
  return {
    root: {
      ...data.root,
      children: filteredChildren,
    },
  }
}

/**
 * Check if Lexical content has any non-empty nodes
 */
export const hasLexicalNodes = (data: LexicalContent | null | undefined): boolean => {
  if (!data?.root?.children) return false
  const filtered = filterEmptyLexicalNodes(data)
  return (filtered?.root?.children?.length ?? 0) > 0
}
