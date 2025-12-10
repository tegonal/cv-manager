import { Text, View } from '@react-pdf/renderer'
import React from 'react'

import type { LexicalContent } from './types'

import { LexicalPdfRenderer, tw } from '../../lib'
import { CircularImage } from '../components'
import { FirstPageProps } from './types'

export const FirstPageCentered: React.FC<FirstPageProps> = ({
  cv,
  h1Style,
  primaryColor,
  profileImageDataUrl,
  styles,
}) => {
  return (
    <View style={tw('flex flex-col gap-16 items-center justify-center flex-1')}>
      <View style={tw('flex flex-col gap-16 items-center')}>
        <View style={tw('flex flex-col gap-4 items-center')}>
          <Text style={h1Style}>{cv.fullName}</Text>
          <Text>{cv.jobTitle}</Text>
        </View>

        {profileImageDataUrl && (
          <CircularImage
            borderColor={primaryColor}
            borderWidth={3}
            size={192}
            src={profileImageDataUrl}
          />
        )}
      </View>

      <View
        style={[
          styles.lead,
          tw('flex flex-col gap-1 text-center items-center'),
          { width: '66.67%' },
        ]}>
        <LexicalPdfRenderer content={cv.introduction as LexicalContent} />
      </View>
    </View>
  )
}
