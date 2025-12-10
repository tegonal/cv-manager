import { Text } from '@react-pdf/renderer'
import React from 'react'

import { LinkWithIcon } from './link-with-icon'

export const OptionalLink: React.FC<{
  color?: string
  name: string
  url?: null | string
}> = ({ color, name, url }) => {
  if (url) {
    return (
      <LinkWithIcon color={color} href={url}>
        {name}
      </LinkWithIcon>
    )
  }
  return <Text>{name}</Text>
}
