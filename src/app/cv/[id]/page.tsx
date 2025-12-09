import configPromise from '@payload-config'
import ky from 'ky'
import { headers } from 'next/headers'
import * as process from 'node:process'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'

import { PRINTER_HEADER_KEY } from '@/payload/utilities/constants'
import { Cv, Media } from '@/types/payload-types'

import DefaultPage from './default_page'

export type CvPageProps = {
  cv: Cv
  exportOverride: Record<string, boolean>
  hasOverride: (key: string) => boolean
  locale: TypedLocale
  profileImageDataUrl: string
}

export type DecodedSearchParams = {
  exportOverride: Record<string, boolean>
  secret: string
}

type Args = {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

const Page = async ({ params, searchParams }: Args) => {
  if (!process.env.PRINTER_SECRET) {
    throw new Error('PDF Printer: Printer secret not found. Aborting..')
  }

  const query = {
    params: await params,
    searchParams: await searchParams,
  }

  const headersList = await headers()
  const printerSecret = headersList.get(PRINTER_HEADER_KEY)
  if (
    process.env.ALLOW_UNSECURED_CV_ACCESS != 'true' &&
    (!printerSecret || printerSecret !== process.env.PRINTER_SECRET)
  ) {
    throw new Error('Unable to access cv printer data')
  }

  const payload = await getPayload({ config: configPromise })

  if (!query.searchParams.p) {
    throw new Error('No parameters, Aborting')
  }

  const lang = query.searchParams.lang
  const locale: TypedLocale = (lang as TypedLocale) || 'en'

  const decodedParams: DecodedSearchParams = JSON.parse(
    Buffer.from(query.searchParams.p as string, 'base64').toString('utf-8'),
  )

  const { exportOverride } = decodedParams

  const cv = await payload
    .find({
      collection: 'cv',
      depth: 1,
      locale: locale,
      where: {
        id: {
          equals: query.params.id,
        },
      },
    })
    .then((data) => data.docs[0])

  const profileImage = (cv.image as Media)?.url

  const kyHeaders: Record<string, string | undefined> = {}
  kyHeaders[PRINTER_HEADER_KEY] = process.env.PRINTER_SECRET
  const loadImage = async (url: string) => {
    if (
      process.env.PUBLIC_URL &&
      process.env.INTERNAL_APP_URL &&
      url.startsWith(process.env.PUBLIC_URL) &&
      process.env.PUBLIC_URL != process.env.INTERNAL_APP_URL
    ) {
      // replace public url with the url of interal app as the public url might not be accessible internally
      url = url.replace(process.env.PUBLIC_URL, process.env.INTERNAL_APP_URL)
    }

    console.debug('fetch profile image', url)
    const response = await ky.get(url, {
      headers: kyHeaders,
    })
    const blob = await response.blob()
    let buffer = Buffer.from(await blob.arrayBuffer())
    return 'data:' + blob.type + ';base64,' + buffer.toString('base64')
  }

  const profileImageDataUrl: string = profileImage ? await loadImage(profileImage) : ''

  const hasOverride = (key: string) => {
    return key in exportOverride && exportOverride[key]
  }

  const tryRequire = (path: string) => {
    try {
      return require(`${path}`)
    } catch (err) {
      return null
    }
  }

  const CvPage: React.FC<CvPageProps> = tryRequire('./custom_page')
    ? tryRequire('./custom_page').default
    : DefaultPage

  return (
    <CvPage
      cv={cv}
      exportOverride={exportOverride}
      hasOverride={hasOverride}
      locale={locale}
      profileImageDataUrl={profileImageDataUrl}
    />
  )
}

export default Page
