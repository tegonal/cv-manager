/* eslint-disable jsx-a11y/alt-text */
import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import React from 'react'

import { I18nCollection } from '@/lib/i18n-collection'

import {
  CvPdfTemplateProps,
  LexicalContent,
  mmToPt,
  PdfSectionContext,
  registerHyphenation,
  styles,
  tw,
} from '../lib'
import { FirstPageCentered, FirstPageLeftAligned } from './first-pages'
import {
  CasualInfoSection,
  EducationSection,
  ProfileSection,
  SkillsSection,
  WorkExperienceSection,
} from './sections'

// Re-export LexicalContent type for use in template
export type { LexicalContent }

const DefaultTemplate: React.FC<CvPdfTemplateProps> = ({
  companyInfo,
  cv,
  exportOverride,
  hasOverride,
  locale,
  profileImageDataUrl,
}) => {
  // Register locale-specific hyphenation (uses global Font.registerHyphenationCallback)
  registerHyphenation(locale)

  const skillLevelDisplay = companyInfo.skillLevelDisplay || 'text'
  const primaryColor = companyInfo.primaryColor || '#64748b'
  const secondaryColor = companyInfo.secondaryColor || '#4d4d4d'
  const fontFamily = companyInfo.fontFamily || 'Rubik'
  const firstPageLayout = companyInfo.firstPageLayout || 'centered'

  // Dynamic page margins (for pages 2+ or all pages when logo is on all pages)
  const marginTop = mmToPt(companyInfo.marginTop || 45)
  const marginBottom = mmToPt(companyInfo.marginBottom || 15)
  const marginLeft = mmToPt(companyInfo.marginLeft || 30)
  const marginRight = mmToPt(companyInfo.marginRight || 30)
  const pageFormat = companyInfo.pageFormat || 'A4'

  // First page margins (only used when logo is first page only)
  const logoFirstPageOnly = companyInfo.logoDisplay === 'firstPageOnly'
  const firstPageMarginTop = mmToPt(companyInfo.firstPageMarginTop || companyInfo.marginTop || 45)
  const firstPageMarginBottom = mmToPt(
    companyInfo.firstPageMarginBottom || companyInfo.marginBottom || 15,
  )
  const firstPageMarginLeft = mmToPt(
    companyInfo.firstPageMarginLeft || companyInfo.marginLeft || 30,
  )
  const firstPageMarginRight = mmToPt(
    companyInfo.firstPageMarginRight || companyInfo.marginRight || 30,
  )

  // First page style (used when logo is first page only)
  const firstPageStyle = {
    ...styles.page,
    fontFamily,
    paddingBottom: firstPageMarginBottom + 30, // Extra space for footer
    paddingLeft: firstPageMarginLeft,
    paddingRight: firstPageMarginRight,
    paddingTop: firstPageMarginTop,
  }

  // Dynamic page style with selected font and margins (for pages 2+ or all pages)
  const pageStyle = {
    ...styles.page,
    fontFamily,
    paddingBottom: marginBottom + 30, // Extra space for footer
    paddingLeft: marginLeft,
    paddingRight: marginRight,
    paddingTop: marginTop,
  }

  // Footer styles for first page and other pages
  const firstPageFooterStyle = {
    ...styles.footer,
    bottom: firstPageMarginBottom,
    left: firstPageMarginLeft,
    right: firstPageMarginRight,
  }

  const footerStyle = {
    ...styles.footer,
    bottom: marginBottom,
    left: marginLeft,
    right: marginRight,
  }

  // Dynamic heading styles with selected font
  const h1Style = { ...styles.h1, fontFamily }

  // Logo component (reusable)
  const LogoView = ({ fixed = false }: { fixed?: boolean }) =>
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
  const FooterView = ({ style }: { style: typeof footerStyle }) => (
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
  const FirstPageContent = () =>
    firstPageLayout === 'leftAligned' ? (
      <FirstPageLeftAligned
        cv={cv}
        h1Style={h1Style}
        primaryColor={primaryColor}
        profileImageDataUrl={profileImageDataUrl}
        styles={{ lead: styles.lead }}
      />
    ) : (
      <FirstPageCentered
        cv={cv}
        h1Style={h1Style}
        primaryColor={primaryColor}
        profileImageDataUrl={profileImageDataUrl}
        styles={{ lead: styles.lead }}
      />
    )

  const ctx: PdfSectionContext = {
    cv,
    exportOverride,
    fontFamily,
    hasOverride,
    locale,
    primaryColor,
    secondaryColor,
    skillLevelDisplay,
  }

  // When logo is first page only, use separate pages with different margins
  if (logoFirstPageOnly) {
    return (
      <Document>
        {/* First Page with its own margins */}
        <Page dpi={300} size={pageFormat} style={firstPageStyle}>
          <LogoView />
          <FooterView style={firstPageFooterStyle} />
          <FirstPageContent />
        </Page>

        {/* Subsequent pages with standard margins */}
        <Page dpi={300} size={pageFormat} style={pageStyle}>
          <FooterView style={footerStyle} />

          {/* Profile */}
          <ProfileSection ctx={ctx} />

          {/* Education */}
          <EducationSection ctx={ctx} />

          {/* Casual Info */}
          <CasualInfoSection ctx={ctx} />

          {/* Force page break before Skills */}
          <View break />

          {/* Skills */}
          <SkillsSection ctx={ctx} />

          {/* Force page break before Work Experience */}
          <View break />

          {/* Work Experience and Projects */}
          <WorkExperienceSection ctx={ctx} />
        </Page>
      </Document>
    )
  }

  // Default: logo on all pages, use same margins throughout
  return (
    <Document>
      <Page dpi={300} size={pageFormat} style={pageStyle}>
        <LogoView fixed />
        <FooterView style={footerStyle} />

        {/* First Page - conditionally render based on layout setting */}
        <FirstPageContent />

        {/* Force page break after intro */}
        <View break />

        {/* Profile */}
        <ProfileSection ctx={ctx} />

        {/* Education */}
        <EducationSection ctx={ctx} />

        {/* Casual Info */}
        <CasualInfoSection ctx={ctx} />

        {/* Force page break before Skills */}
        <View break />

        {/* Skills */}
        <SkillsSection ctx={ctx} />

        {/* Force page break before Work Experience */}
        <View break />

        {/* Work Experience and Projects */}
        <WorkExperienceSection ctx={ctx} />
      </Page>
    </Document>
  )
}

export default DefaultTemplate
