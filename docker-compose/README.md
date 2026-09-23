## Docker compose setup

Ready to use setup that starts the following docker images:

- caddy as proxy server with self-signed certificates
- cv-manager
- postgres
- garage as S3-compatible storage for media files
- pgadmin (optional)
- pgbackup (optional)

Copy this directory, including the `.env` file, and adapt it to your needs. All options are described in the [configuration section](https://github.com/tegonal/cv-manager/blob/main/README.md#configuration).

### Secrets

The following secrets have no defaults, `docker compose up` stops with an error until they are set in `.env`:

- `PAYLOAD_SECRET`
- `POSTGRES_PASSWORD`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `GARAGE_RPC_SECRET`

Garage requires a specific format for the S3 credentials. Generate all of them with:

```
echo "PAYLOAD_SECRET=$(openssl rand -hex 32)"
echo "POSTGRES_PASSWORD=$(openssl rand -hex 32)"
echo "S3_ACCESS_KEY_ID=GK$(openssl rand -hex 12)"
echo "S3_SECRET_ACCESS_KEY=$(openssl rand -hex 32)"
echo "GARAGE_RPC_SECRET=$(openssl rand -hex 32)"
```

Garage creates the access key and the `S3_BUCKET` bucket on startup. If you change the S3 credentials after the first start, the new key is added on the next start and the previous key stays valid until you delete it:

```
docker compose exec garage /garage key delete --yes <previous S3_ACCESS_KEY_ID>
```

### Run the application

Start the stack in this directory:

```
docker compose up -d
```

Open https://localhost or the provided `PUBLIC_URL` in your browser and log in with the default credentials:

- Username: admin@test.com
- Password: admin

⚠️ Please change the user account as soon as possible.

### Public URL

The configuration enables running the instance on localhost so everyone can start the server and try it out. In reality the server would run on a different host and needs to be accessible from the clients/hosts using the application.
To use this setup on a well known host, the following adjustments have to be made:

- Set the `PUBLIC_URL` to the URL under which the instance should be accessible
- Define the same hostname in the `Caddyfile` configuration.
