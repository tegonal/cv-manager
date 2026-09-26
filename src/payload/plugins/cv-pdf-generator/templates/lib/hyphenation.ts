import type { HyphenationOptions } from 'hyphen'

import { Font } from '@react-pdf/renderer'
import hyphenDE from 'hyphen/de'
import hyphenEN from 'hyphen/en'
import { AsyncLocalStorage } from 'node:async_hooks'

const { hyphenateSync: hyphenateDE } = hyphenDE
const { hyphenateSync: hyphenateEN } = hyphenEN

// Soft hyphen character used by the hyphen library
const SOFT_HYPHEN = '­'

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

    // The patterns work on lowercase words, the syllables are cut from the original word at the
    // same positions to keep its casing
    const lowerWord = word.toLowerCase()
    if (lowerWord.length !== word.length) {
      return [word]
    }

    try {
      let offset = 0
      return hyphenate(lowerWord, HYPHENATION_OPTIONS)
        .split(SOFT_HYPHEN)
        .map((syllable) => word.slice(offset, (offset += syllable.length)))
    } catch {
      // Fallback: return word as-is (no hyphenation)
      return [word]
    }
  }
}

const hyphenationCallbacks: Record<string, (word: string) => string[]> = {
  de: createHyphenationCallback('de'),
  en: createHyphenationCallback('en'),
}

// Locale of the PDF being rendered. react-pdf only has a process-wide hyphenation callback, and
// PDFs in different locales can be rendered at the same time.
const renderLocale = new AsyncLocalStorage<string>()

Font.registerHyphenationCallback((word) =>
  (hyphenationCallbacks[renderLocale.getStore() ?? 'en'] ?? hyphenationCallbacks.en)(word),
)

/**
 * Runs a PDF render with hyphenation for the given locale.
 */
export const withHyphenationLocale = <T>(locale: string, render: () => Promise<T>): Promise<T> =>
  renderLocale.run(locale, render)
