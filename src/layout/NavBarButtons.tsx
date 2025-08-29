import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";

const NavBarButtons: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Container>
      {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
    </Container>
  );
};

export default NavBarButtons;
