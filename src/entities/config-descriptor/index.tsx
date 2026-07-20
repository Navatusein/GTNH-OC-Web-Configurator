import {configDescriptorSchema, configDescriptorVersionsSchema} from "./schema/schema";
import type {ConfigDescriptor, ConfigDescriptorVersions} from "./schema/schema";
import {validateConfigDescriptor} from "./helpers/validate-config-descriptor";
import type {ValidationResult} from "./helpers/validate-config-descriptor";

export type {ConfigDescriptor, ConfigDescriptorVersions, ValidationResult};
export {configDescriptorSchema, configDescriptorVersionsSchema, validateConfigDescriptor};