import {FC, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {IFieldDescriptorSelect, IFieldDescriptorSelectOption, IFormProps} from "@/widgets/config-form";

const FormFieldSelect: FC<IFormProps<string>> = (props) => {

  const [options, setOptions] = useState<IFieldDescriptorSelectOption[]>([])

  useEffect(() => {
    const fieldDescriptor = props.fieldDescriptor as IFieldDescriptorSelect;

    if (fieldDescriptor.default)
      props.onChange(fieldDescriptor.default);

    setOptions(fieldDescriptor.options);
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
    <Form.Group controlId={props.fieldDescriptor.key} key={props.fieldDescriptor.key} className="mb-3 form-group">
      <Form.Label>{props.fieldDescriptor.label}</Form.Label>
      <Form.Select
        isInvalid={isInvalid()}
        value={props.value}
        required={props.fieldDescriptor.optional !== true}
        onChange={event => props.onChange(event.target.value)}
      >
        <option value="" disabled>Select option</option>
        {options.map(option => (
          <option value={option.value} key={option.label}>{option.label}</option>
        ))}
      </Form.Select>
      <Form.Text className="text-muted">{props.fieldDescriptor.description}</Form.Text>
      <Form.Control.Feedback type="invalid">
        Please select side
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFieldSelect;