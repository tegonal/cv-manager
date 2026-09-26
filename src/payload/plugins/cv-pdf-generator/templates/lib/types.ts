import { TypedLocale } from 'payload'

import { CompanyInfo, Cv, PdfStyle } from '@/types/payload-types'

import { LexicalContent } from './lexical-types'

// Re-export for convenience
export type { LexicalContent }

// Combined data from CompanyInfo and PdfStyle globals for PDF rendering
export type CompanyInfoData = Omit<CompanyInfo, 'id' | 'updatedAt'> &
  Omit<PdfStyle, 'id' | 'logo' | 'updatedAt'> & {
    logoDataUrl: string
    logoHeight?: number
  }

export type CvPdfTemplateProps = {
  companyInfo: CompanyInfoData
  cv: Cv
  exportOverride: Record<string, boolean>
  hasOverride: (key: string) => boolean
  locale: TypedLocale
  profileImageDataUrl: string
}

// Shared context passed to all PDF section components
export type PdfSectionContext = {
  cv: Cv
  exportOverride: Record<string, boolean>
  fontFamily: string
  hasOverride: (key: string) => boolean
  locale: 'de' | 'en'
  primaryColor: string
  secondaryColor: string
  skillLevelDisplay: 'dots' | 'progressBar' | 'text'
}
