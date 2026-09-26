import type { ServerProps } from 'payload'

import { Banner } from '@payloadcms/ui'
import React from 'react'

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
        <div className={'w-full'}>
          <a
            className={
              'btn btn--icon-style-without-border btn--size-large btn--style-secondary w-full'
            }
            href={'/api/users/oauth/authorize'}>
            <span className={'btn__content'}>{text.login}</span>
          </a>
        </div>
      )}
    </>
  )
}
