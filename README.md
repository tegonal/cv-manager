# CV Manager

A modern CV management system built on Payload CMS 3, designed for companies to create, manage, and export professional CVs.

## Features

- **Multi-language support** — German and English with localized content
- **Flexible skill system** — Organize skills in hierarchical groups with customizable proficiency levels
- **PDF export** — Generate professional PDFs with customizable branding and layout
- **Multiple databases** — MongoDB, PostgreSQL, or SQLite
- **S3 storage** — Optional cloud storage for media files
- **OAuth integration** — Single sign-on with your identity provider
- **Multi-tenant** — Manage CVs across multiple organizations

## Quick Start

### Docker Compose

Ready-to-use configurations are provided in the [`docker-compose`](https://github.com/tegonal/cv-manager/blob/main/docker-compose) directory for MongoDB, PostgreSQL, and SQLite setups.

1. Copy the environment file:

   ```bash
   curl -o .env https://raw.githubusercontent.com/tegonal/cv-manager/refs/heads/main/.env.example
   ```

2. Set required values in `.env`:

   ```
   PAYLOAD_SECRET=your-strong-secret-here
   DATABASE_URI=postgres://user:pass@localhost:5432/cvmanager
   ```

3. Start the application using one of the provided docker-compose configurations.

## Configuration

### Required Settings

| Variable         | Description                             |
| ---------------- | --------------------------------------- |
| `PAYLOAD_SECRET` | Strong secret for encryption (required) |
| `DATABASE_URI`   | Database connection string (see below)  |

### Database

The adapter is auto-selected based on the URI scheme:

| Database   | URI Format                          |
| ---------- | ----------------------------------- |
| PostgreSQL | `postgres://user:pass@host:5432/db` |
| MongoDB    | `mongodb://user:pass@host:27017/db` |
| SQLite     | `file:///path/to/database.db`       |

### Media Storage

#### S3 Storage

For production deployments, configure S3-compatible storage:

```env
S3_ENDPOINT=https://s3.example.com
S3_BUCKET=cv-manager-media
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=us-east-1
```

#### Local Storage

Without S3 configuration, files are stored locally in `LOCAL_MEDIA_STORAGE_DIR` (default: `/data/media`). Ensure this path is a mounted volume in Docker deployments.

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

Configure PDF appearance through the admin panel without code changes:

| Setting          | Options                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| **Company Info** | Name, address, city, website                                                 |
| **Logo**         | Upload, width (mm), position (left/right), display (first page/all pages)    |
| **Typography**   | Font family (Rubik, Open Sans, Lato, Roboto, Merriweather, Playfair Display) |
| **Colors**       | Primary color (borders, highlights), secondary color (skill indicators)      |
| **Skill Levels** | Display as text, dots, or progress bars                                      |
| **Page Layout**  | Margins (top, bottom, left, right in mm), format (A4/Letter)                 |

### Custom Templates

For advanced customization, create your own PDF template:

1. Copy the example template:

   ```bash
   cp src/payload/plugins/cv-pdf-generator/templates/custom-template/index.tsx.example \
      src/payload/plugins/cv-pdf-generator/templates/custom-template/index.tsx
   ```

2. Customize the React components (uses [react-pdf](https://react-pdf.org/))

3. Rebuild: `yarn build`

The default template at `templates/default/index.tsx` serves as a reference. Shared utilities in `templates/lib/` provide date formatting, Lexical rich-text rendering, and Tailwind CSS helpers.

## Usage

### Master Data

Set up these entities before creating CVs:

| Entity        | Purpose                                               |
| ------------- | ----------------------------------------------------- |
| Organizations | Companies you create CVs for                          |
| Skill Groups  | Categories like "Programming Languages", "Frameworks" |
| Skills        | Individual skills within groups                       |
| Levels        | Proficiency levels (e.g., Junior, Senior, Expert)     |
| Languages     | Spoken languages with proficiency                     |
| Projects      | Shared project references                             |

### CV Structure

Each CV contains:

| Section    | Content                               |
| ---------- | ------------------------------------- |
| Profile    | Personal info, contact details, links |
| Skills     | Hierarchical skill groups with levels |
| Education  | Degrees, certifications, training     |
| Experience | Project history with descriptions     |

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

```bash
nvm use
yarn install
yarn run services:start  # Start local Docker services
```

### Run Development Server

```bash
yarn run dev:postgres  # or dev:mongodb, dev:sqlite
```

Or with custom `.env`:

```bash
cp .env.example .env
# Edit .env with your settings
yarn run dev
```

### Code Quality

```bash
yarn run check  # Lint, format, and type-check
```

### Database Migrations

After schema changes, generate migrations for all adapters:

```bash
yarn run migrate:create:all
```
