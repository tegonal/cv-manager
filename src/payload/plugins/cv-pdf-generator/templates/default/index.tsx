/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  Path,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'
import { Company, Level, Project, Skill, SkillGroup } from '@/types/payload-types'

import {
  CvPdfTemplateProps,
  filterEmptyLexicalNodes,
  formatDate,
  fromToYear,
  hasLexicalNodes,
  LexicalContent,
  LexicalPdfRenderer,
  tw,
} from '../lib'

// Register font families with multiple weights
// Using Google Fonts CDN TTF URLs

// Rubik (Sans-serif)
Font.register({
  family: 'Rubik',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 300,
      src: 'https://fonts.gstatic.com/s/rubik/v31/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1UA.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/rubik/v31/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4i1UA.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
      src: 'https://fonts.gstatic.com/s/rubik/v31/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UA.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/rubik/v31/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-4I-1UA.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
      src: 'https://fonts.gstatic.com/s/rubik/v31/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8sDE0Uw.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/rubik/v31/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8tdE0Uw.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/rubik/v31/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8u6FEUw.ttf',
    },
  ],
})

// Open Sans (Sans-serif)
Font.register({
  family: 'Open Sans',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 300,
      src: 'https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0C4nY1M2xLER.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
      src: 'https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjr0C4nY1M2xLER.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1y4nY1M2xLER.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
      src: 'https://fonts.gstatic.com/s/opensans/v40/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk5hkaVcUwaERZjA.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/opensans/v40/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk8ZkaVcUwaERZjA.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/opensans/v40/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkxhjaVcUwaERZjA.ttf',
    },
  ],
})

// Lato (Sans-serif)
Font.register({
  family: 'Lato',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 300,
      src: 'https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh7USSwaPGR_p.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjxAwXjeu.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwaPGR_p.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
      src: 'https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI9w2_FQft1dw.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHjxsAUi-qJCY.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI5wq_FQft1dw.ttf',
    },
  ],
})

// Roboto (Sans-serif)
Font.register({
  family: 'Roboto',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 300,
      src: 'https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmSU5fCRc4EsA.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Mu72xKOzY.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
      src: 'https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmEU9fCRc4EsA.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmWUlfCRc4EsA.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
      src: 'https://fonts.gstatic.com/s/roboto/v32/KFOjCnqEu92Fr1Mu51TjASc3CsTKlA.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/roboto/v32/KFOkCnqEu92Fr1Mu51xIIzIFKw.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/roboto/v32/KFOjCnqEu92Fr1Mu51TzBic3CsTKlA.ttf',
    },
  ],
})

// Merriweather (Serif)
Font.register({
  family: 'Merriweather',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 300,
      src: 'https://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l521wRpX837pvjxPA.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5OeyxNV-bnrw.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52xwNpX837pvjxPA.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
      src: 'https://fonts.gstatic.com/s/merriweather/v30/u-4l0qyriQwlOrhSvowK_l5-eR7lXcf_hP3hPGWH.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/merriweather/v30/u-4m0qyriQwlOrhSvowK_l5-eSZJdeP3r-Ho.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/merriweather/v30/u-4l0qyriQwlOrhSvowK_l5-eR71Wsf_hP3hPGWH.ttf',
    },
  ],
})

// Playfair Display (Serif)
Font.register({
  family: 'Playfair Display',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
      src: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vUDQZNLo_U2r.ttf',
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKepu0DQZNLo_U2r.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTbtbK-F2rA0s.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 500,
      src: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_pqTbtbK-F2rA0s.ttf',
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_naUbtbK-F2rA0s.ttf',
    },
  ],
})

// Register hyphenation callback for automatic hyphenation
Font.registerHyphenationCallback((word) => {
  // Split long words at 12+ characters
  if (word.length > 12) {
    return [word.substring(0, word.length / 2), word.substring(word.length / 2)]
  }
  return [word]
})

// Convert mm to points (1mm = 2.83465pt)
const mmToPt = (mm: number) => mm * 2.83465

// Default page margins (used in static styles, overridden dynamically in template)
const DEFAULT_MARGIN_TOP = mmToPt(45)
const DEFAULT_MARGIN_BOTTOM = mmToPt(15)
const DEFAULT_MARGIN_LEFT = mmToPt(30)
const DEFAULT_MARGIN_RIGHT = mmToPt(30)

