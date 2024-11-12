import React from 'react';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import Image from 'next/image';
import { PayloadLexicalReactRenderer } from '@/lib/lexical-render/src/payloadLexicalReactRenderer';
import { Company, Level, Media, Project, Skill, SkillGroup } from '@/types/payload-types';
import { I18nCollection } from '@/lib/i18nCollection';
import { decodeFromBase64 } from 'next/dist/build/webpack/loaders/utils';
import { PayloadLexicalReactRendererContent } from '@/payload/utilities/lexical-render/src/payloadLexicalReactRenderer';
import { HighlightEntry } from '@/app/cv/[id]/(lib)/components/highlight';
import { capitalize, isEmpty } from 'lodash-es';

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
  exportOverride: Record<string, boolean>;
  secret: string;
};

const formatDate = (date: string, locale: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale);
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
  const filtered = filterEmptyLexicalNodes(data);
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

  const decodedParams: DecodedSearchParams = decodeFromBase64(query.searchParams.p as string);

  const { exportOverride } = decodedParams;

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

  const profileImage = (cv.image as Media)?.url || '';

  const hasOverride = (key: string) => {
    return key in exportOverride && exportOverride[key];
  };

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
      <div className={'break-after mt-24 text-center'}>
        <div className={'flex flex-col items-center justify-center gap-32'}>
          <div className={'flex flex-col gap-8'}>
            <div
              className={'circle-mask relative flex size-48 flex-row items-center justify-center'}>
              <Image
                className={'profile-image bg-black object-cover'}
                src={profileImage}
                fill={true}
                alt={cv.fullName}
              />
            </div>
            <div className={'flex flex-col justify-center gap-4'}>
              <div>
                <h1>{cv.fullName}</h1>
                <p>{cv.jobTitle}</p>
              </div>
            </div>
          </div>
          <div className={'lead w-2/3'}>
            <h3>{I18nCollection.fieldLabel.introduction[locale]}</h3>
            <PayloadLexicalReactRenderer content={cv.introduction as any} />
          </div>
        </div>
      </div>
      <div className={'break-after mt-16'}>
        <div className={'grid grid-cols-12 gap-x-8 gap-y-12'}>
          <div className={'col-span-4 flex flex-col gap-4'}>
            <h2>{I18nCollection.fieldLabel.profile[locale]}</h2>
            {cv.birthday && hasOverride('birthday') && (
              <div>
                <h3>{I18nCollection.fieldLabel.birthday[locale]}</h3>
                <p>{formatDate(cv.birthday, locale)}</p>
              </div>
            )}
            {cv.nationalityStatus && hasOverride('nationalityStatus') && (
              <div>
                <h3>{I18nCollection.fieldLabel.nationalityStatus[locale]}</h3>
                <p>{cv.nationalityStatus}</p>
              </div>
            )}
            {cv.phoneNumber && hasOverride('phoneNumber') && (
              <div>
                <h3>{I18nCollection.fieldLabel.phoneNumber[locale]}</h3>
                <p>{cv.phoneNumber}</p>
              </div>
            )}
            {cv.email && hasOverride('email') && (
              <div>
                <h3>{I18nCollection.fieldLabel.email[locale]}</h3>
                <p>{cv.email}</p>
              </div>
            )}
            {!isEmpty(cv.links) && hasOverride('links') && (
              <div>
                <h3>{I18nCollection.fieldLabel.links[locale]}</h3>
                {cv.links?.map((link) => (
                  <div key={link.id}>
                    <a href={link.url}>{capitalize(link.platform)}</a>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={'col-span-8 flex flex-col gap-4'}>
            <h2>{I18nCollection.fieldLabel.education[locale]}</h2>
            {!isEmpty(cv.eduHighlights) && (
              <div className={'flex flex-col gap-4'}>
                {cv.eduHighlights?.map((item) => (
                  <HighlightEntry
                    key={item.id}
                    title={item.title}
                    subtitle={fromToYear(item.fromYear, item.toYear)}
                    description={item.description}
                  />
                ))}
              </div>
            )}

            {!isEmpty(cv.edu) && (
              <div className={'flex flex-col gap-4'}>
                {cv.edu?.map((item) => (
                  <div key={item.id}>
                    <p className={'font-normal'}>{item.institution}</p>
                    <p className={'small'}>{fromToYear(item.fromYear, item.toYear)}</p>
                    <div>
                      <PayloadLexicalReactRenderer content={item.description as any} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isEmpty(cv.certs) && (
              <div className={'flex flex-col gap-4'}>
                <h3>{I18nCollection.fieldLabel.certifications[locale]}</h3>
                {cv.certs?.map((item) => (
                  <div key={item.id}>
                    <p className={'font-normal'}>{item.name}</p>
                    <p className={'small'}>{fromToYear(item.toYear)}</p>
                    <div>
                      <PayloadLexicalReactRenderer content={item.description as any} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isEmpty(cv.courses) && (
              <div className={'flex flex-col gap-4'}>
                <h3>{I18nCollection.fieldLabel.courses[locale]}</h3>
                {cv.courses?.map((item) => (
                  <div key={item.id}>
                    <p className={'font-normal'}>{item.name}</p>
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
            {!isEmpty(cv.skillHighlights) && (
              <div className={'grid grid-cols-1 gap-6'}>
                {cv.skillHighlights?.map((item) => (
                  <HighlightEntry
                    key={item.id}
                    title={(item.skill as Skill).name}
                    subtitle={(item.level as Level).level}
                    description={item.description}
                  />
                ))}
              </div>
            )}
            {cv.skillGroups?.map((group) => {
              if (group.skills && group.skills.length < 1) return null;
              return (
                <div key={group.id} className={'flex flex-col gap-4'}>
                  <h3>{(group.group as SkillGroup).name}</h3>
                  <div className={'grid grid-cols-3 gap-6'}>
                    {group.skills?.map((item) => (
                      <div key={item.id}>
                        <p className={'font-normal'}>{(item.skill as Skill).name}</p>
                        <p className={'small'}>{(item.level as Level).level}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {!isEmpty(cv.otherSkills) && (
              <div className={'flex flex-col gap-4'}>
                <h3>{I18nCollection.fieldLabel.otherSkills[locale]}</h3>
                <div className={'grid grid-cols-3 gap-6'}>
                  {cv.otherSkills?.map((item) => (
                    <div key={item.id}>
                      <p className={'font-normal'}>{item.name}</p>
                      <p className={'small'}>{(item.level as Level).level}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!isEmpty(cv.lang) && (
              <div className={'flex flex-col gap-4'}>
                <h3>{I18nCollection.fieldLabel.languages[locale]}</h3>
                <div className={'grid grid-cols-3 gap-6'}>
                  {cv.lang?.map((item) => (
                    <div key={item.id}>
                      <p className={'font-normal'}>{(item.language as Skill).name}</p>
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
      <div className={''}>
        <div className={'grid w-5/6 grid-cols-12 gap-12'}>
          <div className={'col-span-12 flex flex-col gap-8'}>
            <h2>{I18nCollection.fieldLabel.workExperience[locale]}</h2>
            {!isEmpty(cv.jobHighlights) && (
              <div className={'grid grid-cols-1 gap-6'}>
                {cv.jobHighlights?.map((item) => (
                  <HighlightEntry
                    key={item.id}
                    title={(item.company as Company).name}
                    subtitle={fromToYear(item.fromYear, item.toYear)}
                    description={item.description}
                  />
                ))}
              </div>
            )}
            {!isEmpty(cv.projects) && (
              <div className={'grid grid-cols-1 gap-6'}>
                <h3>{I18nCollection.fieldLabel.projects[locale]}</h3>
                {cv.projects?.map((item) => {
                  const projectKey = `project_${item.id}`;
                  if (projectKey in exportOverride && !exportOverride[projectKey]) return null;
                  return (
                    <div key={item.id}>
                      <p className={'mb-0.5 font-normal'}>{(item.company as Company).name}</p>
                      <p className={'small mb-0.5'}>{(item.project as Project).name}</p>
                      <p className={'small mb-0.5'}>{fromToYear(item.fromYear, item.toYear)}</p>
                      <div>
                        <PayloadLexicalReactRenderer content={item.description as any} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {hasLexicalNodes(cv.casualInfo as any) && hasOverride('casualInfo') && (
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
