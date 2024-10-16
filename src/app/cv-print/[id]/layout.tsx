import React from 'react';
import './globals.scss';
import { Rubik } from 'next/font/google';
import Script from 'next/script';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
});

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html className={rubik.className}>
      <Script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js" strategy={'lazyOnload'} />
      <body>{children}</body>
    </html>
  );
};

export default Layout;
