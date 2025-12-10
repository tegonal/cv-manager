import { View } from '@react-pdf/renderer'
import React from 'react'

import { tw } from '../../lib'

/**
 * A 3-column grid container using flexbox
 */
export const Grid3Cols: React.FC<{
  children: React.ReactNode
}> = ({ children }) => <View style={tw('flex flex-row flex-wrap')}>{children}</View>

/**
 * A grid column that takes 1/3 of the width
 */
export const GridCol: React.FC<{
  children: React.ReactNode
  wrap?: boolean
}> = ({ children, wrap = true }) => (
  <View
    style={{
      flexBasis: '33.33%',
      flexDirection: 'column',
      gap: 4,
      marginBottom: 12,
      paddingRight: 12,
    }}
    wrap={wrap}>
    {children}
  </View>
)

/**
 * A grid column that takes 2/3 of the width
 */
export const GridColSpan2: React.FC<{
  children: React.ReactNode
  wrap?: boolean
}> = ({ children, wrap = true }) => (
  <View
    style={{
      flexBasis: '66.66%',
      flexDirection: 'column',
      gap: 4,
      marginBottom: 12,
      paddingRight: 12,
    }}
    wrap={wrap}>
    {children}
  </View>
)

/**
 * A 2-column grid container using flexbox
 */
export const Grid2Cols: React.FC<{
  children: React.ReactNode
}> = ({ children }) => <View style={tw('flex flex-row flex-wrap')}>{children}</View>

/**
 * A grid column that takes 1/2 of the width
 */
export const Grid2Col: React.FC<{
  children: React.ReactNode
  wrap?: boolean
}> = ({ children, wrap = true }) => (
  <View
    style={{
      flexBasis: '50%',
      flexDirection: 'column',
      gap: 4,
      marginBottom: 12,
      paddingRight: 12,
    }}
    wrap={wrap}>
    {children}
  </View>
)
