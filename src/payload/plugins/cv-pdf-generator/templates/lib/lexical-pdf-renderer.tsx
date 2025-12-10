import type { Style } from '@react-pdf/types'

import { Link, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'

import type {
  HeadingNode,
  LinkNode,
  ListItemNode,
  ListNode,
  Node,
  ParagraphNode,
  PayloadLexicalReactRendererContent,
  QuoteNode,
  TextNode,
} from '@/lib/lexical-render/src/payload-lexical-react-renderer'

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
  bold: {
    fontWeight: 700,
  },
  italic: {
    fontStyle: 'italic',
  },
  link: {
    color: '#000000',
    textDecoration: 'none',
  },
  listItem: {
    flexDirection: 'row',
  },
  orderedList: {
    marginLeft: 10,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.33,
    marginBottom: 2,
  },
  strikethrough: {
    textDecoration: 'line-through',
  },
  subscript: {
    fontSize: 7,
  },
  superscript: {
    fontSize: 7,
  },
  underline: {
    textDecoration: 'underline',
  },
  unorderedList: {
    marginLeft: 10,
  },
})

type Props = {
  content: PayloadLexicalReactRendererContent
}

type TextStyle = {
  bold?: boolean
  italic?: boolean
  strikethrough?: boolean
  subscript?: boolean
  superscript?: boolean
  underline?: boolean
}

function getTextStyle(format: number | string): TextStyle {
  if (typeof format === 'string' || format === 0) {
    return {}
  }
  return {
    bold: (format & IS_BOLD) > 0,
    italic: (format & IS_ITALIC) > 0,
    strikethrough: (format & IS_STRIKETHROUGH) > 0,
    subscript: (format & IS_SUBSCRIPT) > 0,
    superscript: (format & IS_SUPERSCRIPT) > 0,
    underline: (format & IS_UNDERLINE) > 0,
  }
}

function renderNode(node: Node, index: number): React.ReactNode {
  switch (node.type) {
    case 'autolink':
    case 'link': {
      const linkNode = node as LinkNode
      const url = linkNode.fields?.url || ''
      return (
        <Link key={index} src={url} style={styles.link}>
          {linkNode.children?.map((child, i) => renderNode(child, i))}
        </Link>
      )
    }

    case 'heading': {
      const headingNode = node as HeadingNode
      const headingStyle: Style = {
        fontWeight: 700,
        marginBottom: 4,
      }
      if (headingNode.tag === 'h1') {
        headingStyle.fontSize = 24
      } else if (headingNode.tag === 'h2') {
        headingStyle.fontSize = 18
      } else if (headingNode.tag === 'h3') {
        headingStyle.fontSize = 14
      } else {
        headingStyle.fontSize = 12
      }
      return (
        <Text key={index} style={headingStyle}>
          {headingNode.children?.map((child, i) => renderNode(child, i))}
        </Text>
      )
    }

    case 'linebreak':
      return <Text key={index}>{'\n'}</Text>

    case 'list': {
      const listNode = node as ListNode
      const isOrdered = listNode.listType === 'number'
      return (
        <View key={index} style={isOrdered ? styles.orderedList : styles.unorderedList}>
          {listNode.children?.map((child, i) => renderNode(child, i))}
        </View>
      )
    }

    case 'listitem': {
      const listItemNode = node as ListItemNode
      return (
        <View key={index} style={styles.listItem}>
          <Text style={{ marginRight: 4, width: 10 }}>{'\u2022'}</Text>
          <Text style={{ flex: 1 }}>
            {listItemNode.children?.map((child, i) => renderNode(child, i))}
          </Text>
        </View>
      )
    }

    case 'paragraph': {
      const paragraphNode = node as ParagraphNode
      return (
        <Text key={index} style={styles.paragraph}>
          {paragraphNode.children?.map((child, i) => renderNode(child, i))}
        </Text>
      )
    }

    case 'quote': {
      const quoteNode = node as QuoteNode
      return (
        <View
          key={index}
          style={{
            borderLeftColor: '#9ca3af',
            borderLeftWidth: 2,
            marginLeft: 10,
            paddingLeft: 8,
          }}>
          <Text style={{ fontStyle: 'italic' }}>
            {quoteNode.children?.map((child, i) => renderNode(child, i))}
          </Text>
        </View>
      )
    }

    case 'text':
      return renderTextNode(node as TextNode, index)

    default:
      return null
  }
}

function renderTextNode(node: TextNode, index: number): React.ReactNode {
  const format = getTextStyle(node.format)
  const textStyles: Style[] = []

  if (format.bold) textStyles.push(styles.bold)
  if (format.italic) textStyles.push(styles.italic)
  if (format.underline) textStyles.push(styles.underline)
  if (format.strikethrough) textStyles.push(styles.strikethrough)
  if (format.subscript) textStyles.push(styles.subscript)
  if (format.superscript) textStyles.push(styles.superscript)

  return (
    <Text key={index} style={textStyles.length > 0 ? textStyles : undefined}>
      {node.text}
    </Text>
  )
}

export const LexicalPdfRenderer: React.FC<Props> = ({ content }) => {
  if (!content || !content.root || !content.root.children) {
    return null
  }

  return <View>{content.root.children.map((node, index) => renderNode(node, index))}</View>
}
