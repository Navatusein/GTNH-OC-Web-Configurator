import {InputNumber} from "antd";
import type {FieldDescriptorInteger} from "@/entities/field-descriptor";
import FieldFormItem from "../field-form-item/field-form-item";

interface IProps {
  descriptor: FieldDescriptorInteger;
  name?: string;
  fieldParams?: object;
}

export default function TypeInteger(props: IProps) {
  return (
    <FieldFormItem descriptor={props.descriptor} name={props.name} fieldParams={props.fieldParams}>
      <InputNumber
        style={{width: "100%"}}
        max={props.descriptor.max}
        min={props.descriptor.min}
        precision={0}
        step={props.descriptor.step ?? 1}
      />
    </FieldFormItem>
  );
}