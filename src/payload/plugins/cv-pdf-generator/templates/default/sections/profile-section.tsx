import { Text } from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'
import { socialPlatformOptions } from '@/payload/collections/CVs/tabs/profile'

import { formatDate, PdfSectionContext } from '../../lib'
import { GridCol, GridColSpan2, GridRow, LinkWithIcon, Section } from '../components'

export const ProfileSection: React.FC<{ ctx: PdfSectionContext }> = ({ ctx }) => {
  const { cv, headings, isSelected, locale, secondaryColor } = ctx
  const { h2, h3 } = headings

  return (
    <Section gap={4} wrap={false}>
      <Text style={h2}>{I18nCollection.fieldLabel.profile[locale]}</Text>

      <GridRow>
        {cv.birthday && isSelected('birthday') && (
          <GridCol>
            <Text style={h3}>{I18nCollection.fieldLabel.birthday[locale]}</Text>
            <Text>{formatDate(cv.birthday, locale)}</Text>
          </GridCol>
        )}

        {cv.nationalityStatus && isSelected('nationalityStatus') && (
          <GridCol>
            <Text style={h3}>{I18nCollection.fieldLabel.nationalityStatus[locale]}</Text>
            <Text>{cv.nationalityStatus}</Text>
          </GridCol>
        )}

        {cv.phoneNumber && isSelected('phoneNumber') && (
          <GridCol>
            <Text style={h3}>{I18nCollection.fieldLabel.phoneNumber[locale]}</Text>
            <Text>{cv.phoneNumber}</Text>
          </GridCol>
        )}

        {/* External profile links */}
        {(cv.links?.length ?? 0) > 0 && isSelected('links') && (
          <GridCol>
            <Text style={h3}>{I18nCollection.fieldLabel.externalProfiles[locale]}</Text>
            {cv.links?.map((link) => (
              <LinkWithIcon color={secondaryColor} href={link.url} key={link.id}>
                {socialPlatformOptions.find(({ value }) => value === link.platform)?.label ??
                  link.platform}
              </LinkWithIcon>
            ))}
          </GridCol>
        )}

        {/* Email spans 2 columns */}
        {cv.email && isSelected('email') && (
          <GridColSpan2>
            <Text style={h3}>{I18nCollection.fieldLabel.email[locale]}</Text>
            <LinkWithIcon color={secondaryColor} href={`mailto:${cv.email}`}>
              {cv.email}
            </LinkWithIcon>
          </GridColSpan2>
        )}
      </GridRow>
    </Section>
  )
}
