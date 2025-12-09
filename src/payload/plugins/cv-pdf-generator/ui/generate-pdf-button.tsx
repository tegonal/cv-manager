'use client'
import { Button } from '@payloadcms/ui'
import ky from 'ky'
import React from 'react'

import { pluginConstants } from '@/payload/plugins/cv-pdf-generator/const'
import { baseClass } from '@/payload/plugins/cv-pdf-generator/ui/save-button-replacer'

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
      console.error('No document ID')
      return
    }
    setBusy(true)
    const params = {
      exportOverride,
      id,
      locale,
    }
    try {
      const response = await ky.post(`/api/${pluginConstants.apiUrlSlug}`, {
        json: params,
        timeout: false,
      })

      if (response.status !== 200) {
        console.error('Error generating PDF')
        console.error(response)
        setBusy(false)
        return
      }

      const readableStream = response.body
      if (!readableStream) {
        console.error('No readable stream')
        setBusy(false)
        return
      }
      const reader = readableStream.getReader()
      const chunks: Uint8Array[] = []
      let done = false

      while (!done) {
        const { done: streamDone, value } = await reader.read()
        if (value) {
          chunks.push(value)
        }
        done = streamDone
      }

      const blob = new Blob(chunks as BlobPart[], { type: 'application/pdf' })
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
      onTransferred()
    } catch (error) {
      console.error('Error generating PDF')
      console.error(error)
      setBusy(false)
      return
    }
  }
  return (
    <Button
      buttonStyle="primary"
      className={`${baseClass}__cancel`}
      disabled={isBusy}
      onClick={generatePdf}>
      {isBusy ? 'Generating PDF...' : 'Generate PDF'}
    </Button>
  )
}
