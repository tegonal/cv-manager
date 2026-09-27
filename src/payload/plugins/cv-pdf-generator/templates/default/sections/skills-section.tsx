import { Text, View } from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'
import { Level, Skill, SkillGroup } from '@/types/payload-types'

import {
  LexicalContent,
  LexicalPdfRenderer,
  PdfSectionContext,
  relationNames,
  styles,
  tw,
} from '../../lib'
import {
  Bold,
  ContentBlock,
  GridCol,
  GridRow,
  HighlightEntry,
  Section,
  SkillLevelDisplay,
  Small,
  Subsection,
} from '../components'

export const SkillsSection: React.FC<{ ctx: PdfSectionContext }> = ({ ctx }) => {
  const { cv, headings, locale, primaryColor, secondaryColor, skillLevelDisplay } = ctx
  const { h2, h3 } = headings

  return (
    <Section>
      <Text style={h2}>{I18nCollection.fieldLabel.skills[locale]}</Text>

      {(cv.skillHighlights?.length ?? 0) > 0 && (
        <Subsection gap={6}>
          {cv.skillHighlights?.map((item) => (
            <HighlightEntry
              borderColor={primaryColor}
              description={item.description as LexicalContent}
              dotColor={secondaryColor}
              key={item.id}
              level={item.level as Level}
              skillLevelDisplay={skillLevelDisplay}
              subtitle={(item.level as Level).level}
              title={(item.skill.value as Skill | SkillGroup).name}
            />
          ))}
        </Subsection>
      )}

      {cv.skillGroups?.map((group) => {
        if (group.skills && group.skills.length < 1) return null
        return (
          <Subsection key={group.id} wrap={false}>
            <ContentBlock>
              <Text style={h3}>{(group.group as SkillGroup).name}</Text>
              {group.skillGroupDescription && (
                <View style={[tw('mb-0.5'), styles.small]}>
                  <LexicalPdfRenderer content={group.skillGroupDescription as LexicalContent} />
                </View>
              )}
            </ContentBlock>
            <GridRow>
              {group.skills?.map((item) => {
                const subSkills = relationNames(item['sub-skill'] ?? [])
                return (
                  <GridCol key={item.id}>
                    <Bold>{(item.skill.value as Skill | SkillGroup).name}</Bold>
                    {item.level && (
                      <SkillLevelDisplay
                        color={secondaryColor}
                        displayMode={skillLevelDisplay}
                        level={item.level as Level}
                      />
                    )}
                    {subSkills.length > 0 && <Small italic>{subSkills.join(', ')}</Small>}
                  </GridCol>
                )
              })}
            </GridRow>
          </Subsection>
        )
      })}

      {(cv.otherSkills?.length ?? 0) > 0 && (
        <Subsection heading={I18nCollection.fieldLabel.otherSkills[locale]} headingStyle={h3}>
          <GridRow>
            {cv.otherSkills?.map((item) => (
              <GridCol key={item.id} wrap={false}>
                <Bold>{item.name}</Bold>
                <SkillLevelDisplay
                  color={secondaryColor}
                  displayMode={skillLevelDisplay}
                  level={item.level as Level}
                />
              </GridCol>
            ))}
          </GridRow>
        </Subsection>
      )}

      {(cv.lang?.length ?? 0) > 0 && (
        <Subsection heading={I18nCollection.fieldLabel.languages[locale]} headingStyle={h3}>
          <GridRow>
            {cv.lang?.map((item) => (
              <GridCol key={item.id} wrap={false}>
                <Bold>{(item.language as Skill).name}</Bold>
                <SkillLevelDisplay
                  color={secondaryColor}
                  displayMode={skillLevelDisplay}
                  level={item.level as Level}
                />
              </GridCol>
            ))}
          </GridRow>
        </Subsection>
      )}
    </Section>
  )
}
