'use client'
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
import React, { useEffect, useMemo } from 'react'

import { I18nCollection } from '@/lib/i18n-collection'
import { fetchCvAction } from '@/payload/plugins/cv-pdf-generator/actions'
import { GeneratePDFButton } from '@/payload/plugins/cv-pdf-generator/ui/generate-pdf-button'
import { baseClass, drawerSlug } from '@/payload/plugins/cv-pdf-generator/ui/save-button-replacer'
import { Company, Cv, Project } from '@/types/payload-types'

const profileKeys: (keyof Cv)[] = [
  'birthday',
  'nationalityStatus',
  'phoneNumber',
  'email',
  'links',
  'casualInfo',
]

const getLocalizedFieldLabel = (
  key: keyof typeof I18nCollection.fieldLabel,
  localeCode: string,
): string => {
  const fieldLabel = I18nCollection.fieldLabel[key]
  return fieldLabel ? (fieldLabel as Record<string, string>)[localeCode] : 'Unknown'
}

type FormField = {
  export: boolean
  key: string
  label: string
}

type FormSection = {
  fields: FormField[]
  section: string
}

export const ExportOverlay: React.FC = () => {
  const { id } = useDocumentInfo()
  const locale = useLocale()
  const { closeModal, isModalOpen } = useModal()
  const { t } = useTranslation()
  const isOpen = isModalOpen(drawerSlug)
  const [cv, setCv] = React.useState<Cv>()
  const [formState, setFormState] = React.useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!isOpen || !id) {
      return
    }
    const fetchData = async () => {
      try {
        const data = await fetchCvAction(id)
        if (data) {
          setCv(data)
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        toast.error(`Failed to load CV data: ${message}`)
      }
    }
    fetchData()
  }, [id, isOpen])

  useEffect(() => {
    if (!cv) {
      return
    }
    const profile = profileKeys.reduce<Record<string, boolean>>((acc, key) => {
      acc[key] = true
      return acc
    }, {})

    const projects = cv?.projects?.reduce<Record<string, boolean>>((acc, project) => {
      acc[`project_${project.id}`] = true
      return acc
    }, {})

    setFormState({ ...profile, ...projects })
  }, [cv])

  const availableOptions = useMemo(() => {
    const profile = [
      {
        fields: profileKeys.map((key) => ({
          export: formState[key] ?? true,
          key,
          label: getLocalizedFieldLabel(key as keyof typeof I18nCollection.fieldLabel, locale.code),
          value: cv && key in cv ? cv[key] : 'Unknown',
        })),
        section: getLocalizedFieldLabel('profile', locale.code),
      },
    ]

    const projects = [
      {
        fields: cv?.projects?.map((project) => ({
          export: formState[`project_${project.id}`] ?? true,
          key: `project_${project.id}`,
          label: `<strong>${(project.company as Company).name} - ${(project.project as Project).name}</strong>`,
        })),
        section: getLocalizedFieldLabel('projects', locale.code),
      },
    ]

    return [...profile, ...projects] as FormSection[]
  }, [formState, cv, locale.code])

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
          <h1 className={'text-2xl font-bold'}>Exporting CV of {cv?.fullName} as PDF</h1>
          <p>
            <strong>Important:</strong> Changes that have not been saved will not be reflected on
            the exported PDF file. Save your CV <em>before</em> exporting it.
          </p>
          <p>
            Below you can deselect parts of the CV. Deselected parts will not be displayed in the
            PDF.
          </p>
          <div>
            {availableOptions?.map((section) => (
              <div className={'mb-12'} key={section.section}>
                <h2 className={'text-xl font-bold'}>{section.section}</h2>
                <ul>
                  {section.fields?.map((field) => (
                    <li
                      className={
                        'flex gap-2 p-2 select-none hover:cursor-pointer hover:bg-emerald-200/15'
                      }
                      key={field.key}
                      onClick={() => onCheckboxChange(field.key)}>
                      <input
                        checked={field.export}
                        id={field.key}
                        name={field.key}
                        onChange={() => onCheckboxChange(field.key)}
                        type="checkbox"
                      />
                      <label
                        className={''}
                        dangerouslySetInnerHTML={{ __html: field.label }}
                        htmlFor={field.key}></label>
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
              onTransferred={() => closeModal(drawerSlug)}
              title={cv?.fullName || 'cv-export'}
            />
            <Button buttonStyle="secondary" onClick={() => closeModal(drawerSlug)}>
              {t('general:cancel')}
            </Button>
          </div>
        </div>
        <div>
          <Button
            buttonStyle="icon-label"
            className={`${baseClass}__cancel size-10`}
            onClick={() => closeModal(drawerSlug)}>
            <CloseMenuIcon />
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
