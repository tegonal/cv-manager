import React from 'react';
import { OAuthClientLoginButton } from './oauth-client-login-button';

export const OAuthServerLoginButton: React.FC = () => {
  return (
    <OAuthClientLoginButton
      oauthEnabled={process.env.OAUTH_ENABLED === 'true'}></OAuthClientLoginButton>
  );
};
