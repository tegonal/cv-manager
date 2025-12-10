import { Text, View } from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'
import { Company, Project } from '@/types/payload-types'

import {
  createHeadingStyles,
  fromToYear,
  LexicalContent,
  LexicalPdfRenderer,
  PdfSectionContext,
  styles,
} from '../../lib'
import {
  Bold,
  ContentBlock,
  HighlightEntry,
  OptionalLink,
  Section,
  Small,
  Subsection,
} from '../components'

export const WorkExperienceSection: React.FC<{ ctx: PdfSectionContext }> = ({ ctx }) => {
  const { cv, exportOverride, fontFamily, locale, primaryColor } = ctx
  const { h2, h3 } = createHeadingStyles(fontFamily)

  return (
    <Section>
      <Text style={h2}>{I18nCollection.fieldLabel.workExperience[locale]}</Text>

      {(cv.jobHighlights?.length ?? 0) > 0 && (
        <Subsection gap={6}>
          {cv.jobHighlights?.map((item) => (
            <HighlightEntry
              borderColor={primaryColor}
              description={item.description as LexicalContent}
              highlightIconStyle={styles.highlightIcon}
              highlightStyle={styles.highlight}
              key={item.id}
              smallStyle={styles.small}
              subtitle={fromToYear(locale, item.fromYear, item.toYear, I18nCollection)}
              title={(item.company as Company).name}
            />
          ))}
        </Subsection>
      )}

      {(cv.projects?.length ?? 0) > 0 && (
        <Subsection gap={6} heading={I18nCollection.fieldLabel.projects[locale]} headingStyle={h3}>
          {cv.projects?.map((item) => {
            const projectKey = `project_${item.id}`
            if (projectKey in exportOverride && !exportOverride[projectKey]) return null
            return (
              <View key={item.id} wrap={false}>
                <Bold mb={0.5}>
                  <OptionalLink
                    name={(item.project as Project).name || ''}
                    url={(item.project as Project).link}
                  />
                </Bold>
                <Small mb={0.5}>{(item.company as Company).name}</Small>
                <Small mb={0.5}>
                  {fromToYear(locale, item.fromYear, item.toYear, I18nCollection)}
                </Small>
                <ContentBlock>
                  {(item.project as Project).description && (
                    <LexicalPdfRenderer
                      content={(item.project as Project).description as LexicalContent}
                    />
                  )}
                  <LexicalPdfRenderer content={item.description as LexicalContent} />
                </ContentBlock>
              </View>
            )
          })}
        </Subsection>
      )}
    </Section>
  )
}
