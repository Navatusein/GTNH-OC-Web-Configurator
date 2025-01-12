import {IFieldDescriptor} from "@/entities/config-descriptor";

export interface IFormProps<T> {
  fieldDescriptor: IFieldDescriptor,
  isValidated: boolean;
  value: T,
  onChange: (value: T) => void;
  setInvalidField: (value: boolean) => void;
}

export interface IFieldDescriptorInteger extends IFieldDescriptor {
  max?: number;
  min?: number;
  default?: number;
}

export interface IFieldDescriptorFloat extends IFieldDescriptor {
  max?: number;
  min?: number;
  step?: number;
  default?: number;
}

export interface IFieldDescriptorAddress extends IFieldDescriptor {
  default?: string;
}

export interface IFieldDescriptorUrl extends IFieldDescriptor {
  default?: string;
}

export interface IFieldDescriptorString extends IFieldDescriptor {
  default?: string;
  max?: number;
  min?: number;
}

export interface IFieldDescriptorSide extends IFieldDescriptor {
  default?: string;
}

export interface IFieldDescriptorColor extends IFieldDescriptor {
  default?: string;
}

export interface IFieldDescriptorBoolean extends IFieldDescriptor {
  default?: boolean;
  class: "switch"|"checkbox";
}

export interface ISelectOption {
  label: string;
  value: string;
}

export interface IFieldDescriptorSelect extends IFieldDescriptor {
  default?: string;
  options: ISelectOption[];
}

export interface IFieldDescriptorObjectList extends IFieldDescriptor {
  fields: IFieldDescriptor[];
  objectTemplate: string;
  useSpaces?: boolean;
  itemLabel?: string;
}

export interface MultipleObjectDescriptor {
  key: string;
  name: string;
  label: string;
  description?: string;
  fields: IFieldDescriptor[];
  objectTemplate: string;
}

export interface IFieldDescriptorMultipleObjectList extends IFieldDescriptor {
  objects: MultipleObjectDescriptor[];
  useSpaces?: boolean;
  itemLabel?: string;
}