// Styles matching original default-page.scss layout
const styles = StyleSheet.create({
  additional: {
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: 700,
  },
  colSpan4: {
    width: '33.33%',
  },
  colSpan8: {
    width: '66.67%',
  },
  footer: {
    bottom: DEFAULT_MARGIN_BOTTOM,
    fontSize: 7.5,
    left: DEFAULT_MARGIN_LEFT,
    opacity: 0.5,
    position: 'absolute',
    right: DEFAULT_MARGIN_RIGHT,
  },
  // 3-column grid with gap-6 (24pt)
  grid3Cols: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  gridCol3: {
    width: '30%',
  },
  h1: {
    fontFamily: 'Rubik',
    fontSize: 24,
    fontWeight: 300,
    marginTop: 0,
  },
  h2: {
    fontFamily: 'Rubik',
    fontSize: 18,
    fontWeight: 300,
    marginTop: 0,
  },
  h3: {
    fontFamily: 'Rubik',
    fontSize: 7,
    fontWeight: 700,
    marginTop: 0,
  },
  // Highlight entry - matches reference: border-l-8 border-l-slate-500 bg-gray-100 p-2
  highlight: {
    backgroundColor: '#f3f4f6', // gray-100
    borderLeftColor: '#64748b', // slate-500
    borderLeftWidth: 8, // border-l-8 (8px)
    padding: 8, // p-2 = 0.5rem = 8pt at base 16px
    position: 'relative',
  },
  highlightIcon: {
    color: '#d1d5db', // gray-300 (lighter)
    height: 14,
    position: 'absolute',
    right: 8, // right-2
    top: 8, // top-2
    width: 14,
  },
  lead: {
    fontSize: 12,
    lineHeight: 1.33,
  },
  page: {
    backgroundColor: '#ffffff',
    color: '#000000',
    fontFamily: 'Rubik',
    fontSize: 10,
    fontWeight: 300,
    paddingBottom: DEFAULT_MARGIN_BOTTOM + 30, // Extra space for footer
    paddingLeft: DEFAULT_MARGIN_LEFT,
    paddingRight: DEFAULT_MARGIN_RIGHT,
    paddingTop: DEFAULT_MARGIN_TOP,
  },
  small: {
    fontSize: 7.5,
  },
})

