// @ts-ignore

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
import { isNumber } from 'lodash-es';

const fetchFileToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const string = buffer.toString('base64');
    return `data:${contentType};base64,${string}`;
  } catch (error) {
    logger.error(error);
    return '';
  }
};

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
  const host = process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000';

  let profile = '';

  if (cv.image && !isNumber(cv.image)) {
    const profileUrl = `${host}${cv.image.url}`;
    profile = await fetchFileToBase64(profileUrl);
  }

  const data = {
    cv,
    i18n: I18nCollection,
    images: {
      logo,
      profile,
    },
  };

  // convert richtext fields to html
  const toHtml = await import('./lexical-to-html').then((module) => module.toHtml);
  cv.introduction = (await toHtml(cv.introduction as any)) as any;

  // convert date fields to formatted strings
  cv.birthday = new Date(cv.birthday).toLocaleDateString(locale);

  const getYear = (date: string | undefined | null) => {
    if (!date) {
      return '';
    }
    return new Date(date).getFullYear().toString();
  };

  if (cv.edu && cv.edu.length > 0) {
    cv.edu = cv.edu?.map((edu) => {
      edu.fromYear = getYear(edu.fromYear);
      edu.toYear = getYear(edu.toYear);
      return edu;
    });
  }

  if (cv.certs && cv.certs.length > 0) {
    cv.certs = cv.certs?.map((cert) => {
      cert.toYear = getYear(cert.toYear);
      return cert;
    });
  }

  if (cv.courses && cv.courses.length > 0) {
    cv.courses = cv.courses?.map((course) => {
      course.toYear = getYear(course.toYear);
      return course;
    });
  }

  if (cv.projects && cv.projects.length > 0) {
    cv.projects = cv.projects?.map((project) => {
      project.fromYear = getYear(project.fromYear);
      project.toYear = getYear(project.toYear);
      return project;
    });
  }

  if (cv.eduHighlights && cv.eduHighlights.length > 0) {
    cv.eduHighlights = cv.eduHighlights?.map((highlight) => {
      highlight.fromYear = getYear(highlight.fromYear);
      highlight.toYear = getYear(highlight.toYear);
      return highlight;
    });
  }

  if (cv.jobHighlights && cv.jobHighlights.length > 0) {
    cv.jobHighlights = cv.jobHighlights?.map((highlight) => {
      highlight.fromYear = getYear(highlight.fromYear);
      highlight.toYear = getYear(highlight.toYear);
      return highlight;
    });
  }

  let fileString = '';

  console.log(data);

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
