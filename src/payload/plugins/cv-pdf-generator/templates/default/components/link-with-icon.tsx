import { Link, Text, View } from '@react-pdf/renderer'
import React from 'react'

import { tw } from '../../lib'
import { ExternalLinkIcon } from './external-link-icon'

export const LinkWithIcon: React.FC<{
  children: React.ReactNode
  color?: string
  href: string
}> = ({ children, color = '#000000', href }) => (
  <Link src={href} style={[tw('no-underline'), { color }]}>
    <View style={tw('flex flex-row items-center')}>
      <Text>{children}</Text>
      <View style={tw('ml-0.5')}>
        <ExternalLinkIcon color={color} size={6} />
      </View>
    </View>
  </Link>
)
