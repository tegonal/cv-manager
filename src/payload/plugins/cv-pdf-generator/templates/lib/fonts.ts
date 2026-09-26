import { Font } from '@react-pdf/renderer'
import path from 'path'

// Fonts from Google Fonts ship with the app (public/fonts, with their licenses), so rendering does
// not depend on fonts.gstatic.com: react-pdf keeps a failed font download until the process restarts
const fontFile = (file: string) => path.join(process.cwd(), 'public', 'fonts', file)

Font.register({
  family: 'Rubik',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 300,
      src: fontFile('rubik/rubik-300.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: fontFile('rubik/rubik-400.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
      src: fontFile('rubik/rubik-500.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: fontFile('rubik/rubik-700.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
      src: fontFile('rubik/rubik-300-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: fontFile('rubik/rubik-400-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: fontFile('rubik/rubik-700-italic.ttf'),
    },
  ],
})

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 300,
      src: fontFile('open-sans/open-sans-300.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: fontFile('open-sans/open-sans-400.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
      src: fontFile('open-sans/open-sans-500.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: fontFile('open-sans/open-sans-700.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
      src: fontFile('open-sans/open-sans-300-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: fontFile('open-sans/open-sans-400-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: fontFile('open-sans/open-sans-700-italic.ttf'),
    },
  ],
})

// Lato has no weight 500, medium text falls back to the nearest weight
Font.register({
  family: 'Lato',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 300,
      src: fontFile('lato/lato-300.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: fontFile('lato/lato-400.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: fontFile('lato/lato-700.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
      src: fontFile('lato/lato-300-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: fontFile('lato/lato-400-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: fontFile('lato/lato-700-italic.ttf'),
    },
  ],
})

Font.register({
  family: 'Roboto',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 300,
      src: fontFile('roboto/roboto-300.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: fontFile('roboto/roboto-400.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
      src: fontFile('roboto/roboto-500.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: fontFile('roboto/roboto-700.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
      src: fontFile('roboto/roboto-300-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: fontFile('roboto/roboto-400-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: fontFile('roboto/roboto-700-italic.ttf'),
    },
  ],
})

Font.register({
  family: 'Merriweather',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 300,
      src: fontFile('merriweather/merriweather-300.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: fontFile('merriweather/merriweather-400.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: fontFile('merriweather/merriweather-700.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
      src: fontFile('merriweather/merriweather-300-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: fontFile('merriweather/merriweather-400-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: fontFile('merriweather/merriweather-700-italic.ttf'),
    },
  ],
})

Font.register({
  family: 'Playfair Display',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: fontFile('playfair-display/playfair-display-400.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
      src: fontFile('playfair-display/playfair-display-500.ttf'),
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: fontFile('playfair-display/playfair-display-700.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: fontFile('playfair-display/playfair-display-400-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 500,
      src: fontFile('playfair-display/playfair-display-500-italic.ttf'),
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: fontFile('playfair-display/playfair-display-700-italic.ttf'),
    },
  ],
})

// Available font families for reference
export const availableFonts = [
  'Rubik',
  'Open Sans',
  'Lato',
  'Roboto',
  'Merriweather',
  'Playfair Display',
] as const

export type AvailableFont = (typeof availableFonts)[number]
