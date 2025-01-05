import {FC, useEffect} from "react";
import {Form} from "react-bootstrap";
import {IFieldDescriptorSide, IFormProps} from "@/widgets/config-form";

const FormFieldSide: FC<IFormProps<string>> = (props) => {

  useEffect(() => {
    const fieldDescriptor = props.fieldDescriptor as IFieldDescriptorSide;

    if (fieldDescriptor.default)
      props.onChange(fieldDescriptor.default);

  }, []);

  const isInvalid = () => {
    if (!props.isValidated)
      return false;

    if (props.fieldDescriptor.optional === true)
      return false;

    if (props.value == "")
      return true;

    return false;
  }

  return (
    <Form.Group controlId={props.fieldDescriptor.key} key={props.fieldDescriptor.key} className="mb-3">
      <Form.Label>{props.fieldDescriptor.label}</Form.Label>
      <Form.Select
        isInvalid={isInvalid()}
        value={props.value}
        required={props.fieldDescriptor.optional !== true}
        onChange={event => props.onChange(event.target.value)}
      >
        <option value="" disabled>Select side</option>
        <option value="sides.north">North</option>
        <option value="sides.south">South</option>
        <option value="sides.west">West</option>
        <option value="sides.east">East</option>
        <option value="sides.up">Up</option>
        <option value="sides.down">Down</option>
      </Form.Select>
      <Form.Text className="text-muted">{props.fieldDescriptor.description}</Form.Text>
      <Form.Control.Feedback type="invalid">
        Please select side
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFieldSide;