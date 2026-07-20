import {Flex, Layout, Menu, Typography, Grid, Button, Drawer} from "antd";
import type {ItemType} from "antd/es/menu/interface";
import {useState} from "react";
import {MenuOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router";

const {useBreakpoint} = Grid;

const IS_DEV = import.meta.env.VITE_DEV_MODE;

const MENU_ITEMS: ItemType[] = [
  {
    label: "Home",
    key: "/",
  },
  {
    label: "Configurator",
    key: "/configurator",
  },
  {
    label: "Create link",
    key: "/create-link",
  },
  IS_DEV && {
    label: "Dev",
    key: "/dev",
  }
]

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const [visible, setVisible] = useState(false);

  const isDesktop = screens.md;

  const onMenuClick = (path: string) => {
    navigate(path, {replace: true});
  }

  return (
    <Layout.Header>
      <Flex align="center" gap="medium" justify="space-between" style={{height: "100%"}}>
        <Typography.Title level={4} style={{margin: 0, textWrap: "nowrap"}}>
          OC Web Configurator
        </Typography.Title>

        {isDesktop && (
          <Menu
            mode="horizontal"
            theme="dark"
            items={MENU_ITEMS}
            onClick={(e) => onMenuClick(e.key)}
            style={{width: "100%"}}
            selectedKeys={[location.pathname]}
          />
        )}

        {!isDesktop && (
          <Button
            type="text"
            icon={<MenuOutlined/>}
            onClick={() => setVisible(true)}
            style={{fontSize: "16px"}}
          />
        )}
      </Flex>
      <Drawer
        title="Navigation"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        styles={{body: { padding: 0 }}}
      >
        <Menu
          mode="inline"
          items={MENU_ITEMS}
          onClick={(e) => {
            setVisible(false);
            onMenuClick(e.key)
          }}
          style={{borderRight: "none", height: "100%"}}
          selectedKeys={[location.pathname]}
        />
      </Drawer>
    </Layout.Header>
  )
}
