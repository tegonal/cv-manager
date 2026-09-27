import { Text } from '@react-pdf/renderer'
import React from 'react'

import { Level } from '@/types/payload-types'

import { styles, tw } from '../../lib'
import { DotRating } from './dot-rating'
import { ProgressBar } from './progress-bar'

export const SkillLevelDisplay: React.FC<{
  color?: string
  displayMode: 'dots' | 'progressBar' | 'text'
  level: Level
}> = ({ color, displayMode, level }) => {
  if (displayMode === 'dots') {
    return <DotRating color={color} filled={level.points || 0} />
  }
  if (displayMode === 'progressBar') {
    return <ProgressBar color={color} filled={level.points || 0} />
  }
  return <Text style={[tw('italic'), styles.small]}>{level.level}</Text>
}
