### CV-Manager with Postgres backend
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
Adjust the `PUBLIC_URL` to the URL under which the instance should be accessible and define the same hostname in the `Caddyfile` configuration.

### Run the application
Start the docker image in the desired directory:
```
docker compose up -f
```
Open https://localhost or the provided `PUBLIC_URL` in your browser and log-in with the default credentials:

* Username: admin@test.com
* Password: admin

⚠️ Please change the use account as soon as possible.
