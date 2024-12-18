/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "UserOrganisations".
 */
export type UserOrganisations =
  | {
      organisation: number | Organisation;
      roles: ('admin' | 'user')[];
      id?: string | null;
    }[]
  | null;
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "SocialLinks".
 */
export type SocialLinks =
  | {
      platform: 'linkedin' | 'x' | 'mastodon' | 'facebook' | 'github';
      url: string;
      id?: string | null;
    }[]
  | null;

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    cv: Cv;
    skill: Skill;
    skillGroup: SkillGroup;
    langs: Lang;
    level: Level;
    company: Company;
    project: Project;
    media: Media;
    organisations: Organisation;
    users: User;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    cv: CvSelect<false> | CvSelect<true>;
    skill: SkillSelect<false> | SkillSelect<true>;
    skillGroup: SkillGroupSelect<false> | SkillGroupSelect<true>;
    langs: LangsSelect<false> | LangsSelect<true>;
    level: LevelSelect<false> | LevelSelect<true>;
    company: CompanySelect<false> | CompanySelect<true>;
    project: ProjectSelect<false> | ProjectSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    organisations: OrganisationsSelect<false> | OrganisationsSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  locale: 'en' | 'de';
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cv".
 */
export interface Cv {
  id: number;
  fullName: string;
  image?: (number | null) | Media;
  introduction?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  casualInfo?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  birthday: string;
  nationalityStatus?: string | null;
  phoneNumber?: string | null;
  email: string;
  jobTitle: string;
  department?: string | null;
  links?: SocialLinks;
  lang?:
    | {
        language: number | Lang;
        level: number | Level;
        id?: string | null;
      }[]
    | null;
  skillHighlights?:
    | {
        skill:
          | {
              relationTo: 'skill';
              value: number | Skill;
            }
          | {
              relationTo: 'skillGroup';
              value: number | SkillGroup;
            };
        level?: (number | null) | Level;
        description?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  skillGroups?:
    | {
        group: number | SkillGroup;
        skillGroupDescription?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        skills?:
          | {
              skill:
                | {
                    relationTo: 'skill';
                    value: number | Skill;
                  }
                | {
                    relationTo: 'skillGroup';
                    value: number | SkillGroup;
                  };
              level?: (number | null) | Level;
              'sub-skill'?: (number | Skill)[] | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  otherSkills?:
    | {
        name: string;
        level?: (number | null) | Level;
        id?: string | null;
      }[]
    | null;
  eduHighlights?:
    | {
        title?: string | null;
        fromYear?: string | null;
        toYear?: string | null;
        description?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  edu?:
    | {
        institution: string;
        fromYear: string;
        toYear: string;
        description?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  certs?:
    | {
        name: string;
        toYear: string;
        description?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  courses?:
    | {
        name: string;
        toYear: string;
        description?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  jobHighlights?:
    | {
        company: number | Company;
        fromYear?: string | null;
        toYear?: string | null;
        description?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  projects?:
    | {
        company: number | Company;
        project: number | Project;
        fromYear: string;
        toYear?: string | null;
        description?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  organisation?: (number | null) | Organisation;
  createdBy?: (number | null) | User;
  updatedBy?: (number | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt?: string | null;
  organisation?: (number | null) | Organisation;
  createdBy?: (number | null) | User;
  updatedBy?: (number | null) | User;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "organisations".
 */
export interface Organisation {
  id: number;
  name: string;
  description?: string | null;
  createdBy?: (number | null) | User;
  updatedBy?: (number | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  roles?: ('admin' | 'user')[] | null;
  organisations?: UserOrganisations;
  selectedOrganisation?: (number | null) | Organisation;
  sub?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "langs".
 */
export interface Lang {
  id: number;
  name?: string | null;
  organisation?: (number | null) | Organisation;
  createdBy?: (number | null) | User;
  updatedBy?: (number | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "level".
 */
export interface Level {
  id: number;
  level?: string | null;
  description?: string | null;
  levelType?: ('language' | 'skill')[] | null;
  points?: number | null;
  organisation?: (number | null) | Organisation;
  createdBy?: (number | null) | User;
  updatedBy?: (number | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skill".
 */
export interface Skill {
  id: number;
  name?: string | null;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  organisation?: (number | null) | Organisation;
  createdBy?: (number | null) | User;
  updatedBy?: (number | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skillGroup".
 */
export interface SkillGroup {
  id: number;
  name?: string | null;
  organisation?: (number | null) | Organisation;
  createdBy?: (number | null) | User;
  updatedBy?: (number | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "company".
 */
export interface Company {
  id: number;
  name?: string | null;
  organisation?: (number | null) | Organisation;
  createdBy?: (number | null) | User;
  updatedBy?: (number | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "project".
 */
export interface Project {
  id: number;
  name?: string | null;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  organisation?: (number | null) | Organisation;
  createdBy?: (number | null) | User;
  updatedBy?: (number | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'cv';
        value: number | Cv;
      } | null)
    | ({
        relationTo: 'skill';
        value: number | Skill;
      } | null)
    | ({
        relationTo: 'skillGroup';
        value: number | SkillGroup;
      } | null)
    | ({
        relationTo: 'langs';
        value: number | Lang;
      } | null)
    | ({
        relationTo: 'level';
        value: number | Level;
      } | null)
    | ({
        relationTo: 'company';
        value: number | Company;
      } | null)
    | ({
        relationTo: 'project';
        value: number | Project;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'organisations';
        value: number | Organisation;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cv_select".
 */
export interface CvSelect<T extends boolean = true> {
  fullName?: T;
  image?: T;
  introduction?: T;
  casualInfo?: T;
  birthday?: T;
  nationalityStatus?: T;
  phoneNumber?: T;
  email?: T;
  jobTitle?: T;
  department?: T;
  links?: T | SocialLinksSelect<T>;
  lang?:
    | T
    | {
        language?: T;
        level?: T;
        id?: T;
      };
  skillHighlights?:
    | T
    | {
        skill?: T;
        level?: T;
        description?: T;
        id?: T;
      };
  skillGroups?:
    | T
    | {
        group?: T;
        skillGroupDescription?: T;
        skills?:
          | T
          | {
              skill?: T;
              level?: T;
              'sub-skill'?: T;
              id?: T;
            };
        id?: T;
      };
  otherSkills?:
    | T
    | {
        name?: T;
        level?: T;
        id?: T;
      };
  eduHighlights?:
    | T
    | {
        title?: T;
        fromYear?: T;
        toYear?: T;
        description?: T;
        id?: T;
      };
  edu?:
    | T
    | {
        institution?: T;
        fromYear?: T;
        toYear?: T;
        description?: T;
        id?: T;
      };
  certs?:
    | T
    | {
        name?: T;
        toYear?: T;
        description?: T;
        id?: T;
      };
  courses?:
    | T
    | {
        name?: T;
        toYear?: T;
        description?: T;
        id?: T;
      };
  jobHighlights?:
    | T
    | {
        company?: T;
        fromYear?: T;
        toYear?: T;
        description?: T;
        id?: T;
      };
  projects?:
    | T
    | {
        company?: T;
        project?: T;
        fromYear?: T;
        toYear?: T;
        description?: T;
        id?: T;
      };
  organisation?: T;
  createdBy?: T;
  updatedBy?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "SocialLinks_select".
 */
export interface SocialLinksSelect<T extends boolean = true> {
  platform?: T;
  url?: T;
  id?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skill_select".
 */
export interface SkillSelect<T extends boolean = true> {
  name?: T;
  description?: T;
  organisation?: T;
  createdBy?: T;
  updatedBy?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skillGroup_select".
 */
export interface SkillGroupSelect<T extends boolean = true> {
  name?: T;
  organisation?: T;
  createdBy?: T;
  updatedBy?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "langs_select".
 */
export interface LangsSelect<T extends boolean = true> {
  name?: T;
  organisation?: T;
  createdBy?: T;
  updatedBy?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "level_select".
 */
export interface LevelSelect<T extends boolean = true> {
  level?: T;
  description?: T;
  levelType?: T;
  points?: T;
  organisation?: T;
  createdBy?: T;
  updatedBy?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "company_select".
 */
export interface CompanySelect<T extends boolean = true> {
  name?: T;
  organisation?: T;
  createdBy?: T;
  updatedBy?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "project_select".
 */
export interface ProjectSelect<T extends boolean = true> {
  name?: T;
  description?: T;
  organisation?: T;
  createdBy?: T;
  updatedBy?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  organisation?: T;
  createdBy?: T;
  updatedBy?: T;
  prefix?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        card?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        tablet?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "organisations_select".
 */
export interface OrganisationsSelect<T extends boolean = true> {
  name?: T;
  description?: T;
  createdBy?: T;
  updatedBy?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  firstName?: T;
  lastName?: T;
  roles?: T;
  organisations?: T | UserOrganisationsSelect<T>;
  selectedOrganisation?: T;
  sub?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "UserOrganisations_select".
 */
export interface UserOrganisationsSelect<T extends boolean = true> {
  organisation?: T;
  roles?: T;
  id?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}