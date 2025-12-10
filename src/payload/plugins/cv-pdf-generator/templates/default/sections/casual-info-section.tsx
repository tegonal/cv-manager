import { Text } from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'

import {
  createHeadingStyles,
  filterEmptyLexicalNodes,
  hasLexicalNodes,
  LexicalContent,
  LexicalPdfRenderer,
  PdfSectionContext,
} from '../../lib'
import { ContentBlock, Section } from '../components'

export const CasualInfoSection: React.FC<{ ctx: PdfSectionContext }> = ({ ctx }) => {
  const { cv, fontFamily, hasOverride, locale } = ctx

  if (!hasLexicalNodes(cv.casualInfo as LexicalContent) || !hasOverride('casualInfo')) {
    return null
  }

  const { h2 } = createHeadingStyles(fontFamily)

  return (
    <Section gap={4} mt={12} wrap={false}>
      <Text style={h2}>{I18nCollection.fieldLabel.casualInfo[locale]}</Text>
      <ContentBlock>
        <LexicalPdfRenderer content={filterEmptyLexicalNodes(cv.casualInfo as LexicalContent)!} />
      </ContentBlock>
    </Section>
  )
}
