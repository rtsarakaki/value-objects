import { GenericType, GenericValidation } from "../../Types";
export declare class Acronym extends GenericType {
    constructor(value: string, label?: string, required?: boolean, upper?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createAcronymCode(value: string, label?: string, required?: boolean, upper?: boolean, language?: string, ...customValidators: GenericValidation[]): Acronym;
