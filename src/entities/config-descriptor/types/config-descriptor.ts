import {IFieldDescriptor} from "@/entities/config-descriptor";

export interface IFieldGroup {
  key: string;
  name: string;
  description?: string;
  fields: IFieldDescriptor[];
}

export interface IConfigDescriptor {
  name: string;
  description: string;
  repositoryLink?: string;
  configTemplate: string;
  fieldGroups: IFieldGroup[];
}