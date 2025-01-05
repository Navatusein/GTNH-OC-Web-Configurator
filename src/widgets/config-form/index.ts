import {IFieldDescriptorInteger, IFieldDescriptorFloat, IFieldDescriptorSide, IFormProps, IFieldDescriptorColor, IFieldDescriptorString, IFieldDescriptorAddress} from "./types/types";
import ConfigForm from "./ui/config-form/config-form";
import FormFieldAddress from "./ui/form-field-address/form-field-address";
import FormFieldInteger from "./ui/form-field-integer/form-field-integer";
import FormFieldFloat from "./ui/form-field-float/form-field-float";
import FormFieldSide from "./ui/form-field-side/form-field-side";
import FormFieldString from "./ui/form-field-string/form-field-string";
import FormFieldColor from "./ui/form-field-color/form-field-color";

export type {IFormProps, IFieldDescriptorInteger, IFieldDescriptorSide, IFieldDescriptorFloat, IFieldDescriptorColor, IFieldDescriptorString, IFieldDescriptorAddress};
export {ConfigForm, FormFieldAddress, FormFieldInteger, FormFieldSide, FormFieldFloat, FormFieldString, FormFieldColor};