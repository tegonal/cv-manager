import type { Style } from '@react-pdf/types'

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
  isSelected: IsSelected
  locale: TypedLocale
  profileImageDataUrl: string
}

// Shared context passed to all PDF section components
export type PdfSectionContext = {
  cv: Cv
  // Headings in the font of the PDF style
  headings: { h1: Style; h2: Style; h3: Style }
  isSelected: IsSelected
  locale: 'de' | 'en'
  primaryColor: string
  secondaryColor: string
  skillLevelDisplay: 'dots' | 'progressBar' | 'text'
}

// Whether a profile field or a project (`project_<id>`) is exported
type IsSelected = (key: string) => boolean
