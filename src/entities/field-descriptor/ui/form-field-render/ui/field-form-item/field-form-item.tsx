import {Form} from "antd";
import type {FieldDescriptor} from "@/entities/field-descriptor";
import type {Rule} from "antd/es/form";
import ReactMarkdown from "react-markdown";
import type {ReactNode} from "react";

interface IProps {
  descriptor: FieldDescriptor;
  name?: string;
  fieldParams?: object;
  rules?: Rule[];
  label?: ReactNode;
  valuePropName?: string;
  children: ReactNode;
}

export default function FieldFormItem(props: IProps) {
  return (
    <Form.Item
      {...props.fieldParams}
      name={[props.name, `config.${props.descriptor.key}`].filter(x => x != undefined)}
      label={props.label === undefined ? props.descriptor.label : props.label}
      required={!props.descriptor.optional}
      style={{margin: 0}}
      valuePropName={props.valuePropName}
      extra={<ReactMarkdown>{props.descriptor.description}</ReactMarkdown>}
      initialValue={props.descriptor.default}
      rules={[{required: !props.descriptor.optional}, ...(props.rules ?? [])]}
    >
      {props.children}
    </Form.Item>
  );
}