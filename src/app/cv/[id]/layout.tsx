import { Metadata } from 'next'

import './globals.scss'
import { Rubik } from 'next/font/google'
import { headers } from 'next/headers'
import Script from 'next/script'
import React from 'react'

import { LANG_HEADER_KEY } from '@/payload/utilities/constants'

const rubik = Rubik({
  display: 'swap',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  description: 'cv',
  title: 'cv',
}

interface LayoutProps {
  children: React.ReactNode
}

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const headersList = await headers()
  const lang = headersList.get(LANG_HEADER_KEY)

  return (
    <html className={rubik.className} lang={lang || 'en'}>
      <Script src="/_next/static/paged.polyfill.min.js" strategy={'lazyOnload'} />
      <body className={rubik.className}>{children}</body>
    </html>
  )
}

export default Layout
