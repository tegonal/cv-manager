'use client';
import { useTranslation } from '@payloadcms/ui';
import { I18nKeys, I18nObject } from '@/lib/useTranslation-custom-types';

type Props = {
  k: I18nKeys;
};

export const Translate: React.FC<Props> = ({ k }) => {
  const { t } = useTranslation<I18nObject, I18nKeys>();
  return <>{t(k)}</>;
};
