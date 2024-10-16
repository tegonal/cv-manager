import React from 'react';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import Image from 'next/image';
import { PayloadLexicalReactRenderer } from '@/lib/lexical-render/src/payloadLexicalReactRenderer';
import { Company, Level, Media, Project, Skill } from '@/types/payload-types';
import { I18nCollection } from '@/lib/i18nCollection';
import { decodeFromBase64 } from 'next/dist/build/webpack/loaders/utils';
import { PayloadLexicalReactRendererContent } from '@/payload/utilities/lexical-render/src/payloadLexicalReactRenderer';
import { HighlightEntry } from '@/app/cv-print/[id]/(lib)/components/highlight';
import { capitalize } from 'lodash-es';

type Args = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

type DecodedSearchParams = {
  locale: 'de';
  excludedOptions: Record<string, boolean>;
  secret: string;
};

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
};

const formatYear = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.getFullYear().toString();
};

const fromToYear = (from?: string | null, to?: string | null) => {
  if (!from) return '';
  let returnString = formatYear(from);
  if (to) {
    returnString = `${returnString} - ${formatYear(to)}`;
  }
  return returnString;
};

// Recursively check nodes of lexical content that have empty children
const filterEmptyLexicalNodes = (data: PayloadLexicalReactRendererContent) => {
  if (data.root.children.length > 0) {
    data.root.children = data.root.children.filter((child) => {
      return !('children' in child && child.children.length === 0);
    });
  }
  return data;
};

const hasLexicalNodes = (data: PayloadLexicalReactRendererContent) => {
  if (!data) return false;
  console.log({ data });
  const filtered = filterEmptyLexicalNodes(data);
  console.log({ data, filtered });
  return filtered.root.children.length > 0;
};

