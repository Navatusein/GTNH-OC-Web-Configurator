import {FC, useEffect} from "react";
import {Form} from "react-bootstrap";
import {IFieldDescriptorAddress, IFormProps} from "@/widgets/config-form";
import ReactMarkdown from "react-markdown";


const FormFieldAddress: FC<IFormProps<string>> = (props) => {

  useEffect(() => {
    const fieldDescriptor = props.fieldDescriptor as IFieldDescriptorAddress;

    if (fieldDescriptor.default !== undefined)
      props.onChange(fieldDescriptor.default);
  }, []);

  const isInvalid = () => {
    if (!props.isValidated)
      return false;

    if (props.fieldDescriptor.optional === true && props.value.length === 0)
      return false;

    if (props.value.length < 3 || props.value.length > 36)
      return true;

    const uuidRegex = /^[0-9a-fA-F-]*$/;

    if (!uuidRegex.test(props.value))
      return true;

    const segments = props.value.split('-');
    const segmentLengths = [8, 4, 4, 4, 12];

    for (let i = 0; i < segments.length; i++) {
      if (segments[i].length > segmentLengths[i])
        return true;
    }

    return false;
  }

  return (
    <Form.Group controlId={props.fieldDescriptor.key} key={props.fieldDescriptor.key} className="mb-3 form-group">
      <Form.Label>{props.fieldDescriptor.label}</Form.Label>
      <Form.Control
        type="text"
        isInvalid={isInvalid()}
        value={props.value}
        required={props.value.length > 0 || props.fieldDescriptor.optional !== true}
        min={3}
        autoComplete="devide-address"
        onChange={event => props.onChange(event.target.value)}
      />
      <Form.Text className="text-muted">
        <ReactMarkdown>
          {props.fieldDescriptor.description}
        </ReactMarkdown>
      </Form.Text>
      <Form.Control.Feedback type="invalid">
        Please enter correct address
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFieldAddress;