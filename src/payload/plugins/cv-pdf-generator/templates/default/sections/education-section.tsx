import { Text } from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'

import {
  formatYear,
  fromToYear,
  LexicalContent,
  LexicalPdfRenderer,
  PdfSectionContext,
} from '../../lib'
import { Bold, Grid2Col, GridRow, HighlightEntry, Section, Small, Subsection } from '../components'

export const EducationSection: React.FC<{ ctx: PdfSectionContext }> = ({ ctx }) => {
  const { cv, headings, locale, primaryColor } = ctx
  const { h2, h3 } = headings

  return (
    <Section mt={8}>
      <Text style={h2}>{I18nCollection.fieldLabel.education[locale]}</Text>

      {(cv.eduHighlights?.length ?? 0) > 0 && (
        <Subsection gap={4}>
          {cv.eduHighlights?.map((item) => (
            <HighlightEntry
              borderColor={primaryColor}
              description={item.description as LexicalContent}
              key={item.id}
              subtitle={fromToYear(locale, item.fromYear, item.toYear)}
              title={item.title}
            />
          ))}
        </Subsection>
      )}

      {(cv.edu?.length ?? 0) > 0 && (
        <GridRow>
          {cv.edu?.map((item) => (
            <Grid2Col key={item.id} wrap={false}>
              <Bold>{item.institution}</Bold>
              <Small>{fromToYear(locale, item.fromYear, item.toYear)}</Small>
              <LexicalPdfRenderer content={item.description as LexicalContent} />
            </Grid2Col>
          ))}
        </GridRow>
      )}

      {(cv.certs?.length ?? 0) > 0 && (
        <Subsection heading={I18nCollection.fieldLabel.certifications[locale]} headingStyle={h3}>
          <GridRow>
            {cv.certs?.map((item) => (
              <Grid2Col key={item.id} wrap={false}>
                <Bold>{item.name}</Bold>
                <Small>{formatYear(item.toYear)}</Small>
                <LexicalPdfRenderer content={item.description as LexicalContent} />
              </Grid2Col>
            ))}
          </GridRow>
        </Subsection>
      )}
    </Section>
  )
}
