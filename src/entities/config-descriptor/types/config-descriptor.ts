import {IFieldDescriptor} from "@/entities/config-descriptor";

export interface IFieldGroup {
  key: string;
  name: string;
  description?: string;
  fields: IFieldDescriptor[];
  defaultOpen?: boolean;
}

export interface IConfigDescriptor {
  name: string;
  description: string;
  repositoryLink?: string;
  configTemplate: string;
  fieldGroups: IFieldGroup[];
}