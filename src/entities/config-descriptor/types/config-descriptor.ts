import {IFieldDescriptor} from "@/entities/config-descriptor";

export interface IFieldGroup {
  key: string;
  name: string;
  fields: IFieldDescriptor[];
}

export interface IConfigDescriptor {
  configTemplate: string;
  fieldGroups: IFieldGroup[];
}