import { fileToBase64 } from './utils/file-to-base64';
import { writeFile } from 'fs/promises';
import path from 'path';
import { convert, gotenberg, html, pipe, please, to } from 'gotenberg-js-client';
import * as pug from 'pug';
import { logger } from '@/lib/logger';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import * as process from 'node:process';
import { I18nCollection } from '@/lib/i18nCollection';
import { CvPdfConfig } from '@/payload/plugins/cv-pdf-generator/types';
import { toHtml } from '@wunderwa/lexical-json';

type Props = {
  id: string;
  locale: string;
};

export const requestHandler = async ({ id, locale }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });
  const pluginConfig = payload.config.custom.cvPdfConfig as CvPdfConfig;

  const toPDF = pipe(
    gotenberg(`${pluginConfig.gotenbergUrl}/forms/chromium`),
    convert,
    html,
    to({
      paperWidth: 8.267716535,
      paperHeight: 11.69291339,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      landscape: false,
    }),
    please,
  );

  logger.info(pluginConfig);

  const cvResult = await payload.find({
    collection: 'cv',
    where: { id: { equals: id } },
  });

  if (!cvResult.docs.length) {
    return { error: 'No document found' };
  }

  const cv = { ...cvResult.docs[0], locale };
  const rootDir = process.cwd();

  const templateFile = path.resolve(rootDir, pluginConfig.templatePath, 'cv-default.pug');

  const logo = await fileToBase64(
    path.resolve(rootDir, pluginConfig.templatePath, 'media', 'tegonal.svg'),
  );
  const profile = '';

  const data = {
    cv,
    i18n: I18nCollection,
    images: {
      logo,
      profile,
    },
  };

  logger.info(cv);
  cv.introduction = toHtml(cv.introduction as any) as any;

  let fileString = '';

  try {
    fileString = pug.renderFile(templateFile, {
      ...data,
    });
  } catch (error) {
    logger.error(error);
    fileString = `<html lang="${
      locale
    }"><body><h1>Error while creating PDF from template</h1><p>${JSON.stringify(
      error,
    )}</p></body></html>`;
  }

  if (process.env.NODE_ENV !== 'production') {
    await writeFile(
      path.resolve(rootDir, pluginConfig.templatePath, 'preview.json'),
      JSON.stringify(data, null, 2),
    );
    await writeFile(path.resolve(rootDir, pluginConfig.templatePath, 'preview.html'), fileString);
  }

  return toPDF(fileString);
};
