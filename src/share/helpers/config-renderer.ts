import type {
  FieldDescriptor,
  FieldDescriptorMultipleObjectList,
  FieldDescriptorObjectList,
  IFieldData
} from "@/entities/field-descriptor";
import type {ConfigDescriptor} from "@/entities/config-descriptor";

function fieldPlaceholder(key: string) {
  return `<field>${key}</field>`;
}

function fieldDataKey(key: string) {
  return `config.${key}`;
}

function getSpaceCount(string: string, part: string) {
  const lines = string.split("\n");
  const line = lines.find(line => line.includes(part));

  if (!line)
    return 0;

  const leadingSpaces = line.match(/^ */);
  return leadingSpaces ? leadingSpaces[0].length : 0;
}

function indent(string: string, spaceCount: number) {
  if (spaceCount == 0)
    return string;

  const padding = " ".repeat(spaceCount);
  return string.split("\n").map(line => `${padding}${line}`).join("\n");
}

function renderListField(
  field: FieldDescriptor,
  items: IFieldData[],
  useSpaces: boolean,
  config: string,
  renderItem: (item: IFieldData) => string
) {
  const configPart = items.map(renderItem).join("");
  const spaceCount = useSpaces ? getSpaceCount(config, fieldPlaceholder(field.key)) : 0;
  const padding = " ".repeat(spaceCount);

  return config.replaceAll(`${padding}${fieldPlaceholder(field.key)}`, indent(configPart, spaceCount));
}

function renderConfigPart(fields: FieldDescriptor[], fieldsData: IFieldData, config: string) {
  fields.forEach(field => {
    if (field.type == "objectList") {
      const fieldDescriptor = field as FieldDescriptorObjectList;
      const objectList = fieldsData[field.key] as IFieldData[];

      config = renderListField(field, objectList, !!fieldDescriptor.useSpaces, config, item =>
        renderConfigPart(fieldDescriptor.fields, item, fieldDescriptor.objectTemplate)
      );
    }
    else if (field.type == "multipleObjectList") {
      const fieldDescriptor = field as FieldDescriptorMultipleObjectList;
      const objectList = fieldsData[field.key] as IFieldData[];

      config = renderListField(field, objectList, !!fieldDescriptor.useSpaces, config, item => {
        const object = fieldDescriptor.objects[item._objectType as number];
        return renderConfigPart(object.fields, item, object.objectTemplate);
      });
    }
    else {
      config = config.replaceAll(fieldPlaceholder(field.key), fieldsData[fieldDataKey(field.key)] as string);
    }
  });

  return config;
}

export function renderConfig(configDescriptor: ConfigDescriptor, fieldsData: IFieldData) {
  let config = configDescriptor.configTemplate;

  configDescriptor.fieldGroups.forEach(fieldGroup => {
    config = renderConfigPart(fieldGroup.fields, fieldsData, config);
  })

  return config;
}