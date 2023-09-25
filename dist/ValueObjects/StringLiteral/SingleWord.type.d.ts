import { GenericType, GenericValidation } from "../../Types";
export declare class SingleWord extends GenericType {
    constructor(value: string, label?: string | null, required?: boolean, ...customValidators: GenericValidation[]);
}
export declare function createSingleWord(value: string, label?: string | null): SingleWord;
