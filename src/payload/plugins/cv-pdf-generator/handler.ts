'use server';

import { getPayload, PayloadRequest } from 'payload';
import configPromise from '@payload-config';
import { CvPdfConfig } from '@/payload/plugins/cv-pdf-generator/types';
import { Chromiumly, UrlConverter } from 'chromiumly';
import * as process from 'node:process';
import { encodeToBase64 } from 'next/dist/build/webpack/loaders/utils';

type Props = {
  id: string;
  locale: string;
  exportOverride: Record<string, boolean>;
};

export const requestHandler = async (
  req: PayloadRequest,
  { id, locale, exportOverride }: Props,
) => {
  const payload = await getPayload({
    config: configPromise,
  });
  const pluginConfig = payload.config.custom.cvPdfConfig as CvPdfConfig;
  const payloadToken = req.headers.get('cookie')?.replace('payload-token=', '');
  console.log({ payloadToken });

  if (!payloadToken) {
    throw new Error('PDF Printer: Payload token not found. Aborting..');
  }

  Chromiumly.configure({ endpoint: pluginConfig.gotenbergUrl });
  const urlConverter = new UrlConverter();

  const host = process.env.NEXT_PUBLIC_URL?.includes('localhost')
    ? 'http://host.docker.internal:3000'
    : process.env.NEXT_PUBLIC_URL;

  if (!host) {
    throw new Error('PDF Printer: Host undefined. Aborting..');
  }

  const searchParams = {
    locale,
    exportOverride,
    secret: new Date().getTime().toString(),
  };

  const searchParamString = encodeToBase64(searchParams);

  try {
    const url = `${host}/cv/${id}?p=${searchParamString}`;
    if (process.env.NODE_ENV !== 'production') console.log({ url });
    return urlConverter.convert({
      cookies: [
        {
          name: 'payload-token',
          value: payloadToken,
          domain: new URL(pluginConfig.gotenbergUrl).hostname,
        },
      ],
      url,
      waitDelay: '2s',
      properties: {
        size: {
          width: 8.267716535,
          height: 11.69291339,
        },
        margins: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        landscape: false,
      },
    });
  } catch (e: any) {
    console.error(e);
  }
  return Promise.resolve({});
};
