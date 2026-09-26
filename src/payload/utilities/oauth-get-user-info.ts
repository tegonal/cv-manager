import type { PayloadRequest } from 'payload'

// Email domains whose users get an account on their first OAuth login, e.g. "example.com,example.org".
// Without any, only users that already have an account can log in with OAuth.
const allowedEmailDomains = (process.env.OAUTH_ALLOWED_EMAIL_DOMAINS || '')
  .split(',')
  .map((domain) => domain.trim().toLowerCase())
  .filter(Boolean)

// payload-oauth2 looks up (or creates) the user by the email returned here, errors end the login
export const oauthGetUserInfo = async (accessToken: string, req: PayloadRequest) => {
  const response = await fetch(process.env.OAUTH_USERINFO_ENDPOINT || '', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) {
    throw new Error(`OAuth userinfo request failed with status ${response.status}`)
  }

  const { email, email_verified, sub } = await response.json()
  if (typeof email !== 'string' || !email) {
    throw new Error('OAuth userinfo contains no email')
  }
  // Providers that do not report email_verified are trusted to return verified emails only
  if (email_verified === false) {
    throw new Error(`OAuth email ${email} is not verified`)
  }

  const { totalDocs: existingUsers } = await req.payload.count({
    collection: 'users',
    req,
    where: { email: { equals: email } },
  })
  const domain = email.split('@').pop()?.toLowerCase() ?? ''
  if (existingUsers === 0 && !allowedEmailDomains.includes(domain)) {
    throw new Error(
      `No user with email ${email}, and ${domain} is not in OAUTH_ALLOWED_EMAIL_DOMAINS`,
    )
  }

  return { email, sub }
}
