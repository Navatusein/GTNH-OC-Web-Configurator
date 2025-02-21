import {FC} from "react";
import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router";

const Footer: FC = () => {
  return (
    <footer>
      <Navbar expand="lg" className="bg-body-tertiary" sticky="bottom">
        <Container className="text-center">
          <Navbar.Text>
            <Link to="https://github.com/Navatusein/GTNH-OC-Web-Configurator">OC Web Configurator</Link> ©{new Date().getFullYear()} Created by <Link to="https://github.com/Navatusein">Navatusein</Link>
          </Navbar.Text>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;