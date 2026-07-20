import {InputNumber} from "antd";
import type {FieldDescriptorFloat} from "@/entities/field-descriptor";
import FieldFormItem from "../field-form-item/field-form-item";

interface IProps {
  descriptor: FieldDescriptorFloat;
  name?: string;
  fieldParams?: object;
}

export default function TypeFloat(props: IProps) {
  return (
    <FieldFormItem descriptor={props.descriptor} name={props.name} fieldParams={props.fieldParams}>
      <InputNumber
        style={{width: "100%"}}
        max={props.descriptor.max}
        min={props.descriptor.min}
        precision={props.descriptor.precision ?? 1}
        step={props.descriptor.step}
      />
    </FieldFormItem>
  );
}