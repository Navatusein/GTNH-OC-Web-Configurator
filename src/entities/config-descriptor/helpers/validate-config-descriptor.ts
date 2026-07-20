import {parse} from "yaml";
import {configDescriptorSchema} from "@/entities/config-descriptor";
import type {ConfigDescriptor} from "@/entities/config-descriptor";

export type ValidationResult = {success: true; descriptor: ConfigDescriptor} | {success: false; errors: string[]};

export function validateConfigDescriptor(yamlText: string): ValidationResult {
  let parsed: unknown;

  try {
    parsed = parse(yamlText);
  }
  catch (error) {
    return {success: false, errors: [`Invalid YAML: ${(error as Error).message}`]};
  }

  const descriptor = (parsed as {descriptor?: unknown} | null)?.descriptor;

  if (descriptor === undefined)
    return {success: false, errors: ["Root key \"descriptor\" is missing."]};

  const result = configDescriptorSchema.safeParse(descriptor);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => {
      const path = issue.path.join(".");
      return path ? `${path}: ${issue.message}` : issue.message;
    });

    return {success: false, errors};
  }

  return {success: true, descriptor: result.data};
}