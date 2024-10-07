'use client';

import {
  Button,
  Drawer,
  useConfig,
  useDocumentInfo,
  useLocale,
  useModal,
  useTranslation,
} from '@payloadcms/ui';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import React, { use, useMemo } from 'react';
import { Company, Cv, Project } from '@/types/payload-types';
import { I18nCollection } from '@/lib/i18nCollection';
import { baseClass, drawerSlug } from '@/payload/plugins/cv-pdf-generator/ui/saveButtonReplacer';
import { GeneratePDFButton } from '@/payload/plugins/cv-pdf-generator/ui/generatePdfButton';
import ky from 'ky';

const profileKeys: (keyof Cv)[] = [
  'birthday',
  'nationalityStatus',
  'phoneNumber',
  'email',
  'links',
];

const getLocalizedFieldLabel = (
  key: keyof typeof I18nCollection.fieldLabel,
  localeCode: string,
): string => {
  const fieldLabel = I18nCollection.fieldLabel[key];
  return fieldLabel ? (fieldLabel as Record<string, string>)[localeCode] : 'Unknown';
};

type FormField = {
  key: string;
  label: string;
  export: boolean;
};

type FormSection = {
  section: string;
  fields: FormField[];
};

const fetchCv = async (id: any, serverURL: string) => {
  if (!id) {
    return;
  }
  const response = await ky.get<Cv>(`${serverURL}/api/cv/${id}`);
  const data = await response.json();
  return data;
};

export const ExportOverlay: React.FC = () => {
  const { id } = useDocumentInfo();
  const locale = useLocale();
  const { closeModal, isModalOpen } = useModal();
  const { t } = useTranslation();
  const isOpen = isModalOpen(drawerSlug);

  const { config } = useConfig();
  const { serverURL } = config;

  const cv = use(
    useMemo(async () => {
      if (!isOpen) {
        return;
      }
      return await fetchCv(id, serverURL);
    }, [id, isOpen, serverURL]),
  );

  const initialFormState = useMemo(() => {
    const profile = profileKeys.reduce((acc, key) => {
      // @ts-ignore
      acc[key] = true;
      return acc;
    }, {});

    const projects = cv?.projects?.reduce((acc, project) => {
      // @ts-ignore
      acc[`project_${project.id}`] = true;
      return acc;
    }, {});

    return { ...profile, ...projects };
  }, [cv]);

  const [formState, setFormState] = React.useState<Record<string, boolean>>(initialFormState);

  const availableOptions = useMemo(() => {
    const profile = [
      {
        section: getLocalizedFieldLabel('profile', locale.code),
        fields: profileKeys.map((key) => ({
          key,
          label: getLocalizedFieldLabel(key as any, locale.code),
          value: cv && key in cv ? cv[key] : 'Unknown',
          export: formState[key] ?? true,
        })),
      },
    ];

    const projects = [
      {
        section: getLocalizedFieldLabel('projects', locale.code),
        fields: cv?.projects?.map((project) => ({
          key: `project_${project.id}`,
          label: `<strong>${(project.company as Company).name} - ${(project.project as Project).name}</strong>: ${project.description}`,
          export: formState[`project_${project.id}`] ?? true,
        })),
      },
    ];

    return [...profile, ...projects] as FormSection[];
  }, [formState, cv, locale.code]);

  const onCheckboxChange = (key: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <Drawer slug={drawerSlug} Header={null}>
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
              <div key={section.section} className={'mb-12'}>
                <h2 className={'text-xl font-bold'}>{section.section}</h2>
                <ul>
                  {section.fields?.map((field) => (
                    <li
                      key={field.key}
                      className={
                        'flex select-none gap-2 p-2 hover:cursor-pointer hover:bg-emerald-200/15'
                      }
                      onClick={() => onCheckboxChange(field.key)}>
                      <input
                        type="checkbox"
                        id={field.key}
                        name={field.key}
                        checked={field.export}
                        onChange={() => onCheckboxChange(field.key)}
                      />
                      <label
                        htmlFor={field.key}
                        className={''}
                        dangerouslySetInnerHTML={{ __html: field.label }}></label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={'flex flex-row gap-4'}>
            <GeneratePDFButton
              id={id}
              locale={locale.code}
              title={cv?.fullName || 'cv-export'}
              exportOverride={formState}
            />
            <Button
              buttonStyle="secondary"
              className={`${baseClass}__cancel`}
              onClick={() => closeModal(drawerSlug)}>
              {t('general:cancel')}
            </Button>
          </div>
        </div>
        <div>
          <Button
            buttonStyle="icon-label"
            className={`${baseClass}__cancel`}
            onClick={() => closeModal(drawerSlug)}>
            <CloseIcon />
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
