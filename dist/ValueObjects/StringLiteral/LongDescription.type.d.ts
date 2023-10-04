import { GenericType, GenericValidation } from "../../Types";
export declare class LongDescription extends GenericType {
    constructor(value: string, label: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createLongDescription(value: string, label: string): LongDescription;
