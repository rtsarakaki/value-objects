import { GenericType, GenericValidation } from "../../Types";
export declare class SingleWord extends GenericType {
    constructor(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createSingleWord(value: string, label?: string | null, required?: boolean, language?: string, ...customValidators: GenericValidation[]): SingleWord;
