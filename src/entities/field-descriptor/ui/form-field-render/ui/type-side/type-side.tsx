import {Select} from "antd";
import type {FieldDescriptorSide} from "@/entities/field-descriptor";
import FieldFormItem from "../field-form-item/field-form-item";

interface IProps {
  descriptor: FieldDescriptorSide;
  name?: string;
  fieldParams?: object;
}

const SIDE_OPTIONS = [
  {value: "sides.north", label: "North"},
  {value: "sides.south", label: "South"},
  {value: "sides.west", label: "West"},
  {value: "sides.east", label: "East"},
  {value: "sides.up", label: "Up"},
  {value: "sides.down", label: "Down"},
];

export default function TypeSide(props: IProps) {
  return (
    <FieldFormItem descriptor={props.descriptor} name={props.name} fieldParams={props.fieldParams}>
      <Select placeholder="Select side" options={SIDE_OPTIONS}/>
    </FieldFormItem>
  );
}