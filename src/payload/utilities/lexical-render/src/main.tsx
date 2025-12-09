import React from 'react'
import ReactDOM from 'react-dom/client'

import { content } from '@/payload/utilities/lexical-render/src/content'
import { content2 } from '@/payload/utilities/lexical-render/src/content2'

import { PayloadLexicalReactRenderer } from './payloadLexicalReactRenderer'

type Code = {
  content: string
  language: string
  title: string
}

type Intro = {
  position: 'left' | 'right'
  text: string
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PayloadLexicalReactRenderer<{
      intro: Intro
    }>
      blockRenderers={{
        intro: (props) => {
          return (
            <div
              style={{
                alignSelf: props.fields.position === 'left' ? 'flex-start' : 'flex-end',
                display: 'flex',
              }}>
              {props.fields.position}
            </div>
          )
        },
      }}
      content={content}
    />

    <PayloadLexicalReactRenderer<{
      code: Code
    }>
      blockRenderers={{
        code: (props) => {
          return (
            <pre>
              <code>{props.fields.content}</code>
            </pre>
          )
        },
      }}
      content={content2}
    />
  </React.StrictMode>,
)
