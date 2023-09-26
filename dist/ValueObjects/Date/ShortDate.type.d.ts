import { GenericType, GenericValidation } from "../../Types";
export declare class ShortDate extends GenericType {
    constructor(value: string, label: string | null | undefined, outputFormat: string, required?: boolean, ...customValidators: GenericValidation[]);
}
export declare function formatDate(date: string, outputFormat: string): string;
export declare function createShortDate(value: string, label: string | null | undefined, outputFormat: string): ShortDate;