// Highlight Icon SVG Component - matches reference icon/highlight.tsx
const HighlightIcon: React.FC = () => (
  <Svg style={styles.highlightIcon} viewBox="0 0 24 24">
    <Path
      d="M20.564400000000003 0.044568C20.355648000000002 0.113472 20.172408 0.25442400000000004 20.035608 0.451368C19.996104000000003 0.508224 19.922832000000003 0.675624 19.872744 0.8233680000000001C19.570752 1.7143920000000001 19.217304000000002 2.439768 18.832248 2.9587440000000003C18.545208 3.3456 18.152496000000003 3.7064640000000004 17.797439999999998 3.9096C17.358719999999998 4.160616 17.011272 4.252128 16.284 4.308192C15.631800000000002 4.358448 14.793743999999998 4.584552 14.148192000000002 4.884432C13.70244 5.091480000000001 13.081224 5.470968 12.78936 5.71452L12.678696 5.8068480000000005 12.252408 4.577424C12.017928000000001 3.901248 11.794008 3.2832000000000003 11.754792 3.204C11.572056 2.8349520000000004 11.291088 2.5885920000000002 10.902456 2.456664C10.673568000000001 2.378952 10.325256 2.368656 10.087728 2.432544C10.006152 2.4544799999999998 9.293352 2.770752 8.503728 3.1353839999999997C7.714080000000001 3.500016 6.803400000000001 3.9195119999999997 6.48 4.067568C4.816224 4.8293040000000005 4.032144 5.198112 3.922128 5.270736C3.5202000000000004 5.536056 3.26256 6.009864 3.2580480000000005 6.492C3.2554800000000004 6.764976000000001 3.28152 6.870888 3.48372 7.4101680000000005C3.57408 7.6511759999999995 3.648 7.857024 3.648 7.867584C3.648 7.8781680000000005 3.561528 7.923384 3.4558079999999998 7.968072C3.3501119999999998 8.01276 3.2245199999999996 8.081568 3.176712 8.120951999999999C2.897952 8.350752 2.963424 8.802504 3.29748 8.954208C3.4482720000000002 9.02268 3.578232 9.012288 3.808704 8.913288C3.919728 8.865599999999999 4.013952 8.830512 4.0180560000000005 8.835288C4.03596 8.856143999999999 4.443816 9.964176 4.4363280000000005 9.971592000000001C4.431744 9.976128000000001 4.341600000000001 10.019184000000001 4.236 10.067256C4.016064 10.16736 3.924576 10.243776 3.8615039999999996 10.38C3.7471680000000003 10.62696 3.861792 10.914696 4.121952 11.033808C4.277184 11.104872 4.392647999999999 11.09796 4.604856 11.004816C4.679184 10.9722 4.75464 10.942464 4.772544 10.938768C4.794912 10.934112 4.885968 11.145072 5.063856 11.613792L5.322624 12.295584000000002 5.10372 12.405792C4.915464 12.500568 4.874976 12.532079999999999 4.814424 12.630888C4.623336 12.942623999999999 4.822920000000001 13.346592 5.186568 13.384128C5.313144 13.397184000000001 5.389632000000001 13.376496000000001 5.653752 13.257719999999999C5.684496 13.243872 5.937696 13.908096 5.919648 13.955184000000001C5.8792800000000005 14.060352 3.208656 18.025488 3.13404 18.090984000000002C3.0847680000000004 18.134256 2.644032 18.369912 2.154624 18.614688C1.665192 18.859464000000003 1.188096 19.109736 1.094376 19.170863999999998C0.725712 19.411296 0.351576 19.876920000000002 0.17628 20.313528C0.026328 20.686968 0.018312000000000002 20.75472 0.006984 21.744C-0.004728 22.767456 0.00684 22.875696 0.161064 23.184C0.28526399999999996 23.432304000000002 0.567696 23.714736000000002 0.8160000000000001 23.838936C1.1524800000000002 24.007248 1.05252 24.002232 3.9199200000000003 23.994504L6.492 23.987568 6.72 23.924328C6.845400000000001 23.889552000000002 7.029 23.823456 7.128 23.777496000000003C7.308984 23.693448 15.904416 18.250416 16.190304 18.038832000000003C16.528176 17.788752 16.752 17.316264 16.752 16.853112C16.752 16.562544 16.682088 16.362000000000002 16.39584 15.831408000000001C16.252416 15.565536 16.11264 15.2994 16.085231999999998 15.24C16.057848 15.1806 16.013088 15.098616000000002 15.985776 15.057816L15.93612 14.983632 16.194048 14.909927999999999C16.423344 14.844432000000001 16.671192 14.74884 17.11836 14.553432C17.548056 14.365680000000001 18.030312000000002 14.008512 18.308952 13.671672000000001C18.425352 13.530984000000002 18.442656 13.519392 18.57864 13.491312C19.42872 13.315728 20.1996 12.562056 20.417232 11.693736L20.45916 11.52648 20.687016 11.462448C21.111528 11.34312 21.53808 11.086008 21.822696 10.777896C22.25172 10.313448 22.4694 9.790320000000001 22.504152 9.140039999999999L22.519128000000002 8.86008 22.617552 8.81628C22.807464000000003 8.731752 23.125728000000002 8.498688000000001 23.3058 8.312232C23.62512 7.981631999999999 23.832743999999998 7.613184 23.941656 7.183871999999999C24.019632 6.876504000000001 24.02544 6.287088 23.953464 5.988C23.822184 5.4426000000000005 23.46732 4.890791999999999 23.058 4.595592L22.992 4.548 23.039256 4.38C23.240088 3.665952 23.219472 2.8699440000000003 22.981392 2.146008C22.891272 1.871952 22.656048 1.41564 22.469376 1.1526960000000002C22.162392 0.7203120000000001 21.570696 0.198648 21.240000000000002 0.068832C21.054168 -0.004128 20.745528 -0.015216 20.564400000000003 0.044568M20.810232 1.182C20.53224 2.058264 20.04108 3.04404 19.588392 3.634392C18.942384 4.47684 18.126984 5.017152 17.21928 5.204232C17.087688 5.231376 16.791 5.2709280000000005 16.56 5.292192C15.494112 5.3901840000000005 14.625264 5.684904 13.799496000000001 6.228576C12.661416 6.977832 11.791584 8.175192 11.55948 9.312C11.452488 9.83604 11.446200000000001 10.46076 11.543064000000001 10.944C11.654136 11.498232 11.910864 12.094632 12.234816 12.551088C12.42204 12.814872 12.84996 13.25604 13.092 13.434792C13.316088 13.600296 13.717008000000002 13.806144 13.987344000000002 13.894488C14.357712000000001 14.01552 14.837424 14.085552000000002 15.016344000000002 14.044728000000001C15.071544 14.032152 15.157944 14.029296 15.208344000000002 14.038416C15.319560000000001 14.058528 15.657504 14.011944000000002 15.907968 13.942008000000001C16.136352 13.87824 16.78368 13.607952000000001 16.951344000000002 13.506383999999999C17.289768000000002 13.301328 17.483952000000002 13.112400000000001 17.50788 12.964848C17.528664 12.836664 17.644056 12.683256000000002 17.772000000000002 12.613704C18.05148 12.461808 18.251231999999998 11.525568000000002 18.134184 10.916112C18.067512 10.568976000000001 17.903616 10.185 17.700456 9.9C17.553936 9.694464 17.198664 9.361008 17.003064000000002 9.245472000000001C16.659048 9.04224 16.20864 8.946528 15.820968 8.994264000000001C15.372144 9.049512 14.935991999999999 9.2574 14.625648000000002 9.564C14.337216000000002 9.848928 14.208 10.153392 14.208 10.548C14.208 11.007384 14.409287999999998 11.393208 14.809704000000002 11.70132C14.978184 11.830944 15.04536 11.934624000000001 15.064248000000001 12.094176C15.107856000000002 12.46224 14.725968 12.754752 14.386872 12.61308C14.263152 12.561383999999999 13.959696000000001 12.325512 13.834655999999999 12.183888C13.391976000000001 11.682384 13.177848000000001 11.09316 13.206216000000001 10.454664C13.230047999999998 9.918456 13.37496 9.516648 13.704888 9.072000000000001C13.908072 8.798184000000001 14.113631999999999 8.626776000000001 14.521439999999998 8.391216C15.128208 8.040696 15.741696000000001 7.912344 16.392 7.999824C17.095728 8.094479999999999 17.62524 8.360327999999999 18.144792000000002 8.879783999999999C18.392256000000003 9.1272 18.667488000000002 9.498624000000001 18.806184000000002 9.77232C18.956256000000003 10.06848 19.101912000000002 10.537824 19.15116 10.884C19.184832 11.12076 19.179456000000002 11.666568000000002 19.14132 11.879808L19.109184 12.059616 19.189680000000003 11.963808C19.358712 11.762592 19.486895999999998 11.407608 19.48764 11.138784C19.488599999999998 10.795128 19.694808 10.56192 19.999008 10.560528C20.16072 10.559784 20.453736000000003 10.495488 20.609736 10.426488C21.055416 10.229376 21.401616 9.784776 21.478536 9.310776C21.518352 9.065280000000001 21.526512 9.079032 21.330000000000002 9.06012C21.100920000000002 9.03804 20.846688 8.984832 20.76264 8.941368C20.613456 8.864208 20.496503999999998 8.66772 20.496144 8.493576000000001C20.495784 8.331840000000001 20.613072000000003 8.138736 20.755392 8.066712C20.90088 7.993056 20.985 7.985784 21.195072000000003 8.028624C21.539640000000002 8.098896 21.87024 8.054088 22.2 7.8924C22.796232 7.6000559999999995 23.130792 6.890256 22.978824 6.24C22.930992 6.035232 22.77732 5.729568 22.64808 5.582136L22.544784 5.464272 22.48788 5.546136C22.336632 5.763768000000001 22.114416 6.005952 22.023096000000002 6.052728C21.715632 6.210191999999999 21.326184 6.004992 21.293856 5.668488C21.277704 5.500464 21.319944 5.397192 21.490608 5.18736C21.694152 4.937088 21.807672 4.7588159999999995 21.83832 4.641288C21.85248 4.587 21.891144 4.502688 21.92424 4.45392C21.957336 4.405152 22.006128 4.3008 22.032672 4.2220320000000005C22.40664 3.1118880000000004 22.000464 1.8387360000000001 21.045072 1.126488C20.95764 1.061328 20.881464 1.008 20.8758 1.008C20.870112 1.008 20.840616 1.086312 20.810232 1.182M10.32 3.4162559999999997C10.132007999999999 3.483696 6.912 4.979760000000001 6.912 4.999656C6.912 5.018808 8.109552 8.287224 8.281008 8.736C8.345328 8.904336 8.916384 10.455696 9.29256 11.484C9.630624000000001 12.408144 9.676392 12.610272 9.675552000000001 13.176C9.674688000000002 13.774680000000002 9.58464 14.188488000000001 9.347664 14.683128000000002C9.245472000000001 14.896416 9.078696 15.149808 8.565792 15.871128C8.207208 16.375416 7.890912 16.813344 7.862928 16.844328C7.690512 17.03508 7.35468 17.044032 7.155672000000001 16.863192C7.014072 16.734528 6.96156 16.455408000000002 7.047648 16.288944C7.06944 16.246776 7.36824 15.818015999999998 7.711632 15.336143999999999C8.362824 14.422296 8.492735999999999 14.202576 8.589768 13.850952000000001C8.69904 13.455048 8.704416 12.981672000000001 8.604144 12.588000000000001C8.549616 12.373920000000002 8.420856 12.023112000000001 8.401248 12.035232C8.39184 12.04104 7.9908 12.219936 7.51008 12.432768000000001C7.029336000000001 12.645624 6.6290640000000005 12.827015999999999 6.620592 12.835872C6.61212 12.844752 6.6689039999999995 13.019400000000001 6.74676 13.224C6.824616 13.4286 6.916055999999999 13.675775999999999 6.949968 13.773264C7.063344 14.09928 7.172184000000001 13.900920000000001 5.514072 16.389888000000003C4.7086559999999995 17.59884 4.00212 18.644184 3.943968 18.712848C3.783552 18.90228 3.573696 19.027752 2.571144 19.5336C1.723128 19.961472 1.6373760000000002 20.010432 1.4867759999999999 20.152488C1.2538799999999999 20.372208 1.092768 20.647560000000002 1.04352 20.910144L1.026648 21 3.2673360000000002 20.99916C5.708712 20.998248 5.729232 20.99724 6.024 20.862912C6.158784 20.801496 14.814576 15.352752 14.899392 15.275927999999999C14.925144 15.252623999999999 14.923248000000001 15.231672000000001 14.888952000000002 15.159744C14.865936 15.11148 14.8356 15.071904 14.821560000000002 15.071807999999999C14.726880000000001 15.071064 14.325984000000002 15.014208 14.131752 14.97396C13.765104000000001 14.897976000000002 13.478568 14.796816 13.116 14.615304C12.65736 14.385696 12.387264 14.188152 11.985719999999999 13.788599999999999C11.429112 13.234752 11.06184 12.677904 10.80324 11.995752C10.209912000000001 10.430592 10.398696 8.73492 11.322768 7.329408C11.509224 7.0458240000000005 11.710824 6.771599999999999 11.825784 6.645143999999999L11.882928 6.582312 11.388528 5.163816C11.116608000000001 4.383648 10.878648 3.70836 10.85976 3.663144C10.816776 3.560256 10.653648 3.41832 10.555944 3.3987840000000005C10.454640000000001 3.3785279999999998 10.417463999999999 3.381288 10.32 3.4162559999999997M5.232 5.75172C4.8426 5.930808 4.487616 6.104664 4.443144 6.138048C4.341792 6.214200000000001 4.267128 6.379392 4.268424 6.524616C4.269744 6.669672 4.562856 7.455672000000001 4.611528 7.4446319999999995C4.696872 7.425264 6.432816 6.6386400000000005 6.42684 6.622032C6.177432 5.9286 5.982528 5.4246 5.964 5.425248C5.9508 5.425728 5.6214 5.5726320000000005 5.232 5.75172M5.8692 7.996080000000001C5.368248 8.219112 4.954392 8.405616 4.94952 8.410488C4.942032 8.417976000000001 5.3473679999999995 9.522192 5.367503999999999 9.549168C5.373408 9.557088 7.172280000000001 8.766984 7.1971680000000005 8.745552C7.2042720000000005 8.739431999999999 6.7966560000000005 7.604928 6.783168 7.5932640000000005C6.781416000000001 7.591752 6.370128000000001 7.7730239999999995 5.8692 7.996080000000001M6.648000000000001 10.093896C6.166200000000001 10.309992000000001 5.761344 10.49064 5.748312 10.495296C5.726304 10.503192 6.200400000000001 11.818056 6.242376 11.86548C6.258288 11.88348 7.9882800000000005 11.138088 8.046864 11.088000000000001C8.068608000000001 11.0694 7.575336 9.71184 7.544447999999999 9.705312C7.533216 9.702912000000001 7.1297999999999995 9.877776 6.648000000000001 10.093896M11.052 18.90072C8.6628 20.411544 6.6377999999999995 21.68472 6.5520000000000005 21.729984C6.466200000000001 21.775272 6.3123119999999995 21.840408 6.2100480000000005 21.874728C5.82384 22.004376 5.750616 22.007712 3.2801760000000004 22.007856L1.004376 22.008 1.012176 22.339872C1.019424 22.64748 1.024392 22.6782 1.08 22.760256000000002C1.113 22.808952 1.182264 22.878312 1.2339360000000001 22.914384L1.3278720000000002 22.98 3.789936 22.986696000000002C6.51768 22.994112 6.4341360000000005 22.998288 6.744792 22.839144C6.9331439999999995 22.742664 15.515424 17.299152 15.597168 17.22432C15.732432000000001 17.100504 15.779544 16.867056 15.705216 16.688928C15.651312 16.55976 15.426432 16.151808 15.409728000000001 16.152863999999997C15.402168 16.153344 13.441199999999998 17.389872 11.052 18.90072"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
)

