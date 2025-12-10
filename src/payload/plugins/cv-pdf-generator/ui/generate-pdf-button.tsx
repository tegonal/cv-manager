'use client'
import { Button, toast } from '@payloadcms/ui'
import React from 'react'

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
  onTransferred = () => {},
  title,
}) => {
  const [isBusy, setBusy] = React.useState(false)

  const generatePdf = async () => {
    if (!id) {
      toast.error('No document ID provided')
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
        toast.error(`PDF generation failed: ${result.error}`)
        setBusy(false)
        return
      }

      if (!result.data) {
        toast.error('No PDF data returned from server')
        setBusy(false)
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
      setBusy(false)
      toast.success('PDF generated successfully')
      onTransferred()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      toast.error(`PDF generation failed: ${message}`)
      setBusy(false)
    }
  }

  return (
    <Button buttonStyle="primary" disabled={isBusy} onClick={generatePdf}>
      {isBusy ? 'Generating PDF...' : 'Generate PDF'}
    </Button>
  )
}
