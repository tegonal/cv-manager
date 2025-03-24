import {
  BoldFeature,
  FixedToolbarFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

export const lexicalEditorReducedFeatures = lexicalEditor({
  features: ({ defaultFeatures }) => [
    UnorderedListFeature(),
    OrderedListFeature(),
    LinkFeature(),
    BoldFeature(),
    FixedToolbarFeature(),
  ],
})