// External Link Icon SVG Component - matches lucide ExternalLink
const ExternalLinkIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <Svg height={size} viewBox="0 0 24 24" width={size}>
    <Path
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path
      d="M15 3h6v6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path
      d="M10 14L21 3"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
)

// Components
const HighlightEntry: React.FC<{
  borderColor?: string
  description: any
  dotColor?: string
  level?: Level | null
  skillLevelDisplay?: 'dots' | 'progressBar' | 'text'
  subtitle?: null | string
  title?: null | string
}> = ({
  borderColor = '#64748b',
  description,
  dotColor,
  level,
  skillLevelDisplay = 'text',
  subtitle,
  title,
}) => (
  <View style={[styles.highlight, { borderLeftColor: borderColor }]} wrap={false}>
    <Text style={[styles.bold, { paddingRight: 32 }]}>{title}</Text>
    {level && (skillLevelDisplay === 'dots' || skillLevelDisplay === 'progressBar') ? (
      <View style={{ paddingRight: 32 }}>
        {skillLevelDisplay === 'dots' ? (
          <DotRating color={dotColor} filled={level.points || 0} total={5} />
        ) : (
          <ProgressBar color={dotColor} filled={level.points || 0} total={5} />
        )}
      </View>
    ) : (
      <Text style={[styles.small, { paddingRight: 32 }]}>{subtitle}</Text>
    )}
    <LexicalPdfRenderer content={description} />
    <HighlightIcon />
  </View>
)

