import {FC, ReactNode} from "react";
import {Outlet} from "react-router";
import {Container, Row} from "react-bootstrap";
import {Header} from "@/widgets/header";
import {Footer} from "@/widgets/footer";

export interface IProps {
  children?: ReactNode;
}

const BaseLayout: FC<IProps> = (props) => {


  return (
    <div style={{minHeight: "100svh"}} className="d-flex flex-column">
      <Header/>

      <Container className="flex-grow-1 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
        <Row className="p-3">
          {props.children ?? <Outlet/>}
        </Row>
      </Container>

      <Footer/>
    </div>
  );
};

export default BaseLayout;