import { Text, View } from '@react-pdf/renderer'
import React from 'react'

import { Level } from '@/types/payload-types'

import { LexicalContent, LexicalPdfRenderer, styles, tw } from '../../lib'
import { HighlightIcon } from './highlight-icon'
import { SkillLevelDisplay } from './skill-level-display'

export const HighlightEntry: React.FC<{
  borderColor?: string
  description?: LexicalContent | null
  dotColor?: string
  level?: Level | null
  skillLevelDisplay?: 'dots' | 'progressBar' | 'text'
  subtitle?: null | string
  title?: null | string
}> = ({
  borderColor = '#64748b',
  description,
  dotColor,
  level,
  skillLevelDisplay = 'text',
  subtitle,
  title,
}) => (
  <View style={[styles.highlight, { borderLeftColor: borderColor }]} wrap={false}>
    <Text style={tw('font-bold pr-8')}>{title}</Text>
    {/* The level is shown as dots or a bar, the text display shows the subtitle instead */}
    {level && skillLevelDisplay !== 'text' ? (
      <View style={tw('pr-8')}>
        <SkillLevelDisplay color={dotColor} displayMode={skillLevelDisplay} level={level} />
      </View>
    ) : (
      <Text style={[styles.small, tw('pr-8')]}>{subtitle}</Text>
    )}
    {description && <LexicalPdfRenderer content={description} />}
    <HighlightIcon style={styles.highlightIcon} />
  </View>
)
