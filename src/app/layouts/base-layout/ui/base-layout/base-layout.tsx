import type {ReactNode} from "react";
import {Col, Layout, Row} from "antd";
import {Header} from "@/widgets/header";
import {Footer} from "@/widgets/footer";
import {Outlet} from "react-router";

interface IProps {
  children?: ReactNode;
}

export default function BaseLayout(props: IProps) {
  console.log()

  return (
    <Layout>
      <Header/>
      <Layout.Content style={{minHeight: "calc(100svh - 134px)", padding: "25px", position: "relative"}}>
        <Row>
          <Col
            xs={{span: 24}}
            sm={{span: 20, offset: 2}}
            md={{span: 18, offset: 3}}
            lg={{span: 16, offset: 4}}
            xl={{span: 12, offset: 6}}
            xxl={{span: 10, offset: 7}}
            xxxl={{span: 8, offset: 8}}
          >
            {props.children ?? <Outlet/>}
          </Col>
        </Row>
      </Layout.Content>
      <Footer/>
    </Layout>
  )
}
