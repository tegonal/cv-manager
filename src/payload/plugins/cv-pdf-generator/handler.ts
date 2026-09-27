import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import configPromise from '@payload-config'
import { renderToBuffer } from '@react-pdf/renderer'
import { getPayload, TypedLocale, TypedUser } from 'payload'
import React from 'react'
import sharp from 'sharp'

import { MEDIA_PREFIX } from '@/payload/collections/Media/constants'
import { CompanyInfo, Cv, Media, PdfStyle } from '@/types/payload-types'

import DefaultTemplate from './templates/default'
import { CompanyInfoData, CvPdfTemplateProps, withHyphenationLocale } from './templates/lib'
// Import fonts module to ensure Font registrations happen
import './templates/lib/fonts'

type Props = {
  exportOverride: Record<string, boolean>
  id: string
  locale: string
  // The CV is read with this user's access
  user: TypedUser
}

// PDF DPI setting - must match Page dpi prop in template
const PDF_DPI = 300
const DPI_SCALE = PDF_DPI / 72 // ~4.17x scale for 300 DPI

// Largest size the profile image is printed at, in points (a circle, see CircularImage)
const PROFILE_IMAGE_SIZE_PT = 192
const MM_TO_PT = 72 / 25.4

let s3Client: S3Client | undefined
const getS3Client = () =>
  (s3Client ??= new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: true,
    region: process.env.S3_REGION || 'garage',
  }))

/**
 * react-pdf only embeds JPEG and PNG. Images are converted to one of them (PNG if they have
 * transparency), turned upright according to their EXIF orientation and scaled to the size they
 * are printed at, instead of embedding the uploaded original. With a height, they are cropped to
 * that box like object-fit: cover.
 */
const toPdfImage = async (
  buffer: Uint8Array,
  widthPt: number,
  heightPt?: number,
): Promise<string> => {
  const widthPx = Math.round(widthPt * DPI_SCALE)
  const heightPx = heightPt === undefined ? undefined : Math.round(heightPt * DPI_SCALE)
  const { format, hasAlpha, height, width } = await sharp(buffer).metadata()
  // Vector images are rasterised at the density that yields the printed size
  const density =
    format === 'svg' && width && height
      ? 72 * Math.max(widthPx / width, heightPx ? heightPx / height : 0)
      : undefined

  const image = sharp(buffer, { density })
    .rotate()
    .resize({ fit: 'cover', height: heightPx, width: widthPx, withoutEnlargement: true })
  const [mimeType, data] = hasAlpha
    ? ['image/png', await image.png().toBuffer()]
    : ['image/jpeg', await image.jpeg({ quality: 85 }).toBuffer()]

  return `data:${mimeType};base64,${data.toString('base64')}`
}

const loadImageFromS3 = async (filename: string, prefix: string): Promise<Uint8Array> => {
  const key = prefix ? `${prefix}/${filename}` : filename
  const response = await getS3Client().send(
    new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
    }),
  )

  if (!response.Body) {
    throw new Error(`No body in S3 response for ${key}`)
  }

  return response.Body.transformToByteArray()
}

const loadImage = async (
  media: Media,
  logger: { debug: (msg: string) => void; error: (msg: string) => void },
  widthPt: number,
  heightPt?: number,
): Promise<string> => {
  const filename = media.filename
  if (!filename) {
    logger.debug('loadImage: No filename provided')
    return ''
  }

  logger.debug(`loadImage: Loading image ${filename}`)

  try {
    // Use the folder the storage adapter stored the file in
    const prefix = [media.prefix || MEDIA_PREFIX, media._objectKey].filter(Boolean).join('/')
    const result = await toPdfImage(await loadImageFromS3(filename, prefix), widthPt, heightPt)
    logger.debug(`loadImage: Loaded from S3, data URL length: ${result.length}`)
    return result
  } catch (error) {
    logger.error(`Failed to load image: ${error}`)
    return ''
  }
}

