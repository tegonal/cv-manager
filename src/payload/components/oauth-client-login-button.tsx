'use client'

type ClientButtonProps = {
  oauthEnabled: Boolean
}

export const OAuthClientLoginButton: React.FC<ClientButtonProps> = ({ oauthEnabled }) => (
  <>
    {oauthEnabled && (
      <div className={'w-full'}>
        <button
          className={
            'btn btn--icon-style-without-border btn--size-large btn--style-secondary w-full'
          }
          onClick={() => (window.location.href = '/api/users/oauth/authorize')}
          type={'button'}>
          <span className={'btn__content'}>Login using OAuth</span>
        </button>
      </div>
    )}
  </>
)
