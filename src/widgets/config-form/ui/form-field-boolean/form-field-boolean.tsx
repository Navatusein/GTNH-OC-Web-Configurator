import {FC, useEffect, useState} from "react";
import {IFieldDescriptorBoolean, IFormProps} from "@/widgets/config-form";
import {Form} from "react-bootstrap";

const FormFieldBoolean: FC<IFormProps<boolean>> = (props) => {
  const [type, setType] = useState<"checkbox"|"radio"|"switch">("checkbox")

  useEffect(() => {
    const fieldDescriptor = props.fieldDescriptor as IFieldDescriptorBoolean;

    if (fieldDescriptor.default != undefined)
      props.onChange(fieldDescriptor.default);

    if (fieldDescriptor.class)
      setType(() => fieldDescriptor.class)

  }, []);

  return (
    <Form.Group controlId={props.fieldDescriptor.key} key={props.fieldDescriptor.key} className="mb-3 form-group">
      <Form.Check
        type={type}
        label={props.fieldDescriptor.label}
        checked={props.value}
        onChange={event => props.onChange(event.target.checked)}
      />
      <Form.Text className="text-muted">{props.fieldDescriptor.description}</Form.Text>
      <Form.Control.Feedback type="invalid">
        Please check this checkbox
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFieldBoolean;