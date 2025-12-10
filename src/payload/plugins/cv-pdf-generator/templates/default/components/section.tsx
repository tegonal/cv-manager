import { Text, View } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types'
import React from 'react'

import { tw } from '../../lib'

/** Helper to build class string, filtering empty values */
const cx = (...classes: (false | string | undefined)[]) => classes.filter(Boolean).join(' ')

/**
 * Main section wrapper with consistent spacing
 */
export const Section: React.FC<{
  children: React.ReactNode
  gap?: 4 | 6 | 8
  mt?: 0 | 4 | 8 | 12
  wrap?: boolean
}> = ({ children, gap = 8, mt = 0, wrap = true }) => {
  const gapClass = { 4: 'gap-4', 6: 'gap-6', 8: 'gap-8' }[gap]
  const mtClass = { 0: undefined, 4: 'mt-4', 8: 'mt-8', 12: 'mt-12' }[mt]

  return (
    <View style={tw(cx('flex', 'flex-col', gapClass, mtClass))} wrap={wrap}>
      {children}
    </View>
  )
}

/**
 * Subsection with optional heading (h3 level)
 */
export const Subsection: React.FC<{
  children: React.ReactNode
  gap?: 1 | 4 | 6
  heading?: string
  headingStyle?: Style
  wrap?: boolean
}> = ({ children, gap = 4, heading, headingStyle, wrap = true }) => {
  const gapClass = { 1: 'gap-1', 4: 'gap-4', 6: 'gap-6' }[gap]

  return (
    <View style={tw(cx('flex', 'flex-col', gapClass))} wrap={wrap}>
      {heading && headingStyle && <Text style={headingStyle}>{heading}</Text>}
      {children}
    </View>
  )
}

/**
 * Content wrapper with gap-1 (for lexical content, descriptions)
 */
export const ContentBlock: React.FC<{
  children: React.ReactNode
}> = ({ children }) => <View style={tw('flex flex-col gap-1')}>{children}</View>

/**
 * Bold text (replaces styles.bold)
 */
export const Bold: React.FC<{
  children: React.ReactNode
  mb?: 0 | 0.5
}> = ({ children, mb = 0 }) => (
  <Text style={tw(cx('font-bold', mb === 0.5 && 'mb-0.5'))}>{children}</Text>
)

/**
 * Small text (replaces styles.small) - 7.5pt
 */
export const Small: React.FC<{
  children: React.ReactNode
  italic?: boolean
  mb?: 0 | 0.5
}> = ({ children, italic = false, mb = 0 }) => {
  const classes = cx(italic && 'italic', mb === 0.5 && 'mb-0.5')

  return (
    <Text style={classes ? [tw(classes), { fontSize: 7.5 }] : { fontSize: 7.5 }}>{children}</Text>
  )
}
