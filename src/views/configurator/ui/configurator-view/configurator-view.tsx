import {useState} from "react";
import {useSearchParams} from "react-router";
import {Alert} from "antd";
import {ConfigForm} from "@/widgets/config-form";
import {useConfigDescriptor} from "@/views/configurator/hooks/use-config-descriptor";
import {renderConfig} from "@/share/helpers/config-renderer.ts";
import type {IFieldData} from "@/entities/field-descriptor";
import {ConfigModal} from "@/widgets/config-modal";
import {Fetcher} from "@/features/fetcher";

export default function ConfiguratorView() {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");

  const [config, setConfig] = useState<string>();

  const {configDescriptor, isLoading, error} = useConfigDescriptor(url);

  const onSubmit = (values: IFieldData) => {
    if (!configDescriptor)
      return;

    setConfig(renderConfig(configDescriptor, values));
  }

  if (!url) {
    return <Alert title="Descriptor's URL was not found." type="error" showIcon/>;
  }

  return (
    <>
      <Fetcher
        canShow={configDescriptor != undefined}
        isLoading={isLoading}
        error={error ? "Error while fetching descriptor." : null}
        absolutePosition
      >
        {configDescriptor && <ConfigForm configDescriptor={configDescriptor} onSubmit={onSubmit}/>}
      </Fetcher>
      <ConfigModal config={config} setConfig={setConfig}/>
    </>
  );
}