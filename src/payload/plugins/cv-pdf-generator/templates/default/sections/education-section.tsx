import { Text } from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'

import {
  createHeadingStyles,
  formatYear,
  fromToYear,
  LexicalContent,
  LexicalPdfRenderer,
  PdfSectionContext,
  styles,
} from '../../lib'
import {
  Bold,
  Grid2Col,
  Grid2Cols,
  HighlightEntry,
  Section,
  Small,
  Subsection,
} from '../components'

export const EducationSection: React.FC<{ ctx: PdfSectionContext }> = ({ ctx }) => {
  const { cv, fontFamily, locale, primaryColor } = ctx
  const { h2, h3 } = createHeadingStyles(fontFamily)

  return (
    <Section mt={8}>
      <Text style={h2}>{I18nCollection.fieldLabel.education[locale]}</Text>

      {(cv.eduHighlights?.length ?? 0) > 0 && (
        <Subsection gap={4}>
          {cv.eduHighlights?.map((item) => (
            <HighlightEntry
              borderColor={primaryColor}
              description={item.description as LexicalContent}
              highlightIconStyle={styles.highlightIcon}
              highlightStyle={styles.highlight}
              key={item.id}
              smallStyle={styles.small}
              subtitle={fromToYear(locale, item.fromYear, item.toYear, I18nCollection)}
              title={item.title}
            />
          ))}
        </Subsection>
      )}

      {(cv.edu?.length ?? 0) > 0 && (
        <Grid2Cols>
          {cv.edu?.map((item) => (
            <Grid2Col key={item.id} wrap={false}>
              <Bold>{item.institution}</Bold>
              <Small>{fromToYear(locale, item.fromYear, item.toYear, I18nCollection)}</Small>
              <LexicalPdfRenderer content={item.description as LexicalContent} />
            </Grid2Col>
          ))}
        </Grid2Cols>
      )}

      {(cv.certs?.length ?? 0) > 0 && (
        <Subsection heading={I18nCollection.fieldLabel.certifications[locale]} headingStyle={h3}>
          <Grid2Cols>
            {cv.certs?.map((item) => (
              <Grid2Col key={item.id} wrap={false}>
                <Bold>{item.name}</Bold>
                <Small>{formatYear(item.toYear)}</Small>
                <LexicalPdfRenderer content={item.description as LexicalContent} />
              </Grid2Col>
            ))}
          </Grid2Cols>
        </Subsection>
      )}
    </Section>
  )
}
