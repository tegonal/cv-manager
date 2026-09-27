/**
 * Stops the app when required configuration is missing or unsafe. Runs when the server starts
 * (src/instrumentation.ts) and in Payload's onInit for the CLI and scripts, not on import, so that
 * builds work without runtime configuration.
 */
export const assertRuntimeConfig = () => {
  const missing = [
    'PAYLOAD_SECRET',
    'DATABASE_URI',
    'S3_ENDPOINT',
    'S3_BUCKET',
    'S3_ACCESS_KEY_ID',
    'S3_SECRET_ACCESS_KEY',
  ].filter((name) => !process.env[name])
  if (missing.length > 0) {
    throw new Error(`Missing required configuration: ${missing.join(', ')}. See .env.example.`)
  }

  // Login tokens are signed with the secret, deployment templates before 4.0.0 shipped "secret"
  if (process.env.NODE_ENV === 'production' && process.env.PAYLOAD_SECRET!.length < 32) {
    throw new Error(
      'PAYLOAD_SECRET must be a random value of at least 32 characters, e.g. `openssl rand -hex 32`. Changing it logs out all users.',
    )
  }
}
