import { colorPickerField } from '@innovixx/payload-color-picker-field'
import { GlobalConfig } from 'payload'

import { I18nCollection } from '@/lib/i18n-collection'
import { isSuperAdminAccess } from '@/payload/access/is-super-admin-access'

export const PdfStyle: GlobalConfig = {
  access: {
    read: () => true,
    update: isSuperAdminAccess,
  },
  admin: {
    group: I18nCollection.collectionGroup.settings,
  },
  fields: [
    // Logo Settings - collapsible
    {
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          label: {
            de: 'Logo',
            en: 'Logo',
          },
          name: 'logo',
          relationTo: 'media',
          type: 'upload',
        },
        {
          admin: {
            description: {
              de: 'Breite des Logos in mm (Höhe wird proportional skaliert)',
              en: 'Width of the logo in mm (height scales proportionally)',
            },
          },
          defaultValue: 30,
          label: {
            de: 'Logo-Breite (mm)',
            en: 'Logo Width (mm)',
          },
          min: 10,
          name: 'logoWidth',
          type: 'number',
        },
        {
          defaultValue: 'right',
          label: {
            de: 'Logo-Position',
            en: 'Logo Position',
          },
          name: 'logoPosition',
          options: [
            {
              label: {
                de: 'Links',
                en: 'Left',
              },
              value: 'left',
            },
            {
              label: {
                de: 'Rechts',
                en: 'Right',
              },
              value: 'right',
            },
          ],
          type: 'select',
        },
        {
          defaultValue: 'allPages',
          label: {
            de: 'Logo-Anzeige',
            en: 'Logo Display',
          },
          name: 'logoDisplay',
          options: [
            {
              label: {
                de: 'Nur erste Seite',
                en: 'First page only',
              },
              value: 'firstPageOnly',
            },
            {
              label: {
                de: 'Alle Seiten',
                en: 'All pages',
              },
              value: 'allPages',
            },
          ],
          type: 'select',
        },
        {
          admin: {
            description: {
              de: 'Abstand des Logos vom oberen Seitenrand in mm',
              en: 'Distance of the logo from the top of the page in mm',
            },
            width: '33%',
          },
          defaultValue: 10,
          label: {
            de: 'Logo Rand oben',
            en: 'Logo Top Margin',
          },
          min: 0,
          name: 'logoMarginTop',
          type: 'number',
        },
        {
          admin: {
            condition: (data) => data?.logoPosition === 'left',
            description: {
              de: 'Abstand des Logos vom linken Seitenrand in mm',
              en: 'Distance of the logo from the left of the page in mm',
            },
            width: '33%',
          },
          defaultValue: 10,
          label: {
            de: 'Logo Rand links',
            en: 'Logo Left Margin',
          },
          min: 0,
          name: 'logoMarginLeft',
          type: 'number',
        },
        {
          admin: {
            condition: (data) => data?.logoPosition !== 'left',
            description: {
              de: 'Abstand des Logos vom rechten Seitenrand in mm',
              en: 'Distance of the logo from the right of the page in mm',
            },
            width: '33%',
          },
          defaultValue: 10,
          label: {
            de: 'Logo Rand rechts',
            en: 'Logo Right Margin',
          },
          min: 0,
          name: 'logoMarginRight',
          type: 'number',
        },
      ],
      label: {
        de: 'Logo-Einstellungen',
        en: 'Logo Settings',
      },
      type: 'collapsible',
    },

    // Style Settings - collapsible
    {
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          defaultValue: 'Rubik',
          label: {
            de: 'Schriftart',
            en: 'Font Family',
          },
          name: 'fontFamily',
          options: [
            {
              label: 'Rubik',
              value: 'Rubik',
            },
            {
              label: 'Open Sans',
              value: 'Open Sans',
            },
            {
              label: 'Lato',
              value: 'Lato',
            },
            {
              label: 'Roboto',
              value: 'Roboto',
            },
            {
              label: 'Merriweather (Serif)',
              value: 'Merriweather',
            },
            {
              label: 'Playfair Display (Serif)',
              value: 'Playfair Display',
            },
          ],
          type: 'select',
        },
        colorPickerField({
          admin: {
            description: {
              de: 'Primärfarbe für Rahmen (Bilder, Highlight-Boxen)',
              en: 'Primary color for borders (images, highlight boxes)',
            },
          },
          defaultValue: '#64748b',
          label: {
            de: 'Primärfarbe',
            en: 'Primary Color',
          },
          name: 'primaryColor',
        }),
        colorPickerField({
          admin: {
            description: {
              de: 'Sekundärfarbe für Akzente (Punkte-Bewertung, Fortschrittsbalken)',
              en: 'Secondary color for accents (dot ratings, progress bars)',
            },
          },
          defaultValue: '#4d4d4d',
          label: {
            de: 'Sekundärfarbe',
            en: 'Secondary Color',
          },
          name: 'secondaryColor',
        }),
        {
          defaultValue: 'text',
          label: {
            de: 'Skill-Level-Anzeige',
            en: 'Skill Level Display',
          },
          name: 'skillLevelDisplay',
          options: [
            {
              label: {
                de: 'Text',
                en: 'Text',
              },
              value: 'text',
            },
            {
              label: {
                de: 'Punkte',
                en: 'Dots',
              },
              value: 'dots',
            },
            {
              label: {
                de: 'Fortschrittsbalken',
                en: 'Progress Bar',
              },
              value: 'progressBar',
            },
          ],
          type: 'select',
        },
      ],
      label: {
        de: 'Stil',
        en: 'Style',
      },
      type: 'collapsible',
    },

    // PDF Layout Settings - collapsible
    {
      admin: {
        initCollapsed: false,
      },
      fields: [
        // First page margins - only shown when logo is first page only
        {
          admin: {
            condition: (data) => data?.logoDisplay === 'firstPageOnly',
          },
          fields: [
            {
              admin: {
                width: '25%',
              },
              defaultValue: 45,
              label: {
                de: '1. Seite oben (mm)',
                en: '1st Page Top (mm)',
              },
              min: 10,
              name: 'firstPageMarginTop',
              type: 'number',
            },
            {
              admin: {
                width: '25%',
              },
              defaultValue: 15,
              label: {
                de: '1. Seite unten (mm)',
                en: '1st Page Bottom (mm)',
              },
              min: 10,
              name: 'firstPageMarginBottom',
              type: 'number',
            },
            {
              admin: {
                width: '25%',
              },
              defaultValue: 30,
              label: {
                de: '1. Seite links (mm)',
                en: '1st Page Left (mm)',
              },
              min: 10,
              name: 'firstPageMarginLeft',
              type: 'number',
            },
            {
              admin: {
                width: '25%',
              },
              defaultValue: 30,
              label: {
                de: '1. Seite rechts (mm)',
                en: '1st Page Right (mm)',
              },
              min: 10,
              name: 'firstPageMarginRight',
              type: 'number',
            },
          ],
          type: 'row',
        },
        // Page margins (used for all pages when logo on all pages, or for other pages when logo first page only)
        {
          fields: [
            {
              admin: {
                width: '25%',
              },
              defaultValue: 45,
              label: {
                de: 'Rand oben (mm)',
                en: 'Margin Top (mm)',
              },
              min: 10,
              name: 'marginTop',
              type: 'number',
            },
            {
              admin: {
                width: '25%',
              },
              defaultValue: 15,
              label: {
                de: 'Rand unten (mm)',
                en: 'Margin Bottom (mm)',
              },
              min: 10,
              name: 'marginBottom',
              type: 'number',
            },
            {
              admin: {
                width: '25%',
              },
              defaultValue: 30,
              label: {
                de: 'Rand links (mm)',
                en: 'Margin Left (mm)',
              },
              min: 10,
              name: 'marginLeft',
              type: 'number',
            },
            {
              admin: {
                width: '25%',
              },
              defaultValue: 30,
              label: {
                de: 'Rand rechts (mm)',
                en: 'Margin Right (mm)',
              },
              min: 10,
              name: 'marginRight',
              type: 'number',
            },
          ],
          type: 'row',
        },
        {
          defaultValue: 'A4',
          label: {
            de: 'Seitenformat',
            en: 'Page Format',
          },
          name: 'pageFormat',
          options: [
            {
              label: 'A4',
              value: 'A4',
            },
            {
              label: 'Letter',
              value: 'LETTER',
            },
          ],
          type: 'select',
        },
        {
          defaultValue: 'centered',
          label: {
            de: 'Erste Seite Layout',
            en: 'First Page Layout',
          },
          name: 'firstPageLayout',
          options: [
            {
              label: {
                de: 'Zentriert',
                en: 'Centered',
              },
              value: 'centered',
            },
            {
              label: {
                de: 'Linksbündig',
                en: 'Left-aligned',
              },
              value: 'leftAligned',
            },
          ],
          type: 'select',
        },
      ],
      label: {
        de: 'PDF-Layout',
        en: 'PDF Layout',
      },
      type: 'collapsible',
    },
  ],
  label: {
    de: 'PDF-Stil',
    en: 'PDF Style',
  },
  slug: 'pdf-style',
}
