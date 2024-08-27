'use client';

import React from 'react';
import { Button } from '@payloadcms/ui/elements/Button';
import { logger } from '@/lib/logger';
import ky from 'ky';
import { DefaultSaveButton, useDocumentInfo, useLocale } from '@payloadcms/ui';
import { pluginConstants } from '@/payload/plugins/cv-pdf-generator/const';

export const SaveButtonReplacer: React.FC = () => {
  const [isBusy, setBusy] = React.useState(false);
  const { id, title } = useDocumentInfo();
  const locale = useLocale();

  const onClick = async () => {
    if (!id) {
      console.error('No document ID');
      return;
    }
    setBusy(true);
    const params = {
      id,
      locale: locale.code,
    };
    const response = await ky.post(`/api/${pluginConstants.apiUrlSlug}`, {
      json: params,
    });
    logger.info('onClick', params, response);
    console.log('onClick', params, response);
    if (response.status !== 200) {
      console.error('Error generating PDF');
      console.error(response);
      setBusy(false);
      return;
    }
    // convert ReadableStream to downloadable file and trigger download

    const readableStream = response.body;
    if (!readableStream) {
      console.error('No readable stream');
      setBusy(false);
      return;
    }
    const reader = readableStream.getReader();
    const chunks: Uint8Array[] = [];
    let done = false;

    while (!done) {
      const { value, done: streamDone } = await reader.read();
      if (value) {
        chunks.push(value);
      }
      done = streamDone;
    }

    const blob = new Blob(chunks, { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBusy(false);
  };

  return (
    <div className={'flex flex-row gap-6'}>
      <Button buttonStyle={'secondary'} size={'small'} onClick={onClick} disabled={isBusy}>
        {isBusy ? 'Generating PDF...' : 'Generate PDF'}
      </Button>
      <DefaultSaveButton />
    </div>
  );
};
