import type {ComponentType} from "react";
import type {FieldDescriptor, FieldTypes} from "@/entities/field-descriptor";
import {Alert} from "antd";
import TypeString from "../type-string/type-string";
import TypeInteger from "../type-integer/type-integer";
import TypeBoolean from "../type-boolean/type-boolean";
import TypeAddress from "../type-address/type-address";
import TypeUrl from "../type-url/type-url";
import TypeSide from "../type-side/type-side";
import TypeColor from "../type-color/type-color";
import TypeFloat from "../type-float/type-float";
import TypeSelect from "../type-select/type-select";
import TypeObjectList from "../type-object-list/type-object-list";
import TypeMultipleObjectList from "../type-multiple-object-list/type-multiple-object-list";

interface IProps {
  descriptor: FieldDescriptor;
  fieldName?: string;
  fieldParams?: object;
}

type FieldComponent = ComponentType<{descriptor: never; name?: string; fieldParams?: object}>;

const FORM_FIELD_TYPES: Partial<Record<FieldTypes, FieldComponent>> = {
  string: TypeString,
  address: TypeAddress,
  url: TypeUrl,
  integer: TypeInteger,
  float: TypeFloat,
  boolean: TypeBoolean,
  select: TypeSelect,
  side: TypeSide,
  color: TypeColor,
  objectList: TypeObjectList,
  multipleObjectList: TypeMultipleObjectList,
};

export default function FormFieldRender(props: IProps) {
  const Component = FORM_FIELD_TYPES[props.descriptor.type];

  if (!Component)
    return <Alert type="error" title="undefined type"/>;

  return (
    <Component
      key={props.descriptor.key}
      descriptor={props.descriptor as never}
      name={props.fieldName}
      fieldParams={props.fieldParams}
    />
  );
}
