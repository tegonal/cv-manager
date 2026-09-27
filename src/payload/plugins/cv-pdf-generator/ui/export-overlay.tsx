'use client'
import type { StaticLabel } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import {
  Banner,
  Button,
  CheckboxInput,
  Drawer,
  toast,
  useDocumentInfo,
  useLocale,
  useModal,
  useTranslation,
} from '@payloadcms/ui'
import React, { useEffect, useEffectEvent, useMemo, useState } from 'react'

import { I18nCollection } from '@/lib/i18n-collection'
import { fetchCvAction } from '@/payload/plugins/cv-pdf-generator/actions'
import { baseClass, drawerSlug } from '@/payload/plugins/cv-pdf-generator/ui/constants'
import { GeneratePDFButton } from '@/payload/plugins/cv-pdf-generator/ui/generate-pdf-button'
import { Cv } from '@/types/payload-types'

import './cv-pdf-generator.scss'

const profileKeys: (keyof Cv & keyof typeof I18nCollection.fieldLabel)[] = [
  'birthday',
  'nationalityStatus',
  'phoneNumber',
  'email',
  'links',
  'casualInfo',
]

const projectKey = (project: NonNullable<Cv['projects']>[number]) => `project_${project.id}`

// Every profile field and project is exported unless deselected
const getDefaultExportState = (cv: Cv): Record<string, boolean> =>
  Object.fromEntries(
    [...profileKeys, ...(cv.projects ?? []).map(projectKey)].map((key) => [key, true]),
  )

type FormField = {
  key: string
  // Rendered as text by the checkbox label, never as HTML: labels contain user-entered names
  label: StaticLabel
}

type FormSection = {
  fields: FormField[]
  key: string
  title: StaticLabel
}

export const ExportOverlay: React.FC = () => {
  const { id } = useDocumentInfo()
  const locale = useLocale()
  const { closeModal, isModalOpen } = useModal()
  // Texts follow the admin language, the PDF the content locale
  const { i18n, t } = useTranslation()
  const text = (key: keyof typeof I18nCollection.pdfExport) =>
    getTranslation(I18nCollection.pdfExport[key], i18n)
  const isOpen = isModalOpen(drawerSlug)
  const [cv, setCv] = useState<Cv>()
  const [formState, setFormState] = useState<Record<string, boolean>>({})

  const close = () => closeModal(drawerSlug)

  // Not a dependency of the loading effect: a new i18n object must not reload the CV and reset
  // the selection
  const onLoadError = useEffectEvent((error: unknown) => {
    const message = error instanceof Error ? error.message : text('unknownError')
    toast.error(`${text('loadFailed')}: ${message}`)
  })

  useEffect(() => {
    if (!isOpen || !id) {
      return
    }
    const fetchData = async () => {
      try {
        const data = await fetchCvAction(id)
        if (data) {
          setCv(data)
          setFormState(getDefaultExportState(data))
        }
      } catch (error) {
        onLoadError(error)
      }
    }
    fetchData()
  }, [id, isOpen])

  const sections = useMemo<FormSection[]>(() => {
    const projects = (cv?.projects ?? []).map((project) => ({
      key: projectKey(project),
      label: [project.company, project.project]
        .map((relation) => (typeof relation === 'object' ? relation?.name : undefined))
        .filter(Boolean)
        .join(' - '),
    }))
    return [
      {
        fields: profileKeys.map((key) => ({ key, label: I18nCollection.fieldLabel[key] })),
        key: 'profile',
        title: I18nCollection.fieldLabel.profile,
      },
      ...(projects.length > 0
        ? [{ fields: projects, key: 'projects', title: I18nCollection.fieldLabel.projects }]
        : []),
    ]
  }, [cv])

  const isSelected = (key: string) => formState[key] ?? true

  const onCheckboxChange = (key: string) => {
    setFormState((prevState) => ({ ...prevState, [key]: !(prevState[key] ?? true) }))
  }

  // Sets every key explicitly: the export treats a missing key as selected
  const setSection = (section: FormSection, selected: boolean) => {
    setFormState((prevState) => ({
      ...prevState,
      ...Object.fromEntries(section.fields.map(({ key }) => [key, selected])),
    }))
  }

  return (
    <Drawer
      className={baseClass}
      slug={drawerSlug}
      title={text('heading').replace('{name}', cv?.fullName ?? '…')}>
      <div className={`${baseClass}__body`}>
        <Banner type="info">
          <strong>{text('important')}</strong> {text('unsavedChanges')}
        </Banner>
        <p className={`${baseClass}__hint`}>{text('deselectHint')}</p>
        <div className={`${baseClass}__sections`}>
          {sections.map((section) => {
            const selectedCount = section.fields.filter(({ key }) => isSelected(key)).length
            const allSelected = selectedCount === section.fields.length
            return (
              <section className={`${baseClass}__section`} key={section.key}>
                <header className={`${baseClass}__section-header`}>
                  <h3 className={`${baseClass}__section-title`}>
                    {getTranslation(section.title, i18n)}
                  </h3>
                  <span className={`${baseClass}__count`}>
                    {text('selectedCount')
                      .replace('{selected}', String(selectedCount))
                      .replace('{total}', String(section.fields.length))}
                  </span>
                  <CheckboxInput
                    checked={allSelected}
                    className={`${baseClass}__select-all`}
                    id={`${baseClass}-all-${section.key}`}
                    label={I18nCollection.pdfExport.selectAll}
                    name={`${baseClass}-all-${section.key}`}
                    onToggle={() => setSection(section, !allSelected)}
                    partialChecked={selectedCount > 0}
                  />
                </header>
                <ul className={`${baseClass}__options`}>
                  {section.fields.map((field) => (
                    <li key={field.key}>
                      <CheckboxInput
                        checked={isSelected(field.key)}
                        id={`${baseClass}-${field.key}`}
                        label={field.label}
                        name={field.key}
                        onToggle={() => onCheckboxChange(field.key)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
        <div className={`${baseClass}__actions`}>
          <GeneratePDFButton
            exportOverride={formState}
            id={id}
            locale={locale.code}
            onTransferred={close}
            title={cv?.fullName || 'cv-export'}
          />
          <Button buttonStyle="secondary" onClick={close}>
            {t('general:cancel')}
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
