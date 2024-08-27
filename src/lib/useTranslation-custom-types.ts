import { en } from '@/lib/translations/en';
import { NestedKeysStripped } from '@payloadcms/translations';

export type I18nObject = typeof en;
export type I18nKeys = NestedKeysStripped<I18nObject>;
