import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import NavBarButtons from "./NavBarButtons";

type PageLayoutProps = { children?: React.ReactNode };

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => (
  <>
    <NavBar />
    <Container
      className="p-4 border border-warning bg-secondary"
      style={{ textAlign: "center" }}
    >
      <h1 className="mx-auto pb-4">My App</h1>
      <div className="w-100 mx-auto">{children}</div>
      <footer className="w-100 mt-4">
        <NavBarButtons />
      </footer>
    </Container>
  </>
);

export default PageLayout;
