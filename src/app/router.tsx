import {FC} from "react";
import {Navigate, Route, Routes} from "react-router";
import {HomePage} from "@/pages/home";
import {ConfiguratorPage} from "@/pages/configurator";
import BaseLayout from "@/app/layouts/base-layout/base-layout.tsx";
import {NotFoundPage} from "@/pages/not-found";


const Router: FC = () => {
  return (
    <Routes>
      <Route element={<BaseLayout/>}>
        <Route path="/GTNH-OC-Web-Configurator/" element={<HomePage/>}/>
        <Route path="/GTNH-OC-Web-Configurator/configurator" element={<ConfiguratorPage/>}/>
        <Route path="/GTNH-OC-Web-Configurator/404" element={<NotFoundPage/>}/>
        <Route path='*' element={<Navigate to="/GTNH-OC-Web-Configurator/404" replace/>}/>
      </Route>
    </Routes>
  );
};

export default Router;