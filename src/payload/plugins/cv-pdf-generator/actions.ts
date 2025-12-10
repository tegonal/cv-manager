'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Cv } from '@/types/payload-types'

import { requestHandler } from './handler'

/**
 * Server action to fetch CV data using Payload's local API
 */
export async function fetchCvAction(id: number | string): Promise<Cv | null> {
  const payload = await getPayload({ config: configPromise })
  const { logger } = payload

  try {
    logger.debug(`fetchCvAction: Fetching CV ${id}`)
    const cv = await payload.findByID({
      collection: 'cv',
      id,
    })
    logger.debug(`fetchCvAction: Successfully fetched CV ${id}`)
    return cv as Cv
  } catch (error) {
    logger.error(`fetchCvAction: Error fetching CV ${id} - ${error}`)
    return null
  }
}

/**
 * Server action to generate PDF using Payload's local API
 * Returns the PDF as a base64 encoded string
 */
export async function generatePdfAction(params: {
  exportOverride: Record<string, boolean>
  id: string
  locale: string
}): Promise<{ data?: string; error?: string }> {
  const payload = await getPayload({ config: configPromise })
  const { logger } = payload

  try {
    logger.debug(`generatePdfAction: Starting PDF generation for CV ${params.id}`)

    // Pass null for req - auth is handled by Next.js server action context
    const pdfBuffer = await requestHandler(null, {
      exportOverride: params.exportOverride,
      id: params.id,
      locale: params.locale,
    })

    // Convert buffer to base64 for transfer to client
    const base64 = Buffer.from(pdfBuffer).toString('base64')

    logger.debug(`generatePdfAction: Successfully generated PDF for CV ${params.id}`)
    return { data: base64 }
  } catch (error: any) {
    logger.error(
      `generatePdfAction: Error generating PDF for CV ${params.id} - ${error.message || error}`,
    )
    return { error: error.message || 'PDF generation failed' }
  }
}
