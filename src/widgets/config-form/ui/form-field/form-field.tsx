import {FC, useMemo} from "react";
import {
  FormFieldAddress,
  FormFieldBoolean,
  FormFieldColor,
  FormFieldFloat,
  FormFieldInteger, FormFieldMultipleObjectList, FormFieldObjectList,
  FormFieldSelect,
  FormFieldSide,
  FormFieldString,
  FormFieldUrl,
  IFormProps
} from "@/widgets/config-form";
import {FieldTypes, IFieldData, IFieldDescriptor} from "@/entities/config-descriptor";
import {Alert} from "react-bootstrap";

const FORM_FIELD_TYPES = {
  "boolean": (props: IFormProps<boolean>) => <FormFieldBoolean {...props} key={props.fieldDescriptor.key}/>,
  "string": (props: IFormProps<string>) => <FormFieldString {...props} key={props.fieldDescriptor.key}/>,
  "integer": (props: IFormProps<number>) => <FormFieldInteger {...props} key={props.fieldDescriptor.key}/>,
  "float": (props: IFormProps<number>) => <FormFieldFloat {...props} key={props.fieldDescriptor.key}/>,
  "address": (props: IFormProps<string>) => <FormFieldAddress {...props} key={props.fieldDescriptor.key}/>,
  "side": (props: IFormProps<string>) => <FormFieldSide {...props} key={props.fieldDescriptor.key}/>,
  "color": (props: IFormProps<string>) => <FormFieldColor {...props} key={props.fieldDescriptor.key}/>,
  "url": (props: IFormProps<string>) => <FormFieldUrl {...props} key={props.fieldDescriptor.key}/>,
  "select": (props: IFormProps<string>) => <FormFieldSelect {...props} key={props.fieldDescriptor.key}/>,
  "objectList": (props: IFormProps<IFieldData[]>) => <FormFieldObjectList {...props} key={props.fieldDescriptor.key}/>,
  "multipleObjectList": (props: IFormProps<IFieldData[]>) => <FormFieldMultipleObjectList {...props} key={props.fieldDescriptor.key}/>
}

interface IProps {
  field: IFieldDescriptor;
  formValidate: boolean;
  value: never;
  onChange: (key: string, value: FieldTypes) => void;
}

const FormField: FC<IProps> = (props) => {
  const fieldProps = useMemo(() => ({
    fieldDescriptor: props.field,
    isValidated: props.formValidate,
    value: props.value,
    onChange: (value: FieldTypes) => props.onChange(props.field.key, value),
  }), [props]);

  if (!FORM_FIELD_TYPES[props.field.type])
    return <Alert>Undefined type</Alert>;

  return FORM_FIELD_TYPES[props.field.type](fieldProps as never)
};

export default FormField;