import "@/share/styles/styles.css"

import ReactDOM from "react-dom/client";
import {HashRouter} from "react-router";
import Router from "@/app/router.tsx";
import NotificationProvider from "@/app/providers/notification-provider/notification-provider";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <NotificationProvider>
      <Router/>
    </NotificationProvider>
  </HashRouter>
)