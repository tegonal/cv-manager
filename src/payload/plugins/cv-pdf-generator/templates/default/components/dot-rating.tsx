import { View } from '@react-pdf/renderer'
import React from 'react'

import { tw } from '../../lib'

export const DotRating: React.FC<{
  color?: string
  filled: number
  total?: number
}> = ({ color = '#4d4d4d', filled, total = 5 }) => {
  const DOT_SIZE = 4.5

  return (
    <View style={tw('flex flex-row gap-0.5')}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            tw('rounded-full'),
            {
              backgroundColor: index < filled ? color : '#ffffff',
              borderColor: color,
              borderWidth: 0.25,
              height: DOT_SIZE,
              width: DOT_SIZE,
            },
          ]}
        />
      ))}
    </View>
  )
}
