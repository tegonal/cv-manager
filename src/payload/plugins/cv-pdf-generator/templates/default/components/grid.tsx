import { View } from '@react-pdf/renderer'
import React from 'react'

import { tw } from '../../lib'

type ColumnProps = {
  children: React.ReactNode
  wrap?: boolean
}

/**
 * A row of grid columns, wrapping onto new lines when full
 */
export const GridRow: React.FC<{
  children: React.ReactNode
}> = ({ children }) => <View style={tw('flex flex-row flex-wrap')}>{children}</View>

const GridColumn: React.FC<ColumnProps & { flexBasis: string }> = ({
  children,
  flexBasis,
  wrap = true,
}) => (
  <View
    style={{
      flexBasis,
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
 * A grid column that takes 1/3 of the width
 */
export const GridCol: React.FC<ColumnProps> = (props) => (
  <GridColumn flexBasis="33.33%" {...props} />
)

/**
 * A grid column that takes 2/3 of the width
 */
export const GridColSpan2: React.FC<ColumnProps> = (props) => (
  <GridColumn flexBasis="66.66%" {...props} />
)

/**
 * A grid column that takes 1/2 of the width
 */
export const Grid2Col: React.FC<ColumnProps> = (props) => <GridColumn flexBasis="50%" {...props} />
