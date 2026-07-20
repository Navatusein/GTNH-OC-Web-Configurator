import {Input} from "antd";
import type {FieldDescriptorUrl} from "@/entities/field-descriptor";
import FieldFormItem from "../field-form-item/field-form-item";

interface IProps {
  descriptor: FieldDescriptorUrl;
  name?: string;
  fieldParams?: object;
}

export default function TypeUrl(props: IProps) {
  return (
    <FieldFormItem
      descriptor={props.descriptor}
      name={props.name}
      fieldParams={props.fieldParams}
      rules={[{type: "url"}]}
    >
      <Input/>
    </FieldFormItem>
  );
}