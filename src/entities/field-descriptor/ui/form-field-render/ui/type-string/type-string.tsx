import {Input} from "antd";
import type {FieldDescriptorString} from "@/entities/field-descriptor";
import type {Rule} from "antd/es/form";
import FieldFormItem from "../field-form-item/field-form-item";

interface IProps {
  descriptor: FieldDescriptorString;
  name?: string;
  fieldParams?: object;
}

export default function TypeString(props: IProps) {
  const rules: Rule[] = [];

  if (props.descriptor.max !== undefined)
    rules.push({max: props.descriptor.max});

  if (props.descriptor.min !== undefined)
    rules.push({min: props.descriptor.min});

  return (
    <FieldFormItem descriptor={props.descriptor} name={props.name} fieldParams={props.fieldParams} rules={rules}>
      <Input/>
    </FieldFormItem>
  );
}