const OptionalLink: React.FC<{
  name: string
  url?: null | string
}> = ({ name, url }) => {
  if (url) {
    return <LinkWithIcon name={name} url={url} />
  }
  return <Text>{name}</Text>
}

const LinkWithIcon: React.FC<{
  name: string
  url: string
}> = ({ name, url }) => (
  <Link src={url} style={{ color: '#000000', textDecoration: 'none' }}>
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      <Text>{name}</Text>
      <View style={{ marginLeft: 2 }}>
        <ExternalLinkIcon size={12} />
      </View>
    </View>
  </Link>
)

// Circular image with border using View borderRadius + overflow hidden
// Note: overflow:'hidden' has known issues in react-pdf (see GitHub issue #2901)
// but borderRadius on View may still provide visual clipping for images
const CircularImage: React.FC<{
  borderColor?: string
  borderWidth?: number
  size?: number
  src: string
}> = ({ borderColor = '#cccccc', borderWidth = 3, size = 192, src }) => {
  const innerSize = size - borderWidth * 2

  return (
    <View
      style={{
        alignItems: 'center',
        borderColor: borderColor,
        borderRadius: size / 2,
        borderStyle: 'solid',
        borderWidth: borderWidth,
        height: size,
        justifyContent: 'center',
        overflow: 'hidden',
        width: size,
      }}>
      <Image
        src={src}
        style={{
          borderRadius: innerSize / 2,
          height: innerSize,
          objectFit: 'cover',
          width: innerSize,
        }}
      />
    </View>
  )
}

// Dot rating component for skill levels
const DotRating: React.FC<{
  color?: string
  filled: number
  total?: number
}> = ({ color = '#4d4d4d', filled, total = 5 }) => {
  const DOT_SIZE = 4.5
  const DOT_GAP = 2

  return (
    <View style={{ flexDirection: 'row', gap: DOT_GAP, marginBottom: 4, marginTop: 4 }}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={{
            backgroundColor: index < filled ? color : '#ffffff',
            borderColor: color,
            borderRadius: DOT_SIZE / 2,
            borderWidth: 0.25,
            height: DOT_SIZE,
            width: DOT_SIZE,
          }}
        />
      ))}
    </View>
  )
}

