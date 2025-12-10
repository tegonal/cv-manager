import { View } from '@react-pdf/renderer'
import React from 'react'

import { tw } from '../../lib'

export const ProgressBar: React.FC<{
  color?: string
  filled: number
  total?: number
}> = ({ color = '#4d4d4d', filled, total = 5 }) => {
  const BAR_WIDTH = 40
  const BAR_HEIGHT = 6
  const BORDER_RADIUS = BAR_HEIGHT / 2
  const fillPercentage = Math.min(filled / total, 1)

  return (
    <View
      style={[
        tw('overflow-hidden'),
        {
          backgroundColor: '#e5e7eb',
          borderRadius: BORDER_RADIUS,
          height: BAR_HEIGHT,
          width: BAR_WIDTH,
        },
      ]}>
      <View
        style={{
          backgroundColor: color,
          borderRadius: BORDER_RADIUS,
          height: BAR_HEIGHT,
          width: BAR_WIDTH * fillPercentage,
        }}
      />
    </View>
  )
}
