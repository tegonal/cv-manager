// Types of the Lexical rich text JSON rendered to PDF by LexicalPdfRenderer

export type AbstractElementNode<Type extends string> = AbstractNode<Type> & {
  direction: 'ltr' | 'rtl' | null
  indent: number
}

export type AbstractNode<Type extends string> = {
  format?: '' | 'center' | 'justify' | 'right' | 'start' | number
  type: Type
  version: number
}

export type AbstractTextNode<Type extends string> = AbstractNode<Type> & {
  detail: number
  format: '' | number
  mode: 'normal'
  style: string
  text: string
}

export type AutoLinkNode = AbstractElementNode<'autolink'> & {
  children: TextNode[]
  fields: {
    linkType: 'custom'
    newTab?: boolean
    url: string
  }
}

export type HeadingNode = AbstractElementNode<'heading'> & {
  children: TextNode[]
  tag: string
}

// Rich text content as stored by Payload
export type LexicalContent = {
  root: Root
}

export type Linebreak = AbstractNode<'linebreak'>

export type LinkNode = AbstractElementNode<'link'> & {
  children: TextNode[]
  fields:
    | {
        doc: {
          relationTo: string
          value: unknown
        }
        linkType: 'internal'
        newTab: boolean
        url: string
      }
    | {
        linkType: 'custom'
        newTab: boolean
        url: string
      }
}

export type ListItemNode = AbstractElementNode<'listitem'> & {
  children: (ListNode | TextNode)[]
  value: number
}

export type ListNode = AbstractElementNode<'list'> & {
  children: ListItemNode[]
  listType: 'bullet' | 'check' | 'number'
  start: number
  tag: string
}

export type Node =
  | AutoLinkNode
  | HeadingNode
  | Linebreak
  | LinkNode
  | ListItemNode
  | ListNode
  | ParagraphNode
  | QuoteNode
  | Tab
  | TextNode
  | UnknownBlockNode
  | UploadNode

export type ParagraphNode = AbstractElementNode<'paragraph'> & {
  children: (AutoLinkNode | Linebreak | LinkNode | Tab | TextNode)[]
}

export type QuoteNode = AbstractElementNode<'quote'> & {
  children: TextNode[]
}

export type Root = AbstractElementNode<'root'> & {
  children: Node[]
}

export type Tab = AbstractTextNode<'tab'>

export type TextNode = AbstractTextNode<'text'>

export type UploadNode = AbstractElementNode<'upload'> & {
  fields: null
  relationTo: 'media'
  value: {
    alt: string
    filename?: string
    id: string
    url?: string
  }
}

type UnknownBlockNode = AbstractNode<'block'> & {
  fields: {
    [key: string]: unknown
    blockName: string
    blockType: string
    id: string
  }
}
