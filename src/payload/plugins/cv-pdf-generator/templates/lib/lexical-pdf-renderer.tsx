import type { Style } from '@react-pdf/types'

import { Link, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'

import type { LexicalContent, Node, TextNode } from './lexical-types'

import { tw } from './tw'

/**
 * Lexical text format bit flags.
 * These match the constants defined in Lexical's TextNode:
 * @see https://github.com/facebook/lexical/blob/main/packages/lexical/src/LexicalConstants.ts
 *
 * Note: Bit 4 (1 << 4 = 16) is IS_CODE in Lexical, which we don't handle separately here.
 */
const IS_BOLD = 1 // 1 << 0
const IS_ITALIC = 1 << 1 // 2
const IS_STRIKETHROUGH = 1 << 2 // 4
const IS_UNDERLINE = 1 << 3 // 8
// IS_CODE = 1 << 4 (16) - not used in PDF rendering
const IS_SUBSCRIPT = 1 << 5 // 32
const IS_SUPERSCRIPT = 1 << 6 // 64

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 10,
    lineHeight: 1.33,
    marginBottom: 2,
  },
  subscript: {
    fontSize: 7,
  },
  superscript: {
    fontSize: 7,
  },
})

// Styles of the text formats, in the order they are applied
const formatStyles: [flag: number, style: Style][] = [
  [IS_BOLD, tw('font-bold')],
  [IS_ITALIC, tw('italic')],
  [IS_UNDERLINE, tw('underline')],
  [IS_STRIKETHROUGH, tw('line-through')],
  [IS_SUBSCRIPT, styles.subscript],
  [IS_SUPERSCRIPT, styles.superscript],
]

// Other heading levels use 12pt
const headingFontSizes: Record<string, number> = { h1: 24, h2: 18, h3: 14 }

type Props = {
  content: LexicalContent
}

function renderChildren(children: Node[] | undefined): React.ReactNode {
  return children?.map((child, i) => renderNode(child, i))
}

function renderNode(node: Node, index: number): React.ReactNode {
  switch (node.type) {
    case 'autolink':
    case 'link':
      return (
        <Link key={index} src={node.fields?.url || ''} style={tw('text-black no-underline')}>
          {renderChildren(node.children)}
        </Link>
      )

    case 'heading':
      return (
        <Text
          key={index}
          style={{
            fontSize: headingFontSizes[node.tag] ?? 12,
            fontWeight: 700,
            marginBottom: 4,
          }}>
          {renderChildren(node.children)}
        </Text>
      )

    case 'linebreak':
      return <Text key={index}>{'\n'}</Text>

    case 'list':
      return (
        <View key={index} style={tw('ml-2.5')}>
          {renderChildren(node.children)}
        </View>
      )

    case 'listitem':
      return (
        <View key={index} style={tw('flex flex-row')}>
          <Text style={[tw('mr-1'), { width: 10 }]}>{'•'}</Text>
          <Text style={tw('flex-1')}>{renderChildren(node.children)}</Text>
        </View>
      )

    case 'paragraph':
      return (
        <Text key={index} style={styles.paragraph}>
          {renderChildren(node.children)}
        </Text>
      )

    case 'quote':
      return (
        <View key={index} style={[tw('ml-2.5 pl-2 border-l-2'), { borderLeftColor: '#9ca3af' }]}>
          <Text style={tw('italic')}>{renderChildren(node.children)}</Text>
        </View>
      )

    case 'text':
      return renderTextNode(node, index)

    default:
      return null
  }
}

function renderTextNode(node: TextNode, index: number): React.ReactNode {
  const format = typeof node.format === 'number' ? node.format : 0
  const textStyles = formatStyles.filter(([flag]) => format & flag).map(([, style]) => style)

  return (
    <Text key={index} style={textStyles.length > 0 ? textStyles : undefined}>
      {node.text}
    </Text>
  )
}

export const LexicalPdfRenderer: React.FC<Props> = ({ content }) => {
  if (!content?.root?.children) {
    return null
  }

  return <View>{renderChildren(content.root.children)}</View>
}
