import InvalidValue from "../Errors/InvalidValue.error";
export declare const CannotBeBlank: (value: string, label: string, required?: boolean, language?: string) => InvalidValue | null;
