## Docker compose configurations
This directory provide basic docker compose configurations to setup and start a cv-manager instance. Please adapt configurations to your needs.
Next to the docker compose file, a default `.env` file is provided. Please read in the [configuration section](https://github.com/tegonal/cv-manager/blob/main/README.md#Configuration) how to adapt those properties.

### Postgres
Ready to use setup with postgres database adapter and starting the following docker images:
* caddy as proxy server with self-signed certificates
* postgres
* gotenberg
* pgadmin (optional)
* pgbackup (optional)
* cv-manager

#### Secrets
Adjust at least the following secrets in the `.env` file to ensure you're running the instance with your own secrets:
* `PAYLOAD_SECRET`
* `PRINTER_SECRET`
* `S3_SECRET_ACCESS_KEY`
* `S3_ACCESS_KEY_ID`
* `MINIO_ROOT_PASSWORD`

#### Accessible URL
Adjust the `NEXT_PUBLIC_URL` to the URL under which the instance should be accessible and define the same hostname in the `Caddyfile` configuration. 

### Run the application
Start the docker image in the desired directory:
```
docker compose up -f
```

Access

