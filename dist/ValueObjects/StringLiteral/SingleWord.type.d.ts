import { GenericType, GenericValidation } from "../../Types";
export declare class SingleWord extends GenericType {
    constructor(value: string, label?: string | null, ...customValidators: GenericValidation[]);
}
export declare function createSingleWord(value: string, label?: string | null): SingleWord;
