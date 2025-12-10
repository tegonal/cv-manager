/* eslint-disable jsx-a11y/alt-text */
import { Image, View } from '@react-pdf/renderer'
import React from 'react'

import { tw } from '../../lib'

export const CircularImage: React.FC<{
  borderColor?: string
  borderWidth?: number
  size?: number
  src: string
}> = ({ borderColor = '#cccccc', borderWidth = 3, size = 192, src }) => {
  const innerSize = size - borderWidth * 2

  return (
    <View
      style={[
        tw('items-center justify-center overflow-hidden border-solid'),
        {
          borderColor,
          borderRadius: size / 2,
          borderWidth,
          height: size,
          width: size,
        },
      ]}>
      <Image
        src={src}
        style={[
          tw('object-cover'),
          {
            borderRadius: innerSize / 2,
            height: innerSize,
            width: innerSize,
          },
        ]}
      />
    </View>
  )
}
