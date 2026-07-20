import "@/share/styles/styles.css"

import ReactDOM from "react-dom/client";
import {HashRouter} from "react-router";
import Router from "@/app/router.tsx";
import {App, ConfigProvider, theme} from "antd";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
      <App>
        <Router/>
      </App>
    </ConfigProvider>
  </HashRouter>
)