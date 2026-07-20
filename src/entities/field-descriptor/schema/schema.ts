import {z} from "zod";

export const fieldTypeSchema = z.enum([
  "string", "integer", "float", "address", "select",
  "side", "color", "url", "boolean", "objectList", "multipleObjectList",
]);

export type FieldTypes = z.infer<typeof fieldTypeSchema>;

export const selectOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type SelectOption = z.infer<typeof selectOptionSchema>;

// Базовые поля, общие для всех дескрипторов.
export const fieldDescriptorSchema = z.object({
  key: z.string(),
  type: fieldTypeSchema,
  label: z.string(),
  description: z.string(),
  optional: z.boolean().optional(),
  default: z.unknown().optional(),
});

export type FieldDescriptor = z.infer<typeof fieldDescriptorSchema>;

export const fieldDescriptorIntegerSchema = fieldDescriptorSchema.extend({
  default: z.number().optional(),
  max: z.number().optional(),
  min: z.number().optional(),
  step: z.number().optional(),
});

export type FieldDescriptorInteger = z.infer<typeof fieldDescriptorIntegerSchema>;

export const fieldDescriptorFloatSchema = fieldDescriptorSchema.extend({
  default: z.number().optional(),
  max: z.number().optional(),
  min: z.number().optional(),
  step: z.number().optional(),
  precision: z.number().optional(),
});

export type FieldDescriptorFloat = z.infer<typeof fieldDescriptorFloatSchema>;

export const fieldDescriptorStringSchema = fieldDescriptorSchema.extend({
  default: z.string().optional(),
  max: z.number().optional(),
  min: z.number().optional(),
});

export type FieldDescriptorString = z.infer<typeof fieldDescriptorStringSchema>;

export const fieldDescriptorSelectSchema = fieldDescriptorSchema.extend({
  default: z.string().optional(),
  options: z.array(selectOptionSchema),
});

export type FieldDescriptorSelect = z.infer<typeof fieldDescriptorSelectSchema>;

// Address / Url / Side / Color / Boolean не добавляют новых полей — это базовый дескриптор.
export const fieldDescriptorAddressSchema = fieldDescriptorSchema.extend({default: z.string().optional()});
export type FieldDescriptorAddress = z.infer<typeof fieldDescriptorAddressSchema>;

export const fieldDescriptorUrlSchema = fieldDescriptorSchema.extend({default: z.string().optional()});
export type FieldDescriptorUrl = z.infer<typeof fieldDescriptorUrlSchema>;

export const fieldDescriptorSideSchema = fieldDescriptorSchema.extend({default: z.string().optional()});
export type FieldDescriptorSide = z.infer<typeof fieldDescriptorSideSchema>;

export const fieldDescriptorColorSchema = fieldDescriptorSchema.extend({default: z.string().optional()});
export type FieldDescriptorColor = z.infer<typeof fieldDescriptorColorSchema>;

export const fieldDescriptorBooleanSchema = fieldDescriptorSchema.extend({default: z.boolean().optional()});
export type FieldDescriptorBoolean = z.infer<typeof fieldDescriptorBooleanSchema>;

export const fieldDescriptorObjectListSchema = fieldDescriptorSchema.extend({
  fields: z.array(fieldDescriptorSchema),
  objectTemplate: z.string(),
  useSpaces: z.boolean().optional(),
  itemLabel: z.string().optional(),
});

export type FieldDescriptorObjectList = z.infer<typeof fieldDescriptorObjectListSchema>;

export const multipleObjectDescriptorSchema = z.object({
  key: z.string(),
  name: z.string(),
  label: z.string(),
  description: z.string().optional(),
  fields: z.array(fieldDescriptorSchema),
  objectTemplate: z.string(),
});

export type MultipleObjectDescriptor = z.infer<typeof multipleObjectDescriptorSchema>;

export const fieldDescriptorMultipleObjectListSchema = fieldDescriptorSchema.extend({
  objects: z.array(multipleObjectDescriptorSchema),
  useSpaces: z.boolean().optional(),
  itemLabel: z.string(),
});

export type FieldDescriptorMultipleObjectList = z.infer<typeof fieldDescriptorMultipleObjectListSchema>;

// Данные формы (значения полей) — не часть дескриптора, поэтому остаются обычными типами.
export type FieldDataTypes = string | number | boolean | IFieldData[];

export type IFieldData = {
  [key: string]: FieldDataTypes;
};
