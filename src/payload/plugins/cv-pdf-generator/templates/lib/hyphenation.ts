import type { HyphenationOptions } from 'hyphen'

import { Font } from '@react-pdf/renderer'
import hyphenDE from 'hyphen/de'
import hyphenEN from 'hyphen/en'

const { hyphenateSync: hyphenateDE } = hyphenDE
const { hyphenateSync: hyphenateEN } = hyphenEN

// Soft hyphen character used by the hyphen library
const SOFT_HYPHEN = '\u00AD'

// Hyphenation options
const HYPHENATION_OPTIONS: HyphenationOptions = {
  hyphenChar: SOFT_HYPHEN,
  minWordLength: 5,
}

// Map locales to hyphenation functions
const hyphenators: Record<string, (text: string, options?: HyphenationOptions) => string> = {
  de: hyphenateDE,
  en: hyphenateEN,
}

// Track current locale for hyphenation
let currentHyphenationLocale: string = 'en'

/**
 * Create hyphenation callback for a given locale.
 */
export const createHyphenationCallback = (locale: string) => {
  const hyphenate = hyphenators[locale] || hyphenators['en']

  return (word: string): string[] => {
    // Skip very short words
    if (word.length < HYPHENATION_OPTIONS.minWordLength!) {
      return [word]
    }

    try {
      const lowerWord = word.toLowerCase()
      const hyphenated = hyphenate(lowerWord, HYPHENATION_OPTIONS)
      const syllables = hyphenated.split(SOFT_HYPHEN)

      // Restore original casing for first syllable if word was capitalized
      if (word[0] === word[0].toUpperCase() && syllables.length > 0) {
        syllables[0] = word[0] + syllables[0].slice(1)
      }

      return syllables
    } catch {
      // Fallback: return word as-is (no hyphenation)
      return [word]
    }
  }
}

/**
 * Disable hyphenation callback - returns word as-is without any breaks.
 */
export const createNoHyphenationCallback = () => {
  return (word: string): string[] => [word]
}

// Register default English hyphenation at module load
Font.registerHyphenationCallback(createHyphenationCallback('en'))

/**
 * Register hyphenation callback for a specific locale.
 * Call this before rendering a PDF to ensure correct hyphenation.
 */
export const registerHyphenation = (locale: string): void => {
  // Only re-register if locale changed
  if (currentHyphenationLocale === locale) {
    return
  }

  currentHyphenationLocale = locale
  Font.registerHyphenationCallback(createHyphenationCallback(locale))
}

/**
 * Disable hyphenation globally.
 */
export const disableHyphenation = (): void => {
  Font.registerHyphenationCallback(createNoHyphenationCallback())
}
