import {FC, useEffect, useState} from "react";
import {FormField, IFieldDescriptorObjectList, IFormProps} from "@/widgets/config-form";
import {FieldTypes, IFieldData, IFieldDescriptor} from "@/entities/config-descriptor";
import {Button, Form, Stack} from "react-bootstrap";
import {CollapsibleCard} from "@/features/collapsible-card";

const FormFieldObjectList: FC<IFormProps<IFieldData[]>> = (props) => {
  const [fieldsDescriptors, setFieldsDescriptors] = useState<IFieldDescriptor[]>([]);
  const [objectsData, setObjectsData] = useState<IFieldData[]>([]);
  const [itemLabel, setItemLabel] = useState("Object")
  
  useEffect(() => {
    const fieldDescriptor = props.fieldDescriptor as IFieldDescriptorObjectList;

    if (fieldDescriptor.itemLabel != undefined)
      setItemLabel(() => fieldDescriptor.itemLabel!)

    props.onChange([]);
    setFieldsDescriptors(() => fieldDescriptor.fields);
  }, []);

  useEffect(() => {
    setObjectsData(props.value);
  }, [props.value]);

  const onChange = (key: string, value: FieldTypes, index: number) => {
    setObjectsData((prevState) => {
      const newState = [
        ...prevState.slice(0, index),
        {...prevState[index], [key]: value},
        ...prevState.slice(index + 1)
      ];

      setTimeout(() => {
        props.onChange(newState);
      }, 1);

      return newState;
    });
  }

  const isInvalid = () => {
    if (!props.isValidated)
      return false;

    if (props.fieldDescriptor.optional === true)
      return false;

    if (objectsData.length <= 0)
      return true;

    return false;
  }

  const addObject = () => {
    setObjectsData((prevState) => [...prevState, {}])
  }

  const removeObject = (index: number) => {
    setObjectsData(prevState =>
      [...prevState.slice(0, index), ...prevState.slice(index + 1)]
    )
  }

  return (
  <>
    <Form.Group
      controlId={props.fieldDescriptor.key}
      key={props.fieldDescriptor.key}
      className={`mb-3 form-group ${props.fieldDescriptor.optional !== true && "required"}`}
    >
      <Form.Label>{props.fieldDescriptor.label}</Form.Label>
      <Form.Control
        type="button"
        className="btn btn-primary"
        bsPrefix="d-block w-100"
        isInvalid={isInvalid()}
        required={props.fieldDescriptor.optional !== true}
        value={`Create new ${itemLabel.toLowerCase()}`}
        onClick={() => addObject()}
      />
      <Form.Text className="text-muted">{props.fieldDescriptor.description}</Form.Text>
      <Form.Control.Feedback type="invalid">
        Please create {itemLabel}
      </Form.Control.Feedback>
    </Form.Group>
    {objectsData.length > 0 &&
      <Stack gap={3}>
        {objectsData.map((objectData, objectDataIndex) => (
          <CollapsibleCard key={`object-${objectDataIndex}`} title={`${itemLabel} ${objectDataIndex + 1}`} defaultOpen>
            {fieldsDescriptors?.map(field => (
              <FormField
                key={field.key}
                field={field}
                formValidate={props.isValidated}
                value={objectData[field.key] as never ?? ""}
                onChange={(key, value) => onChange(key, value, objectDataIndex)}
              />
            ))}
            <Button
              variant="danger"
              className="mb-2"
              onClick={() => removeObject(objectDataIndex)}
            >
              Delete
            </Button>
          </CollapsibleCard>
        ))}
      </Stack>
    }
  </>
  );
};

export default FormFieldObjectList;