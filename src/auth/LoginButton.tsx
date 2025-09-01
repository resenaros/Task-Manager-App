import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: "/" },
      authorizationParams: { prompt: "login" },
    });
  };

  if (!isAuthenticated)
    return (
      <Button
        className="btn btn-primary btn-outline-dark me-2"
        onClick={handleLogin}
      >
        Log In
      </Button>
    );
  return null;
};

export default LoginButton;
