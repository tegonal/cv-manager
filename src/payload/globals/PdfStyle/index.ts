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
      ],
      label: {
        de: 'Logo-Einstellungen',
        en: 'Logo Settings',
      },
      type: 'collapsible',
    },

    // PDF Layout Settings - collapsible
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
        {
          admin: {
            description: {
              de: 'Seitenrand oben in mm',
              en: 'Top margin in mm',
            },
            width: '25%',
          },
          defaultValue: 45,
          label: {
            de: 'Rand oben',
            en: 'Top Margin',
          },
          min: 10,
          name: 'marginTop',
          type: 'number',
        },
        {
          admin: {
            description: {
              de: 'Seitenrand unten in mm',
              en: 'Bottom margin in mm',
            },
            width: '25%',
          },
          defaultValue: 15,
          label: {
            de: 'Rand unten',
            en: 'Bottom Margin',
          },
          min: 10,
          name: 'marginBottom',
          type: 'number',
        },
        {
          admin: {
            description: {
              de: 'Seitenrand links in mm',
              en: 'Left margin in mm',
            },
            width: '25%',
          },
          defaultValue: 30,
          label: {
            de: 'Rand links',
            en: 'Left Margin',
          },
          min: 10,
          name: 'marginLeft',
          type: 'number',
        },
        {
          admin: {
            description: {
              de: 'Seitenrand rechts in mm',
              en: 'Right margin in mm',
            },
            width: '25%',
          },
          defaultValue: 30,
          label: {
            de: 'Rand rechts',
            en: 'Right Margin',
          },
          min: 10,
          name: 'marginRight',
          type: 'number',
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
