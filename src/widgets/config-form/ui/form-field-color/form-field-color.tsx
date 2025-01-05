import {FC, useEffect} from "react";
import {Form} from "react-bootstrap";
import {IFieldDescriptorColor, IFormProps} from "@/widgets/config-form";

const FormFieldColor: FC<IFormProps<string>> = (props) => {

  useEffect(() => {
    const fieldDescriptor = props.fieldDescriptor as IFieldDescriptorColor;

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
        <option value="colors.white">White</option>
        <option value="colors.orange">Orange</option>
        <option value="colors.magenta">Magenta</option>
        <option value="colors.lightblue">Lightblue</option>
        <option value="colors.yellow">Yellow</option>
        <option value="colors.lime">Lime</option>
        <option value="colors.pink">Pink</option>
        <option value="colors.gray">Gray</option>
        <option value="colors.silver">Silver</option>
        <option value="colors.cyan">Cyan</option>
        <option value="colors.purple">Purple</option>
        <option value="colors.blue">Blue</option>
        <option value="colors.brown">Brown</option>
        <option value="colors.green">Green</option>
        <option value="colors.red">Red</option>
        <option value="colors.black">Black</option>
      </Form.Select>
      <Form.Text className="text-muted">{props.fieldDescriptor.description}</Form.Text>
      <Form.Control.Feedback type="invalid">
        Please select color
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFieldColor;