import type { ServerProps } from 'payload'

import { Banner, Button } from '@payloadcms/ui'
import React from 'react'

import './oauth-server-login-button.scss'

const messages = {
  de: {
    // Shown after a failed OAuth login, see failureRedirect in payload.config.ts
    failed:
      'Die Anmeldung mit OAuth ist fehlgeschlagen. Falls Sie noch kein Konto haben, wenden Sie sich an einen Administrator.',
    login: 'Mit OAuth anmelden',
  },
  en: {
    failed: 'Login with OAuth failed. If you do not have an account yet, contact an administrator.',
    login: 'Login using OAuth',
  },
}

export const OAuthServerLoginButton: React.FC<ServerProps> = ({ i18n, searchParams }) => {
  const text = i18n.language === 'de' ? messages.de : messages.en

  return (
    <>
      {searchParams?.oauth === 'failed' && <Banner type="error">{text.failed}</Banner>}
      {process.env.OAUTH_ENABLED === 'true' && (
        <Button
          buttonStyle="secondary"
          className="oauth-login-button"
          el="anchor"
          size="large"
          url="/api/users/oauth/authorize">
          {text.login}
        </Button>
      )}
    </>
  )
}
