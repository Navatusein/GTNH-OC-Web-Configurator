import {FC} from "react";
import {Navigate, Route, Routes} from "react-router";
import {HomePage} from "@/pages/home";
import {ConfiguratorPage} from "@/pages/configurator";
import BaseLayout from "@/app/layouts/base-layout/base-layout.tsx";
import {NotFoundPage} from "@/pages/not-found";
import CreateLinkPage from "@/pages/create-link/ui/create-link-page/create-link-page.tsx";
import {DEV_URL} from "@/share/config/config.ts";

const IS_DEV = true;

const Router: FC = () => {
  return (
    <Routes>
      <Route element={<BaseLayout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/configurator" element={<ConfiguratorPage/>}/>
        <Route path="/create-link" element={<CreateLinkPage/>}/>
        <Route path="/404" element={<NotFoundPage/>}/>
        {IS_DEV && <Route path='/dev' element={<Navigate to={DEV_URL} replace/>}/>}
        <Route path='*' element={<Navigate to="/404" replace/>}/>
      </Route>
    </Routes>
  );
};

export default Router;