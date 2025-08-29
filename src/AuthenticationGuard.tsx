import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

type AuthenticationGuardProps = {
  element: React.ReactElement;
};

const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  element,
}) => {
  const Component = withAuthenticationRequired(() => element, {
    onRedirecting: () => <div>Redirecting you to the login page...</div>,
  });
  return <Component />;
};

export default AuthenticationGuard;
