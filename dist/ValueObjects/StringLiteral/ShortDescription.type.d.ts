import { GenericType, GenericValidation } from "../../Types";
export declare class ShortDescription extends GenericType {
    constructor(value: string, label: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createShortDescription(value: string, label: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]): ShortDescription;
