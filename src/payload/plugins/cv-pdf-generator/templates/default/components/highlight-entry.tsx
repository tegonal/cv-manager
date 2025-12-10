import { Text, View } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types'
import React from 'react'

import { Level } from '@/types/payload-types'

import { LexicalContent, LexicalPdfRenderer, tw } from '../../lib'
import { DotRating } from './dot-rating'
import { HighlightIcon } from './highlight-icon'
import { ProgressBar } from './progress-bar'

export const HighlightEntry: React.FC<{
  borderColor?: string
  description?: LexicalContent | null
  dotColor?: string
  highlightIconStyle: Style
  highlightStyle: Style
  level?: Level | null
  skillLevelDisplay?: 'dots' | 'progressBar' | 'text'
  smallStyle: Style
  subtitle?: null | string
  title?: null | string
}> = ({
  borderColor = '#64748b',
  description,
  dotColor,
  highlightIconStyle,
  highlightStyle,
  level,
  skillLevelDisplay = 'text',
  smallStyle,
  subtitle,
  title,
}) => (
  <View style={[highlightStyle, { borderLeftColor: borderColor }]} wrap={false}>
    <Text style={tw('font-bold pr-8')}>{title}</Text>
    {level && (skillLevelDisplay === 'dots' || skillLevelDisplay === 'progressBar') ? (
      <View style={tw('pr-8')}>
        {skillLevelDisplay === 'dots' ? (
          <DotRating color={dotColor} filled={level.points || 0} total={5} />
        ) : (
          <ProgressBar color={dotColor} filled={level.points || 0} total={5} />
        )}
      </View>
    ) : (
      <Text style={[smallStyle, tw('pr-8')]}>{subtitle}</Text>
    )}
    {description && <LexicalPdfRenderer content={description} />}
    <HighlightIcon style={highlightIconStyle} />
  </View>
)
