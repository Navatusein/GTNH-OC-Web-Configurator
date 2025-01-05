import {FC, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {IFieldDescriptorString, IFormProps} from "@/widgets/config-form";


const FormFieldString: FC<IFormProps<string>> = (props) => {

  const [max, setMax] = useState<number>();
  const [min, setMin] = useState<number>();

  useEffect(() => {
    const fieldDescriptor = props.fieldDescriptor as IFieldDescriptorString;

    if (fieldDescriptor.default !== undefined)
      props.onChange(fieldDescriptor.default);

    if (fieldDescriptor.max)
      setMax(parseInt(fieldDescriptor.max));

    if (fieldDescriptor.min)
      setMin(parseInt(fieldDescriptor.min));

  }, []);

  const isInvalid = () => {
    if (!props.isValidated)
      return false;

    if (props.fieldDescriptor.optional && props.value.length == 0)
      return false;

    if (min && props.value.length <= min)
      return true;

    if (max && props.value.length >= max)
      return true;

    return false;
  }

  return (
    <Form.Group controlId={props.fieldDescriptor.key} key={props.fieldDescriptor.key} className="mb-3">
      <Form.Label>{props.fieldDescriptor.label}</Form.Label>
      <Form.Control
        type="text"
        isInvalid={isInvalid()}
        value={props.value}
        required={props.value.length > 0 || props.fieldDescriptor.optional !== true}
        min={min}
        max={max}
        onChange={event => props.onChange(event.target.value)}
      />
      <Form.Text className="text-muted">{props.fieldDescriptor.description}</Form.Text>
      <Form.Control.Feedback type="invalid">
        Please enter correct string
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFieldString;