import { InvalidValue } from "../Errors";
export declare function validateLabel(value: string, language?: string): InvalidValue | null;
export declare function validationAcceleratorSuggestion(validationCallback: Function, value: any, label: string, required: boolean | undefined, messageKey: string, language: string, replaceList: any[]): InvalidValue | null;
