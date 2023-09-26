import { GenericType, GenericValidation } from "../../Types";
export declare class ShortDate extends GenericType {
    private _outputFormat;
    constructor(value: string, label: string | null | undefined, outputFormat: string, required?: boolean, ...customValidators: GenericValidation[]);
    get outputFormat(): string;
    get formatedValue(): string;
}
export declare function createShortDate(value: string, label: string | null | undefined, outputFormat: string): ShortDate;
