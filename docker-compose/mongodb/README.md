## CV-Manager with MongoDB backend

Ready to use setup with the mongo database adapter and starting the following docker images:

- caddy as proxy server with self-signed certificates
- mongo
- cv-manager

### Secrets

Adjust at least the following secrets in the `.env` file to ensure you're running the instance with your own secrets:

- `PAYLOAD_SECRET`
- `PRINTER_SECRET`
- `S3_SECRET_ACCESS_KEY`
- `S3_ACCESS_KEY_ID`
- `MONGO_INITDB_ROOT_USERNAME`
- `MONGO_INITDB_ROOT_PASSWORD`

### Run the application

Start the docker image in the desired directory:

```
docker compose up -d
```

Open https://localhost or the provided `PUBLIC_URL` in your browser and log-in with the default credentials:

- Username: admin@test.com
- Password: admin

⚠️ Please change the use account as soon as possible.

### Public URL

The configuration enables running the instance on localhost so everyone can start the server and try it out. In reality the server would run on a different host and needs to be accessible from the clients/hosts using the application.
To use this setup on a well known host, the following adjustments have to be made:

- Set the `PUBLIC_URL` to the URL under which the instance should be accessible
- Define the same hostname in the `Caddyfile` configuration.
