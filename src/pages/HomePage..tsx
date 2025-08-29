import { Col, Container } from "react-bootstrap";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";

const HomePage: React.FC = () => (
  <Container>
    <Col>
      <h1>Hello Auth0 World</h1>
      <LoginButton />
      <LogoutButton />
    </Col>
  </Container>
);

export default HomePage;
