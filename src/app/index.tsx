import "@/share/styles/styles.css"

import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router";
import Router from "@/app/router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/GTNH-OC-Web-Configurator">
    <Router/>
  </BrowserRouter>
)