import { Text, View } from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'
import { Company, Project } from '@/types/payload-types'

import { fromToYear, LexicalContent, LexicalPdfRenderer, PdfSectionContext } from '../../lib'
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
  const { cv, headings, isSelected, locale, primaryColor } = ctx
  const { h2, h3 } = headings

  return (
    <Section>
      <Text style={h2}>{I18nCollection.fieldLabel.workExperience[locale]}</Text>

      {(cv.jobHighlights?.length ?? 0) > 0 && (
        <Subsection gap={6}>
          {cv.jobHighlights?.map((item) => (
            <HighlightEntry
              borderColor={primaryColor}
              description={item.description as LexicalContent}
              key={item.id}
              subtitle={fromToYear(locale, item.fromYear, item.toYear)}
              title={(item.company as Company).name}
            />
          ))}
        </Subsection>
      )}

      {(cv.projects?.length ?? 0) > 0 && (
        <Subsection gap={6} heading={I18nCollection.fieldLabel.projects[locale]} headingStyle={h3}>
          {cv.projects?.map((item) => {
            if (!isSelected(`project_${item.id}`)) return null
            const project = item.project as Project
            return (
              <View key={item.id} wrap={false}>
                <Bold mb={0.5}>
                  <OptionalLink name={project.name || ''} url={project.link} />
                </Bold>
                <Small mb={0.5}>{(item.company as Company).name}</Small>
                <Small mb={0.5}>{fromToYear(locale, item.fromYear, item.toYear)}</Small>
                <ContentBlock>
                  {project.description && (
                    <LexicalPdfRenderer content={project.description as LexicalContent} />
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
