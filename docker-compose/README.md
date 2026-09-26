## Docker compose setup

Ready to use setup that starts the following docker images:

- caddy as proxy server with self-signed certificates
- cv-manager
- postgres
- garage as S3-compatible storage for media files
- pgadmin (optional)
- pgbackup (optional)

The [Quick Start](https://github.com/tegonal/cv-manager/blob/main/README.md#quick-start) describes how to download it and run it locally or on a server. All options are described in the [configuration section](https://github.com/tegonal/cv-manager/blob/main/README.md#configuration).

### Secrets

The following secrets have no defaults, `docker compose up` stops with an error until they are set in `.env`:

- `PAYLOAD_SECRET`
- `POSTGRES_PASSWORD`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `GARAGE_RPC_SECRET`

Garage requires a specific format for the S3 credentials, [generate the secrets](https://github.com/tegonal/cv-manager/blob/main/README.md#generate-the-secrets) as described in the Quick Start.

Garage creates the access key and the `S3_BUCKET` bucket on startup. To change the S3 credentials after the first start, change both `S3_ACCESS_KEY_ID` and `S3_SECRET_ACCESS_KEY`: Garage does not start when the secret of an existing key changes. The new key is added on the next start and the previous key stays valid until you delete it:

```
docker compose exec garage /garage key delete --yes <previous S3_ACCESS_KEY_ID>
```

### Upgrading

`CV_MANAGER_VERSION` in `.env` selects the release. Read the release notes of every version in between, set the new version and restart:

```
docker compose pull && docker compose up -d
```

Database migrations run when the application starts.
