import {Navigate, Route, Routes} from "react-router";
import {NotFoundView} from "@/views/not-found";
import {CreateLinkView} from "@/views/create-link";
import {ConfiguratorView} from "@/views/configurator";
import {HomeView} from "@/views/home";
import {BaseLayout} from "@/app/layouts/base-layout";

const IS_DEV = import.meta.env.VITE_DEV_MODE;
const DEV_URL = import.meta.env.VITE_DEV_URL;

export default function Router(){
  return (
    <Routes>
      <Route element={<BaseLayout/>}>
        <Route index path="/" element={<HomeView/>}/>
        <Route path="/configurator" element={<ConfiguratorView/>}/>
        <Route path="/create-link" element={<CreateLinkView/>}/>
        <Route path="/404" element={<NotFoundView/>}/>
        {IS_DEV && <Route path='/dev' element={<Navigate to={DEV_URL} replace/>}/>}
        <Route path='*' element={<Navigate to="/404" replace/>}/>
      </Route>
    </Routes>
  );
};