const Page = async ({ params, searchParams }: Args) => {
  const query = {
    params: await params,
    searchParams: await searchParams,
  };
  const locale = 'de';

  const payload = await getPayloadHMR({ config: configPromise });

  if (!query.searchParams.p) {
    throw new Error('No parameters, Aborting');
  }

  const decodedParams: DecodedSearchParams = JSON.parse(
    decodeFromBase64(query.searchParams.p as string),
  );

  const cv = await payload
    .find({
      collection: 'cv',
      where: {
        id: {
          equals: query.params.id,
        },
      },
      locale: decodedParams.locale,
    })
    .then((data) => data.docs[0]);

  console.log({ decodedParams });

  return (
    <>
      <header id={'companyLogo'}>
        <Image src={'/tegonal.svg'} alt={'Tegonal Genossenschaft'} width={200} height={200} />
      </header>
      <footer id={'pageFooter'}>
        <div className={'small flex flex-row justify-between opacity-50'}>
          <div>
            <p>Tegonal Genossenschaft - Wasserwerkgasse 2 - 3011 Bern - tegonal.com</p>
          </div>
          <div>
            <p id={'pageNumber'}></p>
          </div>
        </div>
      </footer>
      {/* Basic Profile */}
      <div className={'break-after mt-16'}>
        <div className={'grid grid-cols-12 gap-x-8 gap-y-12'}>
          <div className={'col-span-4 flex flex-row justify-end'}>
            <div className={'circle-mask'}>
              <Image
                className={'profile-image bg-black'}
                src={(cv.image as Media)?.sizes?.tablet?.url || ''}
                width={400}
                height={400}
                alt={cv.fullName}
              />
            </div>
          </div>
          <div className={'col-span-8 flex flex-col justify-center'}>
            <div>
              <h1>{cv.fullName}</h1>
              <p>{cv.jobTitle}</p>
            </div>
          </div>
          <div className={'col-span-4'}></div>
          <div className={'lead col-span-8'}>
            <h3>{I18nCollection.fieldLabel.introduction[locale]}</h3>
            <PayloadLexicalReactRenderer content={cv.introduction as any} />
          </div>
        </div>
      </div>
      <div className={'break-after mt-16'}>
        <div className={'grid grid-cols-12 gap-x-8 gap-y-12'}>
          <div className={'col-span-4 flex flex-col gap-4'}>
            <h2>{I18nCollection.fieldLabel.profile[locale]}</h2>
            {cv.birthday && (
              <div>
                <h3>{I18nCollection.fieldLabel.birthday[locale]}</h3>
                <p>{formatDate(cv.birthday)}</p>
              </div>
            )}
            {cv.nationalityStatus && (
              <div>
                <h3>{I18nCollection.fieldLabel.nationalityStatus[locale]}</h3>
                <p>{cv.nationalityStatus}</p>
              </div>
            )}
            {cv.phoneNumber && (
              <div>
                <h3>{I18nCollection.fieldLabel.phoneNumber[locale]}</h3>
                <p>{cv.phoneNumber}</p>
              </div>
            )}
            {cv.email && (
              <div>
                <h3>{I18nCollection.fieldLabel.email[locale]}</h3>
                <p>{cv.email}</p>
              </div>
            )}
            {cv.links && cv.links.length > 0 && (
              <div>
                <h3>{I18nCollection.fieldLabel.links[locale]}</h3>
                {cv.links.map((link) => (
                  <div key={link.id}>
                    <a href={link.url}>{capitalize(link.platform)}</a>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={'col-span-8 flex flex-col gap-4'}>
            <h2>{I18nCollection.fieldLabel.education[locale]}</h2>

            {cv.eduHighlights && cv.eduHighlights.length > 0 && (
              <div className={'flex flex-col gap-4'}>
                {cv.eduHighlights.map((item) => (
                  <HighlightEntry
                    key={item.id}
                    title={item.title}
                    subtitle={fromToYear(item.fromYear, item.toYear)}
                    description={item.description}
                  />
                ))}
              </div>
            )}

            {cv.edu && cv.edu.length > 0 && (
              <div className={'flex flex-col gap-4'}>
                {cv.edu.map((item) => (
                  <div key={item.id}>
                    <p>{item.institution}</p>
                    <p className={'small'}>{fromToYear(item.fromYear, item.toYear)}</p>
                    <div>
                      <PayloadLexicalReactRenderer content={item.description as any} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cv.certs && cv.certs.length > 0 && (
              <div className={'flex flex-col gap-4'}>
                <h3>{I18nCollection.fieldLabel.certifications[locale]}</h3>
                {cv.certs.map((item) => (
                  <div key={item.id}>
                    <p>{item.name}</p>
                    <p className={'small'}>{fromToYear(item.toYear)}</p>
                    <div>
                      <PayloadLexicalReactRenderer content={item.description as any} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cv.courses && cv.courses.length > 0 && (
              <div className={'flex flex-col gap-4'}>
                <h3>{I18nCollection.fieldLabel.courses[locale]}</h3>
                {cv.courses.map((item) => (
                  <div key={item.id}>
                    <p>{item.name}</p>
                    <p className={'small'}>{fromToYear(item.toYear)}</p>
                    <div>
                      <PayloadLexicalReactRenderer content={item.description as any} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Skills */}
      <div className={'break-after'}>
        <div className={'grid grid-cols-12 gap-8'}>
          <div className={'col-span-12 flex flex-col gap-12'}>
            <h2>{I18nCollection.fieldLabel.skills[locale]}</h2>
            {cv.skillHighlights && cv.skillHighlights.length > 0 && (
              <div className={'grid grid-cols-1 gap-6'}>
                {cv.skillHighlights.map((item) => (
                  <HighlightEntry
                    key={item.id}
                    title={(item.skill as Skill).name}
                    subtitle={(item.level as Level).level}
                    description={item.description}
                  />
                ))}
              </div>
            )}
            {cv.technologies && cv.technologies.length > 0 && (
              <div className={'flex flex-col gap-4'}>
                <h3>{I18nCollection.fieldLabel.technologies[locale]}</h3>
                <div className={'grid grid-cols-3 gap-6'}>
                  {cv.technologies.map((item) => (
                    <div key={item.id}>
                      <p>{(item.skill as Skill).name}</p>
                      <p className={'small'}>{(item.level as Level).level}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {cv.softSkills && cv.softSkills.length > 0 && (
              <div className={'flex flex-col gap-4'}>
                <h3>{I18nCollection.fieldLabel.softSkills[locale]}</h3>
                <div className={'grid grid-cols-3 gap-6'}>
                  {cv.softSkills.map((item) => (
                    <div key={item.id}>
                      <p>{(item.softSkill as Skill).name}</p>
                      <p className={'small'}>{(item.level as Level).level}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {cv.otherSkills && cv.otherSkills.length > 0 && (
              <div className={'flex flex-col gap-4'}>
                <h3>{I18nCollection.fieldLabel.otherSkills[locale]}</h3>
                <div className={'grid grid-cols-4 gap-6'}>
                  {cv.otherSkills.map((item) => (
                    <div key={item.id}>
                      <p>{item.name}</p>
                      <p className={'small'}>{(item.level as Level).level}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {cv.languages && cv.languages.length > 0 && (
              <div className={'flex flex-col gap-4'}>
                <h3>{I18nCollection.fieldLabel.languages[locale]}</h3>
                <div className={'grid grid-cols-5 gap-6'}>
                  {cv.languages.map((item) => (
                    <div key={item.id}>
                      <p>{(item.language as Skill).name}</p>
                      <p className={'small'}>{(item.level as Level).level}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Projects and Work Experience */}
      <div className={'max-w-[80%]'}>
        <div className={'grid grid-cols-12 gap-12'}>
          <div className={'col-span-12 flex flex-col gap-8'}>
            <h2>{I18nCollection.fieldLabel.workExperience[locale]}</h2>
            {cv.jobHighlights && cv.jobHighlights.length > 0 && (
              <div className={'grid grid-cols-1 gap-6'}>
                {cv.jobHighlights.map((item) => (
                  <HighlightEntry
                    key={item.id}
                    title={(item.company as Company).name}
                    subtitle={fromToYear(item.fromYear, item.toYear)}
                    description={item.description}
                  />
                ))}
              </div>
            )}
            {cv.projects && cv.projects.length > 0 && (
              <div className={'grid grid-cols-1 gap-6'}>
                <h3>{I18nCollection.fieldLabel.projects[locale]}</h3>
                {cv.projects.map((item) => (
                  <div key={item.id}>
                    <p>{(item.company as Company).name}</p>
                    <p className={'small'}>{(item.project as Project).name}</p>
                    <p className={'small'}>{fromToYear(item.fromYear, item.toYear)}</p>
                    <div>
                      <PayloadLexicalReactRenderer content={item.description as any} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {hasLexicalNodes(cv.casualInfo as any) && (
            <div className={'col-span-12 flex flex-col gap-8'}>
              <h2>{I18nCollection.fieldLabel.casualInfo[locale]}</h2>
              <div>
                <PayloadLexicalReactRenderer
                  content={filterEmptyLexicalNodes(cv.casualInfo as any)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
