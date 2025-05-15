import React from 'react'
import './globals.scss'
import { Rubik } from 'next/font/google'
import Script from 'next/script'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { LANG_HEADER_KEY } from '@/payload/utilities/constants'

const rubik = Rubik({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'cv',
  description: 'cv',
}

interface LayoutProps {
  children: React.ReactNode
}

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const headersList = await headers()
  const lang = headersList.get(LANG_HEADER_KEY)

  return (
    <html lang={lang || 'en'} className={rubik.className}>
      <Script src="/_next/static/paged.polyfill.min.js" strategy={'lazyOnload'} />
      <body className={rubik.className}>{children}</body>
    </html>
  )
}

export default Layout
