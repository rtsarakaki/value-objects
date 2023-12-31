import { GenericType, GenericValidation } from "../../Types";
export declare class Number extends GenericType {
    constructor(value: number | string, label: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createNumber(value: number | string, label: string, required?: boolean, language?: string, ...customValidators: GenericValidation[]): Number;
