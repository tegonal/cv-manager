import { Text, View } from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'
import { Level, Skill, SkillGroup } from '@/types/payload-types'

import {
  createHeadingStyles,
  LexicalContent,
  LexicalPdfRenderer,
  PdfSectionContext,
  styles,
  tw,
} from '../../lib'
import {
  Bold,
  ContentBlock,
  Grid3Cols,
  GridCol,
  HighlightEntry,
  Section,
  SkillLevelDisplay,
  Small,
  Subsection,
} from '../components'

export const SkillsSection: React.FC<{ ctx: PdfSectionContext }> = ({ ctx }) => {
  const { cv, fontFamily, locale, primaryColor, secondaryColor, skillLevelDisplay } = ctx
  const { h2, h3 } = createHeadingStyles(fontFamily)

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
              highlightIconStyle={styles.highlightIcon}
              highlightStyle={styles.highlight}
              key={item.id}
              level={item.level as Level}
              skillLevelDisplay={skillLevelDisplay}
              smallStyle={styles.small}
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
            <Grid3Cols>
              {group.skills?.map((item) => (
                <GridCol key={item.id}>
                  <Bold>{(item.skill.value as Skill | SkillGroup).name}</Bold>
                  {item.level && (
                    <SkillLevelDisplay
                      color={secondaryColor}
                      displayMode={skillLevelDisplay}
                      level={item.level as Level}
                    />
                  )}
                  {(item['sub-skill']?.length ?? 0) > 0 && (
                    <Small italic>
                      {item['sub-skill']?.map((i) => (i as Skill).name).join(', ')}
                    </Small>
                  )}
                </GridCol>
              ))}
            </Grid3Cols>
          </Subsection>
        )
      })}

      {(cv.otherSkills?.length ?? 0) > 0 && (
        <Subsection heading={I18nCollection.fieldLabel.otherSkills[locale]} headingStyle={h3}>
          <Grid3Cols>
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
          </Grid3Cols>
        </Subsection>
      )}

      {(cv.lang?.length ?? 0) > 0 && (
        <Subsection heading={I18nCollection.fieldLabel.languages[locale]} headingStyle={h3}>
          <Grid3Cols>
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
          </Grid3Cols>
        </Subsection>
      )}
    </Section>
  )
}
