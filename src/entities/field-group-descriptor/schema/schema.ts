import {z} from "zod";
import {fieldDescriptorSchema} from "@/entities/field-descriptor";

export const fieldGroupSchema = z.object({
  key: z.string(),
  name: z.string(),
  description: z.string().optional(),
  fields: z.array(fieldDescriptorSchema),
  defaultOpen: z.boolean().optional(),
});

export type FieldGroup = z.infer<typeof fieldGroupSchema>;