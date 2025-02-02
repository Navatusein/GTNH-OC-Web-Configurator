import {FC, useEffect, useState} from "react";
import {FieldTypes, IFieldData, IFieldDescriptor} from "@/entities/config-descriptor";
import {FormField, IFieldDescriptorMultipleObjectList, IFormProps} from "@/widgets/config-form";
import {Button, Form, Stack} from "react-bootstrap";
import {CollapsibleCard} from "@/features/collapsible-card";
import ReactMarkdown from "react-markdown";

interface IObjectType {
  label: string;
  index: number;
}

const FormFieldMultipleObjectList: FC<IFormProps<IFieldData[]>> = (props) => {
  const [fieldsDescriptors, setFieldsDescriptors] = useState<IFieldDescriptor[][]>([]);
  const [objectsData, setObjectsData] = useState<IFieldData[]>([]);
  const [itemLabel, setItemLabel] = useState("Object")
  const [objectTypes, setObjectTypes] = useState<IObjectType[]>([])
  const [selectedObjectType, setSelectedObjectType] = useState<number>(-1);

  useEffect(() => {
    const fieldDescriptor = props.fieldDescriptor as IFieldDescriptorMultipleObjectList;

    setObjectTypes(() => [])

    if (fieldDescriptor.itemLabel != undefined)
      setItemLabel(() => fieldDescriptor.itemLabel!)

    props.onChange([]);

    setFieldsDescriptors(() => {
      const descriptors: IFieldDescriptor[][] = [];

      fieldDescriptor.objects.forEach((descriptor, descriptorIndex) => {
        descriptors[descriptorIndex] = descriptor.fields;
        setObjectTypes((prevState) => [...prevState,
          {label: descriptor.label, index: descriptorIndex}
        ])
      })

      return descriptors;
    });
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
    setObjectsData((prevState) => [...prevState, {_objectType: selectedObjectType}])
  }

  const removeObject = (index: number) => {
    setObjectsData(prevState =>
      [...prevState.slice(0, index), ...prevState.slice(index + 1)]
    )
  }

  return (
    <>
      <Form.Group controlId={`${props.fieldDescriptor.key}-select`} key={`${props.fieldDescriptor.key}-select`} className="mb-3 form-group">
        <Form.Label>{props.fieldDescriptor.label}</Form.Label>
        <Form.Select
          isInvalid={props.isValidated && props.fieldDescriptor.optional !== true && selectedObjectType == -1}
          required={props.fieldDescriptor.optional !== true}
          value={selectedObjectType}
          onChange={(event) => setSelectedObjectType(() => parseInt(event.target.value))}
        >
          <option value={-1} disabled>Select option</option>
          {objectTypes.map(option => (
            <option value={option.index} key={option.label}>{option.label}</option>
          ))}
        </Form.Select>
        <Form.Text className="text-muted">
          <ReactMarkdown>
            {props.fieldDescriptor.description}
          </ReactMarkdown>
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          Please select type of {itemLabel}
        </Form.Control.Feedback>
      </Form.Group>
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
          disabled={selectedObjectType == -1}
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
            <CollapsibleCard
              key={`object-${objectDataIndex}`}
              title={`${itemLabel} ${objectDataIndex + 1}`}
              description={`Type: ${objectTypes[objectData._objectType as number].label}`}
              defaultOpen
            >
              {fieldsDescriptors[objectData._objectType as number].map(field => (
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

export default FormFieldMultipleObjectList;