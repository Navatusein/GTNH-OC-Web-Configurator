import {FC, useEffect, useState} from "react";
import {IFieldDescriptorFloat, IFormProps} from "@/widgets/config-form";
import {Form} from "react-bootstrap";
import ReactMarkdown from "react-markdown";

const FormFieldFloat: FC<IFormProps<number>> = (props) => {

  const [max, setMax] = useState<number>();
  const [min, setMin] = useState<number>();
  const [step, setStep] = useState<number>();

  useEffect(() => {
    const fieldDescriptor = props.fieldDescriptor as IFieldDescriptorFloat;

    if (fieldDescriptor.default)
      props.onChange(fieldDescriptor.default);

    if (fieldDescriptor.max)
      setMax(fieldDescriptor.max);

    if (fieldDescriptor.min)
      setMin(fieldDescriptor.min);

    if (fieldDescriptor.step)
      setStep(fieldDescriptor.step);
  }, []);

  return (
    <Form.Group controlId={props.fieldDescriptor.key} key={props.fieldDescriptor.key} className="mb-3 form-group">
      <Form.Label>{props.fieldDescriptor.label}</Form.Label>
      <Form.Control
        type="number"
        max={max}
        min={min}
        step={step ?? "any"}
        value={props.value}
        required={props.fieldDescriptor.optional !== true}
        onChange={event => props.onChange(parseFloat(event.target.value))}
      />
      <Form.Text className="text-muted">
        <ReactMarkdown>
          {props.fieldDescriptor.description}
        </ReactMarkdown>
      </Form.Text>
      <Form.Control.Feedback type="invalid">
        Please enter correct number
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFieldFloat;