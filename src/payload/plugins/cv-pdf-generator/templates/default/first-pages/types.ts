import type { Style } from '@react-pdf/types'

import { Cv } from '@/types/payload-types'

export type FirstPageProps = {
  cv: Cv
  h1Style: Style
  primaryColor: string
  profileImageDataUrl: string
}
