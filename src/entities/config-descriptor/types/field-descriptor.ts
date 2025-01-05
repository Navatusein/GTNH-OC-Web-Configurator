export type FieldTypes = string|number|boolean;

export interface IFieldDescriptor{
  key: string;
  type: "string"|"integer"|"float"|"address"|"side"|"color"|"url"|"boolean";
  group: string;
  label: string;
  description: string;
  optional?: boolean;
}