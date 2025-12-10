import { Text } from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'

import { createHeadingStyles, formatDate, PdfSectionContext } from '../../lib'
import { Grid3Cols, GridCol, GridColSpan2, LinkWithIcon, Section } from '../components'

export const ProfileSection: React.FC<{ ctx: PdfSectionContext }> = ({ ctx }) => {
  const { cv, fontFamily, hasOverride, locale, secondaryColor } = ctx
  const { h2, h3 } = createHeadingStyles(fontFamily)

  return (
    <Section gap={4} wrap={false}>
      <Text style={h2}>{I18nCollection.fieldLabel.profile[locale]}</Text>

      <Grid3Cols>
        {cv.birthday && hasOverride('birthday') && (
          <GridCol>
            <Text style={h3}>{I18nCollection.fieldLabel.birthday[locale]}</Text>
            <Text>{formatDate(cv.birthday, locale)}</Text>
          </GridCol>
        )}

        {cv.nationalityStatus && hasOverride('nationalityStatus') && (
          <GridCol>
            <Text style={h3}>{I18nCollection.fieldLabel.nationalityStatus[locale]}</Text>
            <Text>{cv.nationalityStatus}</Text>
          </GridCol>
        )}

        {cv.phoneNumber && hasOverride('phoneNumber') && (
          <GridCol>
            <Text style={h3}>{I18nCollection.fieldLabel.phoneNumber[locale]}</Text>
            <Text>{cv.phoneNumber}</Text>
          </GridCol>
        )}

        {/* External profile links */}
        {(cv.links?.length ?? 0) > 0 && hasOverride('links') && (
          <GridCol>
            <Text style={h3}>{I18nCollection.fieldLabel.externalProfiles[locale]}</Text>
            {cv.links?.map((link) => (
              <LinkWithIcon color={secondaryColor} href={link.url} key={link.id}>
                {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
              </LinkWithIcon>
            ))}
          </GridCol>
        )}

        {/* Email spans 2 columns */}
        {cv.email && hasOverride('email') && (
          <GridColSpan2>
            <Text style={h3}>{I18nCollection.fieldLabel.email[locale]}</Text>
            <LinkWithIcon color={secondaryColor} href={`mailto:${cv.email}`}>
              {cv.email}
            </LinkWithIcon>
          </GridColSpan2>
        )}
      </Grid3Cols>
    </Section>
  )
}
