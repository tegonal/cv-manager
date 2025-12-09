import { NestedKeysStripped } from '@payloadcms/translations'

import { en } from '@/lib/translations/en'

export type I18nKeys = NestedKeysStripped<I18nObject>
export type I18nObject = typeof en
