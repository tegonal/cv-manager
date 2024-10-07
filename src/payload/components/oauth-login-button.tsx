'use client';
export const OAuthLoginButton: React.FC = () => (
  <div className={'w-full'}>
    <button
      type={'button'}
      onClick={() => (window.location.href = '/api/users/oauth/authorize')}
      className={'btn btn--icon-style-without-border btn--size-large btn--style-secondary w-full'}>
      <span className={'btn__content'}>OAuth Login</span>
    </button>
  </div>
);
