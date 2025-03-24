import React from 'react'
import ReactDOM from 'react-dom/client'
import { PayloadLexicalReactRenderer } from './payloadLexicalReactRenderer'
import { content } from '@/payload/utilities/lexical-render/src/content'
import { content2 } from '@/payload/utilities/lexical-render/src/content2'

type Intro = {
  text: string
  position: 'left' | 'right'
}

type Code = {
  title: string
  content: string
  language: string
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PayloadLexicalReactRenderer<{
      intro: Intro
    }>
      content={content}
      blockRenderers={{
        intro: (props) => {
          return (
            <div
              style={{
                display: 'flex',
                alignSelf: props.fields.position === 'left' ? 'flex-start' : 'flex-end',
              }}
            >
              {props.fields.position}
            </div>
          )
        },
      }}
    />

    <PayloadLexicalReactRenderer<{
      code: Code
    }>
      content={content2}
      blockRenderers={{
        code: (props) => {
          return (
            <pre>
              <code>{props.fields.content}</code>
            </pre>
          )
        },
      }}
    />
  </React.StrictMode>,
)
