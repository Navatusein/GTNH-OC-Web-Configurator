import {FC, useMemo, useState} from "react";
import {IConfigDescriptor} from "@/entities/config-descriptor";
import {ConfigForm} from "@/widgets/config-form";
import {useLocation} from "react-router";
import useFetch from "@/share/hooks/use-fetch";
import {parse} from "yaml";
import {PreparedConfigModal} from "@/widgets/prepared-config-modal";
import {Fetcher} from "@/features/fetcher";


const ConfiguratorPage: FC = () => {
  const {search} = useLocation();

  const [finalConfig, setFinalConfig] = useState("")

  const configDescriptorUrl = useMemo(() => {
    const searchParams = new URLSearchParams(search);
    return searchParams.get("url");
  }, [search]);

  const {data, isLoading, error} = useFetch(configDescriptorUrl);

  const configDescriptor = useMemo((): IConfigDescriptor|null => {
    return data && parse(data).descriptor;
  }, [data]);

  const onSubmit = (fields: [key: string, value: string|number][]) => {
    let config = configDescriptor!.configTemplate;

    fields.forEach(([key, value]) => {
      config = config.replace(`<field>${key}</field>`, value as string);
    });

    setFinalConfig(() => config);
  }

  return (
    <div className="py-3">
      <Fetcher isLoading={isLoading} error={error} canShow={configDescriptor != null}>
        {configDescriptor && <ConfigForm fieldGroups={configDescriptor?.fieldGroups} onSubmit={onSubmit}/>}
      </Fetcher>
      <PreparedConfigModal config={finalConfig} setConfig={setFinalConfig}/>
    </div>
  );
};

export default ConfiguratorPage;