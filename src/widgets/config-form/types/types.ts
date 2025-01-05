import {IFieldDescriptor} from "@/entities/config-descriptor";

export interface IFormProps<T> {
  fieldDescriptor: IFieldDescriptor,
  isValidated: boolean;
  value: T,
  onChange: (value: T) => void;
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
}
