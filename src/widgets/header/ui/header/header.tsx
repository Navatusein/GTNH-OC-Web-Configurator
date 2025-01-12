import {FC} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router";

const IS_DEV = true;

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>OC Web Configurator</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>
                Home
              </Nav.Link>
              {IS_DEV &&
                <Nav.Link onClick={() => navigate("/dev")}>
                  Dev
                </Nav.Link>
              }
              <Nav.Link onClick={() => navigate("/create-link")}>
                Create link
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;