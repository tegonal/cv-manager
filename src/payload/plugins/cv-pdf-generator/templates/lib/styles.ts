import { StyleSheet } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types'

// Convert mm to points (1mm = 2.83465pt)
export const mmToPt = (mm: number) => mm * 2.83465

// Default page margins (used in static styles, can be overridden dynamically)
export const DEFAULT_MARGIN_TOP = mmToPt(45)
export const DEFAULT_MARGIN_BOTTOM = mmToPt(15)
export const DEFAULT_MARGIN_LEFT = mmToPt(30)
export const DEFAULT_MARGIN_RIGHT = mmToPt(30)

// Base styles matching original default-page.scss layout
export const styles = StyleSheet.create({
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
    fontSize: 14,
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

// Create heading styles with a specific font family
export const createHeadingStyles = (fontFamily: string) => ({
  h1: { ...styles.h1, fontFamily } as Style,
  h2: { ...styles.h2, fontFamily } as Style,
  h3: { ...styles.h3, fontFamily } as Style,
})
