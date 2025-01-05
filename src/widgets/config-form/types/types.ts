import {IFieldDescriptor} from "@/entities/config-descriptor";

export interface IFormProps<T> {
  fieldDescriptor: IFieldDescriptor,
  isValidated: boolean;
  value: T,
  onChange: (value: T) => void;
}

export interface IFieldDescriptorInteger extends IFieldDescriptor {
  max?: string;
  min?: string;
  default?: string;
}

export interface IFieldDescriptorFloat extends IFieldDescriptor {
  max?: string;
  min?: string;
  step?: string;
  default?: string;
}

export interface IFieldDescriptorAddress extends IFieldDescriptor {
  default?: string;
}


export interface IFieldDescriptorString extends IFieldDescriptor {
  default?: string;
  max?: string;
  min?: string;
}

export interface IFieldDescriptorSide extends IFieldDescriptor {
  default?: string;
}

export interface IFieldDescriptorColor extends IFieldDescriptor {
  default?: string;
}
