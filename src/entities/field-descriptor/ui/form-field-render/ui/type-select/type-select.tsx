import {Select} from "antd";
import type {FieldDescriptorSelect} from "@/entities/field-descriptor";
import FieldFormItem from "../field-form-item/field-form-item";

interface IProps {
  descriptor: FieldDescriptorSelect;
  name?: string;
  fieldParams?: object;
}

export default function TypeSelect(props: IProps) {
  return (
    <FieldFormItem descriptor={props.descriptor} name={props.name} fieldParams={props.fieldParams}>
      <Select
        placeholder="Select option"
        options={props.descriptor.options.map(option => ({value: option.value, label: option.label}))}
      />
    </FieldFormItem>
  );
}