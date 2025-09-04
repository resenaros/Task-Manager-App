import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Auth0ProviderWithNavigateProps = { children: React.ReactNode };

// MARK: AUTH0 Values
// NOTE: These values are loaded from environment variables
// AUTH0 Tenant Domain or which Auth0 account our application is using
const domain = import.meta.env.VITE_AUTH0_DOMAIN!;
// AUTH0 Client ID or which application is being used
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
// Drop-off address
const redirectUri = window.location.origin + "/callback";

const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  // Handle redirects after login to the page the user originally wanted
  const onRedirectCallback = (appState?: { returnTo?: string }) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) return null;
// authorizationParams indicated where to send the user its tokens ensuring we don't get a mismatch error
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
