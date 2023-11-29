import { GenericType, GenericValidation } from "../../Types";
export declare class Number extends GenericType {
    constructor(value: number | string | null | undefined, label: string, required?: boolean, maxNumber?: number, minNumber?: number, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createNumber(value: number | string | null | undefined, label: string, required?: boolean, maxNumber?: number, minNumber?: number, language?: string, ...customValidators: GenericValidation[]): Number;
