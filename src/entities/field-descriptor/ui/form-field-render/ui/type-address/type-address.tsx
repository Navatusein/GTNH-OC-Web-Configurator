import {Input} from "antd";
import type {FieldDescriptorAddress} from "@/entities/field-descriptor";
import FieldFormItem from "../field-form-item/field-form-item";

interface IProps {
  descriptor: FieldDescriptorAddress;
  name?: string;
  fieldParams?: object;
}

const PARTIAL_UUID_REGEX = /^[0-9a-fA-F]{0,8}(-[0-9a-fA-F]{0,4}(-[0-9a-fA-F]{0,4}(-[0-9a-fA-F]{0,4}(-[0-9a-fA-F]{0,12})?)?)?)?$/;

export default function TypeAddress(props: IProps) {
  return (
    <FieldFormItem
      descriptor={props.descriptor}
      name={props.name}
      fieldParams={props.fieldParams}
      rules={[{pattern: PARTIAL_UUID_REGEX, message: `${props.descriptor.label} must be correct address`}]}
    >
      <Input/>
    </FieldFormItem>
  );
}