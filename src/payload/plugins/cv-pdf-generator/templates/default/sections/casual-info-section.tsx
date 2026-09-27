import { Text } from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'

import {
  filterEmptyLexicalNodes,
  hasLexicalNodes,
  LexicalContent,
  LexicalPdfRenderer,
  PdfSectionContext,
} from '../../lib'
import { ContentBlock, Section } from '../components'

export const CasualInfoSection: React.FC<{ ctx: PdfSectionContext }> = ({ ctx }) => {
  const { cv, headings, isSelected, locale } = ctx
  const casualInfo = cv.casualInfo as LexicalContent

  if (!hasLexicalNodes(casualInfo) || !isSelected('casualInfo')) {
    return null
  }

  return (
    <Section gap={4} mt={12} wrap={false}>
      <Text style={headings.h2}>{I18nCollection.fieldLabel.casualInfo[locale]}</Text>
      <ContentBlock>
        <LexicalPdfRenderer content={filterEmptyLexicalNodes(casualInfo)!} />
      </ContentBlock>
    </Section>
  )
}
