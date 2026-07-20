import {Button, Flex, Form, Input} from "antd";
import {type FieldDescriptorObjectList, FieldsGroup} from "@/entities/field-descriptor";
import ReactMarkdown from "react-markdown";

interface IProps {
  descriptor: FieldDescriptorObjectList;
  name?: string;
  fieldParams?: object;
}

export default function TypeObjectList(props: IProps) {
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
              <Button block onClick={() => add()}>
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
              <FieldsGroup
                name={props.descriptor.key}
                label={`${props.descriptor.itemLabel}: ${name + 1}`}
                fields={props.descriptor.fields}
                fieldName={`${name}`}
                defaultOpen
                fieldParams={fieldParams}
              >
                <Button block onClick={() => remove(name)} danger>
                  Delete
                </Button>
              </FieldsGroup>
            </Flex>
          ))}
        </>
      )}
    </Form.List>
  );
}