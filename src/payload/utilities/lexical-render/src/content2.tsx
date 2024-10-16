import { PayloadLexicalReactRendererContent } from '@/payload/utilities/lexical-render/src/payloadLexicalReactRenderer';

export const content2: PayloadLexicalReactRendererContent = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Updated style utilities',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'heading',
        version: 1,
        tag: 'h2',
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'theme.css.ts exports all css variables',
            type: 'text',
            version: 1,
          },
          {
            detail: 2,
            format: 0,
            mode: 'normal',
            style: '',
            text: '\t',
            type: 'tab',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        format: '',
        type: 'block',
        version: 1,
        fields: {
          id: '654b850d543f2609757e6ee4',
          title: 'exampleComponents.css.ts',
          content:
            'import {vars} from "@/styles/theme.css";\n' +
            '\n' +
            'export default {\n' +
            '    root: style({\n' +
            '        color: vars.color.grey0,\n' +
            '    })\n' +
            '};',
          language: 'ts',
          blockName: '',
          blockType: 'code',
        },
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'New CSS & HTML Features',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
        indent: 0,
        type: 'heading',
        version: 1,
        tag: 'h2',
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '@layer',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
        indent: 0,
        type: 'heading',
        version: 1,
        tag: 'h3',
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Layers are a new way to control css specificity.',
            type: 'text',
            version: 1,
          },
          { type: 'linebreak', version: 1 },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'A more important layer wins against every selector, but looses against inline styles or !important declarations.',
            type: 'text',
            version: 1,
          },
          { type: 'linebreak', version: 1 },
          { type: 'linebreak', version: 1 },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@layer',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'autolink',
            version: 1,
            fields: {
              linkType: 'custom',
              url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@layer',
            },
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        format: '',
        type: 'block',
        version: 1,
        fields: {
          id: '654b8552543f2609757e6ee5',
          content:
            '.example {\n' +
            '    display: none; /* this style wins even though it comes before .grid */\n' +
            '}\n' +
            '\n' +
            '@layer utilities {\n' +
            '  .grid {\n' +
            '    display: grid;\n' +
            '  }\n' +
            '}',
          language: 'css',
          blockName: '',
          blockType: 'code',
        },
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'color-mix()',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
        indent: 0,
        type: 'heading',
        version: 1,
        tag: 'h2',
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'color-mix() is a css function that mixes two colors in a given color space.',
            type: 'text',
            version: 1,
          },
          { type: 'linebreak', version: 1 },
          { type: 'linebreak', version: 1 },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'autolink',
            version: 1,
            fields: {
              linkType: 'custom',
              url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix',
            },
          },
          { type: 'linebreak', version: 1 },
          { type: 'linebreak', version: 1 },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'It can also be helpful to control the opacity of a solid color:',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        format: '',
        type: 'block',
        version: 1,
        fields: {
          id: '654b8581543f2609757e6ee6',
          content:
            '.test {\n' +
            '    background-color: color-mix(in srgb, var(--red), transparent 70%);\n' +
            '}',
          language: 'css',
          blockName: '',
          blockType: 'code',
        },
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'contain',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
        indent: 0,
        type: 'heading',
        version: 1,
        tag: 'h2',
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'The `contain` css property allows to increase isolation of an element from the document.',
            type: 'text',
            version: 1,
          },
          { type: 'linebreak', version: 1 },
          { type: 'linebreak', version: 1 },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Layout containment can be used to make fixed positioning of children relative to the parent.    ',
            type: 'text',
            version: 1,
          },
          { type: 'linebreak', version: 1 },
          { type: 'linebreak', version: 1 },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'https://developer.mozilla.org/en-US/docs/Web/CSS/contain',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'autolink',
            version: 1,
            fields: {
              linkType: 'custom',
              url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/contain',
            },
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        format: '',
        type: 'block',
        version: 1,
        fields: {
          id: '654b8598543f2609757e6ee7',
          content:
            '.parent {\n' +
            '    contain: layout;\n' +
            '}\n' +
            '\n' +
            '.child {\n' +
            '    position: fixed;\n' +
            '    top: 0;\n' +
            '}',
          language: 'css',
          blockName: '',
          blockType: 'code',
        },
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'inert',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
        indent: 0,
        type: 'heading',
        version: 1,
        tag: 'h2',
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Inert is a new html attribute to prevent interaction with an element and its children. ',
            type: 'text',
            version: 1,
          },
          { type: 'linebreak', version: 1 },
          { type: 'linebreak', version: 1 },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'autolink',
            version: 1,
            fields: {
              linkType: 'custom',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert',
            },
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Container Queries',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
        indent: 0,
        type: 'heading',
        version: 1,
        tag: 'h2',
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Container queries are a new css feature to write media query like rules that are relative to a parent.',
            type: 'text',
            version: 1,
          },
          { type: 'linebreak', version: 1 },
          { type: 'linebreak', version: 1 },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'autolink',
            version: 1,
            fields: {
              linkType: 'custom',
              url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries',
            },
          },
          { type: 'linebreak', version: 1 },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'https://ishadeed.com/article/container-queries-are-finally-here',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'autolink',
            version: 1,
            fields: {
              linkType: 'custom',
              url: 'https://ishadeed.com/article/container-queries-are-finally-here',
            },
          },
          { type: 'linebreak', version: 1 },
          { type: 'linebreak', version: 1 },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: "Color and typography are now available with vanilla extracts' sprinkles api",
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        format: '',
        type: 'block',
        version: 1,
        fields: {
          id: '654b85da543f2609757e6ee8',
          title: 'exampleComponent.tsx',
          content:
            'import {sprinkles} from "@/styles/sprinkels.css";\n' +
            '\n' +
            'function exampleComponent() {\n' +
            '    return <div className={sprinkles({typography: "primary400Book", color: "primaryBlue"})}>\n' +
            '        Text\n' +
            '    </div>\n' +
            '}\n',
          language: 'tsx',
          blockName: '',
          blockType: 'code',
        },
      },
      {
        format: '',
        type: 'block',
        version: 1,
        fields: {
          id: '654b85ed543f2609757e6ee9',
          title: 'exampleComponent.tsx',
          content:
            'import { sprinkles } from "@/styles/sprinkels.css";\n' +
            'import { responsiveTypography } from "@/styles/properties/typography.css";\n' +
            '\n' +
            'function exampleComponent() {\n' +
            '  return (\n' +
            '    <div\n' +
            '      className={sprinkles({\n' +
            '        typography: responsiveTypography({\n' +
            '          xlToL: "primary800Book",\n' +
            '          mToXxs: "primary400Book",\n' +
            '        }),\n' +
            '      })}\n' +
            '    >\n' +
            '      Text\n' +
            '    </div>\n' +
            '  );\n' +
            '}',
          language: 'tsx',
          blockName: '',
          blockType: 'code',
        },
      },
      {
        format: '',
        type: 'block',
        version: 1,
        fields: {
          id: '654b87ce543f2609757e6eea',
          title: 'exampleComponent.css.ts',
          content:
            'import { style } from "@vanilla-extract/css";\n' +
            'import { sprinkles } from "@/styles/sprinkels.css";\n' +
            '\n' +
            'export default {\n' +
            '  root: style([sprinkles({ typography: "primary400Book" }), { padding: 20 }]),\n' +
            '};\n',
          language: 'ts',
          blockName: '',
          blockType: 'code',
        },
      },
      {
        children: [],
        direction: null,
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
  },
};
