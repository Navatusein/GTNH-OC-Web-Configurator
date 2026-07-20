import {Select} from "antd";
import type {FieldDescriptorColor} from "@/entities/field-descriptor";
import FieldFormItem from "../field-form-item/field-form-item";

interface IProps {
  descriptor: FieldDescriptorColor;
  name?: string;
  fieldParams?: object;
}

const COLOR_OPTIONS = [
  {value: "colors.white", label: "White"},
  {value: "colors.orange", label: "Orange"},
  {value: "colors.magenta", label: "Magenta"},
  {value: "colors.lightblue", label: "Lightblue"},
  {value: "colors.yellow", label: "Yellow"},
  {value: "colors.lime", label: "Lime"},
  {value: "colors.pink", label: "Pink"},
  {value: "colors.gray", label: "Gray"},
  {value: "colors.silver", label: "Silver"},
  {value: "colors.cyan", label: "Cyan"},
  {value: "colors.purple", label: "Purple"},
  {value: "colors.blue", label: "Blue"},
  {value: "colors.brown", label: "Brown"},
  {value: "colors.green", label: "Green"},
  {value: "colors.red", label: "Red"},
  {value: "colors.black", label: "Black"},
];

export default function TypeColor(props: IProps) {
  return (
    <FieldFormItem descriptor={props.descriptor} name={props.name} fieldParams={props.fieldParams}>
      <Select placeholder="Select color" options={COLOR_OPTIONS}/>
    </FieldFormItem>
  );
}