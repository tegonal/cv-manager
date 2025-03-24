'use client'
import ky from 'ky'
import { pluginConstants } from '@/payload/plugins/cv-pdf-generator/const'
import { Button } from '@payloadcms/ui'
import React from 'react'
import { baseClass } from '@/payload/plugins/cv-pdf-generator/ui/saveButtonReplacer'
import { noop } from 'lodash-es'

type Props = {
  id: string | number | undefined
  title: string
  exportOverride: Record<string, boolean>
  locale: string
  onTransferred?: () => void
}

export const GeneratePDFButton: React.FC<Props> = ({
  id,
  title,
  exportOverride,
  locale,
  onTransferred = noop,
}) => {
  const [isBusy, setBusy] = React.useState(false)

  const generatePdf = async () => {
    if (!id) {
      console.error('No document ID')
      return
    }
    setBusy(true)
    const params = {
      id,
      locale,
      exportOverride,
    }
    const response = await ky.post(`/api/${pluginConstants.apiUrlSlug}`, {
      json: params,
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
      const { value, done: streamDone } = await reader.read()
      if (value) {
        chunks.push(value)
      }
      done = streamDone
    }

    const blob = new Blob(chunks, { type: 'application/pdf' })
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
  }
  return (
    <Button
      buttonStyle="primary"
      className={`${baseClass}__cancel`}
      onClick={generatePdf}
      disabled={isBusy}
    >
      {isBusy ? 'Generating PDF...' : 'Generate PDF'}
    </Button>
  )
}
