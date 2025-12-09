import { Payload } from 'payload'

export const seedDevData = async (payload: Payload) => {
  if (process.env.NODE_ENV === 'production') {
    return
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

  const [english, german, french] = languages

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
      email: 'john.developer@example.com',
      fullName: 'John Developer',
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
      ],
      links: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/johndeveloper' },
        { platform: 'github', url: 'https://github.com/johndeveloper' },
      ],
      nationalityStatus: 'Swiss Citizen',
      organisation: orgId,
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
          skills: [
            { level: expert.id, skill: { relationTo: 'skill', value: typescript.id } },
            { level: expert.id, skill: { relationTo: 'skill', value: nodejs.id } },
            { level: advanced.id, skill: { relationTo: 'skill', value: python.id } },
          ],
        },
        {
          group: frontend.id,
          skills: [
            { level: expert.id, skill: { relationTo: 'skill', value: react.id } },
            { level: advanced.id, skill: { relationTo: 'skill', value: vuejs.id } },
            { level: advanced.id, skill: { relationTo: 'skill', value: css.id } },
          ],
        },
        {
          group: devops.id,
          skills: [
            { level: advanced.id, skill: { relationTo: 'skill', value: docker.id } },
            { level: intermediate.id, skill: { relationTo: 'skill', value: kubernetes.id } },
            { level: advanced.id, skill: { relationTo: 'skill', value: cicd.id } },
          ],
        },
        {
          group: databases.id,
          skills: [
            { level: expert.id, skill: { relationTo: 'skill', value: postgresql.id } },
            { level: advanced.id, skill: { relationTo: 'skill', value: mongodb.id } },
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
