import {Flex} from "antd";
import type {FieldDescriptor} from "@/entities/field-descriptor";
import FormFieldListRender from "../form-field-list-render/form-field-list-render";
import type {ReactNode} from "react";
import {CollapsibleCard} from "@/features/collapsible-card";

interface IProps {
  name: string;
  label: string;
  defaultOpen?: boolean;
  fields: FieldDescriptor[];
  children?: ReactNode;
  fieldName?: string;
  fieldParams?: object;
}

export default function FieldsGroup(props: IProps) {
  return (
    <CollapsibleCard label={props.label} defaultOpen={props.defaultOpen}>
      <Flex vertical gap="medium">
        <FormFieldListRender
          fields={props.fields}
          key={props.name}
          fieldName={props.fieldName}
          fieldParams={props.fieldParams}
        />
        {props.children}
      </Flex>
    </CollapsibleCard>
  )
}
