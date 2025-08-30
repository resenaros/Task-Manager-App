import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import NavBarButtons from "./NavBarButtons";

type PageLayoutProps = { children?: React.ReactNode };

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => (
  <Container
    fluid
    className="d-flex flex-column justify-content-center align-items-center"
    style={{ minHeight: "100vh", textAlign: "center" }}
  >
    <NavBar />
    <h1>My App</h1>
    <div className="w-100">{children}</div>
    <footer className="w-100 mt-4">
      <NavBarButtons />
    </footer>
  </Container>
);

export default PageLayout;
