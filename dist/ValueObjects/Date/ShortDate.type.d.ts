import { GenericType, GenericValidation } from "../../Types";
type inputAccepted = string | Date;
export declare class ShortDate extends GenericType {
    constructor(value: inputAccepted, label?: string | null, outputFormat?: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function shortDateFormat(value: inputAccepted, outputFormat?: string): string;
export declare function createShortDate(value: inputAccepted, label: string | null | undefined, outputFormat: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]): ShortDate;
export {};
