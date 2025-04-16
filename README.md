# CV Manager

This is a customised Payload 3 App for managing your company's CVs.
It gets delivered with a pre-define generic layout which can be customised to specific needs.

## Setup

### Pre-requisites

The application has the following dependencies:

- As a database to store the cv data. Support databases are MongoDB, Postgres or SQlite for local file based datastore
- A running [gotenberg](https://gotenberg.dev/docs/getting-started/installation) instance to generate PDF's. Use https://demo.gotenberg.dev only for low request rates and if server is public accessible.

### Docker compose

This repository provides example docker compose configurations for a starting point to bring up your cv-manager instance.
The configurations are documented in the respective [directory](https://github.com/tegonal/cv-manager/blob/main/docker-compose).

### Configuration

The provided docker compose configurations all support a local `.env` configuration file when starting the containers. To customize the installation you therefore can download/copy the existing [`.env.example`](https://raw.githubusercontent.com/tegonal/cv-manager/refs/heads/main/.env.example) configuration to your installation and adjust the properties accordingly.

#### ⚠️ Secrets (required)

Please provide your own strong secrets for the following environment properties used to protect and encrypt sensible data:

- `PAYLOAD_SECRET`
- `PRINTER_SECRET`

#### Database (required)

To database adapter will be used based on the URI schema of the `DATABASE_URI` configuration property.

The following databases are supported by the cv-manager:

- MongoDB (starting with `mongodb://`)
- Postgres (starting with `postgres://`)
- SQLite (starting with `file://`)

#### Enable OAuth support

The cv-manager support OAuth integration. To enable the oauth integration, provide the following configuration properties:

- `OAUTH_ENABLED=true`
- `OAUTH_CLIENT_ID`
- `OAUTH_CLIENT_SECRET`
- `OAUTH_TOKEN_ENDPOINT`
- `OAUTH_AUTHORIZE_ENDPOINT`
- `OAUTH_USERINFO_ENDPOINT`

If enabled, an additional login button is added to the login form.

#### Media storage

##### S3 Storage

To support storing the media files in an S3 storage, define to following configuration properties:

- `S3_ENDPOINT`
- `S3_BUCKET`
- `S3_SECRET_ACCESS_KEY`
- `S3_ACCESS_KEY_ID`

##### Local storage

If no external storage provider is configured, the uploaded images are store locally in the `LOCAL_MEDIA_STORAGE_DIR` location which defaults to `/data/media`. Please ensure the configured path points to a mounted volume if used inside a docker image.

#### Enable SMTP mail integration

The SMTP integration is only used to send password recovery emails if using the internal authentication mechanism. To enable the SMTP integration, configure the following properties:

- `SMTP_FROM_ADDRESS`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

_If no SMTP provider is configured, password recovery information are printed to the applications standard output._

#### Customize generating PDFs

##### Using existing template

The cv-manager comes with a ready-to-use template for generating a PDF based on the existing data structure. This PDF can be customized with your company's base information through the following properties:

- `DEFAULT_PAGE_COMPANY_NAME`
- `DEFAULT_PAGE_COMPANY_ADDRESS`
- `DEFAULT_PAGE_COMPANY_CITY`
- `DEFAULT_PAGE_COMPANY_URL`
- `DEFAULT_PAGE_COMPANY_LOGO`
- `DEFAULT_PAGE_COMPANY_LOGO_WIDTH`
- `DEFAULT_PAGE_COMPANY_LOGO_HEIGHT`

The `DEFAULT_PAGE_COMPANY_LOGO` property need to point to a valid file located in the `/public` directory of your cv-manager instance.
Either copy the file to this location or, if starting the app based on the provided docker image, mount the file to this location.

Example command would be:

```
docker run --env-file YOUR_CONFIGURATION -v  SOURCE_FILE:/app/public/LOGO_NAME tegonal/cv-manager:latest
```

##### Customizing the layout

The PDF is generated from a react page which is rendered by [pagedjs](https://pagedjs.org) and converted to a pdf by [gotenberg](https://gotenberg.dev/).
To customize the complete layout of your page, create a new react component in `src/app/cv/[id]/custom_page.tsx` with the following skeleton:

```typescript

const CustomPage: React.FC<CvPageProps> = async ({
  cv,
  profileImageDataUrl,
  hasOverride,
  exportOverride,
  locale,
}) => {
  return (<><h1>Your Custom CV</h1></>);
}

export default CustomPage;
```

As a good starting point just copy-paste the `default_page.tsx` and start adjusting the layout to your needs.

ℹ️ If you start the application locally in development mode a `url` is printed to the console when generating a PDF.
This url gives you access to the intermediate generated page before converting it to a PDF. To be able to access this URL your need to enable the configuration property `ALLOW_UNSECURED_CV_ACCESS=true`, otherwise accessing it through your browser will be declined.

## Usage

### Master data

To use the cv-manager you first have to provide some master data.

| Entity         | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| User           | Local users or OAuth users (automatically added) having access to the cv-manager |
| Organisationen | Manager the organisation you're create cvs for                                   |
| Levels         | Define levels for your Skills                                                    |
| Sprachen       | Languages available in the Cv                                                    |
| Projects       | Projects are a list of projects one or multiple users where working with.        |

### CV Structure

The Cv consists of the following information:

| Tab             | Description                                              |
| --------------- | -------------------------------------------------------- |
| Profil          | Generic information about the person.                    |
| Fähigkeiten     | List of various skills                                   |
| Ausbildung      | Educational information                                  |
| Berufserfahrung | Experiences, mainly the projects a person was working on |

#### Skills structure

The skills in the represented as either skills groups or skills.

| Entity       | Description                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------ |
| Skill Groups | Skill groups represent a category in to which multiple skills can be assigned (i.e. `Programming languages`) |
| Skill        | A skill represents a specific skill within a skill group (i.e. `Typescript` withing `Programming languages`) |

They can be ordered in a tree-like structure, depending on the section. The following combination is allowed in the main skills sections:

- `Skill Group`
  - `Skill Group` or `Skill` optionally assigned to a `Level`
    - Additional list of `Skills`

This gives you the flexibility to group your skills in various ways, depending on the desired focus.
I.e. a frontend developed might arrange his skills the following way:

- Frontend technologies (`Skill Group`)
  - React - Expert (`Skill`)
  - Vue.js - Senior
  - Angular - Junior

Where a full stack developer want to list the skills on a higher level like:

- Full stack development (`Skill Group`)
  - Backend frameworks - Expert (`Skill Group`)
    - Spring, Apache Pekko, Nodejs (`Skill`)
  - Databases - Senior
    - MongoDB, MariaDb, Postgres
  - Frontend technologies - Advanced
    - React, Angular

## Development

### Local docker images

For local development, a docker-compose file is provided. You can use it through yarn:

```
nvm use
yarn run services:start
```

This will bring up a docker image for

- postgres as database adapter if running with postgres
- mongodb as database adapter if running with mongodb
- minio with initialized bucket as file storage
- mailpit as local mailserver
- gotenberg to generate PDF's locally

### Development mode with default local configuration

After starting the local docker images, the application can be run with one of the following commands, depending on the desired database adapter to use:

```
yarn run dev:mongodb
yarn run dev:postgres
yarn run dev:sqliste
```

### Development mode with custom configuration

To customize the local setup just copy the `.env.example` file to `.env`, customize it and start the server with

```
yarn run dev
```

### Database migration

If you apply any changes to the database model you need to generate the appropriate database migrations scripts for **_all_** database adapters. Run the following command to generate them:

```
yarn run migrate:create:all
```
