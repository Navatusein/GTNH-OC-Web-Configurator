import {FC} from "react";
import {Route, Routes} from "react-router";
import {HomePage} from "@/pages/home";
import {ConfiguratorPage} from "@/pages/configurator";
import BaseLayout from "@/app/layouts/base-layout/base-layout.tsx";

const Router: FC = () => {
  return (
    <Routes>
      <Route element={<BaseLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="/configurator" element={<ConfiguratorPage/>}/>
        <Route path='*' element={404}/>
      </Route>
    </Routes>
  );
};

export default Router;