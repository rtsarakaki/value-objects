import { GenericType, GenericValidation } from "../../Types";
export declare class ShortDate extends GenericType {
    _outputFormat: string;
    constructor(value: string, label: string | null | undefined, outputFormat: string, required?: boolean, ...customValidators: GenericValidation[]);
    get formatedValue(): string;
}
export declare function createShortDate(value: string, label: string | null | undefined, outputFormat: string): ShortDate;
