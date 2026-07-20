import {Flex} from "antd";
import type {FieldDescriptor} from "@/entities/field-descriptor";
import {FormFieldRender} from "@/entities/field-descriptor/ui/form-field-render";

interface IProps {
  fields: FieldDescriptor[];
  fieldName?: string;
  fieldParams?: object;
}

export default function FormFieldListRender(props: IProps) {
  return (
    <Flex vertical gap="medium">
      {props.fields.map((field) => (
        <FormFieldRender descriptor={field} key={field.key} fieldName={props.fieldName} fieldParams={props.fieldParams}/>
      ))}
    </Flex>
  )
}
