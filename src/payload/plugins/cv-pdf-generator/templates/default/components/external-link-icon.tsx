import { Path, Svg } from '@react-pdf/renderer'
import React from 'react'

export const ExternalLinkIcon: React.FC<{ color?: string; size?: number }> = ({
  color = 'currentColor',
  size = 12,
}) => (
  <Svg height={size} viewBox="0 0 24 24" width={size}>
    <Path
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path
      d="M15 3h6v6"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path
      d="M10 14L21 3"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
)
