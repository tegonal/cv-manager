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

#### ⚠️ Secrets
Please provide your own strong secrets for the following environment properties used to protect and encrypt sensible data: 
* `PAYLOAD_SECRET` 
* `PRINTER_SECRET`

#### Database adapter

#### Enable OAuth support

#### Enable S3 storage

#### Enable SMTP mail integration

#### Customize generating PDF's

## Usage

## Development

### Local docker images
For local development, a docker-compose file is provided. You can use it through yarn:
```
nvm use
yarn run dev:compose:up
```

This will bring up a docker image for
* postgres as database adapter if running with postgres
* mongodb as database adapter if running with mongodb
* minio with initialized bucket as file storage
* mailpit as local mailserver
* gotenberg to generate PDF's locally

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
If you apply any changes to the database model you need to generate the appropriate database migrations scripts for ***all*** database adapters. Run the following command to generate them: 
```
yarn run migrate:create:all
``` 

## License

MIT