// Progress bar component for skill levels
const ProgressBar: React.FC<{
  color?: string
  filled: number
  total?: number
}> = ({ color = '#4d4d4d', filled, total = 5 }) => {
  const BAR_WIDTH = 40
  const BAR_HEIGHT = 6
  const BORDER_RADIUS = BAR_HEIGHT / 2
  const fillPercentage = Math.min(filled / total, 1)

  return (
    <View
      style={{
        backgroundColor: '#e5e7eb', // gray-200 background
        borderRadius: BORDER_RADIUS,
        height: BAR_HEIGHT,
        marginBottom: 2,
        marginTop: 2,
        overflow: 'hidden',
        width: BAR_WIDTH,
      }}>
      <View
        style={{
          backgroundColor: color,
          borderRadius: BORDER_RADIUS,
          height: BAR_HEIGHT,
          width: BAR_WIDTH * fillPercentage,
        }}
      />
    </View>
  )
}

// Skill level display component - switches between text, dots, and progress bar
const SkillLevelDisplay: React.FC<{
  color?: string
  displayMode: 'dots' | 'progressBar' | 'text'
  level: Level
}> = ({ color, displayMode, level }) => {
  if (displayMode === 'dots') {
    return <DotRating color={color} filled={level.points || 0} total={5} />
  }
  if (displayMode === 'progressBar') {
    return <ProgressBar color={color} filled={level.points || 0} total={5} />
  }
  return <Text style={styles.small}>{level.level}</Text>
}

