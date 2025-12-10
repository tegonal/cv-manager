import { Text, View } from '@react-pdf/renderer'
import React from 'react'

import type { LexicalContent } from './types'

import { LexicalPdfRenderer, tw } from '../../lib'
import { CircularImage } from '../components'
import { FirstPageProps } from './types'

export const FirstPageLeftAligned: React.FC<FirstPageProps> = ({
  cv,
  h1Style,
  primaryColor,
  profileImageDataUrl,
  styles,
}) => {
  return (
    <View style={tw('flex flex-col justify-center flex-1')}>
      <View style={tw('flex flex-row gap-12 items-start')}>
        {/* Left side: Photo */}
        {profileImageDataUrl && (
          <View style={{ flexShrink: 0 }}>
            <CircularImage
              borderColor={primaryColor}
              borderWidth={3}
              size={112}
              src={profileImageDataUrl}
            />
          </View>
        )}

        {/* Right side: Name, title, and introduction */}
        <View style={tw('flex flex-col gap-8 flex-1')}>
          <View style={tw('flex flex-col gap-2')}>
            <Text style={h1Style}>{cv.fullName}</Text>
            <Text>{cv.jobTitle}</Text>
          </View>

          <View style={[styles.lead, tw('flex flex-col gap-1')]}>
            <LexicalPdfRenderer content={cv.introduction as LexicalContent} />
          </View>
        </View>
      </View>
    </View>
  )
}
