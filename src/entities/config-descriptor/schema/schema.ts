import {z} from "zod";
import {fieldGroupSchema} from "@/entities/field-group-descriptor";

export const configDescriptorVersionsSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export type ConfigDescriptorVersions = z.infer<typeof configDescriptorVersionsSchema>;

export const configDescriptorSchema = z.object({
  name: z.string(),
  key: z.string(),
  currentVersion: z.string(),
  versions: z.array(configDescriptorVersionsSchema),
  description: z.string(),
  lastSupportedVersion: z.string().optional(),
  repositoryLink: z.string().optional(),
  configTemplate: z.string(),
  fieldGroups: z.array(fieldGroupSchema),
});

export type ConfigDescriptor = z.infer<typeof configDescriptorSchema>;