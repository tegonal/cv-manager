import type { ServerProps } from 'payload'

import { Banner } from '@payloadcms/ui'
import React from 'react'

import { OAuthClientLoginButton } from './oauth-client-login-button'

// Shown after a failed OAuth login, see failureRedirect in payload.config.ts
const oauthFailedMessage = {
  de: 'Die Anmeldung mit OAuth ist fehlgeschlagen. Falls Sie noch kein Konto haben, wenden Sie sich an einen Administrator.',
  en: 'Login with OAuth failed. If you do not have an account yet, contact an administrator.',
}

export const OAuthServerLoginButton: React.FC<ServerProps> = ({ i18n, searchParams }) => {
  return (
    <>
      {searchParams?.oauth === 'failed' && (
        <Banner type="error">
          {i18n.language === 'de' ? oauthFailedMessage.de : oauthFailedMessage.en}
        </Banner>
      )}
      <OAuthClientLoginButton
        oauthEnabled={process.env.OAUTH_ENABLED === 'true'}></OAuthClientLoginButton>
    </>
  )
}
