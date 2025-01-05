import {FC, useEffect} from "react";
import {Form} from "react-bootstrap";
import {IFieldDescriptorUrl, IFormProps} from "@/widgets/config-form";
import isUrlHttp from "is-url-http";


const FormFieldUrl: FC<IFormProps<string>> = (props) => {

  useEffect(() => {
    const fieldDescriptor = props.fieldDescriptor as IFieldDescriptorUrl;

    if (fieldDescriptor.default !== undefined)
      props.onChange(fieldDescriptor.default);
  }, []);

  const isInvalid = () => {
    if (!props.isValidated)
      return false;

    if (props.fieldDescriptor.optional && props.value.length == 0)
      return false;

    if (!isUrlHttp(props.value))
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
        onChange={event => props.onChange(event.target.value)}
      />
      <Form.Text className="text-muted">{props.fieldDescriptor.description}</Form.Text>
      <Form.Control.Feedback type="invalid">
        Please enter correct url
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFieldUrl;