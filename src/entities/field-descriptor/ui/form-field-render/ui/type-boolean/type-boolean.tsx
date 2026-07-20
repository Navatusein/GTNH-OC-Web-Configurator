import {Checkbox} from "antd";
import type {FieldDescriptorBoolean} from "@/entities/field-descriptor";
import FieldFormItem from "../field-form-item/field-form-item";

interface IProps {
  descriptor: FieldDescriptorBoolean;
  name?: string;
  fieldParams?: object;
}

export default function TypeBoolean(props: IProps) {
  return (
    <FieldFormItem
      descriptor={props.descriptor}
      name={props.name}
      fieldParams={props.fieldParams}
      label={null}
      valuePropName="checked"
    >
      <Checkbox>
        {props.descriptor.label}
      </Checkbox>
    </FieldFormItem>
  );
}