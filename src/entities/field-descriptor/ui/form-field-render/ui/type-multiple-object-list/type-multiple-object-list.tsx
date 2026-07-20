import {Button, Flex, Form, Input, Select} from "antd";
import {type FieldDescriptorMultipleObjectList, FieldsGroup} from "@/entities/field-descriptor";
import ReactMarkdown from "react-markdown";
import {useState} from "react";

interface IProps {
  descriptor: FieldDescriptorMultipleObjectList;
  name?: string;
  fieldParams?: object;
}

export default function TypeMultipleObjectList(props: IProps) {
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number | undefined>();

  const listName = [props.name, props.descriptor.key].filter(x => x != undefined);

  return (
    <Form.List name={listName} {...props.fieldParams}>
      {(fields, {add, remove}) => (
        <>
          <Form.Item
            label={props.descriptor.label}
            required={!props.descriptor.optional}
            style={{margin: 0}}
            extra={<ReactMarkdown>{props.descriptor.description}</ReactMarkdown>}
          >
            <Flex vertical gap="small">
              <Select
                placeholder="Select option"
                value={selectedTypeIndex}
                onChange={setSelectedTypeIndex}
                options={props.descriptor.objects.map((object, index) => (
                  {value: index, label: object.label}
                ))}
              />
              <Button
                block
                disabled={selectedTypeIndex == undefined}
                onClick={() => {
                  if (selectedTypeIndex != undefined)
                    add({typeIndex: selectedTypeIndex, type: props.descriptor.objects[selectedTypeIndex].key});
                }}
              >
                {`Create new ${props.descriptor.itemLabel?.toLowerCase()}`}
              </Button>
            </Flex>
          </Form.Item>

          {fields.map(({key, name, ...fieldParams}) => (
            <Flex vertical key={key}>
              <Form.Item {...fieldParams} name={[name, "type"]} hidden>
                <Input/>
              </Form.Item>
              <Form.Item {...fieldParams} name={[name, "typeIndex"]} hidden>
                <Input/>
              </Form.Item>
              <Form.Item noStyle shouldUpdate>
                {(form) => {
                  const typeIndex = form.getFieldValue([props.descriptor.key, name, "typeIndex"]);
                  const object = props.descriptor.objects[typeIndex];

                  return (
                    <FieldsGroup
                      name={object.key}
                      label={`${props.descriptor.itemLabel}: ${name + 1} Type: ${object.label}`}
                      fields={object.fields}
                      fieldName={`${name}`}
                      defaultOpen
                      fieldParams={fieldParams}
                    >
                      <Button block onClick={() => remove(name)} danger>
                        Delete
                      </Button>
                    </FieldsGroup>
                  );
                }}
              </Form.Item>
            </Flex>
          ))}
        </>
      )}
    </Form.List>
  );
}