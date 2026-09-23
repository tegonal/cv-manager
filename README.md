# CV Manager

A modern CV management system built on Payload CMS 3 and Next.js 16, designed for companies to create, manage, and export professional CVs.

## Features

- **Multi-language support** — German and English with localized content
- **Flexible skill system** — Organize skills in hierarchical groups with customizable proficiency levels
- **PDF export** — Generate professional PDFs with customizable branding and layout
- **PostgreSQL** — Migrations run automatically on startup
- **S3 storage** — Media files in any S3-compatible storage, [Garage](https://garagehq.deuxfleurs.fr/) included in the provided setups
- **OAuth integration** — Single sign-on with your identity provider
- **Multi-tenant** — Manage CVs across multiple organizations

## Quick Start

### Docker Compose

A ready-to-use configuration is provided in the [`docker-compose`](https://github.com/tegonal/cv-manager/blob/main/docker-compose) directory. It runs the `tegonal/cv-manager` image with PostgreSQL and Garage behind Caddy.

1. Copy the directory with all its files, including `.env`.
2. Set your own secrets in `.env` as described in its [README](https://github.com/tegonal/cv-manager/blob/main/docker-compose/README.md). The stack refuses to start until they are set.
3. Run `docker compose up -d` in that directory and open `https://localhost` (or your `PUBLIC_URL`).

Database migrations run automatically on startup, also when upgrading to a new version.

## Configuration

### Main Settings

| Variable         | Description                                                                       |
| ---------------- | --------------------------------------------------------------------------------- |
| `PAYLOAD_SECRET` | Strong secret for encryption (required)                                           |
| `PUBLIC_URL`     | URL under which the instance is reachable, defaults to `http://localhost:3000`    |
| `DATABASE_URI`   | PostgreSQL connection string, e.g. `postgres://user:pass@host:5432/db` (required) |

### Media Storage

Media files are stored in S3-compatible storage (required):

```env
S3_ENDPOINT=https://s3.example.com
S3_BUCKET=cv-manager-media
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=us-east-1  # defaults to garage
```

The provided [docker compose setup](https://github.com/tegonal/cv-manager/blob/main/docker-compose) includes [Garage](https://garagehq.deuxfleurs.fr/) as S3-compatible storage, and so do the local development services.

### SMTP Email

Configure SMTP for password recovery emails:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM_ADDRESS=noreply@example.com
```

Without SMTP, password recovery tokens are printed to the application logs.

### OAuth (Optional)

Enable single sign-on with your identity provider:

```env
OAUTH_ENABLED=true
OAUTH_CLIENT_ID=your-client-id
OAUTH_CLIENT_SECRET=your-client-secret
OAUTH_TOKEN_ENDPOINT=https://auth.example.com/token
OAUTH_AUTHORIZE_ENDPOINT=https://auth.example.com/authorize
OAUTH_USERINFO_ENDPOINT=https://auth.example.com/userinfo
```

## PDF Customization

### Admin Panel Settings

Configure PDF appearance through the admin panel (**Settings**) without code changes:

| Setting          | Where        | Options                                                                                             |
| ---------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| **Footer**       | Company Info | Name, address, city, website                                                                        |
| **Logo**         | PDF Style    | Upload (SVG, PNG, JPG), width (mm), position (left/right), margins, first page only/all pages       |
| **Typography**   | PDF Style    | Font family (Rubik, Open Sans, Lato, Roboto, Merriweather, Playfair Display)                        |
| **Colors**       | PDF Style    | Primary color (borders, highlights), secondary color (skill indicators)                             |
| **Skill Levels** | PDF Style    | Display as text, dots, or progress bars                                                             |
| **Page Layout**  | PDF Style    | Format (A4/Letter), margins in mm, separate first page margins, first page centered or left-aligned |

### Custom Layouts

Layouts beyond these settings are code: fork the repository, adapt the [react-pdf](https://react-pdf.org/) template in `src/payload/plugins/cv-pdf-generator/templates/default/index.tsx` and build your own image. Shared utilities in `templates/lib/` provide date formatting, Lexical rich-text rendering, and Tailwind CSS helpers.

## Usage

### Master Data

Set up these entities before creating CVs:

| Entity        | Purpose                                                           |
| ------------- | ----------------------------------------------------------------- |
| Organizations | Tenants, users and their data belong to an organization           |
| Skill Groups  | Categories like "Programming Languages", "Frameworks"             |
| Skills        | Individual skills within groups                                   |
| Levels        | Proficiency levels for skills and languages (e.g. Junior, Expert) |
| Languages     | Spoken languages, the proficiency is set per CV                   |
| Companies     | Employers and clients referenced in the work experience           |
| Projects      | Shared project references                                         |

### CV Structure

Each CV contains:

| Section    | Content                                                                    |
| ---------- | -------------------------------------------------------------------------- |
| Profile    | Personal info, photo, introduction, contact details, links                 |
| Skills     | Languages, highlights, hierarchical skill groups with levels, other skills |
| Education  | Highlights, degrees, certifications, courses                               |
| Experience | Highlights and project history with descriptions                           |

### Flexible Skill Organization

Skills can be nested to match different career profiles:

**Frontend Developer:**

```
Frontend Technologies
├── React — Expert
├── Vue.js — Senior
└── Angular — Junior
```

**Full Stack Developer:**

```
Full Stack Development
├── Backend Frameworks — Expert
│   └── Spring, Node.js, Django
├── Databases — Senior
│   └── PostgreSQL, MongoDB
└── Frontend — Advanced
    └── React, Vue.js
```

## Development

### Setup

Requires Node.js 24 and Docker.

```bash
nvm use
yarn install
yarn run services:start  # Start Postgres, Garage (S3) and Mailpit
cp .env.example .env     # Preconfigured for the local services
yarn run dev
```

Mails are caught by Mailpit at http://localhost:8025. On first start, an admin user `admin@test.com` / `admin` and demo data are created.

### Code Quality

```bash
yarn run check  # Lint, format, and type-check
```

### Database Migrations

After schema changes, generate a migration:

```bash
yarn run migrate:create
```
