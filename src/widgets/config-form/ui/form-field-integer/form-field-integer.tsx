import {FC, useEffect, useState} from "react";
import {IFieldDescriptorInteger, IFormProps} from "@/widgets/config-form";
import {Form} from "react-bootstrap";

const FormFieldInteger: FC<IFormProps<number>> = (props) => {

  const [max, setMax] = useState<number>();
  const [min, setMin] = useState<number>();

  useEffect(() => {
    const fieldDescriptor = props.fieldDescriptor as IFieldDescriptorInteger;

    if (fieldDescriptor.default)
      props.onChange(fieldDescriptor.default);

    if (fieldDescriptor.max)
      setMax(fieldDescriptor.max);

    if (fieldDescriptor.min)
      setMin(fieldDescriptor.min);

  }, []);

  return (
    <Form.Group controlId={props.fieldDescriptor.key} key={props.fieldDescriptor.key} className="mb-3">
      <Form.Label>{props.fieldDescriptor.label}</Form.Label>
      <Form.Control
        type="number"
        max={max}
        min={min}
        value={props.value}
        required={props.fieldDescriptor.optional !== true}
        onChange={event => props.onChange(parseInt(event.target.value))}
      />
      <Form.Text className="text-muted">{props.fieldDescriptor.description}</Form.Text>
      <Form.Control.Feedback type="invalid">
        Please enter correct number
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFieldInteger;