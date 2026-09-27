'use client'
import { getTranslation } from '@payloadcms/translations'
import {
  Button,
  CloseMenuIcon,
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
  export: boolean
  key: string
  // Rendered as React content, never as HTML: labels contain user-entered names
  label: React.ReactNode
}

type FormSection = {
  fields: FormField[]
  section: string
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

  const availableOptions = useMemo<FormSection[]>(
    () => [
      {
        fields: profileKeys.map((key) => ({
          export: formState[key] ?? true,
          key,
          label: getTranslation(I18nCollection.fieldLabel[key], i18n),
        })),
        section: getTranslation(I18nCollection.fieldLabel.profile, i18n),
      },
      {
        fields: (cv?.projects ?? []).map((project) => ({
          export: formState[projectKey(project)] ?? true,
          key: projectKey(project),
          label: (
            <strong>
              {[project.company, project.project]
                .map((relation) => (typeof relation === 'object' ? relation?.name : undefined))
                .filter(Boolean)
                .join(' - ')}
            </strong>
          ),
        })),
        section: getTranslation(I18nCollection.fieldLabel.projects, i18n),
      },
    ],
    [formState, cv, i18n],
  )

  const onCheckboxChange = (key: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  return (
    <Drawer Header={null} slug={drawerSlug}>
      <div className={'mt-12 grid grid-cols-[auto_min-content]'}>
        <div className={'flex flex-col gap-8'}>
          <h1 className={'text-2xl font-bold'}>
            {text('heading').replace('{name}', cv?.fullName ?? '')}
          </h1>
          <p>
            <strong>{text('important')}</strong> {text('unsavedChanges')}
          </p>
          <p>{text('deselectHint')}</p>
          <div>
            {availableOptions.map((section) => (
              <div className={'mb-12'} key={section.section}>
                <h2 className={'text-xl font-bold'}>{section.section}</h2>
                <ul>
                  {section.fields.map((field) => (
                    <li className={'flex'} key={field.key}>
                      {/* The whole row toggles the checkbox, as its label */}
                      <label
                        className={
                          'flex flex-1 gap-2 p-2 select-none hover:cursor-pointer hover:bg-emerald-200/15'
                        }>
                        <input
                          checked={field.export}
                          id={field.key}
                          name={field.key}
                          onChange={() => onCheckboxChange(field.key)}
                          type="checkbox"
                        />
                        {field.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={'flex gap-4'}>
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
        <div>
          <Button
            buttonStyle="icon-label"
            className={`${baseClass}__cancel size-10`}
            onClick={close}>
            <CloseMenuIcon />
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
