'use client'
import { getTranslation } from '@payloadcms/translations'
import { Button, toast, useTranslation } from '@payloadcms/ui'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'
import { generatePdfAction } from '@/payload/plugins/cv-pdf-generator/actions'

type Props = {
  exportOverride: Record<string, boolean>
  id: number | string | undefined
  locale: string
  onTransferred?: () => void
  title: string
}

export const GeneratePDFButton: React.FC<Props> = ({
  exportOverride,
  id,
  locale,
  onTransferred,
  title,
}) => {
  const [isBusy, setBusy] = React.useState(false)
  const { i18n } = useTranslation()
  const text = (key: keyof typeof I18nCollection.pdfExport) =>
    getTranslation(I18nCollection.pdfExport[key], i18n)

  const generatePdf = async () => {
    if (!id) {
      toast.error(text('noDocument'))
      return
    }
    setBusy(true)

    try {
      const result = await generatePdfAction({
        exportOverride,
        id: String(id),
        locale,
      })

      if (result.error) {
        toast.error(`${text('generationFailed')}: ${result.error}`)
        return
      }

      if (!result.data) {
        toast.error(text('noData'))
        return
      }

      // Convert base64 to blob
      const binaryString = atob(result.data)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      const blob = new Blob([bytes], { type: 'application/pdf' })

      // Trigger download
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const today = new Date().toLocaleDateString(locale)
      a.download = `${title} - ${today}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success(text('pdfGenerated'))
      onTransferred?.()
    } catch (error) {
      const message = error instanceof Error ? error.message : text('unknownError')
      toast.error(`${text('generationFailed')}: ${message}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Button buttonStyle="primary" disabled={isBusy} onClick={generatePdf}>
      {text(isBusy ? 'generatingPdf' : 'generatePdf')}
    </Button>
  )
}
