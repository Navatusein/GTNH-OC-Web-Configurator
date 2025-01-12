import {FC, FormEvent, useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {FieldTypes, IFieldData, IFieldGroup} from "@/entities/config-descriptor";
import {NotificationContext} from "@/share/context/notification-context.ts";
import {FormField, FormStringCard} from "@/widgets/config-form";
import {CollapsibleCard} from "@/features/collapsible-card";

interface IProps {
  fieldGroups: IFieldGroup[]
  onSubmit: (fields: IFieldData) => void;
}

const ConfigForm: FC<IProps> = (props) => {
  const {showNotification} = useContext(NotificationContext);

  const [formData, setFormData] = useState<IFieldData>({});
  const [formValidate, setFormValidate] = useState(false);

  const onChange = (key: string, value: FieldTypes) => {
    setFormData((prevState) => ({...prevState, [key]: value}));
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (formValidate && form.reportValidity() && form.querySelectorAll(".is-invalid").length === 0) {
      props.onSubmit(formData);
      return;
    }

    setFormValidate(true);

    if (!formValidate) {
      setTimeout(() => {
        if (form.reportValidity() && form.querySelectorAll(".is-invalid").length === 0) {
          props.onSubmit(formData);
        }
        else {
          showNotification("Form validation error", {variant: "danger"});
        }
      }, 100);
    }
    else {
      showNotification("Form validation error", {variant: "danger"});
    }
  };

  return (
    <>
      <FormStringCard formData={formData} setFormData={setFormData}/>
      <Form onSubmit={onSubmit} noValidate autoComplete="off" className="p-0">
        {props.fieldGroups.map(fieldGroup => (
          <CollapsibleCard
            className="mb-3"
            key={fieldGroup.key}
            title={fieldGroup.name}
            description={fieldGroup.description}
            defaultOpen={fieldGroup.defaultOpen ?? true}
          >
            {fieldGroup.fields.map(field => (
              <FormField
                key={field.key}
                field={field}
                formValidate={formValidate}
                value={formData[field.key] as never ?? ""}
                onChange={onChange}
              />
            ))}
          </CollapsibleCard>
        ))}
        <Button type="submit" className="w-100">Generate config</Button>
      </Form>
    </>
  );
};

export default ConfigForm;