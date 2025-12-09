'use server'

import configPromise from '@payload-config'
import * as process from 'node:process'
import { getPayload, PayloadRequest } from 'payload'
import puppeteer, { Browser, PuppeteerLifeCycleEvent, SupportedBrowser } from 'puppeteer'

import { LANG_HEADER_KEY, PRINTER_HEADER_KEY } from '@/payload/utilities/constants'

type Props = {
  exportOverride: Record<string, boolean>
  id: string
  locale: string
}

const DEFAULT_TIMEOUT = 60000

export const requestHandler = async (
  req: PayloadRequest,
  { exportOverride, id, locale }: Props,
) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const payloadToken = req.headers.get('cookie')?.replace('payload-token=', '')

  if (!payloadToken) {
    throw new Error('PDF Printer: Payload token not found. Aborting..')
  }

  const host = process.env.INTERNAL_APP_URL || process.env.PUBLIC_URL || 'http://localhost:3000'

  if (!host) {
    throw new Error('PDF Printer: Host undefined. Aborting..')
  }

  if (!process.env.PRINTER_SECRET) {
    throw new Error('PDF Printer: Printer secret not found. Aborting..')
  }

  const searchParams = {
    exportOverride,
    secret: new Date().getTime().toString(),
  }

  const searchParamString = Buffer.from(JSON.stringify(searchParams)).toString('base64')
  const extraHeaders: Record<string, string> = {}
  extraHeaders[PRINTER_HEADER_KEY] = process.env.PRINTER_SECRET || ''
  extraHeaders[LANG_HEADER_KEY] = locale

  let browser: Browser | undefined = undefined
  try {
    const url = `${host}/cv/${id}?p=${searchParamString}&${LANG_HEADER_KEY}=${locale}`
    if (process.env.NODE_ENV !== 'production') console.log({ url })
    browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      browser: (process.env.PUPPETER_BROWSER as SupportedBrowser) || 'firefox',
    })
    const page = await browser.newPage()
    page.setExtraHTTPHeaders(extraHeaders)

    // Navigate the page to a URL
    const waitUntil: PuppeteerLifeCycleEvent[] = ['load', 'domcontentloaded', 'networkidle0']

    await page.goto(url, {
      timeout: process.env.PUPPETER_REQUEST_TIMEOUT
        ? (parseInt(process.env.PUPPETER_REQUEST_TIMEOUT) ?? DEFAULT_TIMEOUT)
        : DEFAULT_TIMEOUT,
      waitUntil: waitUntil,
    })

    // create PDF
    const result = await page.pdf({
      format: 'A4',
      landscape: false,
      margin: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
    })

    return result
  } catch (e: any) {
    console.error(e)
    return Promise.reject({})
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
