import { GenericType, GenericValidation } from "../../Types";
export declare class PositiveInteger extends GenericType {
    constructor(value: number | string, label: string, required?: boolean, maxNumber?: number, minNumber?: number, language?: string, ...customValidators: GenericValidation[]);
}
export declare function createPositiveInteger(value: number | string, label: string, required?: boolean, maxNumber?: number, minNumber?: number, language?: string, ...customValidators: GenericValidation[]): PositiveInteger;