const DefaultTemplate: React.FC<CvPdfTemplateProps> = ({
  companyInfo,
  cv,
  exportOverride,
  hasOverride,
  locale,
  profileImageDataUrl,
}) => {
  const skillLevelDisplay = companyInfo.skillLevelDisplay || 'text'
  const primaryColor = companyInfo.primaryColor || '#64748b'
  const secondaryColor = companyInfo.secondaryColor || '#4d4d4d'
  const fontFamily = companyInfo.fontFamily || 'Rubik'

  // Dynamic page margins
  const marginTop = mmToPt(companyInfo.marginTop || 45)
  const marginBottom = mmToPt(companyInfo.marginBottom || 15)
  const marginLeft = mmToPt(companyInfo.marginLeft || 30)
  const marginRight = mmToPt(companyInfo.marginRight || 30)
  const pageFormat = companyInfo.pageFormat || 'A4'

  // Determine if logo appears on all pages or just first
  const hasLogo = !!companyInfo.logoDataUrl
  const logoOnAllPages = hasLogo && companyInfo.logoDisplay !== 'firstPageOnly'

  // Dynamic page style with selected font and margins
  const pageStyle = {
    ...styles.page,
    fontFamily,
    paddingBottom: marginBottom + 30, // Extra space for footer
    paddingLeft: marginLeft,
    paddingRight: marginRight,
    paddingTop: marginTop,
  }

  // Dynamic footer style with margins
  const footerStyle = {
    ...styles.footer,
    bottom: marginBottom,
    left: marginLeft,
    right: marginRight,
  }

  // Dynamic heading styles with selected font
  const h1Style = { ...styles.h1, fontFamily }
  const h2Style = { ...styles.h2, fontFamily }
  const h3Style = { ...styles.h3, fontFamily }

  return (
    <Document>
      <Page dpi={300} size={pageFormat} style={pageStyle}>
        {/* Header with company logo - fixed on all pages or first page only based on logoDisplay setting */}
        {companyInfo.logoDataUrl && (
          <View
            fixed={companyInfo.logoDisplay !== 'firstPageOnly'}
            style={{
              left: companyInfo.logoPosition === 'left' ? marginLeft - mmToPt(15) : undefined,
              position: 'absolute',
              right: companyInfo.logoPosition !== 'left' ? marginRight - mmToPt(15) : undefined,
              top: mmToPt(10) + 10,
            }}>
            <Image
              src={companyInfo.logoDataUrl}
              style={{
                height: companyInfo.logoHeight ? mmToPt(companyInfo.logoHeight) : 'auto',
                width: mmToPt(companyInfo.logoWidth || 30),
              }}
            />
          </View>
        )}

        {/* Fixed Footer */}
        <View fixed style={footerStyle}>
          <View style={tw('flex flex-row justify-between')}>
            <Text>
              {companyInfo.name && `${companyInfo.name} - `}
              {companyInfo.address && `${companyInfo.address} - `}
              {companyInfo.city && `${companyInfo.city} - `}
              {companyInfo.url}
            </Text>
            <Text render={({ pageNumber }) => `${pageNumber}`} />
          </View>
        </View>

        {/* Basic Profile - centered horizontally and vertically on first page */}
        <View style={tw('flex flex-col gap-16 items-center justify-center flex-1')}>
          <View style={tw('flex flex-col gap-16 items-center')}>
            <View style={tw('flex flex-col gap-4 items-center')}>
              <View style={{ alignItems: 'center' }}>
                <Text style={h1Style}>{cv.fullName}</Text>
                <Text>{cv.jobTitle}</Text>
              </View>
            </View>

            {profileImageDataUrl && (
              <CircularImage
                borderColor={primaryColor}
                borderWidth={3}
                size={192}
                src={profileImageDataUrl}
              />
            )}
          </View>

          <View style={{ alignItems: 'center', width: '66.67%' }}>
            <Text style={h2Style}>{I18nCollection.fieldLabel.introduction[locale]}</Text>
            <View style={[styles.lead, tw('flex flex-col gap-1 mt-4'), { textAlign: 'center' }]}>
              <LexicalPdfRenderer content={cv.introduction as LexicalContent} />
            </View>
          </View>
        </View>

        {/* Force page break after intro */}
        <View break />

        {/* Profile and Education - grid-cols-12 gap-x-8 gap-y-12 */}
        {/* mt-16 adds top margin to accommodate the logo header on pages 2+, only when logo is on all pages */}
        <View style={tw(`flex flex-row gap-8 ${logoOnAllPages ? 'mt-16' : ''}`)}>
          {/* Left column: Profile (col-span-4) */}
          <View style={[styles.colSpan4, tw('flex flex-col gap-4')]}>
            <Text style={h2Style}>{I18nCollection.fieldLabel.profile[locale]}</Text>

            {cv.birthday && hasOverride('birthday') && (
              <View>
                <Text style={h3Style}>{I18nCollection.fieldLabel.birthday[locale]}</Text>
                <Text>{formatDate(cv.birthday, locale)}</Text>
              </View>
            )}

            {cv.nationalityStatus && hasOverride('nationalityStatus') && (
              <View>
                <Text style={h3Style}>{I18nCollection.fieldLabel.nationalityStatus[locale]}</Text>
                <Text>{cv.nationalityStatus}</Text>
              </View>
            )}

            {cv.phoneNumber && hasOverride('phoneNumber') && (
              <View>
                <Text style={h3Style}>{I18nCollection.fieldLabel.phoneNumber[locale]}</Text>
                <Text>{cv.phoneNumber}</Text>
              </View>
            )}

            {cv.email && hasOverride('email') && (
              <View>
                <Text style={h3Style}>{I18nCollection.fieldLabel.email[locale]}</Text>
                <Text>{cv.email}</Text>
              </View>
            )}

            {(cv.links?.length ?? 0) > 0 && hasOverride('links') && (
              <View>
                <Text style={h3Style}>{I18nCollection.fieldLabel.links[locale]}</Text>
                {cv.links?.map((link) => (
                  <View key={link.id}>
                    <LinkWithIcon
                      name={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                      url={link.url}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right column: Education (col-span-8) */}
          <View style={[styles.colSpan8, tw('flex flex-col gap-4')]}>
            <Text style={h2Style}>{I18nCollection.fieldLabel.education[locale]}</Text>

            {(cv.eduHighlights?.length ?? 0) > 0 && (
              <View style={tw('flex flex-col gap-4')}>
                {cv.eduHighlights?.map((item) => (
                  <HighlightEntry
                    borderColor={primaryColor}
                    description={item.description}
                    key={item.id}
                    subtitle={fromToYear(locale, item.fromYear, item.toYear, I18nCollection)}
                    title={item.title}
                  />
                ))}
              </View>
            )}

            {(cv.edu?.length ?? 0) > 0 && (
              <View style={tw('flex flex-col gap-4')}>
                {cv.edu?.map((item) => (
                  <View key={item.id} wrap={false}>
                    <Text style={styles.bold}>
                      <OptionalLink name={item.institution} url={item.link} />
                    </Text>
                    <Text style={styles.small}>
                      {fromToYear(locale, item.fromYear, item.toYear, I18nCollection)}
                    </Text>
                    <View style={tw('flex flex-col gap-1')}>
                      <LexicalPdfRenderer content={item.description as LexicalContent} />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {(cv.certs?.length ?? 0) > 0 && (
              <View style={tw('flex flex-col gap-4')}>
                <Text style={h3Style}>{I18nCollection.fieldLabel.certifications[locale]}</Text>
                {cv.certs?.map((item) => (
                  <View key={item.id} wrap={false}>
                    <Text style={styles.bold}>
                      <OptionalLink name={item.name} url={item.link} />
                    </Text>
                    <Text style={styles.small}>
                      {fromToYear(locale, item.toYear, item.toYear, I18nCollection)}
                    </Text>
                    <View style={tw('flex flex-col gap-1')}>
                      <LexicalPdfRenderer content={item.description as LexicalContent} />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {(cv.courses?.length ?? 0) > 0 && (
              <View style={tw('flex flex-col gap-4')}>
                <Text style={h3Style}>{I18nCollection.fieldLabel.courses[locale]}</Text>
                {cv.courses?.map((item) => (
                  <View key={item.id} wrap={false}>
                    <Text style={styles.bold}>
                      <OptionalLink name={item.name} url={item.link} />
                    </Text>
                    <Text style={styles.small}>
                      {fromToYear(locale, item.toYear, item.toYear, I18nCollection)}
                    </Text>
                    <View style={tw('flex flex-col gap-1')}>
                      <LexicalPdfRenderer content={item.description as LexicalContent} />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Casual Info */}
        {hasLexicalNodes(cv.casualInfo as LexicalContent) && hasOverride('casualInfo') && (
          <View style={tw('flex flex-col gap-4 mt-8')} wrap={false}>
            <Text style={h2Style}>{I18nCollection.fieldLabel.casualInfo[locale]}</Text>
            <View style={tw('flex flex-col gap-1')}>
              <LexicalPdfRenderer
                content={filterEmptyLexicalNodes(cv.casualInfo as LexicalContent)!}
              />
            </View>
          </View>
        )}

        {/* Force page break before Skills */}
        <View break />

        {/* Skills - col-span-12, gap-12 between groups */}
        <View style={tw('flex flex-col gap-12')}>
          <Text style={h2Style}>{I18nCollection.fieldLabel.skills[locale]}</Text>

          {(cv.skillHighlights?.length ?? 0) > 0 && (
            <View style={tw('flex flex-col gap-6')}>
              {cv.skillHighlights?.map((item) => (
                <HighlightEntry
                  borderColor={primaryColor}
                  description={item.description}
                  dotColor={secondaryColor}
                  key={item.id}
                  level={item.level as Level}
                  skillLevelDisplay={skillLevelDisplay}
                  subtitle={(item.level as Level).level}
                  title={(item.skill.value as Skill | SkillGroup).name}
                />
              ))}
            </View>
          )}

          {cv.skillGroups?.map((group) => {
            if (group.skills && group.skills.length < 1) return null
            return (
              <View key={group.id} style={tw('flex flex-col gap-4')} wrap={false}>
                <View style={tw('flex flex-col gap-1')}>
                  <Text style={h3Style}>{(group.group as SkillGroup).name}</Text>
                  {group.skillGroupDescription && (
                    <View style={[styles.small, tw('mb-0.5 flex flex-col gap-1')]}>
                      <LexicalPdfRenderer content={group.skillGroupDescription as LexicalContent} />
                    </View>
                  )}
                </View>
                <View style={styles.grid3Cols}>
                  {group.skills?.map((item) => (
                    <View key={item.id} style={styles.gridCol3}>
                      <Text style={styles.bold}>
                        {(item.skill.value as Skill | SkillGroup).name}
                      </Text>
                      {item.level && (
                        <SkillLevelDisplay
                          color={secondaryColor}
                          displayMode={skillLevelDisplay}
                          level={item.level as Level}
                        />
                      )}
                      {(item['sub-skill']?.length ?? 0) > 0 && (
                        <Text style={[styles.small, styles.additional]}>
                          {item['sub-skill']?.map((i) => (i as Skill).name).join(', ')}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )
          })}

          {(cv.otherSkills?.length ?? 0) > 0 && (
            <View style={tw('flex flex-col gap-4')}>
              <Text style={h3Style}>{I18nCollection.fieldLabel.otherSkills[locale]}</Text>
              <View style={styles.grid3Cols}>
                {cv.otherSkills?.map((item) => (
                  <View key={item.id} style={styles.gridCol3} wrap={false}>
                    <Text style={styles.bold}>{item.name}</Text>
                    <SkillLevelDisplay
                      color={secondaryColor}
                      displayMode={skillLevelDisplay}
                      level={item.level as Level}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}

          {(cv.lang?.length ?? 0) > 0 && (
            <View style={tw('flex flex-col gap-4')}>
              <Text style={h3Style}>{I18nCollection.fieldLabel.languages[locale]}</Text>
              <View style={styles.grid3Cols}>
                {cv.lang?.map((item) => (
                  <View key={item.id} style={styles.gridCol3} wrap={false}>
                    <Text style={styles.bold}>{(item.language as Skill).name}</Text>
                    <SkillLevelDisplay
                      color={secondaryColor}
                      displayMode={skillLevelDisplay}
                      level={item.level as Level}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Force page break before Work Experience */}
        <View break />

        {/* Work Experience and Projects - w-5/6 (83.33%), gap-12 then gap-8 */}
        <View style={{ width: '83.33%' }}>
          <View style={tw('flex flex-col gap-8')}>
            <Text style={h2Style}>{I18nCollection.fieldLabel.workExperience[locale]}</Text>

            {(cv.jobHighlights?.length ?? 0) > 0 && (
              <View style={tw('flex flex-col gap-6')}>
                {cv.jobHighlights?.map((item) => (
                  <HighlightEntry
                    borderColor={primaryColor}
                    description={item.description}
                    key={item.id}
                    subtitle={fromToYear(locale, item.fromYear, item.toYear, I18nCollection)}
                    title={(item.company as Company).name}
                  />
                ))}
              </View>
            )}

            {(cv.projects?.length ?? 0) > 0 && (
              <View style={tw('flex flex-col gap-6')}>
                <Text style={h3Style}>{I18nCollection.fieldLabel.projects[locale]}</Text>
                {cv.projects?.map((item) => {
                  const projectKey = `project_${item.id}`
                  if (projectKey in exportOverride && !exportOverride[projectKey]) return null
                  return (
                    <View key={item.id} wrap={false}>
                      <Text style={[styles.bold, { marginBottom: 2 }]}>
                        <OptionalLink
                          name={(item.project as Project).name || ''}
                          url={(item.project as Project).link}
                        />
                      </Text>
                      <Text style={[styles.small, { marginBottom: 2 }]}>
                        {(item.company as Company).name}
                      </Text>
                      <Text style={[styles.small, { marginBottom: 2 }]}>
                        {fromToYear(locale, item.fromYear, item.toYear, I18nCollection)}
                      </Text>
                      <View style={tw('flex flex-col gap-1')}>
                        {(item.project as Project).description && (
                          <LexicalPdfRenderer
                            content={(item.project as Project).description as LexicalContent}
                          />
                        )}
                        <LexicalPdfRenderer content={item.description as LexicalContent} />
                      </View>
                    </View>
                  )
                })}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default DefaultTemplate
