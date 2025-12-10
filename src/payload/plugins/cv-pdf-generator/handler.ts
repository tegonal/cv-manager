'use server'

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import configPromise from '@payload-config'
import { renderToBuffer } from '@react-pdf/renderer'
import fs from 'fs/promises'
import path from 'path'
import { getPayload, PayloadRequest, TypedLocale } from 'payload'
import React from 'react'
import sharp from 'sharp'

import { CompanyInfo, Cv, Media, PdfStyle } from '@/types/payload-types'

import DefaultTemplate from './templates/default'
import { CompanyInfoData, CvPdfTemplateProps } from './templates/lib'
// Import fonts and hyphenation modules to ensure Font registrations happen
import './templates/lib/fonts'
import './templates/lib/hyphenation'

type Props = {
  exportOverride: Record<string, boolean>
  id: string
  locale: string
}

const isSvg = (filename: string, mimeType?: string): boolean => {
  return mimeType === 'image/svg+xml' || path.extname(filename).toLowerCase() === '.svg'
}

// PDF DPI setting - must match Page dpi prop in template
const PDF_DPI = 300
const DPI_SCALE = PDF_DPI / 72 // ~4.17x scale for 300 DPI

const convertSvgToJpeg = async (
  svgBuffer: Buffer,
  targetWidth?: number,
): Promise<Buffer<ArrayBufferLike>> => {
  // Convert SVG to JPEG using sharp (react-pdf doesn't support SVG in Image component)
  // Render at DPI_SCALE times the target width for crisp display at 300 DPI
  const renderWidth = Math.round(targetWidth ? targetWidth * DPI_SCALE : 600)
  return sharp(svgBuffer)
    .resize({ width: renderWidth })
    .flatten({ background: { b: 255, g: 255, r: 255 } }) // White background for transparency
    .jpeg({ quality: 85 })
    .toBuffer()
}

const loadImageFromS3 = async (
  filename: string,
  prefix: string,
  targetWidth?: number,
): Promise<string> => {
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: true,
    region: process.env.S3_REGION || 'garage',
  })

  const key = prefix ? `${prefix}/${filename}` : filename

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  })

  const response = await s3Client.send(command)

  if (!response.Body) {
    throw new Error(`No body in S3 response for ${key}`)
  }

  // Use SDK's built-in method to convert stream to bytes
  let buffer: Uint8Array = await response.Body.transformToByteArray()
  let mimeType = response.ContentType || 'image/jpeg'

  // Convert SVG to JPEG for react-pdf compatibility
  if (isSvg(filename, mimeType)) {
    buffer = await convertSvgToJpeg(Buffer.from(buffer), targetWidth)
    mimeType = 'image/jpeg'
  }

  return `data:${mimeType};base64,${Buffer.from(buffer).toString('base64')}`
}

const loadImageFromLocalStorage = async (
  filename: string,
  targetWidth?: number,
): Promise<string> => {
  const mediaDir = process.env.LOCAL_MEDIA_STORAGE_DIR || '/data/media'
  const filePath = path.join(mediaDir, filename)

  let buffer: Uint8Array = await fs.readFile(filePath)
  // Determine mime type from extension
  const ext = path.extname(filename).toLowerCase()
  const mimeTypes: Record<string, string> = {
    '.gif': 'image/gif',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  }
  let mimeType = mimeTypes[ext] || 'image/jpeg'

  // Convert SVG to JPEG for react-pdf compatibility
  if (isSvg(filename, mimeType)) {
    buffer = await convertSvgToJpeg(Buffer.from(buffer), targetWidth)
    mimeType = 'image/jpeg'
  }

  return `data:${mimeType};base64,${Buffer.from(buffer).toString('base64')}`
}

const loadImage = async (
  media: Media,
  logger: { debug: (msg: string) => void; error: (msg: string) => void },
  targetWidth?: number,
): Promise<string> => {
  const filename = media.filename
  if (!filename) {
    logger.debug('loadImage: No filename provided')
    return ''
  }

  logger.debug(`loadImage: Loading image ${filename} (S3: ${!!process.env.S3_ENDPOINT})`)

  try {
    if (process.env.S3_ENDPOINT) {
      // Load from S3
      const result = await loadImageFromS3(filename, 'media', targetWidth)
      logger.debug(`loadImage: Loaded from S3, data URL length: ${result.length}`)
      return result
    } else {
      // Load from local storage
      const result = await loadImageFromLocalStorage(filename, targetWidth)
      logger.debug(`loadImage: Loaded from local storage, data URL length: ${result.length}`)
      return result
    }
  } catch (error) {
    logger.error(`Failed to load image: ${error}`)
    return ''
  }
}

export const requestHandler = async (
  req: null | PayloadRequest,
  { exportOverride, id, locale }: Props,
) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const { logger } = payload

  logger.debug(`PDF Generator: Starting generation for CV ${id} (locale: ${locale})`)

  // When called from REST API endpoint, verify auth via cookie
  // When called from server action (req is null), auth is already handled by Next.js
  if (req !== null) {
    const payloadToken = req.headers.get('cookie')?.replace('payload-token=', '')
    if (!payloadToken) {
      logger.error('PDF Generator: Payload token not found')
      throw new Error('PDF Generator: Payload token not found. Aborting..')
    }
  }

  try {
    // Fetch the CV data
    const cv = (await payload
      .find({
        collection: 'cv',
        depth: 1,
        locale: locale as TypedLocale,
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
    const profileImageDataUrl = cv.image ? await loadImage(cv.image as Media, logger) : ''
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
    // Convert mm to pixels for image loading (at 300 DPI)
    const logoWidthPx = Math.round(logoWidthMm * 2.83465 * DPI_SCALE)

    if (pdfStyleGlobal.logo) {
      const logoMedia =
        typeof pdfStyleGlobal.logo === 'object'
          ? pdfStyleGlobal.logo
          : await payload.findByID({ collection: 'media', id: pdfStyleGlobal.logo })
      if (logoMedia) {
        const media = logoMedia as Media
        companyLogoDataUrl = await loadImage(media, logger, logoWidthPx)
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
      fontFamily: pdfStyleGlobal.fontFamily || 'Rubik',
      logoDataUrl: companyLogoDataUrl,
      logoDisplay: pdfStyleGlobal.logoDisplay || 'allPages',
      logoHeight,
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

    const hasOverride = (key: string) => {
      return key in exportOverride && exportOverride[key]
    }

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
      const pdfBuffer = await renderToBuffer(React.createElement(DefaultTemplate, props) as any)
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
    return Promise.reject({ error: e.message || 'PDF generation failed' })
  }
}
