import { Style } from '@react-pdf/types'

import { Cv } from '@/types/payload-types'

import { LexicalContent } from '../../lib'

export type FirstPageProps = {
  cv: Cv
  h1Style: Style
  primaryColor: string
  profileImageDataUrl: string
  styles: {
    lead: Style
  }
}

export type { LexicalContent }
