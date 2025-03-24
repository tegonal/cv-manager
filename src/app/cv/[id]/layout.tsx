import React from 'react'
import './globals.scss'
import { Rubik } from 'next/font/google'
import Script from 'next/script'
import { Metadata } from 'next'

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

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html className={rubik.className}>
      <Script src="/_next/static/paged.polyfill.min.js" strategy={'lazyOnload'} />
      <body>{children}</body>
    </html>
  )
}

export default Layout
