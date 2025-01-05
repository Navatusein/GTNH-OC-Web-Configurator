import {FC, FormEvent, useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {
  FormFieldAddress,
  FormFieldColor,
  FormFieldFloat,
  FormFieldInteger,
  FormFieldSide,
  FormFieldString,
  IFormProps
} from "@/widgets/config-form";
import {IFieldGroup} from "@/entities/config-descriptor";

const FORM_FIELD_TYPES = {
  "string": (props: IFormProps<string>) => <FormFieldString {...props} key={props.fieldDescriptor.key}/>,
  "integer": (props: IFormProps<number>) => <FormFieldInteger {...props} key={props.fieldDescriptor.key}/>,
  "float": (props: IFormProps<number>) => <FormFieldFloat {...props} key={props.fieldDescriptor.key}/>,
  "address": (props: IFormProps<string>) => <FormFieldAddress {...props} key={props.fieldDescriptor.key}/>,
  "side": (props: IFormProps<string>) => <FormFieldSide {...props} key={props.fieldDescriptor.key}/>,
  "color": (props: IFormProps<string>) => <FormFieldColor {...props} key={props.fieldDescriptor.key}/>,
  "url": (props: IFormProps<string>) => <FormFieldString {...props} key={props.fieldDescriptor.key}/>,
}

interface IProps {
  fieldGroups: IFieldGroup[]
  onSubmit: (fields: [key: string, value: string|number][]) => void;
}

const ConfigForm: FC<IProps> = (props) => {
  const [formData, setFormData] = useState<{[key: string]: string|number}>({});
  const [formValidate, setFormValidate] = useState(false)

  const onChange = (key: string, value: string|number) => {
    setFormData(prevState => ({...prevState, [key]: value}));
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.reportValidity()) {
      props.onSubmit(Object.entries(formData));
    }

    setFormValidate(true);
  };

  return (
    <Form onSubmit={onSubmit} noValidate>
      {props.fieldGroups.map(fieldGroup => (
        <Card className="p-3 mb-3" key={fieldGroup.key}>
          <Card.Title>{fieldGroup.name}</Card.Title>
          {fieldGroup.fields.map(field => (
            FORM_FIELD_TYPES[field.type]({
              fieldDescriptor: field,
              isValidated: formValidate,
              value: formData[field.key] as never ?? "",
              onChange: (value) => onChange(field.key, value)
            })
          ))}
        </Card>
      ))}
      <Button type="submit">Submit form</Button>
    </Form>
  );
};

export default ConfigForm;