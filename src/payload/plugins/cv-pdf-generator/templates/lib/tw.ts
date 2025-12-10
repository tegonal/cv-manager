import { createTw } from 'react-pdf-tailwind'

// Create Tailwind instance for react-pdf with custom theme
export const tw = createTw(
  {
    colors: {
      black: '#000000',
      gray: {
        100: '#f3f4f6',
        400: '#9ca3af',
        500: '#6b7280',
      },
      slate: {
        500: '#64748b',
      },
      white: '#ffffff',
    },
    fontFamily: {
      sans: ['Rubik'],
    },
  },
  {
    ptPerRem: 10, // Base font size 10pt
  },
)
