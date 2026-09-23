'use client'

type ClientButtonProps = {
  oauthEnabled: Boolean
}

export const OAuthClientLoginButton: React.FC<ClientButtonProps> = ({ oauthEnabled }) => (
  <>
    {oauthEnabled && (
      <div className={'w-full'}>
        <a
          className={
            'btn btn--icon-style-without-border btn--size-large btn--style-secondary w-full'
          }
          href={'/api/users/oauth/authorize'}>
          <span className={'btn__content'}>Login using OAuth</span>
        </a>
      </div>
    )}
  </>
)
