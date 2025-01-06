import {FC, useMemo, useState} from "react";
import {FieldTypes, IConfigDescriptor} from "@/entities/config-descriptor";
import {ConfigForm} from "@/widgets/config-form";
import {useLocation} from "react-router";
import useFetch from "@/share/hooks/use-fetch";
import {parse} from "yaml";
import {PreparedConfigModal} from "@/widgets/prepared-config-modal";
import {Fetcher} from "@/features/fetcher";
import {Card} from "react-bootstrap";

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

  const onSubmit = (fields: [key: string, value: FieldTypes][]) => {
    let config = configDescriptor!.configTemplate;

    fields.forEach(([key, value]) => {
      config = config.replace(`<field>${key}</field>`, value as string);
    });

    setFinalConfig(() => config);
  }

  return (
    <>
      <Fetcher isLoading={isLoading} error={error} canShow={configDescriptor != null}>
        {configDescriptor != null &&
          <>
            <Card className="mb-3 p-3">
              <Card.Title>{configDescriptor.name}</Card.Title>
              <Card.Text>{configDescriptor.description}</Card.Text>
              {configDescriptor.repositoryLink != null &&
                <Card.Link href={configDescriptor.repositoryLink!}>Link to repo</Card.Link>
              }
            </Card>
            <ConfigForm fieldGroups={configDescriptor?.fieldGroups} onSubmit={onSubmit}/>
          </>
        }
      </Fetcher>
      <PreparedConfigModal config={finalConfig} setConfig={setFinalConfig}/>
    </>
  );
};

export default ConfiguratorPage;