import { GenericType, GenericValidation } from "../../Types";
export declare class KebabCode extends GenericType {
    constructor(value: string, label?: string | null, ...customValidators: GenericValidation[]);
}
export declare function createKebabCode(value: string, label?: string | null): KebabCode;