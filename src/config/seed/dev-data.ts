import fs from 'fs'
import path from 'path'
import { Payload } from 'payload'

export const seedDevData = async (payload: Payload) => {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  payload.logger.info('Running dev data seed...')

  // Seed Company Info global
  const companyInfo = await payload.findGlobal({ slug: 'company-info' })
  const needsCompanyInfo = !companyInfo.name

  if (needsCompanyInfo) {
    payload.logger.info('Seeding company info...')
    await payload.updateGlobal({
      data: {
        address: companyInfo.address || 'Musterstrasse 1',
        city: companyInfo.city || '3000 Bern',
        name: companyInfo.name || 'Acme Corp',
        url: companyInfo.url || 'https://example.com',
      },
      slug: 'company-info',
    })
  }

  // Seed PDF Style global
  const pdfStyle = await payload.findGlobal({ slug: 'pdf-style' })
  const needsPdfStyle = !pdfStyle.fontFamily
  const needsLogo = !pdfStyle.logo

  payload.logger.info(
    `PDF style check: fontFamily=${pdfStyle.fontFamily}, logo=${pdfStyle.logo}, needsPdfStyle=${needsPdfStyle}, needsLogo=${needsLogo}`,
  )

  if (needsPdfStyle || needsLogo) {
    payload.logger.info('Seeding PDF style...')

    // Upload logo from seed-assets if needed
    let logoId: number | undefined = pdfStyle.logo as number | undefined
    if (needsLogo) {
      const logoPath = path.join(process.cwd(), 'seed-assets', 'acme-logo.svg')
      if (fs.existsSync(logoPath)) {
        const logoBuffer = fs.readFileSync(logoPath)
        const logoMedia = await payload.create({
          collection: 'media',
          context: { skipOrgPrefix: true },
          data: {
            alt: 'Acme Corp Logo',
          },
          file: {
            data: logoBuffer,
            mimetype: 'image/svg+xml',
            name: 'acme-logo.svg',
            size: logoBuffer.length,
          },
        })
        logoId = logoMedia.id
        payload.logger.info('Seeded company logo')
      }
    }

    await payload.updateGlobal({
      data: {
        fontFamily: pdfStyle.fontFamily || 'Open Sans',
        logo: logoId,
        logoDisplay: pdfStyle.logoDisplay || 'allPages',
        logoPosition: pdfStyle.logoPosition || 'left',
        logoWidth: pdfStyle.logoWidth || 30,
        marginBottom: pdfStyle.marginBottom || 15,
        marginLeft: pdfStyle.marginLeft || 30,
        marginRight: pdfStyle.marginRight || 30,
        marginTop: pdfStyle.marginTop || 45,
        pageFormat: pdfStyle.pageFormat || 'A4',
        primaryColor: pdfStyle.primaryColor || '#3b82f6',
        secondaryColor: pdfStyle.secondaryColor || '#64748b',
        skillLevelDisplay: pdfStyle.skillLevelDisplay || 'dots',
      },
      slug: 'pdf-style',
    })
  }

  // Check if data already exists
  const existingCvs = await payload.find({
    collection: 'cv',
    limit: 1,
  })

  if (existingCvs.docs.length > 0) {
    return
  }

  payload.logger.info('Seeding development data...')

  // Get the test organisation created by dev-user seed
  const orgs = await payload.find({
    collection: 'organisations',
    limit: 1,
  })

  if (orgs.docs.length === 0) {
    payload.logger.warn('No organisation found, skipping dev data seed')
    return
  }

  const orgId = orgs.docs[0].id

  // Seed Levels
  const levels = await Promise.all([
    payload.create({
      collection: 'level',
      data: {
        description: 'Basic understanding and limited experience',
        level: 'Beginner',
        levelType: ['skill', 'language'],
        points: 1,
      },
    }),
    payload.create({
      collection: 'level',
      data: {
        description: 'Good working knowledge and regular usage',
        level: 'Intermediate',
        levelType: ['skill', 'language'],
        points: 2,
      },
    }),
    payload.create({
      collection: 'level',
      data: {
        description: 'Strong proficiency and extensive experience',
        level: 'Advanced',
        levelType: ['skill', 'language'],
        points: 3,
      },
    }),
    payload.create({
      collection: 'level',
      data: {
        description: 'Mastery level with deep expertise',
        level: 'Expert',
        levelType: ['skill', 'language'],
        points: 4,
      },
    }),
    payload.create({
      collection: 'level',
      data: {
        description: 'Native speaker level',
        level: 'Native',
        levelType: ['language'],
        points: 5,
      },
    }),
  ])

  const [beginner, intermediate, advanced, expert, native] = levels

  // Seed Languages
  const languages = await Promise.all([
    payload.create({
      collection: 'langs',
      data: { name: 'English' },
    }),
    payload.create({
      collection: 'langs',
      data: { name: 'German' },
    }),
    payload.create({
      collection: 'langs',
      data: { name: 'French' },
    }),
    payload.create({
      collection: 'langs',
      data: { name: 'Spanish' },
    }),
  ])

  const [english, german, french, spanish] = languages

  // Seed Skill Groups
  const skillGroups = await Promise.all([
    payload.create({
      collection: 'skillGroup',
      data: { name: 'Backend Development' },
    }),
    payload.create({
      collection: 'skillGroup',
      data: { name: 'Frontend Development' },
    }),
    payload.create({
      collection: 'skillGroup',
      data: { name: 'DevOps & Infrastructure' },
    }),
    payload.create({
      collection: 'skillGroup',
      data: { name: 'Databases' },
    }),
    payload.create({
      collection: 'skillGroup',
      data: { name: 'Project Management' },
    }),
  ])

  const [backend, frontend, devops, databases, projectMgmt] = skillGroups

  // Seed Skills
  const skills = await Promise.all([
    // Backend skills
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [{ text: 'Strongly typed JavaScript superset', type: 'text' }],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'TypeScript',
      },
    }),
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [
                  { text: 'JavaScript runtime for server-side development', type: 'text' },
                ],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'Node.js',
      },
    }),
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [{ text: 'Versatile programming language', type: 'text' }],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'Python',
      },
    }),
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [{ text: 'Enterprise-grade programming language', type: 'text' }],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'Java',
      },
    }),
    // Frontend skills
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [
                  { text: 'Popular frontend library for building user interfaces', type: 'text' },
                ],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'React',
      },
    }),
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [{ text: 'Progressive JavaScript framework', type: 'text' }],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'Vue.js',
      },
    }),
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [{ text: 'Styling and utility-first CSS framework', type: 'text' }],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'CSS/Tailwind',
      },
    }),
    // DevOps skills
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [{ text: 'Containerization platform', type: 'text' }],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'Docker',
      },
    }),
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [{ text: 'Container orchestration system', type: 'text' }],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'Kubernetes',
      },
    }),
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [
                  { text: 'Continuous integration and deployment pipelines', type: 'text' },
                ],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'CI/CD',
      },
    }),
    // Database skills
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [{ text: 'Advanced open source relational database', type: 'text' }],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'PostgreSQL',
      },
    }),
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [{ text: 'NoSQL document database', type: 'text' }],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'MongoDB',
      },
    }),
    // Project management skills
    payload.create({
      collection: 'skill',
      data: {
        description: {
          root: {
            children: [
              {
                children: [{ text: 'Agile project management methodology', type: 'text' }],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'Agile/Scrum',
      },
    }),
  ])

  const [
    typescript,
    nodejs,
    python,
    java,
    react,
    vuejs,
    css,
    docker,
    kubernetes,
    cicd,
    postgresql,
    mongodb,
    agile,
  ] = skills

  // Seed additional skills for sub-skills
  const subSkills = await Promise.all([
    payload.create({
      collection: 'skill',
      data: { name: 'Next.js' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'Redux' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'GraphQL' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'REST APIs' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'Express.js' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'NestJS' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'AWS' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'Terraform' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'GitHub Actions' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'Redis' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'Elasticsearch' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'Leadership' },
    }),
    payload.create({
      collection: 'skill',
      data: { name: 'Kanban' },
    }),
  ])

  const [
    nextjs,
    redux,
    graphql,
    restApis,
    express,
    nestjs,
    aws,
    terraform,
    githubActions,
    redis,
    elasticsearch,
    leadership,
    kanban,
  ] = subSkills

  // Seed Companies
  const companies = await Promise.all([
    payload.create({
      collection: 'company',
      data: { name: 'Tegonal GmbH' },
    }),
    payload.create({
      collection: 'company',
      data: { name: 'Tech Startup Inc.' },
    }),
    payload.create({
      collection: 'company',
      data: { name: 'Enterprise Solutions AG' },
    }),
    payload.create({
      collection: 'company',
      data: { name: 'Digital Agency Ltd.' },
    }),
  ])

  const [tegonal, techStartup, enterprise, digitalAgency] = companies

  // Seed Projects
  const projects = await Promise.all([
    payload.create({
      collection: 'project',
      data: {
        description: {
          root: {
            children: [
              {
                children: [
                  { text: 'Open source CV management system built with Payload CMS', type: 'text' },
                ],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        link: 'https://github.com/tegonal/cv-manager',
        name: 'CV Manager',
      },
    }),
    payload.create({
      collection: 'project',
      data: {
        description: {
          root: {
            children: [
              {
                children: [
                  { text: 'Full-stack e-commerce solution with React and Node.js', type: 'text' },
                ],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'E-Commerce Platform',
      },
    }),
    payload.create({
      collection: 'project',
      data: {
        description: {
          root: {
            children: [
              {
                children: [
                  { text: 'Enterprise cloud migration from on-premises to AWS', type: 'text' },
                ],
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        name: 'Cloud Migration',
      },
    }),
  ])

  const [cvManager, ecommerce, cloudMigration] = projects

  // Upload portrait image from seed-assets
  let portraitImageId: number | undefined
  const portraitPath = path.join(process.cwd(), 'seed-assets', 'clippy-portrait.jpg')
  if (fs.existsSync(portraitPath)) {
    const portraitBuffer = fs.readFileSync(portraitPath)
    const portraitMedia = await payload.create({
      collection: 'media',
      context: { skipOrgPrefix: true },
      data: {
        alt: 'John Developer Portrait',
      },
      file: {
        data: portraitBuffer,
        mimetype: 'image/jpeg',
        name: 'clippy-portrait.jpg',
        size: portraitBuffer.length,
      },
    })
    portraitImageId = portraitMedia.id
    payload.logger.info('Seeded CV portrait image')
  }

  // Seed CV
  await payload.create({
    collection: 'cv',
    data: {
      birthday: '1990-05-15',
      casualInfo: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'When not coding, I enjoy hiking in the Swiss Alps, playing chess, and contributing to open source projects.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
      certs: [
        {
          link: 'https://aws.amazon.com/certification/',
          name: 'AWS Solutions Architect Professional',
          toYear: '2023-03-01',
        },
        {
          name: 'Certified Kubernetes Administrator',
          toYear: '2022-06-01',
        },
      ],
      courses: [
        {
          description: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: 'Deep dive into advanced React patterns and performance optimization',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          name: 'Advanced React Patterns',
          toYear: '2024-01-01',
        },
      ],
      department: 'Engineering',
      edu: [
        {
          description: {
            root: {
              children: [
                {
                  children: [{ text: 'Bachelor of Science in Computer Science', type: 'text' }],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          fromYear: '2008-09-01',
          institution: 'ETH Zurich',
          toYear: '2012-07-01',
        },
        {
          description: {
            root: {
              children: [
                {
                  children: [{ text: 'Master of Science in Software Engineering', type: 'text' }],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          fromYear: '2012-09-01',
          institution: 'University of Bern',
          toYear: '2014-07-01',
        },
      ],
      eduHighlights: [
        {
          description: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: 'Graduated with honors, thesis on distributed systems and microservices architecture',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          fromYear: '2012-09-01',
          title: 'Master of Science in Software Engineering',
          toYear: '2014-07-01',
        },
        {
          description: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: 'Focus on algorithms, data structures, and software design patterns',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          fromYear: '2008-09-01',
          title: 'Bachelor of Science in Computer Science',
          toYear: '2012-07-01',
        },
      ],
      email: 'john.developer@example.com',
      fullName: 'John Developer',
      image: portraitImageId,
      introduction: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'Passionate software engineer with over 10 years of experience in full-stack development. Specialized in building scalable web applications and leading development teams. Strong advocate for clean code and agile methodologies.',
                  type: 'text',
                },
              ],
              type: 'paragraph',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
      jobHighlights: [
        {
          company: tegonal.id,
          description: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: 'Led the development of the CV Manager open source project',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          fromYear: '2020-01-01',
        },
      ],
      jobTitle: 'Senior Software Engineer',
      lang: [
        { language: english.id, level: native.id },
        { language: german.id, level: advanced.id },
        { language: french.id, level: intermediate.id },
        { language: spanish.id, level: beginner.id },
      ],
      links: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/johndeveloper' },
        { platform: 'github', url: 'https://github.com/johndeveloper' },
      ],
      nationalityStatus: 'Swiss Citizen',
      organisation: orgId,
      otherSkills: [
        {
          level: advanced.id,
          name: 'Technical Writing',
        },
        {
          level: intermediate.id,
          name: 'Public Speaking',
        },
        {
          level: advanced.id,
          name: 'Code Review',
        },
        {
          level: expert.id,
          name: 'Mentoring',
        },
      ],
      phoneNumber: '+41 79 123 45 67',
      projects: [
        {
          company: tegonal.id,
          description: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: 'Full-stack development of CV management system using Payload CMS, Next.js, and PostgreSQL',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          fromYear: '2023-01-01',
          project: cvManager.id,
        },
        {
          company: techStartup.id,
          description: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: 'Built scalable e-commerce platform handling 100k+ daily users',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          fromYear: '2021-06-01',
          project: ecommerce.id,
          toYear: '2022-12-01',
        },
        {
          company: enterprise.id,
          description: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: 'Migrated legacy systems to AWS, reducing infrastructure costs by 40%',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          fromYear: '2019-01-01',
          project: cloudMigration.id,
          toYear: '2020-06-01',
        },
      ],
      skillGroups: [
        {
          group: backend.id,
          skillGroupDescription: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: 'Strong focus on building robust, scalable APIs and microservices with modern technologies.',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          skills: [
            {
              level: expert.id,
              skill: { relationTo: 'skill', value: typescript.id },
              'sub-skill': [nodejs.id, nestjs.id],
            },
            {
              level: expert.id,
              skill: { relationTo: 'skill', value: nodejs.id },
              'sub-skill': [express.id, nestjs.id],
            },
            {
              level: advanced.id,
              skill: { relationTo: 'skill', value: python.id },
            },
            {
              level: intermediate.id,
              skill: { relationTo: 'skill', value: java.id },
            },
          ],
        },
        {
          group: frontend.id,
          skillGroupDescription: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: 'Expertise in building modern, responsive web applications with a focus on user experience.',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          skills: [
            {
              level: expert.id,
              skill: { relationTo: 'skill', value: react.id },
              'sub-skill': [nextjs.id, redux.id],
            },
            {
              level: advanced.id,
              skill: { relationTo: 'skill', value: vuejs.id },
            },
            {
              level: advanced.id,
              skill: { relationTo: 'skill', value: css.id },
            },
          ],
        },
        {
          group: devops.id,
          skillGroupDescription: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: 'Experience with containerization, orchestration, and CI/CD pipelines for modern cloud infrastructure.',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          skills: [
            {
              level: advanced.id,
              skill: { relationTo: 'skill', value: docker.id },
              'sub-skill': [kubernetes.id],
            },
            {
              level: intermediate.id,
              skill: { relationTo: 'skill', value: kubernetes.id },
            },
            {
              level: advanced.id,
              skill: { relationTo: 'skill', value: cicd.id },
              'sub-skill': [githubActions.id, terraform.id],
            },
          ],
        },
        {
          group: databases.id,
          skills: [
            {
              level: expert.id,
              skill: { relationTo: 'skill', value: postgresql.id },
            },
            {
              level: advanced.id,
              skill: { relationTo: 'skill', value: mongodb.id },
            },
            {
              level: intermediate.id,
              skill: { relationTo: 'skillGroup', value: databases.id },
              'sub-skill': [redis.id, elasticsearch.id],
            },
          ],
        },
        {
          group: projectMgmt.id,
          skillGroupDescription: {
            root: {
              children: [
                {
                  children: [
                    {
                      text: 'Proven track record in leading teams and managing projects using agile methodologies.',
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          skills: [
            {
              level: expert.id,
              skill: { relationTo: 'skill', value: agile.id },
              'sub-skill': [kanban.id],
            },
          ],
        },
      ],
      skillHighlights: [
        {
          description: {
            root: {
              children: [
                {
                  children: [{ text: 'Primary language for all modern projects', type: 'text' }],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          level: expert.id,
          skill: { relationTo: 'skill', value: typescript.id },
        },
        {
          description: {
            root: {
              children: [
                {
                  children: [{ text: 'Built numerous production applications', type: 'text' }],
                  type: 'paragraph',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          level: expert.id,
          skill: { relationTo: 'skill', value: react.id },
        },
      ],
    },
  })

  payload.logger.info('Development data seeded successfully!')
}
