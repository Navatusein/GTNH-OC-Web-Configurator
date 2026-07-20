import {Layout} from "antd";
import {Link} from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Layout.Footer style={{textAlign: "center"}}>
      <Link to="https://github.com/Navatusein/GTNH-OC-Web-Configurator">OC Web Configurator</Link> ©{currentYear} Created by <Link to="https://github.com/Navatusein">Navatusein</Link>
    </Layout.Footer>
  )
}
