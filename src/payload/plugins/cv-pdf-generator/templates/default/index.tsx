/* eslint-disable jsx-a11y/alt-text */
import type { Style } from '@react-pdf/types'

import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import React from 'react'

import {
  CompanyInfoData,
  createHeadingStyles,
  CvPdfTemplateProps,
  DEFAULT_MARGINS_MM,
  FOOTER_SPACE,
  mmToPt,
  PdfSectionContext,
  styles,
  tw,
} from '../lib'
import { FirstPageCentered, FirstPageLeftAligned, FirstPageProps } from './first-pages'
import {
  CasualInfoSection,
  EducationSection,
  ProfileSection,
  SkillsSection,
  WorkExperienceSection,
} from './sections'

type Margins = typeof DEFAULT_MARGINS_MM

// Page and footer styles for page margins in mm
const pageStyles = (margins: Margins, fontFamily: string) => {
  const bottom = mmToPt(margins.bottom)
  const left = mmToPt(margins.left)
  const right = mmToPt(margins.right)

  return {
    footer: { ...styles.footer, bottom, left, right },
    page: {
      ...styles.page,
      fontFamily,
      paddingBottom: bottom + FOOTER_SPACE,
      paddingLeft: left,
      paddingRight: right,
      paddingTop: mmToPt(margins.top),
    },
  }
}

// Logo component (reusable)
const LogoView = ({
  companyInfo,
  fixed = false,
}: {
  companyInfo: CompanyInfoData
  fixed?: boolean
}) =>
  companyInfo.logoDataUrl ? (
    <View
      fixed={fixed}
      style={{
        left:
          companyInfo.logoPosition === 'left'
            ? mmToPt(companyInfo.logoMarginLeft ?? 10)
            : undefined,
        position: 'absolute',
        right:
          companyInfo.logoPosition !== 'left'
            ? mmToPt(companyInfo.logoMarginRight ?? 10)
            : undefined,
        top: mmToPt(companyInfo.logoMarginTop ?? 10),
      }}>
      <Image
        src={companyInfo.logoDataUrl}
        style={{
          height: companyInfo.logoHeight ? mmToPt(companyInfo.logoHeight) : 'auto',
          width: mmToPt(companyInfo.logoWidth || 30),
        }}
      />
    </View>
  ) : null

// Footer component (reusable)
const FooterView = ({ companyInfo, style }: { companyInfo: CompanyInfoData; style: Style }) => (
  <View fixed style={style}>
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
)

// First page content component (reusable)
const FirstPageContent = ({
  layout,
  ...props
}: FirstPageProps & { layout: CompanyInfoData['firstPageLayout'] }) =>
  layout === 'leftAligned' ? <FirstPageLeftAligned {...props} /> : <FirstPageCentered {...props} />

const DefaultTemplate: React.FC<CvPdfTemplateProps> = ({
  companyInfo,
  cv,
  isSelected,
  locale,
  profileImageDataUrl,
}) => {
  const skillLevelDisplay = companyInfo.skillLevelDisplay || 'text'
  const primaryColor = companyInfo.primaryColor || '#64748b'
  const secondaryColor = companyInfo.secondaryColor || '#4d4d4d'
  const fontFamily = companyInfo.fontFamily || 'Rubik'
  const firstPageLayout = companyInfo.firstPageLayout || 'centered'
  const pageFormat = companyInfo.pageFormat || 'A4'
  const headings = createHeadingStyles(fontFamily)

  // Margins of pages 2+, or of all pages when the logo is on all pages
  const margins: Margins = {
    bottom: companyInfo.marginBottom || DEFAULT_MARGINS_MM.bottom,
    left: companyInfo.marginLeft || DEFAULT_MARGINS_MM.left,
    right: companyInfo.marginRight || DEFAULT_MARGINS_MM.right,
    top: companyInfo.marginTop || DEFAULT_MARGINS_MM.top,
  }
  const otherPages = pageStyles(margins, fontFamily)

  const firstPageContent = (
    <FirstPageContent
      cv={cv}
      h1Style={headings.h1}
      layout={firstPageLayout}
      primaryColor={primaryColor}
      profileImageDataUrl={profileImageDataUrl}
    />
  )

  const ctx: PdfSectionContext = {
    cv,
    headings,
    isSelected,
    locale,
    primaryColor,
    secondaryColor,
    skillLevelDisplay,
  }

  const sections = (
    <>
      <ProfileSection ctx={ctx} />
      <EducationSection ctx={ctx} />
      <CasualInfoSection ctx={ctx} />

      {/* Force page break before Skills */}
      <View break />
      <SkillsSection ctx={ctx} />

      {/* Force page break before Work Experience */}
      <View break />
      <WorkExperienceSection ctx={ctx} />
    </>
  )

  // When the logo is on the first page only, that page has its own margins
  if (companyInfo.logoDisplay === 'firstPageOnly') {
    const firstPage = pageStyles(
      {
        bottom: companyInfo.firstPageMarginBottom || margins.bottom,
        left: companyInfo.firstPageMarginLeft || margins.left,
        right: companyInfo.firstPageMarginRight || margins.right,
        top: companyInfo.firstPageMarginTop || margins.top,
      },
      fontFamily,
    )

    return (
      <Document>
        <Page dpi={300} size={pageFormat} style={firstPage.page}>
          <LogoView companyInfo={companyInfo} />
          <FooterView companyInfo={companyInfo} style={firstPage.footer} />
          {firstPageContent}
        </Page>

        <Page dpi={300} size={pageFormat} style={otherPages.page}>
          <FooterView companyInfo={companyInfo} style={otherPages.footer} />
          {sections}
        </Page>
      </Document>
    )
  }

  // Default: logo on all pages, use same margins throughout
  return (
    <Document>
      <Page dpi={300} size={pageFormat} style={otherPages.page}>
        <LogoView companyInfo={companyInfo} fixed />
        <FooterView companyInfo={companyInfo} style={otherPages.footer} />
        {firstPageContent}

        {/* Force page break after intro */}
        <View break />
        {sections}
      </Page>
    </Document>
  )
}

export default DefaultTemplate
