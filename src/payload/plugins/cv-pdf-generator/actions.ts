'use server'

import { getAuthenticatedPayload } from '@/payload/utilities/get-authenticated-payload'
import { Cv } from '@/types/payload-types'

import { requestHandler } from './handler'

/**
 * Server action to fetch CV data using Payload's local API
 */
export async function fetchCvAction(id: number | string): Promise<Cv | null> {
  const { payload, user } = await getAuthenticatedPayload()
  const { logger } = payload

  try {
    logger.debug(`fetchCvAction: Fetching CV ${id}`)
    const cv = await payload.findByID({
      collection: 'cv',
      id,
      overrideAccess: false,
      user,
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
  const { payload, user } = await getAuthenticatedPayload()
  const { logger } = payload

  // Only configured locales, Payload would otherwise fall back silently or return all locales ('*')
  const { localization } = payload.config
  if (!localization || !localization.localeCodes.includes(params.locale)) {
    return { error: `Unknown locale: ${params.locale}` }
  }

  try {
    logger.debug(`generatePdfAction: Starting PDF generation for CV ${params.id}`)

    const pdfBuffer = await requestHandler({
      exportOverride: params.exportOverride ?? {},
      id: params.id,
      locale: params.locale,
      user,
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