export const requestHandler = async ({ exportOverride, id, locale, user }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const { logger } = payload

  logger.debug(`PDF Generator: Starting generation for CV ${id} (locale: ${locale})`)

  try {
    // Fetch the CV data, a CV the user may not read is not found
    const cv = (await payload
      .find({
        collection: 'cv',
        depth: 1,
        locale: locale as TypedLocale,
        overrideAccess: false,
        user,
        where: {
          id: {
            equals: id,
          },
        },
      })
      .then((data) => data.docs[0])) as Cv

    if (!cv) {
      logger.error(`PDF Generator: CV with id ${id} not found`)
      throw new Error(`CV with id ${id} not found`)
    }

    // Load profile image directly from storage
    logger.debug(`PDF Generator: CV image field: ${cv.image ? 'present' : 'absent'}`)
    const profileImageDataUrl = cv.image
      ? await loadImage(cv.image as Media, logger, PROFILE_IMAGE_SIZE_PT, PROFILE_IMAGE_SIZE_PT)
      : ''
    logger.debug(`PDF Generator: Profile image data URL length: ${profileImageDataUrl.length}`)

    // Fetch company info and PDF style from globals
    const companyInfoGlobal = (await payload.findGlobal({
      slug: 'company-info',
    })) as CompanyInfo

    const pdfStyleGlobal = (await payload.findGlobal({
      slug: 'pdf-style',
    })) as PdfStyle

    // Load company logo from storage if set
    let companyLogoDataUrl = ''
    let logoHeight: number | undefined
    const logoWidthMm = pdfStyleGlobal.logoWidth || 30

    if (pdfStyleGlobal.logo) {
      // Read without the user's access on purpose: the logo is shared configuration and may be
      // stored under another organisation
      const logoMedia =
        typeof pdfStyleGlobal.logo === 'object'
          ? pdfStyleGlobal.logo
          : await payload.findByID({ collection: 'media', id: pdfStyleGlobal.logo })
      if (logoMedia) {
        const media = logoMedia as Media
        companyLogoDataUrl = await loadImage(media, logger, logoWidthMm * MM_TO_PT)
        logger.debug(`PDF Generator: Company logo loaded (${companyLogoDataUrl.length} bytes)`)

        // Calculate proportional height in mm based on original dimensions
        if (media.width && media.height) {
          const aspectRatio = media.height / media.width
          logoHeight = Math.round(logoWidthMm * aspectRatio)
          logger.debug(
            `PDF Generator: Logo dimensions: ${media.width}x${media.height}, scaled to ${logoWidthMm}x${logoHeight}mm`,
          )
        }
      }
    }

    const companyInfo: CompanyInfoData = {
      address: companyInfoGlobal.address || '',
      city: companyInfoGlobal.city || '',
      firstPageLayout: pdfStyleGlobal.firstPageLayout || 'centered',
      // The template falls back to the page margins (first page) or 10 mm (logo) when unset
      firstPageMarginBottom: pdfStyleGlobal.firstPageMarginBottom,
      firstPageMarginLeft: pdfStyleGlobal.firstPageMarginLeft,
      firstPageMarginRight: pdfStyleGlobal.firstPageMarginRight,
      firstPageMarginTop: pdfStyleGlobal.firstPageMarginTop,
      fontFamily: pdfStyleGlobal.fontFamily || 'Rubik',
      logoDataUrl: companyLogoDataUrl,
      logoDisplay: pdfStyleGlobal.logoDisplay || 'allPages',
      logoHeight,
      logoMarginLeft: pdfStyleGlobal.logoMarginLeft,
      logoMarginRight: pdfStyleGlobal.logoMarginRight,
      logoMarginTop: pdfStyleGlobal.logoMarginTop,
      logoPosition: pdfStyleGlobal.logoPosition || 'right',
      logoWidth: logoWidthMm,
      marginBottom: pdfStyleGlobal.marginBottom || 15,
      marginLeft: pdfStyleGlobal.marginLeft || 30,
      marginRight: pdfStyleGlobal.marginRight || 30,
      marginTop: pdfStyleGlobal.marginTop || 45,
      name: companyInfoGlobal.name || '',
      pageFormat: pdfStyleGlobal.pageFormat || 'A4',
      primaryColor: pdfStyleGlobal.primaryColor || '#64748b',
      secondaryColor: pdfStyleGlobal.secondaryColor || '#4d4d4d',
      skillLevelDisplay: pdfStyleGlobal.skillLevelDisplay || 'text',
      url: companyInfoGlobal.url || '',
    }

    // Profile fields are exported unless deselected, like projects
    const hasOverride = (key: string) => exportOverride[key] !== false

    const props: CvPdfTemplateProps = {
      companyInfo,
      cv,
      exportOverride,
      hasOverride,
      locale: locale as TypedLocale,
      profileImageDataUrl,
    }

    logger.debug(`PDF Generator: Rendering PDF with template`)
    try {
      const pdfBuffer = await withHyphenationLocale(locale, () =>
        renderToBuffer(React.createElement(DefaultTemplate, props) as any),
      )
      logger.debug(`PDF Generator: Successfully generated PDF (${pdfBuffer.length} bytes)`)
      return pdfBuffer
    } catch (renderError: any) {
      logger.error(`PDF Generator: renderToBuffer failed - ${renderError.message}`)
      logger.error(`PDF Generator: Error stack - ${renderError.stack}`)
      throw renderError
    }
  } catch (e: any) {
    logger.error(`PDF Generator: Failed to generate PDF - ${e.message || e}`)
    if (e.stack) {
      logger.error(`PDF Generator: Stack trace - ${e.stack}`)
    }
    throw e
  }
}
