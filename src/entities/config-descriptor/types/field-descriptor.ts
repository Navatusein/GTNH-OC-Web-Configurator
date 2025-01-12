export type FieldTypes = string|number|boolean|IFieldData[];

export interface IFieldData {
  [key: string]: FieldTypes
}

export interface IFieldDescriptor {
  key: string;
  type: "string"|"integer"|"float"|"address"|"side"|"color"|"url"|"boolean"|"objectList"|"multipleObjectList";
  group: string;
  label: string;
  description: string;
  optional?: boolean;
}