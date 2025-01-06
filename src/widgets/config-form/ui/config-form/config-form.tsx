import {FC, FormEvent, useContext, useState} from "react";
import {Alert, Button, Card, Form} from "react-bootstrap";
import {
  FormFieldAddress,
  FormFieldBoolean,
  FormFieldColor,
  FormFieldFloat,
  FormFieldInteger,
  FormFieldSelect,
  FormFieldSide,
  FormFieldString,
  FormFieldUrl,
  IFormProps
} from "@/widgets/config-form";
import {FieldTypes, IFieldGroup} from "@/entities/config-descriptor";
import {NotificationContext} from "@/share/context/notification-context.ts";

const FORM_FIELD_TYPES = {
  "boolean": (props: IFormProps<boolean>) => <FormFieldBoolean {...props} key={props.fieldDescriptor.key}/>,
  "string": (props: IFormProps<string>) => <FormFieldString {...props} key={props.fieldDescriptor.key}/>,
  "integer": (props: IFormProps<number>) => <FormFieldInteger {...props} key={props.fieldDescriptor.key}/>,
  "float": (props: IFormProps<number>) => <FormFieldFloat {...props} key={props.fieldDescriptor.key}/>,
  "address": (props: IFormProps<string>) => <FormFieldAddress {...props} key={props.fieldDescriptor.key}/>,
  "side": (props: IFormProps<string>) => <FormFieldSide {...props} key={props.fieldDescriptor.key}/>,
  "color": (props: IFormProps<string>) => <FormFieldColor {...props} key={props.fieldDescriptor.key}/>,
  "url": (props: IFormProps<string>) => <FormFieldUrl {...props} key={props.fieldDescriptor.key}/>,
  "select": (props: IFormProps<string>) => <FormFieldSelect {...props} key={props.fieldDescriptor.key}/>
}

interface IProps {
  fieldGroups: IFieldGroup[]
  onSubmit: (fields: [key: string, value: FieldTypes][]) => void;
}

const ConfigForm: FC<IProps> = (props) => {
  const {showNotification} = useContext(NotificationContext);

  const [formData, setFormData] = useState<{[key: string]: FieldTypes}>({});
  const [formValidate, setFormValidate] = useState(false);

  const onChange = (key: string, value: FieldTypes) => {
    setFormData(prevState => ({...prevState, [key]: value}));
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (formValidate && form.reportValidity() && form.querySelectorAll(".is-invalid").length === 0) {
      props.onSubmit(Object.entries(formData));
      return;
    }

    setFormValidate(true);

    if (!formValidate) {
      setTimeout(() => {
        if (form.reportValidity() && form.querySelectorAll(".is-invalid").length === 0) {
          props.onSubmit(Object.entries(formData));
        }
        else {
          showNotification("Form validation error", {variant: "danger"});
        }
      }, 100);
    }    else {
      showNotification("Form validation error", {variant: "danger"});
    }
  };

  return (
    <Form onSubmit={onSubmit} noValidate autoComplete="off" className="p-0">
      {props.fieldGroups.map(fieldGroup => (
        <Card className="p-3 mb-3" key={fieldGroup.key}>
          <Card.Title>{fieldGroup.name}</Card.Title>
          {fieldGroup.description &&
            <Card.Text className="text-muted">
              {fieldGroup.description}
            </Card.Text>
          }
          {fieldGroup.fields.map(field => {
            const props = {
              fieldDescriptor: field,
              isValidated: formValidate,
              value: formData[field.key] as never ?? "",
              onChange: (value: FieldTypes) => onChange(field.key, value),
            }

            if (!FORM_FIELD_TYPES[field.type])
              return <Alert>Undefined type</Alert>;

            return FORM_FIELD_TYPES[field.type](props as never)
          })}
        </Card>
      ))}
      <div className="d-grid gap-2">
        <Button type="submit">Generate config</Button>
      </div>
    </Form>
  );
};

export default ConfigForm;