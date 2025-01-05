export interface IFieldDescriptor{
  key: string;
  type: "string"|"integer"|"float"|"address"|"side"|"color"|"url";
  group: string;
  label: string;
  description: string;
  optional?: boolean;
}