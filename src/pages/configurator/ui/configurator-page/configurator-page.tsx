import {FC, useMemo, useState} from "react";
import {IConfigDescriptor, IFieldData, IFieldDescriptor} from "@/entities/config-descriptor";
import {ConfigForm, IFieldDescriptorMultipleObjectList, IFieldDescriptorObjectList} from "@/widgets/config-form";
import {useSearchParams} from "react-router";
import useFetch from "@/share/hooks/use-fetch";
import {parse} from "yaml";
import {PreparedConfigModal} from "@/widgets/prepared-config-modal";
import {Fetcher} from "@/features/fetcher";
import {Card} from "react-bootstrap";

const ConfiguratorPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [finalConfig, setFinalConfig] = useState("");

  const configDescriptorUrl = useMemo(() => {
    return searchParams.get("url");
  }, [searchParams]);

  const {data, isLoading, error} = useFetch(configDescriptorUrl);

  const configDescriptor = useMemo((): IConfigDescriptor|null => {
    return data && parse(data).descriptor;
  }, [data]);

  const getSpaceCount = (string: string, part: string) => {
    const lines = string.split("\n");
    const line = lines.find(line => line.includes(part));

    if (!line)
      return 0;

    const leadingSpaces = line.match(/^ */);
    return leadingSpaces ? leadingSpaces[0].length : 0;
  }

  const parseFields = (fields: IFieldDescriptor[], fieldsData: IFieldData, config: string) => {
    fields.forEach(field => {
      if (field.type == "objectList") {
        const fieldDescriptor = field as IFieldDescriptorObjectList;
        const objectList = fieldsData[field.key] as IFieldData[];
        let configPart = "";

        objectList.forEach((objectItem) => {
          configPart += parseFields(fieldDescriptor.fields, objectItem, fieldDescriptor.objectTemplate)
        })

        const spaceCount = fieldDescriptor.useSpaces ? getSpaceCount(config, `<field>${field.key}</field>`) : 0;

        configPart = configPart.split("\n").map(x => `${" ".repeat(spaceCount)}${x}`).join("\n");
        config = config.replaceAll(`${" ".repeat(spaceCount)}<field>${field.key}</field>`, configPart);
      }
      else if (field.type == "multipleObjectList") {
        const fieldDescriptor = field as IFieldDescriptorMultipleObjectList;

        const objectList = fieldsData[field.key] as IFieldData[];
        let configPart = "";

        objectList.forEach((objectItem) => {
          configPart += parseFields(fieldDescriptor.objects[objectItem._objectType as number].fields, objectItem, fieldDescriptor.objects[objectItem._objectType as number].objectTemplate)
        })

        const spaceCount = fieldDescriptor.useSpaces ? getSpaceCount(config, `<field>${field.key}</field>`) : 0;

        configPart = configPart.split("\n").map(x => `${" ".repeat(spaceCount)}${x}`).join("\n");
        config = config.replaceAll(`${" ".repeat(spaceCount)}<field>${field.key}</field>`, configPart);
      }
      else {
        config = config.replaceAll(`<field>${field.key}</field>`, fieldsData[field.key] as string);
      }
    });

    return config;
  }

  const onSubmit = (fieldsData: IFieldData) => {
    if (!configDescriptor)
      return;

    let config = configDescriptor.configTemplate;

    configDescriptor.fieldGroups.forEach(fieldGroup => {
      config = parseFields(fieldGroup.fields, fieldsData, config);
    })

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