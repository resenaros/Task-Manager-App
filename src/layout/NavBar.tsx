import { Nav, Navbar, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Navbar bg="light" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand href="/">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="btn btn-outline-primary me-2" href="/">
              Home
            </Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link
                  className="btn btn-outline-primary me-2"
                  href="/tasks"
                >
                  Tasks
                </Nav.Link>
                <Nav.Link
                  className="btn btn-outline-primary me-2"
                  href="/profile"
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  className="btn btn-outline-primary me-2"
                  href="/protected"
                >
                  Protected
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
