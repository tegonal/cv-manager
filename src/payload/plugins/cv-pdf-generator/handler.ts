'use server'

import { getPayload, PayloadRequest } from 'payload'
import configPromise from '@payload-config'
import { CvPdfConfig } from '@/payload/plugins/cv-pdf-generator/types'
import { Chromiumly, UrlConverter } from 'chromiumly'
import * as process from 'node:process'
import { encodeToBase64 } from 'next/dist/build/webpack/loaders/utils'
import { PRINTER_HEADER_KEY } from '@/payload/utilities/constants'

type Props = {
  id: string
  locale: string
  exportOverride: Record<string, boolean>
}

export const requestHandler = async (
  req: PayloadRequest,
  { id, locale, exportOverride }: Props,
) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const pluginConfig = payload.config.custom.cvPdfConfig as CvPdfConfig
  const payloadToken = req.headers.get('cookie')?.replace('payload-token=', '')

  if (!payloadToken) {
    throw new Error('PDF Printer: Payload token not found. Aborting..')
  }

  Chromiumly.configure({ endpoint: pluginConfig.gotenbergUrl })
  const urlConverter = new UrlConverter()

  const host =
    process.env.GOTENBERG_TO_APP_URL || process.env.PUBLIC_URL || 'http://host.docker.internal:3000'

  if (!host) {
    throw new Error('PDF Printer: Host undefined. Aborting..')
  }

  if (!process.env.PRINTER_SECRET) {
    throw new Error('PDF Printer: Printer secret not found. Aborting..')
  }

  const searchParams = {
    locale,
    exportOverride,
    secret: new Date().getTime().toString(),
  }

  const searchParamString = encodeToBase64(searchParams)
  const extraHeaders: Record<string, string> = {}
  extraHeaders[PRINTER_HEADER_KEY] = process.env.PRINTER_SECRET || ''

  try {
    const url = `${host}/cv/${id}?p=${searchParamString}`
    if (process.env.NODE_ENV !== 'production') console.log({ url })
    return urlConverter.convert({
      extraHttpHeaders: extraHeaders,
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
    })
  } catch (e: any) {
    console.error(e)
  }
  return Promise.resolve({})
}
