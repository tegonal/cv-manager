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

The [`docker-compose`](https://github.com/tegonal/cv-manager/blob/main/docker-compose) directory runs the `tegonal/cv-manager` image with PostgreSQL, Garage (S3 storage for media files) and Caddy (HTTPS). You need Docker with Compose. To work on the code instead, see [Development](#development).

### Get the setup

```bash
curl -fsSL https://github.com/tegonal/cv-manager/archive/refs/heads/main.tar.gz \
  | tar -xz --strip-components=1 cv-manager-main/docker-compose
cd docker-compose
```

### Generate the secrets

The stack does not start until the secrets in `.env` are set. This fills in the empty ones and leaves existing values untouched:

```bash
for key in PAYLOAD_SECRET POSTGRES_PASSWORD S3_SECRET_ACCESS_KEY GARAGE_RPC_SECRET; do
  sed -i.bak "s/^$key=\$/$key=$(openssl rand -hex 32)/" .env
done
sed -i.bak "s/^S3_ACCESS_KEY_ID=\$/S3_ACCESS_KEY_ID=GK$(openssl rand -hex 12)/" .env
rm .env.bak
```

Keep a copy of `.env`. The database is created with `POSTGRES_PASSWORD`, changing it in `.env` later locks the application out.

### Run locally

```bash
docker compose up -d
```

Open https://localhost/admin and create the first user, it becomes the administrator.

- The browser warns about the certificate: Caddy signs `localhost` with its own local authority.
- Ports 80 and 443 must be free.
- The image is built for amd64, on Apple Silicon it runs emulated and slower.

### Run on a server

Point a DNS name to the server and open ports 80 and 443, Caddy then gets a certificate from Let's Encrypt.

1. Set `PUBLIC_URL=https://cv.example.com` in `.env` and replace `localhost` with `cv.example.com` in the `Caddyfile`.
2. Optionally set up [SMTP](#smtp-email) for password reset emails and [OAuth](#oauth-optional) in `.env`.
3. Run `docker compose up -d`, open https://cv.example.com/admin and create the first user right away: until a user exists, anyone who can reach the instance can create it.
4. Once HTTPS works, enable the `Strict-Transport-Security` header in the `Caddyfile` and run `docker compose restart proxy`.

Back up the `postgres-data` and `garage-data` volumes and `.env`. A database dump:

```bash
docker compose exec -T postgres pg_dump -U postgres -Fc cv-manager > cv-manager.pgdump
```

To upgrade, set a new `CV_MANAGER_VERSION` as described in the [docker compose README](https://github.com/tegonal/cv-manager/blob/main/docker-compose/README.md#upgrading). Database migrations run automatically on startup.

## Configuration

### Main Settings

| Variable         | Description                                                                       |
| ---------------- | --------------------------------------------------------------------------------- |
| `PAYLOAD_SECRET` | Signs login tokens, at least 32 random characters in production (required)        |
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
SMTP_FROM_NAME=CV Manager  # optional, the sender name
```

Port 465 uses TLS from the start, other ports upgrade to TLS when the server offers it. `SMTP_USER` and `SMTP_PASS` can be left out for servers that accept mail without login.

Without SMTP, no emails are sent and password recovery does not work (Payload logs a warning at startup). Super admins can set a new password for a user in the admin panel.

### OAuth (Optional)

Enable single sign-on with your identity provider:

```env
OAUTH_ENABLED=true
OAUTH_CLIENT_ID=your-client-id
OAUTH_CLIENT_SECRET=your-client-secret
OAUTH_TOKEN_ENDPOINT=https://auth.example.com/token
OAUTH_AUTHORIZE_ENDPOINT=https://auth.example.com/authorize
OAUTH_USERINFO_ENDPOINT=https://auth.example.com/userinfo
# Users of these email domains get an account on their first login
OAUTH_ALLOWED_EMAIL_DOMAINS=example.com
```

Without `OAUTH_ALLOWED_EMAIL_DOMAINS`, only users that already have an account can log in with OAuth. New accounts join the default organisation with the user role. Logins with an email the provider reports as not verified (`email_verified: false`) are rejected.

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

`yarn run dev` also writes its output to `.logs/dev.log` (overwritten on each start, not committed).

### Code Quality

```bash
yarn run check     # Lint, format (with fixes), and type-check
yarn run check:ci  # The same without fixes, as run by CI
```

### Database Migrations

After schema changes, generate a migration:

```bash
yarn run migrate:create
```

### Scripts

Run one-off scripts with the Payload config and `.env` loaded, e.g. to query data with the Local API:

```bash
yarn payload run path/to/script.ts
```
