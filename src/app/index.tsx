import "@/share/styles/styles.css"

import ReactDOM from "react-dom/client";
import {HashRouter} from "react-router";
import Router from "@/app/router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Router/>
  </HashRouter>
)